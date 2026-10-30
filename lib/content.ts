/**
 * Conteúdo editável da landing page.
 * Todo texto clínico deve ser validado pela responsável técnica antes da publicação.
 * Itens com `publish: false` permanecem no código, mas não são exibidos.
 */

export const nav = [
  { label: "Início", href: "#inicio" },
  { label: "Método Trico", href: "#metodo-trico" },
  { label: "Tecnologias", href: "#tecnologias" },
  { label: "Sobre a Dra.", href: "#sobre" },
  { label: "Nosso Espaço", href: "#espaco" },
  { label: "Contato", href: "#contato" },
] as const;

export const ctaLabels = {
  primary: "Agendar minha avaliação",
  header: "Agendar avaliação",
  method: "Quero conhecer o Método Trico",
  technologies: "Quero entender meu caso",
  conversation: "Conversar sobre uma avaliação",
  consultation: "Agendar uma consulta",
  about: "Agendar avaliação com a Dra. Bárbara",
} as const;

export const hero = {
  eyebrow: "Instituto Bárbara Lopes · Tricologia avançada",
  titleLead: "Seu cabelo merece",
  titleHighlight: "mais do que uma fórmula pronta.",
  subheadline:
    "Com mais de 7 anos de dedicação à saúde capilar, a Dra. Bárbara Lopes desenvolveu uma abordagem integrativa que considera as particularidades do seu couro cabeludo, organismo e histórico clínico.",
  microcopy: "Atendimento individualizado em Araçatuba, SP.",
  credentials: [
    { value: "+7 anos", label: "de experiência em saúde capilar" },
    { value: "Criadora", label: "do Método Trico" },
    { value: "Docente", label: "da Academia Brasileira de Tricologia" },
  ],
} as const;

export const concerns = {
  title: "Quando o cabelo muda, é importante compreender o que está acontecendo.",
  text: "A queda capilar, o afinamento dos fios e as alterações do couro cabeludo podem envolver diferentes fatores. Por isso, uma avaliação individualizada é fundamental para compreender cada caso.",
  items: [
    {
      number: "01",
      title: "Queda e afinamento capilar",
      text: "Perceber mais fios no travesseiro, no banho ou na escova. Notar os fios mais finos, com menos volume ou a risca mais aparente.",
    },
    {
      number: "02",
      title: "Alterações do couro cabeludo",
      text: "Oleosidade, descamação, coceira ou sensibilidade que passaram a fazer parte da rotina e chamam a sua atenção.",
    },
    {
      number: "03",
      title: "Saúde e cuidados com os fios",
      text: "Dúvidas sobre rotina, produtos e cuidados mais adequados às características do seu cabelo e do seu couro cabeludo.",
    },
  ],
  note: "Essas situações podem ter origens diferentes. Somente uma avaliação profissional permite compreender cada caso.",
  closing: "Cada histórico é único. O cuidado também deve ser.",
} as const;

export const method = {
  eyebrow: "O diferencial",
  title: "Método Trico",
  subtitle: "Um olhar integrativo para a saúde capilar.",
  text: "Criado pela Dra. Bárbara Lopes a partir de anos de estudo e prática clínica, o Método Trico reúne avaliação individualizada, análise das particularidades do paciente, cuidado do couro cabeludo e acompanhamento profissional.",
  contrast:
    "O ponto de partida nunca é uma suplementação igual para todos. É a compreensão de quem você é, do seu histórico e do que o seu couro cabeludo apresenta.",
  steps: [
    {
      number: "01",
      title: "Compreender",
      text: "Avaliação clínica, histórico individual e investigação das necessidades capilares.",
    },
    {
      number: "02",
      title: "Investigar",
      text: "Tricoscopia digital e avaliação de informações laboratoriais, conforme indicação e atribuições profissionais, para apoiar a compreensão de cada caso.",
    },
    {
      number: "03",
      title: "Personalizar",
      text: "Planejamento de cuidados, orientação de home care, suplementação quando indicada e seleção individualizada de recursos clínicos apropriados.",
    },
    {
      number: "04",
      title: "Acompanhar",
      text: "Reavaliações, acompanhamento da evolução e ajustes nas condutas conforme necessidade e resposta individual.",
    },
  ],
  closingLead: "Não existe uma única resposta para todos os cabelos.",
  closingHighlight: "Existe uma avaliação para cada pessoa.",
} as const;

export type TechnologyItem = {
  title: string;
  detail?: string;
  /** Somente itens com publish: true aparecem na página. */
  publish: boolean;
  /** Observação interna de validação (não exibida). */
  validation?: string;
};

export type TechnologyCategory = {
  id: string;
  letter: string;
  title: string;
  intro: string;
  icon: "scan" | "light" | "sparkle";
  items: TechnologyItem[];
  /** Texto exibido quando nenhum item da categoria está aprovado para publicação. */
  emptyNote?: string;
};

const PENDING_VALIDATION =
  "Publicar apenas após confirmação de habilitação profissional, regularidade sanitária, indicação admitida e respaldo técnico-científico.";

const technologyCategories: TechnologyCategory[] = [
  {
    id: "avaliacao",
    letter: "A",
    title: "Avaliação e planejamento",
    intro:
      "O couro cabeludo é uma extensão da pele e merece cuidados específicos. Por isso, a avaliação considera tanto os fios quanto a saúde do couro cabeludo.",
    icon: "scan",
    items: [
      {
        title: "Tricoscopia digital",
        detail: "Observação ampliada do couro cabeludo e dos fios, que auxilia a avaliação e o registro do acompanhamento.",
        publish: true,
      },
      {
        title: "Análise individualizada de informações clínicas e laboratoriais",
        detail: "Leitura do histórico e de exames, quando indicados, dentro das atribuições profissionais.",
        publish: true,
      },
      { title: "Planejamento de cuidados capilares", publish: true },
      {
        title: "Home care personalizado",
        detail: "Orientações de cuidado domiciliar conforme as necessidades identificadas.",
        publish: true,
      },
      { title: "Orientação de suplementação quando indicada", publish: true },
    ],
  },
  {
    id: "consultorio",
    letter: "B",
    title: "Tecnologias de consultório",
    intro:
      "Recursos utilizados no consultório e selecionados individualmente, de acordo com a avaliação e a indicação para cada caso.",
    icon: "light",
    items: [
      {
        title: "Fotobiomodulação local",
        detail: "Inclui recursos luminosos apropriados, aplicados conforme indicação profissional.",
        publish: true,
      },
      { title: "Fotobiomodulação sistêmica (ILIB)", detail: "Considerada apenas quando aplicável.", publish: true },
      { title: "Eletroterapias", publish: true },
      { title: "Acompanhamento com tecnologias selecionadas individualmente", publish: true },
    ],
  },
  {
    id: "especializados",
    letter: "C",
    title: "Procedimentos e recursos especializados",
    intro:
      "Quando indicados na avaliação, recursos complementares podem ser discutidos individualmente com a profissional, sempre com explicação clara sobre possibilidades e limites.",
    icon: "sparkle",
    emptyNote: "As opções são apresentadas individualmente, durante a consulta e conforme indicação.",
    items: [
      {
        title: "Microinfusão de medicamentos na pele (MMP)",
        detail: "Com formulações individualizadas.",
        publish: false,
        validation: PENDING_VALIDATION,
      },
      { title: "Intradermoterapia", publish: false, validation: PENDING_VALIDATION },
      { title: "Recursos regenerativos, incluindo PRP", publish: false, validation: PENDING_VALIDATION },
      { title: "Fios de PDO", publish: false, validation: PENDING_VALIDATION },
      {
        title: "Ativos específicos",
        detail: "Como vitaminas, minerais, fatores de crescimento, peptídeos, PDRN e exossomos.",
        publish: false,
        validation: PENDING_VALIDATION,
      },
    ],
  },
];

export const technologies = {
  eyebrow: "Tecnologia aliada à individualização",
  title: "Ciência, tecnologia e cuidado em cada etapa.",
  subtitle: "Recursos de avaliação e acompanhamento selecionados de acordo com as necessidades de cada paciente.",
  disclaimer:
    "A indicação de cada recurso é definida individualmente, após avaliação. Nenhum procedimento é indicado da mesma forma para todos os pacientes.",
  categories: technologyCategories,
} as const;

export const experience = {
  eyebrow: "Nosso espaço",
  title: "Um espaço pensado para acolher você.",
  text: "Arquitetura, tranquilidade e atenção aos detalhes em um ambiente preparado para oferecer uma experiência de atendimento acolhedora e individualizada.",
  chapters: ["Natureza", "Arquitetura", "Identidade", "Acolhimento", "Luz", "Araçatuba"],
} as const;

export const about = {
  eyebrow: "Sobre a Dra.",
  title: "Conheça a profissional por trás do Método Trico.",
  name: "Dra. Bárbara Lopes",
  role: "Biomédica esteta e tricologista.",
  paragraphs: [
    "Dra. Bárbara Lopes é biomédica esteta e tricologista, com especialização em Tricologia e Ciência Cosmética.",
    "Há mais de sete anos, dedica sua atuação à saúde capilar e ao cuidado de pacientes com queixas relacionadas à queda e ao afinamento dos fios.",
    "Sua trajetória clínica teve início em um hospital de referência nacional em transplante capilar, onde participou do cuidado de pacientes em períodos pré e pós-operatórios.",
    "Atualmente, é docente da Academia Brasileira de Tricologia, ministra conteúdos para profissionais da área e participa de atividades de formação e atualização científica.",
    "Criadora do Método Trico, desenvolveu uma abordagem que integra conhecimento clínico, cosmetologia, avaliação individualizada e acompanhamento da saúde capilar.",
  ],
  highlights: [
    "Especialização em Tricologia e Ciência Cosmética",
    "Docente da Academia Brasileira de Tricologia",
    "Início da trajetória em hospital de referência em transplante capilar",
    "Criadora do Método Trico",
  ],
  // Afirmações que só podem ser publicadas após comprovação documental:
  // "única professora na região de Araçatuba" e "maior academia do mundo".
} as const;

export const followUp = {
  eyebrow: "Acompanhamento individualizado",
  title: "Cuidado contínuo. Decisões personalizadas.",
  text: "O acompanhamento clínico permite observar a evolução de cada paciente e ajustar as orientações e os recursos utilizados conforme as necessidades identificadas durante o processo.",
  items: [
    { title: "Avaliação individual", text: "Escuta atenta da sua queixa, do seu histórico e da sua rotina." },
    { title: "Planejamento personalizado", text: "Condutas definidas a partir do que foi observado no seu caso." },
    { title: "Orientações de cuidado domiciliar", text: "Cuidados para a rotina em casa, quando indicados." },
    { title: "Reavaliações e acompanhamento", text: "Observação da evolução e ajustes ao longo do processo." },
  ],
  quote: "Cuidar do cabelo também é cuidar de como você se sente ao longo do caminho.",
} as const;

export const faq = {
  eyebrow: "Dúvidas frequentes",
  title: "Perguntas que costumamos receber.",
  items: [
    {
      id: "tipo-de-queda",
      question: "A avaliação é indicada para qualquer tipo de queda capilar?",
      answer:
        "A avaliação permite compreender o histórico individual e identificar possíveis necessidades de investigação e acompanhamento. A conduta adequada depende das características de cada caso.",
    },
    {
      id: "formula-igual",
      question: "O Método Trico utiliza uma fórmula igual para todos?",
      answer:
        "Não. A proposta do Método Trico é considerar as necessidades individuais para orientar o planejamento do acompanhamento.",
    },
    {
      id: "exames",
      question: "Preciso realizar exames?",
      answer:
        "A necessidade de exames ou avaliações complementares é considerada individualmente, de acordo com o histórico e as características apresentadas.",
    },
    {
      id: "cuidados-em-casa",
      question: "O acompanhamento inclui cuidados para fazer em casa?",
      answer:
        "Quando indicado, podem ser orientados cuidados domiciliares e produtos específicos conforme as necessidades do couro cabeludo.",
    },
    {
      id: "prazo",
      question: "Em quanto tempo os resultados aparecem?",
      answer:
        "A evolução depende de fatores individuais, das condições avaliadas e das condutas indicadas. Não existe um prazo único ou resultado garantido para todos os pacientes.",
    },
    {
      id: "agendamento",
      question: "Como posso agendar uma avaliação?",
      answer:
        "O primeiro contato pode ser realizado pelo WhatsApp do Instituto, onde você poderá obter informações sobre atendimento e agendamento.",
    },
  ],
} as const;

export const location = {
  eyebrow: "Localização",
  title: "Seu cuidado começa em um espaço preparado para receber você.",
} as const;

export const finalCta = {
  title: "O primeiro passo é compreender o seu cabelo.",
  subtitle: "Conheça uma abordagem de cuidado capilar que valoriza sua individualidade, seu histórico e suas necessidades.",
  microcopy: "Instituto Bárbara Lopes · Araçatuba, SP.",
} as const;
