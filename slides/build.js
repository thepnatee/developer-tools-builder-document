const pptxgen = require("pptxgenjs");

const COLORS = {
  dark: "0F1419",
  darkAlt: "1C2128",
  green: "06C755",
  greenDeep: "05A845",
  light: "FAFAFA",
  card: "FFFFFF",
  text: "1A1D24",
  muted: "64748B",
  border: "E5E7EB",
  accent: "FF6B35",
};

const FONT = "Tahoma";

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.3 x 7.5
pres.author = "LINE Developer Tools Builder";
pres.title = "LINE Developer Tools Builder - Overview";

const SLIDE_W = 13.3;
const SLIDE_H = 7.5;

// ---------- Helpers ----------
function addFooter(slide, pageNum, total) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: SLIDE_H - 0.35, w: SLIDE_W, h: 0.35,
    fill: { color: COLORS.dark }, line: { color: COLORS.dark },
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: SLIDE_H - 0.35, w: 0.18, h: 0.35,
    fill: { color: COLORS.green }, line: { color: COLORS.green },
  });
  slide.addText("LINE Developer Tools Builder", {
    x: 0.35, y: SLIDE_H - 0.35, w: 6, h: 0.35,
    fontFace: FONT, fontSize: 9, color: "FFFFFF", valign: "middle", margin: 0,
  });
  slide.addText(`${pageNum} / ${total}`, {
    x: SLIDE_W - 1.2, y: SLIDE_H - 0.35, w: 1, h: 0.35,
    fontFace: FONT, fontSize: 9, color: COLORS.green, valign: "middle",
    align: "right", margin: 0, bold: true,
  });
}

function addSectionHeader(slide, label, title, subtitle) {
  // left accent bar
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 0.5, w: 0.08, h: 0.9,
    fill: { color: COLORS.green }, line: { color: COLORS.green },
  });
  slide.addText(label, {
    x: 0.75, y: 0.5, w: 6, h: 0.3,
    fontFace: FONT, fontSize: 11, color: COLORS.green, bold: true,
    charSpacing: 4, margin: 0, valign: "top",
  });
  slide.addText(title, {
    x: 0.75, y: 0.82, w: 12, h: 0.65,
    fontFace: FONT, fontSize: 30, color: COLORS.text, bold: true,
    margin: 0, valign: "top",
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.75, y: 1.5, w: 12, h: 0.4,
      fontFace: FONT, fontSize: 13, color: COLORS.muted,
      margin: 0, valign: "top",
    });
  }
}

function makeShadow() {
  return { type: "outer", blur: 10, offset: 2, color: "000000", opacity: 0.08, angle: 90 };
}

function featureCard(slide, x, y, w, h, num, title, desc) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h,
    fill: { color: COLORS.card },
    line: { color: COLORS.border, width: 0.75 },
    shadow: makeShadow(),
  });
  // number badge
  slide.addShape(pres.shapes.OVAL, {
    x: x + 0.2, y: y + 0.2, w: 0.45, h: 0.45,
    fill: { color: COLORS.green }, line: { color: COLORS.green },
  });
  slide.addText(String(num), {
    x: x + 0.2, y: y + 0.2, w: 0.45, h: 0.45,
    fontFace: FONT, fontSize: 13, color: "FFFFFF", bold: true,
    align: "center", valign: "middle", margin: 0,
  });
  slide.addText(title, {
    x: x + 0.75, y: y + 0.2, w: w - 0.95, h: 0.45,
    fontFace: FONT, fontSize: 13, color: COLORS.text, bold: true,
    valign: "middle", margin: 0,
  });
  slide.addText(desc, {
    x: x + 0.2, y: y + 0.75, w: w - 0.4, h: h - 0.9,
    fontFace: FONT, fontSize: 10, color: COLORS.muted,
    valign: "top", margin: 0, paraSpaceAfter: 2,
  });
}

// ========================================================
// SLIDE 1 — Title
// ========================================================
{
  const s = pres.addSlide();
  s.background = { color: COLORS.dark };

  // decorative green block (bottom-right)
  s.addShape(pres.shapes.RECTANGLE, {
    x: SLIDE_W - 3.2, y: SLIDE_H - 3.2, w: 3.2, h: 3.2,
    fill: { color: COLORS.green, transparency: 85 }, line: { color: COLORS.green, width: 0 },
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: SLIDE_W - 2.0, y: SLIDE_H - 2.0, w: 2.0, h: 2.0,
    fill: { color: COLORS.green, transparency: 70 }, line: { color: COLORS.green, width: 0 },
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: SLIDE_W - 0.9, y: SLIDE_H - 0.9, w: 0.9, h: 0.9,
    fill: { color: COLORS.green }, line: { color: COLORS.green, width: 0 },
  });

  // top-left small accent
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.7, y: 0.9, w: 0.5, h: 0.08,
    fill: { color: COLORS.green }, line: { color: COLORS.green },
  });

  s.addText("PLATFORM OVERVIEW", {
    x: 0.7, y: 1.05, w: 10, h: 0.35,
    fontFace: FONT, fontSize: 13, color: COLORS.green, bold: true,
    charSpacing: 8, margin: 0,
  });

  s.addText("LINE Developer\nTools Builder", {
    x: 0.7, y: 1.8, w: 11, h: 2.8,
    fontFace: FONT, fontSize: 66, color: "FFFFFF", bold: true,
    valign: "top", margin: 0,
  });

  s.addText(
    "แพลตฟอร์มครบวงจรสำหรับนักพัฒนา LINE Bot สร้าง จัดการ และ deploy\nRich Messaging Applications ได้ง่าย ไม่ต้องเขียนโค้ดตั้งแต่ศูนย์",
    {
      x: 0.7, y: 4.9, w: 9, h: 1.2,
      fontFace: FONT, fontSize: 15, color: "CBD5E1",
      valign: "top", margin: 0, paraSpaceAfter: 4,
    }
  );

  s.addText("devtoolsbuilder.cloudea.tech", {
    x: 0.7, y: 6.6, w: 7, h: 0.4,
    fontFace: FONT, fontSize: 13, color: COLORS.green, bold: true, margin: 0,
  });
}

// ========================================================
// SLIDE 2 — What is it?
// ========================================================
{
  const s = pres.addSlide();
  s.background = { color: COLORS.light };
  addSectionHeader(s, "01 — INTRODUCTION", "LINE Developer Tools Builder คืออะไร?", null);

  // Left: large statement
  s.addText(
    [
      { text: "แพลตฟอร์ม", options: { color: COLORS.text } },
      { text: " ครบวงจร ", options: { color: COLORS.green, bold: true } },
      { text: "สำหรับนักพัฒนา", options: { color: COLORS.text } },
      { text: " LINE Bot", options: { color: COLORS.text, bold: true } },
    ],
    {
      x: 0.75, y: 2.2, w: 7.2, h: 1.5,
      fontFace: FONT, fontSize: 26, bold: true, valign: "top", margin: 0,
    }
  );

  s.addText(
    "รวมเครื่องมือสำคัญไว้ในที่เดียว — Rich Menu, Flex Message, จัดการสมาชิก, E-commerce, Loyalty Program — ช่วย deploy Rich Messaging Applications โดยไม่ต้องเขียนโค้ดทั้งหมดตั้งแต่ศูนย์",
    {
      x: 0.75, y: 3.9, w: 7.2, h: 2,
      fontFace: FONT, fontSize: 13, color: COLORS.muted, valign: "top", margin: 0,
    }
  );

  // Right: 3 value highlights
  const rightX = 8.6;
  const items = [
    { label: "16", desc: "Core Features\nครอบคลุมทุกมุม LINE API" },
    { label: "3", desc: "Marketplace Apps\nShop / Loyalty / Booking" },
    { label: "2", desc: "ภาษา — ไทย / English\nสลับได้ทันที" },
  ];
  items.forEach((it, i) => {
    const y = 2.05 + i * 1.45;
    s.addShape(pres.shapes.RECTANGLE, {
      x: rightX, y, w: 4.0, h: 1.25,
      fill: { color: COLORS.card },
      line: { color: COLORS.border, width: 0.75 },
      shadow: makeShadow(),
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: rightX, y, w: 0.08, h: 1.25,
      fill: { color: COLORS.green }, line: { color: COLORS.green },
    });
    s.addText(it.label, {
      x: rightX + 0.25, y: y + 0.12, w: 1.2, h: 1.0,
      fontFace: FONT, fontSize: 44, color: COLORS.green, bold: true,
      valign: "middle", margin: 0,
    });
    s.addText(it.desc, {
      x: rightX + 1.5, y: y + 0.12, w: 2.4, h: 1.0,
      fontFace: FONT, fontSize: 11, color: COLORS.text,
      valign: "middle", margin: 0, paraSpaceAfter: 3,
    });
  });

  addFooter(s, 2, 10);
}

// ========================================================
// SLIDE 3 — Feature map overview (16 features grid)
// ========================================================
{
  const s = pres.addSlide();
  s.background = { color: COLORS.light };
  addSectionHeader(s, "02 — CAPABILITIES", "16 Core Features", "ทั้งหมดในแพลตฟอร์มเดียว — จัดกลุ่มตามการใช้งาน");

  const features = [
    ["Rich Menu Builder", "Drag-and-drop 2D editor"],
    ["Flex Message", "JSON + Live Preview"],
    ["Imagemap Builder", "Clickable area mapping"],
    ["Send Message", "Push / Multicast / Narrowcast"],
    ["Member Mgmt", "Profile / Tag / Segment"],
    ["Chat Mode", "Real-time live chat"],
    ["Webhook Auto-Reply", "Keyword workflow"],
    ["Bot Templates", "11+ one-click templates"],
    ["Live Polling", "Real-time vote via LIFF"],
    ["Quiz Game", "Kahoot-style quiz"],
    ["Marketplace Apps", "Shop / Loyalty / Booking"],
    ["Utility Tools", "QR / Resize / Shortlink"],
    ["Webhook Proxy", "Event forwarding & logs"],
    ["Cronjob", "Scheduled tasks"],
    ["AI Integration", "Gemini OCR & content"],
    ["Coupon Manager", "LINE Coupon API"],
  ];

  const cols = 4, rows = 4;
  const gridX = 0.75, gridY = 2.1;
  const gridW = 11.8, gridH = 4.7;
  const gapX = 0.15, gapY = 0.15;
  const cw = (gridW - gapX * (cols - 1)) / cols;
  const ch = (gridH - gapY * (rows - 1)) / rows;

  features.forEach((f, i) => {
    const c = i % cols, r = Math.floor(i / cols);
    const x = gridX + c * (cw + gapX);
    const y = gridY + r * (ch + gapY);

    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: cw, h: ch,
      fill: { color: COLORS.card },
      line: { color: COLORS.border, width: 0.5 },
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: cw, h: 0.06,
      fill: { color: COLORS.green }, line: { color: COLORS.green },
    });
    s.addText(String(i + 1).padStart(2, "0"), {
      x: x + 0.15, y: y + 0.15, w: 0.6, h: 0.3,
      fontFace: FONT, fontSize: 10, color: COLORS.green, bold: true, margin: 0,
    });
    s.addText(f[0], {
      x: x + 0.15, y: y + 0.45, w: cw - 0.3, h: 0.55,
      fontFace: FONT, fontSize: 13, color: COLORS.text, bold: true,
      valign: "top", margin: 0,
    });
    s.addText(f[1], {
      x: x + 0.15, y: y + 0.95, w: cw - 0.3, h: 0.35,
      fontFace: FONT, fontSize: 9, color: COLORS.muted,
      valign: "top", margin: 0,
    });
  });

  addFooter(s, 3, 10);
}

// ========================================================
// SLIDE 4 — Core Builders (Rich Menu, Flex, Imagemap)
// ========================================================
{
  const s = pres.addSlide();
  s.background = { color: COLORS.light };
  addSectionHeader(s, "03 — BUILDERS", "Visual Builders", "ออกแบบข้อความ Rich Content ด้วย editor แทนการเขียนโค้ด");

  const cards = [
    {
      n: 1,
      title: "Rich Menu Builder",
      bullets: [
        "Drag-and-drop 2D Canvas + Area Mapping",
        "Real-time Preview",
        "Template Gallery & Design Library",
        "Rich Menu Alias / Per-user Assignment",
        "Bulk Link / Unlink",
        "Scheduled switch default rich menu",
      ],
    },
    {
      n: 2,
      title: "Flex Message Generator",
      bullets: [
        "JSON Editor + Live Preview",
        "Template สำเร็จรูป 20+ แบบ",
        "Component Library",
        "Save & reuse",
        "Flex Showcase",
      ],
    },
    {
      n: 3,
      title: "Imagemap Builder",
      bullets: [
        "Clickable area บน image",
        "Action Routing per area",
        "Image versioning",
        "Interactive design",
      ],
    },
  ];

  const cy = 2.2;
  const cw = 4.0;
  const ch = 4.5;
  cards.forEach((c, i) => {
    const cx = 0.75 + i * (cw + 0.25);

    // card
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: cy, w: cw, h: ch,
      fill: { color: COLORS.card },
      line: { color: COLORS.border, width: 0.75 },
      shadow: makeShadow(),
    });
    // dark header
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: cy, w: cw, h: 1.1,
      fill: { color: COLORS.dark }, line: { color: COLORS.dark },
    });
    s.addText(`0${c.n}`, {
      x: cx + 0.25, y: cy + 0.15, w: 1, h: 0.4,
      fontFace: FONT, fontSize: 11, color: COLORS.green, bold: true,
      charSpacing: 4, margin: 0,
    });
    s.addText(c.title, {
      x: cx + 0.25, y: cy + 0.48, w: cw - 0.5, h: 0.55,
      fontFace: FONT, fontSize: 17, color: "FFFFFF", bold: true,
      valign: "top", margin: 0,
    });

    // bullets
    const bulletRuns = c.bullets.map((b, idx) => ({
      text: b,
      options: { bullet: { code: "25CF" }, breakLine: idx < c.bullets.length - 1 },
    }));
    s.addText(bulletRuns, {
      x: cx + 0.3, y: cy + 1.3, w: cw - 0.5, h: ch - 1.4,
      fontFace: FONT, fontSize: 11, color: COLORS.text,
      valign: "top", margin: 0, paraSpaceAfter: 4,
    });
  });

  addFooter(s, 4, 10);
}

// ========================================================
// SLIDE 5 — Messaging & Webhook
// ========================================================
{
  const s = pres.addSlide();
  s.background = { color: COLORS.light };
  addSectionHeader(s, "04 — MESSAGING", "ส่งข้อความ & ตอบกลับอัตโนมัติ", "ครบทุกโหมดของ LINE Messaging API");

  // Left: send message types table
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.75, y: 2.1, w: 6.2, h: 4.8,
    fill: { color: COLORS.card },
    line: { color: COLORS.border, width: 0.75 },
    shadow: makeShadow(),
  });
  s.addText("Send Message", {
    x: 0.95, y: 2.25, w: 5.8, h: 0.5,
    fontFace: FONT, fontSize: 17, color: COLORS.text, bold: true, margin: 0,
  });
  s.addText("รองรับทุกรูปแบบของ Messaging API", {
    x: 0.95, y: 2.7, w: 5.8, h: 0.3,
    fontFace: FONT, fontSize: 10, color: COLORS.muted, margin: 0,
  });

  const msgTypes = [
    ["Push", "ส่งถึงผู้ใช้รายบุคคล"],
    ["Multicast", "ส่งถึงผู้ใช้หลายคนพร้อมกัน"],
    ["Broadcast", "ส่งถึงผู้ติดตามทั้งหมด"],
    ["Narrowcast", "ส่งถึงกลุ่มเป้าหมาย (Audience)"],
  ];
  msgTypes.forEach((m, i) => {
    const ry = 3.15 + i * 0.55;
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.95, y: ry, w: 5.8, h: 0.45,
      fill: { color: COLORS.light }, line: { color: COLORS.border, width: 0.5 },
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.95, y: ry, w: 0.08, h: 0.45,
      fill: { color: COLORS.green }, line: { color: COLORS.green },
    });
    s.addText(m[0], {
      x: 1.15, y: ry, w: 1.6, h: 0.45,
      fontFace: FONT, fontSize: 12, color: COLORS.text, bold: true,
      valign: "middle", margin: 0,
    });
    s.addText(m[1], {
      x: 2.75, y: ry, w: 4.0, h: 0.45,
      fontFace: FONT, fontSize: 10, color: COLORS.muted,
      valign: "middle", margin: 0,
    });
  });

  s.addText(
    [
      { text: "Preview, Quick Reply, Scheduled, Message History, Delivery Analytics", options: {} },
    ],
    {
      x: 0.95, y: 5.55, w: 5.8, h: 1.2,
      fontFace: FONT, fontSize: 10, color: COLORS.muted, italic: true,
      valign: "top", margin: 0,
    }
  );

  // Right: Webhook Auto-Response
  s.addShape(pres.shapes.RECTANGLE, {
    x: 7.15, y: 2.1, w: 5.4, h: 4.8,
    fill: { color: COLORS.dark }, line: { color: COLORS.dark },
  });
  s.addText("Webhook Auto-Responses", {
    x: 7.35, y: 2.25, w: 5, h: 0.5,
    fontFace: FONT, fontSize: 17, color: "FFFFFF", bold: true, margin: 0,
  });
  s.addText("ตอบกลับอัตโนมัติด้วย keyword + workflow", {
    x: 7.35, y: 2.7, w: 5, h: 0.3,
    fontFace: FONT, fontSize: 10, color: "94A3B8", margin: 0,
  });

  const whItems = [
    ["Flexible Workflow Builder", "ออกแบบการตอบกลับหลายเงื่อนไข"],
    ["Response Templates", "บันทึกคำตอบสำเร็จรูป"],
    ["Trigger Audience Tracking", "ดูว่า user คนไหนถูก trigger"],
    ["Workflow Grouping", "จัดหมวดหมู่เพื่อใช้ซ้ำ"],
  ];
  whItems.forEach((w, i) => {
    const ry = 3.2 + i * 0.85;
    s.addShape(pres.shapes.OVAL, {
      x: 7.35, y: ry + 0.05, w: 0.3, h: 0.3,
      fill: { color: COLORS.green }, line: { color: COLORS.green },
    });
    s.addText(String(i + 1), {
      x: 7.35, y: ry + 0.05, w: 0.3, h: 0.3,
      fontFace: FONT, fontSize: 10, color: "FFFFFF", bold: true,
      align: "center", valign: "middle", margin: 0,
    });
    s.addText(w[0], {
      x: 7.8, y: ry, w: 4.6, h: 0.35,
      fontFace: FONT, fontSize: 12, color: "FFFFFF", bold: true,
      valign: "top", margin: 0,
    });
    s.addText(w[1], {
      x: 7.8, y: ry + 0.38, w: 4.6, h: 0.35,
      fontFace: FONT, fontSize: 10, color: "94A3B8",
      valign: "top", margin: 0,
    });
  });

  addFooter(s, 5, 10);
}

// ========================================================
// SLIDE 6 — Member / Audience / Chat
// ========================================================
{
  const s = pres.addSlide();
  s.background = { color: COLORS.light };
  addSectionHeader(s, "05 — ENGAGEMENT", "Member, Audience & Chat", "จัดการผู้ติดตาม และโต้ตอบแบบ real-time");

  const items = [
    {
      t: "Member Management",
      lines: [
        "รายชื่อผู้ติดตาม + Profile",
        "Tagging & Segmentation",
        "Import จาก CSV",
        "เชื่อมเบอร์โทร / Sync Profile",
      ],
    },
    {
      t: "Audience Groups",
      lines: [
        "สร้าง / จัดการกลุ่มเป้าหมาย",
        "Click-based Audience",
        "Impression-based Audience",
        "Import จากไฟล์",
      ],
    },
    {
      t: "Chat Mode (Live)",
      lines: [
        "Live threading แชทสด",
        "User Profile + Notes",
        "Quick Actions",
        "Response Templates",
      ],
    },
  ];

  const cw = 4.0, ch = 4.5, cy = 2.2;
  items.forEach((it, i) => {
    const cx = 0.75 + i * (cw + 0.25);
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: cy, w: cw, h: ch,
      fill: { color: COLORS.card },
      line: { color: COLORS.border, width: 0.75 },
      shadow: makeShadow(),
    });
    // big number
    s.addText(`0${i + 1}`, {
      x: cx + 0.3, y: cy + 0.25, w: 1.5, h: 1.0,
      fontFace: FONT, fontSize: 48, color: COLORS.green, bold: true,
      valign: "top", margin: 0,
    });
    s.addText(it.t, {
      x: cx + 0.3, y: cy + 1.35, w: cw - 0.6, h: 0.6,
      fontFace: FONT, fontSize: 16, color: COLORS.text, bold: true,
      valign: "top", margin: 0,
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx + 0.3, y: cy + 1.95, w: 0.4, h: 0.04,
      fill: { color: COLORS.green }, line: { color: COLORS.green },
    });
    const bullets = it.lines.map((l, idx) => ({
      text: l, options: { bullet: { code: "25CF" }, breakLine: idx < it.lines.length - 1 },
    }));
    s.addText(bullets, {
      x: cx + 0.3, y: cy + 2.2, w: cw - 0.5, h: ch - 2.3,
      fontFace: FONT, fontSize: 11, color: COLORS.muted,
      valign: "top", margin: 0, paraSpaceAfter: 4,
    });
  });

  addFooter(s, 6, 10);
}

// ========================================================
// SLIDE 7 — Bot Templates & Interactive
// ========================================================
{
  const s = pres.addSlide();
  s.background = { color: COLORS.light };
  addSectionHeader(s, "06 — READY TO USE", "Bot Templates & Interactive", "11+ Bot Templates พร้อมใช้ + Live Poll / Quiz Game");

  // Left: Bot Templates grid
  s.addText("Bot Templates", {
    x: 0.75, y: 2.15, w: 7, h: 0.4,
    fontFace: FONT, fontSize: 14, color: COLORS.text, bold: true, margin: 0,
  });
  const botTemplates = [
    "Welcome Bot", "FAQ Bot", "Survey Bot", "Quiz Bot",
    "Loyalty Program", "Event Promotion", "Lead Generation", "Customer Support",
    "Appointment Booking", "Feedback", "Newsletter", "Poll Bot",
  ];
  const tCols = 3, tRows = 4;
  const tx = 0.75, ty = 2.65;
  const tw = 7.0, th = 3.2;
  const tGapX = 0.15, tGapY = 0.1;
  const tcw = (tw - tGapX * (tCols - 1)) / tCols;
  const tch = (th - tGapY * (tRows - 1)) / tRows;
  botTemplates.forEach((bt, i) => {
    const c = i % tCols, r = Math.floor(i / tCols);
    const x = tx + c * (tcw + tGapX);
    const y = ty + r * (tch + tGapY);
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: tcw, h: tch,
      fill: { color: COLORS.card },
      line: { color: COLORS.border, width: 0.5 },
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: 0.06, h: tch,
      fill: { color: COLORS.green }, line: { color: COLORS.green },
    });
    s.addText(bt, {
      x: x + 0.2, y, w: tcw - 0.25, h: tch,
      fontFace: FONT, fontSize: 11, color: COLORS.text, bold: true,
      valign: "middle", margin: 0,
    });
  });

  s.addText("One-click create · Wizard · AI-assisted generation · Preview", {
    x: 0.75, y: 6.0, w: 7, h: 0.3,
    fontFace: FONT, fontSize: 10, color: COLORS.muted, italic: true, margin: 0,
  });

  // Right: Live Polling + Quiz Game
  const rx = 8.2, rw = 4.35;
  [
    {
      y: 2.15, h: 2.25, t: "Live Polling",
      sub: "โหวตสด real-time ผ่าน LIFF",
      items: ["Multiple Choice", "Voter Interface + Presenter Mode", "Live results + Export"],
    },
    {
      y: 4.55, h: 2.25, t: "Quiz Game",
      sub: "Kahoot-style interactive quiz",
      items: ["Multiple Choice / True-False", "Timer + Leaderboard", "Host + Player page (LIFF)"],
    },
  ].forEach((b) => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: rx, y: b.y, w: rw, h: b.h,
      fill: { color: COLORS.dark }, line: { color: COLORS.dark },
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: rx, y: b.y, w: rw, h: 0.06,
      fill: { color: COLORS.green }, line: { color: COLORS.green },
    });
    s.addText(b.t, {
      x: rx + 0.3, y: b.y + 0.2, w: rw - 0.5, h: 0.45,
      fontFace: FONT, fontSize: 16, color: "FFFFFF", bold: true, margin: 0,
    });
    s.addText(b.sub, {
      x: rx + 0.3, y: b.y + 0.65, w: rw - 0.5, h: 0.35,
      fontFace: FONT, fontSize: 10, color: COLORS.green, margin: 0,
    });
    const bl = b.items.map((x, i) => ({
      text: x, options: { bullet: { code: "25CF" }, breakLine: i < b.items.length - 1 },
    }));
    s.addText(bl, {
      x: rx + 0.35, y: b.y + 1.05, w: rw - 0.6, h: b.h - 1.15,
      fontFace: FONT, fontSize: 10, color: "CBD5E1",
      valign: "top", margin: 0, paraSpaceAfter: 3,
    });
  });

  addFooter(s, 7, 10);
}

// ========================================================
// SLIDE 8 — Marketplace Apps
// ========================================================
{
  const s = pres.addSlide();
  s.background = { color: COLORS.light };
  addSectionHeader(s, "07 — MARKETPLACE", "Marketplace Apps", "Extension Apps ที่ต่อเชื่อมกับ LINE OA ได้ทันที");

  const apps = [
    {
      t: "Shop App",
      sub: "ระบบร้านค้าและ POS",
      items: [
        "Point of Sale",
        "จัดการสินค้า + สต็อก",
        "Order Management",
        "KDS สำหรับร้านอาหาร",
        "รายงานยอดขาย",
        "ใบเสร็จ + QR Code",
      ],
    },
    {
      t: "Loyalty Program",
      sub: "ระบบสะสมแต้ม",
      items: [
        "กำหนดกฎสะสมแต้ม",
        "Reward + Voucher",
        "Tier สมาชิก",
        "Dashboard สถิติ",
      ],
    },
    {
      t: "Booking App",
      sub: "ระบบจอง",
      items: [
        "จัดการ Time Slot",
        "ปฏิทินการจอง",
        "แจ้งเตือนนัดหมาย",
        "ยืนยัน / ยกเลิก",
      ],
    },
  ];

  const cw = 4.0, ch = 4.5, cy = 2.2;
  apps.forEach((a, i) => {
    const cx = 0.75 + i * (cw + 0.25);
    // whole dark card
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: cy, w: cw, h: ch,
      fill: { color: COLORS.dark }, line: { color: COLORS.dark },
    });
    // green top stripe
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: cy, w: cw, h: 1.4,
      fill: { color: COLORS.green }, line: { color: COLORS.green },
    });
    s.addText(a.t, {
      x: cx + 0.3, y: cy + 0.3, w: cw - 0.5, h: 0.55,
      fontFace: FONT, fontSize: 20, color: "FFFFFF", bold: true, margin: 0,
    });
    s.addText(a.sub, {
      x: cx + 0.3, y: cy + 0.85, w: cw - 0.5, h: 0.35,
      fontFace: FONT, fontSize: 11, color: "F0FDF4", margin: 0,
    });

    const bl = a.items.map((x, idx) => ({
      text: x, options: { bullet: { code: "25CF" }, breakLine: idx < a.items.length - 1 },
    }));
    s.addText(bl, {
      x: cx + 0.35, y: cy + 1.65, w: cw - 0.6, h: ch - 1.75,
      fontFace: FONT, fontSize: 11, color: "E2E8F0",
      valign: "top", margin: 0, paraSpaceAfter: 5,
    });
  });

  addFooter(s, 8, 10);
}

// ========================================================
// SLIDE 9 — Utility / AI / Security / Package
// ========================================================
{
  const s = pres.addSlide();
  s.background = { color: COLORS.light };
  addSectionHeader(s, "08 — PLATFORM", "Utility, AI, Security & Packages", "เครื่องมือเสริม + สถาปัตยกรรม Multi-Tenancy");

  // Row 1: Utility tools (big card left) + AI (right)
  // Utility (left, wide)
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.75, y: 2.15, w: 7.5, h: 2.3,
    fill: { color: COLORS.card },
    line: { color: COLORS.border, width: 0.75 },
    shadow: makeShadow(),
  });
  s.addText("Utility Tools", {
    x: 0.95, y: 2.25, w: 7, h: 0.4,
    fontFace: FONT, fontSize: 14, color: COLORS.text, bold: true, margin: 0,
  });

  const utils = [
    "Image Upload", "Image Resize", "QR Generator",
    "PromptPay QR", "URL Scheme", "Short Links", "LINE Beacon",
  ];
  const uCols = 4;
  const uGapX = 0.1, uGapY = 0.1;
  const uAreaX = 0.95, uAreaY = 2.7, uAreaW = 7.1, uAreaH = 1.65;
  const uRows = Math.ceil(utils.length / uCols);
  const ucw = (uAreaW - uGapX * (uCols - 1)) / uCols;
  const uch = (uAreaH - uGapY * (uRows - 1)) / uRows;
  utils.forEach((u, i) => {
    const c = i % uCols, r = Math.floor(i / uCols);
    const x = uAreaX + c * (ucw + uGapX);
    const y = uAreaY + r * (uch + uGapY);
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: ucw, h: uch,
      fill: { color: COLORS.light }, line: { color: COLORS.border, width: 0.5 },
    });
    s.addText(u, {
      x, y, w: ucw, h: uch,
      fontFace: FONT, fontSize: 11, color: COLORS.text, bold: true,
      align: "center", valign: "middle", margin: 0,
    });
  });

  // AI (right)
  s.addShape(pres.shapes.RECTANGLE, {
    x: 8.45, y: 2.15, w: 4.1, h: 2.3,
    fill: { color: COLORS.dark }, line: { color: COLORS.dark },
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 8.45, y: 2.15, w: 4.1, h: 0.06,
    fill: { color: COLORS.green }, line: { color: COLORS.green },
  });
  s.addText("AI Integration", {
    x: 8.65, y: 2.3, w: 3.7, h: 0.4,
    fontFace: FONT, fontSize: 15, color: "FFFFFF", bold: true, margin: 0,
  });
  s.addText(
    [
      { text: "Google Gemini OCR", options: { bullet: { code: "25CF" }, breakLine: true } },
      { text: "AI Flex Message Generation", options: { bullet: { code: "25CF" }, breakLine: true } },
      { text: "AI Content Generation", options: { bullet: { code: "25CF" }, breakLine: true } },
      { text: "Coupon Manager (LINE Coupon API)", options: { bullet: { code: "25CF" } } },
    ],
    {
      x: 8.7, y: 2.75, w: 3.75, h: 1.6,
      fontFace: FONT, fontSize: 11, color: "CBD5E1",
      valign: "top", margin: 0, paraSpaceAfter: 4,
    }
  );

  // Row 2: Webhook Proxy + Cronjob (left), Security (middle), Packages (right)
  // Webhook Proxy & Cron (left)
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.75, y: 4.55, w: 4.0, h: 2.3,
    fill: { color: COLORS.card }, line: { color: COLORS.border, width: 0.75 },
    shadow: makeShadow(),
  });
  s.addText("Webhook & Cron", {
    x: 0.95, y: 4.65, w: 3.6, h: 0.4,
    fontFace: FONT, fontSize: 14, color: COLORS.text, bold: true, margin: 0,
  });
  s.addText(
    [
      { text: "Webhook Proxy & Event Log", options: { bullet: { code: "25CF" }, breakLine: true } },
      { text: "Event History + สถิติ", options: { bullet: { code: "25CF" }, breakLine: true } },
      { text: "Cron Scheduler (รองรับ expression)", options: { bullet: { code: "25CF" }, breakLine: true } },
      { text: "Log + Dry-run", options: { bullet: { code: "25CF" } } },
    ],
    {
      x: 0.95, y: 5.1, w: 3.6, h: 1.75,
      fontFace: FONT, fontSize: 11, color: COLORS.muted,
      valign: "top", margin: 0, paraSpaceAfter: 5,
    }
  );

  // Security (middle)
  s.addShape(pres.shapes.RECTANGLE, {
    x: 4.95, y: 4.55, w: 3.3, h: 2.3,
    fill: { color: COLORS.card }, line: { color: COLORS.border, width: 0.75 },
    shadow: makeShadow(),
  });
  s.addText("Security", {
    x: 5.15, y: 4.65, w: 3.0, h: 0.4,
    fontFace: FONT, fontSize: 14, color: COLORS.text, bold: true, margin: 0,
  });
  s.addText(
    [
      { text: "Firebase Auth + LIFF", options: { bullet: { code: "25CF" }, breakLine: true } },
      { text: "Role-based Access (Owner / Admin / Member)", options: { bullet: { code: "25CF" }, breakLine: true } },
      { text: "Encrypted Channel Credentials", options: { bullet: { code: "25CF" }, breakLine: true } },
      { text: "Webhook Validation + Audit Log", options: { bullet: { code: "25CF" } } },
    ],
    {
      x: 5.15, y: 5.1, w: 3.0, h: 1.75,
      fontFace: FONT, fontSize: 10, color: COLORS.muted,
      valign: "top", margin: 0, paraSpaceAfter: 5,
    }
  );

  // Packages (right)
  s.addShape(pres.shapes.RECTANGLE, {
    x: 8.45, y: 4.55, w: 4.1, h: 2.3,
    fill: { color: COLORS.card }, line: { color: COLORS.border, width: 0.75 },
    shadow: makeShadow(),
  });
  s.addText("Multi-Tenancy & Packages", {
    x: 8.65, y: 4.65, w: 3.8, h: 0.4,
    fontFace: FONT, fontSize: 14, color: COLORS.text, bold: true, margin: 0,
  });
  const pkgs = [
    ["Free", "เริ่มใช้งานฟรี"],
    ["Pro", "ปลดล็อกฟีเจอร์เพิ่ม"],
    ["Business", "เต็มรูปแบบสำหรับธุรกิจ"],
  ];
  pkgs.forEach((p, i) => {
    const py = 5.15 + i * 0.52;
    s.addShape(pres.shapes.RECTANGLE, {
      x: 8.65, y: py, w: 3.75, h: 0.42,
      fill: { color: COLORS.light }, line: { color: COLORS.border, width: 0.5 },
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: 8.65, y: py, w: 0.08, h: 0.42,
      fill: { color: COLORS.green }, line: { color: COLORS.green },
    });
    s.addText(p[0], {
      x: 8.82, y: py, w: 1.1, h: 0.42,
      fontFace: FONT, fontSize: 11, color: COLORS.text, bold: true,
      valign: "middle", margin: 0,
    });
    s.addText(p[1], {
      x: 9.95, y: py, w: 2.4, h: 0.42,
      fontFace: FONT, fontSize: 10, color: COLORS.muted,
      valign: "middle", margin: 0,
    });
  });

  addFooter(s, 9, 10);
}

// ========================================================
// SLIDE 10 — Summary / CTA
// ========================================================
{
  const s = pres.addSlide();
  s.background = { color: COLORS.dark };

  // large accent
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 0.25, h: SLIDE_H,
    fill: { color: COLORS.green }, line: { color: COLORS.green },
  });

  s.addText("SUMMARY", {
    x: 0.75, y: 0.75, w: 8, h: 0.4,
    fontFace: FONT, fontSize: 13, color: COLORS.green, bold: true,
    charSpacing: 8, margin: 0,
  });

  s.addText("ใช้แพลตฟอร์มเดียว\nครอบคลุม LINE OA ทั้งระบบ", {
    x: 0.75, y: 1.25, w: 12, h: 1.8,
    fontFace: FONT, fontSize: 40, color: "FFFFFF", bold: true,
    valign: "top", margin: 0,
  });

  const benefits = [
    "สร้างและจัดการ LINE Bot ได้ง่ายและรวดเร็ว",
    "ใช้ Visual Editor แทนการเขียนโค้ดทั้งหมด",
    "ขยายความสามารถด้วย Marketplace Apps (Shop / Loyalty / Booking)",
    "สร้างประสบการณ์ Interactive ด้วย Quiz / Poll / Chat Mode",
    "จัดการสมาชิกและ Audience อย่างเป็นระบบ",
    "Automate งานซ้ำ ๆ ด้วย Webhook Auto-response + Cronjob",
  ];
  const bx = 0.75, by = 3.5;
  const bw = 6.0, bh = 0.55;
  benefits.forEach((b, i) => {
    const c = i % 2, r = Math.floor(i / 2);
    const x = bx + c * (bw + 0.3);
    const y = by + r * (bh + 0.15);

    s.addShape(pres.shapes.OVAL, {
      x, y: y + 0.08, w: 0.35, h: 0.35,
      fill: { color: COLORS.green }, line: { color: COLORS.green },
    });
    s.addText("✓", {
      x, y: y + 0.08, w: 0.35, h: 0.35,
      fontFace: FONT, fontSize: 14, color: "FFFFFF", bold: true,
      align: "center", valign: "middle", margin: 0,
    });
    s.addText(b, {
      x: x + 0.5, y, w: bw - 0.55, h: bh,
      fontFace: FONT, fontSize: 13, color: "E2E8F0",
      valign: "middle", margin: 0,
    });
  });

  // CTA
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.75, y: 6.3, w: 6, h: 0.7,
    fill: { color: COLORS.green }, line: { color: COLORS.green },
  });
  s.addText("เริ่มต้นใช้งาน →  devtoolsbuilder.cloudea.tech", {
    x: 0.75, y: 6.3, w: 6, h: 0.7,
    fontFace: FONT, fontSize: 14, color: "FFFFFF", bold: true,
    align: "center", valign: "middle", margin: 0,
  });
}

// ---------- Write ----------
pres.writeFile({
  fileName: "/Users/thepnatee/work/cloudea-tech/workshop/developer-tools-builder-document/slides/LINE-Dev-Tools-Builder-Overview.pptx",
}).then((f) => console.log("Saved:", f));
