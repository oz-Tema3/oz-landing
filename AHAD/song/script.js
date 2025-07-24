document.addEventListener("DOMContentLoaded", () => {
  // --- 데이터 정의 ---
  const defaultChallenges = [
    {
      id: 1,
      icon: "💧",
      title: "물 2L 마시기",
      gives: { water: 2, fertilizer: 0 },
    },
    {
      id: 2,
      icon: "📖",
      title: "책 15분 읽기",
      gives: { water: 0, fertilizer: 1 },
    },
    {
      id: 3,
      icon: "🏃",
      title: "30분 산책하기",
      gives: { water: 1, fertilizer: 1 },
    },
    {
      id: 4,
      icon: "✍️",
      title: "감사일기 쓰기",
      gives: { water: 0, fertilizer: 1 },
    },
    {
      id: 5,
      icon: "☀️",
      title: "기상 후 스트레칭",
      gives: { water: 1, fertilizer: 0 },
    },
    {
      id: 6,
      icon: "🥗",
      title: "샐러드 먹기",
      gives: { water: 1, fertilizer: 0 },
    },
  ];

  const masterPlantList = [
    { id: 1, type: "tree", name: "사과나무", icon: "🌳" },
    { id: 2, type: "tree", name: "소나무", icon: "🌲" },
    { id: 3, type: "tree", name: "야자수", icon: "🌴" },
    { id: 31, type: "flower", name: "해바라기", icon: "🌻" },
    { id: 32, type: "flower", name: "장미", icon: "🌹" },
    { id: 33, type: "flower", name: "튤립", icon: "🌷" },
    { id: 60, type: "flower", name: "벚꽃", icon: "🌸" },
  ];

  const MAX_GROWTH_LEVEL = 10;

  // --- 사용자 데이터 관리 ---
  let userData = {
    water: 10,
    fertilizer: 5,
    myChallengeIds: [1, 2, 3],
    successDates: {}, // { '2025-07-24': [1, 3] }
    currentPlant: { name: "새싹", icon: "🌱", level: 0 },
    unlockedPlants: [], // [1, 32, ...]
    customChallenges: [], // 사용자가 추가한 챌린지
  };

  function getCombinedChallenges() {
    return [...defaultChallenges, ...userData.customChallenges];
  }

  function loadData() {
    const savedData = localStorage.getItem("plantAppData");
    if (savedData) {
      // 저장된 데이터와 기본 데이터 구조를 합쳐서 최신 상태 유지
      const parsedData = JSON.parse(savedData);
      userData = { ...userData, ...parsedData };
    }
  }

  function saveData() {
    localStorage.setItem("plantAppData", JSON.stringify(userData));
  }

  // --- DOM 요소 ---
  const views = document.querySelectorAll(".view");
  const navButtons = document.querySelectorAll(".nav-button");
  const addChallengeForm = document.getElementById("add-challenge-form");

  // --- 화면 전환 로직 ---
  function switchView(targetId) {
    views.forEach((view) => view.classList.remove("active"));
    navButtons.forEach((button) => button.classList.remove("active"));
    document.getElementById(targetId).classList.add("active");
    document
      .querySelector(`.nav-button[data-target="${targetId}"]`)
      .classList.add("active");
  }

  // --- 렌더링 함수 ---
  function renderAll() {
    const activeView = document.querySelector(".view.active").id;
    if (activeView === "home-view") renderHome();
    if (activeView === "explore-challenges") renderExploreChallenges();
    if (activeView === "collection-view") renderCollection();
    if (activeView === "calendar-view") renderCalendarView();
  }

  function renderHome() {
    // ... (이전과 동일, 변경 없음)
    const waterCountEl = document.getElementById("water-count");
    const fertilizerCountEl = document.getElementById("fertilizer-count");
    waterCountEl.textContent = userData.water;
    fertilizerCountEl.textContent = userData.fertilizer;
    document.getElementById("give-water-btn").disabled = userData.water <= 0;
    document.getElementById("give-fertilizer-btn").disabled =
      userData.fertilizer <= 0;

    const { name, icon, level } = userData.currentPlant;
    document.getElementById("plant-display").textContent = icon;
    document.getElementById("plant-name").textContent = name;
    document.getElementById("plant-progress").style.width = `${
      (level / MAX_GROWTH_LEVEL) * 100
    }%`;

    renderMyChallengesOnHome();
  }

  function renderMyChallengesOnHome() {
    const listEl = document.getElementById("my-challenges-list");
    listEl.innerHTML = "";
    const allChallenges = getCombinedChallenges();
    const myChallenges = allChallenges.filter((c) =>
      userData.myChallengeIds.includes(c.id)
    );
    const today = new Date().toISOString().slice(0, 10);
    const todaySuccessIds = userData.successDates[today] || [];

    if (myChallenges.length === 0) {
      listEl.innerHTML =
        '<p class="placeholder-text">참여중인 챌린지가 없어요.</p>';
      return;
    }

    myChallenges.forEach((challenge) => {
      const isDone = todaySuccessIds.includes(challenge.id);
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
                <div class="card-icon">${challenge.icon}</div>
                <div class="card-content"><h3>${challenge.title}</h3></div>
                <button class="btn ${
                  isDone ? "btn-secondary" : "btn-primary"
                } success-btn" 
                        data-id="${challenge.id}" ${isDone ? "disabled" : ""}>
                    ${isDone ? "완료" : "성공!"}
                </button>
            `;
      listEl.appendChild(card);
    });
  }

  function renderExploreChallenges() {
    const grid = document.getElementById("explore-challenges-grid");
    grid.innerHTML = "";
    getCombinedChallenges().forEach((challenge) => {
      const card = document.createElement("div");
      card.className = "card";
      const isJoined = userData.myChallengeIds.includes(challenge.id);
      card.innerHTML = `
                <div class="card-icon">${challenge.icon}</div>
                <div class="card-content">
                    <h3>${challenge.title}</h3>
                    <p>물 ${challenge.gives.water || 0}개, 비료 ${
        challenge.gives.fertilizer || 0
      }개</p>
                </div>
                <button class="btn ${
                  isJoined ? "btn-secondary" : "btn-primary"
                } join-btn" data-id="${challenge.id}">
                    ${isJoined ? "참여중" : "참여하기"}
                </button>
            `;
      grid.appendChild(card);
    });
  }

  function renderCollection() {
    // ... (이전과 동일, 변경 없음)
    const grid = document.getElementById("collection-grid");
    grid.innerHTML = "";
    masterPlantList.forEach((plant) => {
      const isUnlocked = userData.unlockedPlants.includes(plant.id);
      const item = document.createElement("div");
      item.className = `collection-item ${isUnlocked ? "unlocked" : ""}`;
      item.innerHTML = `
                <div class="icon">${plant.icon}</div>
                <div class="name">${isUnlocked ? plant.name : "???"}</div>
            `;
      grid.appendChild(item);
    });
  }

  function renderCalendarView() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();

    document.getElementById("calendar-title").textContent = `${
      month + 1
    }월의 기록 📅`;
    const datesContainer = document.getElementById("calendar-dates");
    datesContainer.innerHTML = "";

    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
      datesContainer.appendChild(document.createElement("div"));
    }

    for (let date = 1; date <= lastDate; date++) {
      const dateEl = document.createElement("div");
      dateEl.textContent = date;
      const dateString = `${year}-${String(month + 1).padStart(
        2,
        "0"
      )}-${String(date).padStart(2, "0")}`;

      if (
        date === now.getDate() &&
        month === now.getMonth() &&
        year === now.getFullYear()
      ) {
        dateEl.classList.add("today");
      }
      if (
        userData.successDates[dateString] &&
        userData.successDates[dateString].length > 0
      ) {
        dateEl.classList.add("success");
      }
      datesContainer.appendChild(dateEl);
    }
  }

  // --- 핵심 로직 함수 ---
  // growPlant(), unlockNewPlant() 함수는 이전과 동일, 변경 없음
  function growPlant(resourceType) {
    let growthAmount = 0;
    if (resourceType === "water" && userData.water > 0) {
      userData.water--;
      growthAmount = 1;
    } else if (resourceType === "fertilizer" && userData.fertilizer > 0) {
      userData.fertilizer--;
      growthAmount = 3;
    }

    if (growthAmount > 0) {
      userData.currentPlant.level += growthAmount;
      if (
        userData.currentPlant.level >= 5 &&
        userData.currentPlant.icon === "🌱"
      ) {
        userData.currentPlant.icon = "🌿";
        userData.currentPlant.name = "자라는 중";
      }
      if (userData.currentPlant.level >= MAX_GROWTH_LEVEL) {
        unlockNewPlant();
      }
    }
    saveData();
    renderHome();
  }
  function unlockNewPlant() {
    const undiscoveredPlants = masterPlantList.filter(
      (p) => !userData.unlockedPlants.includes(p.id)
    );
    if (undiscoveredPlants.length > 0) {
      const newPlant =
        undiscoveredPlants[
          Math.floor(Math.random() * undiscoveredPlants.length)
        ];
      userData.unlockedPlants.push(newPlant.id);
      alert(`축하합니다! 🎉\n새로운 식물 '${newPlant.name}'을 발견했어요!`);
    } else {
      alert("축하합니다! 모든 식물을 다 모으셨어요!");
    }
    userData.currentPlant = { name: "새싹", icon: "🌱", level: 0 };
    saveData();
  }

  // --- 이벤트 리스너 ---
  navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.dataset.target;
      switchView(targetId);
      renderAll(); // 화면 전환 시 해당 화면을 다시 그림
    });
  });

  document
    .getElementById("give-water-btn")
    .addEventListener("click", () => growPlant("water"));
  document
    .getElementById("give-fertilizer-btn")
    .addEventListener("click", () => growPlant("fertilizer"));

  addChallengeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const newChallenge = {
      id: "c" + Date.now(), // 커스텀 챌린지 ID
      icon: document.getElementById("new-challenge-icon").value || "🎯",
      title: document.getElementById("new-challenge-title").value,
      gives: {
        water:
          parseInt(document.getElementById("new-challenge-water").value) || 0,
        fertilizer:
          parseInt(document.getElementById("new-challenge-fertilizer").value) ||
          0,
      },
    };
    userData.customChallenges.push(newChallenge);
    userData.myChallengeIds.push(newChallenge.id); // 새로 만든 챌린지에 자동 참여
    saveData();
    alert("새로운 챌린지가 추가되었어요!");
    addChallengeForm.reset();
    renderExploreChallenges();
  });

  document.body.addEventListener("click", (e) => {
    if (e.target.classList.contains("success-btn")) {
      const challengeId = e.target.dataset.id.includes("c")
        ? e.target.dataset.id
        : parseInt(e.target.dataset.id, 10);
      const challenge = getCombinedChallenges().find(
        (c) => c.id === challengeId
      );
      const today = new Date().toISOString().slice(0, 10);

      if (challenge.gives.water) userData.water += challenge.gives.water;
      if (challenge.gives.fertilizer)
        userData.fertilizer += challenge.gives.fertilizer;

      if (!userData.successDates[today]) userData.successDates[today] = [];
      userData.successDates[today].push(challengeId);

      saveData();
      renderHome();
    }

    if (e.target.classList.contains("join-btn")) {
      const challengeId = e.target.dataset.id.includes("c")
        ? e.target.dataset.id
        : parseInt(e.target.dataset.id, 10);
      const isJoined = userData.myChallengeIds.includes(challengeId);

      if (isJoined) {
        userData.myChallengeIds = userData.myChallengeIds.filter(
          (id) => id !== challengeId
        );
      } else {
        userData.myChallengeIds.push(challengeId);
      }
      saveData();
      renderExploreChallenges();
    }
  });

  // --- 초기화 ---
  function initializeApp() {
    loadData();
    renderHome();
    switchView("home-view");
  }

  initializeApp();
});
