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
## Chapter 10: LINE Mini App

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
|---|---|---|
| Service Message | ✅ | ❌ |
| Module Mode | ✅ | ❌ |
| Multiple Web Apps | ✅ | ❌ |
| Custom Path | ✅ | ❌ |
| Home Screen Shortcut | ✅ (test ได้) | ❌ |
| LINE Search | ✅ | ❌ |
| Recent Services | ✅ | ❌ |
| Channel Consent Simplification | ✅ | ✅ |
| Common Profile Quick-fill | ✅ | ✅ |

---

# ฟีเจอร์เด่นของ LINE Mini App

- **Service Message** - ส่งแจ้งเตือนหลังผู้ใช้ทำรายการ
- **Custom Path** - กำหนด URL path เอง
- **Home Screen Shortcut** - เพิ่มไอคอนบนหน้าจอมือถือ
- **Channel Consent Simplification** - ลดขั้นตอนขอ consent
- **LINE Search** - ค้นหาได้จาก LINE
- **Recent Services** - แสดงในรายการล่าสุด
- **Common Profile Quick-fill** - กรอกข้อมูลอัตโนมัติ

---

# Permanent Links

```
# รูปแบบ
https://miniapp.line.me/{miniAppChannelId}

# ตัวอย่าง
https://miniapp.line.me/1234567890

# พร้อม Path
https://miniapp.line.me/1234567890/my-page?param=value
```

---

# LIFF vs LINE Mini App

| | LIFF | LINE Mini App |
|---|---|---|
| Channel Type | LINE Login | LINE MINI App |
| Service Message | ❌ | ✅ (Verified) |
| Module Mode | ❌ | ✅ (Verified) |
| Custom Path | ❌ | ✅ (Verified) |
| Home Shortcut | ❌ | ✅ (Verified) |
| LINE Search | ❌ | ✅ (Verified) |

> **อนาคต:** LIFF จะถูกรวมเข้ากับ LINE MINI App

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
| Developing | เฉพาะ Admin/Tester |
| Review | รอตรวจสอบ |
| Published | เปิดให้ทุกคน |

---

# Service Message

ส่งแจ้งเตือนหลังผู้ใช้ทำรายการ (จอง, สมัคร, ฯลฯ)

**ขั้นตอน:**
1. สร้าง Template ใน Console (สูงสุด 20 template, 6 ภาษา)
2. ผู้ใช้ทำรายการใน Mini App → ได้ **Service Notification Token**
3. Backend ส่ง Service Message ด้วย Token

**Template มี:**
- Title, Detail, Button, Footer
- สถานะ: DEVELOPING → PUBLISHING

---

# Service Message - Flow

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

> Token จะมีอายุ 1 ปีและใช้ได้ 1 ครั้ง
> แต่ Response จะมี Token ใหม่กลับมาใช้ครั้งถัดไป

---

# Service Message - ตัวอย่าง Code (Frontend)

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

# Service Message - ตัวอย่าง Code (Backend)

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

**URL ที่รองรับ:**
- LIFF URL
- Permanent link
- Endpoint URL

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

> เริ่มพัฒนา LINE Mini App วันนี้!

