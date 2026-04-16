const path = require("path");
const fs = require("fs");
const T = require("../theme");

const ASSETS = path.resolve(__dirname, "../../assets/ch04-firebase-chatbot");
const CHAPTER = "Chapter 4 · Chatbot with Firebase";

async function safeLoad(loader, filename, ...args) {
  const p = path.join(ASSETS, filename);
  if (!fs.existsSync(p)) return null;
  try { return await loader(p, ...args); }
  catch (e) { console.warn(`  ⚠ ${filename}: ${e.message}`); return null; }
}

async function build(pres, startPage = 1) {
  let page = startPage;

  const codeEditor = await safeLoad(T.imageToBase64, "firebase-code-editor.png");

  // 1. Divider
  T.slideDivider(pres, { chapter: "CHAPTER 04", title: "Chatbot with Firebase", subtitle: "Firebase + ngrok + Webhook Setup + SSL/TLS" });
  page++;

  // 2. Features: Firebase services
  T.slideFeatures(pres, {
    chapter: CHAPTER, page,
    label: "01 — FIREBASE",
    title: "Firebase คืออะไร",
    subtitle: "BaaS Platform จาก Google ที่เราใช้บ่อยในงาน LINE Bot",
    features: [
      { title: "Cloud Functions", desc: "Serverless function ที่ trigger จาก HTTP / event" },
      { title: "Firestore", desc: "NoSQL Document Database" },
      { title: "Realtime Database", desc: "NoSQL สำหรับ sync realtime" },
      { title: "Hosting", desc: "โฮสต์เว็บและ SPA" },
      { title: "Authentication", desc: "ระบบ Login หลายวิธี" },
      { title: "Storage", desc: "เก็บไฟล์บนคลาวด์" },
    ],
    cols: 3,
  });
  page++;

  // 3. Steps: prep project
  T.slideSteps(pres, {
    chapter: CHAPTER, page,
    label: "02 — PREP",
    title: "เตรียมพร้อม: LINE + Firebase Project",
    subtitle: "ทั้ง 2 ฝั่ง ต้องสร้าง Channel และ Project ก่อน",
    steps: [
      "สร้าง Provider + Messaging API Channel ใน LINE Developers Console",
      "จด Channel ID, Channel Secret, Access Token",
      "ไปที่ console.firebase.google.com > Add project",
      "เปิดใช้งาน Cloud Functions",
    ],
  });
  page++;

  // 4. Code: firebase init
  T.slideCode(pres, {
    chapter: CHAPTER, page,
    label: "03 — CLI SETUP",
    title: "Firebase CLI — Init Project",
    subtitle: "ติดตั้งและเริ่มโปรเจกต์ใหม่",
    code:
`npm install -g firebase-tools
firebase login
firebase init

# เลือก Functions + Emulators
# Language: TypeScript
# ESLint: No
# Install dependencies: Yes`,
  });
  page++;

  // 5. Code: project structure
  T.slideCode(pres, {
    chapter: CHAPTER, page,
    label: "04 — PROJECT STRUCTURE",
    title: "โครงสร้าง Firebase Functions Project",
    subtitle: "หลัง firebase init จะได้โฟลเดอร์ functions/",
    code:
`functions/
├── src/
│   └── index.ts       # จุดเริ่มต้น Cloud Functions
├── lib/                # ไฟล์ .js ที่ compile แล้ว
├── package.json
└── tsconfig.json`,
  });
  page++;

  // 6. Code: webhook handler
  T.slideCode(pres, {
    chapter: CHAPTER, page,
    label: "05 — WEBHOOK HANDLER",
    title: "Cloud Function: Webhook Handler",
    subtitle: "HTTP Function สำหรับรับ Webhook Event",
    code:
`import { setGlobalOptions } from "firebase-functions/v2";
import { onRequest } from "firebase-functions/v2/https";

setGlobalOptions({ region: "asia-northeast1", memory: "1GiB", concurrency: 40 });

export const webhook = onRequest({ invoker: "public" }, async (req, res) => {
  if (req.method !== "POST") { res.status(405).send("Method Not Allowed"); }
  const events = req.body.events;
  if (!Array.isArray(events)) { res.status(400).send("Invalid payload"); return; }
  for (const event of events) { console.log(event); }
  res.end();
});`,
  });
  page++;

  // 7. Code: emulator
  T.slideCode(pres, {
    chapter: CHAPTER, page,
    label: "06 — EMULATOR",
    title: "Firebase Emulator — Test Locally",
    subtitle: "รันทดสอบในเครื่องก่อน deploy",
    code:
`npm run serve

# ผลลัพธ์
# http function initialized:
# http://127.0.0.1:5001/<project>/asia-northeast1/webhook
# Emulator UI: http://127.0.0.1:4000/`,
  });
  page++;

  // 8. Mixed: ngrok
  T.slideMixed(pres, {
    chapter: CHAPTER, page,
    label: "07 — NGROK",
    title: "ngrok — เปิด localhost สู่ Internet",
    subtitle: "สร้าง HTTPS tunnel จาก public URL ไป local port",
    bullets: [
      "สร้าง HTTPS tunnel จาก public URL ไปยัง localhost ของเรา",
      "ใช้ทดสอบ Webhook โดยไม่ต้อง deploy จริง",
      "ติดตั้งผ่าน brew install ngrok หรือดาวน์โหลดจาก ngrok.com",
      "รัน: ngrok http 5001 (ชี้ไปที่ Firebase Emulator)",
    ],
  });
  page++;

  // 9. Code: ngrok commands
  T.slideCode(pres, {
    chapter: CHAPTER, page,
    label: "08 — NGROK COMMANDS",
    title: "ngrok Commands ที่ใช้บ่อย",
    subtitle: null,
    code:
`# ตั้ง auth token ครั้งแรก
ngrok authtoken YOUR_AUTH_TOKEN

# HTTP Tunnel (ชี้ Firebase Emulator port 5001)
ngrok http 5001

# แก้ไข config file
ngrok config edit

# รันหลาย tunnel พร้อมกัน
ngrok start --all`,
  });
  page++;

  // 10. Steps: Webhook URL in Console
  T.slideSteps(pres, {
    chapter: CHAPTER, page,
    label: "09 — WEBHOOK CONSOLE",
    title: "ตั้งค่า Webhook URL ใน Developers Console",
    subtitle: "ใช้ URL จาก ngrok ชี้ไปยัง /webhook",
    steps: [
      "คัดลอก ngrok URL + path /webhook",
      "Developers Console > Channel > Messaging API tab",
      "วาง URL ที่ช่อง Webhook URL แล้ว Update",
      "คลิก Verify เพื่อทดสอบ (ต้อง Success)",
      "เปิด Use webhook ให้เป็น Enabled",
    ],
  });
  page++;

  // 11. Table: SSL/TLS
  T.slideTable(pres, {
    chapter: CHAPTER, page,
    label: "10 — SSL/TLS",
    title: "SSL / TLS Requirements for Webhook",
    subtitle: "ข้อกำหนดเรื่องใบรับรองของ LINE Platform",
    rows: [
      ["ข้อกำหนด", "รายละเอียด"],
      ["ใบรับรอง", "Public CA เท่านั้น (ไม่รับ Self-signed)"],
      ["Certificate chain", "ต้องครบ — รวม intermediate certificates"],
      ["TLS 1.3 / 1.2", "รองรับ ✓"],
      ["TLS 1.1 หรือต่ำกว่า", "ไม่รองรับ ✗"],
      ["HTTP/2, HTTP/1.1, 1.0", "รองรับ ✓"],
      ["Free option", "Let's Encrypt (ใบรับรองฟรี)"],
    ],
    colWidths: [4.0, 7.8],
  });
  page++;

  return page;
}

module.exports = { build, CHAPTER };
