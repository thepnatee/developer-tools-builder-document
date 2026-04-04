---
marp: true
theme: default
paginate: true
style: |
  section {
    font-family: 'Sarabun', 'Noto Sans Thai', sans-serif;
  }
  h1 { color: #06C755; }
  h2 { color: #06C755; }
  table { font-size: 0.75em; }
  code { font-size: 0.85em; }
---

# LINE Developer Tools
## Chapter 7: Firebase Storage

---

# Firebase Storage คืออะไร?

บริการจัดเก็บไฟล์บนคลาวด์ของ Google สำหรับนักพัฒนา

**คุณสมบัติหลัก:**
- อัปโหลด/ดาวน์โหลดไฟล์ผ่าน SDK/API
- รักษาความปลอดภัยด้วย Firebase Security Rules
- รองรับการจัดการไฟล์ขนาดใหญ่ (chunking)
- เชื่อมต่อกับ Firebase Authentication
- ทำงานร่วมกับ Firebase services อื่นได้

---

# ราคา Firebase Storage

| รายการ | Free Tier | Standard |
|---|---|---|
| พื้นที่จัดเก็บ | 5 GB | $0.026/GB/เดือน |
| ดาวน์โหลด | 1 GB/วัน | $0.12/GB (US) |
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
- เก็บรูปภาพ/วิดีโอที่ผู้ใช้ส่งมา
- สร้าง URL สำหรับ Image/Video message
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

