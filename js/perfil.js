/* Perfil: editar nome, trocar senha, ativar acesso admin e excluir conta */

(function () {
  let usuario = tjExigirLogin();
  if (!usuario) return;
  tjMontarTopbar();

  function preencherDados() {
    const admin = tjEhAdmin(usuario);
    document.getElementById("d-email").textContent = usuario.email;
    document.getElementById("d-desde").textContent = usuario.criadoEm ? tjFormatarData(usuario.criadoEm) : "—";
    document.getElementById("d-quizzes").textContent = tjGetHistorico(usuario.email).length;
    document.getElementById("p-nome").value = usuario.nome;

    const badge = document.getElementById("d-perfil-tipo");
    badge.textContent = admin ? "Administrador(a) do Projeto" : "Estudante";

    const cardAdmin = document.getElementById("card-admin-ativar");
    if (cardAdmin) cardAdmin.hidden = admin;
  }
  preencherDados();

  document.getElementById("form-nome").addEventListener("submit", (e) => {
    e.preventDefault();
    const msg = document.getElementById("msg-nome");
    const r = tjAtualizarNome(usuario.email, document.getElementById("p-nome").value);
    if (r.ok) {
      usuario = tjUsuarioAtual();
      tjMensagem(msg, "sucesso", "Nome atualizado!");
    } else {
      tjMensagem(msg, "erro", r.mensagem);
    }
  });

  document.getElementById("form-senha").addEventListener("submit", async (e) => {
    e.preventDefault();
    const msg = document.getElementById("msg-senha");
    const atual = document.getElementById("p-atual").value;
    const nova = document.getElementById("p-nova").value;
    const confirma = document.getElementById("p-confirma").value;

    if (!atual || !nova) { tjMensagem(msg, "erro", "Preencha a senha atual e a nova senha."); return; }
    if (nova !== confirma) { tjMensagem(msg, "erro", "A confirmação não é igual à nova senha."); return; }

    const r = await tjAlterarSenha(usuario.email, atual, nova);
    if (r.ok) {
      e.target.reset();
      document.querySelectorAll("[data-forca-de]").forEach((m) => {
        m.removeAttribute("data-nivel");
        m.querySelector("small").textContent = "";
      });
      tjMensagem(msg, "sucesso", "Senha alterada com sucesso!");
    } else {
      tjMensagem(msg, "erro", r.mensagem);
    }
  });

  const formAdmin = document.getElementById("form-admin");
  if (formAdmin) {
    formAdmin.addEventListener("submit", (e) => {
      e.preventDefault();
      const msg = document.getElementById("msg-admin");
      const codigo = document.getElementById("p-codigo-admin").value;
      const r = tjAtivarAdmin(usuario.email, codigo);
      if (r.ok) {
        usuario = tjUsuarioAtual();
        tjMontarTopbar();
        preencherDados();
      } else {
        tjMensagem(msg, "erro", r.mensagem);
      }
    });
  }

  document.getElementById("form-excluir").addEventListener("submit", async (e) => {
    e.preventDefault();
    const msg = document.getElementById("msg-excluir");
    const senha = document.getElementById("p-excluir-senha").value;
    if (!senha) { tjMensagem(msg, "erro", "Digite sua senha para confirmar."); return; }

    if (!window.confirm("Tem certeza? Sua conta e todos os seus dados serão apagados.")) return;

    const r = await tjExcluirConta(usuario.email, senha);
    if (r.ok) {
      window.location.href = "login.html";
    } else {
      tjMensagem(msg, "erro", r.mensagem);
    }
  });
})();