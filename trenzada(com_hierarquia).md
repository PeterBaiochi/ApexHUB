# 📊 Fluxograma - Sistema de Hierarquia

## 1️⃣ Fluxo de Login e Autenticação

```
┌─────────────────────────────────────────────────────┐
│  Usuário faz LOGIN                                  │
└────────────────┬────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────┐
│  POST /login com email e senha                      │
└────────────────┬────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────┐
│  Backend: Busca user com role no DB                 │
│  SELECT id, name, email, role FROM users           │
└────────────────┬────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────┐
│  Backend: Cria JWT Token incluindo ROLE             │
│  {sub, email, name, role: "admin"} → JWT           │
└────────────────┬────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────┐
│  Retorna token + user info ao frontend              │
│  { token, user: {id, name, email, role} }          │
└────────────────┬────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────┐
│  Frontend: Armazena session com ROLE                │
│  localStorage: {token, email, name, role}          │
└────────────────┬────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────┐
│  ✅ Login Completo! Sistema Hierarquia Ativo        │
└─────────────────────────────────────────────────────┘
```

---

## 2️⃣ Fluxo de Requisição Protegida (Backend)

```
┌──────────────────────────────┐
│  Requisição chega ao backend │
│  GET /admin/dashboard        │
└────────────┬─────────────────┘
             │
             ▼
    ┌────────────────────┐
    │ authenticateToken  │  (Middleware 1)
    │ Verifica JWT       │
    └────────┬───────────┘
             │
        ✅ TOKEN VÁLIDO?
        │      │
       não    sim
        │      │
        ├─────►└──────────────────────┐
        │                             │
        ▼                             ▼
   ❌ 401 Erro           ┌──────────────────────┐
   Token Inválido       │ requireAdmin         │  (Middleware 2)
                        │ Verifica role        │
                        └────────┬─────────────┘
                                 │
                        ✅ É ADMIN?
                        │      │
                       não    sim
                        │      │
                        ├─────►└──────────────────┐
                        │                        │
                        ▼                        ▼
                   ❌ 403 Erro         ┌───────────────────┐
                   Sem permissão       │ requirePermission │  (Optional)
                                       │ Verifica permissão│
                                       └────────┬──────────┘
                                                │
                                        ✅ TEM PERMISSÃO?
                                        │      │
                                       não    sim
                                        │      │
                                        ├─────►└──────────────┐
                                        │                    │
                                        ▼                    ▼
                                   ❌ 403 Erro     ✅ 200 OK
                                   Sem permissão   Handler executado
                                                   Retorna dados
```

---

## 3️⃣ Fluxo de Renderização Frontend

```
┌───────────────────────────────────┐
│  Componente Monta                 │
│  <Dashboard />                    │
└────────────────┬──────────────────┘
                 │
                 ▼
    ┌────────────────────────┐
    │ useHierarchy Hook      │
    │ Busca user da session  │
    │ Calcula permissões     │
    └────────┬───────────────┘
             │
        ✅ USUÁRIO LOGADO?
        │      │
       não    sim
        │      │
        ├─────►└──────────────────────────────┐
        │                                    │
        ▼                                    ▼
   <LoginPage />            ┌─────────────────────────┐
                            │ Obtém role da session   │
                            │ isAdmin? isVIP?         │
                            │ hasPermission(...)?     │
                            └────────┬────────────────┘
                                     │
                         ┌───────────┴────────────┐
                         │                        │
                         ▼                        ▼
                    ┌──────────────┐      ┌──────────────┐
                    │ AdminGuard   │      │ VIPGuard     │
                    │ Se admin     │      │ Se VIP       │
                    │ renderiza    │      │ renderiza    │
                    └──────────────┘      └──────────────┘
                         │                      │
                         ▼                      ▼
                   <AdminPanel />         <VIPFeatures />
```

---

## 4️⃣ Matriz de Decisão por Role

```
                    USUÁRIO FAZ REQUISIÇÃO
                              │
                    ┌─────────┴─────────┐
                    ▼                   ▼
            /admin/dashboard        /reports
                    │                   │
        ┌───────────┼───────────────────┼───────────────┐
        │           │                   │               │
        ▼ admin     ▼ supervisor        ▼ gerente      ▼ afiliado
        ✅ 200     ❌ 403              ❌ 403           ❌ 403
        OK         (sem perm)          (sem perm)       (sem perm)


        requireAdmin           requirePermission("view_reports")
        │        │
     ✅ admin   ❌ outros
     ✅ 200     ❌ 403


PERMISSÃO view_total_billing  (APENAS ADMIN)
        
        Admin → ✅ Acesso        └─► /billing/total → 200 OK
        Supervisor → ❌ Negado   └─► /billing/total → 403 Forbidden
        Outros → ❌ Negado       └─► /billing/total → 403 Forbidden


PERMISSÃO view_my_affiliates  (APENAS GERENTE)

        Gerente → ✅ Sus afiliados     └─► /my-affiliates → 200 OK (5 afiliados)
        Supervisor → ❌ Todos afiliados └─► /my-affiliates → 403 Forbidden
        Admin → ✅ Todos afiliados     └─► /my-affiliates → 200 OK (50 afiliados)
```

---

## 5️⃣ Fluxo de Custom Hook - useHierarchy()

```
┌──────────────────────────────────────┐
│  const { isAdmin } = useHierarchy()  │
└────────────┬───────────────────────────┘
             │
             ▼
    ┌────────────────────────┐
    │ getSession()           │
    │ localStorage.getItem() │
    └────────┬───────────────┘
             │
             ▼
    ┌────────────────────────────────┐
    │ Parse JSON session             │
    │ {token, email, name, role}     │
    └────────┬───────────────────────┘
             │
             ▼
    ┌────────────────────────────────┐
    │ Criar objeto User              │
    │ {id, name, email, role}        │
    └────────┬───────────────────────┘
             │
             ▼
    ┌────────────────────────────────┐
    │ Calcular permissões            │
    │ isAdmin(user)                  │
    │ isVIP(user)                    │
    │ hasPermission(user, "...")     │
    └────────┬───────────────────────┘
             │
             ▼
    ┌────────────────────────────────┐
    │ Retornar objeto                │
    │ {user, isAdmin, isVIP, ...}    │
    └────────┬───────────────────────┘
             │
             ▼
    ┌────────────────────────────────┐
    │ Component atualiza com valores │
    │ if (isAdmin) render AdminPanel │
    └────────────────────────────────┘
```

---

## 6️⃣ Fluxo de Guard - AdminGuard

```
┌────────────────────────────┐
│ <AdminGuard>               │
│   <SecretComponent />      │
│ </AdminGuard>              │
└────────┬──────────────────┘
         │
         ▼
    getSession()
         │
    ┌────┴────┐
    ▼         ▼
   ✅ tem    ❌ não tem
   role      role
    │         │
    ▼         ▼
  admin?   fallback
    │         │
 ┌──┴──┐      └──────────────────┐
 ▼     ▼                          │
 ✅ yes ❌ no                     │
 │     │                          │
 │     └──────────────────────────┴──┐
 │                                   ▼
 │                          Renderiza fallback
 │                          <div>Acesso negado</div>
 │
 ▼
Renderiza children
<SecretComponent /> aparece
```

---

## 7️⃣ Exemplo: Hierarquia VIP Black > Gold > Silver

```
BuscarFeaturesBlack()
│
├─► roleLevel VIP_BLACK = 4
│
├─► VIP_GOLD? level = 3 →  4 > 3? ✅ SIM
│   └─► VIP_GOLD PODE acessar
│
├─► VIP_SILVER? level = 2 →  4 > 2? ✅ SIM
│   └─► VIP_SILVER PODE acessar
│
├─► VIP_BLACK? level = 4 →  4 > 4? ❌ NÃO (igual é ok)
│   └─► VIP_BLACK PODE acessar
│
└─► AFILIADO? level = 1 →  4 > 1? ✅ SIM mas...
    └─► AFILIADO NÃO TEM PERMISSÃO "access_black_features"
        └─► ❌ NEGADO
```

---

## 8️⃣ Fluxo Completo: Login → Requisição → Renderização

```
USUARIO FATO LOGIN
       │
       ▼
   POST /login
       │
       ▼
   Backend verifica senha
       │
       ▼
   Cria JWT com ROLE
       │
       ▼
   Frontend: localStorage.setItem(session com role)
       │
       ▼
   USUARIO NAVEGA PARA /dashboard
       │
       ▼
   <Dashboard /> Component monta
       │
       ▼
   useHierarchy() executa
   └─► getSession() busca do localStorage
   └─► Parse role = "admin"
   └─► Retorna {user, isAdmin: true, ...}
       │
       ▼
   Render condicional
   └─► if (isAdmin) renderiza AdminPanel
   └─► else renderiza AffiliateDashboard
       │
       ▼
   AdminPanel monta
       │
       ▼
   Faz fetch GET /admin/data
   Header: Authorization: Bearer JWT_COM_ROLE
       │
       ▼
   Backend recebe:
   authenticateToken → ✅ JWT válido
   requireAdmin → ✅ role = "admin"
   requirePermission → ✅ tem permissão
       │
       ▼
   Handler executa
   Retorna dados
       │
       ▼
   Frontend recebe 200 OK
   Renderiza dados
       │
       ▼
   ✅ ADMIN VÊ PAINEL ADMIN COM DADOS
```

---

## 9️⃣ Caso de Erro: Supervisor tenta ver Faturamento

```
SUPERVISOR LOGADO
role = "supervisor"
JWT contém role
       │
       ▼
   Clica em "Ver Faturamento"
   GET /billing/total
   Authorization: Bearer JWT{role: "supervisor"}
       │
       ▼
   Backend: authenticateToken
   ✅ Token válido, role = "supervisor"
       │
       ▼
   Backend: requirePermission("view_total_billing")
   Verifica: ROLE_PERMISSIONS["supervisor"]
   Procura por "view_total_billing"
   └─► ❌ NÃO ENCONTRADO
       │
       ▼
   Middleware retorna:
   403 Forbidden
   {message: "Sem permissão para acessar este recurso"}
       │
       ▼
   Frontend recebe 403
   Mostra mensagem de erro
   ❌ "Você não tem permissão"
```

---

## 🔟 Meses Implementação: Progressão

```
ANTES (sem hierarquia):
├─ Todos têm acesso iguais
├─ Sem diferenciação de permissões
├─ Sem proteção granular
└─ Sem auditoria

DEPOIS (com hierarquia):
├─ 7 níveis de acesso
├─ 15 permissões granulares
├─ Proteção em múltiplas camadas
├─ Auditoria completa
├─ Logs de mudanças
└─ Sistema profissional
```

---

## 📊 Tabela de Decisão: Um Usuário Tenta Acessar Recurso

```
┌──────────────────────┬──────────────┬────────────────────┬─────────┐
│ Recurso              │ Permissão    │ Role: Admin        │ Resultado│
├──────────────────────┼──────────────┼────────────────────┼─────────┤
│ /admin/dashboard     │ dashboard... │ ✅ Tem            │ 200 OK  │
│ /billing/total       │ view_total   │ ✅ Tem            │ 200 OK  │
│ /reports             │ view_reports │ ✅ Tem            │ 200 OK  │
│ /manage-users        │ manage_users │ ✅ Tem            │ 200 OK  │
├──────────────────────┼──────────────┼────────────────────┼─────────┤
│ Recurso              │ Permissão    │ Role: Supervisor  │ Resultado│
├──────────────────────┼──────────────┼────────────────────┼─────────┤
│ /admin/dashboard     │ dashboard... │ ❌ NÃO tem        │ 403     │
│ /billing/total       │ view_total   │ ❌ NÃO tem        │ 403     │
│ /reports             │ view_reports │ ✅ Tem            │ 200 OK  │
│ /manage-users        │ manage_users │ ❌ NÃO tem        │ 403     │
├──────────────────────┼──────────────┼────────────────────┼─────────┤
│ Recurso              │ Permissão    │ Role: Afiliado    │ Resultado│
├──────────────────────┼──────────────┼────────────────────┼─────────┤
│ /admin/dashboard     │ dashboard... │ ❌ NÃO tem        │ 403     │
│ /billing/total       │ view_total   │ ❌ NÃO tem        │ 403     │
│ /reports             │ view_reports │ ❌ NÃO tem        │ 403     │
│ /my-links            │ view_my_links│ ✅ Tem            │ 200 OK  │
└──────────────────────┴──────────────┴────────────────────┴─────────┘
```

---

Isso resume visualmente toda a lógica de funcionamento do Sistema de Hierarquia! 🎯
