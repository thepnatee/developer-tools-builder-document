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
  code { font-size: 0.8em; }
---

# LINE Developer Tools
## Chapter 4: Create Chatbot with Firebase

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

## สร้าง LINE Developer Account
1. เข้า [LINE Developers Console](https://developers.line.biz/console/)
2. สร้าง Provider + Messaging API Channel
3. บันทึก Channel ID, Channel Secret, Access Token

## สร้าง Firebase Project
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

# ngrok - เปิด localhost สู่อินเทอร์เน็ต

สร้าง URL ชั่วคราวเพื่อเข้าถึง localhost จากภายนอก

## ติดตั้ง & ใช้งาน

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

## ตั้งค่าผ่าน API ก็ได้:

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
|---|---|
| TLS 1.3 | ✅ |
| TLS 1.2 | ✅ |
| TLS 1.1 หรือต่ำกว่า | ❌ |

> ใช้ Let's Encrypt สำหรับ SSL ฟรีได้

