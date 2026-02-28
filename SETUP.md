# Simple Backend API for Projects & Reviews

Backend بسيط لإدارة المشاريع والتقييمات مع نظام authentication للـ admin.

## المتطلبات

- Node.js (v16+)
- PostgreSQL (v12+)
- npm أو yarn

## التثبيت والإعداد

### 1. عمل نسخة من .env

\`\`\`bash
cp .env.example .env
\`\`\`

### 2. تعديل متغيرات البيئة

قم بتعديل ملف `.env` بـ بيانات قاعدة البيانات الخاصة بك:

\`\`\`env
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=freelancer_db
JWT_SECRET=your-secure-secret-key
\`\`\`

### 3. إنشاء قاعدة البيانات (اختياري، سيتم الإنشاء تلقائياً)

\`\`\`bash
psql -U postgres -c "CREATE DATABASE freelancer_db;"
\`\`\`

### 4. تثبيت المكتبات والتشغيل

\`\`\`bash
npm install
npm run start:dev
\`\`\`

سيعمل البرنامج على \`http://localhost:3000\` بشكل افتراضي.

---

## API Endpoints

### Authentication (بدون حماية)

#### تسجيل مستخدم جديد
\`\`\`
POST /auth/register
Content-Type: application/json

{
  "username": "admin",
  "email": "admin@example.com",
  "password": "password123"
}
\`\`\`

**Response:**
\`\`\`json
{
  "message": "User registered successfully",
  "accessToken": "eyJhbGc...",
  "user": {
    "id": "uuid",
    "username": "admin",
    "email": "admin@example.com"
  }
}
\`\`\`

#### تسجيل الدخول
\`\`\`
POST /auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "password123"
}
\`\`\`

**Response:**
\`\`\`json
{
  "accessToken": "eyJhbGc...",
  "user": {
    "id": "uuid",
    "username": "admin",
    "email": "admin@example.com"
  }
}
\`\`\`

---

### Projects (مع حماية JWT)

جميع الـ endpoints تحتاج إلى \`Authorization: Bearer <token>\` في الـ headers.

#### إنشاء مشروع جديد
\`\`\`
POST /projects
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "اسم المشروع",
  "description": "وصف المشروع",
  "imageUrl": "https://example.com/image.jpg",
  "price": 5000
}
\`\`\`

#### الحصول على جميع المشاريع
\`\`\`
GET /projects
Authorization: Bearer <token>
\`\`\`

#### الحصول على مشروع محدد
\`\`\`
GET /projects/:id
Authorization: Bearer <token>
\`\`\`

#### تحديث مشروع
\`\`\`
PATCH /projects/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "الاسم الجديد",
  "description": "الوصف الجديد",
  "price": 6000
}
\`\`\`

#### حذف مشروع
\`\`\`
DELETE /projects/:id
Authorization: Bearer <token>
\`\`\`

---

### Reviews (مع حماية JWT)

#### إضافة تقييم لمشروع
\`\`\`
POST /reviews
Authorization: Bearer <token>
Content-Type: application/json

{
  "projectId": "project-uuid",
  "rating": 5,
  "comment": "مشروع رائع جداً!",
  "clientName": "اسم العميل",
  "clientEmail": "client@example.com"
}
\`\`\`

#### الحصول على جميع التقييمات لمشروع محدد
\`\`\`
GET /reviews/project/:projectId
Authorization: Bearer <token>
\`\`\`

#### الحصول على تقييم محدد
\`\`\`
GET /reviews/:id
Authorization: Bearer <token>
\`\`\`

#### تحديث تقييم
\`\`\`
PATCH /reviews/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "rating": 4,
  "comment": "تقييم محدث"
}
\`\`\`

#### حذف تقييم
\`\`\`
DELETE /reviews/:id
Authorization: Bearer <token>
\`\`\`

---

## البنية

\`\`\`
src/
├── auth/           # نظام المصادقة و JWT
├── projects/       # إدارة المشاريع
├── reviews/        # إدارة التقييمات
├── entities/       # نماذج قاعدة البيانات
├── app.module.ts  # الـ module الرئيسي
└── main.ts        # نقطة الدخول
\`\`\`

## البيانات الأساسية (Entities)

### User
- `id`: UUID
- `username`: string (فريد)
- `email`: string (فريد)
- `password`: string (مشفرة)
- `createdAt`: timestamp

### Project
- `id`: UUID
- `name`: string
- `description`: text
- `imageUrl`: string (اختياري)
- `price`: decimal (اختياري)
- `userId`: UUID (مفتاح أجنبي)
- `createdAt`: timestamp

### Review
- `id`: UUID
- `rating`: int (1-5)
- `comment`: text (اختياري)
- `clientName`: string
- `clientEmail`: string
- `projectId`: UUID (مفتاح أجنبي)
- `createdAt`: timestamp

## الميزات الأمنية

✅ كلمات المرور مشفرة بـ bcrypt
✅ JWT مع صلاحية انتهاء الصلاحية (24 ساعة)
✅ التحقق من الصحة على جميع الـ inputs
✅ صلاحيات المستخدم - يمكن فقط الوصول إلى مشاريعهم وتقييماتهم

## التطوير المستقبلي

- [ ] إضافة Refresh Tokens
- [ ] نظام صور متقدم (Upload إلى AWS S3 مثلاً)
- [ ] إحصائيات والتقارير
- [ ] إرسال Emails عند التقييمات الجديدة
- [ ] Pagination و Sorting
- [ ] Rate limiting و Throttle
