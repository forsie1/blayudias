const app = document.getElementById('app');
let current = 0;

// --- Переходы ---
function go(index) {
  current = index;
  app.style.transform = `translateX(-${index * 100}vw)`;
}

// Fake FaceID
setTimeout(() => go(1), 2200);

// --- SWIPE ---
let startX = 0;
document.addEventListener('touchstart', e => { startX = e.touches[0].clientX; });
document.addEventListener('touchend', e => {
  let endX = e.changedTouches[0].clientX;
  let diff = endX - startX;
  if (Math.abs(diff) > 60) {
    if (diff < 0 && current < 4) go(current + 1);
    if (diff > 0 && current > 0) go(current - 1);
  }
});

// --- QR flip ---
function flipQR() {
  const qr = document.querySelector('.qr-card');
  qr.classList.add('flipped');
  setTimeout(() => {
    alert("Помилка перевірки QR\nДокумент недійсний");
    qr.classList.remove('flipped');
  }, 600);
}

// --- ДОБАВЛЕНИЕ ПОЛЕЙ ---
function addField() {
  const fields = document.getElementById("fields");
  const input = document.createElement("input");
  input.placeholder = "Нове поле";
  fields.appendChild(input);
}

// --- ЗАГРУЗКА ФОТО ---
function loadPhoto(event) {
  const preview = document.getElementById("photoPreview");
  preview.innerHTML = "";
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const img = document.createElement("img");
    img.src = e.target.result;
    preview.appendChild(img);
  }
  reader.readAsDataURL(file);
}

// --- ПОДПИСЬ ---
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth - 48;
canvas.height = 260;
let draw = false;

canvas.addEventListener("touchstart", () => draw = true);
canvas.addEventListener("touchend", () => { draw = false; ctx.beginPath(); });
canvas.addEventListener("touchmove", e => {
  if (!draw) return;
  const t = e.touches[0];
  ctx.lineWidth = 3;
  ctx.lineCap = "round";
  ctx.lineTo(t.clientX - 24, t.clientY - canvas.offsetTop);
  ctx.stroke();
});

function saveSignature() {
  const dataURL = canvas.toDataURL();
  alert("Підпис збережено (демо)");
  const img = document.createElement("img");
  img.src = dataURL;
  document.getElementById("photoPreview").appendChild(img);
  go(2);
}
