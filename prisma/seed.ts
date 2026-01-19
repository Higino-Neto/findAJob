import { PrismaClient } from "@/app/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";

import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

export default async function seed() {
  const user = await prisma.user.findFirst();
  if (!user) {
    throw new Error("Any user was found for seed");
  }

  const jobs = [
    {
      job: {
        title: "Frontend Developer",
        company: "Tech Corp",
        location: "São Paulo - SP",
        type: "híbrido",
        description:
          "Atuar no desenvolvimento de aplicações web com React e Next.js.",
        salary: "R$ 8.000",
      },
      questions: [
        {
          text: "Você tem experiência com React?",
          type: "multiple",
          order: 1,
          options: [
            { text: "Sim", order: 1 },
            { text: "Não", order: 2 },
          ],
        },
        {
          text: "Quantos anos de experiência você possui?",
          type: "multiple",
          order: 2,
          options: [
            { text: "0-1 anos", order: 1 },
            { text: "2-3 anos", order: 2 },
            { text: "4+ anos", order: 3 },
          ],
        },
        {
          text: "Descreva um projeto relevante que você já trabalhou.",
          type: "open",
          order: 3,
        },
      ],
    },
    {
      job: {
        title: "Backend Engineer",
        company: "Data Systems",
        location: "Remoto",
        type: "remoto",
        description: "Desenvolver APIs escaláveis usando Node.js e Python.",
        salary: "R$ 12.000",
      },
      questions: [
        {
          text: "Você tem experiência com Node.js?",
          type: "multiple",
          order: 1,
          options: [
            { text: "Sim", order: 1 },
            { text: "Não", order: 2 },
          ],
        },
        {
          text: "Qual seu nível com bancos de dados?",
          type: "multiple",
          order: 2,
          options: [
            { text: "Iniciante", order: 1 },
            { text: "Intermediário", order: 2 },
            { text: "Avançado", order: 3 },
          ],
        },
        {
          text: "Conte sobre uma API complexa que você já desenvolveu.",
          type: "open",
          order: 3,
        },
      ],
    },
    {
      job: {
        title: "UX/UI Designer",
        company: "Creative Minds",
        location: "Rio de Janeiro - RJ",
        type: "presencial",
        description:
          "Criar interfaces intuitivas e experiências de usuário excepcionais.",
        salary: "R$ 7.500",
      },
      questions: [
        {
          text: "Você tem portfólio online?",
          type: "multiple",
          order: 1,
          options: [
            { text: "Sim", order: 1 },
            { text: "Não", order: 2 },
          ],
        },
        {
          text: "Quanto tempo de experiência com Figma?",
          type: "multiple",
          order: 2,
          options: [
            { text: "Menos de 1 ano", order: 1 },
            { text: "1-3 anos", order: 2 },
            { text: "Mais de 3 anos", order: 3 },
          ],
        },
        {
          text: "Descreva seu processo de design.",
          type: "open",
          order: 3,
        },
      ],
    },
    {
      job: {
        title: "DevOps Engineer",
        company: "Cloud Tech",
        location: "Remoto",
        type: "remoto",
        description: "Gerenciar infraestrutura cloud e pipelines de CI/CD.",
        salary: "R$ 15.000",
      },
      questions: [
        {
          text: "Tem experiência com AWS?",
          type: "multiple",
          order: 1,
          options: [
            { text: "Sim", order: 1 },
            { text: "Não", order: 2 },
          ],
        },
        {
          text: "Qual sua familiaridade com Docker?",
          type: "multiple",
          order: 2,
          options: [
            { text: "Básica", order: 1 },
            { text: "Intermediária", order: 2 },
            { text: "Avançada", order: 3 },
          ],
        },
        {
          text: "Como você lida com deployment em alta disponibilidade?",
          type: "open",
          order: 3,
        },
      ],
    },
    {
      job: {
        title: "Data Scientist",
        company: "Analytics Pro",
        location: "São Paulo - SP",
        type: "híbrido",
        description: "Desenvolver modelos preditivos e análises estatísticas.",
        salary: "R$ 13.000",
      },
      questions: [
        {
          text: "Tem experiência com Python para data science?",
          type: "multiple",
          order: 1,
          options: [
            { text: "Sim", order: 1 },
            { text: "Não", order: 2 },
          ],
        },
        {
          text: "Quanto tempo de experiência com machine learning?",
          type: "multiple",
          order: 2,
          options: [
            { text: "0-2 anos", order: 1 },
            { text: "3-5 anos", order: 2 },
            { text: "6+ anos", order: 3 },
          ],
        },
        {
          text: "Descreva um projeto de análise de dados que você liderou.",
          type: "open",
          order: 3,
        },
      ],
    },
    {
      job: {
        title: "Mobile Developer",
        company: "App Masters",
        location: "Belo Horizonte - MG",
        type: "híbrido",
        description: "Desenvolver aplicativos nativos para iOS e Android.",
        salary: "R$ 9.500",
      },
      questions: [
        {
          text: "Prefere desenvolvimento iOS ou Android?",
          type: "multiple",
          order: 1,
          options: [
            { text: "iOS", order: 1 },
            { text: "Android", order: 2 },
            { text: "Ambos", order: 3 },
          ],
        },
        {
          text: "Tempo de experiência com desenvolvimento mobile?",
          type: "multiple",
          order: 2,
          options: [
            { text: "1-2 anos", order: 1 },
            { text: "3-4 anos", order: 2 },
            { text: "5+ anos", order: 3 },
          ],
        },
        {
          text: "Conte sobre um app publicado nas lojas.",
          type: "open",
          order: 3,
        },
      ],
    },
    {
      job: {
        title: "Full Stack Developer",
        company: "Digital Solutions",
        location: "Remoto",
        type: "remoto",
        description:
          "Trabalhar tanto no frontend quanto no backend de aplicações web.",
        salary: "R$ 11.000",
      },
      questions: [
        {
          text: "Você se considera mais frontend ou backend?",
          type: "multiple",
          order: 1,
          options: [
            { text: "Frontend", order: 1 },
            { text: "Backend", order: 2 },
            { text: "Full Stack", order: 3 },
          ],
        },
        {
          text: "Qual stack tecnológico você prefere?",
          type: "multiple",
          order: 2,
          options: [
            { text: "MERN", order: 1 },
            { text: "MEAN", order: 2 },
            { text: "LAMP", order: 3 },
          ],
        },
        {
          text: "Descreva uma aplicação completa que você desenvolveu.",
          type: "open",
          order: 3,
        },
      ],
    },
    {
      job: {
        title: "QA Engineer",
        company: "Quality First",
        location: "Curitiba - PR",
        type: "presencial",
        description:
          "Garantir qualidade de software através de testes automatizados.",
        salary: "R$ 7.000",
      },
      questions: [
        {
          text: "Tem experiência com testes automatizados?",
          type: "multiple",
          order: 1,
          options: [
            { text: "Sim", order: 1 },
            { text: "Não", order: 2 },
          ],
        },
        {
          text: "Qual ferramenta de teste você prefere?",
          type: "multiple",
          order: 2,
          options: [
            { text: "Selenium", order: 1 },
            { text: "Cypress", order: 2 },
            { text: "Jest", order: 3 },
          ],
        },
        {
          text: "Como você planeja uma estratégia de testes?",
          type: "open",
          order: 3,
        },
      ],
    },
    {
      job: {
        title: "Product Manager",
        company: "Innovate Inc",
        location: "São Paulo - SP",
        type: "híbrido",
        description:
          "Definir roadmap do produto e gerenciar ciclo de desenvolvimento.",
        salary: "R$ 18.000",
      },
      questions: [
        {
          text: "Tem experiência com metodologias ágeis?",
          type: "multiple",
          order: 1,
          options: [
            { text: "Sim", order: 1 },
            { text: "Não", order: 2 },
          ],
        },
        {
          text: "Quanto tempo de experiência como Product Manager?",
          type: "multiple",
          order: 2,
          options: [
            { text: "0-2 anos", order: 1 },
            { text: "3-5 anos", order: 2 },
            { text: "6+ anos", order: 3 },
          ],
        },
        {
          text: "Descreva um produto que você gerenciou do início ao fim.",
          type: "open",
          order: 3,
        },
      ],
    },
    {
      job: {
        title: "Cloud Architect",
        company: "Sky Cloud",
        location: "Remoto",
        type: "remoto",
        description:
          "Projetar soluções de infraestrutura em nuvem para clientes corporativos.",
        salary: "R$ 22.000",
      },
      questions: [
        {
          text: "Tem certificação em cloud?",
          type: "multiple",
          order: 1,
          options: [
            { text: "Sim", order: 1 },
            { text: "Não", order: 2 },
          ],
        },
        {
          text: "Qual provedor de nuvem você domina?",
          type: "multiple",
          order: 2,
          options: [
            { text: "AWS", order: 1 },
            { text: "Azure", order: 2 },
            { text: "Google Cloud", order: 3 },
          ],
        },
        {
          text: "Descreva uma arquitetura complexa que você projetou.",
          type: "open",
          order: 3,
        },
      ],
    },
    {
      job: {
        title: "Security Analyst",
        company: "SecureNet",
        location: "Brasília - DF",
        type: "presencial",
        description:
          "Monitorar e responder a incidentes de segurança cibernética.",
        salary: "R$ 10.500",
      },
      questions: [
        {
          text: "Tem experiência com SIEM?",
          type: "multiple",
          order: 1,
          options: [
            { text: "Sim", order: 1 },
            { text: "Não", order: 2 },
          ],
        },
        {
          text: "Qual sua familiaridade com frameworks de segurança?",
          type: "multiple",
          order: 2,
          options: [
            { text: "NIST", order: 1 },
            { text: "ISO 27001", order: 2 },
            { text: "CIS", order: 3 },
          ],
        },
        {
          text: "Conte sobre um incidente de segurança que você resolveu.",
          type: "open",
          order: 3,
        },
      ],
    },
    {
      job: {
        title: "Scrum Master",
        company: "Agile Works",
        location: "Remoto",
        type: "remoto",
        description:
          "Facilitar cerimônias ágeis e remover impedimentos da equipe.",
        salary: "R$ 9.000",
      },
      questions: [
        {
          text: "É certificado Scrum Master?",
          type: "multiple",
          order: 1,
          options: [
            { text: "Sim", order: 1 },
            { text: "Não", order: 2 },
          ],
        },
        {
          text: "Quantos anos atuando como Scrum Master?",
          type: "multiple",
          order: 2,
          options: [
            { text: "0-1 anos", order: 1 },
            { text: "2-4 anos", order: 2 },
            { text: "5+ anos", order: 3 },
          ],
        },
        {
          text: "Como você lida com conflitos na equipe?",
          type: "open",
          order: 3,
        },
      ],
    },
    {
      job: {
        title: "Database Administrator",
        company: "DataPro",
        location: "Porto Alegre - RS",
        type: "híbrido",
        description: "Gerenciar e otimizar bancos de dados relacionais.",
        salary: "R$ 11.500",
      },
      questions: [
        {
          text: "Tem experiência com PostgreSQL?",
          type: "multiple",
          order: 1,
          options: [
            { text: "Sim", order: 1 },
            { text: "Não", order: 2 },
          ],
        },
        {
          text: "Qual seu nível com tuning de bancos de dados?",
          type: "multiple",
          order: 2,
          options: [
            { text: "Iniciante", order: 1 },
            { text: "Intermediário", order: 2 },
            { text: "Avançado", order: 3 },
          ],
        },
        {
          text: "Descreva uma situação crítica de banco de dados que você resolveu.",
          type: "open",
          order: 3,
        },
      ],
    },
    {
      job: {
        title: "Marketing Digital",
        company: "Growth Hackers",
        location: "São Paulo - SP",
        type: "híbrido",
        description: "Criar e executar campanhas de marketing online.",
        salary: "R$ 6.500",
      },
      questions: [
        {
          text: "Tem experiência com Google Ads?",
          type: "multiple",
          order: 1,
          options: [
            { text: "Sim", order: 1 },
            { text: "Não", order: 2 },
          ],
        },
        {
          text: "Qual sua especialidade em marketing?",
          type: "multiple",
          order: 2,
          options: [
            { text: "SEO", order: 1 },
            { text: "Mídia Paga", order: 2 },
            { text: "Redes Sociais", order: 3 },
          ],
        },
        {
          text: "Descreva uma campanha bem-sucedida que você liderou.",
          type: "open",
          order: 3,
        },
      ],
    },
    {
      job: {
        title: "Java Developer",
        company: "Enterprise Systems",
        location: "Campinas - SP",
        type: "presencial",
        description: "Desenvolver sistemas corporativos com Java Spring Boot.",
        salary: "R$ 10.000",
      },
      questions: [
        {
          text: "Tem experiência com Spring Framework?",
          type: "multiple",
          order: 1,
          options: [
            { text: "Sim", order: 1 },
            { text: "Não", order: 2 },
          ],
        },
        {
          text: "Quantos anos de experiência com Java?",
          type: "multiple",
          order: 2,
          options: [
            { text: "1-3 anos", order: 1 },
            { text: "4-6 anos", order: 2 },
            { text: "7+ anos", order: 3 },
          ],
        },
        {
          text: "Conte sobre um sistema complexo que você desenvolveu em Java.",
          type: "open",
          order: 3,
        },
      ],
    },
    {
      job: {
        title: "Python Developer",
        company: "Code Labs",
        location: "Remoto",
        type: "remoto",
        description: "Desenvolver aplicações web e scripts com Python.",
        salary: "R$ 9.000",
      },
      questions: [
        {
          text: "Tem experiência com Django ou Flask?",
          type: "multiple",
          order: 1,
          options: [
            { text: "Django", order: 1 },
            { text: "Flask", order: 2 },
            { text: "Ambos", order: 3 },
          ],
        },
        {
          text: "Qual seu nível com Python?",
          type: "multiple",
          order: 2,
          options: [
            { text: "Júnior", order: 1 },
            { text: "Pleno", order: 2 },
            { text: "Sênior", order: 3 },
          ],
        },
        {
          text: "Descreva um projeto Python que você considera desafiador.",
          type: "open",
          order: 3,
        },
      ],
    },
    {
      job: {
        title: "React Native Developer",
        company: "Mobile First",
        location: "Remoto",
        type: "remoto",
        description: "Desenvolver aplicativos móveis com React Native.",
        salary: "R$ 9.800",
      },
      questions: [
        {
          text: "Tem experiência com React Native?",
          type: "multiple",
          order: 1,
          options: [
            { text: "Sim", order: 1 },
            { text: "Não", order: 2 },
          ],
        },
        {
          text: "Já publicou apps nas lojas?",
          type: "multiple",
          order: 2,
          options: [
            { text: "Sim", order: 1 },
            { text: "Não", order: 2 },
          ],
        },
        {
          text: "Conte sobre um app React Native que você desenvolveu.",
          type: "open",
          order: 3,
        },
      ],
    },
    {
      job: {
        title: "Tech Lead",
        company: "Leadership Tech",
        location: "São Paulo - SP",
        type: "híbrido",
        description: "Liderar equipe técnica e tomar decisões arquiteturais.",
        salary: "R$ 20.000",
      },
      questions: [
        {
          text: "Tem experiência liderando equipes?",
          type: "multiple",
          order: 1,
          options: [
            { text: "Sim", order: 1 },
            { text: "Não", order: 2 },
          ],
        },
        {
          text: "Quantos desenvolvedores você já gerenciou?",
          type: "multiple",
          order: 2,
          options: [
            { text: "1-5", order: 1 },
            { text: "6-10", order: 2 },
            { text: "11+", order: 3 },
          ],
        },
        {
          text: "Descreva sua experiência em liderança técnica.",
          type: "open",
          order: 3,
        },
      ],
    },
    {
      job: {
        title: "Business Analyst",
        company: "Business Solutions",
        location: "Rio de Janeiro - RJ",
        type: "presencial",
        description:
          "Analisar requisitos de negócio e traduzir para requisitos técnicos.",
        salary: "R$ 8.500",
      },
      questions: [
        {
          text: "Tem experiência com levantamento de requisitos?",
          type: "multiple",
          order: 1,
          options: [
            { text: "Sim", order: 1 },
            { text: "Não", order: 2 },
          ],
        },
        {
          text: "Qual sua familiaridade com metodologias ágeis?",
          type: "multiple",
          order: 2,
          options: [
            { text: "SCRUM", order: 1 },
            { text: "Kanban", order: 2 },
            { text: "Ambas", order: 3 },
          ],
        },
        {
          text: "Descreva um projeto onde você atuou como elo entre negócio e TI.",
          type: "open",
          order: 3,
        },
      ],
    },
    {
      job: {
        title: "Salesforce Developer",
        company: "CRM Experts",
        location: "Remoto",
        type: "remoto",
        description: "Desenvolver e customizar soluções Salesforce.",
        salary: "R$ 12.500",
      },
      questions: [
        {
          text: "Tem certificação Salesforce?",
          type: "multiple",
          order: 1,
          options: [
            { text: "Sim", order: 1 },
            { text: "Não", order: 2 },
          ],
        },
        {
          text: "Quanto tempo de experiência com Salesforce?",
          type: "multiple",
          order: 2,
          options: [
            { text: "1-2 anos", order: 1 },
            { text: "3-5 anos", order: 2 },
            { text: "6+ anos", order: 3 },
          ],
        },
        {
          text: "Descreva uma implementação complexa no Salesforce.",
          type: "open",
          order: 3,
        },
      ],
    },
    {
      job: {
        title: "Angular Developer",
        company: "Web Dynamics",
        location: "Florianópolis - SC",
        type: "híbrido",
        description: "Desenvolver aplicações SPA com Angular.",
        salary: "R$ 9.200",
      },
      questions: [
        {
          text: "Qual versão do Angular você utiliza?",
          type: "multiple",
          order: 1,
          options: [
            { text: "Angular 2+", order: 1 },
            { text: "AngularJS", order: 2 },
            { text: "Ambas", order: 3 },
          ],
        },
        {
          text: "Tempo de experiência com Angular?",
          type: "multiple",
          order: 2,
          options: [
            { text: "1-2 anos", order: 1 },
            { text: "3-4 anos", order: 2 },
            { text: "5+ anos", order: 3 },
          ],
        },
        {
          text: "Conte sobre um projeto Angular que você considera bem-sucedido.",
          type: "open",
          order: 3,
        },
      ],
    },
    {
      job: {
        title: "Vue.js Developer",
        company: "Modern Web",
        location: "Remoto",
        type: "remoto",
        description: "Criar interfaces dinâmicas com Vue.js e Vuex.",
        salary: "R$ 8.800",
      },
      questions: [
        {
          text: "Tem experiência com Vue.js?",
          type: "multiple",
          order: 1,
          options: [
            { text: "Sim", order: 1 },
            { text: "Não", order: 2 },
          ],
        },
        {
          text: "Já trabalhou com Vue 3?",
          type: "multiple",
          order: 2,
          options: [
            { text: "Sim", order: 1 },
            { text: "Não", order: 2 },
          ],
        },
        {
          text: "Descreva um projeto onde utilizou Vue.js.",
          type: "open",
          order: 3,
        },
      ],
    },
    {
      job: {
        title: "Ruby on Rails Developer",
        company: "Ruby Labs",
        location: "Remoto",
        type: "remoto",
        description: "Desenvolver aplicações web com Ruby on Rails.",
        salary: "R$ 10.500",
      },
      questions: [
        {
          text: "Tem experiência com Ruby on Rails?",
          type: "multiple",
          order: 1,
          options: [
            { text: "Sim", order: 1 },
            { text: "Não", order: 2 },
          ],
        },
        {
          text: "Qual versão do Rails você utiliza?",
          type: "multiple",
          order: 2,
          options: [
            { text: "5.x", order: 1 },
            { text: "6.x", order: 2 },
            { text: "7.x", order: 3 },
          ],
        },
        {
          text: "Conte sobre uma aplicação Rails que você desenvolveu.",
          type: "open",
          order: 3,
        },
      ],
    },
    {
      job: {
        title: "Go Developer",
        company: "Performance Systems",
        location: "São Paulo - SP",
        type: "híbrido",
        description:
          "Desenvolver microsserviços e APIs de alta performance com Go.",
        salary: "R$ 13.000",
      },
      questions: [
        {
          text: "Tem experiência com Go?",
          type: "multiple",
          order: 1,
          options: [
            { text: "Sim", order: 1 },
            { text: "Não", order: 2 },
          ],
        },
        {
          text: "Quanto tempo programando em Go?",
          type: "multiple",
          order: 2,
          options: [
            { text: "0-1 ano", order: 1 },
            { text: "2-3 anos", order: 2 },
            { text: "4+ anos", order: 3 },
          ],
        },
        {
          text: "Descreva um sistema que você desenvolveu usando Go.",
          type: "open",
          order: 3,
        },
      ],
    },
    {
      job: {
        title: "Site Reliability Engineer",
        company: "Reliable Systems",
        location: "Remoto",
        type: "remoto",
        description:
          "Garantir confiabilidade e performance de sistemas em produção.",
        salary: "R$ 16.000",
      },
      questions: [
        {
          text: "Tem experiência com monitoração?",
          type: "multiple",
          order: 1,
          options: [
            { text: "Sim", order: 1 },
            { text: "Não", order: 2 },
          ],
        },
        {
          text: "Qual ferramenta de monitoração você prefere?",
          type: "multiple",
          order: 2,
          options: [
            { text: "Prometheus", order: 1 },
            { text: "Datadog", order: 2 },
            { text: "New Relic", order: 3 },
          ],
        },
        {
          text: "Conte sobre um incidente de produção que você resolveu.",
          type: "open",
          order: 3,
        },
      ],
    },
    {
      job: {
        title: "Content Writer",
        company: "Content Masters",
        location: "Remoto",
        type: "remoto",
        description: "Produzir conteúdo para blog, redes sociais e marketing.",
        salary: "R$ 5.500",
      },
      questions: [
        {
          text: "Tem portfólio de textos?",
          type: "multiple",
          order: 1,
          options: [
            { text: "Sim", order: 1 },
            { text: "Não", order: 2 },
          ],
        },
        {
          text: "Qual sua área de especialidade?",
          type: "multiple",
          order: 2,
          options: [
            { text: "Tecnologia", order: 1 },
            { text: "Marketing", order: 2 },
            { text: "Educação", order: 3 },
          ],
        },
        {
          text: "Descreva um projeto de conteúdo que você mais gostou.",
          type: "open",
          order: 3,
        },
      ],
    },
    {
      job: {
        title: "Customer Success",
        company: "Happy Clients",
        location: "São Paulo - SP",
        type: "híbrido",
        description: "Garantir satisfação e retenção de clientes.",
        salary: "R$ 6.000",
      },
      questions: [
        {
          text: "Tem experiência com atendimento ao cliente?",
          type: "multiple",
          order: 1,
          options: [
            { text: "Sim", order: 1 },
            { text: "Não", order: 2 },
          ],
        },
        {
          text: "Qual seu nível com ferramentas de CRM?",
          type: "multiple",
          order: 2,
          options: [
            { text: "Iniciante", order: 1 },
            { text: "Intermediário", order: 2 },
            { text: "Avançado", order: 3 },
          ],
        },
        {
          text: "Conte como você lidou com um cliente difícil.",
          type: "open",
          order: 3,
        },
      ],
    },
    {
      job: {
        title: "Network Engineer",
        company: "Connect Networks",
        location: "Brasília - DF",
        type: "presencial",
        description: "Projetar e manter infraestrutura de redes corporativas.",
        salary: "R$ 11.000",
      },
      questions: [
        {
          text: "Tem certificação Cisco?",
          type: "multiple",
          order: 1,
          options: [
            { text: "Sim", order: 1 },
            { text: "Não", order: 2 },
          ],
        },
        {
          text: "Qual sua experiência com redes?",
          type: "multiple",
          order: 2,
          options: [
            { text: "1-3 anos", order: 1 },
            { text: "4-6 anos", order: 2 },
            { text: "7+ anos", order: 3 },
          ],
        },
        {
          text: "Descreva uma implementação complexa de rede que você fez.",
          type: "open",
          order: 3,
        },
      ],
    },
    {
      job: {
        title: "iOS Developer",
        company: "Apple Experts",
        location: "Remoto",
        type: "remoto",
        description: "Desenvolver aplicativos nativos para iOS com Swift.",
        salary: "R$ 12.000",
      },
      questions: [
        {
          text: "Prefere Swift ou Objective-C?",
          type: "multiple",
          order: 1,
          options: [
            { text: "Swift", order: 1 },
            { text: "Objective-C", order: 2 },
            { text: "Ambos", order: 3 },
          ],
        },
        {
          text: "Tempo de experiência com iOS?",
          type: "multiple",
          order: 2,
          options: [
            { text: "1-2 anos", order: 1 },
            { text: "3-5 anos", order: 2 },
            { text: "6+ anos", order: 3 },
          ],
        },
        {
          text: "Conte sobre um app iOS que você publicou.",
          type: "open",
          order: 3,
        },
      ],
    },
    {
      job: {
        title: "Android Developer",
        company: "Android Masters",
        location: "Remoto",
        type: "remoto",
        description: "Desenvolver aplicativos nativos para Android com Kotlin.",
        salary: "R$ 11.500",
      },
      questions: [
        {
          text: "Prefere Kotlin ou Java?",
          type: "multiple",
          order: 1,
          options: [
            { text: "Kotlin", order: 1 },
            { text: "Java", order: 2 },
            { text: "Ambos", order: 3 },
          ],
        },
        {
          text: "Tempo de experiência com Android?",
          type: "multiple",
          order: 2,
          options: [
            { text: "1-3 anos", order: 1 },
            { text: "4-6 anos", order: 2 },
            { text: "7+ anos", order: 3 },
          ],
        },
        {
          text: "Descreva um app Android que você desenvolveu.",
          type: "open",
          order: 3,
        },
      ],
    },
    {
      job: {
        title: "Game Developer",
        company: "Game Studios",
        location: "São Paulo - SP",
        type: "híbrido",
        description: "Desenvolver jogos para múltiplas plataformas.",
        salary: "R$ 9.500",
      },
      questions: [
        {
          text: "Tem experiência com Unity?",
          type: "multiple",
          order: 1,
          options: [
            { text: "Sim", order: 1 },
            { text: "Não", order: 2 },
          ],
        },
        {
          text: "Qual sua experiência com desenvolvimento de jogos?",
          type: "multiple",
          order: 2,
          options: [
            { text: "Indie", order: 1 },
            { text: "Estúdio pequeno", order: 2 },
            { text: "Grande estúdio", order: 3 },
          ],
        },
        {
          text: "Conte sobre um jogo que você desenvolveu.",
          type: "open",
          order: 3,
        },
      ],
    },
    {
      job: {
        title: "AI Engineer",
        company: "AI Innovations",
        location: "Remoto",
        type: "remoto",
        description:
          "Desenvolver modelos de inteligência artificial e machine learning.",
        salary: "R$ 17.000",
      },
      questions: [
        {
          text: "Tem experiência com TensorFlow ou PyTorch?",
          type: "multiple",
          order: 1,
          options: [
            { text: "TensorFlow", order: 1 },
            { text: "PyTorch", order: 2 },
            { text: "Ambos", order: 3 },
          ],
        },
        {
          text: "Quanto tempo de experiência com IA?",
          type: "multiple",
          order: 2,
          options: [
            { text: "0-2 anos", order: 1 },
            { text: "3-5 anos", order: 2 },
            { text: "6+ anos", order: 3 },
          ],
        },
        {
          text: "Descreva um projeto de IA que você desenvolveu.",
          type: "open",
          order: 3,
        },
      ],
    },
    {
      job: {
        title: "Blockchain Developer",
        company: "Crypto Tech",
        location: "Remoto",
        type: "remoto",
        description:
          "Desenvolver smart contracts e aplicações descentralizadas.",
        salary: "R$ 18.000",
      },
      questions: [
        {
          text: "Tem experiência com Solidity?",
          type: "multiple",
          order: 1,
          options: [
            { text: "Sim", order: 1 },
            { text: "Não", order: 2 },
          ],
        },
        {
          text: "Qual blockchain você tem experiência?",
          type: "multiple",
          order: 2,
          options: [
            { text: "Ethereum", order: 1 },
            { text: "Binance", order: 2 },
            { text: "Outras", order: 3 },
          ],
        },
        {
          text: "Conte sobre um projeto blockchain que você participou.",
          type: "open",
          order: 3,
        },
      ],
    },
    {
      job: {
        title: "PHP Developer",
        company: "Web Solutions",
        location: "Remoto",
        type: "remoto",
        description: "Desenvolver aplicações web com PHP e Laravel.",
        salary: "R$ 8.500",
      },
      questions: [
        {
          text: "Tem experiência com Laravel?",
          type: "multiple",
          order: 1,
          options: [
            { text: "Sim", order: 1 },
            { text: "Não", order: 2 },
          ],
        },
        {
          text: "Quanto tempo de experiência com PHP?",
          type: "multiple",
          order: 2,
          options: [
            { text: "1-3 anos", order: 1 },
            { text: "4-6 anos", order: 2 },
            { text: "7+ anos", order: 3 },
          ],
        },
        {
          text: "Descreva um sistema PHP que você desenvolveu.",
          type: "open",
          order: 3,
        },
      ],
    },
    {
      job: {
        title: "Technical Writer",
        company: "Doc Experts",
        location: "Remoto",
        type: "remoto",
        description: "Criar documentação técnica para APIs e produtos.",
        salary: "R$ 7.200",
      },
      questions: [
        {
          text: "Tem experiência com documentação técnica?",
          type: "multiple",
          order: 1,
          options: [
            { text: "Sim", order: 1 },
            { text: "Não", order: 2 },
          ],
        },
        {
          text: "Qual tipo de documentação você já fez?",
          type: "multiple",
          order: 2,
          options: [
            { text: "API", order: 1 },
            { text: "Tutoriais", order: 2 },
            { text: "Manuais", order: 3 },
          ],
        },
        {
          text: "Descreva um projeto de documentação que você realizou.",
          type: "open",
          order: 3,
        },
      ],
    },
    {
      job: {
        title: "HR Recruiter",
        company: "Talent Hunters",
        location: "São Paulo - SP",
        type: "híbrido",
        description: "Recrutar talentos para área de tecnologia.",
        salary: "R$ 6.800",
      },
      questions: [
        {
          text: "Tem experiência com recrutamento tech?",
          type: "multiple",
          order: 1,
          options: [
            { text: "Sim", order: 1 },
            { text: "Não", order: 2 },
          ],
        },
        {
          text: "Qual seu nível com ferramentas de recrutamento?",
          type: "multiple",
          order: 2,
          options: [
            { text: "Iniciante", order: 1 },
            { text: "Intermediário", order: 2 },
            { text: "Avançado", order: 3 },
          ],
        },
        {
          text: "Conte sobre uma contratação difícil que você realizou.",
          type: "open",
          order: 3,
        },
      ],
    },
    {
      job: {
        title: "Systems Analyst",
        company: "Enterprise IT",
        location: "Belo Horizonte - MG",
        type: "presencial",
        description: "Analisar e propor soluções para sistemas corporativos.",
        salary: "R$ 9.000",
      },
      questions: [
        {
          text: "Tem experiência com análise de sistemas?",
          type: "multiple",
          order: 1,
          options: [
            { text: "Sim", order: 1 },
            { text: "Não", order: 2 },
          ],
        },
        {
          text: "Qual sua familiaridade com ERP?",
          type: "multiple",
          order: 2,
          options: [
            { text: "SAP", order: 1 },
            { text: "Oracle", order: 2 },
            { text: "Outros", order: 3 },
          ],
        },
        {
          text: "Descreva um projeto de análise de sistemas que você participou.",
          type: "open",
          order: 3,
        },
      ],
    },
    {
      job: {
        title: "Support Engineer",
        company: "Customer Tech",
        location: "Remoto",
        type: "remoto",
        description: "Prestar suporte técnico para clientes de software.",
        salary: "R$ 6.000",
      },
      questions: [
        {
          text: "Tem experiência com suporte técnico?",
          type: "multiple",
          order: 1,
          options: [
            { text: "Sim", order: 1 },
            { text: "Não", order: 2 },
          ],
        },
        {
          text: "Qual seu nível com sistemas de ticket?",
          type: "multiple",
          order: 2,
          options: [
            { text: "Zendesk", order: 1 },
            { text: "Jira", order: 2 },
            { text: "Outros", order: 3 },
          ],
        },
        {
          text: "Conte sobre um caso complexo de suporte que você resolveu.",
          type: "open",
          order: 3,
        },
      ],
    },
    {
      job: {
        title: "IT Manager",
        company: "Corporate IT",
        location: "São Paulo - SP",
        type: "presencial",
        description: "Gerenciar equipe de TI e infraestrutura corporativa.",
        salary: "R$ 19.000",
      },
      questions: [
        {
          text: "Tem experiência gerencial?",
          type: "multiple",
          order: 1,
          options: [
            { text: "Sim", order: 1 },
            { text: "Não", order: 2 },
          ],
        },
        {
          text: "Quantas pessoas você já gerenciou?",
          type: "multiple",
          order: 2,
          options: [
            { text: "1-10", order: 1 },
            { text: "11-20", order: 2 },
            { text: "21+", order: 3 },
          ],
        },
        {
          text: "Descreva sua experiência em gestão de TI.",
          type: "open",
          order: 3,
        },
      ],
    },
    {
      job: {
        title: "SEO Specialist",
        company: "Search Masters",
        location: "Remoto",
        type: "remoto",
        description: "Otimizar sites para mecanismos de busca.",
        salary: "R$ 7.500",
      },
      questions: [
        {
          text: "Tem experiência com SEO?",
          type: "multiple",
          order: 1,
          options: [
            { text: "Sim", order: 1 },
            { text: "Não", order: 2 },
          ],
        },
        {
          text: "Qual ferramenta de SEO você prefere?",
          type: "multiple",
          order: 2,
          options: [
            { text: "SEMrush", order: 1 },
            { text: "Ahrefs", order: 2 },
            { text: "Google Analytics", order: 3 },
          ],
        },
        {
          text: "Conte sobre um projeto de SEO bem-sucedido.",
          type: "open",
          order: 3,
        },
      ],
    },
    {
      job: {
        title: "Legal Tech Lawyer",
        company: "Legal Innovators",
        location: "São Paulo - SP",
        type: "híbrido",
        description: "Atuar na interseção entre direito e tecnologia.",
        salary: "R$ 15.000",
      },
      questions: [
        {
          text: "Tem experiência com contratos de tecnologia?",
          type: "multiple",
          order: 1,
          options: [
            { text: "Sim", order: 1 },
            { text: "Não", order: 2 },
          ],
        },
        {
          text: "Qual sua familiaridade com LGPD?",
          type: "multiple",
          order: 2,
          options: [
            { text: "Básica", order: 1 },
            { text: "Intermediária", order: 2 },
            { text: "Avançada", order: 3 },
          ],
        },
        {
          text: "Descreva um caso legal complexo envolvendo tecnologia.",
          type: "open",
          order: 3,
        },
      ],
    },
    {
      job: {
        title: "Infrastructure Analyst",
        company: "IT Infrastructure",
        location: "Rio de Janeiro - RJ",
        type: "presencial",
        description: "Administrar servidores e infraestrutura local.",
        salary: "R$ 8.000",
      },
      questions: [
        {
          text: "Tem experiência com servidores Linux?",
          type: "multiple",
          order: 1,
          options: [
            { text: "Sim", order: 1 },
            { text: "Não", order: 2 },
          ],
        },
        {
          text: "Qual sua experiência com virtualização?",
          type: "multiple",
          order: 2,
          options: [
            { text: "VMware", order: 1 },
            { text: "Hyper-V", order: 2 },
            { text: "Outras", order: 3 },
          ],
        },
        {
          text: "Descreva uma migração de servidores que você realizou.",
          type: "open",
          order: 3,
        },
      ],
    },
    {
      job: {
        title: "E-commerce Specialist",
        company: "Online Sales",
        location: "Remoto",
        type: "remoto",
        description: "Gerenciar lojas virtuais e otimizar conversões.",
        salary: "R$ 7.000",
      },
      questions: [
        {
          text: "Tem experiência com plataformas e-commerce?",
          type: "multiple",
          order: 1,
          options: [
            { text: "Shopify", order: 1 },
            { text: "Magento", order: 2 },
            { text: "Outras", order: 3 },
          ],
        },
        {
          text: "Qual sua experiência com métricas de conversão?",
          type: "multiple",
          order: 2,
          options: [
            { text: "Iniciante", order: 1 },
            { text: "Intermediária", order: 2 },
            { text: "Avançada", order: 3 },
          ],
        },
        {
          text: "Conte sobre uma loja virtual que você gerenciou.",
          type: "open",
          order: 3,
        },
      ],
    },
  ];

  for (const data of jobs) {
    await prisma.job.create({
      data: {
        ...data.job,
        postedById: user.id,

        questions: {
          create: data.questions.map((q) => {
            if (q.type === "open")
              return {
                text: q.text,
                type: q.type,
                order: q.order,
              };

            return {
              text: q.text,
              type: q.type,
              order: q.order,
              options: {
                create: q.options!.map((option) => ({
                  text: option.text,
                  order: option.order,
                })),
              },
            };
          }),
        },
      },
    });
  }
}

seed()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
