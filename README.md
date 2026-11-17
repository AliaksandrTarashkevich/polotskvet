# PolotskVet

Сайт ветеринарного врача **Романа Чертопалова**: Полоцк, Новополоцк, выезды на дом и онлайн-консультации. С 17.11.2026 — отдельные страницы на дизайне «1+» в синей палитре; до запуска закрыт от поисковиков.

## Открыть

`python3 -m http.server 4173 --directory public`, затем http://localhost:4173. Адреса страниц локально с `.html` (`/ceny.html`), на Vercel без него (`/ceny`). Проект не требует Node.js, npm и сборки.

## Опубликовать

Полный пошаговый гайд: **[START-HERE.html](START-HERE.html)** или [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

На GitHub загружается содержимое этой папки. На Vercel: Framework `Other`, Root Directory — корень репозитория, Output Directory `public`. Остальные настройки в `vercel.json`.

## Файлы

| Путь | Назначение |
| --- | --- |
| `public/index.html` | Главная |
| `public/vrach.html`, `uslugi.html`, `uslugi/*.html`, `ceny.html`, `zona-vyezda.html`, `voprosy.html`, `kontakty.html`, `404.html` | Отдельные страницы; карта и правила — `docs/seo/PAGE_RULES.md` |
| `public/assets/css` | `site.css` — оформление, `styles.css` — четыре стиля на выбор, `preview.css` — панель выбора (убрать при запуске) |
| `public/assets/js` | `site.js` — меню, окно контактов, анимации; `preview-head.js` и `preview.js` — панель выбора стиля и иконки (убрать при запуске) |
| `public/assets` | Логотипы и иконки (`brand/`), выровненные фото (`photos/`), исходные фото врача (`doctor/`), старые PNG-иллюстрации и шрифт Manrope |
| `public/concepts` | Пять черновых вариантов дизайна (13.11.2026) для справки; `/concepts/1plus` ведёт на главную |
| `design-assets/grade-photos.sh` | Рецепт выравнивания оттенков фотографий (ffmpeg); оригиналы не меняет |
| `design-assets/build-logo-options.sh` | Сборка двух вариантов логотипа из знаков в `design-assets/icons/` |
| `design-assets/stock`, `design-assets/generated` | Исходники стокового фото (варианты 3 и 5) и сгенерированных фото (руки ветеринара с кошками); бриф — `docs/chatgpt-photo-brief.md` |
| `design-assets` | Исходные PNG логотипа, знаки, сведения об ассетах (`ASSETS.json`) |
| `inputs` | Подтверждённые факты и статус услуг; не автоматический источник страниц |
| `docs/PROJECT_CONTEXT.md` | Актуальный контекст, решения и следующие работы |
| `docs/seo/PAGE_RULES.md` | Правила страниц: каркас, разрешённые факты, тексты, разметка |
| `docs/seo/LAUNCH_CHECKLIST.md` | Что сделать до открытия индексации |
| `docs/ROMAN_QUESTIONS.md` | Вопросы Роману, готовое сообщение |
| `docs/DEPLOYMENT.md` | GitHub → Vercel пошагово |

Телефон и Telegram подключены 17.11.2026. Прайс, часы и список домашних услуг ещё не получены. Индексация закрыта до запуска. Сайт выложен для просмотра на https://polotskvet.vercel.app: Vercel публикует ветку `main` репозитория https://github.com/AliaksandrTarashkevich/polotskvet.

Шрифт Manrope — SIL Open Font License 1.1, текст лицензии в `public/assets/fonts/OFL.txt`. Источники остальных ассетов — в `design-assets/ASSETS.json`.
