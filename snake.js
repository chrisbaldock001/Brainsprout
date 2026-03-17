// snake.js — Snake game logic

const STORAGE_KEY_HI = 'brainsprout_snake_hi';

let snakeGame = null;

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  initSnakeCanvas();
  loadHiScore();
});

function initSnakeCanvas() {
  const wrap = document.querySelector('.canvas-wrap');
  const canvas = document.getElementById('snake-canvas');
  const size = wrap.clientWidth;
  canvas.width = size;
  canvas.height = size;
}

function loadHiScore() {
  try {
    document.getElementById('snake-hi').textContent =
      localStorage.getItem(STORAGE_KEY_HI) || 0;
  } catch (e) {}
}

function clearHighScore() {
  try { localStorage.removeItem(STORAGE_KEY_HI); } catch (e) {}
  document.getElementById('snake-hi').textContent = 0;
}

// ── CONTROLS ──
function startSnakeGame() {
  document.getElementById('snake-overlay').classList.add('hidden');
  if (snakeGame) snakeGame.stop();
  snakeGame = new SnakeGame();
  snakeGame.start();
}

function snakeDir(dir) {
  if (snakeGame) snakeGame.setDir(dir);
}

document.addEventListener('keydown', e => {
  const map = { ArrowUp: 'UP', ArrowDown: 'DOWN', ArrowLeft: 'LEFT', ArrowRight: 'RIGHT' };
  if (map[e.key]) { e.preventDefault(); snakeDir(map[e.key]); }
});

// ── SNAKE GAME CLASS ──
class SnakeGame {
  constructor() {
    this.canvas = document.getElementById('snake-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.size = this.canvas.width;
    this.cols = 20;
    this.cell = this.size / this.cols;
    this.reset();
  }

  reset() {
    this.snake = [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }];
    this.dir = 'RIGHT';
    this.nextDir = 'RIGHT';
    this.food = this.randomFood();
    this.score = 0;
    this.running = false;
    this.loop = null;
    this.speed = 150;
    document.getElementById('snake-score').textContent = 0;
  }

  randomFood() {
    let pos;
    do {
      pos = {
        x: Math.floor(Math.random() * this.cols),
        y: Math.floor(Math.random() * this.cols)
      };
    } while (this.snake.some(s => s.x === pos.x && s.y === pos.y));
    return pos;
  }

  setDir(d) {
    const opp = { UP: 'DOWN', DOWN: 'UP', LEFT: 'RIGHT', RIGHT: 'LEFT' };
    if (d !== opp[this.dir]) this.nextDir = d;
  }

  start() { this.running = true; this.tick(); }
  stop() { this.running = false; clearTimeout(this.loop); }

  tick() {
    if (!this.running) return;
    this.dir = this.nextDir;

    const head = { ...this.snake[0] };
    if (this.dir === 'UP') head.y--;
    if (this.dir === 'DOWN') head.y++;
    if (this.dir === 'LEFT') head.x--;
    if (this.dir === 'RIGHT') head.x++;

    if (head.x < 0 || head.x >= this.cols || head.y < 0 || head.y >= this.cols) {
      this.gameOver(); return;
    }
    if (this.snake.some(s => s.x === head.x && s.y === head.y)) {
      this.gameOver(); return;
    }

    this.snake.unshift(head);
    if (head.x === this.food.x && head.y === this.food.y) {
      this.score += 10;
      document.getElementById('snake-score').textContent = this.score;
      this.food = this.randomFood();
      if (this.speed > 70) this.speed -= 3;
    } else {
      this.snake.pop();
    }

    this.draw();
    this.loop = setTimeout(() => this.tick(), this.speed);
  }

  draw() {
    const { ctx, cell: c, size: s } = this;

    // Background
    ctx.fillStyle = '#F0FAF9';
    ctx.fillRect(0, 0, s, s);

    // Grid dots
    ctx.fillStyle = 'rgba(77,191,184,0.12)';
    for (let x = 0; x < this.cols; x++) {
      for (let y = 0; y < this.cols; y++) {
        ctx.beginPath();
        ctx.arc(x * c + c / 2, y * c + c / 2, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Food
    ctx.shadowColor = 'rgba(255,127,110,0.5)';
    ctx.shadowBlur = 10;
    ctx.fillStyle = '#FF7F6E';
    ctx.beginPath();
    ctx.arc(this.food.x * c + c / 2, this.food.y * c + c / 2, c / 2 - 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Snake
    this.snake.forEach((seg, i) => {
      const isHead = i === 0;
      const ratio = 1 - (i / this.snake.length) * 0.4;
      ctx.fillStyle = isHead ? '#4DBFB8' : `rgba(77,191,184,${ratio})`;
      ctx.shadowColor = isHead ? 'rgba(77,191,184,0.4)' : 'transparent';
      ctx.shadowBlur = isHead ? 8 : 0;
      const pad = isHead ? 1 : 2;
      this.roundRect(ctx, seg.x * c + pad, seg.y * c + pad, c - pad * 2, c - pad * 2, isHead ? 6 : 4);
      ctx.shadowBlur = 0;

      if (isHead) {
        const ex = this.dir === 'LEFT' ? -2 : this.dir === 'RIGHT' ? 2 : 0;
        const ey = this.dir === 'UP' ? -2 : this.dir === 'DOWN' ? 2 : 0;
        ctx.fillStyle = 'white';
        ctx.beginPath(); ctx.arc(seg.x * c + c / 2 - 3 + ex, seg.y * c + c / 2 - 3 + ey, 3, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(seg.x * c + c / 2 + 3 + ex, seg.y * c + c / 2 - 3 + ey, 3, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#2D3B36';
        ctx.beginPath(); ctx.arc(seg.x * c + c / 2 - 3 + ex, seg.y * c + c / 2 - 3 + ey, 1.5, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(seg.x * c + c / 2 + 3 + ex, seg.y * c + c / 2 - 3 + ey, 1.5, 0, Math.PI * 2); ctx.fill();
      }
    });
  }

  roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
    ctx.fill();
  }

  gameOver() {
    this.running = false;
    let hi = 0;
    try { hi = parseInt(localStorage.getItem(STORAGE_KEY_HI) || 0); } catch (e) {}
    const isNew = this.score > hi;
    if (isNew) {
      try { localStorage.setItem(STORAGE_KEY_HI, this.score); } catch (e) {}
      document.getElementById('snake-hi').textContent = this.score;
    }

    const overlay = document.getElementById('snake-overlay');
    overlay.classList.remove('hidden');
    document.getElementById('overlay-emoji').textContent = isNew ? '🏆' : '😵';
    document.getElementById('overlay-title').textContent = isNew ? 'New Best!' : 'Game Over';
    document.getElementById('overlay-sub').textContent =
      `You scored ${this.score}${isNew ? ' — absolute legend' : ''}`;
    document.getElementById('overlay-btn').textContent = 'Play Again 🔄';
  }
}
