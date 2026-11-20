/* =========================================================
   Banco de 10 perguntas do quiz.
   Pontuação equilibrada entre as 7 áreas:
   frontend, backend, mobile, dados, seguranca, cloud, suporte
   ========================================================= */

const PERGUNTAS = [
  {
    pergunta: "Num trabalho em grupo, você prefere ficar responsável por...",
    opcoes: [
      { texto: "Deixar a apresentação ou o site do grupo bonito e fácil de navegar", pontos: { frontend: 2 } },
      { texto: "Organizar a lógica, os cálculos e as regras de como tudo vai funcionar", pontos: { backend: 2 } },
      { texto: "Analisar os dados da pesquisa, montar gráficos e tirar conclusões", pontos: { dados: 2 } },
      { texto: "Cuidar para que nada dê errado, falhe ou vaze informações", pontos: { seguranca: 2 } }
    ]
  },
  {
    pergunta: "Quando um computador, celular ou sistema trava, você...",
    opcoes: [
      { texto: "Tenta reiniciar, checar cabos ou entender fisicamente o que aconteceu", pontos: { suporte: 2 } },
      { texto: "Fica curioso sobre como alguém poderia ter causado aquela falha de propósito", pontos: { seguranca: 2 } },
      { texto: "Pensa em como o aplicativo foi programado para rodar no celular", pontos: { mobile: 2 } },
      { texto: "Imagina como os servidores na nuvem aguentam milhões de acessos sem cair", pontos: { cloud: 2 } }
    ]
  },
  {
    pergunta: "Qual tipo de projeto parece mais empolgante para você criar?",
    opcoes: [
      { texto: "Uma interface web interativa e animada que funciona bem em qualquer tela", pontos: { frontend: 2 } },
      { texto: "Um aplicativo de celular com notificações, câmera e GPS", pontos: { mobile: 2 } },
      { texto: "O sistema por trás de um app que processa pedidos e guarda dados", pontos: { backend: 2 } },
      { texto: "Um painel inteligente que descobre padrões escondidos em planilhas gigantes", pontos: { dados: 2 } }
    ]
  },
  {
    pergunta: "Você está montando um computador ou ambiente de trabalho. O que mais te atrai?",
    opcoes: [
      { texto: "Encaixar as peças, testar o hardware e configurar tudo até funcionar", pontos: { suporte: 2 } },
      { texto: "Automatizar instalações e colocar tudo rodando em servidores na nuvem", pontos: { cloud: 2 } },
      { texto: "Blindar o sistema com firewall, backups e configurações de privacidade", pontos: { seguranca: 1, suporte: 1 } },
      { texto: "Personalizar a aparência e os atalhos para ficar visualmente agradável", pontos: { frontend: 2 } }
    ]
  },
  {
    pergunta: "Numa rede social como Instagram ou TikTok, o que mais chama sua atenção?",
    opcoes: [
      { texto: "O design, as animações e como os botões respondem ao toque no celular", pontos: { mobile: 1, frontend: 1 } },
      { texto: "Como o algoritmo decide quais vídeos e posts recomendar para você", pontos: { dados: 2 } },
      { texto: "Como as contas são protegidas contra invasões e golpes", pontos: { seguranca: 2 } },
      { texto: "Como o sistema entrega vídeos instantaneamente para milhões de pessoas", pontos: { backend: 1, cloud: 1 } }
    ]
  },
  {
    pergunta: "Seu jeito natural de resolver problemas é mais parecido com...",
    opcoes: [
      { texto: "Testar visualmente na tela até encontrar a experiência mais intuitiva", pontos: { frontend: 2 } },
      { texto: "Montar um passo a passo lógico e estruturado até chegar à solução", pontos: { backend: 2 } },
      { texto: "Coletar informações e comparar números antes de tomar uma decisão", pontos: { dados: 2 } },
      { texto: "Automatizar tarefas repetitivas para o sistema se corrigir sozinho", pontos: { cloud: 2 } }
    ]
  },
  {
    pergunta: "Qual matéria ou atividade da escola combina mais com você?",
    opcoes: [
      { texto: "Artes, Desenho ou criação de apresentações visuais", pontos: { frontend: 1, mobile: 1 } },
      { texto: "Matemática, Estatística ou interpretação de gráficos e tabelas", pontos: { dados: 2 } },
      { texto: "Física, Eletrônica ou atividades práticas com equipamentos", pontos: { suporte: 2 } },
      { texto: "Raciocínio lógico, resolução de enigmas ou quebra-cabeças", pontos: { backend: 1, seguranca: 1 } }
    ]
  },
  {
    pergunta: "Se você fosse ajudar alguém agora com tecnologia, prefereria...",
    opcoes: [
      { texto: "Configurar o computador, impressora ou o Wi-Fi da casa", pontos: { suporte: 2 } },
      { texto: "Ensinar a criar senhas fortes e identificar links falsos", pontos: { seguranca: 2 } },
      { texto: "Recomendar e configurar aplicativos úteis no smartphone da pessoa", pontos: { mobile: 2 } },
      { texto: "Organizar uma planilha financeira automática com fórmulas e metas", pontos: { dados: 2 } }
    ]
  },
  {
    pergunta: "Imagine que você entrou em uma startup de tecnologia. Qual missão escolheria?",
    opcoes: [
      { texto: "Publicar o aplicativo oficial da empresa na Google Play e App Store", pontos: { mobile: 2 } },
      { texto: "Garantir que os servidores na nuvem escalem sem travar em dias de pico", pontos: { cloud: 2 } },
      { texto: "Construir a API que conecta o site, o app e o banco de dados", pontos: { backend: 2 } },
      { texto: "Atender a equipe interna e manter todos os equipamentos e redes no ar", pontos: { suporte: 2 } }
    ]
  },
  {
    pergunta: "O que te dá mais sensação de dever cumprido ao terminar um projeto?",
    opcoes: [
      { texto: "Ver algo visualmente incrível que qualquer pessoa usa sem precisar de manual", pontos: { frontend: 1, mobile: 1 } },
      { texto: "Saber que o sistema está rápido, automatizado e rodando 24h na nuvem", pontos: { cloud: 2 } },
      { texto: "Descobrir e corrigir uma brecha antes que cause qualquer prejuízo", pontos: { seguranca: 2 } },
      { texto: "Ver a infraestrutura e o sistema funcionando juntos sem nenhum erro", pontos: { suporte: 1, backend: 1 } }
    ]
  }
];