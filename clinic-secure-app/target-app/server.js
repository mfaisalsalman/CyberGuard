const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// 📂 الاتصال بملف قاعدة البيانات الخارجي المستقل
const dbPath = path.join(__dirname, 'clinic.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("❌ Error opening external database:", err.message);
    } else {
        console.log("📂 Successfully connected to external persistent database (clinic.db)");
    }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// =========================================================================
// 🚨 1. ثغرة الـ SQL Injection في الـ Login (تخطي الصلاحيات)
// =========================================================================
// =========================================================================
// 🚨 تحديث الـ Login: تعيين Cookie حقيقي في المتصفح عند الدخول
// =========================================================================
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const sqlQuery = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

    db.get(sqlQuery, (err, row) => {
        if (err) return res.status(500).json({ success: false, error: err.message });
        
        if (row) {
            // 🌟 التعديل السحري: إرسال الـ Cookie للمتصفح
            // ملحوظة: لم نضع HttpOnly لكي يتمكن كود الـ XSS من قراءته وسرقته عياناً أمام اللجنة
            res.cookie('session_id', 'SECRET_DR_TOKEN_XYZ123_2026', { maxAge: 900000 });
            
            res.json({ success: true, role: row.role, user: row.username });
        } else {
            res.json({ success: false, message: "Invalid credentials" });
        }
    });
});

// =========================================================================
// 🚨 تحديث الـ Reflected XSS: تعكس الـ Payload لتشغيلها في متصفح الضحية
// =========================================================================
app.get('/patient/search', (req, res) => {
    const query = req.query.q || '';
    
    // رجعنا الـ HTML مع الـ Query مباشرة عشان المتصفح ينفذ الـ JavaScript المحقون
    res.send(`
        <html>
        <head>
            <title>Search Results</title>
            <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
        </head>
        <body class="bg-slate-950 text-white font-sans p-10">
            <div class="max-w-xl mx-auto bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-xl">
                <h2 class="text-emerald-400 text-xl font-bold mb-4">Clinic Directory Search</h2>
                <p class="text-sm text-slate-300">Showing results for: <span class="font-mono text-amber-400">${query}</span></p>
                <p class="text-xs text-slate-500 mt-2">[0 departments found]</p>
                <br><a href="/patient.html" class="text-emerald-400 text-xs font-bold">← Back to Portal</a>
            </div>
        </body>
        </html>
    `);
});

// =========================================================================
// 🚨 3. ثغرة الـ SQL Injection في البحث عن المرضى (داخل لوحة التحكم)
// =========================================================================
app.get('/api/doctor/vitals', (req, res) => {
    const idOrName = req.query.id;
    
    // ❌ كود مصاب يدمج المتغير مباشرة ويقرا من السجلات الـ 15 الخارجية
    const sqlQuery = `SELECT * FROM patients WHERE id = '${idOrName}' OR name = '${idOrName}'`;

    db.all(sqlQuery, (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// =========================================================================
// 🚨 Stored/Reflected XSS — POST /patient/book reflects patient_name in response
// =========================================================================
app.post('/patient/book', (req, res) => {
    const patientName = req.body.patient_name || '';
    const appDate = req.body.app_date || '';
    res.send(`
        <html>
        <head><title>Booking Confirmation</title></head>
        <body style="background:#0f172a;color:#e2e8f0;font-family:sans-serif;padding:2rem">
            <div style="max-width:500px;margin:auto;background:#1e293b;padding:2rem;border-radius:1rem;border:1px solid #334155">
                <h2 style="color:#34d399">Booking Request Received</h2>
                <p>Thank you, <strong>${patientName}</strong>!</p>
                <p>Your appointment request for <em>${appDate}</em> has been noted.</p>
                <a href="/patient.html" style="color:#34d399;font-size:0.8rem">← Back to Portal</a>
            </div>
        </body>
        </html>
    `);
});

// تشغيل السيرفر
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`\n🚀 Target Server is running smoothly from external DB!`);
    console.log(`🏥 Portal Endpoint: http://localhost:${PORT}/patient.html\n`);
});