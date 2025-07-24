document.addEventListener("DOMContentLoaded", () => {
  // FAQ 아코디언 기능
  const faqQuestions = document.querySelectorAll(".faq-question");

  faqQuestions.forEach((question) => {
    question.addEventListener("click", () => {
      const faqItem = question.closest(".faq-item");
      faqItem.classList.toggle("active"); // active 클래스 토글
    });
  });

  // 스크롤 시 헤더 배경 변경 (선택 사항)
  const header = document.querySelector(".header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.style.backgroundColor = "rgba(44, 47, 51, 0.9)"; // 스크롤 시 약간 투명하게
    } else {
      header.style.backgroundColor = "var(--background-dark)"; // 원본 색상
    }
  });

  // 부드러운 스크롤 (네비게이션 링크 클릭 시)
  document.querySelectorAll("nav a").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
});
