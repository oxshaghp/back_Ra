# 📁 Project Structure - شرح البنية

```
back_ra/
├── 📂 src/                          # المصدر الرئيسي
│   ├── 📂 auth/                     # نظام المصادقة
│   │   ├── auth.controller.ts       # المسارات (Routes)
│   │   ├── auth.service.ts          # الوظائف الأساسية
│   │   ├── auth.module.ts           # وحدة الـ Auth
│   │   ├── auth.dto.ts              # أشكال البيانات (Data Transfer Objects)
│   │   ├── jwt.strategy.ts          # استراتيجية JWT
│   │   └── jwt-auth.guard.ts        # حماية المسارات
│   │
│   ├── 📂 projects/                 # إدارة المشاريع
│   │   ├── projects.controller.ts   # المسارات
│   │   ├── projects.service.ts      # الوظائف
│   │   ├── projects.module.ts       # الوحدة
│   │   └── projects.dto.ts          # أشكال البيانات
│   │
│   ├── 📂 reviews/                  # إدارة التقييمات
│   │   ├── reviews.controller.ts    # المسارات
│   │   ├── reviews.service.ts       # الوظائف
│   │   ├── reviews.module.ts        # الوحدة
│   │   └── reviews.dto.ts           # أشكال البيانات
│   │
│   ├── 📂 entities/                 # نماذج قاعدة البيانات (ORM)
│   │   ├── user.entity.ts           # نموذج المستخدم
│   │   ├── project.entity.ts        # نموذج المشروع
│   │   ├── review.entity.ts         # نموذج التقييم
│   │   └── index.ts                 # تصدير جميع الـ entities
│   │
│   ├── 📂 test/                     # الاختبارات
│   │   ├── app.e2e-spec.ts         # اختبارات النهاية للنهاية
│   │   └── jest-e2e.json            # إعدادات Jest
│   │
│   ├── app.module.ts                # 🔵 الوحدة الرئيسية (تربط كل شيء)
│   ├── app.controller.ts            # تحكم تطبيق
│   ├── app.service.ts               # خدمة التطبيق
│   └── main.ts                      # 🟢 نقطة الدخول (Entry Point)
│
├── 📄 .env                          # متغيرات البيئة (لا تُرفع!)
├── 📄 .env.example                  # مثال على متغيرات البيئة
├── 📄 .gitignore                    # ملفات يتم تجاهلها
├── 📄 .eslintrc.json                # إعدادات ESLint (فحص الأخطاء)
├── 📄 docker-compose.yml            # إعدادات Docker (PostgreSQL)
├── 📄 package.json                  # المكتبات والـ scripts
├── 📄 tsconfig.json                 # إعدادات TypeScript
├── 📄 tsconfig.build.json           # إعدادات البناء
├── 📄 nest-cli.json                 # إعدادات NestJS CLI
├── 📄 eslint.config.mjs             # إعدادات ESLint
│
└── 📚 التوثيق:
    ├── 📄 README.md                 # الملف الرئيسي (اقرأ أولاً!)
    ├── 📄 SETUP.md                  # شرح مفصل لـ setup والـ API
    ├── 📄 API_DOCUMENTATION.md      # توثيق كامل للـ API
    ├── 📄 PROJECT_SUMMARY.md        # ملخص شامل للمشروع
    ├── 📄 DOCKER_SETUP.md           # شرح Docker
    ├── 📄 this file                 # شرح البنية الحالي
    ├── 📄 QUICKSTART.sh             # بدء سريع
    ├── 📄 test-api.sh               # اختبار تلقائي
    └── 📄 init-db.sql               # إنشاء قاعدة البيانات
```

---

## 🔵 لماذا هذه البنية؟

### **src/auth/**
- **يحتوي على**: كل شيء متعلق بالمصادقة والأمان
- **يتضمن**: تسجيل المستخدم، تسجيل الدخول، JWT، الـ Guards

### **src/projects/**
- **يحتوي على**: كل شيء متعلق بإدارة المشاريع
- **يتضمن**: إنشاء، تحديث، حذف المشاريع

### **src/reviews/**
- **يحتوي على**: كل شيء متعلق بالتقييمات
- **يتضمن**: إضافة، تعديل، حذف التقييمات

### **src/entities/**
- **يحتوي على**: نماذج قاعدة البيانات
- **يتضمن**: تعريف الجداول والعلاقات

### **src/main.ts** 🟢
- نقطة الدخول الرئيسية للتطبيق
- يقوم بـ:
  1. إنشاء تطبيق NestJS
  2. تفعيل CORS
  3. تفعيل Validation
  4. الاستماع على port

### **src/app.module.ts** 🔵
- الوحدة الرئيسية التي تربط كل شيء
- يقوم بـ:
  1. إعدادات قاعدة البيانات
  2. استيراد جميع الوحدات (Auth, Projects, Reviews)
  3. تأهيل الـ entities

---

## 📊 تدفق الطلب (Request Flow)

```
Frontend Request
        ↓
     main.ts (ValidationPipe + CORS)
        ↓
   app.module.ts (TypeORM Connection)
        ↓
   auth.module | projects.module | reviews.module
        ↓
   Controller (parseURL + extract data)
        ↓
   Service (business logic)
        ↓
   Entity (database query)
        ↓
   Response → Frontend
```

---

## 🎯 ملف من الأهمية بمكان

| الملف | الأهمية | وقت الفتح |
|------|--------|---------|
| **main.ts** | 🔴 حساس جداً | تشغيل لأول مرة |
| **app.module.ts** | 🔴 حساس جداً | إضافة وحدة جديدة |
| **entities/** | 🟡 مهم | تغيير قاعدة البيانات |
| **services/** | 🟠 متوسط | إضافة منطق جديد |
| **controllers/** | 🟠 متوسط | إضافة مسار جديد |
| **dtos/** | 🟢 أقل | التحقق من الـ validation |

---

## 🚀 كيفية إضافة ميزة جديدة؟

مثال: إضافة "Categories" للمشاريع

### 1️⃣ أنشئ Entity
```
src/entities/category.entity.ts
```

### 2️⃣ أنشئ Module كامل
```
src/categories/
├── categories.controller.ts
├── categories.service.ts
├── categories.module.ts
└── categories.dto.ts
```

### 3️⃣ استيرد الـ Module في app.module.ts
```typescript
imports: [
  ...existing imports,
  CategoriesModule,  // أضفه هنا
]
```

### 4️⃣ اختبر الـ API

---

## 💡 نصائح

✅ **منظم**: كل feature في مجلد منفصل
✅ **معياري**: يتبع NestJS best practices
✅ **قابل للتوسع**: إضافة features جديدة سهلة
✅ **آمن**: Validation و Authentication في كل مكان

---

**لمزيد من المعلومات: اقرأ README.md أو SETUP.md**
