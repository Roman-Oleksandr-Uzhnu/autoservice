# AutoService

Сучасний full-stack вебзастосунок для керування автосервісом, створений на Next.js. Проєкт дозволяє переглядати послуги, оформлювати замовлення, керувати клієнтами та адміністративною панеллю.

> **Демо:** буде додано після деплою на Vercel.

---

# Скріншоти

*Головна сторінка*

*Панель адміністратора*

*Форма створення послуги*

*Сторінка замовлень*

---

## Можливості

- 🔐 Реєстрація та авторизація користувачів (NextAuth)
- 👥 Ролі користувачів (Admin/User)
- 🚗 CRUD для послуг автосервісу
- 📦 CRUD для замовлень
- 👤 Керування користувачами
- ✅ React Hook Form + Zod
- 🔔 Sonner Toast повідомлення
- 🛡️ Захист API та серверна валідація
- 🖼️ Оптимізовані зображення через Next.js Image
- 🌍 SEO Metadata
- 🤖 robots.txt та sitemap.xml
- 🚀 Production Ready

---

## Технології

- Next.js 15 (App Router)
- React
- TypeScript
- Tailwind CSS
- MongoDB Atlas
- Mongoose
- NextAuth.js
- React Hook Form
- Zod
- Sonner

---

## Локальний запуск

```bash
git clone https://github.com/Roman-Oleksandr-Uzhnu/autoservice.git

cd autoservice

npm install

cp .env.local.example .env.local

npm run dev
```

---

## Environment Variables

| Змінна | Опис |
|---------|------|
| MONGODB_URI | MongoDB Atlas URI |
| NEXTAUTH_SECRET | Secret для NextAuth |
| NEXTAUTH_URL | URL застосунку |
| NEXT_PUBLIC_SITE_URL | Публічний URL |

---

## Деплой

Проєкт готовий до деплою на **Vercel**.

Після імпорту репозиторію необхідно додати всі змінні середовища та виконати Deploy.

---

## Автор

Студент спеціальності **Кібербезпека та захист інформації**
Роман Олександр

Ужгородський національний університет