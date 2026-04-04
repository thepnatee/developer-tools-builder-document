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
  table { font-size: 0.7em; }
  code { font-size: 0.75em; }
---

# LINE Developer Tools
## Chapter 9: LIFF (LINE Front-end Framework)

---

# LIFF คืออะไร?

**LINE Front-end Framework (LIFF)** - เปิด Web App ภายในแอป LINE

**ทำอะไรได้:**
- เข้าถึงข้อมูลผู้ใช้ (userId, email, displayName, pictureUrl)
- ส่งข้อความแทนผู้ใช้
- แชร์ข้อความไปยังเพื่อน/กลุ่ม
- สแกน QR Code
- รองรับ External Browser ด้วย LINE Login

---

# LIFF Sizes

| Size | พื้นที่หน้าจอ | ใช้เมื่อ |
|---|---|---|
| **Compact** | 50% | แสดงข้อมูลสั้นๆ |
| **Tall** | 75% | ฟอร์ม, ข้อมูลปานกลาง |
| **Full** | 100% | เว็บแอปเต็มรูปแบบ |

**URL:** `https://liff.line.me/{liffId}`

---

# เริ่มต้นด้วย Create LIFF App

```bash
# สร้าง LIFF App ด้วย CLI
npx @line/create-liff-app

# เลือก Framework:
# vanilla | React | Vue.js | Svelte | Next.js | Nuxt

# ต้องการ: Node.js 18+, LIFF ID
```

**รัน Dev Server:**
```bash
cd my-liff-app
npm run dev
```

> ใช้ Port Forwarding (VS Code) หรือ ngrok เพื่อเข้าถึงจากภายนอก

---

# LIFF - liff.init()

ต้องเรียก `liff.init()` ก่อนใช้ฟังก์ชันอื่น

```javascript
import liff from '@line/liff';

liff.init({ liffId: '1234567890-abcdefgh' })
  .then(() => {
    // LIFF พร้อมใช้งาน
    if (liff.isLoggedIn()) {
      // ผู้ใช้ login แล้ว
    }
  })
  .catch((err) => {
    console.error('LIFF init failed', err);
  });
```

> `liff.ready` - Promise ที่ resolve เมื่อ init สำเร็จ

---

# LIFF - Get Profile

```javascript
// รอ LIFF พร้อม
await liff.ready;

if (liff.isLoggedIn()) {
  const profile = await liff.getProfile();

  console.log(profile.displayName);   // ชื่อ
  console.log(profile.pictureUrl);    // รูปโปรไฟล์
  console.log(profile.statusMessage); // สถานะ
  console.log(profile.userId);        // User ID
}
```

**ดึง Email:**
```javascript
const email = liff.getDecodedIDToken().email;
```
> ต้องเปิด **Email scope** ใน LINE Developers Console

---

# LIFF - Environment & Context

```javascript
// ข้อมูลสภาพแวดล้อม
liff.getOS();           // "ios" | "android" | "web"
liff.getLanguage();     // "th" | "en" | ...
liff.getVersion();      // LIFF SDK version
liff.getLineVersion();  // LINE app version
liff.isInClient();      // เปิดในแอป LINE หรือไม่

// Context
const context = liff.getContext();
context.type;           // "utou" | "room" | "group" | "none"
context.userId;
context.groupId;        // ถ้าเปิดในกลุ่ม
```

---

# LIFF - Check Friendship

ตรวจสอบว่าผู้ใช้เป็นเพื่อนกับ LINE OA หรือยัง

```javascript
const friendship = await liff.getFriendship();

if (friendship.friendFlag) {
  console.log("เป็นเพื่อนกับ OA แล้ว");
} else {
  console.log("ยังไม่ได้เพิ่มเพื่อน OA");
  // แสดงปุ่มเพิ่มเพื่อน
}
```

**ต้องการ:**
- LINE OA ต้อง link กับ LINE Login channel เดียวกัน

---

# LIFF - Send Messages

```javascript
// ส่งข้อความไปยังแชทปัจจุบัน (ต้องเปิดในแอป LINE)
await liff.sendMessages([
  { type: "text", text: "Hello from LIFF!" }
]);
// สูงสุด 5 ข้อความ, ต้องเปิด chat_message.write scope
```

```javascript
// แชร์ข้อความ - เลือกผู้รับได้ (ใช้ได้ทั้งในและนอก LINE)
await liff.shareTargetPicker([
  { type: "text", text: "แชร์ข้อความนี้" }
]);
```

**รองรับ:** Text, Sticker, Image, Video, Audio, Location, Template, Flex

---

# LIFF - Scan QR Code

```javascript
// สแกน QR Code (LIFF SDK v2.15.0+, Full screen เท่านั้น)
const result = await liff.scanCodeV2();
console.log(result.value);  // ค่าที่อ่านได้จาก QR
```

**ข้อกำหนด:**
- LIFF size ต้องเป็น **Full**
- LINE app v11.7.0+
- iOS 14.3+
- ไม่รองรับ External Browser

---

# LIFF CLI

จัดการ LIFF App ผ่าน Command Line

```bash
# ติดตั้ง
npm install -g @line/liff-cli

# เพิ่ม Channel
liff-cli channel add

# ตั้ง Default Channel
liff-cli channel use

# สร้าง LIFF App
liff-cli app create \
  --name "My App" \
  --endpoint-url "https://example.com" \
  --view-type full

# ดูรายการ LIFF Apps
liff-cli app list

# อัปเดต / ลบ
liff-cli app update --liff-id {id} --endpoint-url "..."
liff-cli app delete --liff-id {id}
```

