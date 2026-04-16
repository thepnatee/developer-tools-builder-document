const path = require("path");
const fs = require("fs");
const T = require("../theme");

const ASSETS = path.resolve(__dirname, "../../assets/ch02-open-account");
const CHAPTER = "Chapter 2 · Open OA & Messaging API";

async function safeLoad(loader, filename, ...args) {
  const p = path.join(ASSETS, filename);
  if (!fs.existsSync(p)) return null;
  try { return await loader(p, ...args); }
  catch (e) { console.warn(`  ⚠ ${filename}: ${e.message}`); return null; }
}

async function build(pres, startPage = 1) {
  let page = startPage;

  const overview = await safeLoad(T.svgToPngBase64, "messaging-api-overview.svg", 1000);
  const sendImg = await safeLoad(T.imageToBase64, "messaging-api-send.png");
  const loginImg = await safeLoad(T.imageToBase64, "line-business-id-login.jpg");
  const formImg = await safeLoad(T.imageToBase64, "create-line-oa-unverified-form.jpg");

  // 1. Divider
  T.slideDivider(pres, {
    chapter: "CHAPTER 02",
    title: "Open LINE OA & Messaging API",
    subtitle: "การเปิด LINE Official Account + ทำความรู้จัก Messaging API",
  });
  page++;

  // 2. Steps: Open OA
  T.slideSteps(pres, {
    chapter: CHAPTER, page,
    label: "01 — ACCOUNT SETUP",
    title: "ขั้นตอนเปิด LINE Official Account",
    subtitle: "เริ่มจาก manager.line.biz ด้วย LINE Business ID",
    steps: [
      "เข้า manager.line.biz แล้ว Log in with LINE",
      "คลิก Create new และยืนยันด้วย SMS",
      "กรอกชื่อบัญชี, อีเมล, ประเทศ, ประเภทธุรกิจ",
      "เลือกประเทศที่ใช้บริการเป็น 'ไทย' (ถ้าให้บริการในไทย)",
      "เปิด Settings > Messaging API > Enable",
      "กรอกชื่อ Provider (ห้ามมีคำว่า LINE)",
    ],
    images: [loginImg && { data: loginImg }, formImg && { data: formImg }].filter(Boolean),
  });
  page++;

  // 3. Note: Provider & Channel
  T.slideNote(pres, {
    chapter: CHAPTER, page,
    label: "02 — HEADS UP",
    title: "Provider & Channel — สิ่งที่ต้องระวัง",
    subtitle: null,
    text: [
      "Channel ที่สร้างแล้วย้าย Provider ไม่ได้",
      "User ID จะต่างกันทุก Provider",
      "ควรสร้าง Messaging API และ LINE Login channel ภายใต้ Provider เดียวกัน",
    ],
  });
  page++;

  // 4. Table: Channel settings
  T.slideTable(pres, {
    chapter: CHAPTER, page,
    label: "03 — CHANNEL SETTINGS",
    title: "Channel Settings ที่ปรับแต่งได้",
    subtitle: "สิ่งที่ผู้ใช้เห็นในหน้าแชท / LIFF permission",
    rows: [
      ["Items", "แสดงที่ไหน"],
      ["Channel icon", "หน้าแชท LINE, ไอคอน LIFF app"],
      ["Channel name", "หน้าแชท LINE"],
      ["Channel description", "LIFF permission consent screen"],
      ["Privacy policy", "LIFF permission consent screen"],
      ["Terms of use", "LIFF permission consent screen"],
    ],
    colWidths: [4.5, 7.3],
  });
  page++;

  // 5. Intro: Messaging API
  T.slideIntro(pres, {
    chapter: CHAPTER, page,
    label: "04 — MESSAGING API",
    title: "LINE Messaging API คืออะไร?",
    subtitle: "API กลางเชื่อม Server ของเรากับ LINE OA",
    bullets: [
      "API กลางที่เชื่อม Server ของเรากับ LINE OA",
      "ใช้เขียน Chatbot ส่ง / รับข้อความแบบ 2 ทาง",
      "แยกเป็น 2 ส่วน: Webhook (รับ) + API (ส่ง)",
      "รองรับ 1-on-1, Group และ Multi-person chat",
    ],
    image: overview ? { data: overview } : null,
  });
  page++;

  // 6. Comparison: Reply vs Push
  T.slideComparison(pres, {
    chapter: CHAPTER, page,
    label: "05 — MESSAGE FLOW",
    title: "Reply vs Push",
    subtitle: "2-way vs 1-way communication",
    items: [
      {
        title: "Reply (2-way)",
        desc: "ตอบหลังรับ Webhook Event\nใช้ Reply Token — มีอายุจำกัด\nฟรี 1 message (สูงสุด 5 bubbles)\nเหมาะกับการตอบโต้คำถาม / trigger จาก user",
      },
      {
        title: "Push (1-way)",
        desc: "Server เราส่งข้อความเข้าหาผู้ใช้เอง\nหักโควตาตามจำนวนผู้รับ\nเหมาะกับการแจ้งเตือน / broadcast\nใช้ userId เป็นผู้รับ",
      },
    ],
  });
  page++;

  // 7. Table: Message types
  T.slideTable(pres, {
    chapter: CHAPTER, page,
    label: "06 — MESSAGE TYPES",
    title: "ประเภทข้อความที่ส่งได้",
    subtitle: "Message Types ของ LINE Messaging API",
    rows: [
      ["ประเภท", "รายละเอียด"],
      ["Text / Text V2", "ข้อความตัวอักษร + mention / emoji"],
      ["Sticker", "สติกเกอร์ LINE"],
      ["Image / Video / Audio", "ไฟล์ media ผ่าน HTTPS URL"],
      ["Location", "ตำแหน่งที่ตั้ง — title, address, lat/lng"],
      ["Template", "Buttons / Confirm / Carousel / Image Carousel"],
      ["Flex Message", "Layout กำหนดเองยืดหยุ่น (เหมือน Flexbox)"],
      ["Imagemap / Coupon", "รูปภาพกดได้ / คูปอง"],
    ],
    colWidths: [3.3, 8.5],
  });
  page++;

  // 8. Cards: Use Cases
  T.slideCards(pres, {
    chapter: CHAPTER, page,
    label: "07 — USE CASES",
    title: "Use Case ของ Messaging API",
    subtitle: "ตัวอย่างการใช้งาน",
    cards: [
      { title: "Reply / Push", desc: "ตอบ-ส่งข้อความหลายรูปแบบให้ user" },
      { title: "รับข้อมูลจาก user", desc: "รับรูป วิดีโอ เสียง และไฟล์" },
      { title: "Profile API", desc: "ดึงชื่อ รูป สถานะ ของผู้ใช้" },
      { title: "Group Chat", desc: "ใช้งานใน group + multi-person chat" },
      { title: "Rich Menu / Beacon", desc: "เมนูภาพ + ตอบตาม location" },
      { title: "Insight / Statistics", desc: "ดูจำนวนข้อความที่ส่ง-เปิดอ่าน" },
    ],
    cols: 3,
  });
  page++;

  // 9. Table: Channel Access Token
  T.slideTable(pres, {
    chapter: CHAPTER, page,
    label: "08 — ACCESS TOKEN",
    title: "Channel Access Token 4 ประเภท",
    subtitle: "เลือกประเภทให้เหมาะกับงาน",
    rows: [
      ["ประเภท", "อายุ", "จำนวน / Channel"],
      ["Channel Access Token v2.1 (แนะนำ)", "สูงสุด 30 วัน (กำหนดเอง)", "30"],
      ["Stateless", "15 นาที", "ไม่จำกัด (per-request)"],
      ["Short-Lived", "30 วัน", "30"],
      ["Long-Lived", "ไม่มีวันหมดอายุ", "1"],
    ],
    colWidths: [5.5, 3.8, 2.5],
    centerCols: [2],
    rowH: 0.7,
  });
  page++;

  // 10. Steps: Webhook URL setup
  T.slideSteps(pres, {
    chapter: CHAPTER, page,
    label: "09 — WEBHOOK SETUP",
    title: "การตั้งค่า Webhook URL",
    subtitle: "ผ่าน LINE Developers Console",
    steps: [
      "ต้องเป็น HTTPS + SSL/TLS จาก Public CA เท่านั้น",
      "Developers Console > Messaging API > Webhook URL > Edit",
      "คลิก Verify เพื่อทดสอบ (ต้องได้ Success)",
      "เปิดใช้งาน Use webhook",
      "แนะนำปิด Greeting & Auto-reply ใน OA Manager",
    ],
  });
  page++;

  // 11. Mixed: SDK + Pricing
  T.slideMixed(pres, {
    chapter: CHAPTER, page,
    label: "10 — SDK & PRICING",
    title: "LINE Bot SDK + ราคา",
    subtitle: "SDK อย่างเป็นทางการ และโครงสร้างราคา",
    bullets: [
      "SDK อย่างเป็นทางการ: Node.js, Python, Java, Go, PHP, Ruby",
      "เริ่มต้นใช้งาน Messaging API ฟรี",
      "จำนวนข้อความฟรีต่อเดือนขึ้นกับ Subscription Plan ของ OA",
      "แพ็กเกจต่างกันตามประเทศ / ภูมิภาค",
      "ค่าส่งข้อความเพิ่มเมื่อเกินโควตา — ดูตาราง Package ใน Ch.1",
    ],
  });
  page++;

  return page;
}

module.exports = { build, CHAPTER };
