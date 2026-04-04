---
marp: true
theme: default
paginate: true
footer: '**LINE Developer Tools** · Chapter 2: Open LINE OA & Messaging API'
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

## Chapter 2 · Open LINE OA & Messaging API

---

# ขั้นตอนสร้าง LINE Official Account

![bg right:35% w:400](../assets/ch02-open-account/line-business-id-login.jpg)

1. ไปที่ [manager.line.biz](https://manager.line.biz)
2. เข้าสู่ระบบด้วย LINE Account
3. คลิก **"Create new"** ที่แถบเมนูด้านซ้าย
4. กรอกข้อมูล:
   - ชื่อบัญชี (สูงสุด 20 ตัวอักษร)
   - อีเมล
   - ประเทศที่ตั้งบริษัท (ต้องเป็น **ไทย**)
   - ชื่อบริษัท / ธุรกิจ
   - ประเภทธุรกิจ

---

# เชื่อมต่อ LINE OA กับ Messaging API

1. คลิกที่ LINE OA ที่สร้างขึ้น > **Settings**
2. คลิก **Messaging API** > **Enable Messaging API**
3. กรอกชื่อ **Provider** (ห้ามมีคำว่า LINE)
4. คลิก **Agree** ยืนยัน

> **สำคัญ:** หลังเชื่อม Provider แล้ว **ไม่สามารถย้าย Channel** ไป Provider อื่นได้

---

# ข้อควรระวัง Channel & Provider

- **User ID จะแตกต่างกัน** สำหรับแต่ละ Provider
- ไม่สามารถใช้ User ID ระบุผู้ใช้ข้าม Provider ได้
- Messaging API channel + LINE Login channel ควรอยู่ภายใต้ **Provider เดียวกัน**

> เลือก Provider ให้ถูกต้องตั้งแต่แรก เพราะ**ย้ายไม่ได้**ในภายหลัง

---

<!-- _class: divider -->

# LINE Messaging API

## API สำหรับเชื่อมต่อ Server กับ LINE OA

---

# LINE Messaging API คืออะไร?

![bg right:35% w:400](../assets/ch02-open-account/messaging-api-overview.svg)

API ที่เชื่อมต่อ Server ของเรากับ LINE Official Account

**ทำให้เราสามารถ:**
- เขียนโปรแกรมสร้างบริการ
- ส่งข้อความและโต้ตอบกับผู้ใช้
- สร้าง Chatbot ได้

---

# สถาปัตยกรรม Messaging API

![bg right:35% w:400](../assets/ch02-open-account/messaging-api-send.png)

### Webhook (รับข้อมูล)
ผู้ใช้ส่งข้อความ > LINE Server > Webhook Event > **Server ของเรา**

### API (ส่งข้อมูล)

| ประเภท | คำอธิบาย | ค่าใช้จ่าย |
|---|---|:---:|
| **Reply** | ตอบกลับด้วย Reply Token (สูงสุด 5 Bubbles) | ฟรี |
| **Push** | ส่งข้อความเมื่อไหร่ก็ได้ | หักโควต้า |

---

# ประเภทข้อความที่รองรับ

| ประเภท | รายละเอียด |
|---|---|
| **Text** | ข้อความตัวอักษร |
| **Sticker** | สติกเกอร์ |
| **Image / Video / Audio** | สื่อมัลติมีเดีย |
| **Location** | ตำแหน่งที่ตั้ง |
| **Imagemap** | รูปภาพที่กดได้ |
| **Template** | ข้อความเทมเพลต (ปุ่มกด, ยืนยัน, แคโรเซล) |
| **Flex Message** | ข้อความ layout กำหนดเอง |

---

# Channel Access Token

![bg right:30% w:350](../assets/ch05-messages/channel-access-token.png)

Token ที่ใช้ยืนยันการเข้าถึง LINE Messaging API

| ประเภท | อายุ | จำนวน / Channel |
|---|---|---|
| **v2.1** | สูงสุด 30 วัน | 30 |
| **Stateless** | 15 นาที | ไม่จำกัด |
| **Short-lived** | 30 วัน | 30 |
| **Long-lived** | ไม่หมดอายุ | 1 |

> แนะนำใช้ **v2.1** หรือ **Stateless** เพื่อความปลอดภัย

---

# ตั้งค่า Webhook URL

**ข้อกำหนด:**
- ต้องใช้ **HTTPS** เท่านั้น
- ต้องมี SSL/TLS certificate จาก CA ที่น่าเชื่อถือ
- **ห้ามใช้** Self-signed certificate

**ขั้นตอน:**
1. เข้า LINE Developers Console > เลือก Channel
2. แท็บ Messaging API > Edit Webhook URL
3. กรอก URL > Update > Verify
4. เปิดใช้ **Use webhook**

---

# Greeting & Auto-reply Messages

เมื่อสร้าง Messaging API channel ใหม่:
- Greeting messages = **Enabled** (ค่าเริ่มต้น)
- Auto-reply messages = **Enabled** (ค่าเริ่มต้น)

> **แนะนำ:** ปิดทั้งสองอย่างใน LINE OA Manager
> เพื่อหลีกเลี่ยงข้อความซ้ำซ้อนกับ Messaging API Bot
