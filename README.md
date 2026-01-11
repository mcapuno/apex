## Multi Shop Search (Expo / React Native)

Mobile app that searches across multiple online shops using a **configurable shop list**.

### Run locally

```bash
npm install
npx expo start
```

Then press:
- `a` for Android emulator
- `i` for iOS simulator (macOS)
- or scan the QR with **Expo Go** on your phone

### Add a new shop

Edit `src/config/shops.json` and add an entry:
- `id`: unique string
- `name`: display name
- `enabled`: `true|false`
- `homeUrl`: shop homepage
- `searchUrlTemplate`: search URL containing `{q}` (the query placeholder)
