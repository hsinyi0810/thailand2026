/* ============================
   Hero Slideshow
   ============================ */
(function() {
  const slides = document.querySelectorAll('.hero-slide');
  const dotsContainer = document.getElementById('heroSlideDots');
  let current = 0;

  // Create dots
  slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'slide-dot' + (i === 0 ? ' active' : '');
    dot.onclick = () => goTo(i);
    dotsContainer.appendChild(dot);
  });

  function goTo(n) {
    slides[current].classList.remove('active');
    dotsContainer.children[current].classList.remove('active');
    current = (n + slides.length) % slides.length;
    slides[current].classList.add('active');
    dotsContainer.children[current].classList.add('active');
  }

  setInterval(() => goTo(current + 1), 5000);
})();

/* ============================
   Countdown Timer
   ============================ */
(function() {
  const target = new Date('2026-07-21T05:00:00+08:00');
  const el = document.getElementById('heroCountdown');
  if (!el) return;

  function update() {
    const now = new Date();
    const diff = target - now;
    if (diff <= 0) {
      el.innerHTML = '<div style="font-size:1.1rem;font-weight:700;color:#E8A020;">🎉 出發囉！泰國，我們來了！</div>';
      return;
    }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    el.innerHTML = `
      <div class="countdown-unit"><span class="countdown-num">${d}</span><div class="countdown-label">天</div></div>
      <div class="countdown-unit"><span class="countdown-num">${String(h).padStart(2,'0')}</span><div class="countdown-label">時</div></div>
      <div class="countdown-unit"><span class="countdown-num">${String(m).padStart(2,'0')}</span><div class="countdown-label">分</div></div>
      <div class="countdown-unit"><span class="countdown-num">${String(s).padStart(2,'0')}</span><div class="countdown-label">秒</div></div>
    `;
  }
  update();
  setInterval(update, 1000);
})();

/* ============================
   Tab Navigation
   ============================ */
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
    if (btn.dataset.tab === 'weather') loadWeather();
  });
});

/* ============================
   Weather
   ============================ */
const TRIP_DATES = ['7/21', '7/22', '7/23', '7/24', '7/25', '7/26'];
const TRIP_DAYS  = ['二', '三', '四', '五', '六', '日'];

// Bangkok weather simulation for July 2026 (real-world typical values)
const WEATHER_DATA = [
  { date: '7/21', day: '二', icon: '⛅', desc: '多雲午後雷陣雨', max: 34, min: 27, rain: '60%', humid: '82%' },
  { date: '7/22', day: '三', icon: '🌦️', desc: '間歇陣雨', max: 33, min: 27, rain: '70%', humid: '85%' },
  { date: '7/23', day: '四', icon: '🌤️', desc: '晴時多雲', max: 35, min: 28, rain: '40%', humid: '78%' },
  { date: '7/24', day: '五', icon: '⛅', desc: '多雲有陣雨', max: 33, min: 27, rain: '65%', humid: '83%' },
  { date: '7/25', day: '六', icon: '🌧️', desc: '陣雨頻繁', max: 32, min: 26, rain: '75%', humid: '87%' },
  { date: '7/26', day: '日', icon: '🌤️', desc: '多雲晴朗', max: 34, min: 27, rain: '35%', humid: '79%' },
];

let weatherLoaded = false;

function loadWeather() {
  if (weatherLoaded) return;
  weatherLoaded = true;

  const container = document.getElementById('weatherForecast');
  setTimeout(() => {
    container.innerHTML = `
      <h3 style="font-weight:700;margin-bottom:16px;font-size:1rem;">
        🗓️ 旅遊期間天氣預報（曼谷 / 華欣）
        <span style="font-size:0.75rem;color:#888;font-weight:400;margin-left:8px;">7月份預估資料</span>
      </h3>
      <div class="weather-days">
        ${WEATHER_DATA.map(d => `
          <div class="weather-day-card">
            <div class="wday-date">7/${d.date.split('/')[1]}（${d.day}）</div>
            <div class="wday-icon">${d.icon}</div>
            <div class="wday-desc">${d.desc}</div>
            <div class="wday-temp">
              <span class="max">${d.max}°</span> / <span class="min">${d.min}°</span>
            </div>
            <div style="font-size:0.75rem;color:#888;margin-top:4px;">🌧 ${d.rain} · 💧${d.humid}</div>
          </div>
        `).join('')}
      </div>
    `;
  }, 800);
}

/* ============================
   Todo List
   ============================ */
const CATEGORY_ICONS = {
  document: '📄',
  luggage:  '🧳',
  money:    '💰',
  health:   '💊',
  tech:     '📱',
  clothing: '👕',
  other:    '📦',
};

const CATEGORY_LABELS = {
  document: '證件',
  luggage:  '行李',
  money:    '金錢',
  health:   '健康',
  tech:     '3C',
  clothing: '衣物',
  other:    '其他',
};

const DEFAULT_TODOS = [
  // 證件
  { id: 1,  text: '護照（確認效期超過 6 個月）',       cat: 'document', done: false },
  { id: 2,  text: '護照影本（另外放一份備用）',         cat: 'document', done: false },
  { id: 3,  text: '身分證',                            cat: 'document', done: false },
  { id: 4,  text: '泰國電子簽證 / 確認免簽資格',       cat: 'document', done: false },
  { id: 5,  text: '旅遊行程表（紙本 + 電子版）',       cat: 'document', done: false },
  { id: 6,  text: '保險文件（旅遊平安險）',             cat: 'document', done: false },
  { id: 7,  text: '役男出境核准章確認',                cat: 'document', done: false },
  // 金錢
  { id: 8,  text: '泰銖現金（每人至少 20,000 泰銖）', cat: 'money',    done: false },
  { id: 9,  text: '台幣備用金',                        cat: 'money',    done: false },
  { id: 10, text: '信用卡（Visa / Master）',           cat: 'money',    done: false },
  { id: 11, text: '確認信用卡海外手續費設定',          cat: 'money',    done: false },
  // 行李
  { id: 12, text: '行李箱（不超過 23 公斤）',          cat: 'luggage',  done: false },
  { id: 13, text: '隨身包包 / 後背包',                 cat: 'luggage',  done: false },
  { id: 14, text: '行李秤',                            cat: 'luggage',  done: false },
  { id: 15, text: '購物袋（泰國不提供塑膠袋）',        cat: 'luggage',  done: false },
  { id: 16, text: '雨傘 / 雨衣',                      cat: 'luggage',  done: false },
  { id: 17, text: '防水袋',                            cat: 'luggage',  done: false },
  // 衣物
  { id: 18, text: '輕薄透氣衣物（5–6 套）',            cat: 'clothing', done: false },
  { id: 19, text: '泳衣（水上樂園用）',                cat: 'clothing', done: false },
  { id: 20, text: '寺廟參觀用長褲 / 長裙',             cat: 'clothing', done: false },
  { id: 21, text: '運動鞋 / 防水鞋',                   cat: 'clothing', done: false },
  { id: 22, text: '拖鞋（飯店 / 海灘用）',             cat: 'clothing', done: false },
  { id: 23, text: '帽子 / 遮陽配件',                   cat: 'clothing', done: false },
  // 健康
  { id: 24, text: '防曬乳（SPF 50+）',                 cat: 'health',   done: false },
  { id: 25, text: '防蚊液',                            cat: 'health',   done: false },
  { id: 26, text: '腸胃藥 / 止瀉藥',                   cat: 'health',   done: false },
  { id: 27, text: '感冒藥 / 退燒藥',                   cat: 'health',   done: false },
  { id: 28, text: '暈車藥',                            cat: 'health',   done: false },
  { id: 29, text: 'OK 繃 / 消毒藥水',                  cat: 'health',   done: false },
  { id: 30, text: '牙刷 / 牙膏（飯店不提供）',         cat: 'health',   done: false },
  { id: 31, text: '刮鬍刀 / 個人盥洗用品',             cat: 'health',   done: false },
  // 3C
  { id: 32, text: '手機充電器',                        cat: 'tech',     done: false },
  { id: 33, text: '行動電源（100Wh 以下）',             cat: 'tech',     done: false },
  { id: 34, text: '泰國 5G SIM 卡（旅行社贈送確認）', cat: 'tech',     done: false },
  { id: 35, text: '萬用轉接頭（220V）',                cat: 'tech',     done: false },
  { id: 36, text: '相機 / 備用記憶卡',                 cat: 'tech',     done: false },
  { id: 37, text: '耳機',                              cat: 'tech',     done: false },
];

let todos = [];
let currentFilter = 'all';
let nextId = 100;

function loadTodos() {
  try {
    const saved = localStorage.getItem('thailand2026_todos');
    if (saved) {
      todos = JSON.parse(saved);
      nextId = Math.max(...todos.map(t => t.id), 99) + 1;
    } else {
      todos = JSON.parse(JSON.stringify(DEFAULT_TODOS));
    }
  } catch(e) {
    todos = JSON.parse(JSON.stringify(DEFAULT_TODOS));
  }
}

function saveTodos() {
  localStorage.setItem('thailand2026_todos', JSON.stringify(todos));
}

function renderTodos() {
  const list = document.getElementById('todoList');
  const filtered = todos.filter(t => {
    if (currentFilter === 'pending') return !t.done;
    if (currentFilter === 'done')    return t.done;
    return true;
  });

  if (filtered.length === 0) {
    list.innerHTML = '<div style="text-align:center;color:#aaa;padding:32px;">沒有項目</div>';
    updateStats();
    return;
  }

  // Group by category
  const groups = {};
  filtered.forEach(t => {
    if (!groups[t.cat]) groups[t.cat] = [];
    groups[t.cat].push(t);
  });

  const catOrder = ['document', 'money', 'luggage', 'clothing', 'health', 'tech', 'other'];

  let html = '';
  catOrder.forEach(cat => {
    if (!groups[cat]) return;
    const icon = CATEGORY_ICONS[cat];
    const label = CATEGORY_LABELS[cat];
    html += `<div class="todo-category-header">${icon} ${label}</div>`;
    groups[cat].forEach(t => {
      html += `
        <div class="todo-item ${t.done ? 'done' : ''}" data-id="${t.id}">
          <div class="todo-checkbox ${t.done ? 'checked' : ''}" onclick="toggleTodo(${t.id})"></div>
          <span class="todo-cat-icon">${CATEGORY_ICONS[t.cat]}</span>
          <span class="todo-text">${escapeHtml(t.text)}</span>
          <button class="todo-delete" onclick="deleteTodo(${t.id})" title="刪除">✕</button>
        </div>
      `;
    });
  });

  list.innerHTML = html;
  updateStats();
}

function updateStats() {
  const done = todos.filter(t => t.done).length;
  const total = todos.length;
  document.getElementById('statDone').textContent = done;
  document.getElementById('statTotal').textContent = total;
  const pct = total ? (done / total * 100) : 0;
  document.getElementById('progressFill').style.width = pct + '%';
}

function toggleTodo(id) {
  const t = todos.find(t => t.id === id);
  if (t) { t.done = !t.done; saveTodos(); renderTodos(); }
}

function deleteTodo(id) {
  todos = todos.filter(t => t.id !== id);
  saveTodos();
  renderTodos();
}

function addTodo() {
  const input = document.getElementById('newTodoInput');
  const cat = document.getElementById('newTodoCategory').value;
  const text = input.value.trim();
  if (!text) { input.focus(); return; }
  todos.push({ id: nextId++, text, cat, done: false });
  saveTodos();
  renderTodos();
  input.value = '';
  input.focus();
}

function filterTodos(mode) {
  currentFilter = mode;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.filter-btn').forEach(b => {
    if (b.textContent.includes(mode === 'all' ? '全部' : mode === 'pending' ? '未完成' : '已完成'))
      b.classList.add('active');
  });
  renderTodos();
}

document.getElementById('newTodoInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') addTodo();
});

function escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

/* ============================
   Init
   ============================ */
loadTodos();
renderTodos();
