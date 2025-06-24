// Helper function for Ukrainian grammatical forms
function getUkrainianForm(number, one, few, many) {
  // Special case for numbers ending in 11, 12, 13, 14
  if (number % 100 >= 11 && number % 100 <= 14) {
    return many;
  }
  
  const lastDigit = number % 10;
  
  if (lastDigit === 1) {
    return one;
  } else if (lastDigit >= 2 && lastDigit <= 4) {
    return few;
  } else {
    return many;
  }
}

function updateCountdown() {
  const now = new Date();
  const target = new Date("2025-07-12T00:00:00");
//   const target = new Date("2025-06-24T20:54:30");

  const diff = target - now;

  const timerEl = document.getElementById("timer");
  const beepEl = document.getElementById("beep");

  if (diff <= 0) {
    beepEl.play();
    timerEl.innerHTML = "<div class='completion-message'>Завтра ми зустрінемось сонечко ❤!</div>";
    startConfetti();
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  const daysText = getUkrainianForm(days, "день", "дні", "днів");
  const hoursText = getUkrainianForm(hours, "година", "години", "годин");
  const minutesText = getUkrainianForm(minutes, "хвилина", "хвилини", "хвилин");
  const secondsText = getUkrainianForm(seconds, "секунда", "секунди", "секунд");

  timerEl.innerHTML = `
    <div class="time-container">
      <div class="time-unit">
        <span class="time-value">${days}</span>
        <span class="time-label">${daysText}</span>
      </div>
      <div class="time-unit">
        <span class="time-value">${hours}</span>
        <span class="time-label">${hoursText}</span>
      </div>
      <div class="time-unit">
        <span class="time-value">${minutes}</span>
        <span class="time-label">${minutesText}</span>
      </div>
      <div class="time-unit">
        <span class="time-value">${seconds}</span>
        <span class="time-label">${secondsText}</span>
      </div>
    </div>
  `;

  requestAnimationFrame(updateCountdown);
}

// Confetti animation
function startConfetti() {
  const canvas = document.getElementById('confetti');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const pieces = [];
  const numberOfPieces = 200;
  const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', 
                   '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50'];
  
  for (let i = 0; i < numberOfPieces; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: -20,
      rotation: Math.random() * 360,
      size: Math.random() * 10 + 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: Math.random() * 5 + 2
    });
  }
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    pieces.forEach(piece => {
      ctx.save();
      ctx.translate(piece.x, piece.y);
      ctx.rotate(piece.rotation * Math.PI / 180);
      ctx.fillStyle = piece.color;
      ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size);
      ctx.restore();
      
      piece.y += piece.speed;
      piece.rotation += 2;
      
      if (piece.y > canvas.height) {
        piece.y = -20;
        piece.x = Math.random() * canvas.width;
      }
    });
    
    requestAnimationFrame(animate);
  }
  
  animate();
}

// Add interactive effect for envelope
document.addEventListener('DOMContentLoaded', function() {
  updateCountdown();
  
  const envelope = document.querySelector('.envelope');
  if (envelope) {
    envelope.addEventListener('mouseenter', function() {
      this.classList.add('hover');
    });
    
    envelope.addEventListener('mouseleave', function() {
      this.classList.remove('hover');
    });
  }
});
