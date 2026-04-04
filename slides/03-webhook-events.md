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
## Chapter 3: Webhook Events

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

ดึงเนื้อหาได้ที่: `GET https://api-data.line.me/v2/bot/message/{messageId}/content`

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

# Quote Token & Quoted Messages

## quoteToken
- Token สำหรับอ้างอิงข้อความ
- **ไม่มีวันหมดอายุ** และใช้ซ้ำได้
- ได้จาก Webhook Event หรือ Response ของการส่งข้อความ

## quotedMessageId
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

