# Instituto Bárbara Lopes | Landing page

Landing page do Instituto Bárbara Lopes (Dra. Bárbara Lopes, tricologia avançada, Araçatuba SP), com o Método Trico,
galeria do espaço com tour em vídeo e agendamento via WhatsApp.

Pendências de publicação: **[PUBLICACAO.md](PUBLICACAO.md)**.

## Stack

- Next.js 16 (App Router, Turbopack), React 19, TypeScript strict
- Tailwind CSS 4 (tokens em `app/globals.css`)
- Motion (`motion/react`, via `LazyMotion`) para interações de interface
- `next/font` (Cormorant Garamond, Manrope, Allura) e `next/image` (AVIF/WebP)

## Comandos

```bash
npm install
npm run dev              # desenvolvimento em http://localhost:3000
npm run build && npm start
npm run lint
npm run typecheck
npm run media:prepare    # regenera as mídias otimizadas a partir de /assets
npm run media:photos     # fotos HEIC do iPhone → JPEG 4K (3840 px) sem metadados, imagem Open Graph e tour em vídeo 4K/1080p (macOS)
```

## Estrutura

```
app/                      layout (SEO, fontes, JSON-LD), página, política de privacidade, sitemap, robots, ícones
components/layout/        Header, Footer, MobileCTABar
components/sections/      Hero, Concerns, MethodTrico, Results90, Technologies, HomeCare, Bridal, Gallery,
                          AboutBarbara, ClinicalFollowUp, FAQ, Location, FinalCTA
components/ui/            Photo (fotos com variantes WebP estáticas e prévia borrada), WhatsAppCTA, RevealTitle, GoldRule, RevealObserver, MotionProvider, PendingNotice
components/analytics/     scripts opcionais com consentimento (GA4, GTM, Meta Pixel)
lib/site-config.ts        contato, endereço, integrações (via variáveis de ambiente)
lib/content.ts            toda a copy editável e a lista de recursos com flag `publish`
lib/analytics.ts          eventos de conversão tipados + consentimento
assets/                   arquivos originais da cliente (nunca alterados)
public/assets/barbara/    mídias geradas por scripts/prepare-media.mjs
```

## Mídias

`npm run media:prepare` usa o ffmpeg que acompanha o Remotion e:

- copia a logo original sem alteração;
- recorta a logo original (versão sem margens e monograma para o header e o favicon), sem redesenho;
- recodifica os 6 vídeos verticais (464 × 832) sem trilha de áudio e com faststart, sem upscale, e extrai os posters.

## Fotos e galeria

- `npm run media:photos` gera as fotos 4K (JPEG, sem metadados) e, em seguida, as variantes WebP (480–2880 px)
  em `public/assets/barbara/fotos/web` e as prévias borradas em `lib/photo-manifest.ts`.
- As fotos são servidas como arquivos estáticos pelo `components/ui/Photo.tsx` (loader próprio), sem otimização
  sob demanda: aparecem rápido mesmo na primeira visita, com a prévia borrada enquanto carregam.
- Galeria: colunas com paralaxe na rolagem, fotos reveladas por máscara e ampliação em tela cheia.
  O tour em vídeo toca em 1080p na página; em tela cheia, telas grandes recebem a versão 4K.

## Configuração

Copie `.env.example` para `.env.local` e preencha o que estiver disponível. Na Vercel, cadastre as mesmas variáveis em
Project Settings → Environment Variables e faça um novo deploy.
