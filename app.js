import { firebaseConfig, firebaseIsConfigured } from "./firebase-config.js";

const STORAGE_KEY = "i-expense-pwa-v1";
const SETTINGS_KEY = "i-expense-pwa-settings-v1";
const FIREBASE_SDK_VERSION = "12.7.0";
const APPLE_REFERENCE_OFFSET_MS = 978307200000;

const categories = [
  { id: "food", name: "餐飲", type: "expense", emoji: "🍜", color: "#e65f63", keywords: ["午餐", "早餐", "晚餐", "飯", "食", "吃", "咖啡", "飲料", "餐廳", "便當", "麵", "超商", "711", "全家", "甜點", "奶茶", "火鍋"] },
  { id: "transport", name: "交通", type: "expense", emoji: "🚗", color: "#2f9c95", keywords: ["捷運", "公車", "計程車", "uber", "taxi", "油費", "停車", "高鐵", "火車", "交通", "加油", "機票", "台鐵", "悠遊"] },
  { id: "shopping", name: "購物", type: "expense", emoji: "🛍️", color: "#3478b8", keywords: ["購物", "買", "衣服", "鞋子", "包包", "3c", "電腦", "手機", "momo", "蝦皮", "網購", "amazon", "ikea", "百貨"] },
  { id: "entertainment", name: "娛樂", type: "expense", emoji: "🎮", color: "#7a65b7", keywords: ["電影", "遊戲", "ktv", "娛樂", "netflix", "旅遊", "玩", "音樂", "書", "展覽", "演唱會", "健身"] },
  { id: "medical", name: "醫療", type: "expense", emoji: "💊", color: "#c85a99", keywords: ["醫院", "藥局", "看病", "醫療", "診所", "藥", "健檢", "牙科", "眼科", "掛號"] },
  { id: "home", name: "居家", type: "expense", emoji: "🏠", color: "#d68a2f", keywords: ["水電", "房租", "家具", "裝潢", "修繕", "家居", "清潔", "網路", "瓦斯", "保險", "管理費"] },
  { id: "other", name: "其他", type: "expense", emoji: "📦", color: "#7b8a86", keywords: [] },
  { id: "salary", name: "薪資", type: "income", emoji: "💰", color: "#238b45", keywords: ["薪水", "薪資", "月薪", "工資", "底薪", "發薪", "入帳", "salary"] },
  { id: "bonus", name: "獎金", type: "income", emoji: "🎁", color: "#3aa35c", keywords: ["獎金", "年終", "績效", "紅包", "禮金", "bonus"] },
  { id: "partTime", name: "兼職", type: "income", emoji: "💼", color: "#3686b8", keywords: ["兼職", "打工", "接案", "freelance", "外快", "副業", "稿費"] },
  { id: "investment", name: "投資", type: "income", emoji: "📈", color: "#7650a8", keywords: ["股票", "股利", "投資", "基金", "利息", "配息", "dividend", "收益"] },
  { id: "incomeOther", name: "其他收入", type: "income", emoji: "💵", color: "#7f9d32", keywords: [] }
];

const travelCurrencies = [
  { code: "TWD", name: "新台幣", flag: "🇹🇼", symbol: "NT$" },
  { code: "JPY", name: "日圓", flag: "🇯🇵", symbol: "¥" },
  { code: "USD", name: "美元", flag: "🇺🇸", symbol: "$" },
  { code: "EUR", name: "歐元", flag: "🇪🇺", symbol: "€" },
  { code: "GBP", name: "英鎊", flag: "🇬🇧", symbol: "£" },
  { code: "CHF", name: "瑞士法郎", flag: "🇨🇭", symbol: "CHF" },
  { code: "HKD", name: "港幣", flag: "🇭🇰", symbol: "HK$" },
  { code: "MOP", name: "澳門幣", flag: "🇲🇴", symbol: "MOP$" },
  { code: "CNY", name: "人民幣", flag: "🇨🇳", symbol: "¥" },
  { code: "KRW", name: "韓元", flag: "🇰🇷", symbol: "₩" },
  { code: "SGD", name: "新加坡幣", flag: "🇸🇬", symbol: "S$" },
  { code: "THB", name: "泰銖", flag: "🇹🇭", symbol: "฿" },
  { code: "AUD", name: "澳幣", flag: "🇦🇺", symbol: "A$" },
  { code: "CAD", name: "加幣", flag: "🇨🇦", symbol: "C$" },
  { code: "MYR", name: "馬幣", flag: "🇲🇾", symbol: "RM" },
  { code: "IDR", name: "印尼盾", flag: "🇮🇩", symbol: "Rp" },
  { code: "PHP", name: "菲律賓披索", flag: "🇵🇭", symbol: "₱" },
  { code: "VND", name: "越南盾", flag: "🇻🇳", symbol: "₫" }
];

const fallbackRatesToTwd = {
  TWD: 1,
  USD: 32.5,
  JPY: 0.215,
  EUR: 35.5,
  GBP: 41.5,
  CHF: 37.2,
  HKD: 4.15,
  MOP: 4.01,
  CNY: 4.5,
  KRW: 0.024,
  SGD: 24.5,
  THB: 0.91,
  AUD: 21.5,
  CAD: 23.5,
  MYR: 7.3,
  IDR: 0.0021,
  PHP: 0.56,
  VND: 0.0013
};

const backgroundStyles = [
  { id: "green", label: "清新", icon: "葉", color: "#2f8f83", bg: "linear-gradient(135deg, #eef8f5, #ffffff)" },
  { id: "pink", label: "粉色", icon: "花", color: "#ff6b9d", bg: "linear-gradient(135deg, #fff0f6, #ffffff)" },
  { id: "blue", label: "藍色", icon: "水", color: "#3b82f6", bg: "linear-gradient(135deg, #eaf4ff, #ffffff)" },
  { id: "light", label: "淺色", icon: "日", color: "#007aff", bg: "linear-gradient(135deg, #f2f2f7, #ffffff)" },
  { id: "dark", label: "深色", icon: "月", color: "#0a84ff", bg: "linear-gradient(135deg, #20293a, #111827)" }
];

const appIconOptions = [
  {
    id: "default",
    label: "預設",
    preview: "./assets/icon-512.png",
    icon192: "./assets/icon-192.png",
    appleTouch: "./assets/apple-touch-icon.png",
    manifest: "./manifest.webmanifest"
  },
  {
    id: "cat",
    label: "貓咪",
    preview: "./assets/AppIconAlt_preview.png",
    icon192: "./assets/icon-alt-192.png",
    appleTouch: "./assets/apple-touch-icon-alt.png",
    manifest: "./manifest-alt.webmanifest"
  }
];

const state = {
  expenses: loadExpenses(),
  settings: loadSettings(),
  selectedMonth: startOfMonth(new Date()),
  currentTab: "home",
  statsMode: "category",
  deferredInstallPrompt: null,
  syncStatus: firebaseIsConfigured ? "準備連線" : "尚未設定 Firebase",
  authLabel: "本機",
  user: null
};

const cloud = {
  auth: null,
  db: null,
  provider: null,
  unsubscribe: null,
  modules: null,
  ready: false,
  syncing: false
};

let speechRecognition = null;
let reminderTimer = null;

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

const els = {
  manifestLink: $("#manifestLink"),
  faviconLink: $("#faviconLink"),
  appleTouchIcon: $("#appleTouchIcon"),
  brandIcon: $("#brandIcon"),
  todayLabel: $("#todayLabel"),
  homeTitle: $("#homeTitle"),
  goCurrentMonth: $("#goCurrentMonth"),
  monthExpense: $("#monthExpense"),
  monthIncome: $("#monthIncome"),
  monthBalance: $("#monthBalance"),
  averageLabel: $("#averageLabel"),
  averageMeter: $("#averageMeter"),
  categoryStrip: $("#categoryStrip"),
  transactionList: $("#transactionList"),
  recordCount: $("#recordCount"),
  chartCanvas: $("#chartCanvas"),
  statsList: $("#statsList"),
  statsCount: $("#statsCount"),
  statsMode: $("#statsMode"),
  dialog: $("#entryDialog"),
  entryForm: $("#entryForm"),
  dialogTitle: $("#dialogTitle"),
  entryId: $("#entryId"),
  amountInput: $("#amountInput"),
  amountLabel: $("#amountLabel"),
  travelEstimate: $("#travelEstimate"),
  categoryInput: $("#categoryInput"),
  noteInput: $("#noteInput"),
  dateInput: $("#dateInput"),
  themeSelect: $("#themeSelect"),
  backgroundOptions: $("#backgroundOptions"),
  iconOptions: $("#iconOptions"),
  iconStatus: $("#iconStatus"),
  travelEnabled: $("#travelEnabled"),
  travelCurrency: $("#travelCurrency"),
  travelRateStatus: $("#travelRateStatus"),
  refreshTravelRate: $("#refreshTravelRate"),
  converterAmount: $("#converterAmount"),
  converterFrom: $("#converterFrom"),
  converterTo: $("#converterTo"),
  converterStatus: $("#converterStatus"),
  converterResult: $("#converterResult"),
  voiceButton: $("#voiceButton"),
  voiceText: $("#voiceText"),
  voiceStatus: $("#voiceStatus"),
  parseVoiceButton: $("#parseVoiceButton"),
  reminderEnabled: $("#reminderEnabled"),
  reminderTime: $("#reminderTime"),
  reminderStatus: $("#reminderStatus"),
  requestNotification: $("#requestNotification"),
  deleteEntry: $("#deleteEntry"),
  installButton: $("#installButton"),
  authStatus: $("#authStatus"),
  syncStatus: $("#syncStatus"),
  signInButton: $("#signInButton"),
  signOutButton: $("#signOutButton"),
  syncNowButton: $("#syncNowButton")
};

init();

function init() {
  applyTheme();
  applyAppIcon();
  hydrateCurrencyOptions();
  hydrateSettingsControls();

  els.todayLabel.textContent = new Intl.DateTimeFormat("zh-TW", {
    month: "long",
    day: "numeric",
    weekday: "long"
  }).format(new Date());

  bindEvents();
  hydrateCategoryOptions("expense");
  render();
  updateSyncUI();
  updateToolsUI();
  initFirebaseSync();
  startReminderChecker();
  registerServiceWorker();
}

function bindEvents() {
  $$("[data-month]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedMonth = addMonths(state.selectedMonth, Number(button.dataset.month));
      render();
    });
  });

  els.goCurrentMonth.addEventListener("click", () => {
    state.selectedMonth = startOfMonth(new Date());
    render();
  });

  $$(".tab").forEach((button) => {
    button.addEventListener("click", () => {
      state.currentTab = button.dataset.tab;
      renderTabs();
    });
  });

  $("#addButton").addEventListener("click", () => openEntryDialog());
  $("#cancelEntry").addEventListener("click", () => closeDialog());

  $$("input[name='entryType']").forEach((radio) => {
    radio.addEventListener("change", () => {
      hydrateCategoryOptions(entryType());
      inferCategoryFromNote();
      updateEntryTravelUI();
    });
  });

  els.noteInput.addEventListener("input", inferCategoryFromNote);
  els.amountInput.addEventListener("input", updateEntryTravelUI);
  els.entryForm.addEventListener("submit", saveEntry);
  els.deleteEntry.addEventListener("click", deleteEntry);
  els.statsMode.addEventListener("change", () => {
    state.statsMode = els.statsMode.value;
    renderStats();
  });

  $("#exportJson").addEventListener("click", exportJson);
  $("#exportCsv").addEventListener("click", exportCsv);
  $("#importJson").addEventListener("change", importJson);
  $("#pasteJson").addEventListener("click", importJsonFromClipboard);
  $("#clearData").addEventListener("click", clearData);
  els.signInButton?.addEventListener("click", signInWithGoogle);
  els.signOutButton?.addEventListener("click", signOutFromCloud);
  els.syncNowButton?.addEventListener("click", syncAllToCloud);
  els.themeSelect?.addEventListener("change", () => {
    state.settings.theme = els.themeSelect.value;
    persistSettings();
    applyTheme();
  });
  els.backgroundOptions?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-background-style]");
    if (!button) return;
    state.settings.theme = normalizeTheme(button.dataset.backgroundStyle);
    persistSettings();
    applyTheme();
    renderAppearanceOptions();
  });
  els.iconOptions?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-app-icon]");
    if (!button) return;
    state.settings.appIcon = normalizeAppIcon(button.dataset.appIcon);
    persistSettings();
    applyAppIcon();
    renderAppearanceOptions();
  });
  els.travelEnabled?.addEventListener("change", () => {
    state.settings.travelEnabled = els.travelEnabled.checked;
    if (state.settings.travelEnabled && !state.settings.travelSessionId) state.settings.travelSessionId = makeId();
    persistSettings();
    updateToolsUI();
  });
  els.travelCurrency?.addEventListener("change", () => {
    state.settings.travelCurrency = els.travelCurrency.value;
    persistSettings();
    fetchTravelRate();
    updateToolsUI();
  });
  els.refreshTravelRate?.addEventListener("click", fetchTravelRate);
  [els.converterAmount, els.converterFrom, els.converterTo].forEach((element) => {
    element?.addEventListener("input", updateConverter);
    element?.addEventListener("change", updateConverter);
  });
  els.voiceButton?.addEventListener("click", toggleVoiceInput);
  els.parseVoiceButton?.addEventListener("click", parseVoiceDraft);
  els.reminderEnabled?.addEventListener("change", () => {
    state.settings.reminderEnabled = els.reminderEnabled.checked;
    persistSettings();
    updateReminderUI();
  });
  els.reminderTime?.addEventListener("change", () => {
    state.settings.reminderTime = els.reminderTime.value || "21:00";
    persistSettings();
    updateReminderUI();
  });
  els.requestNotification?.addEventListener("click", requestNotificationPermission);

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    state.deferredInstallPrompt = event;
    els.installButton.hidden = false;
  });

  els.installButton.addEventListener("click", async () => {
    if (!state.deferredInstallPrompt) return;
    state.deferredInstallPrompt.prompt();
    await state.deferredInstallPrompt.userChoice;
    state.deferredInstallPrompt = null;
    els.installButton.hidden = true;
  });
}

function render() {
  renderHome();
  renderStats();
  updateToolsUI();
  renderTabs();
}

function applyTheme() {
  const theme = normalizeTheme(state.settings.theme);
  document.documentElement.dataset.theme = theme;
  const selected = backgroundStyles.find((style) => style.id === theme) || backgroundStyles[0];
  document.querySelector("meta[name='theme-color']")?.setAttribute("content", theme === "dark" ? "#111827" : selected.color);
  if (els.themeSelect) els.themeSelect.value = theme;
}

function applyAppIcon() {
  const icon = appIconOptions.find((option) => option.id === normalizeAppIcon(state.settings.appIcon)) || appIconOptions[0];
  if (els.brandIcon) {
    els.brandIcon.src = icon.icon192;
    els.brandIcon.alt = "";
  }
  if (els.faviconLink) els.faviconLink.href = icon.icon192;
  if (els.appleTouchIcon) els.appleTouchIcon.href = icon.appleTouch;
  if (els.manifestLink) els.manifestLink.href = icon.manifest;
}

function hydrateCurrencyOptions() {
  const options = travelCurrencies.map((currency) => `<option value="${currency.code}">${currency.flag} ${currency.name} (${currency.code})</option>`).join("");
  [els.travelCurrency, els.converterFrom, els.converterTo].forEach((select) => {
    if (select) select.innerHTML = options;
  });
}

function hydrateSettingsControls() {
  if (els.themeSelect) els.themeSelect.value = state.settings.theme;
  renderAppearanceOptions();
  if (els.travelEnabled) els.travelEnabled.checked = state.settings.travelEnabled;
  if (els.travelCurrency) els.travelCurrency.value = state.settings.travelCurrency;
  if (els.converterAmount) els.converterAmount.value = String(state.settings.converterAmount);
  if (els.converterFrom) els.converterFrom.value = state.settings.converterFrom;
  if (els.converterTo) els.converterTo.value = state.settings.converterTo;
  if (els.reminderEnabled) els.reminderEnabled.checked = state.settings.reminderEnabled;
  if (els.reminderTime) els.reminderTime.value = state.settings.reminderTime;
  setupVoiceUI();
}

function renderAppearanceOptions() {
  const theme = normalizeTheme(state.settings.theme);
  if (els.backgroundOptions) {
    els.backgroundOptions.innerHTML = backgroundStyles.map((style) => {
      const selected = style.id === theme;
      return `
        <button class="choice-button theme-choice${selected ? " selected" : ""}" data-background-style="${style.id}" type="button" role="radio" aria-checked="${selected}">
          <span class="theme-swatch" style="--swatch-bg:${style.bg};--swatch-color:${style.color}">
            <span>${style.icon}</span>
          </span>
          <span>${style.label}</span>
        </button>
      `;
    }).join("");
  }

  const appIcon = normalizeAppIcon(state.settings.appIcon);
  const selectedIcon = appIconOptions.find((option) => option.id === appIcon) || appIconOptions[0];
  if (els.iconOptions) {
    els.iconOptions.innerHTML = appIconOptions.map((option) => {
      const selected = option.id === appIcon;
      return `
        <button class="choice-button icon-choice${selected ? " selected" : ""}" data-app-icon="${option.id}" type="button" role="radio" aria-checked="${selected}">
          <img src="${option.preview}" alt="" width="52" height="52">
          <span>${option.label}</span>
        </button>
      `;
    }).join("");
  }
  if (els.iconStatus) {
    els.iconStatus.textContent = selectedIcon.id === "default"
      ? "目前使用預設圖示"
      : "目前使用貓咪圖示；iPhone 主畫面圖示需重新加入才會更新";
  }
}

function updateToolsUI() {
  if (els.travelEnabled) els.travelEnabled.checked = state.settings.travelEnabled;
  if (els.travelCurrency) els.travelCurrency.value = state.settings.travelCurrency;
  updateTravelStatus();
  updateConverter();
  updateReminderUI();
  updateEntryTravelUI();
}

function renderTabs() {
  $$(".view").forEach((view) => view.classList.toggle("active", view.id === `${state.currentTab}View`));
  $$(".tab").forEach((tab) => tab.classList.toggle("active", tab.dataset.tab === state.currentTab));
  $("#addButton").hidden = state.currentTab !== "home";
}

function renderHome() {
  const monthItems = currentMonthItems();
  const expenseItems = monthItems.filter((item) => !item.isIncome);
  const incomeItems = monthItems.filter((item) => item.isIncome);
  const expenseTotal = sum(expenseItems);
  const incomeTotal = sum(incomeItems);
  const average = sixMonthAverageExpense();
  const isCurrent = sameMonth(state.selectedMonth, new Date());

  els.homeTitle.textContent = formatMonth(state.selectedMonth);
  els.goCurrentMonth.hidden = isCurrent;
  document.querySelector("[data-month='1']").disabled = isCurrent;
  els.monthExpense.textContent = formatCurrency(expenseTotal);
  els.monthIncome.textContent = formatCurrency(incomeTotal);
  els.monthBalance.textContent = formatCurrency(incomeTotal - expenseTotal);
  els.averageLabel.textContent = average > 0 ? formatCurrency(average) : "無歷史資料";
  els.averageMeter.style.width = `${Math.min(100, average > 0 ? (expenseTotal / average) * 100 : expenseTotal > 0 ? 100 : 0)}%`;
  els.recordCount.textContent = `${monthItems.length} 筆`;

  renderCategoryStrip(expenseItems, expenseTotal);
  renderTransactions(monthItems);
}

function renderCategoryStrip(expenseItems, expenseTotal) {
  const totals = categoryTotals(expenseItems);
  const used = categories
    .filter((category) => category.type === "expense" && totals[category.id] > 0)
    .sort((a, b) => totals[b.id] - totals[a.id]);

  if (!used.length) {
    els.categoryStrip.innerHTML = "";
    return;
  }

  els.categoryStrip.innerHTML = used.map((category) => {
    const pct = expenseTotal > 0 ? Math.round((totals[category.id] / expenseTotal) * 100) : 0;
    return `
      <div class="category-chip">
        <span class="emoji" style="background:${hexToSoft(category.color)}">${category.emoji}</span>
        <span class="name">${category.name} · ${pct}%</span>
        <strong>${formatCurrency(totals[category.id])}</strong>
      </div>
    `;
  }).join("");
}

function renderTransactions(items) {
  if (!items.length) {
    els.transactionList.innerHTML = $("#emptyTemplate").innerHTML;
    return;
  }

  els.transactionList.innerHTML = items
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .map((item) => {
      const category = findCategory(item.category);
      return `
        <button class="transaction-row" type="button" data-id="${item.id}">
          <span class="row-icon" style="background:${hexToSoft(category.color)}">${category.emoji}</span>
          <span class="row-main">
            <strong>${escapeHtml(item.note || category.name)}</strong>
            <time>${formatDateTime(item.date)} · ${category.name}</time>
          </span>
          <span class="row-amount ${item.isIncome ? "income" : "expense"}">${formatEntryAmount(item)}</span>
        </button>
      `;
    }).join("");

  $$(".transaction-row").forEach((row) => {
    row.addEventListener("click", () => openEntryDialog(row.dataset.id));
  });
}

function renderStats() {
  els.statsMode.value = state.statsMode;
  const expenseItems = currentMonthItems().filter((item) => !item.isIncome);
  if (state.statsMode === "daily") {
    renderDailyStats(expenseItems);
  } else {
    renderCategoryStats(expenseItems);
  }
}

function renderCategoryStats(expenseItems) {
  const total = sum(expenseItems);
  const totals = categoryTotals(expenseItems);
  const rows = categories
    .filter((category) => category.type === "expense" && totals[category.id] > 0)
    .sort((a, b) => totals[b.id] - totals[a.id]);

  els.statsCount.textContent = rows.length ? `${rows.length} 類` : "";

  if (!rows.length) {
    els.chartCanvas.innerHTML = $("#emptyTemplate").innerHTML;
    els.statsList.innerHTML = "";
    return;
  }

  els.chartCanvas.innerHTML = rows.map((category) => {
    const amount = totals[category.id];
    const pct = Math.round((amount / total) * 100);
    return `
      <div class="bar-row">
        <strong>${category.emoji} ${category.name}</strong>
        <span class="bar-track"><span class="bar-fill" style="width:${pct}%;background:${category.color}"></span></span>
        <span>${pct}%</span>
      </div>
    `;
  }).join("");

  els.statsList.innerHTML = rows.map((category) => `
    <div class="stats-item">
      <div>
        <strong>${category.emoji} ${category.name}</strong>
        <div class="stats-meta">${currentMonthItems().filter((item) => item.category === category.id).length} 筆</div>
      </div>
      <strong>${formatCurrency(totals[category.id])}</strong>
    </div>
  `).join("");
}

function renderDailyStats(expenseItems) {
  const daily = dailyTotals(expenseItems);
  const max = Math.max(...daily.map((item) => item.amount), 0);
  els.statsCount.textContent = daily.length ? `${daily.length} 天` : "";

  if (!daily.length) {
    els.chartCanvas.innerHTML = $("#emptyTemplate").innerHTML;
    els.statsList.innerHTML = "";
    return;
  }

  els.chartCanvas.innerHTML = daily.map((day) => {
    const pct = max > 0 ? Math.round((day.amount / max) * 100) : 0;
    return `
      <div class="bar-row">
        <strong>${day.label}</strong>
        <span class="bar-track"><span class="bar-fill" style="width:${pct}%;background:#2f8f83"></span></span>
        <span>${formatCurrency(day.amount)}</span>
      </div>
    `;
  }).join("");

  els.statsList.innerHTML = daily.map((day) => `
    <div class="stats-item">
      <div>
        <strong>${day.label}</strong>
        <div class="stats-meta">${day.count} 筆</div>
      </div>
      <strong>${formatCurrency(day.amount)}</strong>
    </div>
  `).join("");
}

function openEntryDialog(id = "", draft = null) {
  const item = state.expenses.find((expense) => expense.id === id);
  const isEditing = Boolean(item);
  els.dialogTitle.textContent = isEditing ? "編輯記錄" : "快速記帳";
  els.entryId.value = item?.id || "";
  els.amountInput.value = draft ? String(draft.amount) : item ? String(Math.round(item.originalAmount || item.amount)) : "";
  els.noteInput.value = draft?.note || item?.note || "";
  els.dateInput.value = toLocalInputValue(draft?.date ? new Date(draft.date) : item ? new Date(item.date) : new Date());
  setEntryType(draft?.isIncome ? "income" : item?.isIncome ? "income" : "expense");
  hydrateCategoryOptions(entryType());
  els.categoryInput.value = draft?.category || item?.category || defaultCategoryId(entryType());
  els.deleteEntry.hidden = !isEditing;
  updateEntryTravelUI(item);
  els.dialog.showModal();
  setTimeout(() => els.amountInput.focus(), 50);
}

function closeDialog() {
  els.dialog.close();
  els.entryForm.reset();
}

function saveEntry(event) {
  event.preventDefault();
  const amount = Number(els.amountInput.value.replace(/,/g, ""));
  if (!Number.isFinite(amount) || amount <= 0) {
    els.amountInput.focus();
    return;
  }

  const id = els.entryId.value || makeId();
  const existing = state.expenses.find((item) => item.id === id);
  const travel = travelPayloadForEntry(amount, existing);
  const next = {
    id,
    amount: travel?.amountTwd ?? amount,
    category: els.categoryInput.value,
    note: els.noteInput.value.trim(),
    date: new Date(els.dateInput.value).toISOString(),
    isIncome: entryType() === "income",
    updatedAt: Date.now()
  };
  if (travel) {
    next.currency = travel.currency;
    next.originalAmount = amount;
    next.travelSessionId = travel.travelSessionId;
  }

  const index = state.expenses.findIndex((item) => item.id === id);
  if (index >= 0) {
    state.expenses[index] = next;
  } else {
    state.expenses.unshift(next);
  }

  persist();
  upsertCloudExpense(next);
  closeDialog();
  render();
}

function deleteEntry() {
  const id = els.entryId.value;
  if (!id) return;
  const ok = window.confirm("刪除此筆記錄？");
  if (!ok) return;
  state.expenses = state.expenses.filter((item) => item.id !== id);
  persist();
  deleteCloudExpense(id);
  closeDialog();
  render();
}

function hydrateCategoryOptions(type) {
  els.categoryInput.innerHTML = categories
    .filter((category) => category.type === type)
    .map((category) => `<option value="${category.id}">${category.emoji} ${category.name}</option>`)
    .join("");
}

function inferCategoryFromNote() {
  const text = els.noteInput.value.trim().toLowerCase();
  if (!text) return;
  const type = entryType();
  const matched = categories.find((category) =>
    category.type === type && category.keywords.some((keyword) => text.includes(keyword.toLowerCase()))
  );
  if (matched) els.categoryInput.value = matched.id;
}

function entryType() {
  return document.querySelector("input[name='entryType']:checked").value;
}

function setEntryType(type) {
  document.querySelector(`input[name='entryType'][value='${type}']`).checked = true;
}

function defaultCategoryId(type) {
  return type === "income" ? "salary" : "food";
}

function setupVoiceUI() {
  const supported = Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);
  if (!els.voiceButton) return;
  els.voiceButton.disabled = !supported;
  if (!supported) {
    els.voiceStatus.textContent = "此瀏覽器不支援即時語音，可直接貼文字解析";
  }
}

function toggleVoiceInput() {
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!Recognition) {
    window.alert("此瀏覽器不支援即時語音辨識，請改用文字解析。");
    return;
  }

  if (speechRecognition) {
    speechRecognition.stop();
    speechRecognition = null;
    els.voiceButton.textContent = "開始語音";
    els.voiceStatus.textContent = "已停止聽寫";
    return;
  }

  speechRecognition = new Recognition();
  speechRecognition.lang = "zh-TW";
  speechRecognition.interimResults = true;
  speechRecognition.continuous = false;
  els.voiceButton.textContent = "停止語音";
  els.voiceStatus.textContent = "正在聽寫...";

  speechRecognition.onresult = (event) => {
    const text = Array.from(event.results).map((result) => result[0]?.transcript || "").join("");
    els.voiceText.value = text.trim();
    if (event.results[event.results.length - 1]?.isFinal) {
      els.voiceStatus.textContent = "聽寫完成，可解析成記帳";
    }
  };
  speechRecognition.onerror = () => {
    els.voiceStatus.textContent = "語音辨識失敗，請改用文字解析";
  };
  speechRecognition.onend = () => {
    speechRecognition = null;
    els.voiceButton.textContent = "開始語音";
  };
  speechRecognition.start();
}

function parseVoiceDraft() {
  const text = els.voiceText.value.trim();
  const draft = parseVoiceText(text);
  if (!draft) {
    window.alert("請輸入像「午餐 120 元」或「薪資 30000」這樣的內容。");
    return;
  }
  state.currentTab = "home";
  renderTabs();
  openEntryDialog("", draft);
}

function parseVoiceText(text) {
  if (!text) return null;
  const amountMatch = text.match(/(?:NT\$|NTD|TWD|\$|＄)?\s*(\d+(?:[,.]\d+)?)\s*(?:元|塊|块|日圓|円|美金|美元|dollars?|yen)?/i);
  if (!amountMatch) return null;
  const amount = Number(amountMatch[1].replace(/,/g, ""));
  if (!Number.isFinite(amount) || amount <= 0) return null;

  const lowered = text.toLowerCase();
  const matchedCategory = categories.find((category) =>
    category.keywords.some((keyword) => lowered.includes(keyword.toLowerCase())) || lowered.includes(category.name.toLowerCase())
  );
  const incomeHint = /(收入|薪水|薪資|入帳|獎金|兼職|打工|投資|利息|股利|salary|bonus|income)/i.test(text);
  const isIncome = matchedCategory ? matchedCategory.type === "income" : incomeHint;
  const note = text
    .replace(amountMatch[0], "")
    .replace(/^(我|幫我|記一下|記帳|新增|花了|支出|收入)\s*/g, "")
    .trim() || (matchedCategory?.name || (isIncome ? "收入" : "支出"));

  return {
    amount,
    category: matchedCategory?.type === (isIncome ? "income" : "expense") ? matchedCategory.id : defaultCategoryId(isIncome ? "income" : "expense"),
    note,
    date: new Date().toISOString(),
    isIncome
  };
}

function updateTravelStatus() {
  if (!els.travelRateStatus) return;
  const currency = findCurrency(state.settings.travelCurrency);
  if (!state.settings.travelEnabled) {
    els.travelRateStatus.textContent = "以台幣記帳";
    return;
  }
  els.travelRateStatus.textContent = `${currency.flag} ${currency.code} 記帳，1 ${currency.code} ≈ NT$${formatRateValue(rateToTwd(currency.code))}`;
}

async function fetchTravelRate() {
  const code = state.settings.travelCurrency;
  if (code === "TWD") {
    state.settings.travelRateToTwd = 1;
    persistSettings();
    updateToolsUI();
    return;
  }
  if (els.travelRateStatus) els.travelRateStatus.textContent = "更新匯率中...";
  try {
    const response = await fetch(`https://open.er-api.com/v6/latest/${encodeURIComponent(code)}`);
    if (!response.ok) throw new Error("rate fetch failed");
    const data = await response.json();
    const rate = Number(data.rates?.TWD);
    if (!Number.isFinite(rate) || rate <= 0) throw new Error("missing TWD rate");
    state.settings.travelRateToTwd = rate;
    state.settings.travelRateUpdatedAt = new Date().toISOString();
  } catch {
    state.settings.travelRateToTwd = fallbackRatesToTwd[code] || 1;
    state.settings.travelRateUpdatedAt = new Date().toISOString();
  }
  persistSettings();
  updateToolsUI();
}

function updateConverter() {
  if (!els.converterResult) return;
  const amount = Number((els.converterAmount?.value || "0").replace(/,/g, ""));
  const from = els.converterFrom?.value || "JPY";
  const to = els.converterTo?.value || "TWD";
  state.settings.converterAmount = Number.isFinite(amount) ? amount : 0;
  state.settings.converterFrom = from;
  state.settings.converterTo = to;
  persistSettings();
  const converted = convertCurrency(state.settings.converterAmount, from, to);
  els.converterResult.textContent = `${formatForeign(converted, to)} ${to}`;
  if (els.converterStatus) els.converterStatus.textContent = `1 ${from} ≈ ${formatRateValue(convertCurrency(1, from, to))} ${to}`;
}

function updateReminderUI() {
  if (!els.reminderStatus) return;
  if (els.reminderEnabled) els.reminderEnabled.checked = state.settings.reminderEnabled;
  if (els.reminderTime) els.reminderTime.value = state.settings.reminderTime;
  const permission = "Notification" in window ? Notification.permission : "unsupported";
  els.reminderStatus.textContent = state.settings.reminderEnabled
    ? `${state.settings.reminderTime} 提醒，通知權限：${permission}`
    : "提醒已關閉";
}

async function requestNotificationPermission() {
  if (!("Notification" in window)) {
    window.alert("此瀏覽器不支援通知。");
    return;
  }
  await Notification.requestPermission();
  updateReminderUI();
}

function startReminderChecker() {
  if (reminderTimer) clearInterval(reminderTimer);
  checkReminder();
  reminderTimer = setInterval(checkReminder, 60_000);
}

function checkReminder() {
  if (!state.settings.reminderEnabled) return;
  const now = new Date();
  const today = dateStamp();
  const current = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  if (current < state.settings.reminderTime || state.settings.lastReminderDate === today) return;
  state.settings.lastReminderDate = today;
  persistSettings();
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification("i 記帳提醒", { body: "今天的收支記一下，之後的你會感謝現在的你。" });
  }
}

function updateEntryTravelUI(existing = null) {
  if (!els.amountLabel || !els.travelEstimate) return;
  const isExpense = entryType() === "expense";
  const currency = existing?.currency || (state.settings.travelEnabled && isExpense ? state.settings.travelCurrency : "TWD");
  const isTravel = isExpense && currency && currency !== "TWD";
  els.amountLabel.textContent = isTravel ? `金額 (${currency})` : "金額";
  const amount = Number((els.amountInput.value || "0").replace(/,/g, ""));
  if (isTravel && Number.isFinite(amount) && amount > 0) {
    els.travelEstimate.hidden = false;
    els.travelEstimate.textContent = `約 ${formatCurrency(amount * rateToTwd(currency))}`;
  } else {
    els.travelEstimate.hidden = true;
  }
}

function travelPayloadForEntry(inputAmount, existing = null) {
  if (entryType() !== "expense") return null;
  const currency = existing?.currency && existing.currency !== "TWD"
    ? existing.currency
    : state.settings.travelEnabled
      ? state.settings.travelCurrency
      : "TWD";
  if (!currency || currency === "TWD") return null;
  return {
    currency,
    amountTwd: inputAmount * rateToTwd(currency),
    travelSessionId: existing?.travelSessionId || state.settings.travelSessionId || makeId()
  };
}

function findCurrency(code) {
  return travelCurrencies.find((currency) => currency.code === code) || travelCurrencies[0];
}

function rateToTwd(code) {
  if (code === state.settings.travelCurrency && Number(state.settings.travelRateToTwd) > 0) {
    return Number(state.settings.travelRateToTwd);
  }
  return fallbackRatesToTwd[code] || 1;
}

function convertCurrency(amount, from, to) {
  return (amount * rateToTwd(from)) / rateToTwd(to);
}

function currentMonthItems() {
  return state.expenses.filter((item) => sameMonth(new Date(item.date), state.selectedMonth));
}

function categoryTotals(items) {
  return items.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + Number(item.amount || 0);
    return acc;
  }, {});
}

function dailyTotals(items) {
  const map = new Map();
  items.forEach((item) => {
    const date = new Date(item.date);
    const key = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    const current = map.get(key) || { date, amount: 0, count: 0 };
    current.amount += Number(item.amount || 0);
    current.count += 1;
    map.set(key, current);
  });

  return Array.from(map.values())
    .sort((a, b) => a.date - b.date)
    .map((item) => ({
      ...item,
      label: new Intl.DateTimeFormat("zh-TW", { month: "numeric", day: "numeric" }).format(item.date)
    }));
}

function sixMonthAverageExpense() {
  let total = 0;
  let months = 0;
  for (let i = 1; i <= 6; i += 1) {
    const month = addMonths(state.selectedMonth, -i);
    const monthTotal = sum(state.expenses.filter((item) => !item.isIncome && sameMonth(new Date(item.date), month)));
    total += monthTotal;
    months += 1;
  }
  return months ? total / months : 0;
}

function sum(items) {
  return items.reduce((total, item) => total + Number(item.amount || 0), 0);
}

function findCategory(id) {
  return categories.find((category) => category.id === id) || categories.find((category) => category.id === "other");
}

function normalizeCategory(value) {
  return categories.find((category) => category.id === value || category.name === value)?.id || "other";
}

function makeId() {
  return crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function addMonths(date, value) {
  return new Date(date.getFullYear(), date.getMonth() + value, 1);
}

function sameMonth(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}

function formatMonth(date) {
  return new Intl.DateTimeFormat("zh-TW", { year: "numeric", month: "long" }).format(date);
}

function formatDateTime(value) {
  return new Intl.DateTimeFormat("zh-TW", {
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}

function formatCurrency(value) {
  return new Intl.NumberFormat("zh-TW", {
    style: "currency",
    currency: "TWD",
    maximumFractionDigits: 0
  }).format(value || 0);
}

function formatForeign(value, code) {
  const noDecimal = ["JPY", "KRW", "VND", "IDR", "TWD"];
  return new Intl.NumberFormat("zh-TW", {
    maximumFractionDigits: noDecimal.includes(code) ? 0 : 2,
    minimumFractionDigits: 0
  }).format(value || 0);
}

function formatRateValue(value) {
  const numeric = Number(value || 0);
  return new Intl.NumberFormat("zh-TW", {
    maximumFractionDigits: numeric > 0 && numeric < 1 ? 4 : 2,
    minimumFractionDigits: 0
  }).format(numeric);
}

function formatEntryAmount(item) {
  const prefix = item.isIncome ? "+" : "";
  if (!item.isIncome && item.currency && item.currency !== "TWD" && Number(item.originalAmount) > 0) {
    return `${prefix}${formatCurrency(item.amount)}<small>${escapeHtml(item.currency)} ${formatForeign(item.originalAmount, item.currency)}</small>`;
  }
  return `${prefix}${formatCurrency(item.amount)}`;
}

function toLocalInputValue(date) {
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 16);
}

function hexToSoft(hex) {
  const value = hex.replace("#", "");
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  return `rgb(${r} ${g} ${b} / 14%)`;
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}

function normalizeTheme(theme) {
  return backgroundStyles.some((style) => style.id === theme) ? theme : "pink";
}

function normalizeAppIcon(icon) {
  return appIconOptions.some((option) => option.id === icon) ? icon : "default";
}

function loadSettings() {
  const defaults = {
    theme: "pink",
    appIcon: "default",
    travelEnabled: false,
    travelCurrency: "JPY",
    travelRateToTwd: fallbackRatesToTwd.JPY,
    travelRateUpdatedAt: "",
    travelSessionId: "",
    converterAmount: 1000,
    converterFrom: "JPY",
    converterTo: "TWD",
    reminderEnabled: false,
    reminderTime: "21:00",
    lastReminderDate: ""
  };
  try {
    return { ...defaults, ...JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}") };
  } catch {
    return defaults;
  }
}

function persistSettings() {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(state.settings));
}

function loadExpenses() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.map(normalizeStoredExpense) : [];
  } catch {
    return [];
  }
}

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.expenses));
}

function replaceExpenses(expenses) {
  state.expenses = expenses.map(normalizeStoredExpense).sort((a, b) => new Date(b.date) - new Date(a.date));
  persist();
  render();
}

function normalizeStoredExpense(item) {
  const normalized = {
    id: item.id || makeId(),
    amount: Number(item.amount || 0),
    category: normalizeCategory(item.category),
    note: String(item.note || ""),
    date: parseExpenseDate(item.date || Date.now()).toISOString(),
    isIncome: Boolean(item.isIncome),
    updatedAt: Number(item.updatedAt || 0) || Date.now()
  };
  if (item.currency) normalized.currency = String(item.currency);
  if (Number.isFinite(Number(item.originalAmount))) normalized.originalAmount = Number(item.originalAmount);
  if (item.travelSessionId) normalized.travelSessionId = String(item.travelSessionId);
  return normalized;
}

function exportJson() {
  const payload = {
    app: "i 記帳 PWA",
    version: 1,
    exportedAt: new Date().toISOString(),
    expenses: state.expenses
  };
  download(`i-expense-backup-${dateStamp()}.json`, JSON.stringify(payload, null, 2), "application/json");
}

function exportCsv() {
  const rows = [
    ["date", "type", "category", "amount", "note"],
    ...state.expenses.map((item) => [
      item.date,
      item.isIncome ? "income" : "expense",
      findCategory(item.category).name,
      item.amount,
      item.note || ""
    ])
  ];
  const csv = rows.map((row) => row.map(csvCell).join(",")).join("\n");
  download(`i-expense-${dateStamp()}.csv`, csv, "text/csv;charset=utf-8");
}

function importJson(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      importJsonText(String(reader.result));
    } catch {
      window.alert("匯入失敗，檔案格式不正確。");
    } finally {
      event.target.value = "";
    }
  };
  reader.readAsText(file);
}

async function importJsonFromClipboard() {
  try {
    const text = await navigator.clipboard.readText();
    importJsonText(text);
  } catch {
    window.alert("無法讀取剪貼簿，請改用 JSON 檔案匯入。");
  }
}

function importJsonText(text) {
  const parsed = JSON.parse(text);
  const imported = Array.isArray(parsed) ? parsed : parsed.expenses;
  if (!Array.isArray(imported)) throw new Error("Invalid backup");
  const normalized = imported
    .filter((item) => item && Number(item.amount) > 0 && item.date)
    .map((item) => ({
      id: item.id || makeId(),
      amount: Number(item.amount),
      category: normalizeCategory(item.category),
      note: String(item.note || ""),
      date: parseExpenseDate(item.date).toISOString(),
      isIncome: Boolean(item.isIncome),
      currency: item.currency ? String(item.currency) : undefined,
      originalAmount: Number.isFinite(Number(item.originalAmount)) ? Number(item.originalAmount) : undefined,
      travelSessionId: item.travelSessionId ? String(item.travelSessionId) : undefined,
      updatedAt: Number(item.updatedAt || 0) || Date.now()
    }));
  state.expenses = mergeExpenses(state.expenses, normalized);
  persist();
  syncAllToCloud();
  render();
}

function mergeExpenses(current, imported) {
  const byId = new Map(current.map((item) => [item.id, normalizeStoredExpense(item)]));
  imported.forEach((item) => {
    const normalized = normalizeStoredExpense(item);
    const existing = byId.get(normalized.id);
    if (!existing || normalized.updatedAt >= existing.updatedAt) {
      byId.set(normalized.id, normalized);
    }
  });
  return Array.from(byId.values()).sort((a, b) => new Date(b.date) - new Date(a.date));
}

function parseExpenseDate(value) {
  if (typeof value === "number") {
    if (value > 1_000_000_000_000) return safeDate(value);
    if (value > 1_000_000_000) return safeDate(value * 1000);
    return safeDate((value * 1000) + APPLE_REFERENCE_OFFSET_MS);
  }
  return safeDate(value);
}

function safeDate(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? new Date() : date;
}

function clearData() {
  const ok = window.confirm("清除所有記帳資料？");
  if (!ok) return;
  state.expenses = [];
  persist();
  clearCloudExpenses();
  render();
}

async function initFirebaseSync() {
  if (!firebaseIsConfigured) {
    state.syncStatus = "請先填寫 firebase-config.js";
    updateSyncUI();
    return;
  }

  try {
    state.syncStatus = "載入 Firebase...";
    updateSyncUI();

    const [appModule, authModule, firestoreModule] = await Promise.all([
      import(`https://www.gstatic.com/firebasejs/${FIREBASE_SDK_VERSION}/firebase-app.js`),
      import(`https://www.gstatic.com/firebasejs/${FIREBASE_SDK_VERSION}/firebase-auth.js`),
      import(`https://www.gstatic.com/firebasejs/${FIREBASE_SDK_VERSION}/firebase-firestore.js`)
    ]);

    const app = appModule.initializeApp(firebaseConfig);
    cloud.auth = authModule.getAuth(app);
    cloud.db = firestoreModule.getFirestore(app);
    cloud.provider = new authModule.GoogleAuthProvider();
    cloud.modules = { authModule, firestoreModule };
    cloud.ready = true;

    await authModule.getRedirectResult(cloud.auth).catch(() => null);

    authModule.onAuthStateChanged(cloud.auth, async (user) => {
      if (!user) {
        state.user = null;
        state.authLabel = "本機";
        state.syncStatus = "未登入，資料只存在此裝置";
        if (cloud.unsubscribe) cloud.unsubscribe();
        cloud.unsubscribe = null;
        updateSyncUI();
        return;
      }

      state.user = user;
      state.authLabel = user.displayName || user.email || "已登入";
      state.syncStatus = "合併雲端資料...";
      updateSyncUI();
      await mergeRemoteAndLocal();
      subscribeRemoteExpenses();
      state.syncStatus = "雲端同步中";
      updateSyncUI();
    });
  } catch (error) {
    state.syncStatus = `Firebase 初始化失敗：${error.message}`;
    updateSyncUI();
  }
}

async function signInWithGoogle() {
  if (!cloud.ready) {
    window.alert("Firebase 尚未設定。請先在 firebase-config.js 填入專案設定。");
    return;
  }
  try {
    state.syncStatus = "開啟 Google 登入...";
    updateSyncUI();
    await cloud.modules.authModule.signInWithPopup(cloud.auth, cloud.provider);
  } catch {
    await cloud.modules.authModule.signInWithRedirect(cloud.auth, cloud.provider);
  }
}

async function signOutFromCloud() {
  if (!cloud.ready) return;
  await cloud.modules.authModule.signOut(cloud.auth);
}

async function mergeRemoteAndLocal() {
  if (!state.user) return;
  const remote = await readRemoteExpenses();
  const merged = mergeExpenses(state.expenses, remote);
  replaceExpenses(merged);
  await writeAllRemote(merged);
}

async function readRemoteExpenses() {
  const { collection, getDocs } = cloud.modules.firestoreModule;
  const snapshot = await getDocs(collection(cloud.db, "users", state.user.uid, "expenses"));
  return snapshot.docs.map((docSnap) => normalizeStoredExpense({ id: docSnap.id, ...docSnap.data() }));
}

function subscribeRemoteExpenses() {
  if (!state.user) return;
  if (cloud.unsubscribe) cloud.unsubscribe();
  const { collection, onSnapshot } = cloud.modules.firestoreModule;
  cloud.unsubscribe = onSnapshot(
    collection(cloud.db, "users", state.user.uid, "expenses"),
    (snapshot) => {
      if (cloud.syncing) return;
      replaceExpenses(snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() })));
      state.syncStatus = `已同步 ${state.expenses.length} 筆`;
      updateSyncUI();
    },
    (error) => {
      state.syncStatus = `同步失敗：${error.message}`;
      updateSyncUI();
    }
  );
}

async function syncAllToCloud() {
  if (!state.user) return;
  state.syncStatus = "上傳本機資料...";
  updateSyncUI();
  await writeAllRemote(state.expenses);
  state.syncStatus = `已同步 ${state.expenses.length} 筆`;
  updateSyncUI();
}

async function writeAllRemote(expenses) {
  if (!state.user) return;
  const { writeBatch, doc } = cloud.modules.firestoreModule;
  const batch = writeBatch(cloud.db);
  expenses.map(normalizeStoredExpense).forEach((expense) => {
    batch.set(doc(cloud.db, "users", state.user.uid, "expenses", expense.id), expense);
  });
  cloud.syncing = true;
  try {
    await batch.commit();
  } finally {
    cloud.syncing = false;
  }
}

async function upsertCloudExpense(expense) {
  if (!state.user) return;
  const { doc, setDoc } = cloud.modules.firestoreModule;
  cloud.syncing = true;
  try {
    await setDoc(doc(cloud.db, "users", state.user.uid, "expenses", expense.id), normalizeStoredExpense(expense));
    state.syncStatus = "已同步";
  } catch (error) {
    state.syncStatus = `同步失敗：${error.message}`;
  } finally {
    cloud.syncing = false;
    updateSyncUI();
  }
}

async function deleteCloudExpense(id) {
  if (!state.user) return;
  const { doc, deleteDoc } = cloud.modules.firestoreModule;
  await deleteDoc(doc(cloud.db, "users", state.user.uid, "expenses", id)).catch((error) => {
    state.syncStatus = `刪除雲端資料失敗：${error.message}`;
    updateSyncUI();
  });
}

async function clearCloudExpenses() {
  if (!state.user) return;
  const remote = await readRemoteExpenses();
  const { writeBatch, doc } = cloud.modules.firestoreModule;
  const batch = writeBatch(cloud.db);
  remote.forEach((expense) => {
    batch.delete(doc(cloud.db, "users", state.user.uid, "expenses", expense.id));
  });
  await batch.commit().catch((error) => {
    state.syncStatus = `清除雲端資料失敗：${error.message}`;
    updateSyncUI();
  });
}

function updateSyncUI() {
  if (els.authStatus) els.authStatus.textContent = state.authLabel;
  if (els.syncStatus) els.syncStatus.textContent = state.syncStatus;
  if (els.signInButton) {
    els.signInButton.disabled = !firebaseIsConfigured || Boolean(state.user);
    els.signInButton.hidden = Boolean(state.user);
  }
  if (els.signOutButton) els.signOutButton.hidden = !state.user;
  if (els.syncNowButton) els.syncNowButton.disabled = !state.user;
}

function download(filename, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function csvCell(value) {
  const text = String(value ?? "");
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function dateStamp() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}
