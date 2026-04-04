---
marp: true
theme: default
paginate: true
header: ''
footer: '**LINE Developer Tools** · Chapter 1: Introduction & Overview'
style: |
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@300;400;600;700&display=swap');
  :root {
    --line-green: #06C755;
    --line-dark: #1a1a2e;
    --line-light: #f8fdf9;
    --accent: #00B900;
  }
  section {
    font-family: 'Noto Sans Thai', 'Sarabun', sans-serif;
    background-color: #ffffff;
    color: #2d2d2d;
  }
  section::after {
    font-size: 0.6em;
    color: #999;
  }
  h1 {
    color: var(--line-green);
    font-weight: 700;
    border-bottom: 3px solid var(--line-green);
    padding-bottom: 0.2em;
  }
  h2 { color: var(--line-green); font-weight: 600; }
  h3 { color: #444; }
  table {
    font-size: 0.78em;
    border-collapse: separate;
    border-spacing: 0;
    width: 100%;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 1px 6px rgba(0,0,0,0.08);
  }
  th {
    background: linear-gradient(135deg, var(--line-green), var(--accent));
    color: white;
    font-weight: 600;
    padding: 10px 14px;
    text-align: left;
  }
  td {
    padding: 8px 14px;
    border-bottom: 1px solid #eee;
  }
  tr:nth-child(even) td { background-color: #f7fdf8; }
  tr:last-child td { border-bottom: none; }
  code {
    font-size: 0.82em;
    background-color: #e8f5e9;
    color: #2e7d32;
    padding: 2px 8px;
    border-radius: 4px;
  }
  pre {
    background: var(--line-dark);
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }
  pre code {
    background: transparent;
    color: #e0e0e0;
    padding: 0;
    font-size: 0.78em;
  }
  blockquote {
    border-left: 4px solid var(--line-green);
    background: linear-gradient(90deg, #f0faf2, transparent);
    padding: 12px 20px;
    margin: 16px 0;
    border-radius: 0 8px 8px 0;
    font-size: 0.88em;
  }
  blockquote strong { color: var(--line-green); }
  a { color: var(--line-green); text-decoration: none; font-weight: 600; }
  footer {
    font-size: 0.55em !important;
    color: #bbb !important;
  }
  section.cover {
    background: linear-gradient(135deg, #06C755 0%, #00B900 40%, #008C00 100%);
    color: white;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  section.cover h1 {
    color: white;
    border: none;
    font-size: 2.8em;
    text-shadow: 0 2px 8px rgba(0,0,0,0.2);
  }
  section.cover h2 {
    color: rgba(255,255,255,0.9);
    font-weight: 400;
    font-size: 1.3em;
    border: none;
  }
  section.cover footer { color: rgba(255,255,255,0.6) !important; }
  section.cover::after { color: rgba(255,255,255,0.5); }
  section.divider {
    background: linear-gradient(135deg, var(--line-dark) 0%, #16213e 100%);
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  section.divider h1 {
    color: var(--line-green);
    border: none;
    font-size: 2.4em;
  }
  section.divider h2 {
    color: rgba(255,255,255,0.7);
    font-weight: 300;
    font-size: 1.2em;
  }
  section.divider footer { color: rgba(255,255,255,0.3) !important; }
  section.divider::after { color: rgba(255,255,255,0.3); }
  .badge {
    display: inline-block;
    background: var(--line-green);
    color: white;
    padding: 2px 10px;
    border-radius: 12px;
    font-size: 0.75em;
    font-weight: 600;
  }
---

<!-- _class: cover -->
<!-- _paginate: false -->
<!-- _footer: '' -->

# LINE Developer Tools

## Chapter 1 · Introduction & Overview

![w:180](../assets/ch01-introduction/line-official-account-wordmark.svg)

---

# LINE Official Account

![bg right:35% w:400](../assets/ch01-introduction/line-oa-and-personal-compare.svg)

LINE Official Account เป็นแพลตฟอร์มที่ช่วยให้ธุรกิจหรือบุคคลสามารถ**สื่อสารและสร้างความสัมพันธ์**กับลูกค้าได้อย่างมีประสิทธิภาพผ่านแอปพลิเคชัน LINE

---

# Feature ของ LINE Official Account

| Feature | คำอธิบาย | API |
|---|---|:---:|
| **Broadcast Message** | ส่งข้อความไปยังผู้ติดตามทั้งหมดได้ในครั้งเดียว | Yes |
| **Auto Reply & Greeting** | ตอบกลับอัตโนมัติ และข้อความทักทาย | Yes |
| **Rich Menu** | เมนูด้านล่างหน้าจอแชท | Yes |
| **Rich Message & Video** | ข้อความผสมรูปภาพ / วิดีโอ | Yes |
| **Coupons & Loyalty** | คูปองและสะสมแต้ม | No |
| **Surveys & Polls** | แบบสอบถาม | No |
| **Analytics** | วิเคราะห์ข้อมูลเชิงสถิติ | Yes |

---

# Package ของ LINE Official Account

| | **Free** | **Basic** | **Pro** |
|---|:---:|:---:|:---:|
| ค่าบริการ / เดือน | **ฟรี** | **1,280** บาท | **1,780** บาท |
| ข้อความฟรี / เดือน | 300 | 15,000 | 35,000 |
| ข้อความเพิ่ม | ไม่ได้ | 0.10 บาท | 0.06 บาท |
| MyCustomer CRM | - | 369 บาท/เดือน | **ฟรี** |

> **หมายเหตุ:** ราคายังไม่รวม VAT 7% · อัปเดตตั้งแต่ 1 ส.ค. 2024

---

# ชนิดของบัญชี LINE Official Account

| โล่ | ประเภท | รายละเอียด | ค่าใช้จ่าย |
|:---:|---|---|---|
| สีเทา | **บัญชีทั่วไป** (Unverified) | ได้รับเมื่อเริ่มต้นใช้งาน | ฟรี |
| สีน้ำเงิน | **บัญชีรับรอง** (Verified) | ค้นหาได้ง่ายบน LINE & Search Engine | 888 บาท (ครั้งเดียว) |
| สีเขียว | **บัญชีพรีเมียม** (Premium) | สำหรับธุรกิจขนาดใหญ่ ใช้ Sponsor Sticker | มีค่าใช้จ่ายขั้นต่ำ |

**Premium ID** — เปลี่ยน Basic ID เป็นชื่อแบรนด์ **444 บาท/ปี** (iOS: 459 บาท)

---

<!-- _class: divider -->

# LINE Developers Services

## เครื่องมือสำหรับนักพัฒนา

---

# LINE Developers Services

![bg right:20% w:150](../assets/ch01-introduction/line-dev-logo.svg)

| บริการ | คำอธิบาย |
|---|---|
| **Messaging API** | สร้าง Chatbot ส่งและรับข้อความ |
| **LIFF** | สร้าง Web App ภายในแอป LINE |
| **LINE Login** | ระบบเข้าสู่ระบบผ่าน LINE |
| **LINE Pay** | ชำระเงินออนไลน์ |
| **LINE Beacon** | ส่งแจ้งเตือนเชิงพื้นที่ |
| **LINE Mini App** | Web App บน LINE (ใช้ LIFF) |
| **LON** | ส่งข้อความแจ้งเตือนด้วยเบอร์มือถือ |

---

# LINE URL Scheme

URL scheme สำหรับเปิดฟีเจอร์ต่างๆ ของ LINE

| URL Scheme | คำอธิบาย |
|---|---|
| `https://line.me/R/...` | เปิดฟีเจอร์ LINE app |
| `https://liff.line.me/...` | เปิด LIFF app |
| `https://miniapp.line.me/...` | เปิด LINE MINI App |

> **`line://` ถูก Deprecated แล้ว** — ใช้ `https://line.me/R/` แทนเสมอ

---

# LINE URL Scheme — ตัวอย่าง

```
# เปิดโปรไฟล์ OA
https://line.me/R/ti/p/@linedevelopers

# เปิดแชทพร้อมข้อความ
https://line.me/R/oaMessage/%40linedevelopers/?Hello

# แชร์ข้อความ
https://line.me/R/share?text=สวัสดี

# เปิด LIFF App
https://liff.line.me/{liffId}

# เปิดในเบราว์เซอร์ภายนอก
https://example.com/?openExternalBrowser=1
```

---

# LINE URL Scheme — หน้าจอทั่วไป

| URL Scheme | คำอธิบาย |
|---|---|
| `https://line.me/R/nv/chat` | เปิดแท็บแชท |
| `https://line.me/R/nv/camera/` | เปิดกล้อง |
| `https://line.me/R/nv/location/` | เปิดหน้าตำแหน่ง |
| `https://line.me/R/nv/settings` | เปิดหน้าตั้งค่า |
| `https://line.me/R/nv/stickerShop` | เปิด Sticker Shop |
| `https://line.me/R/nv/wallet` | เปิดแท็บ Wallet |
| `https://line.me/R/nv/addFriends` | เปิดหน้าเพิ่มเพื่อน |

---

# LINE API Status

![bg right:40% w:450](../assets/ch01-introduction/line-api-status-monitor-site.jpg)

ตรวจสอบสถานะ API ได้ที่ [api.line-status.info](https://api.line-status.info/)

**บริการที่ครอบคลุม:**
- Messaging API (API & Webhook)
- LINE Developers (Website & Console)
- LIFF
- LINE Login

> ยังไม่ครอบคลุม LINE MINI App และ LINE Pay

---

<!-- _class: divider -->

# Certified Provider

## Provider ที่ได้รับการรับรองจาก LINE

---

# Certified Provider

![bg right:30% w:250](../assets/ch01-introduction/certified-provider.webp)

Provider ที่ได้รับการรับรองจาก LINE — ได้รับสิทธิ์พิเศษ

| สิทธิพิเศษ | รายละเอียด |
|---|---|
| **Certified Badge** | แสดงในหน้า Consent สร้างความน่าเชื่อถือ |
| **Auto Check Add Bot** | ปุ่ม "Add friend" ถูกเลือกอัตโนมัติ |
| **Special API** | ใช้ `stay`, `profile+`, `mark-as-read` |

**วิธีสมัคร:** ส่งเอกสารบริษัท + Privacy Policy URL
ไปที่ `dl_api_th@linecorp.com` · ระยะเวลาพิจารณา ~10 วันทำการ

---

# Certified Provider vs Verified OA

| | **Certified Provider** | **Verified OA** |
|---|---|---|
| ระดับ | Provider | Channel (บัญชี) |
| สิทธิ์ | Special API, Badge | โล่สีน้ำเงิน, ค้นหาได้ |
| ต้องเป็น Verified OA? | ไม่จำเป็น | — |

> **FAQ:**
> Certified Provider สามารถใช้กับ OA ทุกแบบ (เทา / น้ำเงิน / เขียว)
> Certified = ระดับ **Provider** · Verified = ระดับ **Channel**
