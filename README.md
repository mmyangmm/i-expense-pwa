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

## 資料

資料目前儲存在瀏覽器 `localStorage`。設定頁提供 JSON 備份、JSON 匯入和 CSV 匯出。
