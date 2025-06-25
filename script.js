/**
 * Countdown and Gift Application
 * Organization:
 * 1. Constants and Configuration
 * 2. Language Utilities
 * 3. State Management Variables
 * 4. Compliment System
 * 5. Countdown Timer
 * 6. Visual Effects
 * 7. Event Handlers and Initialization
 */

// =============================================
// 1. CONSTANTS AND CONFIGURATION
// =============================================
const CONFIG = {
  targetDate: "2025-07-12T00:00:00", // Target date for countdown
  // targetDate: "2025-06-24T20:54:30", // Test date (commented out)
  complimentShowTime: 10000, // Time to show compliment (ms)
  complimentButtonShowTime: 30000, // Time to show compliment button (ms)
  initialButtonDelay: 3000, // Initial delay before showing button (ms)
  complimentFadeTime: 300, // Fade time for compliment (ms)
  confettiPieces: 200 // Number of confetti pieces
};

// =============================================
// 2. LANGUAGE UTILITIES
// =============================================
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

// =============================================
// 3. STATE MANAGEMENT VARIABLES
// =============================================
let complimentTimer = null;
let complimentButtonTimer = null;
let lastMinute = -1;
let isComplimentShowing = false; // Flag to track if compliment is currently showing

// =============================================
// 4. COMPLIMENT SYSTEM
// =============================================
const compliments = [
  "Яруся ти - киця ❤️", "Яруся ти - сонечко ❤️", "Яруся ти - квіточка ❤️", "Яруся ти - кицюня ❤️", "Яруся ти - піцюлька ❤️",
  "Яруся ти - зайченя ❤️", "Яруся ти - рибонька ❤️", "Яруся ти - ластівочка ❤️", "Яруся ти - зірочка ❤️", "Яруся ти - перлинка ❤️",
  "Яруся ти - цукерочка ❤️", "Яруся ти - малятко ❤️", "Яруся ти - кошеня ❤️", "Яруся ти - принцеса ❤️", "Яруся ти - королева ❤️",
  "Яруся ти - чарівниця ❤️", "Яруся ти - ягідка ❤️", "Яруся ти - бусінка ❤️", "Яруся ти - мишка ❤️", "Яруся ти - пташечка ❤️",
  "Яруся ти - лапочка ❤️", "Яруся ти - зайка ❤️", "Яруся ти - котеня ❤️", "Яруся ти - лапуська ❤️", "Яруся ти - пупсик ❤️",
  "Яруся ти - пупсеня ❤️", "Яруся ти - муркотик ❤️", "Яруся ти - золотце ❤️", "Яруся ти - солодусік ❤️", "Яруся ти - солодулька ❤️", 
  "Яруся ти - солодюля ❤️", "Яруся ти - солодюсічка ❤️", "Яруся ти - лисичка ❤️", "Яруся ти - тигреня ❤️", "Яруся ти - пандочка ❤️", 
  "Яруся ти - білочка ❤️", "Яруся ти - вишенька ❤️", "Яруся ти - краля ❤️", "Яруся ти - красуня ❤️", "Яруся ти - ідеальна ❤️",
  "Яруся ти - чарівна ❤️", "Яруся ти - неповторна ❤️", "Яруся ти - зваблива ❤️", "Яруся ти - досконала ❤️", "Яруся ти - бездоганна ❤️",
  "Яруся ти - сексуальна ❤️", "Яруся ти - неймовірна ❤️", "Яруся ти - найкраща ❤️", "Яруся ти - кохана ❤️", "Яруся ти - ніжна ❤️",
  "Яруся ти - чуйна ❤️", "Яруся ти - жіночна ❤️", "Яруся ти - дивовижна ❤️", "Яруся ти - фантастична ❤️", "Яруся ти - сонце ❤️",
  "Яруся ти - зіронька ❤️", "Яруся ти - сніжинка ❤️", "Яруся ти - ангелятко ❤️", "Яруся ти - фея ❤️", "Яруся ти - скарб ❤️", 
  "Яруся ти - крихітка ❤️", "Яруся ти - карапузик ❤️", "Яруся ти - лапуня ❤️", "Яруся ти - серденько ❤️", "Яруся ти - пуся ❤️", 
  "Яруся ти - пуська ❤️", "Яруся ти - буся ❤️", "Яруся ти - мила ❤️", "Яруся ти - чудова ❤️", "Яруся ти - розумничка ❤️", 
  "Яруся ти - рідненька ❤️", "Яруся ти - пухнастик ❤️", "Яруся ти - гарненька ❤️", "Яруся ти - стильна ❤️", "Яруся ти - елегантна ❤️", 
  "Яруся ти - витончена ❤️", "Яруся ти - вишукана ❤️", "Яруся ти - ефектна ❤️", "Яруся ти - блискуча ❤️", "Яруся ти - яскрава ❤️", 
  "Яруся ти - харизматична ❤️", "Яруся ти - інтригуюча ❤️", "Яруся ти - спокуслива ❤️", "Яруся ти - божественна ❤️", 
  "Яруся ти - невимовна ❤️", "Яруся ти - унікальна ❤️", "Яруся ти - енергійна ❤️"
];

function showComplimentButton() {
  // Don't show button if compliment is currently displayed
  if (isComplimentShowing) {
    return;
  }
  
  const complimentButton = document.getElementById('compliment-button');
  if (complimentButton) {
    complimentButton.classList.remove('hidden');
    
    // Auto-hide button after configured time
    if (complimentButtonTimer) {
      clearTimeout(complimentButtonTimer);
    }
    
    complimentButtonTimer = setTimeout(() => {
      hideComplimentButton();
    }, CONFIG.complimentButtonShowTime);
  } else {
    console.error('Compliment button not found!');
  }
}

function hideComplimentButton() {
  const complimentButton = document.getElementById('compliment-button');
  if (complimentButton) {
    complimentButton.classList.add('hidden');
  }
  
  if (complimentButtonTimer) {
    clearTimeout(complimentButtonTimer);
    complimentButtonTimer = null;
  }
}

function showRandomCompliment() {
  // Update UI state
  const complimentButton = document.getElementById('compliment-button');
  complimentButton.classList.add('inactive');

  const envelope = document.querySelector('.envelope');
  envelope.classList.add('inactive');
  
  isComplimentShowing = true;

  // Show random compliment
  const complimentDisplay = document.getElementById('compliment-display');
  const complimentText = document.getElementById('compliment-text');
  const randomIndex = Math.floor(Math.random() * compliments.length);

  complimentText.textContent = compliments[randomIndex];
  complimentDisplay.classList.remove('hidden');
  complimentDisplay.classList.add('active');

  // Set auto-hide timer
  if (complimentTimer) {
    clearTimeout(complimentTimer);
  }

  complimentTimer = setTimeout(() => {
    hideCompliment();
  }, CONFIG.complimentShowTime);
}

function hideCompliment() {
  const complimentDisplay = document.getElementById('compliment-display');
  complimentDisplay.classList.add('fade-out');

  setTimeout(() => {
    // Reset UI state
    complimentDisplay.classList.add('hidden');
    complimentDisplay.classList.remove('fade-out');
    complimentDisplay.classList.remove('active');

    const complimentButton = document.getElementById('compliment-button');
    complimentButton.classList.remove('inactive');

    const envelope = document.querySelector('.envelope');
    envelope.classList.remove('inactive');

    isComplimentShowing = false;
  }, CONFIG.complimentFadeTime);

  if (complimentTimer) {
    clearTimeout(complimentTimer);
    complimentTimer = null;
  }
}

function checkForMinuteChange(minutes) {
  if (lastMinute === -1) {
    lastMinute = minutes;
    // Show button immediately on first load for testing
    showComplimentButton();
  } else if (minutes !== lastMinute) {
    lastMinute = minutes;
    // Show the button on minute change
    showComplimentButton();
  }
}

// =============================================
// 5. COUNTDOWN TIMER
// =============================================
function updateCountdown() {
  const now = new Date();
  const target = new Date(CONFIG.targetDate);
  const diff = target - now;

  const timerEl = document.getElementById("timer");
  const beepEl = document.getElementById("beep");

  // Check if countdown is complete
  if (diff <= 0) {
    beepEl.play();
    timerEl.innerHTML = "<div class='completion-message'>Завтра ми зустрінемось сонечко ❤!</div>";
    startConfetti();
    return;
  }

  // Calculate time units
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  // Check for minute change to show compliment button
  checkForMinuteChange(minutes);

  // Get grammatical forms
  const daysText = getUkrainianForm(days, "день", "дні", "днів");
  const hoursText = getUkrainianForm(hours, "година", "години", "годин");
  const minutesText = getUkrainianForm(minutes, "хвилина", "хвилини", "хвилин");
  const secondsText = getUkrainianForm(seconds, "секунда", "секунди", "секунд");

  // Update timer display
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

// =============================================
// 6. VISUAL EFFECTS
// =============================================
function startConfetti() {
  const canvas = document.getElementById('confetti');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const pieces = [];
  const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', 
                   '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50'];
  
  // Initialize confetti pieces
  for (let i = 0; i < CONFIG.confettiPieces; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: -20,
      rotation: Math.random() * 360,
      size: Math.random() * 10 + 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: Math.random() * 5 + 2
    });
  }
  
  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    pieces.forEach(piece => {
      ctx.save();
      ctx.translate(piece.x, piece.y);
      ctx.rotate(piece.rotation * Math.PI / 180);
      ctx.fillStyle = piece.color;
      ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size);
      ctx.restore();
      
      // Update piece position
      piece.y += piece.speed;
      piece.rotation += 2;
      
      // Reset if offscreen
      if (piece.y > canvas.height) {
        piece.y = -20;
        piece.x = Math.random() * canvas.width;
      }
    });
    
    requestAnimationFrame(animate);
  }
  
  animate();
}

// =============================================
// 7. EVENT HANDLERS AND INITIALIZATION
// =============================================
document.addEventListener('DOMContentLoaded', function() {
  // Start countdown
  updateCountdown();
  
  // Set up envelope interactions
  const envelope = document.querySelector('.envelope');
  if (envelope) {
    envelope.addEventListener('mouseenter', function() {
      this.classList.add('hover');
    });
    
    envelope.addEventListener('mouseleave', function() {
      this.classList.remove('hover');
    });
  }
  
  // Set up button handlers
  const complimentButton = document.getElementById('compliment-button');
  if (complimentButton) {
    complimentButton.addEventListener('click', showRandomCompliment);
  }
  
  const closeButton = document.getElementById('close-compliment');
  if (closeButton) {
    closeButton.addEventListener('click', hideCompliment);
  }
  
  // Show compliment button after initial delay
  setTimeout(() => {
    showComplimentButton();
  }, CONFIG.initialButtonDelay);
});
