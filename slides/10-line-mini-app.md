---
marp: true
theme: default
paginate: true
footer: '**LINE Developer Tools** · Chapter 10: LINE Mini App'
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

## Chapter 10 · LINE Mini App

---

# LINE Mini App คืออะไร?

LINE กำลัง rebrand LIFF จาก LINE Login channel ไปเป็น **LINE MINI App**

**จุดเด่น:**
- สร้างได้ทันทีไม่ต้องส่งเอกสาร (ทั่วโลก)
- ผู้ใช้ไม่ต้องโหลดแอปเพิ่ม
- เทคโนโลยีเบื้องหลังคือ **LIFF**
- มีฟีเจอร์พิเศษที่ LIFF ทั่วไปไม่มี

---

# Verified vs Unverified Mini App

| ฟีเจอร์ | Verified | Unverified |
|---|:---:|:---:|
| Service Message | Yes | No |
| Module Mode | Yes | No |
| Multiple Web Apps | Yes | No |
| Custom Path | Yes | No |
| Home Screen Shortcut | Yes (test ได้) | No |
| LINE Search | Yes | No |
| Recent Services | Yes | No |
| Channel Consent Simplification | Yes | Yes |
| Common Profile Quick-fill | Yes | Yes |

---

# ฟีเจอร์เด่นของ LINE Mini App

- **Service Message** — ส่งแจ้งเตือนหลังผู้ใช้ทำรายการ
- **Custom Path** — กำหนด URL path เอง
- **Home Screen Shortcut** — เพิ่มไอคอนบนหน้าจอมือถือ
- **Channel Consent Simplification** — ลดขั้นตอนขอ consent
- **LINE Search** — ค้นหาได้จาก LINE
- **Recent Services** — แสดงในรายการล่าสุด
- **Common Profile Quick-fill** — กรอกข้อมูลอัตโนมัติ

---

# Permanent Links & LIFF Comparison

### Permanent Links
```
https://miniapp.line.me/{miniAppChannelId}
https://miniapp.line.me/{miniAppChannelId}/my-page?param=value
```

### LIFF vs LINE Mini App

| | LIFF | LINE Mini App |
|---|---|---|
| Channel Type | LINE Login | LINE MINI App |
| Service Message | No | Yes (Verified) |
| Module Mode | No | Yes (Verified) |
| Custom Path | No | Yes (Verified) |
| Home Shortcut | No | Yes (Verified) |

> **อนาคต:** LIFF จะถูกรวมเข้ากับ LINE MINI App

---

<!-- _class: divider -->

# สร้าง LINE Mini App

## จาก Console สู่ Production

---

# สร้าง LINE Mini App

1. เข้า **LINE Developers Console**
2. เลือก Provider > **Create a new channel**
3. เลือก **LINE MINI App**
4. กรอกข้อมูล:
   - ประเทศ: **Thailand**
   - Icon, ชื่อแอป, คำอธิบาย
   - อีเมล, Terms of use URL

**3 สภาพแวดล้อม:**

| สภาพแวดล้อม | เข้าถึงได้ |
|---|---|
| **Developing** | เฉพาะ Admin / Tester |
| **Review** | รอตรวจสอบ |
| **Published** | เปิดให้ทุกคน |

---

# Service Message

ส่งแจ้งเตือนหลังผู้ใช้ทำรายการ (จอง, สมัคร, ฯลฯ)

**ขั้นตอน:**
1. สร้าง Template ใน Console (สูงสุด 20 template, 6 ภาษา)
2. ผู้ใช้ทำรายการใน Mini App > ได้ **Service Notification Token**
3. Backend ส่ง Service Message ด้วย Token

**Template มี:**
- Title, Detail, Button, Footer
- สถานะ: DEVELOPING > PUBLISHING

---

# Service Message — Flow

```
1. ผู้ใช้เปิด Mini App
2. Frontend เรียก LIFF API → ได้ LIFF Access Token
3. Frontend ส่ง Access Token ไป Backend
4. Backend ใช้ Access Token
   → เรียก LINE API → ได้ Service Notification Token
5. เมื่อต้องส่งแจ้งเตือน:
   Backend ใช้ Service Notification Token
   + Channel Access Token
   → ส่ง Service Message ไปหาผู้ใช้
```

> Token จะมีอายุ **1 ปี** และใช้ได้ **1 ครั้ง**
> แต่ Response จะมี Token ใหม่กลับมาใช้ครั้งถัดไป

---

# Service Message — Frontend

```javascript
// LIFF Frontend - Vue.js
const register = async () => {
  await liff.ready;
  
  if (!liff.isLoggedIn()) {
    liff.login();
    return;
  }

  const accessToken = liff.getAccessToken();
  
  await fetch('/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify({ name: 'John' })
  });
};
```

---

# Service Message — Backend

```typescript
// 1. แลก Access Token → Service Notification Token
const tokenRes = await fetch(
  'https://api.line.me/message/v3/notifier/token',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${channelAccessToken}`
    },
    body: JSON.stringify({
      liffAccessToken: userAccessToken
    })
  }
);

// 2. ส่ง Service Message
const sendRes = await fetch(
  'https://api.line.me/message/v3/notifier/send',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${channelAccessToken}`
    },
    body: JSON.stringify({
      templateName: 'booking_confirm',
      notificationToken: serviceNotificationToken,
      params: { ... }
    })
  }
);
```

---

# Home Screen Shortcut

เพิ่มไอคอน Mini App บนหน้าจอมือถือ

```javascript
// เรียกฟังก์ชันเพิ่ม shortcut
await liff.createShortcutOnHomeScreen();
```

**URL ที่รองรับ:** LIFF URL · Permanent link · Endpoint URL

**ข้อจำกัด:**
- Verified Mini App เท่านั้น (test ได้ใน Developing)
- Android: เปลี่ยน icon อาจลบ shortcut เดิม
- iOS: รองรับตาม browser และ version

---

# สรุป LINE Mini App

| หัวข้อ | รายละเอียด |
|---|---|
| เทคโนโลยี | LIFF |
| สร้างได้ทันที | ใช่ (ไม่ต้องส่งเอกสาร) |
| Service Message | Verified เท่านั้น |
| อนาคต | LIFF จะรวมเข้า Mini App |
| Playground | miniapp-playground.line.me |
