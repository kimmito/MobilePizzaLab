# MobilePizzaLab

Учебный fullstack-проект в формате мобильного приложения (Expo + React Native) и API-сервера (NestJS + Prisma + PostgreSQL).

Проект имитирует реальный продукт доставки еды: авторизация, каталог, категории, корзина, избранное, оформление заказа и интеграция с оплатой через Stripe.

## Что реализовано

- Авторизация/регистрация пользователя.
- Получение и обновление профиля.
- Каталог товаров и категории.
- Избранные товары пользователя.
- Корзина с локальным хранением состояния.
- Оформление заказа.
- Серверная обработка заказа и создание платежного интента Stripe.

## Технологии

### Клиент

- Expo / React Native / TypeScript
- React Navigation
- Redux Toolkit + redux-persist
- TanStack React Query
- Axios
- NativeWind
- Stripe React Native SDK

### Сервер

- NestJS / TypeScript
- Prisma ORM
- PostgreSQL
- JWT + Passport
- class-validator / class-transformer
- Stripe SDK

## Структура

- `client` - мобильное приложение
- `web-client` - mobile-first веб-версия на Expo Web (для портфолио)
- `server` - backend API и Prisma
- `docker-compose.yaml` - запуск db + server в Docker

## Веб-версия

В проект добавлена отдельная web-версия в папке `web-client`.

Это адаптация существующего React Native-клиента под браузер с минимальными изменениями в кодовой базе для демонстрации.

### Основные нюансы

- Хранение токенов: используется `AsyncStorage` вместо `expo-secure-store`.
- Оплата: нативный Stripe Payment Sheet отключен в web-режиме.
- Demo-режим для статического хостинга: приложение может работать без поднятого backend API (на fallbackах)

### Когда использовать какую версию

- `client` - если нужен полноценный нативный опыт и нативная оплата.
- `web-client` - если нужна демо-ссылка в портфолио и быстрый запуск в браузере.

## Предварительные требования

- Node.js 20+
- Docker Desktop
- Для клиента: Expo Go или эмулятор

## Переменные окружения

Используются три env-файла.

### 1) Корневой `.env` (для Docker Compose)

```env
DB_NAME=database-name
DB_USER=database-user
DB_PASSWORD=database-password
```

### 2) `server/.env` (для Nest приложения внутри контейнера)

```env
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=sk_test_xxx

<!-- Опционально -->
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DB_NAME
```

### 3) `client/.env` (для Expo клиента)

```env
EXPO_PUBLIC_SERVER_URL=http://192.168.1.103:3000
STRIPE_KEY=pk_test_xxx
```

Для физического устройства в `EXPO_PUBLIC_SERVER_URL` указывается IP компьютера в локальной сети.

## Установка зависимостей

```bash
cd client
yarn install

cd ../server
npm install
```

## Запуск через Docker (рекомендуется)

### 1) Поднять Postgres + Server

```bash
docker compose --env-file .env up -d --build
```

### 2) Применить Prisma миграции

```bash
docker compose exec server npx prisma migrate deploy
docker compose exec server npx prisma generate
```

### 3) Проверить сервисы

```bash
docker compose ps
docker compose logs -f server
```

### 4) Запустить клиент

```bash
cd client
yarn start
```

## Запуск без Docker (альтернатива)

```bash
cd server
npm run start:dev

cd ../client
yarn start
```

При этом `server/.env` должен содержать рабочий `DATABASE_URL` на локальный PostgreSQL.
