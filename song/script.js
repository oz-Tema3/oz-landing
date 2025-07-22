document.addEventListener("DOMContentLoaded", () => {
  // Git 명령어 데이터
  const gitCommands = [
    {
      category: "초기 설정",
      command: 'git config --global user.name "이름"',
      description: "사용자 이름을 설정합니다.",
      example: 'git config --global user.name "Yuseop Lee"',
    },
    {
      category: "초기 설정",
      command: 'git config --global user.email "이메일"',
      description: "사용자 이메일을 설정합니다.",
      example: 'git config --global user.email "yuseop@example.com"',
    },
    {
      category: "초기 설정",
      command: "git init",
      description: "현재 디렉토리에 Git 저장소를 생성합니다.",
      example: "git init",
    },
    {
      category: "파일 관리",
      command: "git add <file>",
      description: "파일을 스테이징 영역에 추가합니다.",
      example: "git add index.html",
    },
    {
      category: "파일 관리",
      command: "git add .",
      description: "현재 디렉토리의 모든 변경 사항을 스테이징합니다.",
      example: "git add .",
    },
    {
      category: "파일 관리",
      command: 'git commit -m "메시지"',
      description: "스테이징된 파일들을 메시지와 함께 커밋합니다.",
      example: 'git commit -m "feat: Add landing page"',
    },
    {
      category: "파일 관리",
      command: "git status",
      description: "파일들의 상태를 확인합니다.",
      example: "git status",
    },
    {
      category: "되돌리기",
      command: "git reset HEAD <file>",
      description: "스테이징된 파일을 내립니다 (add 취소).",
      example: "git reset HEAD index.html",
    },
    {
      category: "되돌리기",
      command: "git checkout -- <file>",
      description: "파일의 변경 사항을 이전 커밋 상태로 되돌립니다.",
      example: "git checkout -- style.css",
    },
    {
      category: "되돌리기",
      command: "git commit --amend",
      description: "최신 커밋 메시지를 수정합니다.",
      example: "git commit --amend",
    },
    {
      category: "브랜치",
      command: "git branch",
      description: "브랜치 목록을 확인합니다.",
      example: "git branch",
    },
    {
      category: "브랜치",
      command: "git branch <name>",
      description: "새로운 브랜치를 생성합니다.",
      example: "git branch feature/login",
    },
    {
      category: "브랜치",
      command: "git checkout <name>",
      description: "해당 브랜치로 이동합니다.",
      example: "git checkout feature/login",
    },
    {
      category: "브랜치",
      command: "git merge <name>",
      description: "현재 브랜치에 다른 브랜치를 병합합니다.",
      example: "git merge feature/login",
    },
    {
      category: "원격 저장소",
      command: "git remote add origin <url>",
      description: "원격 저장소를 연결합니다.",
      example: "git remote add origin https://github.com/user/repo.git",
    },
    {
      category: "원격 저장소",
      command: "git push -u origin <branch>",
      description: "로컬 브랜치를 원격 저장소에 푸시합니다.",
      example: "git push -u origin main",
    },
    {
      category: "원격 저장소",
      command: "git pull origin <branch>",
      description: "원격 저장소의 변경 사항을 가져와 병합합니다.",
      example: "git pull origin main",
    },
    {
      category: "원격 저장소",
      command: "git clone <url>",
      description: "원격 저장소를 로컬에 복제합니다.",
      example: "git clone https://github.com/user/repo.git",
    },
  ];

  const commandGrid = document.getElementById("commandGrid");
  const searchInput = document.getElementById("searchInput");
  const categoryList = document.getElementById("categoryList");

  // 명령어 카드를 화면에 표시하는 함수
  function displayCommands(commands) {
    commandGrid.innerHTML = "";
    commands.forEach((cmd) => {
      const card = document.createElement("article");
      card.className = "command-card";
      card.innerHTML = `
                <button class="copy-btn" title="복사하기">📋</button>
                <h3>${cmd.command}</h3>
                <p>${cmd.description}</p>
                <code>${cmd.example}</code>
            `;
      commandGrid.appendChild(card);

      // 복사 버튼 이벤트 리스너 추가
      card.querySelector(".copy-btn").addEventListener("click", () => {
        navigator.clipboard
          .writeText(cmd.command)
          .then(() => {
            alert(`'${cmd.command}' 복사 완료!`);
          })
          .catch((err) => {
            console.error("복사 실패:", err);
          });
      });
    });
  }

  // 검색 기능 구현
  searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredCommands = gitCommands.filter(
      (cmd) =>
        cmd.command.toLowerCase().includes(searchTerm) ||
        cmd.description.toLowerCase().includes(searchTerm)
    );
    displayCommands(filteredCommands);
  });

  // 카테고리 필터링 기능 구현
  categoryList.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
      // 모든 li 요소에서 'active' 클래스 제거
      document.querySelectorAll("#categoryList li").forEach((li) => {
        li.classList.remove("active");
      });
      // 클릭된 li 요소에 'active' 클래스 추가
      e.target.classList.add("active");

      const category = e.target.dataset.category;
      if (category === "all") {
        displayCommands(gitCommands);
      } else {
        const filteredCommands = gitCommands.filter(
          (cmd) => cmd.category === category
        );
        displayCommands(filteredCommands);
      }
    }
  });

  // 초기 로드 시 모든 명령어 표시
  displayCommands(gitCommands);
});
