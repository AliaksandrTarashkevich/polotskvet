# PolotskVet — launch checklist (SEO and AI answers)

Written 17.11.2026, when the site got separate pages. The site is closed to indexing on purpose: no domain yet, services and prices not confirmed by Roman. Do the steps in order; tick them in this file as they land.

## 1. Facts from Roman (blocks everything else)

The open questions are collected, ready to send, in `docs/ROMAN_QUESTIONS.md`. Before launch:

- [x] Services at home confirmed by Alex on 17.11.2026 (list in `inputs/services.json`); ECG, microchipping, nail trimming and drips got their own pages.
- [ ] Prices in BYN, at least «от»: add them to `/ceny`, the service pages and the FAQ; then `priceRange` may go into the practice node. Done so far: the call-out, 70 руб., at night 140 руб. (Alex, 17.11.2026), on `/ceny`, both home pages, `/uslugi`, `/voprosy` and the home-service pages.
- [ ] Hours for calls and visits: add to `/kontakty`, the FAQ and `openingHoursSpecification`.
- [ ] Species (now «кошки и собаки»), «профилактика» as the fifth profile, the second doctor.
- [ ] Roman reads every page and confirms the texts.
- [ ] 3–5 real photos from home visits replace the generated `gen-cat-*` illustrations.

## 2. Design decisions

- [ ] Home chosen: `/` (as approved, plus calls to action) or `/novaya` (links to every page). Keep one at `/`, delete the other file and `data-home` with the «Главная» switch in `preview.js`.
- [ ] Style chosen (Спокойно / Смело / Игриво / Журнал): keep its rules in `public/assets/css/styles.css` without the `html[data-style="…"]` prefix, delete the other three.
- [ ] Icon chosen: keep `logo-N.png` and `icon-N.png`, delete the other option and the `data-logo` switch rule in `site.css`; make `apple-touch-icon.png` (180×180) and a 32×32 favicon from the chosen icon.
- [ ] Remove the preview bar from every page: `data-styles`, `data-icons`, `preview-head.js`, `preview.js`, `preview.css`.
- [ ] Self-host the fonts (Literata, Golos Text; Caveat only if «Игриво» stays) in `public/assets/fonts/` and drop Google Fonts.
- [ ] Delete `public/concepts/` and the `/concepts/1plus` redirect in `vercel.json`.

## 3. Domain

- [ ] Buy the domain (candidate `polotskvet.by`; availability and transliteration not checked) and connect it in Vercel. Keep `polotskvet.vercel.app` redirecting to it.
- [ ] Check that the site opens from phones in Belarus (mobile operators and home Wi-Fi).

## 4. Open indexing (all in one change)

- [ ] `<link rel="canonical" href="https://DOMAIN/…">` on every page, without `.html`.
- [ ] JSON-LD: turn relative URLs (`"/"`, `"/vrach"`, `"/#practice"`, `"/assets/…"`) into full `https://DOMAIN/…` URLs.
- [ ] `public/sitemap.xml` with every page except `404.html` (and except the home version that was not chosen), `lastmod` from the last commit that changed each page.
- [ ] `public/robots.txt`:

  ```
  User-agent: *
  Allow: /

  Sitemap: https://DOMAIN/sitemap.xml
  ```

  AI crawlers (GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended, YandexAdditional) are allowed by default, so there is nothing to add. Block one only if Alex decides to.
- [ ] Remove the `X-Robots-Tag: noindex, nofollow` header from `vercel.json`.
- [ ] Remove `<meta name="robots" content="noindex,nofollow">` from every page except `404.html`.
- [ ] Check all three on the live site: `curl -sI https://DOMAIN/ | grep -i robots` shows nothing, `/robots.txt` allows, the page source has no `noindex`.

## 5. Search engines and maps (from Alex's or Roman's accounts)

- [ ] Google Search Console and Яндекс Вебмастер: verify the domain (DNS record is simplest), submit the sitemap, request indexing of the main pages. Bing Webmaster Tools too: Copilot and some other AI search tools use the Bing index.
- [ ] Яндекс Бизнес (Яндекс Карты) and Google Business Profile: a home-visit practice that serves Полоцк, Новополоцк and the district, without a fake address; the same name, phone, Telegram and description as on the site; real photos; a link to the site.
- [ ] Reviews: after each visit, ask the owner to leave an honest review on the maps. No paid or invented reviews, no rewards for five stars.
- [ ] The same name, phone and area everywhere: site, maps, Telegram profile, any directory or social profile.

## 6. Measure

- [ ] Demand: check the queries in Яндекс Wordstat and Google Keyword Planner for Полоцк and Новополоцк («ветеринар на дом Полоцк», «вызов ветеринара Новополоцк», «прививка собаке на дому», «онлайн консультация ветеринара»). Adjust page titles to what people actually type.
- [ ] Analytics without extra cookies: count clicks on `tel:` and `t.me` links separately from real bookings; ask every new client «откуда узнали» and keep the answer.
- [ ] Once a month: ask ChatGPT, Perplexity and Алиса «ветеринар на дом Полоцк» and «вызов ветеринара Новополоцк», note whether Roman is named and what they say.
