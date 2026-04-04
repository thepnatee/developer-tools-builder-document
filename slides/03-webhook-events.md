---
marp: true
theme: default
paginate: true
footer: '**LINE Developer Tools** · Chapter 3: Webhook Events'
style: |
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@300;400;600;700&display=swap');
  :root { --line-green: #06C755; --line-dark: #1a1a2e; --accent: #00B900; }
  section { font-family: 'Noto Sans Thai', 'Sarabun', sans-serif; background-color: #fff; color: #2d2d2d; }
  section::after { font-size: 0.6em; color: #999; }
  h1 { color: var(--line-green); font-weight: 700; border-bottom: 3px solid var(--line-green); padding-bottom: 0.2em; }
  h2 { color: var(--line-green); font-weight: 600; }
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

## Chapter 3 · Webhook Events

---

# Webhook Events คืออะไร?

![bg right:35% w:400](../assets/ch03-webhook/messaging-api-architecture.webp)

เมื่อผู้ใช้ทำกิจกรรมต่างๆ กับ LINE Official Account
LINE Platform จะส่ง **Webhook Event** ไปยัง Server ของเรา

**Flow:**
1. ผู้ใช้ส่งข้อความ / กดปุ่ม / เพิ่มเพื่อน
2. LINE Server รับ Event
3. LINE Server ส่ง Webhook ไปยัง Webhook URL ของเรา
4. Server ของเราประมวลผลและตอบกลับ

---

# ประเภท Webhook Events

| Event | คำอธิบาย |
|---|---|
| **Message** | ผู้ใช้ส่งข้อความ (text, image, video, audio, location, sticker) |
| **Unsend** | ผู้ใช้ยกเลิกการส่งข้อความ |
| **Follow** | ผู้ใช้เพิ่มบอทเป็นเพื่อน |
| **Unfollow** | ผู้ใช้บล็อกบอท |
| **Join** | บอทถูกเพิ่มเข้ากลุ่ม |
| **Leave** | บอทถูกลบออกจากกลุ่ม |
| **Postback** | ผู้ใช้กดปุ่ม postback |
| **Beacon** | ผู้ใช้เข้าใกล้ Beacon |

---

# Text Message Event

```json
{
  "type": "message",
  "message": {
    "type": "text",
    "id": "46XXXXX",
    "quoteToken": "q3Plxr4AgKd...",
    "text": "Hello, world"
  },
  "replyToken": "nHuyWiB7yP5Zw52FIkcQobQuGDXCTA",
  "source": {
    "userId": "U4af4980629...",
    "type": "user"
  }
}
```

---

# Image / Video / Audio Message Event

```json
{
  "type": "message",
  "message": {
    "type": "image",
    "id": "354718705033693859",
    "quoteToken": "q3Plxr4AgKd...",
    "contentProvider": {
      "type": "line"
    },
    "imageSet": {
      "id": "E005D41A7288F41B",
      "index": 1,
      "total": 2
    }
  }
}
```

> ดึงเนื้อหาได้ที่: `GET https://api-data.line.me/v2/bot/message/{messageId}/content`

---

# Location & Sticker Message Event

**Location:**
```json
{
  "type": "location",
  "id": "325708...",
  "title": "my location",
  "address": "Tokyo",
  "latitude": 35.65910807942215,
  "longitude": 139.70372892916718
}
```

**Sticker:**
```json
{
  "type": "sticker",
  "id": "325708...",
  "packageId": "1",
  "stickerId": "1",
  "stickerResourceType": "STATIC"
}
```

---

<!-- _class: divider -->

# Quote Token & Mention

## ฟีเจอร์เสริมใน Webhook

---

# Quote Token & Quoted Messages

### quoteToken
- Token สำหรับอ้างอิงข้อความ
- **ไม่มีวันหมดอายุ** และใช้ซ้ำได้
- ได้จาก Webhook Event หรือ Response ของการส่งข้อความ

### quotedMessageId
- เมื่อผู้ใช้ reply ข้อความ จะมี `quotedMessageId` แนบมาใน Webhook

```json
{
  "type": "text",
  "text": "Yes, you can.",
  "quoteToken": "yHAz4Ua2wx7..."
}
```

---

# Mention ใน Webhook

เมื่อผู้ใช้ mention บอทหรือผู้ใช้อื่นในข้อความ:

```json
{
  "text": "@All @test_user hello",
  "mention": {
    "mentionees": [
      {
        "index": 0,
        "length": 4,
        "type": "all"
      },
      {
        "index": 5,
        "length": 10,
        "userId": "U49585cd0d5...",
        "type": "user"
      }
    ]
  }
}
```

---

# Get User Profile

ดึงข้อมูลโปรไฟล์ผู้ใช้:

```
GET https://api.line.me/v2/bot/profile/{userId}
Authorization: Bearer {channel access token}
```

**Response:**
```json
{
  "displayName": "LINE taro",
  "userId": "U4af4980629...",
  "pictureUrl": "https://profile.line-scdn.net/abcdefg",
  "statusMessage": "Hello, LINE!",
  "language": "en"
}
```

---

# Webhook Redelivery

กรณี Server ตอบกลับไม่สำเร็จ LINE จะส่ง Webhook ซ้ำ

**เงื่อนไข:**
- Server ตอบกลับด้วย Status Code ที่ไม่ใช่ 2xx
- Server ไม่ตอบกลับภายในเวลาที่กำหนด

> ตรวจสอบ Webhook Error ได้ใน LINE Developers Console
