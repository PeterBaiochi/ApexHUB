# 🏛️ Sistema de Hierarquia Trenzada - Documentação Completa

## 📋 Visão Geral

O Sistema de Hierarquia é um framework completo para gerenciar diferentes níveis de acesso e permissões na plataforma Trenzada. Oferece uma estrutura robusta, escalável e fácil de usar tanto no backend quanto no frontend.

---

## 🎯 Níveis de Hierarquia

| Nível | Role | Nível Hierárquico | Descrição |
|-------|------|-------------------|-----------|
| 1 | **Afiliado** | 1 | Acesso padrão ao sistema, sem acesso ao painel admin |
| 2 | **VIP Silver** | 2 | Nível VIP inicial com benefícios básicos |
| 3 | **VIP Gold** | 3 | Nível VIP intermediário com mais funcionalidades |
| 4 | **VIP Black** | 4 | Nível VIP máximo com funcionalidades premium (> Gold e Silver) |
| 5 | **Gerente de Afiliados** | 5 | Gerencia apenas seus afiliados vinculados |
| 6 | **Supervisor** | 6 | Supervisão de operações (SEM acesso a faturamento total) |
| 7 | **Admin** | 7 | Acesso completo ao sistema |

---

## 🔐 Permissões por Role

### Admin
✅ `dashboard_admin` - Painel administrativo  
✅ `view_total_billing` - Ver faturamento total  
✅ `manage_users` - Gerenciar usuários  
✅ `manage_affiliates` - Gerenciar todos os afiliados  
✅ `view_reports` - Relatórios completos  
✅ `manage_campaigns` - Gerenciar campanhas  
✅ `access_academy` - Academia  
✅ `access_compliance` - Compliance  
✅ `manage_commissions` - Comissões  

### Supervisor
⚠️ SEM: `view_total_billing`, `dashboard_admin`, `manage_users`  
✅ `view_reports`, `manage_campaigns`, `manage_affiliates`  
✅ `access_academy`, `access_compliance`  

### Gerente de Afiliados
✅ `view_my_affiliates` - Apenas seus afiliados  
✅ `view_reports` - Relatórios pessoais  
✅ `manage_campaigns`, `access_academy`, `view_my_links`  

### VIP Black (Maior que Gold e Silver)
✅ `access_vip_features` - Todas as features VIP  
✅ `access_black_features` - Exclusivos Black  
✅ `manage_commissions` - Gerenciar comissões  
✅ `view_reports` - Relatórios avançados  

### VIP Gold
✅ `access_vip_features` - Todas as features VIP  
✅ `access_gold_features` - Exclusivos Gold  
✅ `view_reports` - Relatórios avançados  

### VIP Silver
✅ `access_vip_features` - Todas as features VIP  
✅ `access_silver_features` - Exclusivos Silver  

### Afiliado
✅ `view_my_links` - Seus links de afiliação  
✅ `access_academy` - Academia  

---

## 🚀 Implementação

### Frontend

#### 1. **Importar Tipos**
```typescript
import { UserRole, Permission } from "@/app/auth/hierarchyTypes";
import { User } from "@/app/auth/hierarchyUtils";
```

#### 2. **Usar o Hook Principal**
```typescript
import { useHierarchy } from "@/hooks/useHierarchy";

function MyComponent() {
  const hierarchy = useHierarchy();

  if (!hierarchy.user) return <div>Não autenticado</div>;

  return (
    <div>
      <p>Olá, {hierarchy.user.name}!</p>
      {hierarchy.isAdmin && <AdminPanel />}
      {hierarchy.isVIP && <VIPFeatures />}
    </div>
  );
}
```

#### 3. **Usar Guards para Proteger Componentes**

**Admin Guard:**
```typescript
import { AdminGuard } from "@/components/hierarchy/RoleGuards";

<AdminGuard fallback={<div>Acesso negado</div>}>
  <AdminPanel />
</AdminGuard>
```

**Permission Guard:**
```typescript
import { PermissionGuard } from "@/components/hierarchy/RoleGuards";

<PermissionGuard permission="manage_affiliates">
  <AffiliateManager />
</PermissionGuard>
```

**Role Guard:**
```typescript
import { RoleGuard } from "@/components/hierarchy/RoleGuards";

<RoleGuard requiredRoles={[UserRole.VIP_BLACK, UserRole.ADMIN]}>
  <PremiumFeature />
</RoleGuard>
```

**VIP Guard:**
```typescript
import { VIPGuard } from "@/components/hierarchy/RoleGuards";

<VIPGuard fallback={<div>Upgrade para VIP</div>}>
  <VIPExclusiveFeature />
</VIPGuard>
```

#### 4. **Usar Hooks Específicos**
```typescript
const isAdmin = useIsAdmin();
const isVIP = useIsVIP();
const hasPermission = useHasPermission("manage_campaigns");
const canAccessAdmin = useCanAccessAdminPanel();
```

#### 5. **Mostrar Badge de Role**
```typescript
import { UserRoleBadge } from "@/components/hierarchy/RoleDisplay";

<UserRoleBadge role={user.role} showLabel={true} />
```

---

### Backend (Node.js/Express)

#### 1. **Importar Middlewares**
```javascript
const {
  authenticateToken,
  requireAdmin,
  requirePermission,
  requireRole,
  requireVIP,
} = require("./middleware/auth");
```

#### 2. **Proteger Rotas**

**Apenas Admin:**
```javascript
app.get("/admin/dashboard", authenticateToken, requireAdmin, (req, res) => {
  res.json({ message: "Dashboard Admin", user: req.user });
});
```

**Com Permissão Específica:**
```javascript
app.get("/reports", authenticateToken, requirePermission("view_reports"), (req, res) => {
  res.json({ reports: [...] });
});
```

**Múltiplos Roles:**
```javascript
app.get("/premium", authenticateToken, requireRole("vip_black", "vip_gold", "vip_silver"), (req, res) => {
  res.json({ features: [...] });
});
```

**VIP Apenas:**
```javascript
app.get("/vip-features", authenticateToken, requireVIP, (req, res) => {
  res.json({ vipFeatures: [...] });
});
```

**Múltiplas Permissões:**
```javascript
const { requireAllPermissions } = require("./middleware/auth");

app.post("/campaigns", 
  authenticateToken, 
  requireAllPermissions("manage_campaigns", "manage_affiliates"),
  (req, res) => {
    // Apenas users com AMBAS as permissões
  }
);
```

#### 3. **Atualizar o Schema do Banco de Dados**
```bash
node -e "require('./database/migration-hierarchy').runMigration()"
```

Ou execute manualmente:
```sql
ALTER TABLE users ADD COLUMN IF NOT EXISTS role VARCHAR(50) NOT NULL DEFAULT 'affiliate';
ALTER TABLE users ADD COLUMN IF NOT EXISTS manager_id INT NULL;
ALTER TABLE users ADD INDEX idx_role (role);
```

#### 4. **Retornar Role no Login**
```javascript
app.post("/login", async (req, res) => {
  // ... validações ...
  
  const user = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
  
  const token = signToken({
    sub: user[0].id,
    email: user[0].email,
    name: user[0].name,
    role: user[0].role,  // ← IMPORTANTE: incluir role
  });
  
  res.json({ token, user: { ...user[0] } });
});
```

---

## 📊 Exemplos de Uso

### Frontend - Mostrar Dashboard Diferente por Role

```typescript
import { useHierarchy } from "@/hooks/useHierarchy";
import { AdminDashboard } from "@/pages/admin";
import { VIPDashboard } from "@/pages/vip";
import { AffiliateDashboard } from "@/pages/affiliate";

function Dashboard() {
  const { isAdmin, isVIP, user } = useHierarchy();

  if (!user) return <LoginPage />;

  if (isAdmin) return <AdminDashboard />;
  if (isVIP) return <VIPDashboard />;
  return <AffiliateDashboard />;
}
```

### Frontend - Gerente Vendo Apenas Seus Afiliados

```typescript
function AffiliateList() {
  const hierarchy = useHierarchy();
  const [affiliates, setAffiliates] = useState([]);

  useEffect(() => {
    const endpoint = hierarchy.isAffiliateManager 
      ? "/api/my-affiliates"  // Seus afiliados
      : "/api/all-affiliates"; // Todos (admin/supervisor)

    fetch(endpoint)
      .then(r => r.json())
      .then(setAffiliates);
  }, [hierarchy.isAffiliateManager]);

  return <AffiliateTable affiliates={affiliates} />;
}
```

### Backend - Auditoria de Mudança de Role

```javascript
app.post("/admin/change-role", authenticateToken, requireAdmin, async (req, res) => {
  const { userId, newRole } = req.body;
  
  // Registro anterior
  const [user] = await pool.query("SELECT role FROM users WHERE id = ?", [userId]);
  
  // Atualizar role
  await pool.query("UPDATE users SET role = ? WHERE id = ?", [newRole, userId]);
  
  // Auditoria
  await pool.query(
    `INSERT INTO role_audit (user_id, old_role, new_role, changed_by)
     VALUES (?, ?, ?, ?)`,
    [userId, user.role, newRole, req.user.sub]
  );
  
  res.json({ message: "Role atualizado com sucesso" });
});
```

---

## 🔍 Verificações Úteis

### Frontend
```typescript
import { 
  hasPermission, 
  canManageAffiliates,
  isVIPBlack,
  compareRoles,
  getRoleLevel 
} from "@/app/auth/hierarchyUtils";

const user = { role: "vip_black", ... };

hasPermission(user, "access_black_features"); // true
canManageAffiliates(user); // false
isVIPBlack(user); // true
getRoleLevel(user.role); // 4
compareRoles("admin", "vip_black"); // 1 (admin > vip_black)
```

### Backend
```javascript
const { requireRoleLevel, getRoleLevel } = require("./middleware/auth");

// Apenas roles de nível 5 ou superior
app.get("/affiliate-manager", requireRoleLevel(5), ...);

// Comparar roles
getRoleLevel("admin"); // 7
getRoleLevel("affiliate"); // 1
```

---

## 🛠️ Customizações Avançadas

### Adicionar Uma Nova Permissão
1. Adicione em `hierarchyTypes.ts`:
```typescript
type Permission = "nova_permissao" | ...
```

2. Adicione aos roles em `ROLE_PERMISSIONS`:
```typescript
[UserRole.ADMIN]: [..., "nova_permissao"]
```

3. Use no backend:
```javascript
app.get("/recurso", requirePermission("nova_permissao"), ...)
```

### Adicionar Um Novo VIP Level
1. Adicione em `hierarchyTypes.ts`:
```typescript
export enum UserRole {
  VIP_PLATINUM = "vip_platinum", // Novo nível
  ...
}
```

2. Defina hierarquia:
```typescript
export const ROLE_HIERARCHY = {
  [UserRole.VIP_PLATINUM]: 4.5, // Entre Black (4) e GM (5)
  ...
}
```

3. Adicione informações:
```typescript
[UserRole.VIP_PLATINUM]: {
  role: UserRole.VIP_PLATINUM,
  label: "VIP Platinum",
  ...
}
```

---

## ⚙️ Troubleshooting

**Problema:** Usuário não consegue acessar rota protegida
- Verifique se o `role` está sendo retornado no login
- Confirme que o token JWT contém o campo `role`
- Verifique a permissão necessária

**Problema:** Supervisor vê faturamento total
- Confirme que `view_total_billing` NÃO está em `ROLE_PERMISSIONS[supervisor]`
- Verifique o banco de dados se o role está correto

**Problema:** VIP Gold consegue acessar features Black
- Certifique-se que `access_black_features` está apenas em VIP Black
- Use guards específicos: `requireRole("vip_black")`

---

## 📁 Estrutura de Arquivos

```
src/app/
├── auth/
│   ├── auth.ts                    # Autenticação básica
│   ├── hierarchyTypes.ts          # Tipos e constantes ✨ NOVO
│   └── hierarchyUtils.ts          # Funções utilitárias ✨ NOVO
├── hooks/
│   └── useHierarchy.ts            # Custom hooks ✨ NOVO
├── components/
│   └── hierarchy/
│       ├── RoleDisplay.tsx        # Componentes de display ✨ NOVO
│       └── RoleGuards.tsx         # Guards de rotas ✨ NOVO
└── pages/
    └── HierarchyDashboard.tsx     # Exemplo de uso ✨ NOVO

backend/
├── middleware/
│   └── auth.js                    # Middlewares de auth ✨ NOVO
└── database/
    ├── database.js
    └── migration-hierarchy.js     # Migração de schema ✨ NOVO
```

---

## 🎓 Próximos Passos

1. ✅ Execute a migração do banco de dados
2. ✅ Atualize a rota `/login` para incluir `role`
3. ✅ Coloque os middlewares nas rotas que precisam de proteção
4. ✅ Use os guards nos componentes React
5. ✅ Teste cada nível de hierarquia

---

## 📞 Suporte

Para dúvidas ou problemas, consulte este documento ou revise os exemplos em [HierarchyDashboard.tsx](./pages/HierarchyDashboard.tsx)
