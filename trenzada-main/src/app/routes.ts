import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { AdminLayout } from "./components/AdminLayout";
import { VisaoGeral } from "./pages/VisaoGeral";
import { Campanhas } from "./pages/Campanhas";
import { MeusLinks } from "./pages/MeusLinks";
import { RankingGeral } from "./pages/RankingGeral";
import { Academy } from "./pages/Academy";
import { Premiacoes } from "./pages/Premiacoes";
import { Compliance } from "./pages/Compliance";
import { Indicacoes } from "./pages/Indicacoes";
import { Financeiro } from "./pages/Financeiro";
import { MeuPerfil } from "./pages/MeuPerfil";
import { Suporte } from "./pages/Suporte";
import { TermosDeUso } from "./pages/TermosDeUso";
import { EmailMarketing } from "./pages/EmailMarketing";
import { CopyIA } from "./pages/CopyIA";
import { Produtos } from "./pages/Produtos";
import { Divulgacao } from "./pages/Divulgacao";
import { VIP } from "./pages/VIP";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { AdminUsuarios } from "./pages/admin/AdminUsuarios";
import { AdminProjetos } from "./pages/admin/AdminProjetos";
import { AdminFinanceiro } from "./pages/admin/AdminFinanceiro";
import { AdminNotificacoes } from "./pages/admin/AdminNotificacoes";
import { AdminConfiguracoes } from "./pages/admin/AdminConfiguracoes";
import { AdminCampanhas } from "./pages/admin/AdminCampanhas";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { RequireAuth } from "./components/auth/RequireAuth";
import { RequireAdmin } from "./components/auth/RequireAdmin";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/",
    Component: RequireAuth,
    children: [
      {
        Component: Layout,
        children: [
          { index: true, Component: VisaoGeral },
          { path: "campanhas", Component: Campanhas },
          { path: "meus-links", Component: MeusLinks },
          { path: "ranking-geral", Component: RankingGeral },
          { path: "academy", Component: Academy },
          { path: "premiacoes", Component: Premiacoes },
          { path: "compliance", Component: Compliance },
          { path: "indicacoes", Component: Indicacoes },
          { path: "financeiro", Component: Financeiro },
          { path: "meu-perfil", Component: MeuPerfil },
          { path: "suporte", Component: Suporte },
          { path: "termos-de-uso", Component: TermosDeUso },
          { path: "email-marketing", Component: EmailMarketing },
          { path: "copy-ia", Component: CopyIA },
          { path: "produtos", Component: Produtos },
          { path: "divulgacao", Component: Divulgacao },
          { path: "vip", Component: VIP },
        ],
      },
    ],
  },
  {
    path: "/admin",
    Component: RequireAdmin,
    children: [
      {
        Component: AdminLayout,
        children: [
          { index: true, Component: AdminDashboard },
          { path: "usuarios", Component: AdminUsuarios },
          { path: "projetos", Component: AdminProjetos },
          { path: "financeiro", Component: AdminFinanceiro },
          { path: "notificacoes", Component: AdminNotificacoes },
          { path: "configuracoes", Component: AdminConfiguracoes },
          { path: "admincampanhas", Component: AdminCampanhas },
        ],
      },
    ],
  },
]);