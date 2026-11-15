# Бриф для ChatGPT: фото «руки ветеринара с животным дома»

15.11.2026. Alex решил добавить на страницу «1+» 2–3 сгенерированных фото: на ней сейчас только три фото Романа и иконки, животных нет. Фото генерирует Alex в ChatGPT по тексту ниже: три сцены, по два варианта каждой.

## Правила для этих фото

- Это иллюстрации. На них не Роман и не его пациенты, поэтому в подписях и alt-тексте имени Романа нет.
- В кадре только руки и предплечья. Лица и люди целиком не нужны: сгенерированный человек рядом с настоящими фото Романа выглядел бы странно и вводил бы в заблуждение.
- Перед публикацией тон подгоняется под серию фото Романа рецептом из `design-assets/grade-photos.sh`, как со щенком. Источник и пометка «сгенерировано» записываются в `design-assets/ASSETS.json`.
- Настоящие фото с выездов Романа лучше. Когда они появятся, сгенерированные заменяются ими.

## Куда пойдут

| Сцена | Формат | Место на «1+» |
| --- | --- | --- |
| 1. Кошка дома | горизонталь 1536×1024 | рядом с «Дома питомцу спокойнее» |
| 2. Собака дома | вертикаль 1024×1536 | «Как проходит визит» |
| 3. Крупный план | квадрат 1024×1024 | блок услуг или перед контактами |

Варианты одной сцены ставятся в переключалку, выбирает Alex.

Получено 15.11.2026: 1b (рыжий кот на диване) и вариант 1a, где кошка лежит на столе, а не на диване. Оба стоят на «1+»: 1b рядом с «Дома питомцу спокойнее», 1a широкой полосой над услугами. Исходники лежат в `design-assets/generated/`, обработка — в `design-assets/grade-photos.sh`.

## Текст для ChatGPT

Скопировать целиком, отправить одним сообщением. Каждую картинку скачать в исходном размере и прислать файлы.

```text
I need realistic photos for the website of a veterinarian who visits pets at home in a small Eastern European city. Please generate them one at a time: three scenes, two variants each, six images in total. Every image follows the style rules.

STYLE RULES (all images)
- Photorealistic documentary photo, like an unretouched shot from a real home visit: natural window daylight, soft shadows, slight natural film grain, true-to-life imperfect details. Not glossy stock, not 3D, not an illustration.
- Slightly warm, neutral white balance (whites look creamy, never blue), muted natural colours, moderate contrast, no HDR, no oversaturation.
- 35–50 mm lens, f/2.8, shallow depth of field, the animal in sharp focus.
- People: only the veterinarian's hands and forearms. Blue nitrile gloves, sleeves of black medical scrubs. No faces, no other people. Anatomically correct hands with five fingers each.
- Setting: an ordinary tidy apartment, neither luxurious nor a clinic: light walls, wooden or laminate floor, a sofa with a knitted throw, a houseplant, a window with sheer curtains.
- Animals: ordinary healthy domestic cats and dogs, calm, relaxed and trusting; natural fur, correct paws, eyes and whiskers.
- Avoid: text, logos, watermarks, brand names, syringes or needles, blood, cones, cages, clinic interiors, frightened or restrained animals.
- Leave some space around the subject so the image can be cropped.

SCENE 1 — landscape, 1536×1024
1a. A relaxed tabby cat lies on a knitted throw on the sofa; the vet's gloved hands hold a blue stethoscope gently to its chest. The cat's eyes are half closed.
1b. A ginger cat sits on the sofa by the window; one gloved hand supports it under the chest, the other gently checks its ear.

SCENE 2 — portrait, 1024×1536
2a. A calm medium-sized mixed-breed dog sits on a rug in the hallway and gives its paw; the vet's gloved hands hold the paw gently. The dog looks up trustingly.
2b. A beagle lies on its side on a living-room rug; the vet's gloved hands rest on its belly as if gently examining it. The dog is relaxed.

SCENE 3 — square, 1024×1024
3a. A senior grey cat with a white muzzle rests on a cushion on the windowsill; a gloved hand gently strokes its head. Calm, tender mood.
3b. A small puppy wrapped in a soft beige towel, held in the vet's gloved hands close to the camera.

Start with 1a. After each image, wait until I write "next".
```
