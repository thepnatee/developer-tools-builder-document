---
marp: true
theme: default
paginate: true
footer: '**LINE Developer Tools** · Chapter 8: Rich Menu'
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

## Chapter 8 · Rich Menu

---

# Rich Menu คืออะไร?

เมนูแบบรูปภาพที่แสดงด้านล่างหน้าจอแชท

**คุณสมบัติ:**
- ออกแบบ Layout ได้อิสระ
- รองรับ Switch Action (สลับหน้าเมนู)
- รองรับ Action: URI, message, postback, datetime picker
- ตั้งค่าต่าง Rich Menu ต่าง user ได้

**เครื่องมือสร้าง:**

| เครื่องมือ | ข้อดี |
|---|---|
| **LINE OA Manager** | GUI สะดวก ทำได้เร็ว |
| **Messaging API** | ปรับแต่งขั้นสูง, postback, สลับเมนู |

---

# สร้าง Rich Menu ผ่าน OA Manager

1. เข้า LINE Official Account Manager
2. คลิก **Rich Menu** > **Create New**
3. ตั้งชื่อและกำหนดเวลาแสดงผล
4. เลือก Template (เต็มจอ / ครึ่งจอ)
5. อัปโหลดรูปพื้นหลัง
   - เต็มจอ: **2500 x 1686 px**
   - ครึ่งจอ: **2500 x 843 px**
6. กำหนด Tap Area และ Action
7. บันทึกและทดสอบ

---

# สร้าง Rich Menu ผ่าน Messaging API

```bash
# 1. สร้าง Rich Menu
POST https://api.line.me/v2/bot/richmenu

# 2. อัปโหลดรูปภาพ
POST https://api-data.line.me/v2/bot/richmenu/{richMenuId}/content

# 3. ตั้งเป็น Default Rich Menu
POST https://api.line.me/v2/bot/user/all/richmenu/{richMenuId}
```

**ตั้งค่าแยกต่อผู้ใช้:**
```bash
# Link Rich Menu กับ User
POST https://api.line.me/v2/bot/user/{userId}/richmenu/{richMenuId}
```

---

<!-- _class: divider -->

# Rich Menu Switch Action

## สลับหน้าเมนูแบบไม่ต้องผ่าน Bot

---

# Rich Menu Switch Action

### วิธีเดิม (4 requests)
1. User กดปุ่ม Rich Menu
2. LINE Server รับ > ส่ง webhook ไป Bot
3. Bot ประมวลผล > request เปลี่ยนเมนู
4. LINE Server เปลี่ยนเมนูให้ User

### วิธีใหม่ — Switch Action (2 requests)
1. User กดปุ่ม Rich Menu
2. LINE Server **เปลี่ยนเมนูทันที!**

> ไม่ต้องผ่าน Bot Server = **เร็วกว่ามาก**

---

# Workshop: Rich Menu Switch Action

**ขั้นตอน:**
1. เตรียมรูป Rich Menu A และ B
2. สร้าง Rich Menu A พร้อม switch action ไป Menu B
3. อัปโหลดรูปสำหรับ Menu A
4. สร้าง Rich Menu B พร้อม switch action ไป Menu A
5. อัปโหลดรูปสำหรับ Menu B
6. ตั้ง Rich Menu A เป็น Default
7. สร้าง Alias สำหรับ Menu A
8. สร้าง Alias สำหรับ Menu B

---

# Rich Menu — การลบ

**ขั้นตอนการลบ (ต้องทำตามลำดับ):**

```bash
# 1. ยกเลิก Default Rich Menu
DELETE https://api.line.me/v2/bot/user/all/richmenu

# 2. ลบ Rich Menu Alias
DELETE https://api.line.me/v2/bot/richmenu/alias/{richMenuAliasId}

# 3. ลบ Rich Menu
DELETE https://api.line.me/v2/bot/richmenu/{richMenuId}
```

---

# Rich Menu — Troubleshooting

| ปัญหา | สาเหตุ / แก้ไข |
|---|---|
| ไม่แสดงบน PC | Rich Menu บางรูปแบบไม่รองรับ PC |
| แสดงช้า | รอ cache refresh หรือปิดเปิดแอป |
| ลบไม่ได้ | ต้องยกเลิก default และ alias ก่อน |
| Link ไม่ได้ | ตรวจสอบ richMenuId ถูกต้อง |
| เมนูซ้อนกัน | ตรวจสอบว่าไม่มีทั้ง OA Manager + API |

> **สำคัญ:** ถ้าใช้ Messaging API สร้าง Rich Menu
> อย่าใช้ OA Manager จัดการเมนูเดียวกัน
