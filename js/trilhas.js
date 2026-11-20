/* =========================================================
   Dados das 7 áreas de carreira em TI.
   ========================================================= */

const TRILHAS = {
  frontend: {
    nome: "Front-end",
    cor: "var(--trilha-frontend)",
    icone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M9 14l-2 2 2 2M15 14l2 2-2 2"/></svg>`,
    resumo: "Você curte deixar interfaces bonitas, interativas e fáceis de usar.",
    descricao:
      "Você tem perfil para Front-end: a área que cuida de toda a experiência visual e interativa dos sites e sistemas — tudo o que o usuário vê, toca e navega na tela.",
    roadmap: [
      {
        titulo: "Fundamentos de HTML e CSS",
        descricao: "Aprenda a estruturar páginas e estilizá-las do zero.",
        link: "https://www.ev.org.br/cursos/crie-um-site-simples-usando-html-css-e-javascript",
        linkTexto: "Curso — Fundação Bradesco: Crie um site simples"
      },
      {
        titulo: "JavaScript na prática",
        descricao: "Dê vida às páginas com interatividade e lógica.",
        link: "https://www.betrybe.com/curso-de-programacao-javascript-do-zero",
        linkTexto: "Curso — Trybe: JavaScript do zero"
      },
      {
        titulo: "Um framework moderno",
        descricao: "Explore React, a biblioteca mais usada do mercado.",
        link: "https://youtu.be/2RWsLmu8yVc?si=bO6mWPcLmH5VvlGQ",
        linkTexto: "Curso — Youtube: React do zero"
      },
      {
        titulo: "Monte um portfólio",
        descricao: "Publique projetos próprios para mostrar seu trabalho.",
        link: "https://youtu.be/V1vmK3EOCuI?si=jrM5xVNJ4R9TOb0i",
        linkTexto: "Vídeo — Youtube: Como criar um portfólio de front-end"
      }
    ]
  },

  backend: {
    nome: "Back-end",
    cor: "var(--trilha-backend)",
    icone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="6" rx="1.5"/><rect x="3" y="14" width="18" height="6" rx="1.5"/><circle cx="7" cy="7" r="1"/><circle cx="7" cy="17" r="1"/></svg>`,
    resumo: "Você gosta de resolver problemas com lógica, regras e bancos de dados.",
    descricao:
      "Você tem perfil para Back-end: a área responsável pelas regras de negócio, segurança de dados e funcionamento interno dos sistemas — o motor por trás da tela.",
    roadmap: [
      {
        titulo: "Lógica de programação",
        descricao: "Domine variáveis, laços e estruturas de decisão.",
        link: "https://betrybe.com/cursos/logica-de-programacao",
        linkTexto: "Curso — Trybe: Lógica de programação"
      },
      {
        titulo: "Uma linguagem de back-end",
        descricao: "Python ou JavaScript (Node.js) são ótimos pontos de partida.",
        link: "https://www.ev.org.br/cursos/linguagem-de-programacao-python-basico",
        linkTexto: "Curso — Fundação Bradesco: Python Básico"
      },
      {
        titulo: "Bancos de dados",
        descricao: "Aprenda a guardar e consultar informações com SQL.",
        link: "https://coddy.tech/landing/pt/sql",
        linkTexto: "Curso — Coddy: SQL do zero"
      },
      {
        titulo: "Construa uma API",
        descricao: "Crie um serviço simples que outros sistemas possam usar.",
        link: "https://youtu.be/FBLAV1SbJFk?si=IXEh1HMjhq4a68CB",
        linkTexto: "Vídeo — Youtube: Como CRIAR uma API com PYTHON"
      }
    ]
  },

  mobile: {
    nome: "Desenvolvimento Mobile",
    cor: "var(--trilha-mobile)",
    icone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="2" width="12" height="20" rx="2.5"/><path d="M11 18h2"/></svg>`,
    resumo: "Você quer criar aplicativos para Android e iPhone na palma da mão.",
    descricao:
      "Você tem perfil para Desenvolvimento Mobile: a área dedicada a criar aplicativos para smartphones e tablets, aproveitando recursos como câmera, GPS e notificações.",
    roadmap: [
      {
        titulo: "Lógica e programação moderna",
        descricao: "Aprenda os fundamentos com JavaScript ou Kotlin.",
        link: "https://coddy.tech/landing/pt/javascript",
        linkTexto: "Curso — Coddy: JavaScript do zero"
      },
      {
        titulo: "Interfaces para telas móveis",
        descricao: "Entenda navegação por toque, gestos e tamanhos de tela.",
        link: "https://youtu.be/1a8P6Qyie30?si=IeQg0U90VXIfyiMq",
        linkTexto: "Vídeo — Youtube: Como usar o FIGMA"
      },
      {
        titulo: "Framework Multiplataforma",
        descricao: "Crie apps para Android e iOS com React Native ou Flutter.",
        link: "https://youtu.be/7uGjAMhI8G4?si=DhWoFA2PQRaGZvah",
        linkTexto: "Vídeo — Youtube: Como criar um APP com React Native"
      },
      {
        titulo: "Publique seu primeiro app",
        descricao: "Integre APIs e teste seu aplicativo em aparelhos reais.",
        link: "https://youtu.be/FULK2o5TRiM?si=8faZiNpoueb5VnjN",
        linkTexto: "Video - Youtube: React Native (Expo) para Iniciantes"
      }
    ]
  },

  dados: {
    nome: "Ciência de Dados",
    cor: "var(--trilha-dados)",
    icone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18"/><path d="M7 15l4-4 4 3 5-7"/></svg>`,
    resumo: "Você gosta de números, padrões e tirar conclusões de informações.",
    descricao:
      "Você tem perfil para Ciência de Dados: a área que transforma grandes volumes de informação em gráficos, respostas estratégicas e modelos de Inteligência Artificial.",
    roadmap: [
      {
        titulo: "Estatística e lógica",
        descricao: "Entenda os conceitos que sustentam a análise de dados.",
        link: "https://www.ev.org.br/cursos/introducao-a-analise-de-dados-microsoft-power-bi",
        linkTexto: "Curso — Fundação Bradesco: Introdução à análise de dados"
      },
      {
        titulo: "Python para dados",
        descricao: "Aprenda a linguagem mais usada para análise de dados.",
        link: "https://youtu.be/HKuEi7HXFxo?si=6RioCZiIOGzFt0gF",
        linkTexto: "Vídeo — Youtube: Python para Análise de Dados"
      },
      {
        titulo: "Análise de dados",
        descricao: "Pratique com bibliotecas como pandas e visualizações.",
        link: "https://youtu.be/sODNyvVW8wY?si=0VIjbvEryAprefw6",
        linkTexto: "Vídeo — Youtube: Análise de Dados com Pandas"
      },
      {
        titulo: "Primeiros passos em Machine Learning",
        descricao: "Entenda como computadores aprendem a partir de dados.",
        link: "https://youtu.be/0PrOA2JK6GQ?si=inCbgasadmkPZOq9",
        linkTexto: "Vídeo — Youtube: Machine Learning Explicado"
      }
    ]
  },

  seguranca: {
    nome: "Cibersegurança",
    cor: "var(--trilha-seguranca)",
    icone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z"/><path d="M9 12l2 2 4-4"/></svg>`,
    resumo: "Você gosta de entender como falhas acontecem para proteger sistemas.",
    descricao:
      "Você tem perfil para Cibersegurança: a área que protege sistemas, redes, dados e pessoas contra invasões, golpes digitais e vulnerabilidades.",
    roadmap: [
      {
        titulo: "Fundamentos de redes",
        descricao: "Entenda como computadores se comunicam antes de protegê-los.",
        link: "https://youtu.be/9cF7jk4fiak?si=IUzYm8jCOQAIYYED",
        linkTexto: "Video — Redes de computadores para leigos"
      },
      {
        titulo: "Fundamentos de segurança",
        descricao: "Conheça os principais conceitos e tipos de ameaças.",
        link: "https://youtube.com/playlist?list=PLHz_AreHm4dlaTyjolzCFC6IjLzO8O0XV&si=rs6LwyR0Zp3cD52F",
        linkTexto: "Curso — Youtube: Introdução à Segurança da Informação"
      },
      {
        titulo: "Prática em ambiente seguro",
        descricao: "Resolva desafios práticos em laboratórios controlados.",
        link: "https://hackerdna.com/pt-br/blog/laboratorios-ciberseguranca",
        linkTexto: "HackerDNA — Laboratórios de Cibersegurança"
      },
      {
        titulo: "Boas práticas e certificações",
        descricao: "Explore trilhas introdutórias reconhecidas pelo mercado.",
        link: "https://www.cisa.gov/topics/cybersecurity-best-practices",
        linkTexto: "CISA — Cybersecurity Best Practices"
      }
    ]
  },

  cloud: {
    nome: "Cloud & DevOps",
    cor: "var(--trilha-cloud)",
    icone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.5 19H7a5 5 0 0 1-.5-9.97A6 6 0 0 1 18 11a4 4 0 0 1-.5 8z"/></svg>`,
    resumo: "Você curte servidores na nuvem, automação e sistemas sempre no ar.",
    descricao:
      "Você tem perfil para Cloud & DevOps: a área que coloca sites e aplicativos na nuvem, automatiza entregas e garante que tudo aguente milhões de acessos sem cair.",
    roadmap: [
      {
        titulo: "Linux e linha de comando",
        descricao: "Aprenda a operar servidores usando o terminal Linux.",
        link: "https://youtube.com/playlist?list=PLX-2Ss2Z7fNiMcUyf-Yk9MB3byCBI6dvf&si=ChzvpmI-UuEx2Tca",
        linkTexto: "Curso — Youtube: Linux para iniciantes"
      },
      {
        titulo: "Git e controle de versão",
        descricao: "Domine o fluxo colaborativo de código usado pelas equipes.",
        link: "https://youtube.com/playlist?list=PLHz_AreHm4dm7ZULPAmadvNhH6vk9oNZA&si=lw6TmNneRQSMFMI9",
        linkTexto: "Curso em Vídeo — Git e GitHub"
      },
      {
        titulo: "Conceitos de Computação em Nuvem",
        descricao: "Entenda máquinas virtuais, armazenamento e redes na nuvem.",
        link: "https://www.skills.google/course_templates/153",
        linkTexto: "Curso — Google Cloud: Fundamentos de Computação em Nuvem"
      },
      {
        titulo: "Containers e automação",
        descricao: "Conheça Docker e como sistemas são publicados automaticamente.",
        link: "https://youtu.be/ntbpIfS44Gw?si=8Tp3l_3HDLCCztG5",
        linkTexto: "Video — Youtube: Docker para iniciantes"
      }
    ]
  },

  suporte: {
    nome: "Suporte / Redes",
    cor: "var(--trilha-suporte)",
    icone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 0 0 5.4-5.4l-2.2 2.2-2.8-2.8 2.2-2.4z"/></svg>`,
    resumo: "Você gosta de mexer com hardware, redes e resolver problemas na hora.",
    descricao:
      "Você tem perfil para Suporte e Redes: a área essencial que mantém computadores, Wi-Fi, servidores locais e equipamentos funcionando no dia a dia.",
    roadmap: [
      {
        titulo: "Fundamentos de hardware",
        descricao: "Entenda como os componentes de um computador funcionam.",
        link: "https://youtu.be/bhFlon4d29c?si=D-lGNDJdgY6thuD2",
        linkTexto: "Vídeo — Youtube: Conceitos fundamentais de hardware e software"
      },
      {
        titulo: "Fundamentos de redes",
        descricao: "Aprenda como redes locais e a internet funcionam.",
        link: "https://youtu.be/vqrvOz1zSgY?si=vxmk8CRYy4BO1mg5",
        linkTexto: "Vídeo — Youtube: Fundamentos de Redes"
      },
      {
        titulo: "Sistemas operacionais",
        descricao: "Pratique administração básica de Windows e Linux.",
        link: "https://youtube.com/playlist?list=PLAp37wMSBouCZmNQGmErvuvdf14gKoiTx&si=Y19NXCozpw-vM7DT",
        linkTexto: "Curso — Youtube: Curso de Sistemas Operacionais"
      },
      {
        titulo: "Primeira certificação",
        descricao: "Explore o caminho para certificações de entrada no mercado.",
        link: "https://www.ev.org.br/cursos/fundamentos-de-ti-hardware-e-software",
        linkTexto: "Curso — Fundação Bradesco: Fundamentos de TI, Hardware e Software"
      }
    ]
  }
};