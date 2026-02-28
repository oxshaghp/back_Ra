# Docker Setup Guide

## Option 1: Using Docker Compose (Recommended) - MySQL

## Prerequisites
- [Docker](https://www.docker.com/products/docker-desktop)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Step 1: Start MySQL with Docker Compose

```bash
# في مجلد المشروع الجذر
docker-compose up -d
```

هذا سيشغل:
- **MySQL 8.0** على `localhost:3306`
- **phpMyAdmin** على `http://localhost:8080` (اختياري للـ GUI)

### Step 2: Start the Application

```bash
npm run start:dev
```

### Step 3: Access phpMyAdmin (اختياري - واجهة رسومية)

اذهب إلى `http://localhost:8080`
- الاسم: `root`
- كلمة المرور: `root`
- السيرفر: `mysql`

أو استخدم أي MySQL client:
```bash
mysql -h localhost -u root -proot freelancer_db
```

---

## Useful Docker Commands

```bash
# عرض جميع الـ containers
docker ps

# عرض السجلات
docker-compose logs mysql

# الدخول للـ MySQL مباشرة
docker exec -it freelancer_db mysql -u root -proot freelancer_db

# إيقاف الـ containers
docker-compose down

# إيقاف وحذف البيانات (حذر!)
docker-compose down -v

# إعادة تشغيل
docker-compose restart

# تشغيل في الـ background
docker-compose up -d
```

---

## Option 2: Local MySQL Installation

### على Windows:

1. تحميل من [mysql.com](https://www.mysql.com/downloads/)
2. تشغيل الـ installer
3. استخدم Username: `root` وكلمة المرور: `root` (كما في .env)
4. فتح Command Prompt:

```bash
mysql -u root -proot
CREATE DATABASE freelancer_db CHARACTER SET utf8mb4;
EXIT;
```

### على Mac:

```bash
brew install mysql
brew services start mysql
mysql -u root
CREATE DATABASE freelancer_db CHARACTER SET utf8mb4;
EXIT;
```

### على Linux:

```bash
sudo apt-get install mysql-server
sudo systemctl start mysql
mysql -u root -p
CREATE DATABASE freelancer_db CHARACTER SET utf8mb4;
EXIT;
```

---

## الخطأ: Port 3306 Already in Use

```bash
# قتل العملية
lsof -ti:3306 | xargs kill -9

# أو غير الـ port في .env
DB_PORT=3307
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
- أردت بيئة معزولة (أفضل)
- تعمل مع فريق
- تريد consistency بين الأجهزة

❌ لا تستخدم Docker إذا:
- في بيئة Windows و لديك مشاكل مع Hyper-V
- تفضل التثبيت المحلي البسيط
- في بيئة Windows و لديك مشاكل مع Hyper-V
- تفضل التثبيت المحلي البسيط
