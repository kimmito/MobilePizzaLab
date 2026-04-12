# Web Client (Portfolio Demo)

## Что важно

Эта web-версия может работать в двух режимах:

- `EXPO_PUBLIC_DEMO_MODE=true` — работает без backend (мок-данные).
- `EXPO_PUBLIC_DEMO_MODE=false` — использует реальный backend по `EXPO_PUBLIC_SERVER_URL`.

## Переменные окружения

```env
EXPO_PUBLIC_DEMO_MODE=true
EXPO_PUBLIC_SERVER_URL=https://your-api-domain.com
```

> В demo-режиме `EXPO_PUBLIC_SERVER_URL` не обязателен для основных экранов.

## Запуск локально

```bash
npm install
npm run web
```

## Прод-сборка

```bash
npx expo export --platform web
```

Результат будет в папке `dist`.

## Деплой

### Vercel

- Build Command: `npx expo export --platform web`
- Output Directory: `dist`
- Environment Variables:
  - `EXPO_PUBLIC_DEMO_MODE=true`
  - `EXPO_PUBLIC_SERVER_URL=https://your-api-domain.com` (опционально)

### GitHub Pages

- Соберите проект командой `npx expo export --platform web`
- Опубликуйте содержимое `dist`
- Для портфолио-сценария оставьте `EXPO_PUBLIC_DEMO_MODE=true`
