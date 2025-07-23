window.addEventListener("load", () => {
  const canvas = document.getElementById("flow-lines");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = document.querySelector("main").offsetHeight;

  const getCenter = (el) => {
    const rect = el.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2 + window.scrollY,
    };
  };

  const tool1 = document.getElementById("tool1");
  const tool2 = document.getElementById("tool2");
  const tool3 = document.getElementById("tool3");

  const pos1 = getCenter(tool1);
  const pos2 = getCenter(tool2);
  const pos3 = getCenter(tool3);

  ctx.strokeStyle = "#aaa";
  ctx.lineWidth = 2;

  ctx.beginPath();
  ctx.moveTo(pos1.x, pos1.y);
  ctx.lineTo(pos2.x, pos2.y);
  ctx.lineTo(pos3.x, pos3.y);
  ctx.stroke();
});
