# PhonePizzaLab

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

## Структура проекта

- `client` — мобильное приложение (Expo)
- `server` — API и бизнес-логика (NestJS + Prisma)

## Быстрый старт

### 1) Клонирование и установка зависимостей

```bash
# корень
npm install

# клиент
cd client
yarn install

# сервер
cd ../server
npm install
```

### 2) Переменные окружения

#### server/.env

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DB_NAME
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=sk_test_xxx
```

#### client/.env

```env
EXPO_PUBLIC_SERVER_URL=http://localhost:3000
STRIPE_KEY=pk_test_xxx
```

### 3) Миграции Prisma

```bash
cd server
npx prisma migrate dev
npx prisma generate
```

### 4) Запуск

#### Сервер

```bash
cd server
npm run dev
```

#### Клиент

```bash
cd client
yarn start
```

После запуска Expo можно открыть проект на Android/iOS эмуляторе или на физическом устройстве через Expo Go.

## Идеи для дальнейшей реализации

- Docker для простого запуска окружения.
- CI/CD (линт + тесты + деплой).
- Ролевая модель (admin/user).
- История заказов и трекинг статусов в UI.
- Веб-версия (Expo Web) для демонстрации по ссылке.
