# PolotskVet

Красная версия сайта ветеринарного врача **Романа Чертопалова**: Полоцк, Новополоцк, выезды на дом и онлайн-консультации.

## Открыть

Откройте `public/index.html` в браузере. Оставьте папку `public` с её вложенными файлами целиком. Проект не требует Node.js, npm и сборки.

## Опубликовать

Полный пошаговый гайд: **[START-HERE.html](START-HERE.html)** или [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

На GitHub загружается содержимое этой папки. На Vercel: Framework `Other`, Root Directory — корень репозитория, Output Directory `public`. Остальные настройки в `vercel.json`.

## Файлы

| Путь | Назначение |
| --- | --- |
| `public/index.html` | Содержимое страницы |
| `public/styles.css` | Оформление и адаптация |
| `public/app.js` | Меню, окно записи, анимации |
| `public/assets` | Логотип, фото, PNG-иллюстрации и локальные шрифты |
| `public/concepts` | Пять черновых вариантов нового дизайна и сборка «1+» (вариант 1 с кусками из 3, 4 и 5, выбран 15.11.2026; синяя палитра с 17.11.2026) с выбором стиля и иконки. Онлайн: https://polotskvet.vercel.app/concepts/1plus. Локально: `python3 -m http.server 4173 --directory public`, затем `http://localhost:4173/concepts/1plus.html` |
| `design-assets/grade-photos.sh` | Рецепт выравнивания оттенков фотографий (ffmpeg); оригиналы не меняет |
| `design-assets/stock` | Исходник стокового фото для кружков в вариантах 3 и 5 (Pexels; автор и лицензия в `ASSETS.json`) |
| `design-assets/generated` | Исходники сгенерированных фото для «1+» (ChatGPT, руки ветеринара с кошками); бриф — `docs/chatgpt-photo-brief.md` |
| `design-assets` | Исходные PNG логотипа, два варианта знака для «1+» (`icons/`, сборка — `build-logo-options.sh`) и сведения об ассетах |
| `inputs` | Подтверждённые факты и статус услуг для дальнейшей работы; не автоматический источник страницы |
| `docs/PROJECT_CONTEXT.md` | Актуальный контекст, ТЗ и следующие работы |
| `docs/DEPLOYMENT.md` | GitHub → Vercel пошагово |

Контакты и прайс ещё не получены. Запись показывает сообщение об отсутствующем номере. Индексация закрыта до утверждения рабочего содержания. Сайт выложен для просмотра на https://polotskvet.vercel.app: Vercel публикует ветку `main` репозитория https://github.com/AliaksandrTarashkevich/polotskvet.

Шрифт Manrope — SIL Open Font License 1.1, текст лицензии в `public/assets/fonts/OFL.txt`. Источники остальных ассетов — в `design-assets/ASSETS.json`.
