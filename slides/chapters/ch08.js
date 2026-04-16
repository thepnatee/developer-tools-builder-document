const path = require("path");
const fs = require("fs");
const T = require("../theme");

const ASSETS = path.resolve(__dirname, "../../assets/ch08-rich-menu");
const CHAPTER = "Chapter 8 · Rich Menu";

async function safeLoad(loader, filename, ...args) {
  const p = path.join(ASSETS, filename);
  if (!fs.existsSync(p)) return null;
  try { return await loader(p, ...args); }
  catch (e) { console.warn(`  ⚠ ${filename}: ${e.message}`); return null; }
}

async function build(pres, startPage = 1) {
  let page = startPage;

  const step1 = await safeLoad(T.imageToBase64, "rich-menu-step1.png");
  const step2 = await safeLoad(T.imageToBase64, "rich-menu-step2.png");
  const step3 = await safeLoad(T.imageToBase64, "rich-menu-step3.png");

  // 1. Divider
  T.slideDivider(pres, { chapter: "CHAPTER 08", title: "Rich Menu", subtitle: "เมนูภาพด้านล่างหน้าแชท" });
  page++;

  // 2. Intro
  T.slideIntro(pres, {
    chapter: CHAPTER, page,
    label: "01 — WHAT",
    title: "Rich Menu คืออะไร",
    subtitle: null,
    bullets: [
      "เมนูภาพที่อยู่ด้านล่างหน้าจอแชท",
      "รองรับเฉพาะมือถือ — LINE for PC ไม่แสดง",
      "ประกอบจาก Image + Tappable Areas + Chat Bar",
    ],
  });
  page++;

  // 3. Comparison
  T.slideComparison(pres, {
    chapter: CHAPTER, page,
    label: "02 — MANAGER vs API",
    title: "OA Manager vs Messaging API",
    subtitle: "สร้างได้ 2 ช่องทาง — แต่ละแบบเหมาะกับงานต่างกัน",
    items: [
      { title: "LINE OA Manager", desc: "GUI ง่าย\nตั้งเวลาได้\nดูสถิติได้\nไม่ต้องเขียนโค้ด\nเหมาะกับ Marketing / ทีม non-tech" },
      { title: "Messaging API", desc: "Custom สูงมาก\nตั้ง Postback / Datetimepicker / Switch ได้\nควบคุมทุกพื้นที่\nไม่มีสถิติ\nเหมาะกับ Developer" },
    ],
  });
  page++;

  // 4. Features
  T.slideFeatures(pres, {
    chapter: CHAPTER, page,
    label: "03 — FEATURES",
    title: "ฟีเจอร์หลักของ Rich Menu",
    subtitle: null,
    features: [
      { title: "Layout flexible", desc: "กำหนดขนาดและจำนวนปุ่มอิสระ" },
      { title: "Switch Action", desc: "สลับระหว่างหลายหน้าเมนู" },
      { title: "Actions", desc: "URI, Message, Postback, Datetime" },
      { title: "Segment", desc: "แสดงตามกลุ่มเป้าหมาย" },
      { title: "Per-user menu", desc: "กำหนดเฉพาะรายบุคคล (Messaging API)" },
      { title: "Default menu", desc: "สำหรับผู้ใช้ทุกคน" },
    ],
    cols: 3,
  });
  page++;

  // 5. Table: Image requirements
  T.slideTable(pres, {
    chapter: CHAPTER, page,
    label: "04 — IMAGE SPEC",
    title: "ข้อกำหนดภาพ Rich Menu",
    subtitle: null,
    rows: [
      ["รายการ", "ข้อกำหนด"],
      ["Format", "JPEG หรือ PNG"],
      ["Width", "800 – 2500 pixels"],
      ["Height", "≥ 250 pixels"],
      ["Aspect ratio (w / h)", "≥ 1.45"],
      ["Max file size", "1 MB"],
      ["Full / Half menu", "2500×1686 / 2500×843"],
      ["Areas ต่อเมนู", "สูงสุด 20 พื้นที่"],
    ],
    colWidths: [4.0, 7.8],
  });
  page++;

  // 6. Steps: Priority
  T.slideSteps(pres, {
    chapter: CHAPTER, page,
    label: "05 — PRIORITY",
    title: "Priority การแสดงผล",
    subtitle: "ลำดับความสำคัญเมื่อมีหลาย rich menu",
    steps: [
      "Per-user rich menu (Messaging API) — สูงสุด",
      "Default rich menu (Messaging API)",
      "Default rich menu (LINE OA Manager) — ต่ำสุด",
    ],
  });
  page++;

  // 7. Steps: Create via OA Manager
  T.slideSteps(pres, {
    chapter: CHAPTER, page,
    label: "06 — OA MANAGER",
    title: "สร้าง Rich Menu ผ่าน OA Manager",
    subtitle: null,
    steps: [
      "เข้า manager.line.biz → เลือก OA → Rich Menu",
      "Create New → ตั้งชื่อและช่วงเวลาแสดง",
      "เลือก Template Full / Half → Upload Image",
      "ตั้ง Action แต่ละพื้นที่ (URI / Message / ...)",
      "Save และทดสอบในแอป LINE",
    ],
    images: [step1, step2, step3].filter(Boolean).map(d => ({ data: d })),
  });
  page++;

  // 8. Code: Create via API
  T.slideCode(pres, {
    chapter: CHAPTER, page,
    label: "07 — MESSAGING API",
    title: "สร้าง Rich Menu ผ่าน Messaging API",
    subtitle: "4 requests — สร้าง + upload + set default + link user",
    code:
`# 1. Create rich menu (max 20 areas)
POST /v2/bot/richmenu

# 2. Upload image (api-data.line.me)
POST /v2/bot/richmenu/{richMenuId}/content

# 3. Set as default
POST /v2/bot/user/all/richmenu/{richMenuId}

# 4. Link per-user
POST /v2/bot/user/{userId}/richmenu/{richMenuId}

# Rate limit: 100 req / hour`,
  });
  page++;

  // 9. Comparison: Switch Action
  T.slideComparison(pres, {
    chapter: CHAPTER, page,
    label: "08 — SWITCH ACTION",
    title: "Rich Menu Switch Action (ใหม่)",
    subtitle: "สลับเมนูได้โดยไม่ต้อง round-trip กับ server",
    items: [
      { title: "วิธีเดิม (4 requests)", desc: "User tap → LINE → Webhook → Bot → LINE → เปลี่ยนเมนู\nช้า / ใช้ quota มาก" },
      { title: "Switch Action (2 requests)", desc: "User tap → LINE เปลี่ยนเมนูให้เลย\nเร็ว / ไม่กิน webhook" },
    ],
  });
  page++;

  // 10. Table: Troubleshooting
  T.slideTable(pres, {
    chapter: CHAPTER, page,
    label: "09 — TROUBLESHOOTING",
    title: "ปัญหาที่พบบ่อย + วิธีแก้",
    subtitle: null,
    rows: [
      ["ปัญหา", "วิธีแก้"],
      ["ไม่แสดงบน PC", "Rich Menu ไม่รองรับ PC"],
      ["ไม่อัปเดตทันที", "Default menu ใช้เวลาสูงสุด 1 นาที + ต้องเปิดแชทใหม่"],
      ["ลบแล้วยังเห็น", "ต้อง unlink user ก่อนลบ per-user menu"],
      ["Link user ไม่ได้", "user ต้องเป็นเพื่อน OA ก่อน"],
      ["ดูสถิติไม่ได้", "Messaging API ไม่มีสถิติ — ใช้ OA Manager แทน"],
    ],
    colWidths: [3.8, 8.0],
  });
  page++;

  return page;
}

module.exports = { build, CHAPTER };
