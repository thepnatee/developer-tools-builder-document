---
marp: true
theme: default
paginate: true
footer: '**LINE Developer Tools** · Chapter 4: Create Chatbot with Firebase'
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

## Chapter 4 · Create Chatbot with Firebase

---

# Firebase คืออะไร?

แพลตฟอร์มจาก Google สำหรับพัฒนาแอปพลิเคชัน

| บริการ | คำอธิบาย |
|---|---|
| **Cloud Functions** | ฟังก์ชันบน Cloud ตอบสนองต่อ Event |
| **Firestore** | ฐานข้อมูล NoSQL แบบเอกสาร |
| **Hosting** | โฮสติ้งเว็บไซต์ |
| **Realtime Database** | ฐานข้อมูล NoSQL แบบ Realtime |
| **Authentication** | ระบบจัดการการลงชื่อเข้าใช้ |

---

# ขั้นตอนที่ 1: เตรียมความพร้อม

### สร้าง LINE Developer Account
1. เข้า [LINE Developers Console](https://developers.line.biz/console/)
2. สร้าง Provider + Messaging API Channel
3. บันทึก Channel ID, Channel Secret, Access Token

### สร้าง Firebase Project
1. ไปที่ [Firebase Console](https://console.firebase.google.com/)
2. คลิก "Add project"
3. ตั้งค่า Cloud Functions & Firestore

---

# ขั้นตอนที่ 2: ติดตั้ง Firebase CLI

```bash
# ติดตั้ง Firebase CLI
npm install -g firebase-tools

# เข้าสู่ระบบ
firebase login

# สร้างโปรเจกต์
firebase init
```

**เลือกตั้งค่า:**
- Language: **TypeScript**
- ESLint: **No**
- Install dependencies: **Yes**
- Emulator: **Functions Emulator**

---

# โครงสร้างโปรเจกต์

```
functions/
├── src/
│   └── index.ts          ← จุดเริ่มต้น Cloud Functions
├── lib/                   ← ไฟล์ .js ที่ compile แล้ว
├── package.json           ← dependencies
└── tsconfig.json          ← ตั้งค่า TypeScript
```

---

# ขั้นตอนที่ 3: เขียน Cloud Function

```typescript
import { setGlobalOptions } from "firebase-functions/v2";
import { onRequest } from "firebase-functions/v2/https";
import { Request, Response } from "express";

setGlobalOptions({
  region: "asia-northeast1",
  memory: "1GiB",
  concurrency: 40
});

export const webhook = onRequest(
  { invoker: "public" },
  async (request: Request, response: Response) => {
    if (request.method !== "POST") {
      response.status(405).send("Method Not Allowed");
    }
    const events = request.body.events;
    for (const event of events) {
      console.log(event);
    }
    response.end();
  }
);
```

---

# ขั้นตอนที่ 4: ทดสอบด้วย Emulator

```bash
npm run serve
```

**ผลลัพธ์:**
```
✔ functions: Loaded functions definitions from source: webhook.
✔ functions[asia-northeast1-webhook]:
  http://127.0.0.1:5001/{project}/asia-northeast1/webhook

┌───────────┬────────────────┐
│ Emulator  │ Host:Port      │
├───────────┼────────────────┤
│ Functions │ 127.0.0.1:5001 │
└───────────┴────────────────┘
```

---

<!-- _class: divider -->

# ngrok & Webhook Setup

## เชื่อมต่อ localhost สู่ LINE Platform

---

# ngrok — เปิด localhost สู่อินเทอร์เน็ต

สร้าง URL ชั่วคราวเพื่อเข้าถึง localhost จากภายนอก

```bash
# ติดตั้ง Auth Token
ngrok authtoken YOUR_AUTH_TOKEN

# สร้าง HTTP Tunnel
ngrok http 5001
```

**ได้ URL เช่น:** `https://xxxx-xxx.ngrok-free.app`
นำ URL นี้ไปใส่เป็น Webhook URL ใน LINE Developers Console

---

# ตั้งค่า Webhook URL

1. เข้า LINE Developers Console > Channel settings
2. แท็บ **Messaging API**
3. **Webhook URL** > กรอก URL (ngrok หรือ Firebase)
4. คลิก **Update** > **Verify**
5. เปิด **Use webhook** = Enabled

### ตั้งค่าผ่าน API ก็ได้:

```bash
PUT  /v2/bot/channel/webhook/endpoint    # ตั้งค่า
GET  /v2/bot/channel/webhook/endpoint    # ดูข้อมูล
POST /v2/bot/channel/webhook/test        # ทดสอบ
```

---

# SSL/TLS สำหรับ Webhook

**ข้อกำหนด:**
- ใช้ใบรับรองจาก **Public CA** เท่านั้น
- ไม่รองรับ **Self-signed**
- ต้องติดตั้ง **certificate chain ครบถ้วน**

**โปรโตคอลที่รองรับ:**

| เวอร์ชัน | รองรับ |
|---|:---:|
| TLS 1.3 | Yes |
| TLS 1.2 | Yes |
| TLS 1.1 หรือต่ำกว่า | No |

> ใช้ Let's Encrypt สำหรับ SSL ฟรีได้
