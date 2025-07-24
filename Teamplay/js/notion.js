document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".feature-item");
  const detailSection = document.getElementById("feature-details");

  const defaultContent = `
    <h2>기능을 선택하면 설명이 표시됩니다</h2>
    <p>위의 핵심 기능 카드 중 하나를 클릭해주세요.</p>
  `;

  const details = {
    meeting: {
      title: "회의록 작성",
      desc: "프로젝트 논의 내용을 빠짐없이 기록해 남기세요. Notion의 페이지와 서브페이지를 활용하면 회의별로 구분해 보관할 수 있어, 언제든지 과거 기록을 찾아볼 수 있습니다.",
    },
    spec: {
      title: "요구사항 명세서 관리",
      desc: "명확한 요구사항 명세서를 작성해 프로젝트의 목표를 정의하고, 변경사항을 쉽게 추적할 수 있습니다.",
    },
    kanban: {
      title: "칸반 보드",
      desc: "업무 진행 상황을 시각적으로 확인할 수 있는 칸반 보드를 제공합니다.",
    },
    collab: {
      title: "실시간 협업 & 공유",
      desc: "페이지를 팀원과 공유해 동시에 편집하거나 댓글로 피드백을 주고받을 수 있습니다.",
    },
    template: {
      title: "템플릿 활용",
      desc: "Notion이 제공하는 다양한 템플릿으로 빠르게 문서를 구성할 수 있습니다.",
    },
  };

  // 카드 클릭 시
  cards.forEach((card) => {
    card.addEventListener("click", (e) => {
      e.stopPropagation(); // 상위 이벤트 막기
      const key = card.getAttribute("data-feature");
      detailSection.innerHTML = `
        <h2>${details[key].title}</h2>
        <p>${details[key].desc}</p>
      `;
    });
  });

  // 전체 문서 클릭 시
  document.body.addEventListener("click", (e) => {
    // feature-item, feature-details 영역 클릭 시는 무시
    if (
      e.target.closest(".feature-item") ||
      e.target.closest("#feature-details")
    ) {
      return;
    }

    // 이외 영역 클릭 시 초기화
    detailSection.innerHTML = defaultContent;
  });
});

// 📌 FAQ 아코디언
const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach((question) => {
  question.addEventListener("click", () => {
    const faqItem = question.closest(".faq-item");
    faqItem.classList.toggle("active");
  });
});
