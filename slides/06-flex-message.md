---
marp: true
theme: default
paginate: true
footer: '**LINE Developer Tools** · Chapter 6: Flex Message'
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

## Chapter 6 · Flex Message

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

# โครงสร้าง Flex Message — 3 ชั้น

### 1. Container
- **Bubble** — กล่องข้อความเดี่ยว
- **Carousel** — หลาย bubble เลื่อนดูได้ (สูงสุด **12**)

### 2. Block (ภายใน Bubble)
- **Header** — ส่วนหัว
- **Hero** — รูปภาพหลัก
- **Body** — เนื้อหาหลัก
- **Footer** — ส่วนท้าย

### 3. Component (ภายใน Block)
button · icon · image · video · text · span · box · separator · spacer

---

# Flex Message — ตัวอย่างโครงสร้าง

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

### Bubble
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

### Carousel
```json
{
  "type": "carousel",
  "contents": [
    { "type": "bubble", ... },
    { "type": "bubble", ... }
  ]
}
```

> Bubble sizes: `nano` · `micro` · `deca` · `hecto` · `kilo` · `mega` · `giga`

---

<!-- _class: divider -->

# Components

## องค์ประกอบของ Flex Message

---

# Component — Box Layout

Box เป็น component หลักที่ใช้จัด layout

| Layout | คำอธิบาย |
|---|---|
| `horizontal` | เรียงซ้ายไปขวา |
| `vertical` | เรียงบนลงล่าง |
| `baseline` | เรียงตาม baseline ของข้อความ |

**Properties สำคัญ:**
- `spacing` — ระยะห่างระหว่าง component
- `margin` — ระยะห่างด้านนอก
- `paddingAll` / `paddingTop` / ... — padding
- `backgroundColor` — สีพื้นหลัง
- `cornerRadius` — มุมโค้ง

---

# Component — Text & Image

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

# Component — Button & Separator

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

> Button styles: `primary` (สีเต็ม) · `secondary` (สีอ่อน) · `link` (ข้อความ)

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

### แนวทาง:
1. ใช้ **ChatGPT** ช่วยออกแบบและเขียน JSON
2. ทดสอบใน **Flex Message Simulator**
3. ตรวจสอบข้อมูลให้ถูกต้อง

### สิ่งที่ต้องส่ง:
- JSON code ของ Flex Message
- Screenshot จากการทดสอบ

### การบ้าน:
- สร้าง Flex Message ใบเสร็จร้าน 7-Eleven
- แก้ไขปัญหาการแสดงผลภาษาไทย
