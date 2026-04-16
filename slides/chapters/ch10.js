const path = require("path");
const fs = require("fs");
const T = require("../theme");

const ASSETS = path.resolve(__dirname, "../../assets/ch10-mini-app");
const CHAPTER = "Chapter 10 · LINE MINI App";

async function safeLoad(loader, filename, ...args) {
  const p = path.join(ASSETS, filename);
  if (!fs.existsSync(p)) return null;
  try { return await loader(p, ...args); }
  catch (e) { console.warn(`  ⚠ ${filename}: ${e.message}`); return null; }
}

async function build(pres, startPage = 1) {
  let page = startPage;

  const introImg = await safeLoad(T.imageToBase64, "intro-vdo-thumbnails.jpg");
  const createTypeImg = await safeLoad(T.imageToBase64, "console-create-type-select.jpg");
  const createImg = await safeLoad(T.imageToBase64, "console-create-line-mini-app.jpg");
  const envImg = await safeLoad(T.imageToBase64, "line-mini-app-channel-env.jpg");
  const customPathImg = await safeLoad(T.imageToBase64, "line-mini-app-custom-path.png");
  const serviceImg = await safeLoad(T.imageToBase64, "mini_service_notifier_th.jpg");

  // 1. Divider
  T.slideDivider(pres, { chapter: "CHAPTER 10", title: "LINE MINI App", subtitle: "รุ่นใหม่ของ LIFF — แนะนำให้เริ่มใช้กับ project ใหม่" });
  page++;

  // 2. Intro
  T.slideIntro(pres, {
    chapter: CHAPTER, page,
    label: "01 — WHAT",
    title: "LINE MINI App คืออะไร",
    subtitle: null,
    bullets: [
      "แพลตฟอร์ม Web App ใน LINE — รุ่นต่อของ LIFF",
      "ปัจจุบันสร้างเองได้ไม่ต้องยื่นเอกสาร (global) — ไทยตามมา",
      "LIFF จะถูกรวมเข้ากับ MINI App ในอนาคต",
      "แนะนำ: ถ้าเริ่มใหม่ ให้ทำเป็น LINE MINI App เลย",
    ],
    image: introImg ? { data: introImg } : null,
  });
  page++;

  // 3. Table: Verified vs Unverified
  T.slideTable(pres, {
    chapter: CHAPTER, page,
    label: "02 — VERIFIED vs UNVERIFIED",
    title: "Verified vs Unverified MINI App",
    subtitle: "ฟีเจอร์ที่ต่างกัน",
    rows: [
      ["ฟีเจอร์", "Verified", "Unverified"],
      ["LIFF capabilities", "Yes", "Yes"],
      ["Browser (Oct 2025+)", "Yes", "Yes"],
      ["Custom Path URL", "Yes", "No"],
      ["Service Message", "Yes", "No"],
      ["Add to Home Screen", "Yes", "No"],
      ["LINE Search + Recent services", "Yes", "No"],
      ["Module Mode (ซ่อน Action Button)", "Yes", "No"],
    ],
    colWidths: [6.0, 2.8, 3.0],
    centerCols: [1, 2],
  });
  page++;

  // 4. Steps: Create channel
  T.slideSteps(pres, {
    chapter: CHAPTER, page,
    label: "03 — SETUP",
    title: "สร้าง LINE MINI App Channel",
    subtitle: null,
    steps: [
      "Developers Console → Create channel → LINE MINI App",
      "เลือกประเทศ: Thailand + อัปโหลด icon 1:1",
      "กรอกชื่อ, คำอธิบาย, อีเมล, Terms of use URL",
      "กด Create → ได้ 3 environments",
      "Developing / Review / Published",
    ],
    images: [createTypeImg, createImg].filter(Boolean).map(d => ({ data: d })),
  });
  page++;

  // 5. Intro: 3 environments (with image)
  T.slideIntro(pres, {
    chapter: CHAPTER, page,
    label: "04 — ENVIRONMENTS",
    title: "3 Environments ของ MINI App",
    subtitle: "แยก stage การพัฒนา",
    bullets: [
      "Developing — Members ที่ role Tester ขึ้นไป",
      "Review — ทีมตรวจสอบจาก LINE",
      "Published — ผู้ใช้ทั่วไปเข้าถึงได้",
    ],
    image: envImg ? { data: envImg } : null,
  });
  page++;

  // 6. Mixed: Custom Path
  T.slideIntro(pres, {
    chapter: CHAPTER, page,
    label: "05 — CUSTOM PATH",
    title: "Custom Path — URL ที่กำหนดเอง",
    subtitle: "ไม่ต้องใช้ LIFF ID สุ่ม",
    bullets: [
      "เฉพาะ Verified MINI App เท่านั้น",
      "แทน LIFF ID สุ่ม: miniapp.line.me/cony_coffee",
      "4–29 ตัวอักษร, a-z / 0-9 / _, ห้ามเริ่ม / จบด้วย _",
      "ตั้งแล้วเปลี่ยนไม่ได้ — URL เดิมยังใช้ได้",
      "ประเทศไทย: ติดต่อ LINE Sales",
    ],
    image: customPathImg ? { data: customPathImg } : null,
  });
  page++;

  // 7. Code: Permanent Link
  T.slideCode(pres, {
    chapter: CHAPTER, page,
    label: "06 — PERMANENT LINK",
    title: "Permanent Link",
    subtitle: "รูปแบบ URL ที่ถาวรของ MINI App",
    code:
`LIFF URL:            https://miniapp.line.me/123456-abcedfg
Page URL:            https://example.com/shop?search=shoes#item10
Endpoint URL:        https://example.com

Permanent Link:
https://miniapp.line.me/123456-abcedfg/shop?search=shoes#item10`,
  });
  page++;

  // 8. Mixed: Service Message
  T.slideIntro(pres, {
    chapter: CHAPTER, page,
    label: "07 — SERVICE MESSAGE",
    title: "Service Message — คืออะไร",
    subtitle: null,
    bullets: [
      "ข้อความแจ้งเตือนหลังการกระทำของผู้ใช้บน MINI App",
      "ส่งผ่าน OA กลางชื่อ 'LINE MINI App Notice'",
      "ห้ามส่งโปรโมชัน / ส่วนลด / ข้อความโฆษณา",
      "Verified เท่านั้น (Published) — Developing ทดสอบได้",
      "Template สูงสุด 20 ต่อ channel, รองรับ 6 ภาษา",
    ],
    image: serviceImg ? { data: serviceImg } : null,
  });
  page++;

  // 9. Mixed: Service Notification Token
  T.slideMixed(pres, {
    chapter: CHAPTER, page,
    label: "08 — NOTIFICATION TOKEN",
    title: "Service Notification Token",
    subtitle: null,
    bullets: [
      "ใช้ LIFF Access Token (จากผู้ใช้) + Channel Access Token ในการ issue",
      "อายุ 1 ปี, ส่งได้สูงสุด 5 ครั้งต่อ token",
      "เมื่อส่งแล้วจะได้ token ใหม่ใน response — เก็บใช้ครั้งถัดไป",
      "Channel ต้องใช้ Stateless หรือ Short-lived token เท่านั้น",
    ],
  });
  page++;

  // 10. Code: Service Message flow
  T.slideCode(pres, {
    chapter: CHAPTER, page,
    label: "09 — SERVICE FLOW",
    title: "ส่ง Service Message — Flow",
    subtitle: null,
    code:
`// 1) User action → ส่ง LIFF Access Token เข้า backend
// 2) Issue Service Notification Token
POST https://api.line.me/message/v3/notifier/token
Authorization: Bearer {channel access token}
{ "liffAccessToken": "..." }

// 3) ส่งข้อความ
POST https://api.line.me/v2/bot/message/push
{
  "templateName": "join_d_m_th",
  "params": { "point": "100 พอยท์" },
  "notificationToken": "..."
}`,
  });
  page++;

  // 11. Code: Add to Home Screen
  T.slideCode(pres, {
    chapter: CHAPTER, page,
    label: "10 — SHORTCUT",
    title: "Add to Home Screen",
    subtitle: "สร้าง shortcut ให้ MINI App บนหน้าโฮมมือถือ",
    code:
`// ทำงานใน Unverified (Developing) ได้เพื่อทดสอบ
// Verified เท่านั้นสำหรับ Production

if (liff.isApiAvailable('createShortcutOnHomeScreen')) {
  liff.createShortcutOnHomeScreen({
    url: '<<MINI App URL>>'  // LIFF URL / Permanent link / Endpoint URL
  });
}`,
  });
  page++;

  return page;
}

module.exports = { build, CHAPTER };
