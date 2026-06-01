# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This workspace is the **Cloudea LINE Developer Workshop** — a Thai-language workshop series by Thepnatee Phojan (LINE API Expert). It has two sub-repositories:

- `developer-tools-builder-document/` — 47 workshop chapters, AI cookbook skills, and official LINE docs mirror
- `line-developers-docs-source/` — Official LINE Developers documentation source files (read-only reference, mirrored from LINE)

## Directory Structure

```
developer-tools-builder-document/
├── workshop/          # 47 lesson files (01-01 → 11-02), Thai language
├── line-api-skill/    # AI/Claude cookbook — production-ready LINE API recipes
│   ├── SKILL.md       # Index + decision guide for choosing sub-skill
│   ├── line-api-common.md
│   ├── line-messaging.md
│   ├── line-webhook.md
│   ├── line-flex-message.md
│   ├── line-rich-menu.md
│   ├── line-liff.md
│   ├── line-mini-app.md
│   └── line-login.md
├── docs/              # Official LINE Developers docs (mirrored from line-developers-docs-source)
│   ├── messaging-api/
│   ├── liff/
│   ├── line-login/
│   ├── line-mini-app/
│   └── ...
└── assets/            # Images, Rich Menu design templates
```

## Workshop Document Structure

Every file in `workshop/` follows this fixed structure:
1. Hook — real use case
2. ทำไมต้องรู้เรื่องนี้? — motivation/analogy
3. ภาพรวม — Mermaid diagram
4. เนื้อหาหลัก — patterns, code, spec tables
5. ข้อผิดพลาดที่มักเจอ — common mistakes
6. Checklist ก่อนไปต่อ — verification checklist
7. อ้างอิง — official LINE docs links

Maintain this structure when adding or editing workshop files.

## Using line-api-skill as an AI Cookbook

`line-api-skill/` is designed to be used with Claude/AI to generate production-ready LINE API code. Load only the 1–2 skill files relevant to the task — don't load all 8 at once. The `SKILL.md` contains a Mermaid decision flowchart for choosing which skill file to use.

To install as a Claude skill: copy `line-api-skill/` to `~/.claude/skills/`.

## Tech Stack

- **Backend**: Node.js / TypeScript, Firebase Cloud Functions, Firebase Storage
- **Frontend**: Vue.js 3 (LIFF apps)
- **Diagrams**: Mermaid (used throughout all workshop docs)
- **LINE Platform**: Messaging API, LIFF, LINE Login, LINE MINI App, Rich Menu

## Content Language

Workshop files (`workshop/`) are written in Thai. Skill files (`line-api-skill/`) and official docs (`docs/`) are in English. Keep new content in the language matching its directory.
