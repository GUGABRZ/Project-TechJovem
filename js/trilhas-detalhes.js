/* =========================================================
   Informações detalhadas de cada área (salários, mercado,
   rotina, ferramentas, profissões e soft skills).
   Carregue DEPOIS de trilhas.js.
   ========================================================= */

Object.assign(TRILHAS.frontend, {
  salario: {
    junior: "R$ 3.200 – R$ 4.800",
    pleno: "R$ 5.500 – R$ 8.500",
    senior: "R$ 9.500 – R$ 15.000+"
  },
  mercado: {
    demanda: "Alta demanda",
    modelo: "Híbrido ou Remoto",
    destaque: "Presente em praticamente toda empresa digital, e-commerce e startup."
  },
  diaADia: [
    "Transformar protótipos de design em páginas e telas responsivas",
    "Garantir que o site funcione bem no celular, tablet e computador",
    "Conectar interfaces às APIs junto com a equipe de back-end"
  ],
  ferramentas: ["HTML", "CSS", "JavaScript", "React", "TypeScript", "Figma", "Git"],
  profissoes: ["Desenvolvedor(a) Front-end", "Desenvolvedor(a) Web", "UI Developer", "Engenheiro(a) de Interface"],
  softSkills: ["Senso estético", "Empatia com o usuário", "Atenção aos detalhes", "Comunicação"],
  primeiroPasso: "Escolha um site ou aplicativo que você gosta e tente recriar a tela inicial dele usando apenas HTML e CSS."
});

Object.assign(TRILHAS.backend, {
  salario: {
    junior: "R$ 3.500 – R$ 5.200",
    pleno: "R$ 6.000 – R$ 9.500",
    senior: "R$ 10.500 – R$ 17.000+"
  },
  mercado: {
    demanda: "Demanda muito alta",
    modelo: "Híbrido ou Remoto",
    destaque: "Base de bancos, fintechs, plataformas SaaS e sistemas corporativos."
  },
  diaADia: [
    "Criar as regras de negócio e a lógica que fazem o sistema funcionar",
    "Modelar, salvar e consultar informações em bancos de dados",
    "Construir APIs seguras para sites e aplicativos móveis consumirem"
  ],
  ferramentas: ["Python", "Node.js", "Java", "SQL", "PostgreSQL", "Git", "Docker"],
  profissoes: ["Desenvolvedor(a) Back-end", "Engenheiro(a) de Software", "Desenvolvedor(a) de APIs", "Arquiteto(a) de Software"],
  softSkills: ["Raciocínio lógico", "Organização", "Visão sistêmica", "Resolução de problemas"],
  primeiroPasso: "Crie uma pequena API de lista de tarefas que permita cadastrar, listar e excluir itens."
});

Object.assign(TRILHAS.mobile, {
  salario: {
    junior: "R$ 3.600 – R$ 5.300",
    pleno: "R$ 6.200 – R$ 9.800",
    senior: "R$ 10.500 – R$ 16.500+"
  },
  mercado: {
    demanda: "Alta demanda",
    modelo: "Híbrido ou Remoto",
    destaque: "O Brasil está entre os países que mais utilizam aplicativos móveis no mundo."
  },
  diaADia: [
    "Desenvolver aplicativos fluidos para Android e iOS",
    "Integrar recursos nativos como câmera, localização GPS e notificações",
    "Publicar atualizações na Google Play Store e Apple App Store"
  ],
  ferramentas: ["React Native", "Flutter", "Kotlin", "Swift", "Expo", "Firebase", "Git"],
  profissoes: ["Desenvolvedor(a) Mobile", "Desenvolvedor(a) Android", "Desenvolvedor(a) iOS", "Engenheiro(a) Mobile"],
  softSkills: ["Foco na experiência mobile", "Criatividade", "Adaptabilidade", "Testes constantes"],
  primeiroPasso: "Monte um aplicativo simples de bloco de notas ou controle de hábitos e teste no seu próprio celular."
});

Object.assign(TRILHAS.dados, {
  salario: {
    junior: "R$ 3.800 – R$ 5.600",
    pleno: "R$ 6.500 – R$ 10.500",
    senior: "R$ 11.500 – R$ 18.000+"
  },
  mercado: {
    demanda: "Em forte expansão",
    modelo: "Híbrido ou Remoto",
    destaque: "Essencial para decisões estratégicas e projetos de Inteligência Artificial."
  },
  diaADia: [
    "Limpar, cruzar e organizar grandes bases de informação",
    "Criar dashboards e relatórios visuais que orientam decisões",
    "Treinar modelos estatísticos e de Machine Learning para previsões"
  ],
  ferramentas: ["Python", "SQL", "Pandas", "Power BI", "Excel", "Jupyter", "Scikit-learn"],
  profissoes: ["Analista de Dados", "Cientista de Dados", "Engenheiro(a) de Dados", "Analista de BI"],
  softSkills: ["Pensamento analítico", "Curiosidade investigativa", "Comunicação clara", "Visão de negócio"],
  primeiroPasso: "Baixe uma planilha pública (sobre filmes, esportes ou clima) e crie 3 gráficos que contem uma história."
});

Object.assign(TRILHAS.seguranca, {
  salario: {
    junior: "R$ 4.000 – R$ 6.000",
    pleno: "R$ 7.000 – R$ 11.500",
    senior: "R$ 12.500 – R$ 20.000+"
  },
  mercado: {
    demanda: "Escassez de talentos",
    modelo: "Híbrido, Remoto ou Presencial",
    destaque: "Uma das áreas mais valorizadas devido à LGPD e à proteção contra ataques digitais."
  },
  diaADia: [
    "Testar sistemas em busca de brechas antes que invasores as explorem",
    "Monitorar alertas de rede e responder a incidentes de segurança",
    "Orientar equipes sobre senhas, privacidade e boas práticas digitais"
  ],
  ferramentas: ["Linux", "Wireshark", "Nmap", "Kali Linux", "Burp Suite", "Python", "Firewalls"],
  profissoes: ["Analista de Segurança", "Pentester (Ethical Hacker)", "Analista de SOC", "Especialista em Segurança da Informação"],
  softSkills: ["Ética e responsabilidade", "Pensamento preventivo", "Investigação", "Aprendizado contínuo"],
  primeiroPasso: "Crie uma conta gratuita no TryHackMe e complete as primeiras salas introdutórias de defesa e redes."
});

Object.assign(TRILHAS.cloud, {
  salario: {
    junior: "R$ 4.200 – R$ 6.200",
    pleno: "R$ 7.500 – R$ 12.000",
    senior: "R$ 13.000 – R$ 21.000+"
  },
  mercado: {
    demanda: "Demanda muito alta",
    modelo: "Majoritariamente Remoto",
    destaque: "Quase toda aplicação moderna roda em nuvem como AWS, Azure ou Google Cloud."
  },
  diaADia: [
    "Configurar e escalar servidores na nuvem para suportar picos de acesso",
    "Automatizar testes e publicações de código (CI/CD)",
    "Monitorar desempenho, custos e disponibilidade dos sistemas 24h"
  ],
  ferramentas: ["Linux", "Docker", "AWS / Azure", "GitHub Actions", "Kubernetes", "Terraform", "Bash"],
  profissoes: ["Engenheiro(a) DevOps", "Arquiteto(a) de Cloud", "SRE (Engenheiro de Confiabilidade)", "Analista de Cloud"],
  softSkills: ["Automação e eficiência", "Calma sob pressão", "Colaboração entre equipes", "Curiosidade técnica"],
  primeiroPasso: "Aprenda os comandos essenciais do terminal Linux e publique um projeto gratuito na nuvem."
});

Object.assign(TRILHAS.suporte, {
  salario: {
    junior: "R$ 2.400 – R$ 3.600",
    pleno: "R$ 4.200 – R$ 6.800",
    senior: "R$ 7.500 – R$ 12.500+"
  },
  mercado: {
    demanda: "Porta de entrada rápida",
    modelo: "Presencial ou Híbrido",
    destaque: "Presente em empresas, escolas, hospitais e órgãos públicos de qualquer cidade."
  },
  diaADia: [
    "Diagnosticar e resolver problemas de computadores, impressoras e redes",
    "Instalar sistemas operacionais, roteadores e equipamentos",
    "Atender usuários com clareza e documentar soluções para a equipe"
  ],
  ferramentas: ["Windows", "Linux", "Packet Tracer", "TCP/IP", "Active Directory", "Sistemas de Chamados"],
  profissoes: ["Analista de Suporte Técnico", "Técnico(a) de Redes", "Administrador(a) de Sistemas", "Analista de Infraestrutura"],
  softSkills: ["Empatia e paciência", "Comunicação acessível", "Agilidade no diagnóstico", "Proatividade"],
  primeiroPasso: "Monte uma simulação de rede local com roteador e computadores no Cisco Packet Tracer."
});