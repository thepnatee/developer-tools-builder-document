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
## Chapter 8: Rich Menu

---

# Rich Menu คืออะไร?

เมนูแบบรูปภาพที่แสดงด้านล่างหน้าจอแชท

**คุณสมบัติ:**
- ออกแบบ Layout ได้อิสระ
- รองรับ Switch Action (สลับหน้าเมนู)
- รองรับ Action: URI, message, postback, datetime picker
- ตั้งค่าต่าง Rich Menu ต่าง user ได้

**เครื่องมือสร้าง:**
- **LINE OA Manager** - GUI สะดวก ทำได้เร็ว
- **Messaging API** - ปรับแต่งขั้นสูง, postback, สลับเมนู

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

**ขั้นตอน:**

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

# Rich Menu Switch Action

## วิธีเดิม (4 requests)
1. User กดปุ่ม Rich Menu
2. LINE Server รับ > ส่ง webhook ไป Bot
3. Bot ประมวลผล > request เปลี่ยนเมนู
4. LINE Server เปลี่ยนเมนูให้ User

## วิธีใหม่ - Switch Action (2 requests)
1. User กดปุ่ม Rich Menu
2. LINE Server **เปลี่ยนเมนูทันที!**

> ไม่ต้องผ่าน Bot Server = เร็วกว่ามาก

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

# Rich Menu - การลบ

**ขั้นตอนการลบ (ต้องทำตามลำดับ):**

1. ยกเลิก Default Rich Menu
```bash
DELETE https://api.line.me/v2/bot/user/all/richmenu
```

2. ลบ Rich Menu Alias
```bash
DELETE https://api.line.me/v2/bot/richmenu/alias/{richMenuAliasId}
```

3. ลบ Rich Menu
```bash
DELETE https://api.line.me/v2/bot/richmenu/{richMenuId}
```

---

# Rich Menu - Troubleshooting

| ปัญหา | สาเหตุ/แก้ไข |
|---|---|
| ไม่แสดงบน PC | Rich Menu บางรูปแบบไม่รองรับ PC |
| แสดงช้า | รอ cache refresh หรือปิดเปิดแอป |
| ลบไม่ได้ | ต้องยกเลิก default และ alias ก่อน |
| Link ไม่ได้ | ตรวจสอบ richMenuId ถูกต้อง |
| เมนูซ้อนกัน | ตรวจสอบว่าไม่มีทั้ง OA Manager + API |

> **สำคัญ:** ถ้าใช้ Messaging API สร้าง Rich Menu
> อย่าใช้ OA Manager จัดการเมนูเดียวกัน

