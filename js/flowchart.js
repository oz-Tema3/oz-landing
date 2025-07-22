document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".buttons button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const answer = btn.dataset.answer;
      const step = parseInt(btn.dataset.step);

      if (step === 1) {
        document.getElementById("step1").classList.add("hidden");
        if (answer === "yes") {
          document.getElementById("step2yes").classList.remove("hidden");
        } else {
          document.getElementById("step2no").classList.remove("hidden");
        }
      } else if (step === 2) {
        document.getElementById("step2yes").classList.add("hidden");
        document.getElementById("step2no").classList.add("hidden");
        document.getElementById("step3").classList.remove("hidden");
      }
    });
  });
});
