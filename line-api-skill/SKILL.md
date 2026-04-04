---
name: line-messaging
description: Comprehensive LINE Messaging API reference — API domains, rate limits, error codes, channel access tokens, Flex Message structure (containers/blocks/components), Rich Menu (creation/alias/per-user/tab switching), webhook events and signature verification, messaging methods (push/multicast/broadcast/narrowcast), actions, LIFF integration, user profile access, and auto-response workflows. Based on official LINE API documentation.
---

# LINE Messaging API Reference

Comprehensive reference for the LINE platform, sourced from official docs in `line_dev_tool/documents/` and LINE Developers official documentation.

## When to Activate

- Any LINE Messaging API integration
- Flex Message creation or modification
- Rich Menu building, alias, or tab switching
- Webhook event handling or signature verification
- LIFF app development
- Push/multicast/broadcast/narrowcast messaging
- Channel access token management
- Auto-response rules or FlowBuilder workflows

---

## API Common Specifications

### Domain Names

| Domain | Use Case |
|--------|----------|
| `api.line.me` | All endpoints except below |
| `api-data.line.me` | Get content, audiences, rich menu images |

### Rate Limits (Per Channel)

| Endpoint | Limit |
|----------|-------|
| Narrowcast/broadcast, statistics | 60 req/hour |
| Audience management | 60 req/min |
| Rich menu create/delete | 100 req/hour |
| Batch rich menu control | 3 req/hour |
| Multicast, membership, coupons | 200 req/sec |
| Loading animation | 100 req/sec |
| Short-lived token issuance | 370 req/sec |
| Webhook endpoint config | 1,000 req/min |
| Other endpoints | 2,000 req/sec |

### HTTP Status Codes

| Code | Meaning | Notes |
|------|---------|-------|
| 200 | Success | |
| 400 | Bad Request | Invalid parameters |
| 401 | Unauthorized | Missing/invalid channel access token |
| 403 | Forbidden | Not authorized to access resource |
| 404 | Not Found | User doesn't exist, no consent, not friends, or blocked |
| 409 | Conflict | Duplicate retry key |
| 413 | Payload Too Large | Exceeds 2MB |
| 429 | Too Many Requests | Rate limit or monthly limit exceeded |
| 500 | Internal Server Error | |

### Error Response Format

```json
{
  "message": "Error description",
  "details": [
    {
      "message": "Specific error detail",
      "property": "Field name or parameter"
    }
  ]
}
```

### Response Headers

- `X-Line-Request-Id`: Always included — use for debugging
- `X-Line-Accepted-Request-Id`: Previous request ID when using same retry key

---

## Channel Access Tokens

| Type | Validity | Max per Channel | Key Notes |
|------|----------|-----------------|-----------|
| v2.1 (JWT-based) | Up to 30 days | 30 | User-specified expiration |
| Stateless | 15 minutes | Unlimited | Cannot be revoked |
| Short-lived | 30 days | 30 | Oldest auto-revoked when limit reached |
| Long-lived | Indefinite | 1 | Messaging API only, reissue invalidates previous |

**Rules:**
- Expired tokens don't count toward limits
- Reuse within validity period — don't reissue per request
- Can be revoked by LINE if suspected compromise
- Large burst of issuances may trigger temporary restriction

---

## Flex Messages

### Architecture (3 Levels)

```
Container (Bubble | Carousel)
  └── Block (Header | Hero | Body | Footer)
       └── Component (Box | Button | Image | Video | Icon | Text | Span | Separator)
```

### Containers

**Bubble** — Single message card
- Blocks appear in order: header → hero → body → footer (each used once)
- Sizes: `kilo`, `mega` (default), `giga`, `deca`, `hecto` (LINE 13.6.0+)

**Carousel** — Horizontally scrollable bubbles
- Max **12 bubbles** per carousel

### Components Reference

| Component | Purpose | Key Properties |
|-----------|---------|---------------|
| Box | Layout container | `layout` (vertical/horizontal/baseline), `spacing`, `padding`, `backgroundColor`, `cornerRadius`, `borderWidth`, `position` (relative/absolute), `offsetTop/Bottom/Start/End` |
| Button | Tappable button | `style` (primary/secondary/link), `action`, `color`, `height` |
| Image | Display image | `url` (HTTPS only), `size`, `aspectRatio`, `aspectMode` (cover/fit), `cornerRadius` |
| Video | Display video | `url`, `previewUrl`, `altContent` (fallback), `aspectRatio` |
| Text | Display text | `text`, `size`, `color`, `weight` (bold/regular), `wrap` (true for wrapping), `maxLines`, `decoration` (line-through/underline), `lineSpacing` |
| Span | Styled text within Text | `text`, `size`, `color`, `weight`, `decoration` — set in Text's `contents` array |
| Icon | Small icon | `url`, `size` — baseline box only |
| Separator | Divider line | `margin` — horizontal in vertical box, vertical in horizontal box |

### Sending Flex Messages

```json
{
  "type": "flex",
  "altText": "Required — shown in notifications (max 400 chars)",
  "contents": {
    "type": "bubble",
    "hero": {
      "type": "image",
      "url": "https://example.com/hero.jpg",
      "size": "full",
      "aspectRatio": "20:13",
      "aspectMode": "cover"
    },
    "body": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "text",
          "text": "Title",
          "weight": "bold",
          "size": "xl"
        },
        {
          "type": "box",
          "layout": "baseline",
          "contents": [
            { "type": "icon", "url": "https://example.com/star.png", "size": "sm" },
            { "type": "text", "text": "4.5", "size": "sm", "color": "#999999", "flex": 0 }
          ]
        },
        {
          "type": "text",
          "text": "Description text that wraps",
          "size": "sm",
          "color": "#999999",
          "wrap": true
        }
      ]
    },
    "footer": {
      "type": "box",
      "layout": "vertical",
      "spacing": "sm",
      "contents": [
        {
          "type": "button",
          "style": "primary",
          "action": { "type": "uri", "label": "Open", "uri": "https://example.com" }
        },
        {
          "type": "button",
          "style": "secondary",
          "action": { "type": "postback", "label": "Add to Cart", "data": "action=add&id=123" }
        }
      ]
    }
  }
}
```

### Advanced Patterns

**Absolute Positioning (Overlays):**
```json
{
  "type": "box",
  "layout": "vertical",
  "position": "absolute",
  "offsetTop": "10px",
  "offsetStart": "10px",
  "backgroundColor": "#FF0000CC",
  "cornerRadius": "4px",
  "contents": [
    { "type": "text", "text": "SALE", "color": "#FFFFFF", "size": "xs" }
  ]
}
```

**Gradient Background:**
```json
{
  "type": "box",
  "layout": "vertical",
  "background": {
    "type": "linearGradient",
    "angle": "0deg",
    "startColor": "#00000000",
    "endColor": "#000000CC"
  }
}
```

**Price with Strikethrough:**
```json
{
  "type": "text",
  "text": "$200",
  "decoration": "line-through",
  "size": "sm",
  "color": "#999999"
}
```

### Box Layout Properties

**Layout types:**
- `horizontal` — children arranged left-to-right
- `vertical` — children arranged top-to-bottom
- `baseline` — children vertically aligned by text baseline (regardless of font size)

**justifyContent** (requires all children `flex: 0`):
`flex-start` | `center` | `flex-end` | `space-between` | `space-around` | `space-evenly`

**alignItems** (cross-axis):
`flex-start` | `center` | `flex-end`

**spacing** (gap between children):
Keywords: `none` | `xs` | `sm` | `md` | `lg` | `xl` | `xxl` — or pixel values

**padding:**
`paddingAll`, `paddingTop`, `paddingBottom`, `paddingStart`, `paddingEnd`
Units: keywords, pixels, or percentages

**flex property:**
- `flex: 0` — component occupies content width only, no growth
- `flex: 1+` — components share remaining space proportionally
- Default horizontal: `flex: 1` / Default vertical: `flex: 0`

**position:** `relative` | `absolute`
**offsets:** `offsetTop`, `offsetBottom`, `offsetStart`, `offsetEnd` — keywords, pixels, or percentages

**width/height/maxWidth/maxHeight:** pixels, percentages, or keywords

### Size Keywords Reference

**Image sizes:** `xxs` | `xs` | `sm` | `md` | `lg` | `xl` | `xxl` | `3xl` | `4xl` | `5xl` | `full` — or percentages/pixels

**Text/Icon sizes:** `xxs` | `xs` | `sm` | `md` | `lg` | `xl` | `xxl` | `3xl` | `4xl` | `5xl` — or pixels

**Component alignment:**
- `align` (text/image): `start` | `center` | `end`
- `gravity` (text/image/button): `top` | `center` | `bottom`
- `adjustMode`: `shrink-to-fit` — auto-shrink text to fit container

### Linear Gradient

```json
{
  "type": "linearGradient",
  "angle": "180deg",
  "startColor": "#00000000",
  "centerColor": "#00000080",
  "endColor": "#000000CC",
  "centerPosition": "30%"
}
```
- `angle`: 0-360 degrees (0°=bottom-to-top, 90°=left-to-right, 180°=top-to-bottom)
- `centerColor` + `centerPosition`: optional middle color stop

### Constraints
- Single Flex Message: max **50KB**
- Carousel: max **12 bubbles**
- Image URLs: must be **HTTPS**
- `altText`: required, max 400 chars
- `flex` property: integer 0-3, controls proportional width in horizontal boxes
- Rendering varies by device OS, LINE version, screen resolution, language, font
- `deca`/`hecto` bubble sizes require LINE 13.6.0+ / PC 7.17.0+
- `maxWidth`/`maxHeight`, `lineSpacing`, Video component require LINE 11.22.0+
- `scaling` property (LINE 13.6.0+): responsive sizing per user font settings
- Filler component is **deprecated** — use component properties instead

---

## Rich Menus

### Image Requirements

| Layout | Dimensions | Use Case |
|--------|-----------|----------|
| Full | 2500 x 1686 px | Standard 6-area (2x3 grid) |
| Half | 2500 x 843 px | Compact 3-area (1x3 grid) |
| Format | JPEG or PNG | Max 1MB |

### Creation Methods

| Method | Features | Limitations |
|--------|----------|-------------|
| LINE Official Account Manager | Display period, statistics, GUI | No postback/datetime picker, no tab switching |
| Messaging API | Postback, datetime picker, tab switching, per-user | No statistics, no display period |

### Display Priority (Highest → Lowest)

1. Per-user rich menu (Messaging API)
2. Default rich menu (Messaging API)
3. Default rich menu (LINE Official Account Manager)

### Timing of Changes

| Type | When Effective |
|------|---------------|
| Per-user (API) | Immediately |
| Default (API) | On user chat reopen (up to 1 min) |
| Default (Manager) | On user chat reopen |

### API Workflow

```typescript
// 1. Create rich menu
const richMenuId = await createRichMenu(channelToken, {
  size: { width: 2500, height: 1686 },
  selected: false,
  name: 'My Menu',
  chatBarText: 'Menu',
  areas: [
    {
      bounds: { x: 0, y: 0, width: 833, height: 843 },
      action: { type: 'uri', uri: 'https://example.com' }
    },
    // ... more areas
  ]
})

// 2. Upload image
// POST https://api-data.line.me/v2/bot/richmenu/{richMenuId}/content
await uploadRichMenuImage(channelToken, richMenuId, imageBuffer)

// 3. Set as default
// POST https://api.line.me/v2/bot/user/all/richmenu/{richMenuId}
await setDefaultRichMenu(channelToken, richMenuId)
```

### Action Area Mapping

```typescript
// Full size (2500x1686) — 6 equal areas (2x3 grid)
const areas = [
  { bounds: { x: 0, y: 0, width: 833, height: 843 } },       // Top-left
  { bounds: { x: 833, y: 0, width: 834, height: 843 } },      // Top-center
  { bounds: { x: 1667, y: 0, width: 833, height: 843 } },     // Top-right
  { bounds: { x: 0, y: 843, width: 833, height: 843 } },      // Bottom-left
  { bounds: { x: 833, y: 843, width: 834, height: 843 } },    // Bottom-center
  { bounds: { x: 1667, y: 843, width: 833, height: 843 } },   // Bottom-right
]
```

### Tab Switching with Aliases

```typescript
// 1. Create two menus
const menuA = await createRichMenu(channelToken, menuAConfig)
const menuB = await createRichMenu(channelToken, menuBConfig)

// 2. Upload images for both
await uploadRichMenuImage(channelToken, menuA, imageA)
await uploadRichMenuImage(channelToken, menuB, imageB)

// 3. Create aliases
// POST https://api.line.me/v2/bot/richmenu/alias
await createRichMenuAlias(channelToken, 'richmenu-alias-a', menuA)
await createRichMenuAlias(channelToken, 'richmenu-alias-b', menuB)

// 4. Use richmenuswitch action in menu areas
{
  "type": "richmenuswitch",
  "richMenuAliasId": "richmenu-alias-b",
  "data": "tab=b"
}
```

### Per-User Rich Menu

```typescript
// Link menu to specific user (takes effect immediately)
// POST https://api.line.me/v2/bot/user/{userId}/richmenu/{richMenuId}
await linkRichMenuToUser(channelToken, userId, richMenuId)

// Unlink from user (reverts to default menu)
// DELETE https://api.line.me/v2/bot/user/{userId}/richmenu
await unlinkRichMenuFromUser(channelToken, userId)
```

**Constraints:**
- Not available on LINE PC
- Can't link to users who only use LINE PC
- User must be friend of the LINE Official Account

---

## Actions

All tappable elements (buttons, Rich Menu areas, Flex components) use these action types:

| Action | Type | Description | Notes |
|--------|------|-------------|-------|
| Postback | `postback` | Sends data to bot server | Can display text, control keyboard/rich menu display |
| Message | `message` | Sends text as user's message | Simple text echo |
| URI | `uri` | Opens URL in in-app browser | Supports `tel:`, LINE URL schemes |
| Datetime Picker | `datetimepicker` | Date/time selection | Returns in postback event |
| Camera | `camera` | Opens camera | Quick reply buttons only |
| Camera Roll | `cameraRoll` | Opens camera roll | Quick reply buttons only |
| Location | `location` | Opens location picker | Quick reply buttons only |
| Rich Menu Switch | `richmenuswitch` | Switches rich menus | Requires alias setup |
| Clipboard | `clipboard` | Copies text to clipboard | Parameter: `clipboardText` |

### Postback Display Options (LINE 12.6.0+)

```json
{
  "type": "postback",
  "label": "Action",
  "data": "action=clicked",
  "displayText": "Clicked!",
  "inputOption": "closeRichMenu"
}
```

`inputOption` values: `closeRichMenu`, `openRichMenu`, `openKeyboard`, `openVoice`

---

## Messaging Methods

### Push Message (1-to-1)

```
POST https://api.line.me/v2/bot/message/push
```

```typescript
{
  to: string,        // User ID
  messages: Message[] // Max 5 messages
}
```

### Multicast (Multiple Users)

```
POST https://api.line.me/v2/bot/message/multicast
```

```typescript
{
  to: string[],      // Max 500 user IDs per request
  messages: Message[] // Max 5 messages
}
```

### Broadcast (All Followers)

```
POST https://api.line.me/v2/bot/message/broadcast
```

```typescript
{
  messages: Message[] // Max 5 messages — no target, sends to all
}
```

### Narrowcast (Audience Targeting)

```
POST https://api.line.me/v2/bot/message/narrowcast
```

```typescript
{
  messages: Message[],
  recipient: {
    type: 'audience',
    audienceGroupId: number
  }
}
```

### Reply Message (Free, No Quota Cost)

```
POST https://api.line.me/v2/bot/message/reply
```

```typescript
{
  replyToken: string, // From webhook event
  messages: Message[] // Max 5 messages
}
```

### Rate Limits

| Method | Limit | Quota Cost |
|--------|-------|------------|
| Push | 200 req/sec | Yes |
| Multicast | 200 req/sec | Yes |
| Broadcast | 60 req/hour | Yes |
| Narrowcast | 60 req/hour | Yes |
| Reply | 2,000 req/sec | **Free** |

**Always prefer Reply over Push when a reply token is available — it's free.**

---

## Webhook System

### Request Structure

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

### Event Types

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

### Message Event Extended Properties

```typescript
// Quoted message
event.message.quotedMessageId  // ID of the quoted message
event.message.quoteToken       // Token for quote context

// Mentions
event.message.mention.mentionees  // Array of { userId, type, isSelf }
```

### Signature Verification

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

### Webhook Redelivery

- Disabled by default — enable in LINE Developers Console
- Redelivered when server didn't return 2xx status
- Same `webhookEventId` and `replyToken` as original
- `deliveryContext.isRedelivery` = `true`
- Event order may differ — check `timestamp` field
- Implement idempotency using `webhookEventId`

### Content Retrieval

```
GET https://api-data.line.me/v2/bot/message/{messageId}/content
GET https://api-data.line.me/v2/bot/message/{messageId}/content/preview
```

### Webhook URL Verification

```
POST https://api.line.me/v2/bot/channel/webhook/test
```
- Rate limit: 60 req/hour
- Bot server must return 200 for empty events array

---

## User Profile

### Get Profile

```
GET https://api.line.me/v2/bot/profile/{userId}
```

### Response

```json
{
  "displayName": "string",
  "userId": "U0123...",
  "pictureUrl": "https://profile.line-scdn.net/...",
  "statusMessage": "string"
}
```

### 404 Means

- User ID doesn't exist
- User hasn't consented to profile access
- User hasn't added account as friend
- User blocked account
- User removed account from group

**User consent:** Required via LINE iOS/Android onboarding. PC-only users cannot consent.

---

## LIFF Integration

### Initialization

```typescript
import liff from '@line/liff'

async function initLiff(liffId: string) {
  await liff.init({ liffId })

  if (!liff.isLoggedIn()) {
    liff.login({ redirectUri: window.location.href })
    return null
  }

  return {
    profile: await liff.getProfile(),
    accessToken: liff.getAccessToken(),  // Use this for API auth
    isInClient: liff.isInClient(),       // true = inside LINE app
  }
}
```

### Key APIs

| API | Notes |
|-----|-------|
| `liff.init({ liffId })` | Must call before any LIFF API |
| `liff.isLoggedIn()` | Check before accessing profile |
| `liff.getProfile()` | Returns displayName, userId, pictureUrl |
| `liff.getAccessToken()` | Use for backend API auth — NOT `getIDToken()` |
| `liff.isInClient()` | `true` inside LINE app, `false` in external browser |
| `liff.closeWindow()` | Only works inside LINE app |
| `liff.shareTargetPicker(messages)` | Send message to selected friends/groups |

### LIFF → Firebase Auth Flow

```typescript
// Frontend
const liffToken = liff.getAccessToken()
const result = await apiCall('verifyLiffToken', { liffToken })
await signInWithCustomToken(auth, result.data.token)

// Cloud Function
export const verifyLiffToken = onCall(async (request) => {
  const { liffToken } = request.data

  // Verify with LINE
  const profile = await fetch('https://api.line.me/v2/profile', {
    headers: { 'Authorization': `Bearer ${liffToken}` },
  }).then(r => r.json())

  // Upsert user
  await db.collection('users').doc(profile.userId).set({
    displayName: profile.displayName,
    pictureUrl: profile.pictureUrl,
    liffUserId: profile.userId,
    updatedAt: FieldValue.serverTimestamp(),
  }, { merge: true })

  // Issue Firebase token
  const firebaseToken = await auth.createCustomToken(profile.userId)
  return { success: true, data: { token: firebaseToken } }
})
```

---

## Complete API Endpoint Reference

### Message Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/v2/bot/message/reply` | Reply using reply token (**free**) |
| POST | `/v2/bot/message/push` | Push to single user |
| POST | `/v2/bot/message/multicast` | Send to multiple users (max 500) |
| POST | `/v2/bot/message/broadcast` | Send to all followers |
| POST | `/v2/bot/message/narrowcast` | Send to audience segment |
| GET | `/v2/bot/message/narrowcast/progress/status?requestId=` | Check narrowcast progress |
| POST | `/v2/bot/message/{type}/validate` | Validate message structure before sending |
| POST | `/v2/bot/message/markAsRead` | Mark messages as read |
| POST | `/v2/bot/message/loading` | Display loading/typing animation |

### Quota & Statistics Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/v2/bot/message/quota` | Monthly sending limit |
| GET | `/v2/bot/message/quota/consumption` | Messages sent this month |
| GET | `/v2/bot/message/delivery` | Reply message delivery count |
| GET | `/v2/bot/insight/message/delivery?date=YYYYMMDD` | Delivery counts by platform |
| GET | `/v2/bot/insight/followers?date=YYYYMMDD` | Follower count |
| GET | `/v2/bot/insight/demographic` | Age, gender, OS, region |
| GET | `/v2/bot/insight/message/event?requestId=` | Click/impression stats |

### Rich Menu Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/v2/bot/richmenu` | Create rich menu |
| POST | `/v2/bot/richmenu/validate` | Validate rich menu structure |
| GET | `/v2/bot/richmenu/list` | List all rich menus |
| GET | `/v2/bot/richmenu/{richMenuId}` | Get specific menu |
| DELETE | `/v2/bot/richmenu/{richMenuId}` | Delete menu |
| POST | `/v2/bot/richmenu/{richMenuId}/image` | Upload image (api-data.line.me) |
| GET | `/v2/bot/richmenu/{richMenuId}/image` | Download image (api-data.line.me) |
| POST | `/v2/bot/richmenu/{richMenuId}/default` | Set as default |
| GET | `/v2/bot/richmenu/default` | Get default menu ID |
| DELETE | `/v2/bot/richmenu/default` | Clear default menu |

### Per-User Rich Menu Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/v2/bot/richmenu/{richMenuId}/user/{userId}` | Link to user |
| POST | `/v2/bot/richmenu/{richMenuId}/users` | Link to multiple users |
| GET | `/v2/bot/richmenu/user/{userId}` | Get user's menu ID |
| DELETE | `/v2/bot/richmenu/{richMenuId}/user/{userId}` | Unlink from user |
| POST | `/v2/bot/richmenu/users/unlink` | Unlink from multiple users |
| POST | `/v2/bot/richmenu/users/batch` | Batch link/unlink |
| GET | `/v2/bot/richmenu/users/batch/status?requestId=` | Batch status |
| POST | `/v2/bot/richmenu/users/batch/validate` | Validate batch request |

### Rich Menu Alias Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/v2/bot/richmenu/alias` | Create alias |
| POST | `/v2/bot/richmenu/alias/{alias}` | Update alias |
| GET | `/v2/bot/richmenu/alias/{alias}` | Get alias info |
| DELETE | `/v2/bot/richmenu/alias/{alias}` | Delete alias |
| GET | `/v2/bot/richmenu/alias` | List all aliases |

### Profile & Follower Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/v2/bot/profile/{userId}` | Get user profile |
| GET | `/v2/bot/followers/ids?start=` | Get follower IDs (paginated) |
| GET | `/v2/bot/info` | Get bot info (userId, displayName, icon) |

### Group & Room Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/v2/bot/group/{groupId}/summary` | Group summary |
| GET | `/v2/bot/group/{groupId}/members/count` | Member count |
| GET | `/v2/bot/group/{groupId}/members/ids?start=` | Member IDs (paginated) |
| GET | `/v2/bot/group/{groupId}/member/{userId}` | Member profile |
| POST | `/v2/bot/group/{groupId}/leave` | Leave group |
| GET | `/v2/bot/room/{roomId}/members/count` | Room member count |
| GET | `/v2/bot/room/{roomId}/members/ids?start=` | Room member IDs |
| GET | `/v2/bot/room/{roomId}/member/{userId}` | Room member profile |
| POST | `/v2/bot/room/{roomId}/leave` | Leave room |

### Audience Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/v2/bot/audience` | Create upload audience (JSON) |
| POST | `/v2/bot/audience/upload` | Create upload audience (file) |
| PUT | `/v2/bot/audience/{audienceId}` | Update audience (JSON) |
| PUT | `/v2/bot/audience/{audienceId}/upload` | Update audience (file) |
| POST | `/v2/bot/audience/click` | Create click-based audience |
| POST | `/v2/bot/audience/impression` | Create impression-based audience |
| PUT | `/v2/bot/audience/{audienceId}/description` | Rename audience |
| DELETE | `/v2/bot/audience/{audienceId}` | Delete audience |
| GET | `/v2/bot/audience/{audienceId}` | Get audience data |
| GET | `/v2/bot/audiences?audienceIds=` | Get multiple audiences |

### Content Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/v2/bot/message/{messageId}/content` | Get media content (api-data.line.me) |
| GET | `/v2/bot/message/{messageId}/content/preview` | Get preview/thumbnail |
| GET | `/v2/bot/message/{messageId}/content/transcoding` | Check video/audio transcoding status |

### Webhook Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| PUT | `/v2/bot/channel/webhook/endpoint` | Set webhook URL |
| GET | `/v2/bot/channel/webhook/endpoint` | Get current webhook URL |
| POST | `/v2/bot/channel/webhook/test` | Test webhook connectivity |

### Token Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/v2/oauth/accessToken` | Issue token v2.1 |
| GET | `/v2/oauth/verifyAccessToken` | Verify token v2.1 |
| GET | `/v2/oauth/accessToken` | Get valid token IDs |
| POST | `/v2/oauth/revoke` | Revoke token |
| POST | `/v2/oauth/accessToken/stateless` | Issue stateless token |
| POST | `/v2/oauth/accessToken/short-lived` | Issue short-lived token |

### Other Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/v2/bot/user/{userId}/linkToken` | Issue account link token |
| GET | `/v2/bot/user/{userId}/membership` | Get user subscription status |
| GET | `/v2/bot/membership/plans` | Get membership plans |
| GET | `/v2/bot/membership/users?planId=` | Get membership user IDs |
| POST | `/v2/bot/coupons` | Create coupon |
| GET | `/v2/bot/coupons` | List coupons |
| GET | `/v2/bot/coupons/{couponId}` | Get coupon details |
| PUT | `/v2/bot/coupons/{couponId}` | Discontinue coupon |

---

## LINE Emoji in Messages

```typescript
// Use emojis property in text messages
{
  type: 'text',
  text: '$ LINE emoji $',  // $ = placeholder for emoji
  emojis: [
    { index: 0, productId: '5ac1bfd5040ab15980c9b435', emojiId: '001' },
    { index: 13, productId: '5ac1bfd5040ab15980c9b435', emojiId: '002' },
  ]
}
```

- `index`: position in text string where emoji appears
- `productId`: emoji set identifier
- `emojiId`: specific emoji within the set (e.g., '001', '002')
- Unicode emoji can be used directly in text without the emojis property

---

## Sendable Sticker Packages

| Package ID | Title |
|-----------|-------|
| 446 | Moon: Special Edition |
| 789 | Sally: Special Edition |
| 1070 | Moon: Special Edition |
| 6136 | LINE Characters: Making Amends |
| 6325 | Brown and Cony Fun Size Pack |
| 6359 | Brown and Cony Fun Size Pack |
| 6362 | Brown and Cony Fun Size Pack |
| 6370 | Brown and Cony Fun Size Pack |
| 6632 | LINE Characters: Making Amends |
| 8515 | LINE Characters: Pretty Phrases |
| 8522 | LINE Characters: Pretty Phrases |
| 8525 | LINE Characters: Pretty Phrases |
| 11537 | Brown & Cony & Sally: Animated Special |
| 11538 | CHOCO & Friends: Animated Special |
| 11539 | UNIVERSTAR BT21: Animated Special |

```typescript
{ type: 'sticker', packageId: '446', stickerId: '1988' }
```

---

## Webhook SSL/TLS Requirements

| Protocol | Supported |
|----------|-----------|
| TLS 1.3 | Yes |
| TLS 1.2 | Yes |
| TLS 1.1 or lower | No |
| HTTP/2, HTTP/1.1, HTTP/1.0 | All supported |

---

## Auto-Response Pattern

### Rule Structure

```typescript
interface WebhookResponse {
  id: string
  channelId: string
  name: string
  enabled: boolean
  priority: number  // Lower = higher priority
  trigger: {
    type: 'keyword' | 'regex' | 'contains' | 'exact'
    value: string
    eventType: 'message' | 'follow' | 'postback'
  }
  action: {
    type: 'reply' | 'push' | 'create_audience'
    messages?: Message[]
    audienceGroupId?: string
  }
}
```

### Evaluation Order
1. Sort rules by `priority` (ascending)
2. Match first rule that fits the incoming event
3. Execute action (use reply token if available — it's free)
4. If no match → use default response (if configured)
5. If no default → return 200 OK with no reply

---

## Gotchas & Common Mistakes

1. **Signature verification**: Must use raw body string BEFORE parsing. Most bugs come from verifying after `JSON.parse()`
2. **Reply token**: Single use, 1-minute expiry. Don't try to reuse or store it
3. **404 on profile**: Usually means user blocked you, not that the API is broken
4. **Rich Menu on PC**: Not supported — always handle gracefully
5. **Flex altText**: Required field, often forgotten — users see this in notifications
6. **Multicast max 500**: Chunk larger arrays, or use broadcast/narrowcast
7. **Token reuse**: Don't issue new channel access tokens per request — reuse within validity
8. **Webhook 200**: Always return 200 quickly, process events async. LINE retries if you're slow
9. **api-data.line.me**: Use this domain for content/image endpoints, not api.line.me
10. **Audience concurrent limit**: Max 10 concurrent operations per audienceGroupId