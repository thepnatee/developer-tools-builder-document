const path = require("path");
const fs = require("fs");
const T = require("../theme");

const ASSETS = path.resolve(__dirname, "../../assets/ch09-liff");
const CHAPTER = "Chapter 9 · LIFF (LINE Front-end Framework)";

async function safeLoad(loader, filename, ...args) {
  const p = path.join(ASSETS, filename);
  if (!fs.existsSync(p)) return null;
  try { return await loader(p, ...args); }
  catch (e) { console.warn(`  ⚠ ${filename}: ${e.message}`); return null; }
}

async function build(pres, startPage = 1) {
  let page = startPage;

  const envImg = await safeLoad(T.imageToBase64, "liff-environment.jpg");
  const profile1 = await safeLoad(T.imageToBase64, "liff-profile-1.png");
  const overview1 = await safeLoad(T.imageToBase64, "liff-overview-1.png");
  const overview5 = await safeLoad(T.imageToBase64, "liff-overview-5.png");
  const overview6 = await safeLoad(T.imageToBase64, "liff-overview-6.png");
  const friend1 = await safeLoad(T.imageToBase64, "liff-friendship-1.png");

  // 1. Divider
  T.slideDivider(pres, { chapter: "CHAPTER 09", title: "LIFF", subtitle: "LINE Front-end Framework — สร้าง Web App ในห้องแชท LINE" });
  page++;

  // 2. Intro
  T.slideIntro(pres, {
    chapter: CHAPTER, page,
    label: "01 — WHAT",
    title: "LIFF คืออะไร",
    subtitle: null,
    bullets: [
      "LINE Front-end Framework — สร้างเว็บในห้องแชท LINE",
      "เข้าถึงข้อมูลผู้ใช้ได้โดยไม่ต้อง login เอง (userId, displayName, pictureUrl, email)",
      "ส่งข้อความในนามผู้ใช้ (sendMessages, shareTargetPicker)",
      "ใช้บน LIFF Browser ใน LINE และ External Browser",
    ],
    image: overview1 ? { data: overview1 } : null,
  });
  page++;

  // 3. Comparison: LIFF sizes
  T.slideComparison(pres, {
    chapter: CHAPTER, page,
    label: "02 — SIZES",
    title: "ขนาดหน้าจอ LIFF 3 แบบ",
    subtitle: null,
    items: [
      { title: "Compact (50%)", desc: "Simple form\nOTP validation\nข้อความสั้นๆ" },
      { title: "Tall (75%)", desc: "Product catalog\nฟอร์มยาวขึ้น\nข้อมูลปานกลาง" },
      { title: "Full (100%)", desc: "Full web app\nใช้ทั้งหน้าจอ\nสำหรับ MINI App-like" },
    ],
  });
  page++;

  // 4. Steps: Create Channel + LIFF App
  T.slideSteps(pres, {
    chapter: CHAPTER, page,
    label: "03 — SETUP",
    title: "สร้าง Channel + LIFF App",
    subtitle: null,
    steps: [
      "Create a LINE Login channel ใน Developers Console",
      "กรอกรายละเอียด Channel",
      "เลือก channel > LIFF tab > Add",
      "ตั้ง Name, Size, Endpoint URL, Scopes, Linked OA",
      "Status: Developing (Admin) → Published (ทุกคน)",
      "ได้ LIFF URL มาใช้งาน",
    ],
    images: [overview5, overview6].filter(Boolean).map(d => ({ data: d })),
  });
  page++;

  // 5. Code: LIFF CLI starter
  T.slideCode(pres, {
    chapter: CHAPTER, page,
    label: "04 — STARTER",
    title: "Create LIFF App CLI (Starter)",
    subtitle: "Scaffold โปรเจกต์ LIFF ใหม่แบบ 1 command",
    code:
`npx @line/create-liff-app
# Project name: liff-demo
# Template: vue
# Language: JavaScript
# LIFF ID: xxx-xxx
# Package manager: npm

cd liff-demo && npm install && npm run dev
# http://localhost:5173`,
  });
  page++;

  // 6. Table: Frameworks
  T.slideTable(pres, {
    chapter: CHAPTER, page,
    label: "05 — FRAMEWORKS",
    title: "Frameworks ที่รองรับ",
    subtitle: "Templates ของ create-liff-app",
    rows: [
      ["Template", "รายละเอียด"],
      ["vanilla", "JavaScript ล้วน ไม่มี framework"],
      ["react", "Meta's React library"],
      ["vue", "Progressive framework"],
      ["svelte", "Compile to Vanilla JS"],
      ["nextjs / nuxtjs", "Full-stack frameworks"],
      ["Languages", "JavaScript + TypeScript"],
      ["Package managers", "npm / yarn"],
    ],
    colWidths: [3.5, 8.3],
  });
  page++;

  // 7. Mixed: LIFF Init
  T.slideMixed(pres, {
    chapter: CHAPTER, page,
    label: "06 — INIT",
    title: "LIFF Init — สิ่งที่ต้องรู้",
    subtitle: null,
    bullets: [
      "ต้องเรียก liff.init() ทุกครั้งที่เปิดหน้าใหม่",
      "URL ที่เรียกต้องตรงกับ Endpoint URL หรืออยู่ระดับต่ำกว่า",
      "ต้อง init ทั้ง Primary และ Secondary Redirect URL",
      "เปลี่ยน URL หลัง Promise resolve เท่านั้น",
      "ห้ามส่ง primary redirect URL ไปยัง logging tool (มี access_token)",
    ],
  });
  page++;

  // 8. Table: LIFF APIs
  T.slideTable(pres, {
    chapter: CHAPTER, page,
    label: "07 — APIs",
    title: "LIFF APIs ที่ใช้บ่อย",
    subtitle: null,
    rows: [
      ["API", "หน้าที่"],
      ["liff.init({liffId})", "เริ่มต้นใช้งาน — บังคับก่อนเรียกอื่น"],
      ["liff.ready", "Promise — resolve เมื่อ init สำเร็จ"],
      ["liff.isLoggedIn() / login()", "ตรวจสอบ + สั่ง login"],
      ["liff.getProfile()", "ดึง userId, displayName, pictureUrl, statusMessage"],
      ["liff.getDecodedIDToken()", "ดึง email (เมื่อเปิด scope)"],
      ["liff.getContext()", "type, viewType, scope, availability"],
      ["liff.isInClient() / getOS()", "ตรวจสอบ environment"],
    ],
    colWidths: [4.5, 7.3],
  });
  page++;

  // 9. Code: Get Profile
  T.slideCode(pres, {
    chapter: CHAPTER, page,
    label: "08 — PROFILE",
    title: "Get Profile — Code ตัวอย่าง",
    subtitle: null,
    code:
`import liff from "@line/liff";

await liff.init({ liffId: import.meta.env.VITE_LIFF_ID });
await liff.ready;

if (!liff.isLoggedIn()) {
  liff.login({ redirectUri: window.location.href });
} else {
  const profile = await liff.getProfile();
  const email = liff.getDecodedIDToken().email;
  console.log(profile.userId, profile.displayName, email);
}`,
  });
  page++;

  // 10. Steps: Email scope
  T.slideSteps(pres, {
    chapter: CHAPTER, page,
    label: "09 — EMAIL SCOPE",
    title: "เปิด Email Scope",
    subtitle: null,
    steps: [
      "Basic Setting > OpenID Connect > เปิดใช้งาน Email",
      "เปิด Scope Email ใน LIFF app",
      "ใช้ liff.getDecodedIDToken().email",
      "Clear cache เพื่อ trigger permission dialog ใหม่",
    ],
  });
  page++;

  // 11. Code: Environment APIs
  T.slideCode(pres, {
    chapter: CHAPTER, page,
    label: "10 — ENVIRONMENT",
    title: "LIFF Environment APIs",
    subtitle: null,
    code:
`liff.getOS()               // 'ios' | 'android' | 'web'
liff.getAppLanguage()      // ภาษาของแอป LINE
liff.getLanguage()         // ภาษาใน LIFF SDK
liff.getVersion()          // LIFF SDK version
liff.getLineVersion()      // LINE app version
liff.isInClient()          // เปิดใน LINE หรือ external
liff.isApiAvailable('shareTargetPicker')
liff.isApiAvailable('createShortcutOnHomeScreen')`,
  });
  page++;

  // 12. Mixed: getFriendship
  T.slideIntro(pres, {
    chapter: CHAPTER, page,
    label: "11 — FRIENDSHIP",
    title: "liff.getFriendship() — เช็คเพื่อนกับ OA",
    subtitle: null,
    bullets: [
      "ตรวจสอบว่าผู้ใช้เพิ่ม OA ที่ผูกกับ LIFF เป็นเพื่อนหรือยัง",
      "ต้อง Link OA กับ LINE Login channel ใน Developer Console ก่อน",
      "Response: { friendFlag: true / false }",
      "ใช้แสดงปุ่มเชิญเพิ่มเพื่อนถ้ายังไม่เป็นเพื่อน",
    ],
    image: friend1 ? { data: friend1 } : null,
  });
  page++;

  // 13. Table: sendMessages vs shareTargetPicker
  T.slideTable(pres, {
    chapter: CHAPTER, page,
    label: "12 — SEND MESSAGE",
    title: "sendMessages() vs shareTargetPicker()",
    subtitle: null,
    rows: [
      ["Property", "sendMessages", "shareTargetPicker"],
      ["ใช้ที่ไหน", "LINE Client เท่านั้น", "LINE + External Browser"],
      ["Scope", "chat_message.write", "ตั้งใน Developer Console"],
      ["ผู้รับ", "Chat ปัจจุบันที่เปิด LIFF", "เลือกได้หลายคน (isMultiple)"],
      ["ข้อจำกัด", "สูงสุด 5 messages", "สูงสุด 5 messages"],
    ],
    colWidths: [2.8, 4.5, 4.5],
  });
  page++;

  // 14. Code: send message code
  T.slideCode(pres, {
    chapter: CHAPTER, page,
    label: "13 — SEND CODE",
    title: "Send Message — Code ตัวอย่าง",
    subtitle: null,
    code:
`// Send to current chat
await liff.sendMessages([
  { type: 'text', text: 'Message from LIFF!' }
]);
await liff.closeWindow();

// Share Target Picker
if (liff.isApiAvailable('shareTargetPicker')) {
  await liff.shareTargetPicker([
    { type: 'text', text: 'Check this out!' },
    { type: 'flex', altText: 'Flex', contents: {} }
  ], { isMultiple: true });
}`,
  });
  page++;

  // 15. Table: scanCodeV2 OS support
  T.slideTable(pres, {
    chapter: CHAPTER, page,
    label: "14 — SCAN QR",
    title: "Scan QR Code — scanCodeV2()",
    subtitle: "ใช้ได้บน LIFF Browser เฉพาะ Full size",
    rows: [
      ["OS", "Version", "LIFF browser", "External"],
      ["iOS", "< 14.3", "No", "Yes (WebRTC)"],
      ["iOS", "≥ 14.3", "Yes (Full only)", "Yes"],
      ["Android", "ทุก version", "Yes (Full only)", "Yes"],
      ["PC", "ทุก version", "No", "Yes"],
    ],
    colWidths: [2.0, 2.5, 4.0, 3.3],
    centerCols: [1, 2, 3],
  });
  page++;

  // 16. Code: LIFF CLI
  T.slideCode(pres, {
    chapter: CHAPTER, page,
    label: "15 — CLI",
    title: "LIFF CLI — จัดการผ่าน Terminal",
    subtitle: "Automate LIFF app creation + management",
    code:
`npm install -g @line/liff-cli

liff-cli channel add 1234567890
liff-cli channel use 1234567890

liff-cli app create \\
  --name "LIFF Demo" \\
  --endpoint-url https://example.com/ \\
  --view-type full

liff-cli app list
liff-cli app update --liff-id 1234-AbcdEfgh --view-type tall
liff-cli app delete --liff-id 1234-AbcdEfgh`,
  });
  page++;

  return page;
}

module.exports = { build, CHAPTER };
