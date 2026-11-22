/* =========================================================
   Autenticação com Supabase Auth.
   Mantém a sessão em memória (tjSessao) para que as páginas
   possam ler o usuário de forma síncrona após tjCarregarSessao().
   ========================================================= */

let tjSessao = null; // { id, email, nome, admin }

function tjNormalizarEmail(email) { return String(email || "").trim().toLowerCase(); }

function tjEmailValido(email) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email); }

function tjForcaSenha(senha) {
  if (senha.length < 6) return { nivel: 0, texto: "muito curta (mínimo 6 caracteres)" };
  let pts = 0;
  if (senha.length >= 10) pts++;
  if (/[a-z]/.test(senha) && /[A-Z]/.test(senha)) pts++;
  if (/\d/.test(senha)) pts++;
  if (/[^A-Za-z0-9]/.test(senha)) pts++;
  if (pts <= 1) return { nivel: 1, texto: "fraca" };
  if (pts === 2) return { nivel: 2, texto: "média" };
  return { nivel: 3, texto: "forte" };
}

/* Traduz erros do Supabase para mensagens em português */
function tjErroAuth(erro) {
  const m = (erro && erro.message) || "";
  if (/invalid login/i.test(m)) return "E-mail ou senha incorretos.";
  if (/not confirmed/i.test(m)) return "Confirme seu e-mail antes de entrar (veja a caixa de entrada).";
  if (/already registered|already been registered/i.test(m)) return "Já existe uma conta com este e-mail.";
  if (/at least 6|least 6/i.test(m)) return "A senha precisa ter pelo menos 6 caracteres.";
  if (/rate limit|too many/i.test(m)) return "Muitas tentativas. Espere um pouco e tente de novo.";
  return "Não foi possível concluir. Tente novamente.";
}

/* Lê a sessão atual, o perfil e os dados do usuário. Chamar no início de cada página. */
async function tjCarregarSessao() {
  const { data } = await tjDb.auth.getSession();
  const user = data && data.session ? data.session.user : null;
  if (!user) { tjSessao = null; return null; }

  const { data: perfil } = await tjDb
    .from("profiles").select("nome, is_admin").eq("id", user.id).maybeSingle();

  tjSessao = {
    id: user.id,
    email: user.email,
    nome: (perfil && perfil.nome) || (user.user_metadata && user.user_metadata.nome) || "",
    admin: Boolean(perfil && perfil.is_admin)
  };
  await tjCarregarDados();
  return tjSessao;
}

/* ---------- Cadastro / Login ---------- */
async function tjCadastrar(nome, email, senha) {
  nome = String(nome || "").trim();
  email = tjNormalizarEmail(email);

  if (nome.length < 2) return { ok: false, mensagem: "Informe seu nome (mínimo 2 letras)." };
  if (!tjEmailValido(email)) return { ok: false, mensagem: "Informe um e-mail válido, como nome@email.com." };
  if (senha.length < 6) return { ok: false, mensagem: "A senha precisa ter pelo menos 6 caracteres." };

  const { data, error } = await tjDb.auth.signUp({
    email,
    password: senha,
    options: { data: { nome } }
  });
  if (error) return { ok: false, mensagem: tjErroAuth(error) };

  // Supabase devolve identities vazio quando o e-mail já existe
  if (data.user && Array.isArray(data.user.identities) && data.user.identities.length === 0) {
    return { ok: false, mensagem: "Já existe uma conta com este e-mail." };
  }
  // Sem sessão = o projeto exige confirmação por e-mail
  if (!data.session) return { ok: true, precisaConfirmar: true };
  return { ok: true };
}

async function tjLogin(email, senha) {
  const { error } = await tjDb.auth.signInWithPassword({
    email: tjNormalizarEmail(email),
    password: senha
  });
  if (error) return { ok: false, mensagem: tjErroAuth(error) };
  const usuario = await tjCarregarSessao();
  return { ok: true, usuario };
}

function tjUsuarioAtual() { return tjSessao; }

async function tjLogout() {
  await tjDb.auth.signOut();
  tjSessao = null;
  window.location.href = "login.html";
}

/* Usar depois de await tjCarregarSessao() */
function tjExigirLogin() {
  if (!tjSessao) window.location.href = "login.html";
  return tjSessao;
}

function tjEhAdmin(usuario) { return Boolean(usuario && usuario.admin); }

/* Protege páginas exclusivas da equipe. A verificação real está no banco (estatisticas_admin). */
function tjExigirAdmin() {
  const usuario = tjExigirLogin();
  if (!usuario) return null;
  if (!tjEhAdmin(usuario)) { window.location.href = "home.html"; return null; }
  return usuario;
}

/* ---------- Gestão da conta (perfil) ---------- */
async function tjAtualizarNome(email, novoNome) {
  novoNome = String(novoNome || "").trim();
  if (novoNome.length < 2) return { ok: false, mensagem: "O nome precisa ter pelo menos 2 letras." };
  if (!tjSessao) return { ok: false, mensagem: "Entre na sua conta para alterar o nome." };

  const { error } = await tjDb.from("profiles").update({ nome: novoNome }).eq("id", tjSessao.id);
  if (error) return { ok: false, mensagem: "Não foi possível salvar o nome." };
  tjSessao.nome = novoNome;
  return { ok: true };
}

/* Ativa o modo administrador com o código da equipe. A validação é feita no banco. */
async function tjAtivarAdmin(email, codigo) {
  const { data, error } = await tjDb.rpc("ativar_admin", { codigo: String(codigo || "").trim() });
  if (error) return { ok: false, mensagem: "Não foi possível verificar o código agora. Tente de novo." };
  if (!data) return { ok: false, mensagem: "Código da equipe incorreto." };
  await tjCarregarSessao();
  return { ok: true };
}

async function tjAlterarSenha(email, senhaAtual, senhaNova) {
  if (senhaNova.length < 6) return { ok: false, mensagem: "A nova senha precisa ter pelo menos 6 caracteres." };

  // Confirma a senha atual antes de trocar
  const { error: erroAtual } = await tjDb.auth.signInWithPassword({
    email: tjNormalizarEmail(email),
    password: senhaAtual
  });
  if (erroAtual) return { ok: false, mensagem: "A senha atual está incorreta." };

  const { error } = await tjDb.auth.updateUser({ password: senhaNova });
  if (error) return { ok: false, mensagem: tjErroAuth(error) };
  return { ok: true };
}

async function tjExcluirConta(email, senha) {
  const { error: erroAtual } = await tjDb.auth.signInWithPassword({
    email: tjNormalizarEmail(email),
    password: senha
  });
  if (erroAtual) return { ok: false, mensagem: "Senha incorreta." };

  const { error } = await tjDb.rpc("excluir_minha_conta");
  if (error) return { ok: false, mensagem: "Não foi possível excluir a conta. Tente novamente." };

  await tjDb.auth.signOut();
  tjSessao = null;
  return { ok: true };
}
