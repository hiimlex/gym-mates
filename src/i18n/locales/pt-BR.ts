export default {
  login: {
    title: "Entrar",
    subtitle: "Bem-vindo! Por favor, preencha seus dados para continuar.",
    email: "Email",
    password: "Senha",
    forgotPassword: "Esqueceu a senha?",
    link: "Não tem uma conta?",
    signUp: "Cadastrar-se",
  },
  signup: {
    title: "Cadastrar-se",
    subtitle: "Crie sua conta para iniciar sua jornada.",
    fields: {
      name: "Nome",
      email: "Email",
      password: "Senha",
      confirmPassword: "Confirmar Senha",
    },
    sign: "Entrar Agora",
    link: "Já tem uma conta?",
    login: "Entrar",
  },
  setupHealth: {
    title: "Extra",
    subtitle: "Agora vamos configurar seus dados de saúde.",
    fields: {
      weight: "Peso",
      height: "Altura",
      body_fat: "Gordura Corporal",
    },
    save: "Salvar",
    skip: "Pular",
  },
  setupAvatar: {
    title: "Avatar",
    subtitle: "Envie uma foto de perfil.",
    save: "Salvar",
    skip: "Pular",
  },
  home: {
    title: "Olá {{name}}",
    subtitle: "Vamos treinar?",
    noCrewsSubtitle: "Parece que você ainda não entrou em nenhuma crew.",
    noFollowingActivities: "Nenhuma atividade dos seus amigos ainda.",
    followingActivities: "Atividades seguidas",
    highlight: {
      new: "novo",
      coins: "moedas",
    },
    noCrews: {
      start: "Comece uma",
      oneForEarn: "para ganhar",
    },
    stats: {
      title: "Estatísticas",
      myStreak: "Minha Sequência",
      lastSession: "Última Sessão",
      mins: "min",
      days: "dias",
      noSession: "Nenhuma sessão ainda",
    },
    menu: {
      title: "O que você vai fazer hoje?",
      addWorkout: "Adicionar Treino",
      createCrew: "Criar Crew",
      joinCrew: "Entrar em uma Crew",
    },
  },
  profile: {
    followers: "Seguidores",
    following: "Seguindo",
    crews: "Crews",
    streak: "Sequência",
    selectATitle: "Selecionar um título",
    noTitle: "Sem título",
    saving: "Salvando...",
    donate: "Sinta-se à vontade para doar",
    personal: {
      character: "Personagem",
      title: "Pessoal",
      journey: "Jornada",
      inventory: "Inventário",
      mates: "Amigos",
    },
    settings: {
      edit: "Editar Perfil",
      title: "Configurações",
      settings: "Configurações",
      logout: "Sair",
      help: "Ajuda & Suporte",
    },
  },
  settings: {
    selectLanguage: "Selecionar Idioma",
  },
  crews: {
    title: "Acompanhe as atividades das suas crews!",
    filters: {
      mine: "Minhas",
      favorites: "Favoritas",
    },
    empty: "Nenhuma crew encontrada.",
  },
  crewView: {
    todayWorkouts: "Pagos hoje",
    noTodayWorkouts: "Ninguém compartilhou treino hoje. Seja o primeiro!",
    activities: "Atividades",
    lastActivities: "Últimas Atividades",
    hasPaid: "{{name}} pagou.",
    noActivities: "Nenhuma atividade ainda.",
    todayWorkout: "Hoje {{-time}}",
    rank: "Ranking",
    calendar: "Calendário",
    youPaid: "Você pagou",
    loadingRank: "Carregando ranking...",
    noRank: "Membros ou dados insuficientes para mostrar o ranking.",
  },
  crewSettings: {
    members: "Membros",
    visibility: "Visibilidade",
    publicDescription: "Qualquer pessoa com o código pode entrar.",
    privateDescription: "Selecione quem pode entrar.",
    rules: "Regras",
    streaks: "Sequências",
    admin: "Administrador",
    loseStreakAt: "Perde a sequência ao falhar por",
    owner: "Dono",
    rulesType: {
      gym_focused: "Focado em Academia",
      pay_on_past: "Pagar Treinos Passados",
      pay_without_picture: "Pagar sem Foto",
      show_members_rank: "Mostrar Ranking dos Membros",
      free_weekends: "Fins de Semana Livres",
    },
    streakType: {
      weekends: "Sequência de Fins de Semana",
      weekly: "Sequência Semanal",
      monthly: "Sequência Mensal",
    },
    save: "Salvar",
    quit: "Sair da Crew",
    edit: "Editar Crew",
    editCrew: {
      title: "Editar Crew",
    },
    member: {
      joined_at: "Entrou em {{-date}}",
      you: "Você",
      all: "Todos os Membros",
      actions: {
        makeAdmin: "Tornar administrador",
        kick: "Remover da crew",
        makeAdminSuccess: "Membro promovido a administrador.",
        kickSuccess: "Membro removido da crew.",
      },
    },
    delete: "Excluir Crew",
    updateSuccess: "Crew atualizada com sucesso.",
  },

  addWorkout: {
    fields: {
      title: "Título",
      picture: "Foto",
      date: "Dia e horário",
      duration: "Duração",
      type: "Tipo de treino",
    },
    paidText: "Boa! Você ganhou\n+{{coins}} moeda{{plural}}",
    buttons: {
      next: "Próximo",
      paid: "Pago",
      close: "Fechar",
    },
  },

  joinCrew: {
    search: "Insira o nome ou código da crew para buscar.",
    join: "Entrar",
    request: "Solicitar entrada",
    alreadyJoined: "Você já é membro desta crew.",
  },

  journey: {
    title: "Veja suas atividades",
    events: {
      start: "Entrou no aplicativo.",
      paid: "Pagou",
      buy: 'Comprou "{{-itemName}}"',
      add: {
        healthy: "Adicionou uma informação de saúde.",
      },
      bodyFat: "GC {{bf}}%",
      join: 'Entrou na crew "{{name}}".',
      follow: 'Começou a seguir "{{name}}".',
      loseStreak: "Perdeu a sequência de {{days}} dia(s).",
      completeMission: 'Completou a missão "{{name}}".',
    },
    filters: {
      recent: "Recentes",
      old: "Antigos",
    },
  },

  userView: {
    buttons: {
      accept: "Aceitar",
      reject: "Recusar",
    },
    tabs: {
      activities: "Atividades",
      achievements: "Conquistas",
    },
    noWorkouts: "Nenhum treino ainda.",
    noAchievements: "Nenhuma conquista ainda.",
  },

  editProfile: {
    account: "Conta do Perfil",
    healthy: "Informações de Saúde",
    fields: {
      name: "Nome",
      email: "Email",
      oldPassword: "Senha Antiga",
      newPassword: "Nova Senha",
      weight: "Peso",
      height: "Altura",
      body_fat: "Gordura Corporal",
    },
    save: "Salvar",
  },

  shop: {
    title: "Loja",
    filters: {
      all: "Todos",
      cost: "Custo",
      locked: "Bloqueados",
      list: "Visualização em Lista",
      grid: "Visualização em Grade",
    },
    add: "Adicionar à sacola",
    remove: "Remover da sacola",
    cart: {
      title: "Itens da sacola",
      empty: "Sua sacola está vazia.",
      total: "Total",
      checkout: "Finalizar compra",
      notEnoughCoins: "Você não tem moedas suficientes.",
      yourCoins: "Suas moedas",
      result: "Resultado",
      yourCoinsAfterPurchase: "Suas moedas após a compra",
    },
    empty: "Nenhum item encontrado.",
    hint: "Dica:",
  },

  inventory: {
    title: "Inventário",
    empty: "Nenhum item encontrado.",
    filters: {
      cost: "Custo",
      category: "Categoria",
      achievements: "Conquistas",
      badges: "Emblemas",
    },
  },

  userFollows: {
    title: "Seus GymMates",
    noFollowers: "Você ainda não tem seguidores.",
    noFollowing: "Você ainda não segue ninguém.",
    followers: "Seguidores",
    following: "Seguindo",
    followBack: "Seguir de Volta",
  },

  createCrew: {
    infoStep: {
      name: "Primeiro, vamos nomear sua crew",
      namePlaceholder: "Insira o nome da sua crew",
      code: "Crie um código amigável para seus amigos entrarem.",
      codePlaceholder: "Insira o código da crew",
      banner: "Selecione uma imagem para o banner",
    },
    goNext: "Próximo",
    finish: "Finalizar",
  },

  crewMembers: {
    title: "Membros da Crew",
    requests: "Solicitações",
    noRequests: "Nenhuma solicitação no momento.",
    accept: "Aceitar",
    wantsToJoin: "{{name}} quer entrar.",
  },

  workoutViewer: {
    title: "Visualização do Treino",
    tip: "Deslize para a esquerda ou direita para ver mais treinos!",
  },

  itemViewer: {
    title: "Visualização do Item",
  },

  leaveCrew: {
    title: "Sair da Crew",
    body: "Ao sair desta crew, você não poderá mais ver nenhum dado dela.\n\nTem certeza?",
    buttons: {
      yes: "Sim, sair",
      no: "Não, cancelar",
    },
  },

  help: {
    title: "Olá {{name}}.",
    body: "Estamos aqui para ajudar. Se quiser relatar um problema, tirar dúvidas ou apenas dizer oi, entre em contato conosco.",
    future:
      "Estamos trabalhando em novas funcionalidades para melhorar sua experiência no GymMates. Fique ligado nas atualizações beta!",
    faq: "Perguntas Frequentes",
    contact: "Contato com Suporte",
    faqList: {
      rulesSystem: "Quais são as regras das crews?",
      streakSystem: "Como funciona o sistema de sequência?",
      coinSystem: "Como funciona o sistema de moedas?",
    },
    devNote: "Nota do Dev",
  },

  coinSystem: {
    title: "Sistema de Moedas",
    about: "Toda vez que um usuário faz um treino, ele recebe uma moeda.",
    missions:
      "Missões são tarefas, visíveis ou ocultas, que o usuário pode completar para ganhar mais moedas.",
    earn: "Para ganhar mais moedas, o usuário deve alcançar sequências ou completar missões.",
    streaks:
      "Sequências são dias consecutivos de treino e, ao atingir certos marcos, o usuário recebe recompensas em moedas.",
    dailyStreak:
      "• A cada 10 dias de sequência diária, o usuário ganha +1 moeda extra.",
    weekendStreak: "• A cada dia de fim de semana, o usuário ganha +1 moeda.",
    weekStreak: "• A cada semana (7 dias seguidos), o usuário ganha +2 moedas.",
    monthStreak: "• A cada mês (30 dias seguidos), o usuário ganha +10 moedas.",
    bounties:
      "As recompensas são únicas e válidas para todas as crews. A contagem reinicia sempre que o usuário recebe a recompensa.",
    attention:
      "O usuário terá um registro para cada moeda recebida!\nO usuário só pode receber uma recompensa por dia!",
    haveFun: "Divirta-se coletando moedas e gastando-as na loja!",
  },

  crewRulesInfo: {
    about:
      "As regras da crew são um conjunto de diretrizes que os membros devem seguir ao compartilhar treinos.",
    gymFocused:
      "• Focado em Academia: Todos os treinos compartilhados devem ser do tipo academia.",
    freeWeekends:
      "• Fins de Semana Livres: Aos sábados e domingos, não é obrigatório pagar treinos perdidos.",
    payOnPast:
      "• Pagar Treinos Passados: Permite pagar treinos esquecidos ou perdidos há pelo menos 2 dias.",
    payWithoutPicture:
      "• Pagar sem Foto: O treino normalmente exige foto, mas pode ser enviado sem ela.",
  },

  streakSystem: {
    title: "Sistema de Sequência",
  },

  crewRules: {
    title: "Regras da Crew",
  },

  weekDays: {
    long: {
      sun: "Domingo",
      mon: "Segunda-feira",
      tue: "Terça-feira",
      wed: "Quarta-feira",
      thu: "Quinta-feira",
      fri: "Sexta-feira",
      sat: "Sábado",
    },
    short: {
      sun: "Dom",
      mon: "Seg",
      tue: "Ter",
      wed: "Qua",
      thu: "Qui",
      fri: "Sex",
      sat: "Sáb",
    },
  },

  months: {
    long: {
      jan: "Janeiro",
      feb: "Fevereiro",
      mar: "Março",
      apr: "Abril",
      may: "Maio",
      jun: "Junho",
      jul: "Julho",
      aug: "Agosto",
      sep: "Setembro",
      oct: "Outubro",
      nov: "Novembro",
      dec: "Dezembro",
    },
  },

  bottomNav: {
    home: "Início",
    crews: "Crews",
  },

  links: {
    profile: "Perfil",
    crews: "Crews",
    crew: "Crew",
    user: "Usuário",
    crewSettings: "Configurações da Crew",
    addWorkout: "Adicionar Treino",
    joinCrew: "Entrar em Crew",
    createCrew: "Criar Crew",
    shareInCrew: "Compartilhar em Crews",
    editCrew: "Editar Crew",
    userJourney: "Jornada",
    editProfile: "Editar Perfil",
    shopCart: "Itens da Sacola",
    userFollows: "Amigos",
    help: "Ajuda & Suporte",
    userCharacter: "Personagem",
    settings: "Configurações",
  },

  units: {
    days: "dias",
    hours: "horas",
    minutes: "minutos",
    seconds: "segundos",
  },

  mediaSelect: {
    text: "Toque para selecionar uma mídia.",
    hasPreview: "Toque para selecionar outra mídia.",
    mediaPreview: "Pré-visualização da mídia",
  },

  crewStreaks: {
    weekends: "Fins de Semana",
    weekly: "Semanal",
    monthly: "Mensal",
    daily: "Diária",
    base: "Base",
  },

  crewVisibility: {
    public: "Pública",
    private: "Privada",
  },

  languages: {
    en: "Inglês",
    ptBR: "Português (Brasil)",
  },

  items: {
    title: {
      noTitle: "Sem Título",
    },
  },

  workoutTypes: {
    gym: "Academia",
    aerobics: "Aeróbico",
    running: "Corrida",
    cycling: "Ciclismo",
    cross_fit: "CrossFit",
    cardio: "Cardio",
    yoga: "Yoga",
    other: "Outro",
    swimming: "Natação",
  },

  itemCategoryTypes: {
    title: "Título",
    achievement: "Conquista",
    figure: "Figura",
    badge: "Emblema",
    skin: "Skin",
    avatar: "Avatar",
  },

  itemSex: {
    male: "Masculino",
    female: "Feminino",
  },

  itemPiece: {
    hair: "Cabelo",
    top: "Parte Superior",
    bottom: "Parte Inferior",
    shoes: "Calçados",
    accessory: "Acessório",
  },

  errors: {
    FETCH_CURRENT_USER: "Faça login novamente.",
    UNAUTHORIZED: "Faça login novamente.",
    FORBIDDEN: "Você não tem permissão para isso.",
    INVALID_CREDENTIALS: "Credenciais inválidas.",
    CREW_NOT_FOUND: "Crew não encontrada.",
    ALREADY_MEMBER: "Você já é membro desta crew.",
    ALREADY_IN_WHITELIST: "Já está na whitelist desta crew.",
    INVALID_DATE: "Data inválida.",
    FILE_NOT_PROVIDED: "Arquivo não fornecido.",
    CANNOT_LEAVE_CREW_OWNER: "O dono não pode sair da crew.",
    INVALID_WORKOUT_DATE: "Data do treino inválida.",
    WORKOUT_DATE_IN_FUTURE: "A data do treino não pode ser no futuro.",
    WORKOUT_DATE_TOO_OLD: "A data do treino é muito antiga.",
    CREW_RULES_VIOLATION: "O treino viola as regras da crew.",
    WORKOUT_DATE_OLDER_THAN_CREW:
      "A data do treino é anterior à criação da crew.",
    GYM_FOCUSED_RULE_VIOLATION:
      "Os treinos da crew {{crews}} devem ser focados em academia.",
    PAY_ON_PAST_RULE_VIOLATION:
      "A crew {{crews}} não permite pagamento de treinos passados.",
    PAID_WITHOUT_PICTURE_RULE_VIOLATION:
      "Os treinos da crew {{crews}} devem conter uma foto.",
    USER_NOT_FOUND: "Usuário não encontrado.",
    USER_NOT_A_MEMBER: "Usuário não é membro.",
    USER_NOT_IN_WHITELIST: "Usuário não está na whitelist.",
    ALREADY_FOLLOWING: "Você já segue este usuário.",
    TITLE_NOT_FOUND: "Título não encontrado.",
    USER_DOES_NOT_OWN_ITEM: "O usuário não possui este item.",
    JOURNEY_NOT_FOUND: "Jornada não encontrada.",
    CART_IS_EMPTY: "O carrinho está vazio.",
    SOME_ITEMS_ALREADY_OWNED: "Alguns itens já pertencem a você.",
    USER_NOT_MET_ITEMS_REQUIREMENTS:
      "O usuário não atende aos requisitos para comprar os itens.",
    USER_DO_NOT_HAVE_ENOUGH_COINS: "O usuário não possui moedas suficientes.",
  },

  fieldErrors: {
    required: "Campo obrigatório.",
    maxLength: "Campo muito longo. O máximo é {{value}}.",
    minLength: "Campo muito curto. O mínimo é {{value}}.",
    pattern: "Campo inválido.",
    max: "O valor deve ser menor ou igual a {{value}}.",
    min: "O valor deve ser maior ou igual a {{value}}.",
    validate: "Campo inválido.",
    passwordMatch: "As senhas não coincidem.",
  },

  achievementRarity: {
    common: "Comum",
    rare: "Raro",
    epic: "Épico",
    legendary: "Lendário",
  },
};
