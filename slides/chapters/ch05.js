const path = require("path");
const fs = require("fs");
const T = require("../theme");

const ASSETS = path.resolve(__dirname, "../../assets/ch05-messages");
const CHAPTER = "Chapter 5 · Messages (Deep Dive)";

async function safeLoad(loader, filename, ...args) {
  const p = path.join(ASSETS, filename);
  if (!fs.existsSync(p)) return null;
  try { return await loader(p, ...args); }
  catch (e) { console.warn(`  ⚠ ${filename}: ${e.message}`); return null; }
}

async function build(pres, startPage = 1) {
  let page = startPage;

  const tokenImg = await safeLoad(T.imageToBase64, "channel-access-token.png");
  const mentionImg = await safeLoad(T.imageToBase64, "mention-example.png");
  const verifyImg = await safeLoad(T.imageToBase64, "verify-signature.png");
  const narrowcastImg = await safeLoad(T.webpToPngBase64, "narrowcast.webp", 1000);
  const statsImg = await safeLoad(T.imageToBase64, "statistics.png");
  const cronImg = await safeLoad(T.imageToBase64, "cronjob.png");
  const beaconImg = await safeLoad(T.webpToPngBase64, "beacon.webp", 800);

  // 1. Divider
  T.slideDivider(pres, { chapter: "CHAPTER 05", title: "Messages — Deep Dive", subtitle: "Message Types / Tokens / Signature / Send / Narrowcast / Beacon" });
  page++;

  // 2. Table: endpoints
  T.slideTable(pres, {
    chapter: CHAPTER, page,
    label: "01 — ENDPOINTS",
    title: "Messaging API Endpoints & Domain",
    subtitle: "แยก domain ตามประเภทงาน",
    rows: [
      ["Domain", "ใช้สำหรับ"],
      ["api.line.me", "reply, push, multicast, broadcast, narrowcast"],
      ["api-data.line.me", "Get content, Upload / Download rich menu image"],
    ],
    colWidths: [4.0, 7.8],
  });
  page++;

  // 3. Table: rate limits
  T.slideTable(pres, {
    chapter: CHAPTER, page,
    label: "02 — RATE LIMITS",
    title: "Rate Limits ที่ต้องรู้",
    subtitle: "ถ้าเกิน → HTTP 429 Too Many Requests",
    rows: [
      ["Endpoint", "Rate Limit"],
      ["Reply / Push / Multicast / Broadcast", "2,000 req/sec"],
      ["Narrowcast / Broadcast (การส่ง)", "60 req/hour"],
      ["Loading animation", "100 req/sec"],
      ["Create rich menu", "100 req/hour"],
      ["Set webhook endpoint", "1,000 req/min"],
      ["Issue short-lived token", "370 req/sec"],
    ],
    colWidths: [7.5, 4.3],
    centerCols: [1],
  });
  page++;

  // 4. Note: Postman collection
  T.slideNote(pres, {
    chapter: CHAPTER, page,
    label: "03 — TOOLING",
    title: "Postman Collection สำหรับทดสอบ API",
    subtitle: null,
    text: [
      "Import Collection: github.com/thepnatee/line-api-collection-postman",
      "ใช้ทดสอบทุก endpoint ของ Messaging API ได้ทันที",
      "มี environment variables สำหรับ Channel Access Token พร้อมใช้",
    ],
  });
  page++;

  // 5. Code: Text + TextV2
  T.slideCode(pres, {
    chapter: CHAPTER, page,
    label: "04 — TEXT",
    title: "Text Message — Basic + V2",
    subtitle: "textV2 รองรับ mention + emoji แบบ inline",
    code:
`// Text (max 5000 chars)
{ "type":"text", "text":"Hello, world" }

// Text V2 รองรับ mention + emoji ในข้อความ
{
  "type":"textV2",
  "text":"Hello {user}! Welcome to {shop}",
  "substitution": {
    "user": { "type":"mention", "mentionee": { "type":"user", "userId":"U..." } },
    "shop": { "type":"emoji", "productId":"5ac1bfd5...", "emojiId":"001" }
  }
}`,
  });
  page++;

  // 6. Cards: Template Messages
  T.slideCards(pres, {
    chapter: CHAPTER, page,
    label: "05 — TEMPLATE MESSAGES",
    title: "Template Messages 4 แบบ",
    subtitle: "รูปแบบข้อความสำเร็จรูปพร้อม action",
    cards: [
      { title: "Buttons", desc: "รูป + หัวข้อ + ข้อความ + ปุ่ม action" },
      { title: "Confirm", desc: "ข้อความ + ปุ่ม 2 ปุ่ม (Yes / No)" },
      { title: "Carousel", desc: "หลายคอลัมน์ เลื่อนดูได้ทางซ้าย-ขวา" },
      { title: "Image Carousel", desc: "หลายรูป เลื่อนดูได้ ไม่มีข้อความ" },
    ],
    cols: 2,
  });
  page++;

  // 7. Mixed: Quick reply
  T.slideMixed(pres, {
    chapter: CHAPTER, page,
    label: "06 — QUICK REPLY",
    title: "Quick Reply — 13 ปุ่มสูงสุด",
    subtitle: "ตอบโต้ได้รวดเร็ว + รองรับ camera / location / datetime",
    bullets: [
      "รองรับเฉพาะ LINE iOS / Android",
      "Actions: message, postback, camera, cameraRoll, location, uri, datetimepicker, clipboard",
      "ไม่สามารถใช้ Rich Menu Switch action ได้",
      "หายไปเมื่อผู้ใช้กด (ยกเว้น camera / location / datetime)",
    ],
  });
  page++;

  // 8. Code: Quick reply JSON
  T.slideCode(pres, {
    chapter: CHAPTER, page,
    label: "07 — QUICK REPLY",
    title: "Quick Reply — JSON ตัวอย่าง",
    subtitle: null,
    code:
`{
  "type":"text",
  "text":"Select category or send location",
  "quickReply": {
    "items": [
      { "type":"action", "action":{"type":"message","label":"Sushi","text":"Sushi"} },
      { "type":"action", "action":{"type":"camera","label":"Camera"} },
      { "type":"action", "action":{"type":"location","label":"Location"} }
    ]
  }
}`,
  });
  page++;

  // 9. Mixed: Quote token
  T.slideMixed(pres, {
    chapter: CHAPTER, page,
    label: "08 — QUOTE TOKEN",
    title: "Quote Token — อ้างอิงข้อความ",
    subtitle: null,
    bullets: [
      "ใส่ quoteToken ใน message object เพื่ออ้างอิงข้อความก่อนหน้า",
      "ส่งแบบ quote ได้เฉพาะ Text และ Sticker เท่านั้น",
      "quoteToken ไม่มีวันหมดอายุและใช้ซ้ำได้",
      "ได้มาจาก Webhook (text / sticker / image / video) หรือ Response ของ reply / push",
    ],
  });
  page++;

  // 10. Table: Channel Access Token comparison (with image on side? use table - no image)
  T.slideTable(pres, {
    chapter: CHAPTER, page,
    label: "09 — CHANNEL ACCESS TOKEN",
    title: "Channel Access Token — ตัวไหนใช้กับงานไหน",
    subtitle: null,
    rows: [
      ["ประเภท", "อายุ", "จำนวน", "หมายเหตุ"],
      ["Long-Lived", "ไม่มีวันหมด", "1", "ง่าย แต่เสี่ยงสุด"],
      ["Short-Lived", "30 วัน", "30", "ปานกลาง"],
      ["v2.1 (แนะนำ)", "สูงสุด 30 วัน", "30", "ใช้ JWT ปลอดภัยสุด"],
      ["Stateless", "15 นาที", "ไม่จำกัด", "per-request ไม่ต้อง revoke"],
    ],
    colWidths: [3.0, 2.8, 2.2, 3.8],
    centerCols: [1, 2],
  });
  page++;

  // 11. Code: Issue stateless token
  T.slideCode(pres, {
    chapter: CHAPTER, page,
    label: "10 — STATELESS TOKEN",
    title: "Issue Stateless Token (v3)",
    subtitle: "per-request token ไม่ต้อง revoke",
    code:
`POST https://api.line.me/oauth2/v3/token
Content-Type: application/x-www-form-urlencoded

grant_type=client_credentials
&client_id={Channel ID}
&client_secret={Channel Secret}

// Response
{
  "access_token": "W1TeHCgfH2Liwa.....",
  "expires_in": 900,
  "token_type": "Bearer"
}`,
  });
  page++;

  // 12. Mixed: Loading animation
  T.slideMixed(pres, {
    chapter: CHAPTER, page,
    label: "11 — LOADING",
    title: "Loading Animation",
    subtitle: "แสดงสถานะกำลังประมวลผลในหน้าแชท 1-on-1",
    bullets: [
      "ใช้ได้เฉพาะ 1-on-1 chat เท่านั้น",
      "loadingSeconds: 5, 10, 15 ... 60 (default 20)",
      "Rate limit 100 req/sec, ฟรี",
      "หายเมื่อ bot ส่งข้อความ / ออกจากแชท / หมดเวลา",
    ],
  });
  page++;

  // 13. Code: Loading animation API
  T.slideCode(pres, {
    chapter: CHAPTER, page,
    label: "12 — LOADING API",
    title: "Loading Animation API",
    subtitle: null,
    code:
`POST https://api.line.me/v2/bot/chat/loading/start
Content-Type: application/json
Authorization: Bearer {channel access token}

{
  "chatId": "U4af4980629...",
  "loadingSeconds": 5
}`,
  });
  page++;

  // 14. Mixed: Mention TextV2 (with image)
  T.slideIntro(pres, {
    chapter: CHAPTER, page,
    label: "13 — MENTION",
    title: "Mention — Text Message V2",
    subtitle: "mention + emoji ใน textV2",
    bullets: [
      "ใช้ textV2 แทน text เก่า — แนะนำสำหรับ feature ใหม่",
      "ใส่ตัวแปรใน {} + substitution object",
      "Type: mention (user / all) หรือ emoji",
      "รองรับเฉพาะใน Reply / Push ใน Group / Multi-person chat",
    ],
    image: mentionImg ? { data: mentionImg } : null,
  });
  page++;

  // 15. Intro: validate message object API
  T.slideMixed(pres, {
    chapter: CHAPTER, page,
    label: "14 — VALIDATION",
    title: "Validate Message Object API",
    subtitle: "ทดสอบ JSON ก่อนส่งจริง",
    bullets: [
      "ทดสอบ JSON ก่อนส่งจริง ป้องกัน error และค่าใช้จ่าย",
      "มี endpoint สำหรับ reply, push, multicast, narrowcast, broadcast",
      "เหมาะกับระบบ Queue ที่ส่งข้อความจำนวนมาก",
      "POST /v2/bot/message/validate/{type}",
    ],
  });
  page++;

  // 16. Steps: x-line-signature
  T.slideSteps(pres, {
    chapter: CHAPTER, page,
    label: "15 — SIGNATURE",
    title: "x-line-signature — Verify Webhook",
    subtitle: "ตรวจสอบว่า request มาจาก LINE จริง",
    steps: [
      "LINE สร้าง HMAC-SHA256(body, channelSecret) → Base64",
      "แนบใน header x-line-signature",
      "Bot ต้องคำนวณซ้ำด้วย raw body ที่ได้รับ",
      "เทียบ — ถ้าตรง = จาก LINE จริง / ถ้าไม่ = ปลอมหรือถูกแก้",
      "ห้าม parse / format JSON ก่อน verify",
    ],
    images: verifyImg ? [{ data: verifyImg }] : [],
  });
  page++;

  // 17. Code: verify signature Node.js
  T.slideCode(pres, {
    chapter: CHAPTER, page,
    label: "16 — SIGNATURE CODE",
    title: "Verify Signature — Node.js / TypeScript",
    subtitle: null,
    code:
`import crypto from "crypto";

export function validateLineSignature(
  rawBody: Buffer | string,
  signature: string
): boolean {
  const hmac = crypto.createHmac("sha256", process.env.LINE_MESSAGING_CHANNEL_SECRET!);
  hmac.update(rawBody);
  const expected = hmac.digest("base64");
  return expected === signature;
}`,
  });
  page++;

  // 18. Code: Sending endpoints
  T.slideCode(pres, {
    chapter: CHAPTER, page,
    label: "17 — SENDING",
    title: "Sending Messages — Endpoints",
    subtitle: null,
    code:
`POST /v2/bot/message/reply        # ใช้ replyToken
POST /v2/bot/message/push         # ส่งถึงคนเดียว
POST /v2/bot/message/multicast    # หลายคน (2,000 req/s)
POST /v2/bot/message/broadcast    # ผู้ติดตามทั้งหมด (60 req/h)
POST /v2/bot/message/narrowcast   # กลุ่มเป้าหมาย (60 req/h)
GET  /v2/bot/message/quota        # ดูโควตาที่เหลือ`,
  });
  page++;

  // 19. Code: Push message curl
  T.slideCode(pres, {
    chapter: CHAPTER, page,
    label: "18 — PUSH EXAMPLE",
    title: "Push Message — ตัวอย่าง curl",
    subtitle: null,
    code:
`curl -X POST https://api.line.me/v2/bot/message/push \\
  -H 'Content-Type: application/json' \\
  -H 'Authorization: Bearer {channel access token}' \\
  -H 'X-Line-Retry-Key: {UUID}' \\
  -d '{
    "to": "U4af4980629...",
    "messages": [{"type":"text","text":"Hello"}]
  }'`,
  });
  page++;

  // 20. Features: Narrowcast (with image side)
  T.slideFeatures(pres, {
    chapter: CHAPTER, page,
    label: "19 — NARROWCAST",
    title: "Narrowcast — ส่งแบบเจาะกลุ่ม",
    subtitle: "ส่งข้อความไปยัง audience / demographic / operator",
    features: [
      { title: "Audience Group", desc: "User IDs / IFA / Click / Impression" },
      { title: "Demographic Filter", desc: "gender, age, appType, area, subscriptionPeriod" },
      { title: "Operator", desc: "AND / OR / NOT (ซ้อน operator ได้)" },
      { title: "Redelivery", desc: "ส่งซ้ำด้วย requestId ภายใน 60 วัน" },
      { title: "Limit Object", desc: "max, upToRemainingQuota, forbidPartialDelivery" },
      { title: "ข้อจำกัด", desc: "ต้องมี audience ≥ จำนวนที่กำหนด (click/imp ≥ 50)" },
    ],
    cols: 3,
  });
  page++;

  // 21. Code: Narrowcast request
  T.slideCode(pres, {
    chapter: CHAPTER, page,
    label: "20 — NARROWCAST API",
    title: "Narrowcast Request — ตัวอย่าง",
    subtitle: null,
    code:
`POST /v2/bot/message/narrowcast
{
  "messages":[{"type":"text","text":"Hello"}],
  "recipient": {
    "type":"operator",
    "and":[
      {"type":"audience","audienceGroupId":5614991017776},
      {"type":"operator","not":{"type":"redelivery","requestId":"5b59..."}}
    ]
  },
  "filter":{"demographic":{"type":"age","gte":"age_20","lt":"age_30"}},
  "limit":{"max":100,"upToRemainingQuota":true}
}`,
  });
  page++;

  // 22. Mixed: Statistics (with image)
  T.slideIntro(pres, {
    chapter: CHAPTER, page,
    label: "21 — STATISTICS",
    title: "Message Statistics — Unit-based",
    subtitle: "ดูผลการส่งข้อความย้อนหลัง",
    bullets: [
      "กำหนด customAggregationUnits ตอนส่ง push / multicast",
      "สูงสุด 1,000 unit names ต่อเดือน / channel",
      "ดูสถิติ: impression, click, media play",
      "Privacy: หาก engage < 20 คน ผลจะเป็น null",
      "Narrowcast / Broadcast: ใช้ requestId แทน unit",
    ],
    image: statsImg ? { data: statsImg } : null,
  });
  page++;

  // 23. Code: statistics endpoints
  T.slideCode(pres, {
    chapter: CHAPTER, page,
    label: "22 — STATS API",
    title: "ดึงสถิติ — API Endpoints",
    subtitle: null,
    code:
`# Unit-based (push / multicast)
GET /v2/bot/insight/message/event/aggregation
  ?customAggregationUnit=new-item-msg-yyyymmdd
  &from=20210301&to=20210331

# Narrowcast / Broadcast
GET /v2/bot/insight/message/event?requestId={request_id}

# ดู unit name ที่ใช้ในเดือนนี้
GET /v2/bot/message/aggregation/info`,
  });
  page++;

  // 24. Steps: Cronjob.org
  T.slideSteps(pres, {
    chapter: CHAPTER, page,
    label: "23 — CRONJOB",
    title: "Cron-Job.org — Schedule งาน",
    subtitle: "ตั้งเวลาส่งข้อความ / เรียก API อัตโนมัติ",
    steps: [
      "สมัครที่ cron-job.org",
      "Create Cronjob: URL, Method (GET / POST), Schedule, Time Zone",
      "ใส่ Authentication header ได้",
      "ใช้ Run Now ทดสอบก่อนตั้งจริง",
      "ดู Execution History ได้",
    ],
    images: cronImg ? [{ data: cronImg }] : [],
  });
  page++;

  // 25. Mixed: Beacon (with image)
  T.slideIntro(pres, {
    chapter: CHAPTER, page,
    label: "24 — BEACON",
    title: "LINE Beacon — Proximity Messaging",
    subtitle: "BLE device ให้ผู้ใช้รับ event ตามตำแหน่ง",
    bullets: [
      "BLE device (เช่น DEVIO) — ผูกกับ LINE OA ได้หลายตัว",
      "ใช้ได้ที่ ญี่ปุ่น, ไต้หวัน, ไทย เท่านั้น",
      "User ต้องเปิด Bluetooth + Use LINE Beacon + เพิ่ม OA เป็นเพื่อน",
      "Webhook event.type = beacon, beacon.type: enter / banner / stay",
      "Banner: Verified/Premium OA · Stay: Certified Provider",
    ],
    image: beaconImg ? { data: beaconImg } : null,
  });
  page++;

  return page;
}

module.exports = { build, CHAPTER };
