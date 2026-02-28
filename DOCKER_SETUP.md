# Docker Setup Guide

## Option 1: Using Docker Compose (Recommended)

## Prerequisites
- [Docker](https://www.docker.com/products/docker-desktop)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Step 1: Start PostgreSQL with Docker Compose

```bash
# في مجلد المشروع الجذر
docker-compose up -d
```

هذا سيشغل:
- **PostgreSQL** على `localhost:5432`
- **PgAdmin** على `http://localhost:5050` (اختياري للـ GUI)

### Step 2: Start the Application

```bash
npm run start:dev
```

### Step 3: Access PgAdmin (اختياري)

اذهب إلى `http://localhost:5050`
- البريد: `admin@example.com`
- كلمة المرور: `admin`

أضف اتصال جديد:
- Hostname: `postgres`
- Username: `postgres`
- Password: `postgres`
- Database: `freelancer_db`

---

## Useful Docker Commands

```bash
# عرض جميع الـ containers
docker ps

# عرض السجلات
docker-compose logs postgres

# إيقاف الـ containers
docker-compose down

# إيقاف وحذف البيانات (حذر!)
docker-compose down -v

# إعادة تشغيل
docker-compose restart

# تشغيل في الـ background مع اسم معين
docker-compose up -d --name my_freelancer_db
```

---

## Option 2: Local PostgreSQL Installation

### على Windows:

1. تحميل من [postgresql.org](https://www.postgresql.org)
2. تشغيل الـ installer وتذكر كلمة المرور
3. فتح Command Prompt:

```bash
psql -U postgres
CREATE DATABASE freelancer_db;
\q
```

### على Mac:

```bash
brew install postgresql
brew services start postgresql
createdb freelancer_db
```

### على Linux:

```bash
sudo apt-get install postgresql
sudo systemctl start postgresql
createdb freelancer_db
```

---

## الخطأ: Port 5432 Already in Use

```bash
# قتل العملية
lsof -ti:5432 | xargs kill -9

# أو غير الـ port في .env
DB_PORT=5433
```

---

## Clean Up

```bash
# حذف الـ containers والـ volumes
docker-compose down -v

# إعادة البناء من الصفر
docker-compose up -d --build
```

---

## متى تستخدم Docker؟

✅ استخدم Docker إذا:
- أردت بيئة معزولة
- تعمل مع فريق
- تريد consistency بين الأجهزة

❌ لا تستخدم Docker إذا:
- في بيئة Windows و لديك مشاكل مع Hyper-V
- تفضل التثبيت المحلي البسيط
