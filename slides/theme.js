// Shared design system for LINE Developer Tools workshop slides
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const COLORS = {
  dark: "0F1419",
  darkAlt: "1C2128",
  green: "06C755",
  greenDeep: "05A845",
  greenSoft: "E8F8EF",
  light: "FAFAFA",
  card: "FFFFFF",
  text: "1A1D24",
  muted: "64748B",
  mutedLight: "94A3B8",
  border: "E5E7EB",
  borderDark: "334155",
  accent: "FF6B35",
  codeBg: "0F1419",
  codeText: "E2E8F0",
  tableHeaderBg: "06C755",
  tableHeaderText: "FFFFFF",
  tableAltRow: "F7FDF8",
};

const FONT = "Tahoma";
const MONO = "Consolas";
const SLIDE_W = 13.3;
const SLIDE_H = 7.5;

function makeShadow(opacity = 0.08) {
  return { type: "outer", blur: 10, offset: 2, color: "000000", opacity, angle: 90 };
}

async function svgToPngBase64(svgPath, widthPx = 800) {
  const svg = fs.readFileSync(svgPath);
  const buf = await sharp(svg, { density: 300 })
    .resize({ width: widthPx, withoutEnlargement: false })
    .png()
    .toBuffer();
  return "image/png;base64," + buf.toString("base64");
}

async function imageToBase64(imgPath) {
  const buf = fs.readFileSync(imgPath);
  const ext = path.extname(imgPath).toLowerCase();
  const mime = ext === ".png" ? "image/png"
    : ext === ".jpg" || ext === ".jpeg" ? "image/jpeg"
    : ext === ".webp" ? "image/webp"
    : ext === ".gif" ? "image/gif"
    : "image/png";
  return `${mime};base64,` + buf.toString("base64");
}

// Convert webp to png (webp not always supported in pptx viewers)
async function webpToPngBase64(imgPath, widthPx = 800) {
  const buf = await sharp(imgPath).resize({ width: widthPx, withoutEnlargement: false }).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}

// ---------- Slide components ----------

function addFooter(slide, chapterLabel, pageNum, total) {
  slide.addShape("rect", {
    x: 0, y: SLIDE_H - 0.35, w: SLIDE_W, h: 0.35,
    fill: { color: COLORS.dark }, line: { color: COLORS.dark },
  });
  slide.addShape("rect", {
    x: 0, y: SLIDE_H - 0.35, w: 0.18, h: 0.35,
    fill: { color: COLORS.green }, line: { color: COLORS.green },
  });
  slide.addText(`LINE Developer Tools · ${chapterLabel}`, {
    x: 0.35, y: SLIDE_H - 0.35, w: 10, h: 0.35,
    fontFace: FONT, fontSize: 9, color: "FFFFFF", valign: "middle", margin: 0,
  });
  slide.addText(`${pageNum} / ${total}`, {
    x: SLIDE_W - 1.2, y: SLIDE_H - 0.35, w: 1, h: 0.35,
    fontFace: FONT, fontSize: 9, color: COLORS.green, valign: "middle",
    align: "right", margin: 0, bold: true,
  });
}

function addSectionHeader(slide, label, title, subtitle) {
  slide.addShape("rect", {
    x: 0.5, y: 0.5, w: 0.08, h: 0.9,
    fill: { color: COLORS.green }, line: { color: COLORS.green },
  });
  slide.addText(label, {
    x: 0.75, y: 0.5, w: 8, h: 0.3,
    fontFace: FONT, fontSize: 11, color: COLORS.green, bold: true,
    charSpacing: 4, margin: 0, valign: "top",
  });
  slide.addText(title, {
    x: 0.75, y: 0.82, w: 12, h: 0.65,
    fontFace: FONT, fontSize: 28, color: COLORS.text, bold: true,
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

/**
 * Simple data table with LINE-green header.
 * rows = [[cell, cell, ...], ...] where first row is header.
 * colWidths = array of widths (sum <= w)
 */
function addDataTable(slide, rows, opts) {
  const {
    x, y, w, colWidths,
    headerFontSize = 12,
    bodyFontSize = 11,
    rowH = 0.44,
    headerH = 0.48,
    centerCols = [],
  } = opts;

  const cols = rows[0].length;
  const widths = colWidths || rows[0].map(() => w / cols);

  // Header
  let cx = x;
  widths.forEach((cw, ci) => {
    slide.addShape("rect", {
      x: cx, y, w: cw, h: headerH,
      fill: { color: COLORS.tableHeaderBg }, line: { color: COLORS.tableHeaderBg },
    });
    slide.addText(String(rows[0][ci]), {
      x: cx + 0.12, y, w: cw - 0.24, h: headerH,
      fontFace: FONT, fontSize: headerFontSize, color: COLORS.tableHeaderText, bold: true,
      valign: "middle",
      align: centerCols.includes(ci) ? "center" : "left",
      margin: 0,
    });
    cx += cw;
  });

  // Body
  for (let r = 1; r < rows.length; r++) {
    const ry = y + headerH + (r - 1) * rowH;
    const isAlt = (r - 1) % 2 === 1;
    cx = x;
    widths.forEach((cw, ci) => {
      slide.addShape("rect", {
        x: cx, y: ry, w: cw, h: rowH,
        fill: { color: isAlt ? COLORS.tableAltRow : COLORS.card },
        line: { color: COLORS.border, width: 0.5 },
      });
      const cell = rows[r][ci];
      const isRich = Array.isArray(cell);
      slide.addText(isRich ? cell : String(cell), {
        x: cx + 0.12, y: ry, w: cw - 0.24, h: rowH,
        fontFace: FONT, fontSize: bodyFontSize, color: COLORS.text,
        valign: "middle",
        align: centerCols.includes(ci) ? "center" : "left",
        margin: 0,
      });
      cx += cw;
    });
  }
}

function addCodeBlock(slide, code, opts) {
  const { x, y, w, h, fontSize = 12 } = opts;
  slide.addShape("rect", {
    x, y, w, h,
    fill: { color: COLORS.codeBg }, line: { color: COLORS.codeBg },
  });
  slide.addShape("rect", {
    x, y, w: 0.08, h,
    fill: { color: COLORS.green }, line: { color: COLORS.green },
  });
  slide.addText(code, {
    x: x + 0.3, y: y + 0.2, w: w - 0.5, h: h - 0.4,
    fontFace: MONO, fontSize, color: COLORS.codeText,
    valign: "top", margin: 0,
  });
}

function addNoteBox(slide, text, opts) {
  const { x, y, w, h = 0.8 } = opts;
  slide.addShape("rect", {
    x, y, w, h,
    fill: { color: COLORS.greenSoft }, line: { color: COLORS.green, width: 0.75 },
  });
  slide.addShape("rect", {
    x, y, w: 0.08, h,
    fill: { color: COLORS.green }, line: { color: COLORS.green },
  });
  const runs = Array.isArray(text) ? text : [{ text, options: {} }];
  slide.addText(runs, {
    x: x + 0.25, y, w: w - 0.4, h,
    fontFace: FONT, fontSize: 11, color: COLORS.text,
    valign: "middle", margin: 0,
  });
}

// Divider slide (used between sections)
function addDividerSlide(pres, label, title, subtitle) {
  const s = pres.addSlide();
  s.background = { color: COLORS.dark };

  s.addShape("rect", {
    x: 0, y: 0, w: 0.25, h: SLIDE_H,
    fill: { color: COLORS.green }, line: { color: COLORS.green },
  });

  s.addText(label, {
    x: 0.85, y: 2.8, w: 11, h: 0.4,
    fontFace: FONT, fontSize: 13, color: COLORS.green, bold: true,
    charSpacing: 8, margin: 0,
  });
  s.addText(title, {
    x: 0.85, y: 3.3, w: 11, h: 1.4,
    fontFace: FONT, fontSize: 48, color: "FFFFFF", bold: true,
    valign: "top", margin: 0,
  });
  if (subtitle) {
    s.addText(subtitle, {
      x: 0.85, y: 4.7, w: 11, h: 0.6,
      fontFace: FONT, fontSize: 17, color: COLORS.mutedLight,
      valign: "top", margin: 0,
    });
  }
  return s;
}

// Cover slide (used as first slide of each chapter)
function addCoverSlide(pres, chapterNum, chapterTitle, subtitle) {
  const s = pres.addSlide();
  s.background = { color: COLORS.dark };

  s.addShape("rect", {
    x: SLIDE_W - 3.2, y: SLIDE_H - 3.2, w: 3.2, h: 3.2,
    fill: { color: COLORS.green, transparency: 85 }, line: { color: COLORS.green, width: 0 },
  });
  s.addShape("rect", {
    x: SLIDE_W - 2.0, y: SLIDE_H - 2.0, w: 2.0, h: 2.0,
    fill: { color: COLORS.green, transparency: 70 }, line: { color: COLORS.green, width: 0 },
  });
  s.addShape("rect", {
    x: SLIDE_W - 0.9, y: SLIDE_H - 0.9, w: 0.9, h: 0.9,
    fill: { color: COLORS.green }, line: { color: COLORS.green, width: 0 },
  });

  s.addShape("rect", {
    x: 0.7, y: 0.9, w: 0.5, h: 0.08,
    fill: { color: COLORS.green }, line: { color: COLORS.green },
  });
  s.addText(`CHAPTER ${String(chapterNum).padStart(2, "0")}`, {
    x: 0.7, y: 1.05, w: 10, h: 0.35,
    fontFace: FONT, fontSize: 13, color: COLORS.green, bold: true,
    charSpacing: 8, margin: 0,
  });

  s.addText(chapterTitle, {
    x: 0.7, y: 1.8, w: 11, h: 3.0,
    fontFace: FONT, fontSize: 56, color: "FFFFFF", bold: true,
    valign: "top", margin: 0,
  });

  if (subtitle) {
    s.addText(subtitle, {
      x: 0.7, y: 5.0, w: 10, h: 1.2,
      fontFace: FONT, fontSize: 16, color: "CBD5E1",
      valign: "top", margin: 0, paraSpaceAfter: 4,
    });
  }

  s.addText("LINE Developer Tools · Workshop Series", {
    x: 0.7, y: 6.6, w: 8, h: 0.4,
    fontFace: FONT, fontSize: 12, color: COLORS.green, bold: true, margin: 0,
  });
  return s;
}

// ================================================================
// Slide-type builders (used by chapter modules)
// ================================================================

function slideBase(pres, { chapter, page, label, title, subtitle }) {
  const s = pres.addSlide();
  s.background = { color: COLORS.light };
  addSectionHeader(s, label, title, subtitle);
  return s;
}

function placeFooter(s, chapter, page) {
  addFooter(s, chapter, page, 0);
}

/** Intro slide — title + bullets on left, optional image on right */
function slideIntro(pres, opts) {
  const { chapter, page, label, title, subtitle, bullets, image } = opts;
  const s = slideBase(pres, { chapter, page, label, title, subtitle });

  const hasImage = !!image;
  const leftW = hasImage ? 6.2 : 11.8;

  const runs = bullets.map((b, i) => ({
    text: b,
    options: {
      bullet: { code: "25CF" },
      color: COLORS.text,
      breakLine: i < bullets.length - 1,
    },
  }));
  s.addText(runs, {
    x: 0.75, y: 2.2, w: leftW, h: 4.8,
    fontFace: FONT, fontSize: 15, valign: "top", margin: 0,
    paraSpaceAfter: 12,
  });

  if (hasImage) {
    s.addImage({
      data: image.data,
      x: 7.3, y: 2.2, w: 5.3, h: 4.6,
      sizing: { type: "contain", w: 5.3, h: 4.6 },
    });
  }

  placeFooter(s, chapter, page);
  return s;
}

/** Steps slide — ordered numbered list */
function slideSteps(pres, opts) {
  const { chapter, page, label, title, subtitle, steps, images } = opts;
  const s = slideBase(pres, { chapter, page, label, title, subtitle });

  const hasImages = images && images.length > 0;
  const leftW = hasImages ? 7.8 : 11.8;
  const stepH = Math.min(0.75, (5.0) / steps.length);
  const startY = 2.2;

  steps.forEach((step, i) => {
    const y = startY + i * (stepH + 0.12);
    s.addShape("rect", {
      x: 0.75, y, w: leftW, h: stepH,
      fill: { color: COLORS.card },
      line: { color: COLORS.border, width: 0.5 },
    });
    s.addShape("oval", {
      x: 0.95, y: y + (stepH - 0.4) / 2, w: 0.4, h: 0.4,
      fill: { color: COLORS.green }, line: { color: COLORS.green },
    });
    s.addText(String(i + 1), {
      x: 0.95, y: y + (stepH - 0.4) / 2, w: 0.4, h: 0.4,
      fontFace: FONT, fontSize: 13, color: "FFFFFF", bold: true,
      align: "center", valign: "middle", margin: 0,
    });
    s.addText(step, {
      x: 1.5, y, w: leftW - 0.9, h: stepH,
      fontFace: FONT, fontSize: 12, color: COLORS.text,
      valign: "middle", margin: 0,
    });
  });

  if (hasImages) {
    const imgX = 8.7, imgY = 2.2, imgW = 3.9, imgH = 4.7;
    const rows = Math.min(images.length, 3);
    const perH = (imgH - (rows - 1) * 0.1) / rows;
    images.slice(0, rows).forEach((img, i) => {
      s.addImage({
        data: img.data,
        x: imgX, y: imgY + i * (perH + 0.1), w: imgW, h: perH,
        sizing: { type: "contain", w: imgW, h: perH },
      });
    });
  }

  placeFooter(s, chapter, page);
  return s;
}

/** Table slide — header + data table */
function slideTable(pres, opts) {
  const { chapter, page, label, title, subtitle, rows, colWidths, centerCols, rowH, headerH } = opts;
  const s = slideBase(pres, { chapter, page, label, title, subtitle });

  const availH = 4.8;
  const nRows = rows.length - 1;
  const actualRowH = rowH || Math.min(0.55, (availH - (headerH || 0.5)) / nRows);

  addDataTable(s, rows, {
    x: 0.75, y: 2.15, w: 11.8,
    colWidths: colWidths || undefined,
    centerCols: centerCols || [],
    rowH: actualRowH,
    headerH: headerH || 0.5,
    bodyFontSize: 11, headerFontSize: 12,
  });

  placeFooter(s, chapter, page);
  return s;
}

/** Code slide — title + single code block full width */
function slideCode(pres, opts) {
  const { chapter, page, label, title, subtitle, code, note } = opts;
  const s = slideBase(pres, { chapter, page, label, title, subtitle });

  const hasNote = !!note;
  const codeH = hasNote ? 4.0 : 4.8;
  addCodeBlock(s, code, {
    x: 0.75, y: 2.15, w: 11.8, h: codeH, fontSize: 12,
  });

  if (hasNote) {
    addNoteBox(s, note, { x: 0.75, y: 2.15 + codeH + 0.2, w: 11.8, h: 0.8 });
  }

  placeFooter(s, chapter, page);
  return s;
}

/** Cards slide — grid of labeled cards (title + desc) */
function slideCards(pres, opts) {
  const { chapter, page, label, title, subtitle, cards, cols = 3 } = opts;
  const s = slideBase(pres, { chapter, page, label, title, subtitle });

  const rows = Math.ceil(cards.length / cols);
  const gridY = 2.2, gridW = 11.8;
  const gridH = 4.7;
  const gapX = 0.2, gapY = 0.2;
  const cw = (gridW - gapX * (cols - 1)) / cols;
  const ch = (gridH - gapY * (rows - 1)) / rows;

  cards.forEach((c, i) => {
    const cc = i % cols, cr = Math.floor(i / cols);
    const x = 0.75 + cc * (cw + gapX);
    const y = gridY + cr * (ch + gapY);
    s.addShape("rect", {
      x, y, w: cw, h: ch,
      fill: { color: COLORS.card },
      line: { color: COLORS.border, width: 0.75 },
      shadow: makeShadow(),
    });
    s.addShape("rect", {
      x, y, w: cw, h: 0.08,
      fill: { color: COLORS.green }, line: { color: COLORS.green },
    });
    s.addText(c.title, {
      x: x + 0.25, y: y + 0.25, w: cw - 0.5, h: 0.45,
      fontFace: FONT, fontSize: 14, color: COLORS.text, bold: true,
      valign: "top", margin: 0,
    });
    s.addText(c.desc, {
      x: x + 0.25, y: y + 0.75, w: cw - 0.5, h: ch - 0.9,
      fontFace: FONT, fontSize: 11, color: COLORS.muted,
      valign: "top", margin: 0, paraSpaceAfter: 2,
    });
  });

  placeFooter(s, chapter, page);
  return s;
}

/** Features slide — cards with numbered badge */
function slideFeatures(pres, opts) {
  const { chapter, page, label, title, subtitle, features, cols = 3 } = opts;
  const s = slideBase(pres, { chapter, page, label, title, subtitle });

  const rows = Math.ceil(features.length / cols);
  const gridY = 2.2, gridW = 11.8, gridH = 4.7;
  const gapX = 0.2, gapY = 0.2;
  const cw = (gridW - gapX * (cols - 1)) / cols;
  const ch = (gridH - gapY * (rows - 1)) / rows;

  features.forEach((f, i) => {
    const cc = i % cols, cr = Math.floor(i / cols);
    const x = 0.75 + cc * (cw + gapX);
    const y = gridY + cr * (ch + gapY);
    s.addShape("rect", {
      x, y, w: cw, h: ch,
      fill: { color: COLORS.card },
      line: { color: COLORS.border, width: 0.75 },
      shadow: makeShadow(),
    });
    // number badge
    s.addShape("oval", {
      x: x + 0.25, y: y + 0.25, w: 0.5, h: 0.5,
      fill: { color: COLORS.green }, line: { color: COLORS.green },
    });
    s.addText(String(i + 1).padStart(2, "0"), {
      x: x + 0.25, y: y + 0.25, w: 0.5, h: 0.5,
      fontFace: FONT, fontSize: 12, color: "FFFFFF", bold: true,
      align: "center", valign: "middle", margin: 0,
    });
    s.addText(f.title, {
      x: x + 0.85, y: y + 0.25, w: cw - 1.0, h: 0.5,
      fontFace: FONT, fontSize: 13, color: COLORS.text, bold: true,
      valign: "middle", margin: 0,
    });
    s.addText(f.desc, {
      x: x + 0.25, y: y + 0.85, w: cw - 0.5, h: ch - 1.0,
      fontFace: FONT, fontSize: 11, color: COLORS.muted,
      valign: "top", margin: 0, paraSpaceAfter: 2,
    });
  });

  placeFooter(s, chapter, page);
  return s;
}

/** Comparison slide — side-by-side comparison (2 cards) */
function slideComparison(pres, opts) {
  const { chapter, page, label, title, subtitle, items } = opts;
  const s = slideBase(pres, { chapter, page, label, title, subtitle });

  // items: array of 2-3 {title, desc}
  const n = items.length;
  const gapX = 0.3;
  const totalW = 11.8;
  const cw = (totalW - gapX * (n - 1)) / n;
  const ch = 4.7;
  const cy = 2.2;

  items.forEach((it, i) => {
    const cx = 0.75 + i * (cw + gapX);
    const isFirst = i === 0;
    s.addShape("rect", {
      x: cx, y: cy, w: cw, h: ch,
      fill: { color: isFirst ? COLORS.card : COLORS.dark },
      line: { color: isFirst ? COLORS.border : COLORS.dark, width: 0.75 },
      shadow: makeShadow(),
    });
    s.addShape("rect", {
      x: cx, y: cy, w: cw, h: 0.12,
      fill: { color: COLORS.green }, line: { color: COLORS.green },
    });
    s.addText(it.title, {
      x: cx + 0.35, y: cy + 0.3, w: cw - 0.7, h: 0.8,
      fontFace: FONT, fontSize: 22, color: isFirst ? COLORS.text : "FFFFFF", bold: true,
      valign: "top", margin: 0,
    });
    s.addShape("rect", {
      x: cx + 0.35, y: cy + 1.1, w: 0.5, h: 0.04,
      fill: { color: COLORS.green }, line: { color: COLORS.green },
    });
    s.addText(it.desc, {
      x: cx + 0.35, y: cy + 1.3, w: cw - 0.7, h: ch - 1.4,
      fontFace: FONT, fontSize: 13, color: isFirst ? COLORS.muted : "CBD5E1",
      valign: "top", margin: 0, paraSpaceAfter: 6,
    });
  });

  placeFooter(s, chapter, page);
  return s;
}

/** Note slide — header + big centered note box */
function slideNote(pres, opts) {
  const { chapter, page, label, title, subtitle, text, image } = opts;
  const s = slideBase(pres, { chapter, page, label, title, subtitle });

  const hasImage = !!image;
  const noteW = hasImage ? 7.5 : 11.8;
  const noteH = hasImage ? 4.2 : 3.0;
  const noteY = hasImage ? 2.2 : 3.0;

  // Big note
  s.addShape("rect", {
    x: 0.75, y: noteY, w: noteW, h: noteH,
    fill: { color: COLORS.greenSoft }, line: { color: COLORS.green, width: 1 },
  });
  s.addShape("rect", {
    x: 0.75, y: noteY, w: 0.12, h: noteH,
    fill: { color: COLORS.green }, line: { color: COLORS.green },
  });

  // Split text by pipe into items
  const items = typeof text === "string" ? text.split(/\s*\|\s*/) : text;
  const runs = items.map((t, i) => ({
    text: t,
    options: {
      bullet: { code: "25CF" },
      color: COLORS.text,
      breakLine: i < items.length - 1,
    },
  }));
  s.addText(runs, {
    x: 1.1, y: noteY + 0.3, w: noteW - 0.5, h: noteH - 0.6,
    fontFace: FONT, fontSize: 14, valign: "top", margin: 0,
    paraSpaceAfter: 10,
  });

  if (hasImage) {
    s.addImage({
      data: image.data,
      x: 8.5, y: 2.2, w: 4.1, h: 4.2,
      sizing: { type: "contain", w: 4.1, h: 4.2 },
    });
  }

  placeFooter(s, chapter, page);
  return s;
}

/** Mixed slide — title + bullet list + optional image, flexible */
function slideMixed(pres, opts) {
  return slideIntro(pres, opts); // same layout for now
}

/** Divider that takes chapter label for consistency */
function slideDivider(pres, { chapter, title, subtitle }) {
  return addDividerSlide(pres, chapter, title, subtitle);
}

module.exports = {
  COLORS, FONT, MONO, SLIDE_W, SLIDE_H,
  makeShadow, svgToPngBase64, imageToBase64, webpToPngBase64,
  addFooter, addSectionHeader, addDataTable, addCodeBlock, addNoteBox,
  addDividerSlide, addCoverSlide,
  // Generic slide builders for chapter modules:
  slideIntro, slideSteps, slideTable, slideCode, slideCards,
  slideFeatures, slideComparison, slideNote, slideMixed, slideDivider,
};
