---
name: line-api-skill
description: LINE Messaging API — routes to specialized skills for Flex Messages, Rich Menus, webhooks, messaging methods, LIFF, and common API specs.
---

# LINE Messaging API — Skill Index

This skill is split into focused modules. Activate the relevant skill based on the task:

| Skill File | Topics Covered |
|------------|---------------|
| `line-api-common.md` | API domains, rate limits, error codes, tokens, user profile, URL schemes, groups/rooms, audiences |
| `line-flex-message.md` | Flex Message structure, components, layouts, gradients, overlays, recipes (product card, receipt, booking) |
| `line-rich-menu.md` | Rich Menu creation, image specs, area mapping, tab switching with aliases, per-user menus |
| `line-messaging.md` | Push/multicast/broadcast/narrowcast/reply, message types (text/image/video/template/imagemap), quick reply, actions, emoji, stickers, auto-response |
| `line-webhook.md` | Webhook events, signature verification, message/postback/follow events, redelivery, idempotency, content retrieval |
| `line-liff.md` | LIFF init, login, profile, shareTargetPicker, scanCode, Firebase auth, LIFF-bot communication |

## When to Activate

- Any LINE Messaging API integration
- Flex Message creation or modification
- Rich Menu building, alias, or tab switching
- Webhook event handling or signature verification
- LIFF app development
- Push/multicast/broadcast/narrowcast messaging
- Channel access token management
- Template messages, quick reply, or imagemap
- Auto-response rules
