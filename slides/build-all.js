// Master builder — combines all chapters into one LINE-Developer-Tools-Workshop.pptx
const pptxgen = require("pptxgenjs");
const path = require("path");
const T = require("./theme");

const CHAPTERS = [
  { num: 1, mod: require("./chapters/ch01") },
  // Ch.2-11 appended when built
];

// Attempt to require optional chapters
for (let i = 2; i <= 11; i++) {
  try {
    const m = require(`./chapters/ch${String(i).padStart(2, "0")}`);
    CHAPTERS.push({ num: i, mod: m });
  } catch (e) {
    // not yet built — skip
  }
}

async function main() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_WIDE";
  pres.author = "LINE Developer Tools Workshop";
  pres.title = "LINE Developer Tools — Complete Workshop";

  // ---- SLIDE 1: Workshop-level cover ----
  {
    const s = pres.addSlide();
    s.background = { color: T.COLORS.dark };

    s.addShape("rect", {
      x: T.SLIDE_W - 4.0, y: T.SLIDE_H - 4.0, w: 4.0, h: 4.0,
      fill: { color: T.COLORS.green, transparency: 88 }, line: { color: T.COLORS.green, width: 0 },
    });
    s.addShape("rect", {
      x: T.SLIDE_W - 2.5, y: T.SLIDE_H - 2.5, w: 2.5, h: 2.5,
      fill: { color: T.COLORS.green, transparency: 75 }, line: { color: T.COLORS.green, width: 0 },
    });
    s.addShape("rect", {
      x: T.SLIDE_W - 1.2, y: T.SLIDE_H - 1.2, w: 1.2, h: 1.2,
      fill: { color: T.COLORS.green }, line: { color: T.COLORS.green, width: 0 },
    });

    s.addShape("rect", {
      x: 0.7, y: 0.9, w: 0.5, h: 0.08,
      fill: { color: T.COLORS.green }, line: { color: T.COLORS.green },
    });
    s.addText("COMPLETE WORKSHOP", {
      x: 0.7, y: 1.05, w: 12, h: 0.35,
      fontFace: T.FONT, fontSize: 13, color: T.COLORS.green, bold: true,
      charSpacing: 8, margin: 0,
    });

    s.addText("LINE Developer\nTools", {
      x: 0.7, y: 1.8, w: 11, h: 2.6,
      fontFace: T.FONT, fontSize: 72, color: "FFFFFF", bold: true,
      valign: "top", margin: 0,
    });

    s.addText("Workshop Series · 11 Chapters", {
      x: 0.7, y: 4.7, w: 11, h: 0.5,
      fontFace: T.FONT, fontSize: 22, color: T.COLORS.green, bold: true,
      valign: "top", margin: 0,
    });

    s.addText(
      "จาก LINE Official Account → Messaging API → Webhook → Firebase\nMessages / Flex / Rich Menu / LIFF / Mini App / Dev Tools Builder",
      {
        x: 0.7, y: 5.4, w: 11, h: 1.2,
        fontFace: T.FONT, fontSize: 14, color: "CBD5E1",
        valign: "top", margin: 0, paraSpaceAfter: 4,
      }
    );
  }

  // ---- SLIDE 2: Table of contents ----
  {
    const s = pres.addSlide();
    s.background = { color: T.COLORS.light };
    T.addSectionHeader(s, "CONTENTS", "สารบัญ Workshop", "ครอบคลุม LINE Developer Tools ตั้งแต่พื้นฐาน → ระดับสูง");

    const chapters = [
      { n: "01", t: "Introduction & Overview", d: "LINE OA, Developers, URL Scheme, Certified Provider" },
      { n: "02", t: "Open Account & Messaging API", d: "การเปิดบัญชี OA และ Messaging API basics" },
      { n: "03", t: "Webhook", d: "LINE Webhook Events และการจัดการ" },
      { n: "04", t: "Chatbot with Firebase", d: "Firebase Functions, ngrok, webhook setup, SSL/TLS" },
      { n: "05", t: "Messages", d: "Message types, Quick Reply, Quote Token, Narrowcast, Statistics" },
      { n: "06", t: "Flex Message", d: "Overview, Simulator, ChatGPT workshop" },
      { n: "07", t: "Firebase Storage", d: "จัดเก็บและเรียกใช้รูป / media" },
      { n: "08", t: "Rich Menu", d: "Rich Menu ออกแบบและ Switch Action" },
      { n: "09", t: "LIFF", d: "LIFF Overview, Profile, Scan QR, Sending, CLI" },
      { n: "10", t: "LINE Mini App", d: "MINI App Overview, Service Message, Home Screen" },
      { n: "11", t: "LINE Dev Tools Builder", d: "Platform overview และ guide" },
    ];

    const cols = 2;
    const cw = 5.9, ch = 0.9;
    const gx = 0.75, gy = 2.15, gap = 0.12;
    chapters.forEach((c, i) => {
      const cc = i % cols, cr = Math.floor(i / cols);
      const x = gx + cc * (cw + 0.15);
      const y = gy + cr * (ch + gap);

      s.addShape("rect", {
        x, y, w: cw, h: ch,
        fill: { color: T.COLORS.card }, line: { color: T.COLORS.border, width: 0.5 },
      });
      s.addShape("rect", {
        x, y, w: 0.9, h: ch,
        fill: { color: T.COLORS.green }, line: { color: T.COLORS.green },
      });
      s.addText(c.n, {
        x, y, w: 0.9, h: ch,
        fontFace: T.FONT, fontSize: 22, color: "FFFFFF", bold: true,
        align: "center", valign: "middle", margin: 0,
      });
      s.addText(c.t, {
        x: x + 1.0, y: y + 0.12, w: cw - 1.15, h: 0.4,
        fontFace: T.FONT, fontSize: 13, color: T.COLORS.text, bold: true,
        valign: "top", margin: 0,
      });
      s.addText(c.d, {
        x: x + 1.0, y: y + 0.48, w: cw - 1.15, h: 0.4,
        fontFace: T.FONT, fontSize: 10, color: T.COLORS.muted,
        valign: "top", margin: 0,
      });
    });
  }

  // ---- Build chapters sequentially ----
  let page = 3; // after cover + TOC
  for (const { num, mod } of CHAPTERS) {
    console.log(`Building Chapter ${num}…`);
    page = await mod.build(pres, page);
  }

  const OUT = path.resolve(__dirname, "LINE-Developer-Tools-Workshop.pptx");
  await pres.writeFile({ fileName: OUT });
  console.log(`\n✓ Saved: ${OUT}`);
  console.log(`  Total slides: ${page - 1}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
