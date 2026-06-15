const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// تحديد مسار ملف قاعدة البيانات الخارجي
const dbPath = path.join(__dirname, 'clinic.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    console.log("⚙️ Creating and initializing 'clinic.db'...");

    // 1. إنشاء جدول الحسابات (مع إمكانية تخطيها بالـ SQL Injection)
    db.run("DROP TABLE IF EXISTS users");
    db.run("CREATE TABLE users (username TEXT, password TEXT, role TEXT)");
    
    // إضافة حسابات متعددة (أطباء ومسؤولين)
    db.run("INSERT INTO users VALUES ('admin_doctor', 'SecurePassword2026', 'doctor')");
    db.run("INSERT INTO users VALUES ('dr_moaz', 'CyberClinic2026', 'doctor')");
    db.run("INSERT INTO users VALUES ('chief_medical', 'Pass12345', 'doctor')");

    // 2. إنشاء جدول المرضى وتكبير حجم البيانات (سجلات تفصيلية)
    db.run("DROP TABLE IF EXISTS patients");
    db.run("CREATE TABLE patients (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, disease TEXT, phone TEXT, room TEXT)");
    
    const extensivePatients = [
        ['Ahmed Ali', 'Chronic Hypertension', '01011223344', 'Room 101'],
        ['Mona Sameh', 'Type 2 Diabetes', '01222334455', 'Room 104'],
        ['Ziad Mahmoud', 'Acute Appendicitis', '01555667788', 'ICU - Bed 2'],
        ['Fatma Hassan', 'Asthma Flare-up', '01112233445', 'Room 202'],
        ['Youssef Omar', 'Migraine & Vertigo', '01099887766', 'Outpatient'],
        ['Khaled Amgad', 'Bone Fracture', '01200112233', 'Orthopedics'],
        ['Sara Ibrahim', 'Anemia & Fatigue', '01500445566', 'Room 105'],
        ['Nour El-Din', 'Kidney Stones', '01144556677', 'Room 301'],
        ['Ghada Mostafa', 'Gastroenteritis', '01033445566', 'Room 205'],
        ['Hany Adel', 'Cardiac Arrhythmia', '01277889900', 'CCU - Bed 1'],
        ['Laila Kamel', 'Rheumatoid Arthritis', '01155667788', 'Room 102'],
        ['Tarek Ashmawy', 'Pneumonia Infection', '01044556677', 'Room 304'],
        ['Noha Yasser', 'Hyperthyroidism', '01533221100', 'Outpatient'],
        ['Sherif Hegazi', 'Lumbar Disc Herniation', '01288776655', 'Room 208'],
        ['Rania Farouk', 'Acute Cholecystitis', '01122998877', 'Room 210']
    ];

    const stmt = db.prepare("INSERT INTO patients (name, disease, phone, room) VALUES (?, ?, ?, ?)");
    extensivePatients.forEach(p => stmt.run(p));
    stmt.finalize();

    console.log("✅ 'clinic.db' successfully populated with accounts and expanded patient logs!");
});

db.close();