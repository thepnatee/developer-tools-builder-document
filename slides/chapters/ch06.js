const path = require("path");
const fs = require("fs");
const T = require("../theme");

const ASSETS = path.resolve(__dirname, "../../assets/ch06-flex-message");
const CHAPTER = "Chapter 6 · Flex Message";

async function safeLoad(loader, filename, ...args) {
  const p = path.join(ASSETS, filename);
  if (!fs.existsSync(p)) return null;
  try { return await loader(p, ...args); }
  catch (e) { console.warn(`  ⚠ ${filename}: ${e.message}`); return null; }
}

async function build(pres, startPage = 1) {
  let page = startPage;

  const structImg = await safeLoad(T.imageToBase64, "flex-structure.png");
  const wsImg = await safeLoad(T.imageToBase64, "flex-workshop.png");

  // 1. Divider
  T.slideDivider(pres, { chapter: "CHAPTER 06", title: "Flex Message", subtitle: "สร้างข้อความ Layout ยืดหยุ่นเหมือน CSS Flexbox" });
  page++;

  // 2. Intro
  T.slideIntro(pres, {
    chapter: CHAPTER, page,
    label: "01 — WHAT",
    title: "Flex Message คืออะไร",
    subtitle: "Rich content message ที่จัดวาง layout ได้อิสระ",
    bullets: [
      "ข้อความที่จัดวาง layout ได้อิสระตาม CSS Flexbox",
      "ประกอบจาก JSON: type=flex + altText + contents",
      "รองรับ LTR และ RTL",
      "ผลแสดงต่างตาม OS, version LINE, resolution, font",
    ],
  });
  page++;

  // 3. Cards: Structure 3 layers (with image side)
  T.slideFeatures(pres, {
    chapter: CHAPTER, page,
    label: "02 — STRUCTURE",
    title: "โครงสร้าง 3 ชั้น: Container > Block > Component",
    subtitle: null,
    features: [
      { title: "Bubble", desc: "กล่องเดียว สูงสุด 30 KB" },
      { title: "Carousel", desc: "สูงสุด 12 bubbles, 50 KB" },
      { title: "Header / Hero", desc: "หัว + ภาพ/วิดีโอเด่น" },
      { title: "Body / Footer", desc: "เนื้อหาหลัก + ปุ่มท้าย" },
      { title: "Components", desc: "box, text, image, button, icon, span, separator" },
      { title: "Bubble Size", desc: "giga, mega, kilo, hecto, deca, micro, nano" },
    ],
    cols: 3,
  });
  page++;

  // 4. Note: Flex Simulator
  T.slideNote(pres, {
    chapter: CHAPTER, page,
    label: "03 — TOOLING",
    title: "Flex Simulator",
    subtitle: "เครื่องมือทดสอบ Flex Message ออนไลน์",
    text: [
      "developers.line.biz/flex-simulator — เครื่องมือสร้าง Flex Message พร้อม template 12 แบบ ไม่ต้องเขียนโค้ด",
      "LINE Bot Designer ก็ใช้ออกแบบได้เช่นกัน",
      "ใช้ได้ทั้งสำหรับการทดสอบ และการสร้าง template",
    ],
  });
  page++;

  // 5. Code: Basic bubble
  T.slideCode(pres, {
    chapter: CHAPTER, page,
    label: "04 — BUBBLE",
    title: "Bubble — โครงสร้างพื้นฐาน",
    subtitle: "Header / Hero / Body / Footer",
    code:
`{
  "type":"bubble",
  "header": { "type":"box", "layout":"vertical",
    "contents":[{"type":"text","text":"Header"}] },
  "hero": { "type":"image", "url":"...",
    "size":"full", "aspectRatio":"2:1" },
  "body": { "type":"box", "layout":"vertical",
    "contents":[{"type":"text","text":"Body"}] },
  "footer": { "type":"box", "layout":"vertical",
    "contents":[{"type":"button","action":{}}] }
}`,
  });
  page++;

  // 6. Table: Text component properties
  T.slideTable(pres, {
    chapter: CHAPTER, page,
    label: "05 — TEXT COMPONENT",
    title: "Text Component — Properties",
    subtitle: "Property ที่ใช้บ่อย",
    rows: [
      ["Property", "รายละเอียด"],
      ["text / wrap / maxLines", "ข้อความ, ตัดคำ, จำกัดบรรทัด"],
      ["size", "xxs – 5xl (default md)"],
      ["weight / color", "regular / bold + hex color"],
      ["align / gravity", "start / center / end + top / center / bottom"],
      ["margin / flex", "ระยะห่าง + สัดส่วนใน box"],
      ["action", "postback / message / uri / datetimepicker"],
      ["scaling", "ปรับตาม font ของ LINE app"],
    ],
    colWidths: [3.5, 8.3],
  });
  page++;

  // 7. Cards: Box layout
  T.slideCards(pres, {
    chapter: CHAPTER, page,
    label: "06 — BOX LAYOUT",
    title: "Box Layout 3 แบบ + Properties",
    subtitle: null,
    cards: [
      { title: "vertical", desc: "เรียงจากบนลงล่าง (แนวตั้ง)" },
      { title: "horizontal", desc: "เรียงจากซ้ายไปขวา (แนวนอน)" },
      { title: "baseline", desc: "แนวนอน + เรียงบนเส้นฐานเดียวกัน (text, icon)" },
      { title: "spacing", desc: "none, xs, sm, md, lg, xl, xxl" },
      { title: "background", desc: "รองรับ linearGradient (start / center / end)" },
      { title: "padding", desc: "paddingAll / Top / Bottom / Start / End" },
    ],
    cols: 3,
  });
  page++;

  // 8. Mixed: Button + Image specs
  T.slideMixed(pres, {
    chapter: CHAPTER, page,
    label: "07 — BUTTON / IMAGE",
    title: "Button + Image — Specs",
    subtitle: null,
    bullets: [
      "Button style: primary, secondary, link · height: sm, md",
      "Button action: postback, message, uri, datetimepicker",
      "Image: HTTPS, JPG / PNG, ≤ 1024×1024, ≤ 1 MB",
      "Image APNG animated (≤ 300 KB) ใช้แทน GIF ได้",
      "Icon: ≤ 240×240, ใช้ได้ใน baseline box เท่านั้น",
    ],
  });
  page++;

  // 9. Mixed: Video
  T.slideMixed(pres, {
    chapter: CHAPTER, page,
    label: "08 — VIDEO",
    title: "Video Component",
    subtitle: "อยู่ใน Hero block เท่านั้น",
    bullets: [
      "Bubble size รองรับ: kilo, mega, giga (ไม่รองรับ Carousel)",
      "mp4 HTTPS ≤ 200 MB + previewUrl JPG / PNG ≤ 1 MB",
      "altContent บังคับ — แสดงแทนในเวอร์ชันไม่รองรับ",
      "LINE iOS / Android 11.22+ / PC 7.7+",
    ],
  });
  page++;

  // 10. Code: Shrink-to-Fit / Scaling
  T.slideCode(pres, {
    chapter: CHAPTER, page,
    label: "09 — RESPONSIVE",
    title: "Shrink-to-Fit & Scaling",
    subtitle: "ทำให้ข้อความปรับตาม font ได้",
    code:
`// Shrink ข้อความที่ยาวเกิน
{ "type":"button", "style":"primary",
  "adjustMode":"shrink-to-fit",
  "action":{} }

// Scale ตามการตั้งค่า font ของ LINE
{ "type":"text", "text":"hello", "size":"30px", "scaling": true }`,
  });
  page++;

  // 11. Steps: Workshop
  T.slideSteps(pres, {
    chapter: CHAPTER, page,
    label: "10 — WORKSHOP",
    title: "Workshop: ใบเสร็จ 7-Eleven ด้วย ChatGPT",
    subtitle: "สร้าง Flex Message จริงด้วย AI",
    steps: [
      "ใช้ ChatGPT ออกแบบและเขียน JSON สำหรับ Flex Message",
      "ทดสอบบน Flex Simulator",
      "ส่งทดสอบผ่าน LINE Bot จริง",
      "ตรวจสอบทุกองค์ประกอบแสดงผลถูกต้อง",
      "Submit: JSON + screenshot",
    ],
    images: wsImg ? [{ data: wsImg }] : [],
  });
  page++;

  return page;
}

module.exports = { build, CHAPTER };
