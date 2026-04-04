# LINE Developer Tools Builder Document

### By Thepnatee Phojan - LINE API Expert

LINE Platform Developer Documentation (Thai) - คู่มือพัฒนา LINE Platform สำหรับนักพัฒนาไทย ครอบคลุมตั้งแต่พื้นฐาน Official Account จนถึง LINE MINI App

---

## สารบัญ (Table of Contents)

### บทที่ 01 - Introduction & Overview
| ไฟล์ | หัวข้อ |
|------|--------|
| [01-01](workshop/01-01.introduction-overview-official-account.md) | LINE Official Account Overview |
| [01-02](workshop/01-02.introduction-overview-developer.md) | LINE Developer Services Overview |
| [01-03](workshop/01-03.line-url-scheme.md) | LINE URL Scheme |
| [01-04](workshop/01-04.line-status.md) | LINE API Status |
| [01-05](workshop/01-05.certified-provider.md) | Certified Provider |

### บทที่ 02 - Account & API Setup
| ไฟล์ | หัวข้อ |
|------|--------|
| [02-01](workshop/02-01.open-line-official-account.md) | เปิดใช้งาน LINE Official Account |
| [02-02](workshop/02-02.line-messaging-api.md) | LINE Messaging API Overview |

### บทที่ 03 - Webhook
| ไฟล์ | หัวข้อ |
|------|--------|
| [03-01](workshop/03-01.line-webhook.md) | LINE Webhook Events |

### บทที่ 04 - Chatbot Development Setup
| ไฟล์ | หัวข้อ |
|------|--------|
| [04-01](workshop/04-01.create-chatbot-firebase.md) | สร้าง Chatbot ด้วย Firebase |
| [04-02](workshop/04-02.ngrok.md) | ngrok |
| [04-03](workshop/04-03.setup-webhook.md) | ตั้งค่า Webhook |
| [04-04](workshop/04-04.setup-webhook-by-api.md) | ตั้งค่า Webhook ผ่าน API |
| [04-05](workshop/04-05.webhook-ssl-tls.md) | Webhook SSL/TLS |

### บทที่ 05 - Messages & Advanced Features
| ไฟล์ | หัวข้อ |
|------|--------|
| [05-01](workshop/05-01.messages.md) | Message Types |
| [05-02](workshop/05-02.message-postman.md) | Postman Collection |
| [05-03](workshop/05-03.messages-quick-replies.md) | Quick Replies |
| [05-04](workshop/05-04.messages-quote-tokens.md) | Quote Tokens |
| [05-05](workshop/05-05.channel-access-token.md) | Channel Access Token |
| [05-06](workshop/05-06.loading-animation.md) | Loading Animation |
| [05-07](workshop/05-07.message-mention.md) | Message Mention (Text v2) |
| [05-08](workshop/05-08.redis.md) | Redis Caching |
| [05-09](workshop/05-09.validate-message-object-api.md) | Validate Message Object API |
| [05-10](workshop/05-10.x-line-signature.md) | X-Line-Signature Verification |
| [05-11](workshop/05-11.sending-message.md) | Sending Messages |
| [05-12](workshop/05-12.message-narrowcast.md) | Narrowcast Messages |
| [05-13](workshop/05-13.get-statistics-of-sent-messages.md) | Message Statistics |
| [05-14](workshop/05-14.cronjob.md) | Cron Job |
| [05-15](workshop/05-15.line-beacon.md) | LINE Beacon |

### บทที่ 06 - Flex Messages
| ไฟล์ | หัวข้อ |
|------|--------|
| [06-01](workshop/06-01.flex-message-overview.md) | Flex Message Overview |
| [06-02](workshop/06-02.flex-message-simulator.md) | Flex Message Simulator |
| [06-03](workshop/06-03.workshop-flex-message-chat-gpt.md) | Workshop: Flex Message + ChatGPT |

### บทที่ 07 - Firebase Storage
| ไฟล์ | หัวข้อ |
|------|--------|
| [07-01](workshop/07-01.firebase-storage.md) | Firebase Storage |

### บทที่ 08 - Rich Menu
| ไฟล์ | หัวข้อ |
|------|--------|
| [08-01](workshop/08-01.rich-menu-overview.md) | Rich Menu Overview |
| [08-02](workshop/08-02.workshop-rich-menu-switch-action.md) | Workshop: Rich Menu Switch Action |

### บทที่ 09 - LIFF (LINE Front-end Framework)
| ไฟล์ | หัวข้อ |
|------|--------|
| [09-01](workshop/09-01.liff-overview.md) | LIFF Overview |
| [09-02](workshop/09-02.liff-starter-vue.md) | LIFF Starter (Vue.js / Create LIFF App) |
| [09-03](workshop/09-03.liff-get-profile.md) | LIFF Get Profile |
| [09-04](workshop/09-04.liff-environment.md) | LIFF Environment |
| [09-05](workshop/09-05.liff-get-profile-friendship.md) | LIFF Get Profile Friendship |
| [09-06](workshop/09-06.liff-sending-message.md) | LIFF Sending Messages |
| [09-07](workshop/09-07.liff-scan-qrcode.md) | LIFF Scan QR Code |
| [09-08](workshop/09-08.liff-cli.md) | LIFF CLI |

### บทที่ 10 - LINE MINI App
| ไฟล์ | หัวข้อ |
|------|--------|
| [10-01](workshop/10-01.line-mini-app-overview.md) | LINE MINI App Overview |
| [10-02](workshop/10-02.intro-line-mini-app-dev.md) | Introduction to LINE MINI App Development |
| [10-03](workshop/10-03.try-service-message.md) | Service Message |
| [10-04](workshop/10-04.mini-app-home-screen-shortcut.md) | Home Screen Shortcut |

### บทที่ 11 - LINE Developer Tools Builder
| ไฟล์ | หัวข้อ |
|------|--------|
| [11-01](workshop/11-01.line-dev-tools-builder-overview.md) | LINE Developer Tools Builder Overview & Features |
| [11-02](workshop/11-02.line-dev-tools-builder-guide.md) | คู่มือการใช้งาน LINE Developer Tools Builder |

---

## Tech Stack

- **LINE Messaging API** - Webhook, Messages, Flex Messages, Rich Menu
- **LINE Front-end Framework (LIFF)** - Web apps within LINE
- **LINE MINI App** - Native-like apps within LINE
- **Firebase** - Cloud Functions, Storage
- **Node.js / TypeScript** - Backend runtime
- **Vue.js** - LIFF frontend framework

## References

- [LINE Developers Documentation](https://developers.line.biz/)
- [LINE Developers Console](https://developers.line.biz/console/)
- [Flex Message Simulator](https://developers.line.biz/flex-simulator/)
- [LIFF Playground](https://liff-playground.netlify.app/)
- [LINE API Status](https://api.line-status.info/)
