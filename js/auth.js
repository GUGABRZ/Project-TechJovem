/* =========================================================
   Autenticação simulada com localStorage + Controle de Admin.
   Fase 2 vai trocar isto por Supabase/Firebase Auth.
   ========================================================= */

/* E-mails autorizados como administradores do projeto */
const TJ_ADMINS = [
  "admin@techjovem.com", "crssilva1612@gmail.com"
];

/* Código alternativo para membros da equipe liberarem o Painel */
const TJ_CODIGO_ADMIN = "TECHJOVEM-ADMIN";

/* ---------- Utilitários de storage ---------- */
function tjLer(chave, padrao) {
  try {
    const v = localStorage.getItem(chave);
    return v ? JSON.parse(v) : padrao;
  } catch (e) {
    return padrao;
  }
}

function tjGravar(chave, valor) {
  localStorage.setItem(chave, JSON.stringify(valor));
}

function tjGetUsuarios() { return tjLer("tj_usuarios", []); }
function tjSalvarUsuarios(usuarios) { tjGravar("tj_usuarios", usuarios); }

/* ---------- Verificação de Administrador ---------- */
function tjEhAdmin(usuario) {
  if (!usuario) return false;
  const emailNorm = tjNormalizarEmail(usuario.email);
  return Boolean(usuario.admin) || TJ_ADMINS.map(tjNormalizarEmail).includes(emailNorm);
}

/* ---------- Hash de senha ---------- */
const TJ_ERRO_CRIPTO = "Seu navegador bloqueou a criptografia. Abra o projeto com o Live Server (localhost).";

function tjCriptoDisponivel() {
  return !!(window.crypto && window.crypto.subtle);
}

function tjBytesParaHex(bytes) {
  return Array.from(new Uint8Array(bytes)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

function tjHexParaBytes(hex) {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
  return bytes;
}

function tjNovoSalt() {
  return tjBytesParaHex(crypto.getRandomValues(new Uint8Array(16)));
}

async function tjGerarHash(senha, saltHex) {
  const chave = await crypto.subtle.importKey(
    "raw", new TextEncoder().encode(senha), "PBKDF2", false, ["deriveBits"]
  );
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt: tjHexParaBytes(saltHex), iterations: 100000, hash: "SHA-256" },
    chave, 256
  );
  return tjBytesParaHex(bits);
}

/* ---------- Validações ---------- */
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

/* ---------- Cadastro / Login ---------- */
function tjBuscarUsuario(email) {
  const alvo = tjNormalizarEmail(email);
  return tjGetUsuarios().find((u) => tjNormalizarEmail(u.email) === alvo) || null;
}

async function tjCadastrar(nome, email, senha, codigoAdmin = "") {
  nome = String(nome || "").trim();
  email = tjNormalizarEmail(email);
  codigoAdmin = String(codigoAdmin || "").trim();

  if (nome.length < 2) return { ok: false, mensagem: "Informe seu nome (mínimo 2 letras)." };
  if (!tjEmailValido(email)) return { ok: false, mensagem: "Informe um e-mail válido, como nome@email.com." };
  if (senha.length < 6) return { ok: false, mensagem: "A senha precisa ter pelo menos 6 caracteres." };
  if (!tjCriptoDisponivel()) return { ok: false, mensagem: TJ_ERRO_CRIPTO };
  if (tjBuscarUsuario(email)) return { ok: false, mensagem: "Já existe uma conta com este e-mail." };

  if (codigoAdmin && codigoAdmin !== TJ_CODIGO_ADMIN) {
    return { ok: false, mensagem: "Código de acesso de administrador inválido." };
  }

  const admin = codigoAdmin === TJ_CODIGO_ADMIN || TJ_ADMINS.map(tjNormalizarEmail).includes(email);
  const salt = tjNovoSalt();
  const senhaHash = await tjGerarHash(senha, salt);
  const usuarios = tjGetUsuarios();
  usuarios.push({ nome, email, salt, senhaHash, admin, criadoEm: new Date().toISOString() });
  tjSalvarUsuarios(usuarios);
  return { ok: true };
}

async function tjVerificarSenha(usuario, senha) {
  if (!tjCriptoDisponivel()) return false;

  if (usuario.senhaHash) {
    return (await tjGerarHash(senha, usuario.salt)) === usuario.senhaHash;
  }

  if (typeof usuario.senha === "string" && usuario.senha === senha) {
    const salt = tjNovoSalt();
    const senhaHash = await tjGerarHash(senha, salt);
    const usuarios = tjGetUsuarios();
    const alvo = usuarios.find((u) => tjNormalizarEmail(u.email) === tjNormalizarEmail(usuario.email));
    if (alvo) {
      alvo.salt = salt;
      alvo.senhaHash = senhaHash;
      delete alvo.senha;
      tjSalvarUsuarios(usuarios);
    }
    return true;
  }
  return false;
}

async function tjLogin(email, senha) {
  if (!tjCriptoDisponivel()) return { ok: false, mensagem: TJ_ERRO_CRIPTO };
  const usuario = tjBuscarUsuario(email);
  if (!usuario || !(await tjVerificarSenha(usuario, senha))) {
    return { ok: false, mensagem: "E-mail ou senha incorretos." };
  }
  localStorage.setItem("tj_usuario_logado", usuario.email);
  return { ok: true, usuario };
}

function tjUsuarioAtual() {
  const email = localStorage.getItem("tj_usuario_logado");
  return email ? tjBuscarUsuario(email) : null;
}

function tjLogout() {
  localStorage.removeItem("tj_usuario_logado");
  window.location.href = "login.html";
}

function tjExigirLogin() {
  const usuario = tjUsuarioAtual();
  if (!usuario) window.location.href = "login.html";
  return usuario;
}

/* Protege páginas exclusivas da equipe organizadora (Painel) */
function tjExigirAdmin() {
  const usuario = tjExigirLogin();
  if (!usuario) return null;
  if (!tjEhAdmin(usuario)) {
    window.location.href = "home.html";
    return null;
  }
  return usuario;
}

/* ---------- Gestão da conta (perfil) ---------- */
function tjAtualizarNome(email, novoNome) {
  novoNome = String(novoNome || "").trim();
  if (novoNome.length < 2) return { ok: false, mensagem: "O nome precisa ter pelo menos 2 letras." };
  const usuarios = tjGetUsuarios();
  const alvo = usuarios.find((u) => tjNormalizarEmail(u.email) === tjNormalizarEmail(email));
  if (!alvo) return { ok: false, mensagem: "Conta não encontrada." };
  alvo.nome = novoNome;
  tjSalvarUsuarios(usuarios);
  return { ok: true };
}

function tjAtivarAdmin(email, codigo) {
  if (String(codigo || "").trim() !== TJ_CODIGO_ADMIN) {
    return { ok: false, mensagem: "Código da equipe incorreto." };
  }
  const usuarios = tjGetUsuarios();
  const alvo = usuarios.find((u) => tjNormalizarEmail(u.email) === tjNormalizarEmail(email));
  if (!alvo) return { ok: false, mensagem: "Conta não encontrada." };
  alvo.admin = true;
  tjSalvarUsuarios(usuarios);
  return { ok: true };
}

async function tjAlterarSenha(email, senhaAtual, senhaNova) {
  const usuario = tjBuscarUsuario(email);
  if (!usuario) return { ok: false, mensagem: "Conta não encontrada." };
  if (!(await tjVerificarSenha(usuario, senhaAtual))) return { ok: false, mensagem: "A senha atual está incorreta." };
  if (senhaNova.length < 6) return { ok: false, mensagem: "A nova senha precisa ter pelo menos 6 caracteres." };

  const salt = tjNovoSalt();
  const senhaHash = await tjGerarHash(senhaNova, salt);
  const usuarios = tjGetUsuarios();
  const alvo = usuarios.find((u) => tjNormalizarEmail(u.email) === tjNormalizarEmail(email));
  alvo.salt = salt;
  alvo.senhaHash = senhaHash;
  delete alvo.senha;
  tjSalvarUsuarios(usuarios);
  return { ok: true };
}

async function tjExcluirConta(email, senha) {
  const usuario = tjBuscarUsuario(email);
  if (!usuario) return { ok: false, mensagem: "Conta não encontrada." };
  if (!(await tjVerificarSenha(usuario, senha))) return { ok: false, mensagem: "Senha incorreta." };

  tjSalvarUsuarios(tjGetUsuarios().filter((u) => tjNormalizarEmail(u.email) !== tjNormalizarEmail(email)));
  if (typeof tjApagarDadosUsuario === "function") tjApagarDadosUsuario(email);
  localStorage.removeItem("tj_usuario_logado");
  return { ok: true };
}