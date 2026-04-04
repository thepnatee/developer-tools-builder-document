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
  code { font-size: 0.75em; }
---

# LINE Developer Tools
## Chapter 6: Flex Message

---

# Flex Message คืออะไร?

![bg right:30% w:300](../assets/ch06-flex-message/flex-structure.png)

ข้อความที่มี layout ปรับแต่งได้อิสระ
ใช้หลักการ **CSS Flexible Box (Flexbox)**

**ใช้ทำอะไรได้:**
- ใบเสร็จ / ใบแจ้งหนี้
- บัตรพนักงาน / บัตรสมาชิก
- เมนูอาหาร / สินค้า
- พยากรณ์อากาศ
- ตั๋วคิว / Booking confirmation

> [Flex Message Simulator](https://developers.line.biz/flex-simulator/)

---

# โครงสร้าง Flex Message - 3 ชั้น

## 1. Container
- **Bubble** - กล่องข้อความเดี่ยว
- **Carousel** - หลาย bubble เลื่อนดูได้ (สูงสุด 12)

## 2. Block (ภายใน Bubble)
- **Header** - ส่วนหัว
- **Hero** - รูปภาพหลัก
- **Body** - เนื้อหาหลัก
- **Footer** - ส่วนท้าย

## 3. Component (ภายใน Block)
- button, icon, image, video, text, span, box, separator, spacer

---

# Flex Message - ตัวอย่างโครงสร้าง

```json
{
  "type": "flex",
  "altText": "this is a flex message",
  "contents": {
    "type": "bubble",
    "body": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "text",
          "text": "hello"
        },
        {
          "type": "text",
          "text": "world"
        }
      ]
    }
  }
}
```

---

# Container Types

## Bubble
```json
{
  "type": "bubble",
  "size": "mega",
  "header": { ... },
  "hero": { ... },
  "body": { ... },
  "footer": { ... }
}
```

## Carousel
```json
{
  "type": "carousel",
  "contents": [
    { "type": "bubble", ... },
    { "type": "bubble", ... }
  ]
}
```

> Bubble sizes: nano, micro, deca, hecto, kilo, mega, giga

---

# Component - Box Layout

Box เป็น component หลักที่ใช้จัด layout

| Layout | คำอธิบาย |
|---|---|
| `horizontal` | เรียงซ้ายไปขวา |
| `vertical` | เรียงบนลงล่าง |
| `baseline` | เรียงตาม baseline ของข้อความ |

**Properties สำคัญ:**
- `spacing` - ระยะห่างระหว่าง component
- `margin` - ระยะห่างด้านนอก
- `paddingAll` / `paddingTop` / ... - padding
- `backgroundColor` - สีพื้นหลัง
- `cornerRadius` - มุมโค้ง

---

# Component - Text & Image

**Text:**
```json
{
  "type": "text",
  "text": "Hello, World!",
  "weight": "bold",
  "size": "xl",
  "color": "#1DB446",
  "wrap": true,
  "align": "center"
}
```

**Image:**
```json
{
  "type": "image",
  "url": "https://example.com/image.jpg",
  "size": "full",
  "aspectRatio": "20:13",
  "aspectMode": "cover"
}
```

---

# Component - Button & Separator

**Button:**
```json
{
  "type": "button",
  "style": "primary",
  "color": "#1DB446",
  "action": {
    "type": "uri",
    "label": "ดูรายละเอียด",
    "uri": "https://example.com"
  }
}
```

**Separator:**
```json
{
  "type": "separator",
  "margin": "xxl"
}
```

> Button styles: `primary` (สีเต็ม), `secondary` (สีอ่อน), `link` (ข้อความ)

---

# Gradient Background

```json
{
  "type": "box",
  "layout": "vertical",
  "background": {
    "type": "linearGradient",
    "angle": "0deg",
    "startColor": "#27ACB2",
    "endColor": "#99E2A4"
  },
  "contents": [...]
}
```

> รองรับ `linearGradient` สำหรับพื้นหลังไล่สี

---

# Flex Message Simulator

เครื่องมือออกแบบ Flex Message แบบ Visual

**URL:** [developers.line.biz/flex-simulator](https://developers.line.biz/flex-simulator/)

**ฟีเจอร์:**
- ออกแบบ Flex Message แบบ drag & drop
- Preview ผลลัพธ์แบบ real-time
- Export JSON code
- มี Showcase ตัวอย่าง Flex Message สำเร็จรูป

---

# Workshop: สร้าง Flex Message ด้วย ChatGPT

## แนวทาง:
1. ใช้ **ChatGPT** ช่วยออกแบบและเขียน JSON
2. ทดสอบใน **Flex Message Simulator**
3. ตรวจสอบข้อมูลให้ถูกต้อง

## สิ่งที่ต้องส่ง:
- JSON code ของ Flex Message
- Screenshot จากการทดสอบ

## การบ้าน:
- สร้าง Flex Message ใบเสร็จร้าน 7-Eleven
- แก้ไขปัญหาการแสดงผลภาษาไทย

