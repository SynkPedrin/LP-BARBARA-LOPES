# Instituto Bárbara Lopes | Landing page

Landing page do Instituto Bárbara Lopes (Dra. Bárbara Lopes, tricologia avançada, Araçatuba SP), com o Método Trico,
filme do consultório composto em Remotion e agendamento via WhatsApp.

Pendências de publicação: **[PUBLICACAO.md](PUBLICACAO.md)**.

## Stack

- Next.js 16 (App Router, Turbopack), React 19, TypeScript strict
- Tailwind CSS 4 (tokens em `app/globals.css`)
- Motion (`motion/react`, via `LazyMotion`) para interações de interface
- Remotion 4 + `@remotion/player` para o filme do consultório
- `next/font` (Cormorant Garamond, Manrope, Allura) e `next/image` (AVIF/WebP)

## Comandos

```bash
npm install
npm run dev              # desenvolvimento em http://localhost:3000
npm run build && npm start
npm run lint
npm run typecheck
npm run remotion:studio  # abre o filme ClinicExperienceFilm no Remotion Studio
npm run media:prepare    # regenera as mídias otimizadas a partir de /assets
```

## Estrutura

```
app/                      layout (SEO, fontes, JSON-LD), página, política de privacidade, sitemap, robots, ícones
components/layout/        Header, Footer, MobileCTABar
components/sections/      Hero, Concerns, MethodTrico, Technologies, ClinicExperience, AboutBarbara,
                          ClinicalFollowUp, FAQ, Location, FinalCTA
components/remotion/      ClinicExperienceFilm (composição), film-config (roteiro), ClinicFilmStage (Player), ClinicFilm (carregamento e controles)
components/ui/            WhatsAppCTA, RevealTitle, GoldRule, RevealObserver, MotionProvider, PendingNotice
components/analytics/     scripts opcionais com consentimento (GA4, GTM, Meta Pixel)
lib/site-config.ts        contato, endereço, integrações (via variáveis de ambiente)
lib/content.ts            toda a copy editável e a lista de recursos com flag `publish`
lib/analytics.ts          eventos de conversão tipados + consentimento
remotion/                 entrada do Remotion Studio
assets/                   arquivos originais da cliente (nunca alterados)
public/assets/barbara/    mídias geradas por scripts/prepare-media.mjs
```

## Mídias

`npm run media:prepare` usa o ffmpeg que acompanha o Remotion e:

- copia a fotografia e a logo originais sem alteração;
- recorta a logo original (versão sem margens e monograma para o header e o favicon), sem redesenho;
- gera a imagem Open Graph a partir da fotografia;
- recodifica os 6 vídeos verticais (464 × 832) sem trilha de áudio e com faststart, sem upscale, e extrai os posters.

## Filme do consultório (Remotion)

`components/remotion/ClinicExperienceFilm.tsx` monta 18,2 s a 30 fps com os 6 vídeos reais: dissolves, revelação por máscara
e em arco, câmera digital sutil, gradação quente, moldura editorial e três frases pontuais. Na página, o Player:

- só é baixado quando a seção se aproxima da tela (chunk separado);
- exibe poster antes do carregamento;
- toca sem áudio apenas enquanto visível e pausa fora da viewport;
- não faz autoplay com economia de dados, rede 2G ou `prefers-reduced-motion` (o visitante pode tocar manualmente);
- usa uma única instância do Player.

## Configuração

Copie `.env.example` para `.env.local` e preencha o que estiver disponível. Na Vercel, cadastre as mesmas variáveis em
Project Settings → Environment Variables e faça um novo deploy.
