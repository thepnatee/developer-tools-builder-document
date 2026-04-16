const path = require("path");
const fs = require("fs");
const T = require("../theme");

const ASSETS = path.resolve(__dirname, "../../assets/ch03-webhook");
const CHAPTER = "Chapter 3 · Webhook Events";

async function safeLoad(loader, filename, ...args) {
  const p = path.join(ASSETS, filename);
  if (!fs.existsSync(p)) return null;
  try { return await loader(p, ...args); }
  catch (e) { console.warn(`  ⚠ ${filename}: ${e.message}`); return null; }
}

async function build(pres, startPage = 1) {
  let page = startPage;

  const arch = await safeLoad(T.webpToPngBase64, "messaging-api-architecture.webp", 1000);

  // 1. Divider
  T.slideDivider(pres, { chapter: "CHAPTER 03", title: "Webhook Events", subtitle: "เข้าใจ Event ที่ LINE ส่งมาหา Bot" });
  page++;

  // 2. Intro
  T.slideIntro(pres, {
    chapter: CHAPTER, page,
    label: "01 — WEBHOOK",
    title: "Webhook คืออะไร",
    subtitle: "Event trigger จาก LINE Platform → Bot",
    bullets: [
      "Event Trigger ที่ LINE ส่งเป็น JSON มาที่ Webhook URL ของเรา",
      "Payload มี destination, events[], replyToken",
      "LINE Platform ไม่เปิดเผย IP — ใช้ x-line-signature แทนการ whitelist IP",
    ],
    image: arch ? { data: arch } : null,
  });
  page++;

  // 3. Table: Webhook Events for chats
  T.slideTable(pres, {
    chapter: CHAPTER, page,
    label: "02 — CHAT EVENTS",
    title: "Webhook Events for Chats",
    subtitle: "Event ใดทำงานใน 1-on-1 vs Group/Multi",
    rows: [
      ["Event", "1-on-1", "Group / Multi"],
      ["Message event", "Yes", "Yes"],
      ["Follow / Unfollow", "Yes", "No"],
      ["Join / Leave", "No", "Yes"],
      ["Member join / leave", "No", "Yes"],
      ["Postback event", "Yes", "Yes"],
      ["Unsend event", "Yes", "Yes"],
      ["Video viewing complete", "Yes", "No"],
    ],
    colWidths: [5.8, 3.0, 3.0],
    centerCols: [1, 2],
  });
  page++;

  // 4. Cards: special events
  T.slideCards(pres, {
    chapter: CHAPTER, page,
    label: "03 — SPECIAL EVENTS",
    title: "Event พิเศษ: Beacon & Account Link",
    subtitle: null,
    cards: [
      { title: "Beacon event", desc: "ผู้ใช้เข้าพื้นที่ Beacon\ntype: enter / banner / stay" },
      { title: "Account link event", desc: "ใช้เชื่อมบัญชี LINE กับระบบของเรา\n(เช่น User ID ในระบบ)" },
    ],
    cols: 2,
  });
  page++;

  // 5. Table: message types from webhook
  T.slideTable(pres, {
    chapter: CHAPTER, page,
    label: "04 — MESSAGE EVENT",
    title: "Message Event — ประเภทข้อความที่ได้รับ",
    subtitle: "แต่ละ type มี property เฉพาะ",
    rows: [
      ["Type", "รายละเอียด"],
      ["text", "ข้อความ + emojis + mentions"],
      ["image", "รูปภาพ (มี imageSet เมื่อส่งหลายรูปพร้อมกัน)"],
      ["video / audio", "ไฟล์ media (มี duration)"],
      ["file", "ไฟล์ทั่วไป — fileName, fileSize"],
      ["location", "title, address, latitude, longitude"],
      ["sticker", "stickerId, packageId, keywords"],
    ],
    colWidths: [3.0, 8.8],
  });
  page++;

  // 6. Code: sample text event
  T.slideCode(pres, {
    chapter: CHAPTER, page,
    label: "05 — EVENT PAYLOAD",
    title: "Text Message Event — ตัวอย่าง",
    subtitle: "JSON ที่ Bot ได้รับจาก Webhook",
    code:
`{
  "events": [{
    "replyToken": "nHuyWiB7...",
    "type": "message",
    "source": {"type":"user","userId":"U4af..."},
    "message": {
      "id": "444573844083572737",
      "type": "text",
      "quoteToken": "q3Plxr4AgKd...",
      "text": "Good Morning!!"
    }
  }]
}`,
  });
  page++;

  // 7. Note: Quote token
  T.slideNote(pres, {
    chapter: CHAPTER, page,
    label: "06 — QUOTE TOKEN",
    title: "Quote Token & Quoted Messages",
    subtitle: null,
    text: [
      "ทุก message event จะมี quoteToken แนบมาด้วย",
      "ถ้าผู้ใช้ quote ข้อความมา จะได้ quotedMessageId เพิ่มมา",
      "quoteToken ไม่มีวันหมดอายุและใช้ซ้ำได้ — เก็บไว้ reply ในอนาคตได้",
    ],
  });
  page++;

  // 8. Table: mention property
  T.slideTable(pres, {
    chapter: CHAPTER, page,
    label: "07 — MENTION",
    title: "Mention — mention.mentionees",
    subtitle: "โครงสร้าง property เมื่อ user mention ใครในข้อความ",
    rows: [
      ["Property", "รายละเอียด"],
      ["index / length", "ตำแหน่งและความยาวของ mention ในข้อความ"],
      ["type", "user หรือ all (@All)"],
      ["userId", "ID ของผู้ที่ถูก mention (เฉพาะ type=user)"],
      ["isSelf", "true เมื่อ mention ไปที่ bot เอง"],
    ],
    colWidths: [3.0, 8.8],
  });
  page++;

  // 9. Mixed: Webhook redelivery
  T.slideMixed(pres, {
    chapter: CHAPTER, page,
    label: "08 — RELIABILITY",
    title: "Webhook Redelivery",
    subtitle: "LINE ส่งซ้ำเมื่อ bot ไม่ตอบ 2xx",
    bullets: [
      "ถ้า bot ไม่ตอบ HTTP 2xx — LINE จะพยายามส่งซ้ำ",
      "เปิดใช้งานผ่าน Console > Messaging API > Webhook redelivery",
      "ใช้ webhookEventId ตรวจจับ event ซ้ำกันได้ (idempotency)",
      "deliveryContext.isRedelivery = true เมื่อเป็นการส่งซ้ำ",
    ],
  });
  page++;

  // 10. Code: content / profile APIs
  T.slideCode(pres, {
    chapter: CHAPTER, page,
    label: "09 — CONTENT API",
    title: "Get Content & Get Profile",
    subtitle: "ดึงไฟล์ที่ user ส่ง + ข้อมูลโปรไฟล์",
    code:
`// ดึงไฟล์ที่ผู้ใช้ส่งมา (ไฟล์ถูกลบอัตโนมัติภายใน 1 สัปดาห์)
GET https://api-data.line.me/v2/bot/message/{messageId}/content

// Preview (thumbnail)
GET https://api-data.line.me/v2/bot/message/{messageId}/content/preview

// ดึงข้อมูลโปรไฟล์ผู้ใช้
GET https://api.line.me/v2/bot/profile/{userId}`,
    note: "ไฟล์ media ใน LINE มีอายุการเก็บจำกัด — download เก็บเองถ้าต้องใช้ภายหลัง",
  });
  page++;

  return page;
}

module.exports = { build, CHAPTER };
