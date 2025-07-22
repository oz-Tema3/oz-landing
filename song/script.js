document.addEventListener("DOMContentLoaded", () => {
  // --- 데이터 정의 ---
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

  const gitErrors = [
    {
      keywords: ["not a git repository"],
      title: "fatal: not a git repository (or any of the parent directories)",
      cause:
        "Git 명령어를 Git 저장소가 아닌 곳에서 실행했습니다. 폴더를 잘못 찾아 들어갔거나, 아직 `git init`을 하지 않은 상태입니다.",
      solution:
        "1. 올바른 프로젝트 폴더로 이동했는지 확인하세요.\n2. 아직 Git 저장소를 만들지 않았다면 아래 명령어를 실행하세요:\n<pre><code>git init</code></pre>",
    },
    {
      keywords: ["remote origin already exists"],
      title: "fatal: remote origin already exists.",
      cause:
        "이미 'origin'이라는 이름의 원격 저장소가 연결되어 있는데, 또 추가하려고 할 때 발생합니다.",
      solution:
        "기존 연결을 확인하고, 이름을 바꾸거나 삭제 후 다시 시도하세요.\n1. 연결된 원격 저장소 확인:\n<pre><code>git remote -v</code></pre>\n2. 기존 origin 연결 삭제:\n<pre><code>git remote rm origin</code></pre>",
    },
    {
      keywords: ["failed to push some refs"],
      title: "error: failed to push some refs to '...' ",
      cause:
        "원격 저장소에는 있지만 내 로컬 저장소에는 없는 변경사항(커밋)이 있을 때 발생합니다. 다른 사람이 내가 작업하는 동안 새로운 내용을 푸시한 경우입니다.",
      solution:
        "푸시하기 전에 원격 저장소의 최신 내용을 먼저 가져와야 합니다. 아래 명령어로 원격 저장소의 변경사항을 받아온 후 다시 푸시하세요:\n<pre><code>git pull origin [브랜치 이름]</code></pre>",
    },
    {
      keywords: ["does not match any"],
      title: "error: src refspec [브랜치명] does not match any.",
      cause:
        "로컬 저장소에 존재하지 않는 브랜치를 푸시하려고 할 때, 또는 저장소에 아직 아무런 커밋이 없을 때 발생합니다.",
      solution:
        '1. 브랜치 이름이 정확한지 확인하세요.\n2. 만약 첫 커밋이라면, 파일을 먼저 커밋해야 합니다:\n<pre><code>git add .\ngit commit -m "Initial commit"</code></pre>',
    },
    {
      keywords: ["pull is not possible because you have unmerged files"],
      title: "error: pulling is not possible because you have unmerged files.",
      cause:
        "이전에 `git pull`이나 `git merge`를 하다가 충돌(conflict)이 발생했고, 아직 해결되지 않은 상태에서 다시 pull을 시도할 때 발생합니다.",
      solution:
        "충돌이 발생한 파일들을 먼저 해결하고 커밋해야 합니다.\n1. `git status` 명령어로 충돌난 파일들을 확인하세요.\n2. 해당 파일들을 열어 충돌 부분을 수정한 뒤, 다시 add/commit 하세요.\n<pre><code>git add [충돌 해결한 파일]\ngit commit</code></pre>",
    },
  ];

  // --- DOM 요소 선택 ---
  const commandGrid = document.getElementById("commandGrid");
  const searchInput = document.getElementById("searchInput");
  const categoryList = document.getElementById("categoryList");
  const errorSearchInput = document.getElementById("errorSearchInput");
  const errorResultContainer = document.getElementById("errorResultContainer");

  // --- 함수 정의 ---

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

  // 오류 해결책을 화면에 표시하는 함수
  function displayErrorSolutions(solutions) {
    errorResultContainer.innerHTML = "";
    if (solutions.length === 0) {
      errorResultContainer.innerHTML =
        "<p>일치하는 오류 정보를 찾을 수 없습니다.</p>";
      return;
    }
    solutions.forEach((err) => {
      const card = document.createElement("div");
      card.className = "error-solution-card";
      card.innerHTML = `
        <h3>${err.title}</h3>
        <h4>원인</h4>
        <p>${err.cause.replace(/\n/g, "<br>")}</p>
        <h4>해결책</h4>
        <div>${err.solution.replace(/\n/g, "<br>")}</div>
      `;
      errorResultContainer.appendChild(card);
    });
  }

  // --- 이벤트 리스너 설정 ---

  // 명령어 검색 기능
  searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredCommands = gitCommands.filter(
      (cmd) =>
        cmd.command.toLowerCase().includes(searchTerm) ||
        cmd.description.toLowerCase().includes(searchTerm)
    );
    displayCommands(filteredCommands);
  });

  // 카테고리 필터링 기능
  categoryList.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
      document.querySelectorAll("#categoryList li").forEach((li) => {
        li.classList.remove("active");
      });
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

  // 오류 검색 기능
  errorSearchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    if (searchTerm.trim() === "") {
      errorResultContainer.innerHTML = "";
      return;
    }
    const filteredErrors = gitErrors.filter((err) =>
      err.keywords.some((keyword) => searchTerm.includes(keyword))
    );
    displayErrorSolutions(filteredErrors);
  });

  // --- 초기 로드 ---
  displayCommands(gitCommands);
});
