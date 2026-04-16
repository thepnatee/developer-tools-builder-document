const path = require("path");
const fs = require("fs");
const T = require("../theme");

const ASSETS = path.resolve(__dirname, "../../assets/ch07-firebase-storage");
const CHAPTER = "Chapter 7 · Firebase Storage";

async function safeLoad(loader, filename, ...args) {
  const p = path.join(ASSETS, filename);
  if (!fs.existsSync(p)) return null;
  try { return await loader(p, ...args); }
  catch (e) { console.warn(`  ⚠ ${filename}: ${e.message}`); return null; }
}

async function build(pres, startPage = 1) {
  let page = startPage;

  const setupImg = await safeLoad(T.imageToBase64, "firebase-storage-setup.png");

  // 1. Divider
  T.slideDivider(pres, { chapter: "CHAPTER 07", title: "Firebase Storage", subtitle: "จัดเก็บไฟล์สำหรับ LINE Bot" });
  page++;

  // 2. Intro
  T.slideIntro(pres, {
    chapter: CHAPTER, page,
    label: "01 — WHAT",
    title: "Firebase Storage คืออะไร",
    subtitle: "Cloud storage สำหรับไฟล์ media",
    bullets: [
      "บริการ cloud storage จาก Google สำหรับเก็บรูป วิดีโอ ไฟล์",
      "Upload / Download ผ่าน SDK หรือ API",
      "Security Rules ควบคุมสิทธิ์การเข้าถึง",
      "ทำงานร่วมกับ Firebase Auth / Firestore / Functions",
    ],
    image: setupImg ? { data: setupImg } : null,
  });
  page++;

  // 3. Features
  T.slideFeatures(pres, {
    chapter: CHAPTER, page,
    label: "02 — FEATURES",
    title: "คุณสมบัติเด่น",
    subtitle: null,
    features: [
      { title: "Upload / Download", desc: "รองรับ client และ server SDK" },
      { title: "Security Rules", desc: "กำหนดสิทธิ์แบบ declarative" },
      { title: "Firebase Auth integration", desc: "ผูกกับ user login ได้" },
      { title: "Chunked upload", desc: "แบ่งไฟล์ใหญ่ให้ upload เสถียร" },
      { title: "CDN", desc: "ให้บริการผ่าน Google Cloud CDN" },
      { title: "Versioning", desc: "เก็บประวัติไฟล์ (เมื่อเปิดใช้)" },
    ],
    cols: 3,
  });
  page++;

  // 4. Table: Pricing
  T.slideTable(pres, {
    chapter: CHAPTER, page,
    label: "03 — PRICING",
    title: "ตารางราคา (Pricing)",
    subtitle: "Free tier และ Standard",
    rows: [
      ["รายการ", "Free Tier", "Standard"],
      ["Storage", "5 GB", "$0.026/GB (US), $0.020 (อื่นๆ)"],
      ["Download (egress)", "1 GB / เดือน", "$0.12/GB (US), $0.11 (Asia)"],
      ["Download → Google", "ฟรี", "ฟรี"],
      ["Upload", "ฟรี", "ฟรี"],
    ],
    colWidths: [3.8, 3.0, 5.0],
  });
  page++;

  // 5. Steps
  T.slideSteps(pres, {
    chapter: CHAPTER, page,
    label: "04 — SETUP",
    title: "เริ่มต้นใช้งาน",
    subtitle: null,
    steps: [
      "Firebase Console → เลือกโปรเจกต์",
      "เมนู Build → Storage → Get started",
      "เลือก Location (asia-southeast1 / asia-northeast1)",
      "เริ่มด้วย Rules Mode: Test / Production",
      "Upload ไฟล์ผ่าน SDK หรือ Console",
    ],
  });
  page++;

  // 6. Cards: Use cases with LINE Bot
  T.slideCards(pres, {
    chapter: CHAPTER, page,
    label: "05 — USE CASES",
    title: "Use Case กับ LINE Bot",
    subtitle: null,
    cards: [
      { title: "รับไฟล์จากผู้ใช้", desc: "รูป / วิดีโอที่ส่งใน LINE → save ลง Storage" },
      { title: "Host image URL", desc: "ใช้เป็น originalContentUrl ของ image message" },
      { title: "Rich Menu Assets", desc: "เก็บ background ของ rich menu" },
      { title: "Receipt / Report PDF", desc: "เก็บไฟล์ แล้วส่ง public URL ให้ผู้ใช้" },
    ],
    cols: 2,
  });
  page++;

  // 7. Code: Security Rules
  T.slideCode(pres, {
    chapter: CHAPTER, page,
    label: "06 — SECURITY RULES",
    title: "Security Rules — ตัวอย่าง",
    subtitle: "ควบคุมสิทธิ์การอ่าน / เขียนของแต่ละ user",
    code:
`rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /users/{userId}/{file=**} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == userId;
    }
  }
}`,
  });
  page++;

  return page;
}

module.exports = { build, CHAPTER };
