# 🚀 Backend - إدارة المشاريع والتقييمات

Backend بسيط وفعال لإدارة مشاريعك والتقييمات من العملاء مع نظام authentication آمن.

## 🎯 الميزات

✨ **نظام المصادقة:**
- تسجيل مستخدم جديد (Admin)
- تسجيل الدخول مع JWT
- كلمات مرور مشفرة

📊 **إدارة المشاريع:**
- إضافة مشاريع جديدة
- تعديل بيانات المشروع
- حذف المشاريع
- عرض جميع المشاريع

⭐ **إدارة التقييمات:**
- إضافة تقييمات من العملاء (1-5 نجوم)
- التعليقات على المشاريع
- تعديل وحذف التقييمات
- عرض جميع تقييمات المشروع

🔒 **الأمان:**
- JWT Authentication مع صلاحية انتهاء الصلاحية
- التحقق من الصحة على جميع البيانات
- صلاحيات المستخدم (يمكن فقط تعديل مشاريعك)

## 📋 المتطلبات

- Node.js v16+
- PostgreSQL v12+
- npm أو yarn

## ⚡ البدء السريع

### 1. نسخ متغيرات البيئة

```bash
cp .env.example .env
```

### 2. تثبيت المكتبات

```bash
npm install
```

### 3. إنشاء قاعدة البيانات (PostgreSQL)

```bash
# على PowerShell أو Command Prompt
psql -U postgres -c "CREATE DATABASE freelancer_db;"
```

### 4. تشغيل التطبيق

```bash
# في وضع التطوير
npm run start:dev

# في الإنتاج
npm run start:prod
```

سيعمل التطبيق على `http://localhost:3000` ✅

---

## 📚 أمثلة الـ API

### 1️⃣ التسجيل

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@example.com",
    "password": "password123"
  }'
```

### 2️⃣ تسجيل الدخول

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "password123"
  }'
```

احفظ الـ `accessToken` النتيجة.

### 3️⃣ إنشاء مشروع جديد

```bash
curl -X POST http://localhost:3000/projects \
  -H "Authorization: Bearer <your_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "تطبيق الويب",
    "description": "تطبيق ويب للمتجر الإلكتروني",
    "imageUrl": "https://example.com/img.jpg",
    "price": 5000
  }'
```

### 4️⃣ إضافة تقييم

```bash
curl -X POST http://localhost:3000/reviews \
  -H "Authorization: Bearer <your_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "projectId": "<project_id>",
    "rating": 5,
    "comment": "مشروع ممتاز!",
    "clientName": "أحمد",
    "clientEmail": "ahmed@example.com"
  }'
```

---

## 🗂️ بنية المشروع

```
src/
├── auth/              # Authentication & JWT
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── auth.module.ts
│   ├── auth.dto.ts
│   ├── jwt.strategy.ts
│   └── jwt-auth.guard.ts
├── projects/          # تدير المشاريع
│   ├── projects.controller.ts
│   ├── projects.service.ts
│   ├── projects.module.ts
│   └── projects.dto.ts
├── reviews/           # إدارة التقييمات
│   ├── reviews.controller.ts
│   ├── reviews.service.ts
│   ├── reviews.module.ts
│   └── reviews.dto.ts
├── entities/          # Database models
│   ├── user.entity.ts
│   ├── project.entity.ts
│   └── review.entity.ts
├── app.module.ts      # Module رئيسي
└── main.ts           # نقطة الدخول
```

---

## 🔐 الأمان والمميزات

- ✅ **Bcrypt**: تشفير كلمات المرور
- ✅ **JWT**: توكنات آمنة مع صلاحية انتهاء (24 ساعة)
- ✅ **Validation**: التحقق من صحة جميع البيانات المدخلة
- ✅ **Authorization**: التحقق من أن المستخدم يملك المشروع
- ✅ **CORS**: متاح للـ frontend

---

## 📖 للمزيد من المعلومات

اطلع على ملف `SETUP.md` الذي يحتوي على توثيق شامل لجميع الـ endpoints والأمثلة الإضافية.

---

## 🛠️ الأوامر المتاحة

```bash
# بناء المشروع
npm run build

# التطوير مع Watch
npm run start:dev

# التطوير مع Debugging
npm run start:debug

# الإنتاج
npm run start:prod

# التحقق من الأخطاء
npm run lint

# تنسيق الكود
npm run format

# الاختبارات
npm run test
npm run test:watch
npm run test:cov
npm run test:e2e
```

---

## 📝 الملاحظات

> **⚠️ مهم:** قبل الإنتاج:
> 1. غير `JWT_SECRET` إلى قيمة قوية وآمنة
> 2. استخدم قاعدة بيانات production
> 3. فعل HTTPS بدلاً من HTTP
> 4. أضف Rate Limiting
> 5. أضف Logging والـ Monitoring

---

## 🤝 الدعم

أثناء التطوير أو إذا واجهت أي مشاكل:

1. تأكد من أن PostgreSQL مشتغل
2. تأكد من بيانات الاتصال في `.env`
3. تحقق من الـ terminal لرسائل الخطأ

---

**Built with ❤️ using NestJS**

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
