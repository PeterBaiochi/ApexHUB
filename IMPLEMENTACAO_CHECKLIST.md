# 📋 Checklist de Implementação - Sistema de Hierarquia

## ✅ Arquivos Criados

- [x] `src/app/auth/hierarchyTypes.ts` - Tipos, constantes e enums
- [x] `src/app/auth/hierarchyUtils.ts` - Funções utilitárias
- [x] `src/app/hooks/useHierarchy.ts` - Custom hooks React
- [x] `src/app/components/hierarchy/RoleDisplay.tsx` - Componentes de display
- [x] `src/app/components/hierarchy/RoleGuards.tsx` - Guards de proteção
- [x] `src/app/pages/HierarchyDashboard.tsx` - Página demonstrativa
- [x] `backend/middleware/auth.js` - Middlewares de autenticação
- [x] `backend/database/migration-hierarchy.js` - Migração do banco
- [x] `backend/routes/hierarchy-example.js` - Exemplos de rotas protegidas
- [x] `HIERARCHIA_DOCUMENTACAO.md` - Documentação completa
- [x] `QUICK_START_HIERARCHIA.js` - Guia rápido de implementação

---

## 🗂️ Estrutura de Roles (7 Níveis)

### Hierarquia de Privilégios
```
7. ADMIN (Acesso completo)
   ↓
6. SUPERVISOR (sem view_total_billing)
   ↓
5. AFFILIATE_MANAGER (gerencia apenas seus afiliados)
   ↓
4. VIP_BLACK (máximo nível VIP - > Gold e Silver)
   ↓
3. VIP_GOLD (nível VIP intermediário)
   ↓
2. VIP_SILVER (nível VIP básico - < Gold e Black)
   ↓
1. AFFILIATE (padrão - sem acesso ao admin)
```

---

## 🎯 Próximos Passos (Passo a Passo)

### [ ] 1. BANCO DE DADOS
- [ ] Executar migração:
  ```bash
  node -e "require('./backend/backend/database/migration-hierarchy').runMigration()"
  ```
  Ou executar manualmente em MySQL:
  ```sql
  ALTER TABLE users ADD COLUMN IF NOT EXISTS role VARCHAR(50) NOT NULL DEFAULT 'affiliate';
  ALTER TABLE users ADD COLUMN IF NOT EXISTS manager_id INT NULL;
  ```
- [ ] Criar usuário Admin:
  ```sql
  INSERT INTO users (name, email, password_hash, role) 
  VALUES ('Admin System', 'admin@trenzada.com', '$2b$10$...', 'admin');
  ```

### [ ] 2. BACKEND

#### [ ] 2.1 Atualizar Login
- [ ] Adicionar `role` na query SELECT
- [ ] Incluir `role` no JWT token
- [ ] Retornar `role` na resposta

**Código:**
```javascript
// Em server.js - rota POST /login
const token = signToken({
  sub: user.id,
  email: user.email,
  name: user.name,
  role: user.role  // ← ADICIONAR
});
```

#### [ ] 2.2 Importar Middlewares
```javascript
const {
  authenticateToken,
  requireAdmin,
  requirePermission,
  requireRole,
  requireVIP,
} = require("./middleware/auth");
```

#### [ ] 2.3 Proteger Rotas
Adicione middlewares conforme necessário, exemplos em `backend/routes/hierarchy-example.js`:

**Admin Only:**
```javascript
app.get("/admin/dashboard", authenticateToken, requireAdmin, handler);
```

**Com Permissão:**
```javascript
app.get("/reports", authenticateToken, requirePermission("view_reports"), handler);
```

**VIP Only:**
```javascript
app.get("/vip-features", authenticateToken, requireVIP, handler);
```

### [ ] 3. FRONTEND

#### [ ] 3.1 Copiar Arquivos Hook
- [ ] `src/app/hooks/useHierarchy.ts`

#### [ ] 3.2 Copiar Componentes
- [ ] `src/app/components/hierarchy/RoleDisplay.tsx`
- [ ] `src/app/components/hierarchy/RoleGuards.tsx`

#### [ ] 3.3 Atualizar auth.ts
Adicionar tipos de Role à Session:
```typescript
type Session = {
  token: string;
  email: string;
  name: string;
  role: string;  // ← ADICIONAR
};
```

#### [ ] 3.4 Usar em Componentes
Exemplos de uso com hooks:

**Componente com Hook:**
```tsx
import { useHierarchy } from "@/hooks/useHierarchy";

function MyComponent() {
  const { isAdmin, isVIP, user } = useHierarchy();
  // ... usar as informações
}
```

**Componente com Guard:**
```tsx
import { AdminGuard } from "@/components/hierarchy/RoleGuards";

<AdminGuard fallback={<div>Denied</div>}>
  <AdminPanel />
</AdminGuard>
```

### [ ] 4. TESTAR

#### [ ] 4.1 Teste de Login
- [ ] Fazer login com cada role
- [ ] Verificar se role volta no token
- [ ] Verificar se role é armazenado corretamente

#### [ ] 4.2 Teste de Proteção Backend
```bash
# Teste Admin
curl -H "Authorization: Bearer TOKEN" http://localhost:3000/admin/dashboard

# Teste Permissão
curl -H "Authorization: Bearer TOKEN" http://localhost:3000/reports

# Teste sem permissão (deve retornar 403)
curl -H "Authorization: Bearer TOKEN" http://localhost:3000/billing/total
# (Para usuário que não é Admin)
```

#### [ ] 4.3 Teste de Componentes Frontend
- [ ] Fazer login e verificar badges de role
- [ ] Verificar se AdminGuard renderiza/esconde
- [ ] Verificar se VIPGuard funciona
- [ ] Conferir hooks retornam valores corretos

### [ ] 5. CUSTOMIZAÇÕES (Opcional)

#### [ ] 5.1 Adicionar Permissão Customizada
1. Adicionar em `hierarchyTypes.ts`:
   ```typescript
   type Permission = "minha_permissao" | ...
   ```
2. Adicionar aos roles em `ROLE_PERMISSIONS`
3. Usar no backend: `requirePermission("minha_permissao")`

#### [ ] 5.2 Adicionar Novo VIP Level
1. Adicionar em `UserRole` enum
2. Definir hierarquia em `ROLE_HIERARCHY`
3. Adicionar permissões em `ROLE_PERMISSIONS`
4. Adicionar info em `ROLE_INFO_MAP`

#### [ ] 5.3 Cores e Labels
- [ ] Customizar em `ROLE_COLORS` e `ROLE_LABELS`

---

## 🔑 Permissões Disponíveis

| Permissão | Admin | Supervisor | Gerente | VIP Black | VIP Gold | VIP Silver | Afiliado |
|-----------|:-----:|:----------:|:-------:|:---------:|:--------:|:----------:|:--------:|
| dashboard_admin | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| view_total_billing | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| manage_users | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| manage_affiliates | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| view_my_affiliates | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |
| view_reports | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| manage_campaigns | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| access_academy | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| view_my_links | ❌ | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ |
| access_vip_features | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ | ❌ |
| access_black_features | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| access_gold_features | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| access_silver_features | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| manage_commissions | ✅ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |

---

## 📱 Exemplos de Uso Rápido

### Frontend - Mostrar conteúdo baseado em role
```tsx
import { useHierarchy } from "@/hooks/useHierarchy";

function Menu() {
  const { isAdmin, isVIP, isAffiliate } = useHierarchy();

  return (
    <nav>
      {isAdmin && <a href="/admin">⚙️ Admin</a>}
      {isVIP && <a href="/vip">💎 VIP</a>}
      {isAffiliate && <a href="/my-links">🔗 Meus Links</a>}
    </nav>
  );
}
```

### Backend - Proteger rota
```javascript
app.get(
  "/my-billing",
  authenticateToken,
  requirePermission("view_total_billing"),
  (req, res) => {
    // Apenas Admin pode chegar aqui
    res.json({ billing: 10000 });
  }
);
```

### Frontend - Guard
```tsx
<AdminGuard fallback={<p>Denied</p>}>
  <SecretAdmin />
</AdminGuard>
```

---

## ⚠️ Pontos Importantes

### NUNCA ESQUEÇA:
1. **Incluir `role` no JWT** - Sem isso, o sistema não funciona
2. **Proteger rotas sensíveis** - Use middlewares no backend
3. **Validar no servidor** - Não confie apenas no frontend
4. **Supervisor SEM faturamento** - `view_total_billing` não está em seu role
5. **VIP Black > Silver** - Confirme hierarquia em testes

### SEGURANÇA:
- ✅ O role vem do JWT (assinado digitalmente)
- ✅ Validações acontecem no servidor
- ✅ Frontend é apenas uma interface de UX
- ✅ Middlewares validam cada request

---

## 🆘 Troubleshooting

| Problema | Solução |
|----------|---------|
| Usuário não vê menu admin | Verificar se `role='admin'` no DB |
| Rota retorna 403 | Verificar middleware e permissão |
| Token sem role | Incluir `role` no `signToken()` |
| Guard não funciona | Verificar se Session tem `role` |
| VIP vê faturamento total | Verificar se tem permissão `view_total_billing` |

---

## 📞 Precisa de Ajuda?

Consulte:
1. `HIERARCHIA_DOCUMENTACAO.md` - Documentação completa
2. `QUICK_START_HIERARCHIA.js` - Exemplos rápidos
3. `src/app/pages/HierarchyDashboard.tsx` - Exemplo funcional
4. `backend/routes/hierarchy-example.js` - Rotas de exemplo

---

## ✨ Checklist Final

- [ ] Migração do DB executada
- [ ] Login retorna role
- [ ] Rotas backend protegidas
- [ ] Componentes frontend usam hooks/guards
- [ ] Testes funcionando
- [ ] Documentação lida
- [ ] Sistema em produção ✅

