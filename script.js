const cat = document.getElementById("cat");
const scoreText = document.getElementById("score");
const cpsText = document.getElementById("cps");
const bestText = document.getElementById("best");
const resetButton = document.getElementById("reset");

let score = 0;
let clickTimes = [];
let best = Number(localStorage.getItem("popcat-best") || 0);
let closeTimer;

bestText.textContent = best.toLocaleString();

cat.addEventListener("click", () => {
  score += 1;
  scoreText.textContent = score.toLocaleString();

  if (score > best) {
    best = score;
    bestText.textContent = best.toLocaleString();
    localStorage.setItem("popcat-best", String(best));
  }

  const now = Date.now();
  clickTimes.push(now);
  clickTimes = clickTimes.filter((time) => now - time < 1000);
  cpsText.textContent = clickTimes.length.toFixed(1);

  cat.classList.add("is-open");
  clearTimeout(closeTimer);
  closeTimer = setTimeout(() => cat.classList.remove("is-open"), 120);
});

resetButton.addEventListener("click", () => {
  score = 0;
  clickTimes = [];
  scoreText.textContent = "0";
  cpsText.textContent = "0.0";
  cat.classList.remove("is-open");
});

setInterval(() => {
  const now = Date.now();
  clickTimes = clickTimes.filter((time) => now - time < 1000);
  cpsText.textContent = clickTimes.length.toFixed(1);
}, 200);
