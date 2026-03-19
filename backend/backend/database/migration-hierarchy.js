/**
 * Script de Migração para adicionar suporte a Hierarquia
 * Execute este arquivo após conectar ao banco de dados
 * 
 * Adiciona campos de role e permissões aos usuários
 */

const pool = require("./database");

const MIGRATION_SCRIPT = `
-- Adicionar coluna role se não existir
ALTER TABLE users ADD COLUMN IF NOT EXISTS role VARCHAR(50) NOT NULL DEFAULT 'affiliate';

-- Adicionar índice para busca por role
ALTER TABLE users ADD INDEX IF NOT EXISTS idx_role (role);

-- Adicionar coluna para gerente vinculado (é um afiliado manager gerenciando esse usuário?)
ALTER TABLE users ADD COLUMN IF NOT EXISTS manager_id INT NULL;

-- Adicionar chave estrangeira
ALTER TABLE users 
ADD CONSTRAINT IF NOT EXISTS fk_users_manager 
FOREIGN KEY (manager_id) REFERENCES users(id) ON DELETE SET NULL;

-- Criar tabela de permissões customizadas (opcional, para customização por usuário)
CREATE TABLE IF NOT EXISTS user_permissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  permission VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_user_permission (user_id, permission),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Criar tabela de auditoria de mudanças de role
CREATE TABLE IF NOT EXISTS role_audit (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  old_role VARCHAR(50),
  new_role VARCHAR(50) NOT NULL,
  changed_by INT,
  reason VARCHAR(255),
  changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (changed_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Criar tabela de funcionalidades VIP
CREATE TABLE IF NOT EXISTS vip_features (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  role VARCHAR(50) NOT NULL,
  feature_name VARCHAR(100) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  activated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP NULL,
  UNIQUE KEY unique_user_feature (user_id, feature_name),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Seed: Criar um usuário admin padrão (se não existir)
INSERT IGNORE INTO users (name, email, password_hash, role) 
VALUES ('Admin System', 'admin@trenzada.com', '\$2b\$10\$YourHashedPasswordHere', 'admin');
`;

async function runMigration() {
  const connection = await pool.getConnection();
  try {
    console.log("🔄 Iniciando migração de hierarquia...");
    
    const statements = MIGRATION_SCRIPT.split(';').filter(s => s.trim());
    
    for (const statement of statements) {
      if (statement.trim()) {
        try {
          await connection.query(statement);
          console.log("✅", statement.substring(0, 50) + "...");
        } catch (err) {
          console.warn("⚠️ Aviso:", err.message);
        }
      }
    }
    
    console.log("✨ Migração concluída com sucesso!");
  } catch (error) {
    console.error("❌ Erro na migração:", error);
    throw error;
  } finally {
    connection.release();
  }
}

module.exports = { runMigration, MIGRATION_SCRIPT };
