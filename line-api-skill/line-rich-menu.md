---
name: line-rich-menu
description: LINE Rich Menu reference — image specs, creation methods, display priority, API workflow, action area mapping, tab switching with aliases, per-user menus, and step-by-step setup guide.
---

# LINE Rich Menus

## When to Activate

- Creating or managing Rich Menus
- Setting up Rich Menu tab switching
- Linking Rich Menu to specific users
- Rich Menu image preparation
- Code contains `richmenu`, `richMenuId`, or `richmenuswitch`

---

## Image Requirements

| Layout | Dimensions | Use Case |
|--------|-----------|----------|
| Full | 2500 x 1686 px | Standard 6-area (2x3 grid) |
| Half | 2500 x 843 px | Compact 3-area (1x3 grid) |
| Format | JPEG or PNG | Max 1MB |

---

## Creation Methods

| Method | Features | Limitations |
|--------|----------|-------------|
| LINE Official Account Manager | Display period, statistics, GUI | No postback/datetime picker, no tab switching |
| Messaging API | Postback, datetime picker, tab switching, per-user | No statistics, no display period |

---

## Display Priority (Highest → Lowest)

1. Per-user rich menu (Messaging API)
2. Default rich menu (Messaging API)
3. Default rich menu (LINE Official Account Manager)

## Timing of Changes

| Type | When Effective |
|------|---------------|
| Per-user (API) | Immediately |
| Default (API) | On user chat reopen (up to 1 min) |
| Default (Manager) | On user chat reopen |

---

## API Workflow (Step-by-Step)

### Step 1: Create Rich Menu

```
POST https://api.line.me/v2/bot/richmenu
```

```json
{
  "size": { "width": 2500, "height": 1686 },
  "selected": false,
  "name": "My Rich Menu",
  "chatBarText": "Menu",
  "areas": [
    {
      "bounds": { "x": 0, "y": 0, "width": 833, "height": 843 },
      "action": { "type": "uri", "uri": "https://example.com" }
    },
    {
      "bounds": { "x": 833, "y": 0, "width": 834, "height": 843 },
      "action": { "type": "postback", "label": "Menu B", "data": "tab=b" }
    },
    {
      "bounds": { "x": 1667, "y": 0, "width": 833, "height": 843 },
      "action": { "type": "message", "text": "Hello" }
    },
    {
      "bounds": { "x": 0, "y": 843, "width": 833, "height": 843 },
      "action": { "type": "uri", "uri": "https://example.com/page2" }
    },
    {
      "bounds": { "x": 833, "y": 843, "width": 834, "height": 843 },
      "action": { "type": "postback", "label": "Action", "data": "action=clicked" }
    },
    {
      "bounds": { "x": 1667, "y": 843, "width": 833, "height": 843 },
      "action": { "type": "uri", "uri": "tel:+66123456789" }
    }
  ]
}
```

Response: `{ "richMenuId": "richmenu-xxxxxxx" }`

### Step 2: Upload Image

```
POST https://api-data.line.me/v2/bot/richmenu/{richMenuId}/content
Content-Type: image/jpeg (or image/png)
```

Body: raw image binary

### Step 3: Set as Default

```
POST https://api.line.me/v2/bot/user/all/richmenu/{richMenuId}
```

### Step 4: Validate (Optional)

```
POST https://api.line.me/v2/bot/richmenu/validate
```

---

## Action Area Mapping

### Full Size (2500 x 1686) — 6 Equal Areas (2x3 Grid)

```
┌──────────┬──────────┬──────────┐
│  Area 1  │  Area 2  │  Area 3  │  y: 0-843
│  0,0     │  833,0   │  1667,0  │
│  833x843 │  834x843 │  833x843 │
├──────────┼──────────┼──────────┤
│  Area 4  │  Area 5  │  Area 6  │  y: 843-1686
│  0,843   │  833,843 │  1667,843│
│  833x843 │  834x843 │  833x843 │
└──────────┴──────────┴──────────┘
```

```json
[
  { "bounds": { "x": 0, "y": 0, "width": 833, "height": 843 } },
  { "bounds": { "x": 833, "y": 0, "width": 834, "height": 843 } },
  { "bounds": { "x": 1667, "y": 0, "width": 833, "height": 843 } },
  { "bounds": { "x": 0, "y": 843, "width": 833, "height": 843 } },
  { "bounds": { "x": 833, "y": 843, "width": 834, "height": 843 } },
  { "bounds": { "x": 1667, "y": 843, "width": 833, "height": 843 } }
]
```

### Half Size (2500 x 843) — 3 Equal Areas (1x3 Grid)

```
┌──────────┬──────────┬──────────┐
│  Area 1  │  Area 2  │  Area 3  │  y: 0-843
│  0,0     │  833,0   │  1667,0  │
│  833x843 │  834x843 │  833x843 │
└──────────┴──────────┴──────────┘
```

```json
[
  { "bounds": { "x": 0, "y": 0, "width": 833, "height": 843 } },
  { "bounds": { "x": 833, "y": 0, "width": 834, "height": 843 } },
  { "bounds": { "x": 1667, "y": 0, "width": 833, "height": 843 } }
]
```

---

## Tab Switching with Aliases (Step-by-Step)

### Step 1: Create Two Rich Menus

Create Menu A and Menu B with `createRichMenu` (see API Workflow above).

In each menu, include a `richmenuswitch` action in the tab area that switches to the other menu.

**Menu A — Tab area switches to Menu B:**
```json
{
  "bounds": { "x": 1667, "y": 0, "width": 833, "height": 843 },
  "action": {
    "type": "richmenuswitch",
    "richMenuAliasId": "richmenu-alias-b",
    "data": "tab=b"
  }
}
```

**Menu B — Tab area switches to Menu A:**
```json
{
  "bounds": { "x": 0, "y": 0, "width": 833, "height": 843 },
  "action": {
    "type": "richmenuswitch",
    "richMenuAliasId": "richmenu-alias-a",
    "data": "tab=a"
  }
}
```

### Step 2: Upload Images for Both Menus

Upload appropriate images to each rich menu (see Step 2 in API Workflow).

### Step 3: Create Aliases

```
POST https://api.line.me/v2/bot/richmenu/alias
```

```json
{ "richMenuAliasId": "richmenu-alias-a", "richMenuId": "richmenu-xxxxx-a" }
```

```json
{ "richMenuAliasId": "richmenu-alias-b", "richMenuId": "richmenu-xxxxx-b" }
```

### Step 4: Set Menu A as Default

```
POST https://api.line.me/v2/bot/user/all/richmenu/{richMenuId-A}
```

Now tapping the tab area in Menu A switches to Menu B and vice versa.

---

## Per-User Rich Menu

### Link Menu to Specific User (Immediate Effect)

```
POST https://api.line.me/v2/bot/user/{userId}/richmenu/{richMenuId}
```

### Unlink from User (Reverts to Default)

```
DELETE https://api.line.me/v2/bot/user/{userId}/richmenu
```

### Batch Operations

```
POST https://api.line.me/v2/bot/richmenu/bulk/link
```

```json
{
  "richMenuId": "richmenu-xxxxx",
  "userIds": ["U001", "U002", "U003"]
}
```

**Constraints:**
- Not available on LINE PC
- Can't link to users who only use LINE PC
- User must be friend of the LINE Official Account

---

## Rich Menu Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/v2/bot/richmenu` | Create rich menu |
| POST | `/v2/bot/richmenu/validate` | Validate rich menu structure |
| GET | `/v2/bot/richmenu/list` | List all rich menus |
| GET | `/v2/bot/richmenu/{richMenuId}` | Get specific menu |
| DELETE | `/v2/bot/richmenu/{richMenuId}` | Delete menu |
| POST | `/v2/bot/richmenu/{richMenuId}/content` | Upload image (api-data.line.me) |
| GET | `/v2/bot/richmenu/{richMenuId}/content` | Download image (api-data.line.me) |
| POST | `/v2/bot/user/all/richmenu/{richMenuId}` | Set as default |
| GET | `/v2/bot/user/all/richmenu` | Get default menu ID |
| DELETE | `/v2/bot/user/all/richmenu` | Clear default menu |

### Per-User Rich Menu Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/v2/bot/user/{userId}/richmenu/{richMenuId}` | Link to user |
| POST | `/v2/bot/richmenu/bulk/link` | Link to multiple users |
| GET | `/v2/bot/user/{userId}/richmenu` | Get user's menu ID |
| DELETE | `/v2/bot/user/{userId}/richmenu` | Unlink from user |
| POST | `/v2/bot/richmenu/bulk/unlink` | Unlink from multiple users |
| POST | `/v2/bot/richmenu/batch` | Batch link/unlink |
| GET | `/v2/bot/richmenu/batch/progress?requestId=` | Batch status |
| POST | `/v2/bot/richmenu/batch/validate` | Validate batch request |

### Rich Menu Alias Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/v2/bot/richmenu/alias` | Create alias |
| PUT | `/v2/bot/richmenu/alias/{richMenuAliasId}` | Update alias |
| GET | `/v2/bot/richmenu/alias/{richMenuAliasId}` | Get alias info |
| DELETE | `/v2/bot/richmenu/alias/{richMenuAliasId}` | Delete alias |
| GET | `/v2/bot/richmenu/alias/list` | List all aliases |
