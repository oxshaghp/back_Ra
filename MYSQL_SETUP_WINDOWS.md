# MySQL Setup للـ Windows

## الخطوة 1: تحميل MySQL

اذهب إلى: https://dev.mysql.com/downloads/mysql/

اختر **MySQL Community Server** واختر **Windows (x86, 64-bit)**

## الخطوة 2: تثبيت MySQL

1. شغّل الـ installer
2. اختر **Server only** (خيار بسيط)
3. في مرحلة الإعدادات، اختر:
   - Port: 3306
   - Config Type: Development Machine
4. في مرحلة المصادقة:
   - Username: `root`
   - Password: `root` (كما في .env)
5. التالي والتالي حتى النهاية

## الخطوة 3: التحقق من التثبيت

افتح PowerShell وشغّل:

```bash
mysql --version
```

## الخطوة 4: إنشاء قاعدة البيانات

```bash
mysql -u root -proot -e "CREATE DATABASE freelancer_db CHARACTER SET utf8mb4;"
```

ستظهر رسالة تأكيد إذا نجح الأمر.

## الخطوة 5: اختبر الاتصال

```bash
mysql -u root -proot -e "SHOW DATABASES;"
```

يجب أن ترى `freelancer_db` في القائمة.

## الآن شغّل التطبيق

```bash
npm run start:dev
```

جرّب الـ API:
```bash
bash test-api.sh
```

---

## في حالة المشاكل

### "Access denied for user 'root'@'localhost'"
تأكد من كلمة المرور في .env

### "Can't connect to MySQL server"
تأكد من أن MySQL يعمل:
```bash
mysql.server status
```

أو شغّله:
```bash
mysql.server start
```

### غير متأكد من كلمة الـ password؟
عيّنها من جديد:
```bash
mysql -u root
```

ثم الأمر:
```mysql
ALTER USER 'root'@'localhost' IDENTIFIED BY 'root';
FLUSH PRIVILEGES;
EXIT;
```

---

**تم! الآن لديك MySQL جاهز للاستخدام! 🚀**
