require("dotenv").config();

console.log("Server iniciado");

const pool = require("./database/database");

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();

const PORT = Number(process.env.PORT ?? 3000);
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN ?? "http://localhost:5173";
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN ?? "7d";

if (!JWT_SECRET) {
  throw new Error("Missing env var: JWT_SECRET");
}

app.use(
  cors({
    origin: CLIENT_ORIGIN,
    credentials: false,
  }),
);
app.use(express.json());

async function ensureUsersTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
        role VARCHAR(64) NOT NULL DEFAULT 'affiliate',
      password_hash VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

async function resolvePasswordColumn() {
  // Support existing DBs that already have `users.password` instead of `password_hash`.
  const [hashCol] = await pool.query("SHOW COLUMNS FROM users LIKE 'password_hash'");
  if (Array.isArray(hashCol) && hashCol.length > 0) return "password_hash";
  const [plainCol] = await pool.query("SHOW COLUMNS FROM users LIKE 'password'");
  if (Array.isArray(plainCol) && plainCol.length > 0) return "password";
  // If neither exists (unlikely), add password_hash.
  await pool.query("ALTER TABLE users ADD COLUMN password_hash VARCHAR(255) NOT NULL");
  return "password_hash";
}

async function resolveRoleColumn() {
  const [roleCol] = await pool.query("SHOW COLUMNS FROM users LIKE 'role'");
  if (Array.isArray(roleCol) && roleCol.length > 0) return "role";

  // Add role with a safe default for existing users.
  await pool.query(
    "ALTER TABLE users ADD COLUMN role VARCHAR(64) NOT NULL DEFAULT 'affiliate'",
  );
  return "role";
}

function signToken(user) {
  return jwt.sign(
    { sub: user.id, email: user.email, name: user.name, role: user.role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN },
  );
}

function normalizeEmail(email) {
  return String(email ?? "").trim().toLowerCase();
}

function normalizeRole(role) {
  const value = String(role ?? "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_");

  // Normaliza nomes em PT/EN para as chaves do frontend.
  if (["admin", "administrator"].includes(value)) return "admin";
  if (["supervisor"].includes(value)) return "supervisor";

  if (["affiliate", "comum", "afiliado", "afiliado_comum"].includes(value)) return "affiliate";
  if (["affiliate_manager", "gerente", "gerente_de_afiliados", "gerente_de_afiliado"].includes(value)) {
    return "affiliate_manager";
  }

  if (["vip_black", "black", "vipblack"].includes(value)) return "vip_black";
  if (["vip_gold", "gold", "vipgold"].includes(value)) return "vip_gold";
  if (["vip_silver", "silver", "vipsilver"].includes(value)) return "vip_silver";

  // Default seguro
  return "affiliate";
}

app.get("/", (_req, res) => {
  res.send("Backend funcionando");
});

// Register
app.post("/register", async (req, res) => {
  try {
    const name = String(req.body?.name ?? "").trim();
    const email = normalizeEmail(req.body?.email);
    const password = String(req.body?.password ?? "");
    // Por segurança: novos cadastros entram como afiliado comum.
    const role = "affiliate";

    if (!name) return res.status(400).json({ message: "Informe seu nome." });
    if (!email) return res.status(400).json({ message: "Informe seu email." });
    if (!password || password.length < 6) {
      return res.status(400).json({ message: "A senha deve ter pelo menos 6 caracteres." });
    }

    const [existing] = await pool.query("SELECT id FROM users WHERE email = ? LIMIT 1", [email]);
    if (Array.isArray(existing) && existing.length > 0) {
      return res.status(409).json({ message: "Este email já está cadastrado." });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      `INSERT INTO users (name, email, role, ${app.locals.passwordColumn}) VALUES (?, ?, ?, ?)`,
      [name, email, role, passwordHash],
    );

    const userId = result?.insertId;
    const token = signToken({ id: userId, email, name, role });
    return res.status(201).json({
      message: "Usuário criado com sucesso",
      token,
      user: { id: userId, name, email, role },
    });
  } catch (err) {
    console.error("REGISTER_ERROR", err);
    return res.status(500).json({ message: "Erro ao cadastrar usuário" });
  }
});

// Login
app.post("/login", async (req, res) => {
  try {
    const email = normalizeEmail(req.body?.email);
    const password = String(req.body?.password ?? "");

    if (!email) return res.status(400).json({ message: "Informe seu email." });
    if (!password) return res.status(400).json({ message: "Informe sua senha." });

    const [rows] = await pool.query(
      `SELECT id, name, email, role, ${app.locals.passwordColumn} AS password_hash FROM users WHERE email = ? LIMIT 1`,
      [email],
    );

    const user = Array.isArray(rows) ? rows[0] : null;
    if (!user) return res.status(401).json({ message: "Email ou senha inválidos." });

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ message: "Email ou senha inválidos." });

    const role = normalizeRole(user.role);
    const token = signToken({ ...user, role });
    return res.json({
      message: "Login realizado",
      token,
      user: { id: user.id, name: user.name, email: user.email, role },
    });
  } catch {
    console.error("LOGIN_ERROR");
    return res.status(500).json({ message: "Erro ao realizar login." });
  }
});

app.listen(PORT, async () => {
  try {
    await pool.query("SELECT 1");
    console.log("Conectado ao MySQL");
  } catch (err) {
    console.error("Erro ao conectar ao MySQL:", err);
  }
  await ensureUsersTable();
  app.locals.passwordColumn = await resolvePasswordColumn();
  app.locals.roleColumn = await resolveRoleColumn();
  console.log(`Servidor rodando na porta ${PORT}`);
});