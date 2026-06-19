# Свадебное приглашение — Егор и Анастасия

Сайт-приглашение на свадьбу 11.10.2026.

## Локально

```bash
npm start
```

Откроется на http://localhost:3000

## Деплой на Railway

1. Запушьте этот репозиторий на GitHub.
2. На [railway.app](https://railway.app) → **New Project** → **Deploy from GitHub repo** → выберите `svadba`.
3. Railway сам определит Node (Nixpacks), выполнит `npm start` и поднимет сайт.
4. В разделе **Settings → Networking** нажмите **Generate Domain**, чтобы получить публичный адрес.

Переменная `PORT` подставляется Railway автоматически.

## Структура

- `index.html` — сам сайт (открывается и напрямую в браузере)
- `support.js`, `image-slot.js` — рантайм
- `assets/` — иллюстрации
- `server.js` — минимальный статический сервер (без зависимостей)
