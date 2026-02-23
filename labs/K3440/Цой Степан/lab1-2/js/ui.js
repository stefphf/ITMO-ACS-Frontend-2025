// ===== ДЗ3: ТЁМНАЯ ТЕМА =====
// Работает на всех страницах где есть кнопка #themeBtn

const themeBtn = document.getElementById('themeBtn');

if (themeBtn) {
  // Восстанавливаем сохранённую тему при загрузке страницы
  if (localStorage.getItem('theme') === 'dark') {
    document.body.setAttribute('data-theme', 'dark');
    themeBtn.textContent = '☀️';
  }

  themeBtn.addEventListener('click', function () {
    if (document.body.getAttribute('data-theme') === 'dark') {
      document.body.removeAttribute('data-theme');
      themeBtn.textContent = '🌙';
      localStorage.setItem('theme', 'light');
    } else {
      document.body.setAttribute('data-theme', 'dark');
      themeBtn.textContent = '☀️';
      localStorage.setItem('theme', 'dark');
    }
  });
}

// ===== ЛР2: ЗАГРУЗКА РЕЦЕПТОВ (главная страница) =====

const recipesGrid = document.getElementById('recipesGrid');

if (recipesGrid) {
  function renderRecipes(recipes) {
    if (!recipes.length) {
      recipesGrid.innerHTML = '<div class="col-12"><p class="text-muted">Рецепты не найдены.</p></div>';
      return;
    }
    recipesGrid.innerHTML = recipes.map(recipe => `
      <div class="col-md-4">
        <div class="card h-100">
          <img src="${recipe.image}" class="card-img-top" alt="${recipe.title}" />
          <div class="card-body">
            <h2 class="card-title h5">${recipe.title}</h2>
            <p class="card-text">${recipe.description}</p>
            <a href="recipe.html?id=${recipe.id}" class="btn btn-primary">Открыть</a>
          </div>
        </div>
      </div>
    `).join('');
  }

  // Загружаем рецепты при открытии страницы
  axios.get('http://localhost:3000/recipes')
    .then(res => renderRecipes(res.data))
    .catch(() => {
      recipesGrid.innerHTML = '<div class="col-12"><div class="alert alert-warning">Не удалось загрузить рецепты. Запущен ли json-server?</div></div>';
    });

  // Кнопка "Применить" в модале фильтров
  const applyFilterBtn = document.getElementById('applyFilterBtn');
  if (applyFilterBtn) {
    applyFilterBtn.addEventListener('click', function () {
      const type = document.getElementById('filterType').value;
      const diff = document.getElementById('filterDiff').value;

      const params = {};
      if (type) params.type = type;
      if (diff) params.difficulty = diff;

      axios.get('http://localhost:3000/recipes', { params })
        .then(res => renderRecipes(res.data))
        .catch(err => console.error(err));
    });
  }
}

// ===== ЛР2: АВТОРИЗАЦИЯ — ВХОД =====

const loginForm = document.getElementById('loginForm');

if (loginForm) {
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorEl = document.getElementById('loginError');

    axios.get('http://localhost:3000/users')
      .then(res => {
        const user = res.data.find(u => u.email === email && u.password === password);
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          window.location.href = 'profile.html';
        } else {
          errorEl.textContent = 'Неверный email или пароль';
          errorEl.classList.remove('d-none');
        }
      })
      .catch(() => {
        errorEl.textContent = 'Ошибка соединения с сервером';
        errorEl.classList.remove('d-none');
      });
  });
}

// ===== ЛР2: РЕГИСТРАЦИЯ =====

const registerForm = document.getElementById('registerForm');

if (registerForm) {
  registerForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name     = document.getElementById('name').value;
    const email    = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const password2 = document.getElementById('regPassword2').value;
    const errorEl  = document.getElementById('registerError');

    if (password !== password2) {
      errorEl.textContent = 'Пароли не совпадают';
      errorEl.classList.remove('d-none');
      return;
    }

    axios.post('http://localhost:3000/users', { name, email, password })
      .then(() => {
        window.location.href = 'login.html';
      })
      .catch(() => {
        errorEl.textContent = 'Ошибка при регистрации';
        errorEl.classList.remove('d-none');
      });
  });
}

// ===== ПРОФИЛЬ: имя из localStorage =====

const profileName = document.getElementById('profileName');
if (profileName) {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) profileName.textContent = user.name;
}

// ===== ЛР2: СТРАНИЦА РЕЦЕПТА =====

const recipeTitle = document.getElementById('recipeTitle');

if (recipeTitle) {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if (id) {
    axios.get(`http://localhost:3000/recipes/${id}`)
      .then(res => {
        const recipe = res.data;
        document.getElementById('recipeTitle').textContent = recipe.title;
        const img = document.getElementById('recipeImage');
        img.src = recipe.image;
        img.alt = recipe.title; // ДЗ2: alt из данных API
      })
      .catch(err => console.error(err));
  }

  // Кнопка лайка (ДЗ2: aria-pressed)
  const likeBtn = document.getElementById('likeBtn');
  if (likeBtn) {
    likeBtn.addEventListener('click', function () {
      const liked = this.getAttribute('aria-pressed') === 'true';
      this.setAttribute('aria-pressed', !liked);
      this.classList.toggle('btn-danger');
      this.classList.toggle('btn-outline-danger');
    });
  }

  // Кнопка подписки (ДЗ2: aria-pressed)
  const subscribeBtn = document.getElementById('subscribeBtn');
  if (subscribeBtn) {
    subscribeBtn.addEventListener('click', function () {
      const subscribed = this.getAttribute('aria-pressed') === 'true';
      this.setAttribute('aria-pressed', !subscribed);
      this.textContent = subscribed ? 'Подписаться' : 'Отписаться';
      this.classList.toggle('btn-primary');
      this.classList.toggle('btn-outline-primary');
    });
  }

  // Добавление комментария
  const submitComment = document.getElementById('submitComment');
  if (submitComment) {
    submitComment.addEventListener('click', function () {
      const text = document.getElementById('commentText').value.trim();
      if (!text) return;

      const user = JSON.parse(localStorage.getItem('user'));
      const author = user ? user.name : 'Гость';

      const div = document.createElement('div');
      div.className = 'card mb-3';
      div.innerHTML = `<div class="card-body"><strong>${author}</strong><p class="mb-0">${text}</p></div>`;
      document.getElementById('commentsList').appendChild(div);
      document.getElementById('commentText').value = '';
    });
  }
}
