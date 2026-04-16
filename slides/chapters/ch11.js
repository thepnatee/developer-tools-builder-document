const path = require("path");
const T = require("../theme");

const CHAPTER = "Chapter 11 · LINE Developer Tools Builder";

async function build(pres, startPage = 1) {
  let page = startPage;

  // 1. Divider
  T.slideDivider(pres, {
    chapter: "CHAPTER 11",
    title: "LINE Developer Tools Builder",
    subtitle: "devtoolsbuilder.cloudea.tech — platform ครบวงจรสำหรับ LINE Bot",
  });
  page++;

  // 2. Intro
  T.slideIntro(pres, {
    chapter: CHAPTER, page,
    label: "01 — WHAT",
    title: "Dev Tools Builder คืออะไร",
    subtitle: null,
    bullets: [
      "แพลตฟอร์มครบวงจรสำหรับนักพัฒนา LINE Bot",
      "สร้าง-จัดการ-deploy Rich Messaging Apps ไม่ต้องเขียนโค้ดทั้งหมด",
      "รวม Rich Menu / Flex / Chat Mode / E-commerce / Loyalty",
      "URL: devtoolsbuilder.cloudea.tech",
    ],
  });
  page++;

  // 3. Features: Core Features
  T.slideFeatures(pres, {
    chapter: CHAPTER, page,
    label: "02 — CORE FEATURES",
    title: "Core Features",
    subtitle: null,
    features: [
      { title: "Rich Menu Builder", desc: "Drag-drop + per-user + scheduled" },
      { title: "Flex Generator", desc: "JSON editor + 20+ templates" },
      { title: "Imagemap Builder", desc: "Clickable area + routing" },
      { title: "Send Message", desc: "Push/Multicast/Broadcast/Narrowcast" },
      { title: "Chat Mode", desc: "Live support + quick actions" },
      { title: "Auto-responses", desc: "Keyword-based workflow" },
    ],
    cols: 3,
  });
  page++;

  // 4. Features: Advanced
  T.slideFeatures(pres, {
    chapter: CHAPTER, page,
    label: "03 — ADVANCED",
    title: "Advanced Features",
    subtitle: null,
    features: [
      { title: "Bot Templates", desc: "11+ templates (Welcome, FAQ, Quiz, Loyalty ...)" },
      { title: "Live Polling", desc: "Real-time vote + Presenter mode" },
      { title: "Quiz Game", desc: "Kahoot-style + Leaderboard" },
      { title: "Marketplace Apps", desc: "Shop (POS, KDS), Loyalty, Booking" },
      { title: "Webhook Proxy", desc: "Forward events + event log" },
      { title: "AI Integration", desc: "Google Gemini สร้าง Flex / OCR" },
    ],
    cols: 3,
  });
  page++;

  // 5. Table: Utility tools
  T.slideTable(pres, {
    chapter: CHAPTER, page,
    label: "04 — UTILITIES",
    title: "Utility Tools",
    subtitle: null,
    rows: [
      ["Tool", "หน้าที่"],
      ["Image Upload + Resize", "อัปโหลด + ปรับตามข้อกำหนด LINE"],
      ["QR Generator", "สร้าง QR Code"],
      ["PromptPay QR", "สร้าง QR พร้อมเพย์"],
      ["Short Links", "ย่อลิงก์ + Click Analytics"],
      ["LINE URL Scheme", "สร้าง Deep Link"],
      ["Cronjob Scheduler", "ตั้งเวลาทำงาน (Cron Expression)"],
      ["Coupon Manager", "สร้าง / แจกคูปอง LINE"],
    ],
    colWidths: [4.0, 7.8],
  });
  page++;

  // 6. Steps: Getting started
  T.slideSteps(pres, {
    chapter: CHAPTER, page,
    label: "05 — GETTING STARTED",
    title: "เริ่มต้นใช้งาน",
    subtitle: null,
    steps: [
      "เปิด devtoolsbuilder.cloudea.tech",
      "Login with LINE (ผ่าน LIFF + Firebase Auth)",
      "Settings > Channels > + Add Channel",
      "กรอก Channel ID + Channel Secret",
      "เลือก Channel จาก Sidebar แล้วเริ่มใช้งาน",
    ],
  });
  page++;

  // 7. Steps: Send message workflow
  T.slideSteps(pres, {
    chapter: CHAPTER, page,
    label: "06 — SEND MESSAGE",
    title: "ส่งข้อความ — Workflow",
    subtitle: null,
    steps: [
      "Messaging > Send Message",
      "เลือกประเภท: Push / Multicast / Broadcast / Narrowcast",
      "สร้างข้อความ + เลือก Flex template",
      "เพิ่ม Quick Reply / Sticker ตามต้องการ",
      "Preview บนจำลอง iPhone",
      "Send Now หรือ Schedule (PRO)",
    ],
  });
  page++;

  // 8. Steps: Rich Menu workflow
  T.slideSteps(pres, {
    chapter: CHAPTER, page,
    label: "07 — RICH MENU",
    title: "Rich Menu Builder — Workflow",
    subtitle: null,
    steps: [
      "Upload background 2500×1686 (Full) หรือ 2500×843 (Half)",
      "วาด tappable areas (สูงสุด 20)",
      "ตั้ง action ต่อพื้นที่ (Message / URI / Postback / Datetime / Switch)",
      "Menu Name + Chat Bar Text",
      "Set as Default + Create → Deploy ไป LINE",
    ],
  });
  page++;

  // 9. Table: Package comparison
  T.slideTable(pres, {
    chapter: CHAPTER, page,
    label: "08 — PRICING",
    title: "Package Comparison",
    subtitle: null,
    rows: [
      ["รายการ", "Free", "Pro ฿399", "Business ฿1,099"],
      ["Channels", "3", "10", "100"],
      ["Members / Channel", "10", "100", "300"],
      ["Storage", "50 MB", "1 GB", "10 GB"],
      ["Flex Messages", "20", "50", "150"],
      ["Webhook Events", "50", "1,000", "10,000"],
      ["Live Polls (votes)", "5 (40)", "20 (100)", "50 (∞)"],
      ["Chat Mode / Webhook Proxy", "—", "✓", "✓"],
    ],
    colWidths: [4.5, 2.2, 2.6, 2.5],
    centerCols: [1, 2, 3],
  });
  page++;

  // 10. Cards: Multi-Tenancy / Team
  T.slideCards(pres, {
    chapter: CHAPTER, page,
    label: "09 — MULTI-TENANCY",
    title: "Multi-Tenancy & Team",
    subtitle: "รองรับทีม + role + security",
    cards: [
      { title: "Owner", desc: "จัดการทุกอย่าง + ลบ channel" },
      { title: "Admin", desc: "จัดการเครื่องมือ + ดูสมาชิก" },
      { title: "Member", desc: "ใช้เครื่องมือที่ได้รับสิทธิ์" },
      { title: "Invite Link", desc: "ส่งลิงก์ + Login ด้วย LINE + Join" },
      { title: "Security", desc: "Firebase Auth + LIFF + RBAC" },
      { title: "2 ภาษา", desc: "ไทย / English สลับได้ทันที" },
    ],
    cols: 3,
  });
  page++;

  // 11. Code: Sidebar structure
  T.slideCode(pres, {
    chapter: CHAPTER, page,
    label: "10 — NAVIGATION",
    title: "Sidebar Structure",
    subtitle: "ภาพรวมเมนูของ platform",
    code:
`├── Overview (Home, Quota)
├── Messaging (Send, Flex, Imagemap, History)
├── Rich Menu (Builder, Existing, Alias, User Assignment)
├── Webhook (Proxy, Chat Mode, Members, Responses)
├── Management (Audience, Coupon)
├── Marketplace (Shop, Loyalty, Booking)
├── Utilities (Bot Templates, Poll, Quiz,
│              Cronjob, Short Links, QR, PromptPay,
│              Image tools, LINE URL Scheme, Beacon)
└── Settings`,
  });
  page++;

  return page;
}

module.exports = { build, CHAPTER };
