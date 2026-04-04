---
marp: true
theme: default
paginate: true
footer: '**LINE Developer Tools** · Chapter 7: Firebase Storage'
style: |
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@300;400;600;700&display=swap');
  :root { --line-green: #06C755; --line-dark: #1a1a2e; --accent: #00B900; }
  section { font-family: 'Noto Sans Thai', 'Sarabun', sans-serif; background-color: #fff; color: #2d2d2d; }
  section::after { font-size: 0.6em; color: #999; }
  h1 { color: var(--line-green); font-weight: 700; border-bottom: 3px solid var(--line-green); padding-bottom: 0.2em; }
  h2 { color: var(--line-green); font-weight: 600; }
  h3 { color: #444; }
  table { font-size: 0.78em; border-collapse: separate; border-spacing: 0; width: 100%; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 6px rgba(0,0,0,0.08); }
  th { background: linear-gradient(135deg, var(--line-green), var(--accent)); color: white; font-weight: 600; padding: 10px 14px; text-align: left; }
  td { padding: 8px 14px; border-bottom: 1px solid #eee; }
  tr:nth-child(even) td { background-color: #f7fdf8; }
  tr:last-child td { border-bottom: none; }
  code { font-size: 0.82em; background-color: #e8f5e9; color: #2e7d32; padding: 2px 8px; border-radius: 4px; }
  pre { background: var(--line-dark); border-radius: 12px; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
  pre code { background: transparent; color: #e0e0e0; padding: 0; font-size: 0.78em; }
  blockquote { border-left: 4px solid var(--line-green); background: linear-gradient(90deg, #f0faf2, transparent); padding: 12px 20px; margin: 16px 0; border-radius: 0 8px 8px 0; font-size: 0.88em; }
  a { color: var(--line-green); text-decoration: none; font-weight: 600; }
  footer { font-size: 0.55em !important; color: #bbb !important; }
  section.cover { background: linear-gradient(135deg, #06C755 0%, #00B900 40%, #008C00 100%); color: white; text-align: center; display: flex; flex-direction: column; justify-content: center; }
  section.cover h1 { color: white; border: none; font-size: 2.8em; text-shadow: 0 2px 8px rgba(0,0,0,0.2); }
  section.cover h2 { color: rgba(255,255,255,0.9); font-weight: 400; font-size: 1.3em; }
  section.cover footer { color: rgba(255,255,255,0.6) !important; }
  section.cover::after { color: rgba(255,255,255,0.5); }
  section.divider { background: linear-gradient(135deg, var(--line-dark), #16213e); color: white; display: flex; flex-direction: column; justify-content: center; }
  section.divider h1 { color: var(--line-green); border: none; font-size: 2.4em; }
  section.divider h2 { color: rgba(255,255,255,0.7); font-weight: 300; }
  section.divider footer { color: rgba(255,255,255,0.3) !important; }
  section.divider::after { color: rgba(255,255,255,0.3); }
---

<!-- _class: cover -->
<!-- _paginate: false -->
<!-- _footer: '' -->

# LINE Developer Tools

## Chapter 7 · Firebase Storage

---

# Firebase Storage คืออะไร?

บริการจัดเก็บไฟล์บนคลาวด์ของ Google สำหรับนักพัฒนา

**คุณสมบัติหลัก:**
- อัปโหลด / ดาวน์โหลดไฟล์ผ่าน SDK / API
- รักษาความปลอดภัยด้วย Firebase Security Rules
- รองรับการจัดการไฟล์ขนาดใหญ่ (chunking)
- เชื่อมต่อกับ Firebase Authentication
- ทำงานร่วมกับ Firebase services อื่นได้

---

# ราคา Firebase Storage

| รายการ | Free Tier | Standard |
|---|---|---|
| พื้นที่จัดเก็บ | 5 GB | $0.026 / GB / เดือน |
| ดาวน์โหลด | 1 GB / วัน | $0.12 / GB (US) |
| อัปโหลด | ฟรี | ฟรี |
| Egress to Google | ฟรี | ฟรี |

> ราคาแตกต่างกันตามภูมิภาค (Asia, Europe ราคาต่างกัน)

---

# เริ่มต้นใช้งาน

1. สมัครที่ [Firebase Console](https://console.firebase.google.com/)
2. สร้าง Project ใหม่
3. เพิ่ม Firebase Storage
4. ตั้งค่า Security Rules
5. เริ่มอัปโหลดไฟล์

**ใช้ร่วมกับ LINE Bot:**
- เก็บรูปภาพ / วิดีโอที่ผู้ใช้ส่งมา
- สร้าง URL สำหรับ Image / Video message
- เก็บ Rich Menu images

---

# Security Rules

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

> กำหนดสิทธิ์การเข้าถึงไฟล์ตามเงื่อนไข
