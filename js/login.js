/* Lógica de login e cadastro */

(function () {
  if (tjUsuarioAtual()) {
    window.location.href = "home.html";
    return;
  }

  const abas = {
    login: { aba: document.getElementById("tab-login"), tela: document.getElementById("tela-login") },
    cadastro: { aba: document.getElementById("tab-cadastro"), tela: document.getElementById("tela-cadastro") }
  };

  function mostrarAba(nome) {
    Object.entries(abas).forEach(([chave, { aba, tela }]) => {
      const ativa = chave === nome;
      aba.classList.toggle("ativa", ativa);
      aba.setAttribute("aria-selected", ativa);
      tela.classList.toggle("ativa", ativa);
    });
  }

  abas.login.aba.addEventListener("click", () => mostrarAba("login"));
  abas.cadastro.aba.addEventListener("click", () => mostrarAba("cadastro"));

  [abas.login.aba, abas.cadastro.aba].forEach((aba) => {
    aba.addEventListener("keydown", (e) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      const destino = aba === abas.login.aba ? "cadastro" : "login";
      mostrarAba(destino);
      abas[destino].aba.focus();
    });
  });

  function bloquear(form, bloqueado, textoOriginal) {
    const botao = form.querySelector("button[type=submit]");
    botao.disabled = bloqueado;
    botao.textContent = bloqueado ? "Aguarde..." : textoOriginal;
  }

  document.getElementById("form-login").addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;
    const msg = document.getElementById("msg-login");
    tjLimparMensagem(msg);

    const email = document.getElementById("login-email").value;
    const senha = document.getElementById("login-senha").value;
    if (!email.trim() || !senha) {
      tjMensagem(msg, "erro", "Preencha o e-mail e a senha.");
      return;
    }

    bloquear(form, true, "Entrar");
    const resultado = await tjLogin(email, senha);
    if (resultado.ok) {
      window.location.href = "home.html";
    } else {
      tjMensagem(msg, "erro", resultado.mensagem);
      bloquear(form, false, "Entrar");
    }
  });

  document.getElementById("form-cadastro").addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;
    const msg = document.getElementById("msg-cadastro");
    tjLimparMensagem(msg);

    const nome = document.getElementById("cad-nome").value;
    const email = document.getElementById("cad-email").value;
    const senha = document.getElementById("cad-senha").value;
    const codigoAdmin = document.getElementById("cad-codigo-admin").value;

    bloquear(form, true, "Criar conta");
    const resultado = await tjCadastrar(nome, email, senha, codigoAdmin);
    if (resultado.ok) {
      await tjLogin(email, senha);
      window.location.href = "home.html";
    } else {
      tjMensagem(msg, "erro", resultado.mensagem);
      bloquear(form, false, "Criar conta");
    }
  });
})();