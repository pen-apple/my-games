let score = 0;
let clickPower = 1;

// Upgrades one-time bought flags
let upgradesBought = {
    upgrade1: false,
    upgrade2: false,
    upgrade3: false,
    upgrade4: false
};

// Auto-clickers owned and base costs
let autoClickOwned = 0;
const autoClickBaseCost = 100;

let autoClickOwned2 = 0;
const autoClickBaseCost2 = 500;

let autoClickOwned3 = 0;
const autoClickBaseCost3 = 3000;

// DOM refs
const scoreDisplay = document.getElementById("score");

// Upgrade divs
const upgrade1Div = document.getElementById("upgrade1");
const upgrade2Div = document.getElementById("upgrade2");
const upgrade3Div = document.getElementById("upgrade3");
const upgrade4Div = document.getElementById("upgrade4");
const autoClicker1Div = document.getElementById("autoClicker1");
const autoClicker2Div = document.getElementById("autoClicker2");
const autoClicker3Div = document.getElementById("autoClicker3");

// Buttons
const upgrade1Btn = document.getElementById("upgrade1-btn");
const upgrade2Btn = document.getElementById("upgrade2-btn");
const upgrade3Btn = document.getElementById("upgrade3-btn");
const upgrade4Btn = document.getElementById("upgrade4-btn");

const autoBtn = document.getElementById("autoBtn");
const autoBtn2 = document.getElementById("autoBtn2");
const autoBtn3 = document.getElementById("autoBtn3");

// Auto-click cost displays
const autoCostDisplay = document.getElementById("autoCost");
const autoOwnedDisplay = document.getElementById("autoOwned");

const autoCostDisplay2 = document.getElementById("autoCost2");
const autoOwnedDisplay2 = document.getElementById("autoOwned2");

const autoCostDisplay3 = document.getElementById("autoCost3");
const autoOwnedDisplay3 = document.getElementById("autoOwned3");

// Restart button
const restartBtn = document.getElementById("restart-btn");

// Click button
const clickBtn = document.getElementById("click-btn");

// Retro sound effects
const clickSound = new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU');
const upgradeSound = new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU');

// Load game
window.onload = () => {
    const saved = JSON.parse(localStorage.getItem("retroClickerSave"));
    if (saved) {
        score = saved.score || 0;
        clickPower = saved.clickPower || 1;
        upgradesBought = saved.upgradesBought || upgradesBought;

        autoClickOwned = saved.autoClickOwned || 0;
        autoClickOwned2 = saved.autoClickOwned2 || 0;
        autoClickOwned3 = saved.autoClickOwned3 || 0;

        update();
        // Disable bought one-time upgrades
        if (upgradesBought.upgrade1) disableUpgrade(upgrade1Btn);
        if (upgradesBought.upgrade2) disableUpgrade(upgrade2Btn);
        if (upgradesBought.upgrade3) disableUpgrade(upgrade3Btn);
        if (upgradesBought.upgrade4) disableUpgrade(upgrade4Btn);

        startAutoClick();
    }
};

// Save game state
function saveGame() {
    localStorage.setItem("retroClickerSave", JSON.stringify({
        score,
        clickPower,
        upgradesBought,
        autoClickOwned,
        autoClickOwned2,
        autoClickOwned3
    }));
}

// Update UI and show/hide upgrades based on score
function update() {
    scoreDisplay.textContent = score;
    updateAutoDisplay();
    updateUpgradeVisibility();
    createRetroEffect();
}

// Create retro visual effect when clicking
function createRetroEffect() {
    const effect = document.createElement('div');
    effect.className = 'retro-effect';
    effect.style.left = Math.random() * window.innerWidth + 'px';
    effect.style.top = Math.random() * window.innerHeight + 'px';
    document.body.appendChild(effect);
    setTimeout(() => effect.remove(), 1000);
}

// Show upgrades only if you have enough points
function updateUpgradeVisibility() {
    if (score >= 10 || upgradesBought.upgrade1) upgrade1Div.style.display = "block"; else upgrade1Div.style.display = "none";
    if (score >= 50 || upgradesBought.upgrade2) upgrade2Div.style.display = "block"; else upgrade2Div.style.display = "none";
    if (score >= 100 || autoClickOwned > 0) autoClicker1Div.style.display = "block"; else autoClicker1Div.style.display = "none";
    if (score >= 300 || upgradesBought.upgrade3) upgrade3Div.style.display = "block"; else upgrade3Div.style.display = "none";
    if (score >= 500 || autoClickOwned2 > 0) autoClicker2Div.style.display = "block"; else autoClicker2Div.style.display = "none";
    if (score >= 2000 || upgradesBought.upgrade4) upgrade4Div.style.display = "block"; else upgrade4Div.style.display = "none";
    if (score >= 3000 || autoClickOwned3 > 0) autoClicker3Div.style.display = "block"; else autoClicker3Div.style.display = "none";
}

// Auto-click cost formulas
function getAutoClickCost() {
    return Math.floor(autoClickBaseCost * Math.pow(1.15, autoClickOwned));
}

function getAutoClickCost2() {
    return Math.floor(autoClickBaseCost2 * Math.pow(1.15, autoClickOwned2));
}

function getAutoClickCost3() {
    return Math.floor(autoClickBaseCost3 * Math.pow(1.15, autoClickOwned3));
}

// Update auto-clicker cost and owned display
function updateAutoDisplay() {
    autoCostDisplay.textContent = getAutoClickCost();
    autoOwnedDisplay.textContent = autoClickOwned;

    autoCostDisplay2.textContent = getAutoClickCost2();
    autoOwnedDisplay2.textContent = autoClickOwned2;

    autoCostDisplay3.textContent = getAutoClickCost3();
    autoOwnedDisplay3.textContent = autoClickOwned3;
}

// Disable a one-time upgrade button after purchase
function disableUpgrade(button) {
    button.disabled = true;
    button.textContent = "PURCHASED";
}

// Click button action with retro effects
clickBtn.onclick = () => {
    score += clickPower;
    clickBtn.style.transform = 'scale(0.95)';
    setTimeout(() => clickBtn.style.transform = 'scale(1)', 100);
    createRetroEffect();
    update();
    saveGame();
};

// Restart game action
restartBtn.onclick = () => {
    if(confirm("ARE YOU SURE YOU WANT TO RESTART? ALL PROGRESS WILL BE LOST!")) {
        score = 0;
        clickPower = 1;
        upgradesBought = {upgrade1:false, upgrade2:false, upgrade3:false, upgrade4:false};
        autoClickOwned = 0;
        autoClickOwned2 = 0;
        autoClickOwned3 = 0;

        // Re-enable buttons
        upgrade1Btn.disabled = false; upgrade1Btn.textContent = "BUY";
        upgrade2Btn.disabled = false; upgrade2Btn.textContent = "BUY";
        upgrade3Btn.disabled = false; upgrade3Btn.textContent = "BUY";
        upgrade4Btn.disabled = false; upgrade4Btn.textContent = "BUY";

        update();
        saveGame();
    }
};

// Buy upgrade1: 8-BIT POWER (+2 per click)
upgrade1Btn.onclick = () => {
    if(score >= 10 && !upgradesBought.upgrade1) {
        score -= 10;
        clickPower += 2;
        upgradesBought.upgrade1 = true;
        disableUpgrade(upgrade1Btn);
        createRetroEffect();
        update();
        saveGame();
    }
};

// Buy upgrade2: PIXEL MASTER (+5 per click)
upgrade2Btn.onclick = () => {
    if(score >= 50 && !upgradesBought.upgrade2) {
        score -= 50;
        clickPower += 5;
        upgradesBought.upgrade2 = true;
        disableUpgrade(upgrade2Btn);
        createRetroEffect();
        update();
        saveGame();
    }
};

// Buy upgrade3: RETRO RUSH (+10 per click)
upgrade3Btn.onclick = () => {
    if(score >= 300 && !upgradesBought.upgrade3) {
        score -= 300;
        clickPower += 10;
        upgradesBought.upgrade3 = true;
        disableUpgrade(upgrade3Btn);
        createRetroEffect();
        update();
        saveGame();
    }
};

// Buy upgrade4: RETRO OVERDRIVE (+50 per click)
upgrade4Btn.onclick = () => {
    if(score >= 2000 && !upgradesBought.upgrade4) {
        score -= 2000;
        clickPower += 50;
        upgradesBought.upgrade4 = true;
        disableUpgrade(upgrade4Btn);
        createRetroEffect();
        update();
        saveGame();
    }
};

// Buy auto-clicker tier 1
autoBtn.onclick = () => {
    let cost = getAutoClickCost();
    if(score >= cost) {
        score -= cost;
        autoClickOwned++;
        createRetroEffect();
        update();
        saveGame();
        startAutoClick();
    }
};

// Buy auto-clicker tier 2
autoBtn2.onclick = () => {
    let cost = getAutoClickCost2();
    if(score >= cost) {
        score -= cost;
        autoClickOwned2++;
        createRetroEffect();
        update();
        saveGame();
        startAutoClick();
    }
};

// Buy auto-clicker tier 3
autoBtn3.onclick = () => {
    let cost = getAutoClickCost3();
    if(score >= cost) {
        score -= cost;
        autoClickOwned3++;
        createRetroEffect();
        update();
        saveGame();
        startAutoClick();
    }
};

// Start auto-clickers interval (only once)
function startAutoClick() {
    if(!window.autoClickerStarted) {
        window.autoClickerStarted = true;
        setInterval(() => {
            score += autoClickOwned * 2 + autoClickOwned2 * 5 + autoClickOwned3 * 20;
            update();
            saveGame();
        }, 1000);
    }
} 