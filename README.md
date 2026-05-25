# i 記帳 PWA

這是 i 記帳的靜態 PWA 版本，可以用 iPhone Safari 開啟後加入主畫面，不需要每 7 天透過 Xcode 重新安裝。

## 本機預覽

```sh
cd /Users/yanghaohsiang/Desktop/i-expense-pwa
python3 -m http.server 4174
```

開啟 `http://localhost:4174`。

## 部署

此 repo 只放 PWA 靜態檔。GitHub Pages 可以設定為從 `main` 分支的 `/ (root)` 發布。

預期網址：

```text
https://mmyangmm.github.io/i-expense-pwa/
```

## Firebase 同步設定

1. 在 Firebase Console 建立專案。
2. 新增 Web app，複製 Firebase config 到 `firebase-config.js`。
3. Authentication 啟用 Google provider。
4. Firestore 建立 database。
5. Authentication > Settings > Authorized domains 加入：
   - `mmyangmm.github.io`

Firestore Rules：

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/expenses/{expenseId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## 資料

未登入時資料存在瀏覽器 `localStorage`。登入 Google 後會同步到 Firestore 的 `users/{uid}/expenses/{expenseId}`，設定頁仍保留 JSON 備份、JSON 匯入和 CSV 匯出。
