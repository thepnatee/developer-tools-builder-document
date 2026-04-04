---
name: line-webhook
description: LINE webhook reference — event types, request structure, signature verification, message events, redelivery handling, content retrieval, and idempotency patterns.
---

# LINE Webhook System

## When to Activate

- Handling LINE webhook events
- Implementing signature verification
- Processing message/follow/postback events
- Setting up webhook endpoint
- Handling redelivery and idempotency
- Retrieving message content (images, videos, files)

---

## Request Structure

```json
{
  "destination": "U0123456789abcdef0123456789abcdef",
  "events": [
    {
      "type": "message",
      "timestamp": 1625000000000,
      "source": {
        "type": "user",
        "userId": "U0123..."
      },
      "replyToken": "abc123...",
      "message": {
        "type": "text",
        "id": "12345",
        "text": "Hello"
      },
      "webhookEventId": "unique-event-id",
      "deliveryContext": {
        "isRedelivery": false
      }
    }
  ]
}
```

### Source Types

| Type | Fields | Context |
|------|--------|---------|
| `user` | `userId` | 1-on-1 chat |
| `group` | `userId`, `groupId` | Group chat |
| `room` | `userId`, `roomId` | Multi-person chat |

---

## Event Types

| Event | Reply Token | Description |
|-------|-------------|-------------|
| `message` | Yes | User sends text, image, video, audio, file, location, sticker |
| `follow` | Yes | User adds account or unblocks (1-on-1 only) |
| `unfollow` | No | User blocks account (1-on-1 only) |
| `join` | Yes | Account joins group/multi-person chat |
| `leave` | No | Account removed from group/chat |
| `memberJoin` | Yes | User joins group where account is member |
| `memberLeave` | No | User leaves group where account is member |
| `postback` | Yes | User triggers postback action |
| `videoPlayComplete` | Yes | User finishes video with trackingId (1-on-1 only) |
| `beacon` | Yes | User enters beacon range |
| `accountLink` | Yes | User links account |
| `unsend` | No | User unsends a message |

---

## Message Event Types

### Text Message

```json
{
  "type": "message",
  "message": {
    "type": "text",
    "id": "12345",
    "text": "Hello!",
    "quoteToken": "quote-token-xxx",
    "quotedMessageId": "11111",
    "mention": {
      "mentionees": [
        { "index": 0, "length": 5, "userId": "U001", "type": "user", "isSelf": false }
      ]
    }
  }
}
```

### Image Message

```json
{
  "type": "message",
  "message": {
    "type": "image",
    "id": "12345",
    "contentProvider": {
      "type": "line"
    },
    "imageSet": {
      "id": "set-id",
      "index": 1,
      "total": 3
    }
  }
}
```

### Video / Audio Message

```json
{
  "type": "message",
  "message": {
    "type": "video",
    "id": "12345",
    "duration": 60000,
    "contentProvider": { "type": "line" }
  }
}
```

### File Message

```json
{
  "type": "message",
  "message": {
    "type": "file",
    "id": "12345",
    "fileName": "document.pdf",
    "fileSize": 1024000
  }
}
```

### Location Message

```json
{
  "type": "message",
  "message": {
    "type": "location",
    "id": "12345",
    "title": "My Location",
    "address": "Bangkok, Thailand",
    "latitude": 13.7563,
    "longitude": 100.5018
  }
}
```

### Sticker Message

```json
{
  "type": "message",
  "message": {
    "type": "sticker",
    "id": "12345",
    "packageId": "446",
    "stickerId": "1988",
    "stickerResourceType": "STATIC",
    "keywords": ["happy", "smile"]
  }
}
```

---

## Postback Event

```json
{
  "type": "postback",
  "replyToken": "abc123...",
  "postback": {
    "data": "action=buy&itemId=123",
    "params": {
      "date": "2025-03-15",
      "time": "14:00",
      "datetime": "2025-03-15T14:00"
    }
  }
}
```

- `params` is included when using `datetimepicker` action
- `data` field: your custom string (max 300 chars)

---

## Follow / Unfollow Events

```json
{
  "type": "follow",
  "replyToken": "abc123...",
  "source": { "type": "user", "userId": "U001" }
}
```

```json
{
  "type": "unfollow",
  "source": { "type": "user", "userId": "U001" }
}
```

- `follow` fires when user adds friend OR unblocks
- `unfollow` fires when user blocks — no reply token

---

## Group Events

### Join Event
```json
{
  "type": "join",
  "replyToken": "abc123...",
  "source": { "type": "group", "groupId": "C001" }
}
```

### Member Join Event
```json
{
  "type": "memberJoin",
  "replyToken": "abc123...",
  "source": { "type": "group", "groupId": "C001" },
  "joined": {
    "members": [
      { "type": "user", "userId": "U001" },
      { "type": "user", "userId": "U002" }
    ]
  }
}
```

---

## Beacon Event

```json
{
  "type": "beacon",
  "replyToken": "abc123...",
  "beacon": {
    "hwid": "d41d8cd98f",
    "type": "enter",
    "dm": "optional-device-message"
  }
}
```

`beacon.type`: `enter` | `leave` | `banner`

---

## Account Link Event

```json
{
  "type": "accountLink",
  "replyToken": "abc123...",
  "link": {
    "result": "ok",
    "nonce": "nonce-from-link-token"
  }
}
```

`link.result`: `ok` | `failed`

---

## Signature Verification

```typescript
import crypto from 'crypto'

function verifySignature(rawBody: string, signature: string, channelSecret: string): boolean {
  // MUST use raw request body string — not parsed/formatted
  // MUST use UTF-8 encoding
  const hash = crypto
    .createHmac('SHA256', channelSecret)
    .update(rawBody, 'utf8')
    .digest('base64')
  return hash === signature
}
```

**Critical rules:**
- Use raw body string BEFORE any parsing/deserialization
- UTF-8 encoding is required
- Don't interpret escape characters before verification
- Header name `x-line-signature` is case-insensitive

### Express.js Example

```typescript
import express from 'express'

const app = express()

// IMPORTANT: Must capture raw body before JSON parsing
app.use(express.json({
  verify: (req, _res, buf) => {
    (req as any).rawBody = buf.toString('utf8')
  }
}))

app.post('/webhook', (req, res) => {
  const signature = req.headers['x-line-signature'] as string
  const rawBody = (req as any).rawBody

  if (!verifySignature(rawBody, signature, CHANNEL_SECRET)) {
    return res.status(401).send('Invalid signature')
  }

  // Return 200 immediately
  res.status(200).send('OK')

  // Process events asynchronously
  const events = req.body.events
  processEvents(events).catch(console.error)
})
```

---

## Webhook Redelivery

- Disabled by default — enable in LINE Developers Console
- Redelivered when server didn't return 2xx status
- Same `webhookEventId` and `replyToken` as original
- `deliveryContext.isRedelivery` = `true`
- Event order may differ — check `timestamp` field

### Idempotency Pattern

```typescript
const processedEvents = new Set<string>()  // Use Redis/DB in production

async function handleEvent(event: WebhookEvent) {
  // Skip already-processed events
  if (processedEvents.has(event.webhookEventId)) {
    console.log(`Skipping duplicate event: ${event.webhookEventId}`)
    return
  }

  processedEvents.add(event.webhookEventId)

  // Process event...
}
```

---

## Content Retrieval

### Get Message Content (Images, Video, Audio, Files)

```
GET https://api-data.line.me/v2/bot/message/{messageId}/content
```

### Get Preview / Thumbnail

```
GET https://api-data.line.me/v2/bot/message/{messageId}/content/preview
```

### Check Transcoding Status (Video/Audio)

```
GET https://api-data.line.me/v2/bot/message/{messageId}/content/transcoding
```

Response:
```json
{ "status": "processing" }
```
or
```json
{ "status": "succeeded" }
```

Wait for `succeeded` before retrieving content.

---

## Webhook Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| PUT | `/v2/bot/channel/webhook/endpoint` | Set webhook URL |
| GET | `/v2/bot/channel/webhook/endpoint` | Get current webhook URL |
| POST | `/v2/bot/channel/webhook/test` | Test webhook connectivity |

### Webhook URL Verification

```
POST https://api.line.me/v2/bot/channel/webhook/test
```
- Rate limit: 60 req/hour
- Bot server must return 200 for empty events array

---

## Best Practices

1. **Return 200 immediately** — process events asynchronously. LINE retries if response is slow.
2. **Use webhookEventId for idempotency** — don't process the same event twice.
3. **Check isRedelivery** — log but don't skip blindly (original processing may have failed).
4. **Reply token expires in 1 minute** — reply fast or use push message instead.
5. **Reply token is single-use** — can't reply twice to the same event.
6. **Always verify signatures** — never trust unverified webhook requests.
7. **Handle all event types** — return 200 even for events you don't process.
