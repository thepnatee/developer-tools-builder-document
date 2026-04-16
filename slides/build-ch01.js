const pptxgen = require("pptxgenjs");
const path = require("path");
const T = require("./theme");

const ASSETS = path.resolve(__dirname, "../assets/ch01-introduction");
const OUT = path.resolve(__dirname, "Ch01-Introduction-Overview.pptx");
const CHAPTER = "Chapter 1 · Introduction & Overview";

async function main() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_WIDE";
  pres.author = "LINE Developer Tools Workshop";
  pres.title = "Ch 1 · Introduction & Overview";

  // Preload images
  const wordmark = await T.svgToPngBase64(path.join(ASSETS, "line-official-account-wordmark.svg"), 600);
  const oaCompare = await T.svgToPngBase64(path.join(ASSETS, "line-oa-and-personal-compare.svg"), 1000);
  const shieldGray = await T.svgToPngBase64(path.join(ASSETS, "line-oa-shield-unverified.svg"), 200);
  const shieldBlue = await T.svgToPngBase64(path.join(ASSETS, "line-oa-shield-verified.svg"), 200);
  const shieldGreen = await T.svgToPngBase64(path.join(ASSETS, "line-oa-shield-premium.svg"), 200);
  const devLogo = await T.svgToPngBase64(path.join(ASSETS, "line-dev-logo.svg"), 600);
  const apiStatusImg = await T.imageToBase64(path.join(ASSETS, "line-api-status-monitor-site.jpg"));
  const certifiedImg = await T.webpToPngBase64(path.join(ASSETS, "certified-provider.webp"), 800);
  const premiumIdImg = await T.svgToPngBase64(path.join(ASSETS, "line-oa-premium-id.svg"), 1200);

  const TOTAL = 15;
  let page = 0;
  const pad = () => page++;

  // ======================================================
  // SLIDE 1 — Cover
  // ======================================================
  {
    const s = T.addCoverSlide(
      pres,
      1,
      "Introduction & Overview",
      "ทำความรู้จัก LINE Official Account, LINE Developers Services\nURL Scheme, API Status และ Certified Provider"
    );
    pad();
  }

  // ======================================================
  // SLIDE 2 — LINE Official Account (intro)
  // ======================================================
  {
    const s = pres.addSlide();
    s.background = { color: T.COLORS.light };
    T.addSectionHeader(s, "01 — LINE OFFICIAL ACCOUNT", "LINE Official Account คืออะไร?", null);

    // left: description
    s.addText(
      [
        { text: "แพลตฟอร์มสำหรับธุรกิจ", options: { bold: true, color: T.COLORS.text, breakLine: true } },
        { text: "ช่วยให้ธุรกิจหรือบุคคล ", options: { color: T.COLORS.text } },
        { text: "สื่อสารและสร้างความสัมพันธ์", options: { bold: true, color: T.COLORS.green } },
        { text: "กับลูกค้าได้อย่างมีประสิทธิภาพ ผ่านแอปพลิเคชัน LINE ที่มีผู้ใช้จำนวนมากในหลายประเทศ", options: { color: T.COLORS.text } },
      ],
      {
        x: 0.75, y: 2.3, w: 6.0, h: 3.5,
        fontFace: T.FONT, fontSize: 17, valign: "top", margin: 0, paraSpaceAfter: 12,
      }
    );

    // comparison points
    const rows = [
      { k: "สำหรับใคร", v: "ธุรกิจ / แบรนด์ / บุคคลที่ต้องการสื่อสารกับลูกค้า" },
      { k: "รองรับอะไร", v: "Broadcast, Rich Menu, Auto Reply, Analytics" },
      { k: "เชื่อมต่อ API", v: "Messaging API, LIFF, Login และอื่นๆ" },
    ];
    rows.forEach((r, i) => {
      const y = 4.2 + i * 0.6;
      s.addShape("rect", {
        x: 0.75, y, w: 6.0, h: 0.5,
        fill: { color: T.COLORS.card }, line: { color: T.COLORS.border, width: 0.5 },
      });
      s.addShape("rect", {
        x: 0.75, y, w: 0.08, h: 0.5,
        fill: { color: T.COLORS.green }, line: { color: T.COLORS.green },
      });
      s.addText(r.k, {
        x: 0.9, y, w: 1.5, h: 0.5,
        fontFace: T.FONT, fontSize: 11, color: T.COLORS.green, bold: true,
        valign: "middle", margin: 0,
      });
      s.addText(r.v, {
        x: 2.4, y, w: 4.25, h: 0.5,
        fontFace: T.FONT, fontSize: 11, color: T.COLORS.muted,
        valign: "middle", margin: 0,
      });
    });

    // right: comparison SVG
    s.addImage({
      data: oaCompare,
      x: 7.1, y: 2.2, w: 5.5, h: 4.6,
      sizing: { type: "contain", w: 5.5, h: 4.6 },
    });

    T.addFooter(s, CHAPTER, 2, TOTAL);
    pad();
  }

  // ======================================================
  // SLIDE 3 — Features (7 features)
  // ======================================================
  {
    const s = pres.addSlide();
    s.background = { color: T.COLORS.light };
    T.addSectionHeader(s, "02 — FEATURES", "Features ของ LINE Official Account", "ฟีเจอร์หลักที่ใช้งานได้จาก Manager + API");

    const rows = [
      ["Feature", "คำอธิบาย", "API"],
      ["Broadcast Message", "ส่งข้อความ / รูป / วิดีโอ / ไฟล์ ถึงผู้ติดตามทั้งหมดพร้อมกัน", "Yes"],
      ["Auto Reply & Greeting", "ตอบกลับอัตโนมัติเมื่อ user ส่งข้อความ + ข้อความทักทายเพื่อนใหม่", "Yes"],
      ["Rich Menu", "เมนูด้านล่างหน้าจอแชท เข้าถึงฟีเจอร์ต่าง ๆ ได้ง่าย", "Yes"],
      ["Rich Message & Video", "รูป / วิดีโอ + ลิงก์ เพื่อเพิ่ม click-through rate", "Yes"],
      ["Coupons & Loyalty", "คูปองส่วนลดและระบบสะสมแต้ม / แสตมป์", "No"],
      ["Surveys & Polls", "แบบสอบถาม / โพลเก็บข้อมูลจากลูกค้า", "No"],
      ["Analytics", "สถิติการส่ง / เปิดอ่าน / คลิก วัดผลแคมเปญ", "Yes"],
    ];
    T.addDataTable(s, rows, {
      x: 0.75, y: 2.15, w: 11.8,
      colWidths: [3.2, 7.0, 1.6],
      centerCols: [2],
      rowH: 0.52,
      headerH: 0.5,
      bodyFontSize: 11,
      headerFontSize: 12,
    });

    T.addFooter(s, CHAPTER, 3, TOTAL);
    pad();
  }

  // ======================================================
  // SLIDE 4 — Package ของ LINE OA
  // ======================================================
  {
    const s = pres.addSlide();
    s.background = { color: T.COLORS.light };
    T.addSectionHeader(s, "03 — PRICING", "Package ของ LINE Official Account", "ราคาต่อเดือน (อัปเดต 1 ส.ค. 2024)");

    const pkgs = [
      { name: "Free", price: "ฟรี", msgs: "300", extra: "ไม่สามารถซื้อเพิ่ม", crm: "—", recommended: false },
      { name: "Basic", price: "1,280 บาท", msgs: "15,000", extra: "0.10 บาท / ข้อความ", crm: "369 บาท/เดือน", recommended: true },
      { name: "Pro", price: "1,780 บาท", msgs: "35,000", extra: "0.06 บาท / ข้อความ", crm: "ฟรี", recommended: false },
    ];

    const cw = 3.9, ch = 4.4, cy = 2.2;
    pkgs.forEach((p, i) => {
      const cx = 0.85 + i * (cw + 0.2);
      const isRec = p.recommended;

      // card
      s.addShape("rect", {
        x: cx, y: cy, w: cw, h: ch,
        fill: { color: isRec ? T.COLORS.dark : T.COLORS.card },
        line: { color: isRec ? T.COLORS.dark : T.COLORS.border, width: 0.75 },
        shadow: T.makeShadow(),
      });

      // top accent
      s.addShape("rect", {
        x: cx, y: cy, w: cw, h: 0.1,
        fill: { color: T.COLORS.green }, line: { color: T.COLORS.green },
      });

      // "RECOMMENDED" badge
      if (isRec) {
        s.addShape("rect", {
          x: cx + cw / 2 - 0.9, y: cy - 0.2, w: 1.8, h: 0.4,
          fill: { color: T.COLORS.green }, line: { color: T.COLORS.green },
        });
        s.addText("RECOMMENDED", {
          x: cx + cw / 2 - 0.9, y: cy - 0.2, w: 1.8, h: 0.4,
          fontFace: T.FONT, fontSize: 10, color: "FFFFFF", bold: true,
          align: "center", valign: "middle", margin: 0, charSpacing: 3,
        });
      }

      // package name
      s.addText(p.name, {
        x: cx, y: cy + 0.35, w: cw, h: 0.6,
        fontFace: T.FONT, fontSize: 22, color: isRec ? T.COLORS.green : T.COLORS.text,
        bold: true, align: "center", valign: "middle", margin: 0,
      });

      // price
      s.addText(p.price, {
        x: cx, y: cy + 1.05, w: cw, h: 0.8,
        fontFace: T.FONT, fontSize: 30, color: isRec ? "FFFFFF" : T.COLORS.text,
        bold: true, align: "center", valign: "middle", margin: 0,
      });
      s.addText("ต่อเดือน", {
        x: cx, y: cy + 1.75, w: cw, h: 0.3,
        fontFace: T.FONT, fontSize: 10, color: isRec ? T.COLORS.mutedLight : T.COLORS.muted,
        align: "center", valign: "middle", margin: 0,
      });

      // divider
      s.addShape("rect", {
        x: cx + 0.6, y: cy + 2.2, w: cw - 1.2, h: 0.02,
        fill: { color: isRec ? T.COLORS.borderDark : T.COLORS.border },
        line: { color: isRec ? T.COLORS.borderDark : T.COLORS.border },
      });

      // details
      const details = [
        { label: "ข้อความฟรี / เดือน", value: p.msgs },
        { label: "ข้อความเพิ่ม", value: p.extra },
        { label: "MyCustomer CRM", value: p.crm },
      ];
      details.forEach((d, j) => {
        const dy = cy + 2.4 + j * 0.55;
        s.addText(d.label, {
          x: cx + 0.3, y: dy, w: cw - 0.6, h: 0.25,
          fontFace: T.FONT, fontSize: 10, color: isRec ? T.COLORS.mutedLight : T.COLORS.muted,
          margin: 0,
        });
        s.addText(d.value, {
          x: cx + 0.3, y: dy + 0.22, w: cw - 0.6, h: 0.3,
          fontFace: T.FONT, fontSize: 13, color: isRec ? "FFFFFF" : T.COLORS.text, bold: true,
          margin: 0,
        });
      });
    });

    // Note
    T.addNoteBox(s, "ราคายังไม่รวม VAT 7% — อัปเดตตั้งแต่ 1 สิงหาคม 2024", {
      x: 0.85, y: 6.8, w: 11.65, h: 0.3,
    });

    T.addFooter(s, CHAPTER, 4, TOTAL);
    pad();
  }

  // ======================================================
  // SLIDE 5 — ชนิดของบัญชี LINE OA
  // ======================================================
  {
    const s = pres.addSlide();
    s.background = { color: T.COLORS.light };
    T.addSectionHeader(s, "04 — ACCOUNT TYPES", "ชนิดของบัญชี LINE Official Account", "ดูได้จากสีของโล่บน Profile ของ OA");

    const accounts = [
      {
        name: "บัญชีทั่วไป",
        subtitle: "Unverified", shield: shieldGray,
        price: "ฟรี",
        desc: "ได้รับเมื่อเริ่มต้นใช้งาน\nสามารถอัปเกรดเป็น Verified / Premium ได้",
        tint: "F1F5F9",
      },
      {
        name: "บัญชีรับรอง",
        subtitle: "Verified", shield: shieldBlue,
        price: "888 บาท (ครั้งเดียว)",
        desc: "ค้นหาเจอได้ง่ายบน LINE + Search Engine\nใช้ได้ตลอดอายุการใช้งาน",
        tint: "EFF6FF",
      },
      {
        name: "บัญชีพรีเมียม",
        subtitle: "Premium", shield: shieldGreen,
        price: "ค่าใช้จ่ายขั้นต่ำ",
        desc: "สำหรับธุรกิจขนาดใหญ่ (ฐานผู้ติดตามหลักล้าน)\nใช้ Sponsor Sticker ได้",
        tint: "F0FDF4",
      },
    ];

    const cw = 3.9, ch = 4.4, cy = 2.2;
    accounts.forEach((a, i) => {
      const cx = 0.85 + i * (cw + 0.2);
      s.addShape("rect", {
        x: cx, y: cy, w: cw, h: ch,
        fill: { color: T.COLORS.card }, line: { color: T.COLORS.border, width: 0.75 },
        shadow: T.makeShadow(),
      });
      // tint top
      s.addShape("rect", {
        x: cx, y: cy, w: cw, h: 1.8,
        fill: { color: a.tint }, line: { color: a.tint },
      });
      // shield image
      s.addImage({
        data: a.shield, x: cx + cw / 2 - 0.55, y: cy + 0.25, w: 1.1, h: 1.3,
        sizing: { type: "contain", w: 1.1, h: 1.3 },
      });
      // name
      s.addText(a.name, {
        x: cx, y: cy + 1.85, w: cw, h: 0.45,
        fontFace: T.FONT, fontSize: 18, color: T.COLORS.text, bold: true,
        align: "center", valign: "top", margin: 0,
      });
      // subtitle
      s.addText(a.subtitle, {
        x: cx, y: cy + 2.3, w: cw, h: 0.3,
        fontFace: T.FONT, fontSize: 11, color: T.COLORS.green, bold: true,
        align: "center", valign: "top", margin: 0, charSpacing: 3,
      });
      // divider
      s.addShape("rect", {
        x: cx + 0.8, y: cy + 2.7, w: cw - 1.6, h: 0.02,
        fill: { color: T.COLORS.border }, line: { color: T.COLORS.border },
      });
      // price
      s.addText(a.price, {
        x: cx + 0.2, y: cy + 2.85, w: cw - 0.4, h: 0.4,
        fontFace: T.FONT, fontSize: 14, color: T.COLORS.green, bold: true,
        align: "center", valign: "top", margin: 0,
      });
      // desc
      s.addText(a.desc, {
        x: cx + 0.2, y: cy + 3.35, w: cw - 0.4, h: 0.9,
        fontFace: T.FONT, fontSize: 10, color: T.COLORS.muted,
        align: "center", valign: "top", margin: 0, paraSpaceAfter: 3,
      });
    });

    T.addFooter(s, CHAPTER, 5, TOTAL);
    pad();
  }

  // ======================================================
  // SLIDE 6 — Premium ID
  // ======================================================
  {
    const s = pres.addSlide();
    s.background = { color: T.COLORS.light };
    T.addSectionHeader(s, "05 — BRANDING", "Premium ID", "เปลี่ยน Basic ID (สุ่ม) ให้เป็นชื่อแบรนด์ของคุณ");

    // Left text
    s.addText(
      "LINE OA จะได้รับ ID แบบสุ่มผสมตัวเลข (Basic ID)\nผู้ใช้สามารถซื้อ Premium ID เพื่อเปลี่ยนให้เป็นชื่อแบรนด์หรือธุรกิจได้",
      {
        x: 0.75, y: 2.3, w: 6.3, h: 1.0,
        fontFace: T.FONT, fontSize: 13, color: T.COLORS.muted,
        valign: "top", margin: 0, paraSpaceAfter: 6,
      }
    );

    // pricing row
    [
      { plat: "Android / เว็บไซต์", price: "444 บาท / ปี", clr: T.COLORS.green },
      { plat: "iOS", price: "459 บาท / ปี", clr: T.COLORS.accent },
    ].forEach((p, i) => {
      const py = 3.6 + i * 0.95;
      s.addShape("rect", {
        x: 0.75, y: py, w: 6.3, h: 0.8,
        fill: { color: T.COLORS.card }, line: { color: T.COLORS.border, width: 0.75 },
        shadow: T.makeShadow(),
      });
      s.addShape("rect", {
        x: 0.75, y: py, w: 0.1, h: 0.8,
        fill: { color: p.clr }, line: { color: p.clr },
      });
      s.addText(p.plat, {
        x: 1.0, y: py, w: 3.0, h: 0.8,
        fontFace: T.FONT, fontSize: 14, color: T.COLORS.text, bold: true,
        valign: "middle", margin: 0,
      });
      s.addText(p.price, {
        x: 4.0, y: py, w: 3.0, h: 0.8,
        fontFace: T.FONT, fontSize: 18, color: p.clr, bold: true,
        align: "right", valign: "middle", margin: 0,
      });
    });

    // iOS notes
    T.addNoteBox(
      s,
      [
        { text: "iOS — เงื่อนไขเพิ่มเติม", options: { bold: true, color: T.COLORS.green, breakLine: true } },
        { text: "• สมัครได้สูงสุด 1 Premium ID ต่อ 1 LINE ID    • เปลี่ยนชื่อ Premium ID ไม่ได้ภายใน 1 ปี", options: { breakLine: true } },
        { text: "• ระบบต่ออายุอัตโนมัติ — ต้องยกเลิกก่อนหมดอายุอย่างน้อย 1 วัน", options: {} },
      ],
      { x: 0.75, y: 5.65, w: 6.3, h: 1.1 }
    );

    // Right image
    s.addImage({
      data: premiumIdImg, x: 7.5, y: 2.3, w: 5.2, h: 4.5,
      sizing: { type: "contain", w: 5.2, h: 4.5 },
    });

    T.addFooter(s, CHAPTER, 6, TOTAL);
    pad();
  }

  // ======================================================
  // SLIDE 7 — Divider: LINE Developers Services
  // ======================================================
  {
    T.addDividerSlide(pres, "PART 2", "LINE Developers Services", "เครื่องมือสำหรับนักพัฒนา — Messaging API, LIFF, Login และอื่น ๆ");
    pad();
  }

  // ======================================================
  // SLIDE 8 — LINE Developers Services
  // ======================================================
  {
    const s = pres.addSlide();
    s.background = { color: T.COLORS.light };
    T.addSectionHeader(s, "06 — DEV SERVICES", "LINE Developers Services", "บริการสำหรับนักพัฒนาที่เชื่อมต่อได้กับ LINE");

    const rows = [
      ["บริการ", "คำอธิบาย"],
      ["Messaging API", "สร้าง Chatbot ส่ง / รับข้อความ, รองรับ Event จาก webhook"],
      ["LIFF", "LINE Front-end Framework — สร้าง Web App ภายในแอป LINE"],
      ["LINE Login", "ระบบ Authentication ผ่าน LINE — ใช้ OIDC / OAuth 2.0"],
      ["LINE Pay", "ระบบชำระเงินออนไลน์ผ่าน LINE"],
      ["LINE Beacon", "แจ้งเตือนผู้ใช้ตามตำแหน่ง (Proximity Messaging)"],
      ["LINE Mini App", "Web App ที่ติดตั้งและใช้งานบน LINE (ใช้ LIFF เป็นพื้นฐาน)"],
      ["LON (LINE Official Notification)", "ส่งข้อความแจ้งเตือนผ่านเบอร์โทรศัพท์"],
    ];

    T.addDataTable(s, rows, {
      x: 0.75, y: 2.15, w: 8.5,
      colWidths: [3.0, 5.5],
      rowH: 0.48,
      headerH: 0.5,
      bodyFontSize: 11,
      headerFontSize: 12,
    });

    // Right: dev logo
    s.addImage({
      data: devLogo, x: 10.0, y: 2.3, w: 2.5, h: 2.5,
      sizing: { type: "contain", w: 2.5, h: 2.5 },
    });

    T.addNoteBox(
      s,
      [
        { text: "ทั้งหมดเชื่อมโยงกับ LINE Official Account ", options: {} },
        { text: "ผ่าน Channel ", options: { bold: true, color: T.COLORS.green } },
        { text: "ที่สร้างบน LINE Developers Console", options: {} },
      ],
      { x: 10.0, y: 5.2, w: 2.5, h: 1.5 }
    );

    T.addFooter(s, CHAPTER, 8, TOTAL);
    pad();
  }

  // ======================================================
  // SLIDE 9 — LINE URL Scheme
  // ======================================================
  {
    const s = pres.addSlide();
    s.background = { color: T.COLORS.light };
    T.addSectionHeader(s, "07 — URL SCHEME", "LINE URL Scheme", "URL สำหรับเรียกเปิดฟีเจอร์ต่าง ๆ ของแอป LINE");

    const rows = [
      ["URL Scheme", "คำอธิบาย"],
      ["https://line.me/R/...", "เปิดฟีเจอร์ LINE app เช่น profile, chat, share"],
      ["https://liff.line.me/...", "เปิด LIFF App (ภายใน LINE)"],
      ["https://miniapp.line.me/...", "เปิด LINE MINI App"],
    ];
    T.addDataTable(s, rows, {
      x: 0.75, y: 2.15, w: 11.8,
      colWidths: [4.5, 7.3],
      rowH: 0.55,
      headerH: 0.5,
    });

    T.addNoteBox(
      s,
      [
        { text: "line:// Deprecated แล้ว ", options: { bold: true, color: T.COLORS.accent } },
        { text: "— ใช้ ", options: {} },
        { text: "https://line.me/R/", options: { fontFace: T.MONO, color: T.COLORS.green, bold: true } },
        { text: " แทนเสมอ เพื่อให้ทำงานได้ทั้งบน iOS, Android และ Desktop", options: {} },
      ],
      { x: 0.75, y: 4.6, w: 11.8, h: 0.7 }
    );

    // Extra: ประโยชน์
    s.addText("ประโยชน์", {
      x: 0.75, y: 5.6, w: 12, h: 0.35,
      fontFace: T.FONT, fontSize: 13, color: T.COLORS.green, bold: true,
      charSpacing: 3, margin: 0,
    });
    const benefits = [
      "เปิด LINE จากเว็บภายนอกได้ทันที",
      "ผ่านลิงก์อัตโนมัติบนมือถือ — ไม่ต้องเปิดแอปเอง",
      "ใช้ใน Rich Menu / Flex Message / Short Link ได้",
    ];
    benefits.forEach((b, i) => {
      const bx = 0.75 + i * 4.0;
      s.addShape("rect", {
        x: bx, y: 6.0, w: 3.75, h: 0.7,
        fill: { color: T.COLORS.card }, line: { color: T.COLORS.border, width: 0.5 },
      });
      s.addShape("rect", {
        x: bx, y: 6.0, w: 0.06, h: 0.7,
        fill: { color: T.COLORS.green }, line: { color: T.COLORS.green },
      });
      s.addText(b, {
        x: bx + 0.2, y: 6.0, w: 3.5, h: 0.7,
        fontFace: T.FONT, fontSize: 11, color: T.COLORS.text,
        valign: "middle", margin: 0,
      });
    });

    T.addFooter(s, CHAPTER, 9, TOTAL);
    pad();
  }

  // ======================================================
  // SLIDE 10 — LINE URL Scheme — ตัวอย่าง
  // ======================================================
  {
    const s = pres.addSlide();
    s.background = { color: T.COLORS.light };
    T.addSectionHeader(s, "08 — URL SCHEME", "LINE URL Scheme — ตัวอย่าง", "ลิงก์พร้อมใช้สำหรับฟีเจอร์ที่ใช้บ่อย");

    const examples = [
      {
        label: "เปิดโปรไฟล์ OA",
        code: "https://line.me/R/ti/p/@linedevelopers",
      },
      {
        label: "เปิดแชท OA พร้อมส่งข้อความ",
        code: "https://line.me/R/oaMessage/%40linedevelopers/?Hello",
      },
      {
        label: "แชร์ข้อความไปยังเพื่อน",
        code: "https://line.me/R/share?text=สวัสดี",
      },
      {
        label: "เปิด LIFF App",
        code: "https://liff.line.me/{liffId}",
      },
      {
        label: "เปิดในเบราว์เซอร์ภายนอก (query string)",
        code: "https://example.com/?openExternalBrowser=1",
      },
    ];

    const ly = 2.15;
    examples.forEach((ex, i) => {
      const y = ly + i * 0.85;
      // label
      s.addText(ex.label, {
        x: 0.75, y, w: 11.8, h: 0.3,
        fontFace: T.FONT, fontSize: 12, color: T.COLORS.green, bold: true,
        margin: 0, valign: "top",
      });
      // code
      s.addShape("rect", {
        x: 0.75, y: y + 0.32, w: 11.8, h: 0.45,
        fill: { color: T.COLORS.codeBg }, line: { color: T.COLORS.codeBg },
      });
      s.addShape("rect", {
        x: 0.75, y: y + 0.32, w: 0.08, h: 0.45,
        fill: { color: T.COLORS.green }, line: { color: T.COLORS.green },
      });
      s.addText(ex.code, {
        x: 1.0, y: y + 0.32, w: 11.5, h: 0.45,
        fontFace: T.MONO, fontSize: 13, color: T.COLORS.codeText,
        valign: "middle", margin: 0,
      });
    });

    T.addFooter(s, CHAPTER, 10, TOTAL);
    pad();
  }

  // ======================================================
  // SLIDE 11 — LINE URL Scheme — หน้าจอทั่วไป
  // ======================================================
  {
    const s = pres.addSlide();
    s.background = { color: T.COLORS.light };
    T.addSectionHeader(s, "09 — URL SCHEME", "URL Scheme — หน้าจอทั่วไป", "เปิดหน้าต่าง ๆ ภายใน LINE app โดยตรง");

    const items = [
      ["/nv/chat", "เปิดแท็บแชท"],
      ["/nv/camera/", "เปิดกล้อง"],
      ["/nv/location/", "เปิดหน้าเลือกตำแหน่ง"],
      ["/nv/settings", "เปิดหน้าตั้งค่า"],
      ["/nv/stickerShop", "เปิด Sticker Shop"],
      ["/nv/wallet", "เปิดแท็บ Wallet"],
      ["/nv/addFriends", "เปิดหน้าเพิ่มเพื่อน"],
      ["/nv/profile", "เปิดหน้าโปรไฟล์ของตนเอง"],
    ];

    const cols = 2, rows = Math.ceil(items.length / cols);
    const cw = 5.8, ch = 0.75;
    items.forEach((it, i) => {
      const c = i % cols, r = Math.floor(i / cols);
      const x = 0.75 + c * (cw + 0.2);
      const y = 2.15 + r * (ch + 0.15);
      // row card
      s.addShape("rect", {
        x, y, w: cw, h: ch,
        fill: { color: T.COLORS.card }, line: { color: T.COLORS.border, width: 0.5 },
      });
      s.addShape("rect", {
        x, y, w: 0.08, h: ch,
        fill: { color: T.COLORS.green }, line: { color: T.COLORS.green },
      });
      s.addText(`https://line.me/R${it[0]}`, {
        x: x + 0.2, y: y + 0.1, w: cw - 0.3, h: 0.3,
        fontFace: T.MONO, fontSize: 11, color: T.COLORS.green, bold: true,
        valign: "middle", margin: 0,
      });
      s.addText(it[1], {
        x: x + 0.2, y: y + 0.4, w: cw - 0.3, h: 0.3,
        fontFace: T.FONT, fontSize: 11, color: T.COLORS.muted,
        valign: "middle", margin: 0,
      });
    });

    T.addFooter(s, CHAPTER, 11, TOTAL);
    pad();
  }

  // ======================================================
  // SLIDE 12 — LINE API Status
  // ======================================================
  {
    const s = pres.addSlide();
    s.background = { color: T.COLORS.light };
    T.addSectionHeader(s, "10 — MONITORING", "LINE API Status", "ตรวจสอบสถานะบริการแบบ real-time");

    // Left
    s.addText("api.line-status.info", {
      x: 0.75, y: 2.3, w: 6.5, h: 0.6,
      fontFace: T.MONO, fontSize: 22, color: T.COLORS.green, bold: true, margin: 0,
    });
    s.addText("เว็บไซต์ตรวจสอบสถานะ LINE API — ใช้เช็คได้ทันทีว่าบริการมีปัญหาหรือไม่ก่อน debug โค้ดของเรา", {
      x: 0.75, y: 3.0, w: 6.5, h: 0.8,
      fontFace: T.FONT, fontSize: 12, color: T.COLORS.muted, margin: 0, paraSpaceAfter: 4,
    });

    s.addText("บริการที่ครอบคลุม", {
      x: 0.75, y: 4.0, w: 6.5, h: 0.3,
      fontFace: T.FONT, fontSize: 12, color: T.COLORS.green, bold: true,
      charSpacing: 3, margin: 0,
    });
    const covered = [
      "Messaging API (API & Webhook)",
      "LINE Developers (Website & Console)",
      "LIFF",
      "LINE Login",
    ];
    covered.forEach((c, i) => {
      const cc = i % 2, cr = Math.floor(i / 2);
      const cx = 0.75 + cc * 3.25;
      const cy = 4.4 + cr * 0.6;
      s.addShape("rect", {
        x: cx, y: cy, w: 3.1, h: 0.5,
        fill: { color: T.COLORS.card }, line: { color: T.COLORS.border, width: 0.5 },
      });
      s.addShape("rect", {
        x: cx, y: cy, w: 0.06, h: 0.5,
        fill: { color: T.COLORS.green }, line: { color: T.COLORS.green },
      });
      s.addText(c, {
        x: cx + 0.2, y: cy, w: 2.85, h: 0.5,
        fontFace: T.FONT, fontSize: 11, color: T.COLORS.text,
        valign: "middle", margin: 0,
      });
    });

    T.addNoteBox(
      s,
      [
        { text: "ยังไม่ครอบคลุม: ", options: { bold: true, color: T.COLORS.accent } },
        { text: "LINE MINI App และ LINE Pay", options: {} },
      ],
      { x: 0.75, y: 5.75, w: 6.5, h: 0.6 }
    );

    // Right: screenshot
    s.addImage({
      data: apiStatusImg, x: 7.6, y: 2.3, w: 5.0, h: 4.6,
      sizing: { type: "contain", w: 5.0, h: 4.6 },
    });

    T.addFooter(s, CHAPTER, 12, TOTAL);
    pad();
  }

  // ======================================================
  // SLIDE 13 — Divider: Certified Provider
  // ======================================================
  {
    T.addDividerSlide(pres, "PART 3", "Certified Provider", "Provider ที่ได้รับการรับรองจาก LINE — ปลดล็อก Special API");
    pad();
  }

  // ======================================================
  // SLIDE 14 — Certified Provider
  // ======================================================
  {
    const s = pres.addSlide();
    s.background = { color: T.COLORS.light };
    T.addSectionHeader(s, "11 — CERTIFIED", "Certified Provider", "Provider ที่ผ่านการรับรอง — ได้รับสิทธิ์พิเศษจาก LINE");

    // Left: benefits
    const benefits = [
      { t: "Certified Badge", d: "แสดงในหน้า Consent — สร้างความน่าเชื่อถือกับผู้ใช้" },
      { t: "Auto Check Add Bot", d: "ปุ่ม 'Add friend' ถูกเลือกอัตโนมัติในหน้า Consent" },
      { t: "Special API", d: "ใช้ API พิเศษ: stay, profile+, mark-as-read" },
    ];
    s.addText("สิทธิพิเศษ 3 ข้อ", {
      x: 0.75, y: 2.15, w: 7.5, h: 0.35,
      fontFace: T.FONT, fontSize: 13, color: T.COLORS.green, bold: true,
      charSpacing: 3, margin: 0,
    });
    benefits.forEach((b, i) => {
      const y = 2.6 + i * 1.05;
      s.addShape("rect", {
        x: 0.75, y, w: 7.5, h: 0.95,
        fill: { color: T.COLORS.card }, line: { color: T.COLORS.border, width: 0.75 },
        shadow: T.makeShadow(),
      });
      s.addShape("oval", {
        x: 0.95, y: y + 0.28, w: 0.4, h: 0.4,
        fill: { color: T.COLORS.green }, line: { color: T.COLORS.green },
      });
      s.addText(String(i + 1), {
        x: 0.95, y: y + 0.28, w: 0.4, h: 0.4,
        fontFace: T.FONT, fontSize: 14, color: "FFFFFF", bold: true,
        align: "center", valign: "middle", margin: 0,
      });
      s.addText(b.t, {
        x: 1.5, y: y + 0.12, w: 6.6, h: 0.4,
        fontFace: T.FONT, fontSize: 14, color: T.COLORS.text, bold: true,
        valign: "top", margin: 0,
      });
      s.addText(b.d, {
        x: 1.5, y: y + 0.48, w: 6.6, h: 0.45,
        fontFace: T.FONT, fontSize: 11, color: T.COLORS.muted,
        valign: "top", margin: 0,
      });
    });

    // How to apply
    T.addNoteBox(
      s,
      [
        { text: "วิธีสมัคร ", options: { bold: true, color: T.COLORS.green } },
        { text: "— ส่งเอกสารบริษัท + Privacy Policy URL ไปที่ ", options: {} },
        { text: "dl_api_th@linecorp.com", options: { fontFace: T.MONO, color: T.COLORS.accent, bold: true } },
        { text: " · ระยะเวลาพิจารณา ~10 วันทำการ", options: {} },
      ],
      { x: 0.75, y: 5.95, w: 7.5, h: 0.85 }
    );

    // Right: image
    s.addImage({
      data: certifiedImg, x: 8.6, y: 2.3, w: 4.0, h: 4.0,
      sizing: { type: "contain", w: 4.0, h: 4.0 },
    });

    T.addFooter(s, CHAPTER, 14, TOTAL);
    pad();
  }

  // ======================================================
  // SLIDE 15 — Certified Provider vs Verified OA
  // ======================================================
  {
    const s = pres.addSlide();
    s.background = { color: T.COLORS.light };
    T.addSectionHeader(s, "12 — COMPARISON", "Certified Provider vs Verified OA", "สองอย่างนี้ไม่เหมือนกัน — คนละระดับ คนละประโยชน์");

    const rows = [
      ["หัวข้อ", "Certified Provider", "Verified OA"],
      ["ระดับ", "Provider", "Channel (บัญชี OA)"],
      ["สิทธิพิเศษ", "Special API, Certified Badge, Auto Check", "โล่สีน้ำเงิน, ค้นหาง่ายบน LINE & Search"],
      ["ค่าใช้จ่าย", "ฟรี (ส่งเอกสารอนุมัติ)", "888 บาท (ครั้งเดียว)"],
      ["ต้องเป็น Verified OA?", "ไม่จำเป็น", "—"],
      ["ใช้กับ OA ใดได้", "ทุกแบบ (เทา / น้ำเงิน / เขียว)", "ตัวบัญชีนั้นเอง"],
    ];
    T.addDataTable(s, rows, {
      x: 0.75, y: 2.15, w: 11.8,
      colWidths: [3.3, 4.5, 4.0],
      rowH: 0.5,
      headerH: 0.55,
    });

    T.addNoteBox(
      s,
      [
        { text: "Certified = ระดับ Provider ", options: { bold: true, color: T.COLORS.green } },
        { text: "— จัดการ Channel หลายตัวได้   ·   ", options: {} },
        { text: "Verified = ระดับ Channel ", options: { bold: true, color: T.COLORS.green } },
        { text: "— ประทับตราที่บัญชี OA เอง", options: {} },
      ],
      { x: 0.75, y: 6.2, w: 11.8, h: 0.7 }
    );

    T.addFooter(s, CHAPTER, 15, TOTAL);
    pad();
  }

  await pres.writeFile({ fileName: OUT });
  console.log("Saved:", OUT);
}

main().catch((e) => { console.error(e); process.exit(1); });
