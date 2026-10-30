# Checklist de publicação | Instituto Bárbara Lopes

Itens que dependem da cliente ou da responsável técnica. Nenhum deles foi preenchido com dados fictícios.
Variáveis de ambiente: ver `.env.example` (configurar também no painel da Vercel).

## Bloqueantes para divulgar o site

- [x] **WhatsApp oficial**: +55 18 98827-0018, configurado em `lib/site-config.ts` (pode ser sobrescrito por `NEXT_PUBLIC_WHATSAPP_NUMBER`).
      Todos os botões de agendamento abrem o WhatsApp com a mensagem pré-preenchida.
- [ ] **Registro profissional (CRBM)** validado → `NEXT_PUBLIC_PROFESSIONAL_REGISTRATION`.
      Aparece no rodapé, na seção "Sobre" e como responsável técnica apenas quando preenchido.
- [ ] **Domínio definitivo** → `NEXT_PUBLIC_SITE_URL` (canonical, sitemap, Open Graph e Schema.org).
- [ ] **Validação do texto clínico** pela responsável técnica (`lib/content.ts`), em especial Método Trico, Tecnologias e FAQ.

## Conteúdo sujeito a validação

- [ ] **Procedimentos da categoria C** (`lib/content.ts` → `technologyCategories`, todos com `publish: false`):
      MMP, intradermoterapia, PRP, fios de PDO e ativos específicos (vitaminas, minerais, fatores de crescimento, peptídeos, PDRN, exossomos).
      Publicar cada item só após confirmar habilitação profissional, regularidade sanitária, indicação admitida e respaldo técnico-científico.
      Para liberar um item: alterar `publish` para `true`.
- [ ] **Categorias A e B** (avaliação e tecnologias de consultório): confirmar a lista final (fotobiomodulação local, ILIB, eletroterapias).
- [ ] **Afirmações que exigem comprovação documental** (não publicadas):
      "única professora na região de Araçatuba" e "maior academia de tricologia do mundo".
- [ ] **Frase editorial** da seção Acompanhamento ("Cuidar do cabelo também é cuidar de como você se sente ao longo do caminho.") e microtextos de apoio dos blocos: aprovação de tom.
- [ ] **Programa de acompanhamento de 90 dias**: se existir, descrever como período de acompanhamento/reavaliação, nunca como prazo de resultado.

## Jurídico e LGPD

- [ ] **Política de Privacidade** (`app/politica-de-privacidade/page.tsx`): texto-base para revisão jurídica.
      Incluir controlador (razão social e CNPJ), encarregado de dados (DPO) e canal oficial de atendimento.
- [ ] **Razão social / CNPJ** → `NEXT_PUBLIC_LEGAL_ENTITY` (rodapé).
- [ ] **Ferramentas de análise** (opcionais): `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_GTM_ID`, `NEXT_PUBLIC_META_PIXEL_ID`.
      Só carregam após consentimento. Os eventos enviam apenas nome do evento e posição do CTA, nunca dados de saúde.
- [ ] **Licença do Remotion**: gratuita para pessoas físicas e empresas com até 3 colaboradores; acima disso exige licença empresarial
      (remotion.pro). Confirmar o enquadramento da empresa responsável pelo site.

## Presença digital

- [ ] **Instagram oficial** → `NEXT_PUBLIC_INSTAGRAM_URL` (rodapé e Schema.org `sameAs`).
- [ ] Horários de atendimento, estacionamento e acessibilidade do prédio: **não publicados** por falta de informação. Incluir somente se confirmados.
- [ ] Google Business Profile: conferir se nome e endereço estão idênticos ao site.
- [ ] Após publicar no domínio final: enviar o sitemap no Google Search Console.

## Eventos de conversão disponíveis

`hero_cta_click`, `method_cta_click`, `technology_cta_click`, `final_cta_click`, `whatsapp_click`,
`video_play`, `video_complete`, `faq_open`, `maps_click`.
