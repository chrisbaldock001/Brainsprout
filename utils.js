/* utils.js — shared across all Brainsprout pages */

// ── PLAYER NAME (localStorage) ──
const STORAGE_KEY_NAME = 'brainsprout_player_name';
const STORAGE_KEY_ROUNDS = 'brainsprout_rounds_completed';

function getPlayerName() {
  return localStorage.getItem(STORAGE_KEY_NAME) || '';
}

function setPlayerName(name) {
  localStorage.setItem(STORAGE_KEY_NAME, name);
}

function getRoundsCompleted() {
  return parseInt(localStorage.getItem(STORAGE_KEY_ROUNDS) || '0');
}

function setRoundsCompleted(n) {
  localStorage.setItem(STORAGE_KEY_ROUNDS, String(n));
}

function resetPlayer() {
  localStorage.removeItem(STORAGE_KEY_NAME);
  localStorage.removeItem(STORAGE_KEY_ROUNDS);
  localStorage.removeItem('brainsprout_snake_hi');
  window.location.href = 'index.html';
}

// ── NAVIGATION ──
function goTo(page) {
  window.location.href = page;
}

// ── CONFETTI ──
function launchConfetti(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';
  const colors = ['#FF7F6E','#4DBFB8','#FFE8A3','#C9C3E8','#B8E8C8','#FFDAB3'];
  for (let i = 0; i < 60; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = Math.random() * 100 + 'vw';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.width = (Math.random() * 8 + 6) + 'px';
    piece.style.height = (Math.random() * 8 + 6) + 'px';
    piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    piece.style.animationDuration = (Math.random() * 2 + 2) + 's';
    piece.style.animationDelay = (Math.random() * 1.5) + 's';
    container.appendChild(piece);
  }
}

// ── RESET BUTTON (injected on every page) ──
function injectResetButton() {
  const btn = document.createElement('button');
  btn.className = 'reset-btn';
  btn.title = 'Reset & go home';
  btn.innerHTML = '↺';
  btn.onclick = () => {
    if (confirm('Reset everything and go back to the start?')) resetPlayer();
  };
  document.body.appendChild(btn);
}

// Auto-inject reset button on every page except index
document.addEventListener('DOMContentLoaded', () => {
  if (!window.location.pathname.endsWith('index.html') && window.location.pathname !== '/') {
    injectResetButton();
  }
});
