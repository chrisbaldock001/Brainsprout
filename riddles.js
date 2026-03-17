// riddles.js — all riddle game logic

// ── GOOGLE SHEETS FETCH ──
const SHEET_ID = '1-bqLkabofOegL2PxEv4ov0RaUwj2lCq66Xlk_5BaDVQ';

async function fetchRiddlesFromSheet() {
  try {
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json`;
    const res = await fetch(url);
    const text = await res.text();
    const json = JSON.parse(text.substring(text.indexOf('{'), text.lastIndexOf('}') + 1));
    const rows = json.table.rows;
    const parsed = rows.map(row => ({
      riddle: row.c[1]?.v || '',
      answer: row.c[2]?.v || '',
      category: row.c[3]?.v || 'general',
      difficulty: row.c[4]?.v || 'medium',
      hint: row.c[5]?.v || 'Think carefully...',
      deco: getDeco(row.c[3]?.v)
    })).filter(r => r.riddle);
    if (parsed.length > 0) {
      ALL_RIDDLES.length = 0;
      ALL_RIDDLES.push(...parsed);
    }
  } catch (e) {
    console.log('Using fallback riddles:', e.message);
  }
}

function getDeco(category) {
  const map = { wordplay: '🌿', logic: '🧩', nature: '🌱', language: '📖', maths: '🔢' };
  return map[category] || '🌿';
}

// ── RIDDLE DATA ──
const ALL_RIDDLES = [
  { riddle: "I have cities but no houses, mountains but no trees, and water but no fish. What am I?", answer: "A map", hint: "Think flat and folded", deco: "🗺️" },
  { riddle: "What English word has three consecutive double letters?", answer: "Bookkeeper", hint: "Think about someone who manages accounts", deco: "📚" },
  { riddle: "You go at red and stop at green. What am I?", answer: "A watermelon", hint: "Think about fruit", deco: "🍉" },
  { riddle: "The more you take, the more you leave behind. What am I?", answer: "Footsteps", hint: "Think about walking", deco: "👣" },
  { riddle: "What is so fragile that saying its name breaks it?", answer: "Silence", hint: "Shhh...", deco: "🤫" },
  { riddle: "What five-letter word becomes shorter when you add two letters to it?", answer: "Short", hint: "The answer is hiding in the question", deco: "🔤" },
  { riddle: "I'm found in Mercury, Earth, Mars and Jupiter, but not in Venus or Neptune. What am I?", answer: "The letter R", hint: "Look at the planet names carefully", deco: "🪐" },
  { riddle: "What kind of room has no walls or corners?", answer: "A mushroom", hint: "Look for a hidden word", deco: "🍄" },
  { riddle: "When John was 6, he hammered a nail into a tree to mark his height. Ten years later, how much higher is the nail?", answer: "Same height — trees grow from the top!", hint: "Think about how trees actually grow", deco: "🌳" },
  { riddle: "I am higher without a head. What am I?", answer: "A pillow", hint: "Think about bedtime", deco: "😴" },
  { riddle: "Different lights make me strange — I change into different sizes. What am I?", answer: "The pupil of an eye", hint: "Think about your face", deco: "👁️" },
  { riddle: "What begins with E and only contains one letter?", answer: "An envelope", hint: "Think about posting something", deco: "✉️" },
  { riddle: "I have four legs but no hair. People sit on me for hours but I go nowhere. What am I?", answer: "A chair", hint: "Think about furniture", deco: "🪑" },
  { riddle: "What can fill a room but takes up no space?", answer: "Light", hint: "Think about sunrise", deco: "💡" },
  { riddle: "What goes through cities and fields but never moves?", answer: "A road", hint: "Think about getting from A to B", deco: "🛣️" },
  { riddle: "A girl fell off a 20-foot ladder but wasn't hurt. How?", answer: "She fell off the bottom rung!", hint: "How high up was she really?", deco: "🪜" },
  { riddle: "What has a powerful horn but makes no noise?", answer: "A rhinoceros", hint: "Think about African animals", deco: "🦏" },
  { riddle: "How can a man go 8 days without sleep?", answer: "He sleeps at night!", hint: "Read it again very carefully", deco: "🌙" },
  { riddle: "What has a bark but no bite?", answer: "A tree", hint: "Think about the woods", deco: "🌲" },
  { riddle: "What can you put in your pocket that would leave it empty?", answer: "A hole", hint: "Think about nothing", deco: "🕳️" },
  { riddle: "I sometimes run but cannot walk. You follow me around. What am I?", answer: "Your nose", hint: "It's on your face!", deco: "👃" },
  { riddle: "What has a bottom at the top?", answer: "Your legs", hint: "Think about your body", deco: "🦵" },
  { riddle: "You hear me but can't see me, and I won't answer unless spoken to. What am I?", answer: "An echo", hint: "Try shouting in a cave", deco: "🏔️" },
  { riddle: "What gets bigger the more you take away from it?", answer: "A hole", hint: "Think about digging", deco: "⛏️" },
  { riddle: "What can you keep after giving it to someone?", answer: "Your word", hint: "Think about promises", deco: "🤝" },
  { riddle: "Can you name three consecutive days without using the name of any day of the week?", answer: "Yesterday, today, and tomorrow", hint: "Think outside the calendar", deco: "📅" },
  { riddle: "What's black and white and read all over?", answer: "A newspaper", hint: "Think about homophones", deco: "📰" },
  { riddle: "If you've got me, you want to share me. If you share me, you haven't kept me. What am I?", answer: "A secret", hint: "Think about whispering", deco: "🤐" },
  { riddle: "I have one eye but cannot see. I'm used every day. What am I?", answer: "A needle", hint: "Think about sewing", deco: "🧵" },
  { riddle: "What building has the most storeys?", answer: "A library", hint: "Think about a homophone", deco: "📖" },
  { riddle: "What goes up when rain comes down?", answer: "An umbrella", hint: "Think about rainy days", deco: "☔" },
  { riddle: "Which letter of the alphabet has the most water?", answer: "C (the sea!)", hint: "Say it out loud", deco: "🌊" },
  { riddle: "What comes once in a minute, twice in a moment, but never in a thousand years?", answer: "The letter M", hint: "Look at the words in the riddle", deco: "🔡" },
  { riddle: "What word contains 26 letters but only has three syllables?", answer: "Alphabet", hint: "Think about letters themselves", deco: "🔠" },
  { riddle: "What is always in front of you but can't be seen?", answer: "The future", hint: "Think about time", deco: "🔮" },
  { riddle: "What has a thousand needles but doesn't sew?", answer: "A porcupine", hint: "Think about a spiky animal", deco: "🦔" },
  { riddle: "What type of car is spelled the same forwards and backwards?", answer: "Racecar", hint: "Think about palindromes", deco: "🏎️" },
  { riddle: "I have hands but cannot clap. What am I?", answer: "A clock", hint: "Think about telling the time", deco: "⏰" },
  { riddle: "What invention lets you look right through a wall?", answer: "A window", hint: "Think about your house", deco: "🏠" },
  { riddle: "What has lots of keys but can't open any doors?", answer: "A piano", hint: "Think about music", deco: "🎹" },
  { riddle: "What is full of holes but still holds water?", answer: "A sponge", hint: "Think about bath time", deco: "🛁" },
  { riddle: "What runs but never walks, has a mouth but never talks, has a head but never weeps?", answer: "A river", hint: "Think about geography", deco: "🏞️" },
  { riddle: "What word, if you say it right is wrong, but if you say it wrong is right?", answer: "Wrong", hint: "Read very carefully", deco: "🤔" },
  { riddle: "Imagine you're in a room with no doors or windows. How do you get out?", answer: "Stop imagining!", hint: "The answer is in the question", deco: "💭" },
  { riddle: "The one who makes me can't use me. The one who buys me won't use it themselves. The one who uses me doesn't know it. What am I?", answer: "A coffin", hint: "Think about the end of a story", deco: "🌹" },
  { riddle: "What common English verb becomes its own past tense by rearranging its letters?", answer: "Eat (becomes Ate!)", hint: "Think about mealtimes", deco: "🍽️" },
  { riddle: "George, Helen, and Steve drink coffee. Bert, Karen, and Dave drink soda. Does Elizabeth drink coffee or soda?", answer: "Coffee — the letter E appears twice in her name!", hint: "Count a specific letter in each name", deco: "☕" },
  { riddle: "First two letters = male, first three = female, first four = a great person, whole word = a great woman. What is it?", answer: "Heroine", hint: "He... Her... Hero...", deco: "🦸" },
  { riddle: "What has teeth but cannot eat and combs but cannot brush?", answer: "A gear / cog", hint: "Think about machines", deco: "⚙️" },
  { riddle: "I speak without a mouth and hear without ears. I have no body but come alive with wind. What am I?", answer: "An echo", hint: "Think about mountains and caves", deco: "🌬️" }
];

// ── STATE ──
let currentRiddles = [];
let currentIndex = 0;
let timerInterval = null;
let timeLeft = 60;

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  fetchRiddlesFromSheet().then(() => {
    currentRiddles = getRandomRiddles(7);
    loadRiddle();
  });
});

function getRandomRiddles(n) {
  return [...ALL_RIDDLES].sort(() => Math.random() - 0.5).slice(0, n);
}

// ── RIDDLE LOGIC ──
function loadRiddle() {
  const r = currentRiddles[currentIndex];
  document.getElementById('riddle-num').textContent = `Riddle ${currentIndex + 1} of 7`;
  document.getElementById('riddle-text').textContent = r.riddle;
  document.getElementById('riddle-deco').textContent = r.deco;
  document.getElementById('hint-text').textContent = r.hint;
  document.getElementById('answer-text').textContent = r.answer;
  document.getElementById('next-btn').textContent = currentIndex === 6 ? 'See Results 🎉' : 'Next Riddle →';
  updateProgress();
  startTimer();
}

function updateProgress() {
  const container = document.getElementById('progress-dots');
  container.innerHTML = '';
  for (let i = 0; i < 7; i++) {
    const dot = document.createElement('div');
    dot.className = 'progress-dot' +
      (i < currentIndex ? ' done' : '') +
      (i === currentIndex ? ' current' : '');
    container.appendChild(dot);
  }
}

function startTimer() {
  clearInterval(timerInterval);
  timeLeft = 60;
  updateTimerDisplay();
  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      showAnswerOverlay("Time's up! The answer was...");
    }
  }, 1000);
}

function updateTimerDisplay() {
  const el = document.getElementById('timer-display');
  el.textContent = timeLeft;
  el.classList.toggle('urgent', timeLeft <= 5);
}

// ── HINT ──
function showHint() {
  document.getElementById('hint-overlay').classList.add('show');
}

function closeHint(e) {
  if (e.target === document.getElementById('hint-overlay')) closeHintBtn();
}

function closeHintBtn() {
  document.getElementById('hint-overlay').classList.remove('show');
}

// ── ANSWER ──
function revealAnswer() {
  clearInterval(timerInterval);
  showAnswerOverlay('The answer is...');
}

function showAnswerOverlay(title) {
  document.getElementById('answer-title').textContent = title;
  document.getElementById('answer-overlay').classList.add('show');
}

function nextRiddle() {
  document.getElementById('answer-overlay').classList.remove('show');
  currentIndex++;
  if (currentIndex >= 7) {
    endRound();
  } else {
    loadRiddle();
  }
}

// ── END ROUND ──
function endRound() {
  clearInterval(timerInterval);
  const rounds = getRoundsCompleted() + 1;
  setRoundsCompleted(rounds);

  const msgs = [
    '7 riddles down. Your brain is absolutely enormous.',
    `That's ${rounds} rounds complete. Someone's been eating their vegetables.`,
    'A perfectly functioning brain, confirmed. Well done.',
    '7 out of 7 riddles survived. The riddles did not.'
  ];

  document.getElementById('celeb-name').textContent = getPlayerName();
  document.getElementById('celeb-msg').textContent = msgs[Math.min(rounds - 1, msgs.length - 1)];
  launchConfetti('confetti-container');

  document.getElementById('riddle-view').classList.add('hidden');
  document.getElementById('celebration-view').classList.remove('hidden');
}

function playAgain() {
  currentRiddles = getRandomRiddles(7);
  currentIndex = 0;
  document.getElementById('celebration-view').classList.add('hidden');
  document.getElementById('riddle-view').classList.remove('hidden');
  loadRiddle();
}
