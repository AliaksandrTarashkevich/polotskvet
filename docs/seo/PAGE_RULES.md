# PolotskVet — rules for site pages (SEO and AI answers)

Written 17.11.2026 when the site moved from one long page to separate pages. Read this before writing or changing any page. `AGENTS.md`, `docs/PROJECT_CONTEXT.md` and `inputs/*.json` still apply; when they disagree with this file, they win.

## Why the pages exist

Each page answers one search question that owners in Polotsk and Novopolotsk actually type ("вызов ветеринара на дом Полоцк", "прививка собаке на дому Новополоцк", "сколько стоит вызов ветеринара"). The same page must be easy for AI answers (ChatGPT, Perplexity, Яндекс Алиса, Google AI Overviews) to quote: a short, self-contained answer at the top, real facts, consistent contacts everywhere.

The site stays closed to indexing until launch (see `docs/seo/LAUNCH_CHECKLIST.md`). Every page keeps `<meta name="robots" content="noindex,nofollow">`.

## Page map

| URL | File | Main question |
|---|---|---|
| `/` | `public/index.html` | Home: who, where, what, how to book |
| `/vrach` | `public/vrach.html` | Who is the doctor: education, experience, profiles, approach |
| `/uslugi` | `public/uslugi.html` | What can be done at home and online |
| `/uslugi/vyzov-veterinara-na-dom` | `public/uslugi/vyzov-veterinara-na-dom.html` | **Reference page.** How a home visit works |
| `/uslugi/onlajn-konsultaciya` | `public/uslugi/onlajn-konsultaciya.html` | Online consultation (confirmed by Roman) |
| `/uslugi/vakcinaciya` | `public/uslugi/vakcinaciya.html` | Vaccination at home (candidate, not confirmed) |
| `/uslugi/analizy` | `public/uslugi/analizy.html` | Blood sampling at home (candidate, not confirmed) |
| `/uslugi/procedury` | `public/uslugi/procedury.html` | Prescribed procedures at home (candidate, not confirmed) |
| `/ceny` | `public/ceny.html` | How much a visit costs and what the price is made of |
| `/zona-vyezda` | `public/zona-vyezda.html` | Where the doctor travels |
| `/voprosy` | `public/voprosy.html` | All questions and answers |
| `/kontakty` | `public/kontakty.html` | Phone, Telegram, what to tell when booking |
| any wrong URL | `public/404.html` | Page not found |

Vercel serves `name.html` at `/name` (`cleanUrls`). Always link without `.html`, with a leading slash: `/uslugi/vakcinaciya`.

## Skeleton of every page

Copy from the reference page `public/uslugi/vyzov-veterinara-na-dom.html`, verbatim:

- the whole `<head>` except `<title>`, `<meta name="description">` and the JSON-LD block;
- `<header>`; set `aria-current="page"` on the menu link of the page itself, `aria-current="true"` on the section link for a child page (all `/uslugi/*` pages mark «Услуги»), nothing on the other links;
- the contact block (`<section class="contact wrap" id="contact" data-rv>` with the cat `svg.peek`), the `<footer>` and the `.mbar` bar. The contact block heading and paragraph may change to fit the page; the two buttons stay as they are.

`<html lang="ru" data-styles="calm bold play mag" data-icons="1 2">` stays on every page: the preview bar lets viewers choose the style and the logo icon until launch.

Inside `<main>`, in this order:

1. `section.page-hero.wrap`: `nav.crumbs` (Главная / … / current page as `<span aria-current="page">`), `p.eyebrow`, `h1`, `p.lead`, `div.actions` with the «Вызвать врача» button (`data-contact="<topic>"`) and the phone as `a.link-arrow.tel`. A `figure.page-photo` with one photo on the right (optional).
2. `section.answer.wrap`: `p.note` «коротко», then one paragraph of 2–4 sentences that answers the page's main question on its own: who, what, where, how to book (phone and Telegram as links), the price policy. Assume the reader sees only this paragraph.
3. `section.prose.wrap` blocks: `h2` on the left, `div.body` on the right. Headings are short; many can be questions people ask.
4. `section.faq.wrap.topline`: 3–6 questions in `<details><summary>…</summary><p>…</p></details>`.
5. `section.related.wrap` with `div.links`: 3–6 links to related pages, each `<a href><b>Title</b><span>one line</span></a>`.
6. `p.updated.wrap`: «Обновлено 17&nbsp;ноября 2026».
7. The contact block.

Components in `public/assets/css/site.css` you may use inside `.body` or as sections: `ul.dots` (bullets), `ul.ticks` (check marks), `ol.steps` (numbered steps with `h3` + `p`), `div.tiles` (plain cards: `<div><b>…</b><span>…</span></div>`), `div.reach` (big contact cards, links), `div.gallery` (photos: `<figure><div class="ph"><img></div><figcaption><b>…</b>…</figcaption></figure>`), `div.towns` (chips), `.grid` with `article.svc` cards (as on the home page: `h3 > a` makes the whole card a link), `p.note`, `a.more`, `.eyebrow`, `.lead`. All four styles already handle them. Do not add inline styles or new CSS; if a page needs something missing, say so in your report.

## Facts you may use

Only these. If a sentence needs anything else, leave it out and list it as a question for Roman.

- Роман Чертопалов, ветеринарный врач, 8 лет ветеринарной практики.
- Образование: Витебская государственная академия ветеринарной медицины. Year, specialty and degree are unknown: do not write them, do not write «окончил с отличием» or similar.
- 3 года в клинике «Девять жизней», Минск (no dates; never use the clinic's brand beyond this line, no «самая передовая»).
- Исполнял обязанности главного врача (place and dates unknown: never attach it to «Девять жизней»).
- Профили: терапия, кардиология, нефроурология, функциональная диагностика (УЗИ), профилактика. «Профилактика» still needs Roman's confirmation; keep it in the list as on the home page.
- Подход: pet-friendly приём («спокойно и бережно — с вниманием к характеру и самочувствию питомца») и доказательная медицина («обоснованные назначения и понятные объяснения: что делаем и зачем это нужно»).
- Формат: выезд на дом и онлайн-консультации. No clinic, no office address, no in-clinic appointments.
- Зона выезда: Полоцк, Новополоцк, Полоцкий район и ближайшие населённые пункты; более дальние адреса, возможность визита и стоимость дороги согласуем заранее. No radius, no list of villages, no travel times.
- Если Роман занят, к вам может приехать другой ветеринарный врач. Кто приедет, согласуем при записи. (Never name or describe the second doctor.)
- Животные: кошки и собаки (the wording on the site; Roman has not confirmed other species).
- Телефон: +375 33 649-17-75, link `tel:+375336491775`. Telegram: @romuluslll, link `https://t.me/romuluslll` with `target="_blank" rel="noopener"`.
- Запись: назовите город и адрес, возраст животного и причину обращения. Возможность выезда, время визита и стоимость согласуем при записи.
- Стоимость зависит от адреса и необходимой помощи: выезд, осмотр, процедуры, препараты и расходные материалы. Итоговую сумму и возможные доплаты обсуждаем перед записью. There are no prices yet: no numbers, no «от … BYN», no «недорого».
- Онлайн-консультация (confirmed): расскажите, что беспокоит питомца, и покажите назначения или результаты обследований; обсудим следующие шаги и необходимость очного приёма. The channel (call, chat, video) and the price are not confirmed: «способ связи и стоимость уточняются при записи».
- Подготовка к визиту: ветеринарный паспорт, предыдущие назначения и результаты обследований; спокойное, хорошо освещённое место. Подготовку к конкретной процедуре уточнит врач.
- Ограничения: возможности домашнего приёма ограничены; некоторые исследования и лечение требуют оборудования клиники; перед записью обсудим, подходит ли выезд.
- УЗИ — направление Романа, но выездное УЗИ не входит в список услуг. Never offer ultrasound at home.

### Candidate services (not confirmed by Roman)

Вакцинация, взятие крови для анализов, лечебные процедуры (candidates in `inputs/services.json`: инъекции, капельницы). They appear on the site already, so their pages exist, written carefully:

- say the service is discussed and agreed when booking: «по согласованию», «условия уточняем при записи», «врач уточнит, подходит ли домашний формат»;
- never «делаем», «всегда», «гарантируем», «в любое время»;
- no medical specifics: no vaccine names or schedules, no list of lab tests, no lab name, no turnaround times, no drug names, no doses;
- injections and drips only as «по назначению врача и после оценки, можно ли провести процедуру дома».

### Never

Prices, opening hours, «24/7», «круглосуточно», arrival times («приедем за 30 минут»), years of graduation, certificates, number of patients, ratings, reviews, testimonials, guarantees, «лучший», «лучшие в городе», another clinic's address or brand, a fake office address, emergency promises, promises about diagnoses or treatment results. No mass pages for villages or streets.

## Copy

- Russian, calm and plain, like the home page. Short sentences. Speak to the owner («вы»), the doctor in the third person («Роман», «врач»).
- Typography as on the home page: «ёлочки», em dash with a non-breaking space before it (`&nbsp;—`), `&nbsp;` after one- and two-letter words (в, и, к, с, о, у, на, по, не, за, до, от…), «ё» where it belongs.
- One `h1` per page, with the city where natural. `h2` for blocks; `h3` only inside steps and cards.
- Link the first mention of another page's topic to that page. Link text says where it goes («Из чего складывается цена»), never «здесь» or «подробнее» alone.
- Photos: only files in `public/assets/photos/`. Real photos of Roman: `roman-portrait.jpg` (853×1280), `roman-reading.jpg` (853×1280), `roman-diagnostics.jpg` (853×1280), `roman-exam-dog.jpg` (720×1280), `roman-equipment.jpg` (960×1280). Generated illustrations, never named as Roman or his patients: `gen-cat-ear.jpg`, `gen-cat-steth.jpg` (1536×1024). Use the alt texts below, always with `width` and `height`; `loading="lazy"` below the first screen, `fetchpriority="high"` on the page-hero photo.
  - roman-portrait: «Ветеринарный врач Роман Чертопалов со стетоскопом и медицинской сумкой»
  - roman-reading: «Ветеринарный врач Роман Чертопалов с книгой по кардиологии»
  - roman-diagnostics: «Роман Чертопалов, ветеринарный врач, на рабочем месте»
  - roman-exam-dog: «Роман Чертопалов во время обследования собаки»
  - roman-equipment: «Роман Чертопалов за работой в кабинете диагностики»
  - gen-cat-ear: «Руки ветеринарного врача в перчатках: осмотр рыжего кота дома на диване»
  - gen-cat-steth: «Ветеринарный врач слушает полосатую кошку стетоскопом дома на столе»

## Head and structured data

- `<title>`: the main query, then « — ПолоцкВет»; aim for 50–65 characters. `<meta name="description">`: 120–170 characters, one plain sentence or two with the city and how to book.
- One `<script type="application/ld+json">` with an `@graph`. URLs stay relative (`/uslugi/analizy`) until the domain is bought; the launch checklist turns them into full URLs.
  - Every page: `BreadcrumbList` (not on the home page) and a short practice node `{"@type": "VeterinaryCare", "@id": "/#practice", "name": "ПолоцкВет", "url": "/", "telephone": "+375336491775"}`.
  - Service pages: `Service` with `@id` `<url>#service`, `name`, `serviceType`, `description`, `url`, `provider: {"@id": "/#practice"}`, `areaServed` (Полоцк and Новополоцк as `City`, Полоцкий район as `AdministrativeArea`), `audience` «Владельцы кошек и собак».
  - Doctor page: `ProfilePage` with `mainEntity` the full `Person` `@id` `/vrach#roman` (same fields as on the home page).
  - Services page: `CollectionPage` with an `ItemList` of the service URLs.
  - Contacts page: `ContactPage`; the practice node may carry the two `contactPoint`s from the home page.
  - FAQ page only: `FAQPage` whose questions and answers repeat the visible text word for word (plain text, no HTML).
  - Never: `aggregateRating`, `review`, `priceRange`, `offers` with prices, `openingHours`, `address`, `geo`.

## Before you call a page done

- It opens from `python3 -m http.server 4174 --directory public` without console errors; every link and image resolves.
- `python3 -c "import json,re,sys; …"` or similar parses the JSON-LD.
- No fact outside the list above. Every unconfirmed service is worded as agreed when booking.
