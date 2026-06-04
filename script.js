const BASE_BUILDINGS = [
    { id: 'cursor', name: 'Cursor', baseCost: 15, cost: 15, count: 0, production: 0.1 },
    { id: 'grandma', name: 'Grandma', baseCost: 100, cost: 100, count: 0, production: 1 },
    { id: 'farm', name: 'Farm', baseCost: 1100, cost: 1100, count: 0, production: 8 },
    { id: 'mine', name: 'Mine', baseCost: 12000, cost: 12000, count: 0, production: 47 },
    { id: 'factory', name: 'Factory', baseCost: 130000, cost: 130000, count: 0, production: 260 },
    { id: 'bank', name: 'Bank', baseCost: 1400000, cost: 1400000, count: 0, production: 1400 },
    { id: 'temple', name: 'Temple', baseCost: 20000000, cost: 20000000, count: 0, production: 7800 },
    { id: 'wizard', name: 'Wizard Tower', baseCost: 330000000, cost: 330000000, count: 0, production: 44000 },
    { id: 'shipment', name: 'Shipment', baseCost: 5100000000, cost: 5100000000, count: 0, production: 220000 },
    { id: 'alchemy', name: 'Alchemy Lab', baseCost: 75000000000, cost: 75000000000, count: 0, production: 1200000 },
    { id: 'portal', name: 'Portals', baseCost: 1020000000000, cost: 1020000000000, count: 0, production: 7000000 },
    { id: 'timeMachine', name: 'Time Machine', baseCost: 14000000000000, cost: 14000000000000, count: 0, production: 45000000 },
    { id: 'condensor', name: 'Antimatter Condenser', baseCost: 210000000000000, cost: 210000000000000, count: 0, production: 260000000 },
    { id: 'quantumLab', name: 'Quantum Lab', baseCost: 3400000000000000, cost: 3400000000000000, count: 0, production: 1600000000 },
    { id: 'infinityEngine', name: 'Infinity Engine', baseCost: 58000000000000000, cost: 58000000000000000, count: 0, production: 10800000000 },
    { id: 'galaxy', name: 'Galaxy Nexus', baseCost: 960000000000000000, cost: 960000000000000000, count: 0, production: 72000000000 },
    { id: 'stellarForge', name: 'Stellar Forge', baseCost: 17000000000000000000, cost: 17000000000000000000, count: 0, production: 520000000000 },
    { id: 'dimensionGate', name: 'Dimension Gate', baseCost: 310000000000000000000, cost: 310000000000000000000, count: 0, production: 3200000000000 },
    { id: 'cosmicBeacon', name: 'Cosmic Beacon', baseCost: 5600000000000000000000, cost: 5600000000000000000000, count: 0, production: 19000000000000 },
    { id: 'nebulaFarm', name: 'Nebula Farm', baseCost: 102000000000000000000000, cost: 102000000000000000000000, count: 0, production: 118000000000000 },
    { id: 'singularity', name: 'Singularity Engine', baseCost: 1900000000000000000000000, cost: 1900000000000000000000000, count: 0, production: 760000000000000 },
    { id: 'universeCore', name: 'Universe Core', baseCost: 36000000000000000000000000, cost: 36000000000000000000000000, count: 0, production: 5000000000000000 },
    { id: 'eternityVault', name: 'Eternity Vault', baseCost: 700000000000000000000000000, cost: 700000000000000000000000000, count: 0, production: 33000000000000000 }
];

function createAdvancedBuildings() {
    const prefixes = ['Solar', 'Lunar', 'Quantum', 'Void', 'Celestial', 'Nebula', 'Aether', 'Eternal', 'Chaos', 'Infinity'];
    const nouns = ['Engine', 'Forge', 'Core', 'Beacon', 'Lab', 'Matrix', 'Archive', 'Spire', 'Conduit', 'Vault'];
    const buildings = [];
    let baseCost = 700000000000000000000000000;
    let production = 33000000000000000;
    const costMultiplier = 2.8;
    const productionMultiplier = 2.5;

    for (let i = 0; i < 100; i += 1) {
        const prefix = prefixes[i % prefixes.length];
        const noun = nouns[Math.floor(i / prefixes.length)];
        const name = `${prefix} ${noun}`;
        const id = `${prefix.toLowerCase()}${noun.toLowerCase()}`;

        baseCost = Math.round(baseCost * costMultiplier);
        production = Math.round(production * productionMultiplier);

        buildings.push({
            id,
            name,
            baseCost,
            cost: baseCost,
            count: 0,
            production
        });
    }

    return buildings;
}

const gameState = {
    cookies: 0,
    clicks: 0,
    clickPower: 1,
    buildings: [...BASE_BUILDINGS, ...createAdvancedBuildings()],
    upgradesUnlocked: [],
    achievementsUnlocked: []
};

const DOM = {
    cookieBtn: document.getElementById('cookieBtn'),
    cookiesDisplay: document.getElementById('cookies'),
    cpsDisplay: document.getElementById('cps'),
    clicksDisplay: document.getElementById('clicks'),
    buildingsContainer: document.getElementById('buildingsContainer'),
    adminCommandInput: document.getElementById('adminCommandInput'),
    adminExecuteBtn: document.getElementById('adminExecuteBtn'),
    adminAddCookiesBtn: document.getElementById('adminAddCookiesBtn'),
    adminAddCookieAmountBtn: document.getElementById('adminAddCookieAmountBtn'),
    adminCookieAmountInput: document.getElementById('adminCookieAmountInput'),
    adminBuildingIdInput: document.getElementById('adminBuildingIdInput'),
    adminBuildingCountInput: document.getElementById('adminBuildingCountInput'),
    adminAddBuildingBtn: document.getElementById('adminAddBuildingBtn'),
    adminAddMillionCookiesBtn: document.getElementById('adminAddMillionCookiesBtn'),
    adminUnlockBtn: document.getElementById('adminUnlockBtn'),
    adminExportBtn: document.getElementById('adminExportBtn'),
    adminImportBtn: document.getElementById('adminImportBtn'),
    adminResetBtn: document.getElementById('adminResetBtn'),
    adminOutput: document.getElementById('adminOutput')
};

const AUTO_TICK_MS = 100;
const SAVE_INTERVAL_MS = 2000;
const CLICK_ANIMATION_MS = 80;
const UPGRADES_PAGE_SIZE = 50;
const ACHIEVEMENTS_PAGE_SIZE = 50;

function init() {
    loadGame();
    updateDisplay();
    startAutoProduction();

    // ensure we have the latest DOM nodes (script may run before some nodes existed)
    DOM.upgradesContainer = document.getElementById('upgradesContainer');
    DOM.achievementsContainer = document.getElementById('achievementsContainer');
    DOM.loadMoreUpgrades = document.getElementById('loadMoreUpgrades');
    DOM.loadMoreAchievements = document.getElementById('loadMoreAchievements');
    DOM.notificationContainer = document.getElementById('notificationContainer');
    DOM.bigAchievementsBtn = document.getElementById('bigAchievementsBtn');
    DOM.achCount = document.getElementById('achCount');
    DOM.buyAllUpgradesBtn = document.getElementById('buyAllUpgrades');
    DOM.adminAddCookieAmountBtn = document.getElementById('adminAddCookieAmountBtn');
    DOM.adminCookieAmountInput = document.getElementById('adminCookieAmountInput');
    DOM.adminBuildingIdInput = document.getElementById('adminBuildingIdInput');
    DOM.adminBuildingCountInput = document.getElementById('adminBuildingCountInput');
    DOM.adminAddBuildingBtn = document.getElementById('adminAddBuildingBtn');
    DOM.adminAddMillionCookiesBtn = document.getElementById('adminAddMillionCookiesBtn');
    DOM.adminExportBtn = document.getElementById('adminExportBtn');
    DOM.adminImportBtn = document.getElementById('adminImportBtn');

    // render initial UI for upgrades/achievements
    renderUpgrades();
    renderAchievements();

    if (DOM.loadMoreUpgrades) {
        DOM.loadMoreUpgrades.addEventListener('click', () => renderUpgrades(true));
    }
    if (DOM.buyAllUpgradesBtn) {
        DOM.buyAllUpgradesBtn.addEventListener('click', buyAllUpgrades);
    }
    if (DOM.loadMoreAchievements) {
        DOM.loadMoreAchievements.addEventListener('click', () => renderAchievements(true));
    }

    if (DOM.bigAchievementsBtn) {
        DOM.bigAchievementsBtn.addEventListener('click', () => {
            if (DOM.achievementsContainer) {
                DOM.achievementsContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
                showNotification('Opening Achievements');
            }
        });
    }

    DOM.cookieBtn.addEventListener('click', handleCookieClick);
    DOM.adminExecuteBtn.addEventListener('click', handleAdminCommand);
    DOM.adminCommandInput.addEventListener('keydown', event => {
        if (event.key === 'Enter') {
            handleAdminCommand();
        }
    });

    if (DOM.adminAddCookieAmountBtn) {
        DOM.adminAddCookieAmountBtn.addEventListener('click', adminAddCookieAmount);
    }
    if (DOM.adminAddBuildingBtn) {
        DOM.adminAddBuildingBtn.addEventListener('click', adminAddBuilding);
    }
    DOM.adminAddCookiesBtn.addEventListener('click', () => runAdminCommand('add cookies 100000'));
    if (DOM.adminAddMillionCookiesBtn) {
        DOM.adminAddMillionCookiesBtn.addEventListener('click', () => runAdminCommand('add cookies 1000000'));
    }
    DOM.adminUnlockBtn.addEventListener('click', () => runAdminCommand('unlock all'));
    if (DOM.adminExportBtn) {
        DOM.adminExportBtn.addEventListener('click', exportSaveData);
    }
    if (DOM.adminImportBtn) {
        DOM.adminImportBtn.addEventListener('click', importSaveData);
    }
    DOM.adminResetBtn.addEventListener('click', () => runAdminCommand('reset'));
}

function handleCookieClick(event) {
    const rect = DOM.cookieBtn.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    gameState.cookies += gameState.clickPower;
    gameState.clicks += 1;
    showClickText(x, y, `+${formatNumber(gameState.clickPower)}`);
    animateCookie();
    updateDisplay();
    saveGame();
}

function showClickText(x, y, text) {
    const span = document.createElement('div');
    span.className = 'click-text';
    span.textContent = text;
    span.style.left = `${x}px`;
    span.style.top = `${y}px`;
    DOM.cookieBtn.parentElement.appendChild(span);

    requestAnimationFrame(() => {
        span.style.transform = 'translate(-50%, -100%) translateY(-30px)';
        span.style.opacity = '0';
    });

    setTimeout(() => span.remove(), 800);
}

// ---------------- Upgrades & Achievements ----------------

function createUpgrades(count) {
    const upgrades = [];
    let baseCost = 500;
    let effectBase = 1.05; // multiplier
    for (let i = 0; i < count; i++) {
        baseCost = Math.round(baseCost * 1.28 + i * 10);
        const id = `upgrade_${i+1}`;
        upgrades.push({
            id,
            name: `Upgrade ${i+1}`,
            description: `Permanently increases cookie production by ${(effectBase).toFixed(2)}x (stacking).`,
            cost: baseCost,
            effect: effectBase
        });
        effectBase *= 1.002; // slight growth per tier
    }
    return upgrades;
}

function createAchievements(count) {
    const adjectives = ['Golden', 'Silver', 'Mystic', 'Ancient', 'Radiant', 'Silent', 'Rapid', 'Shadow', 'Crystal', 'Eternal'];
    const nouns = ['Oven', 'Clicker', 'Vault', 'Forge', 'Temple', 'Beacon', 'Archive', 'Spire', 'Lab', 'Core'];
    const themes = ['Master', 'Champion', 'Guardian', 'Seeker', 'Collector', 'Keeper', 'Sage', 'Ruler', 'Mage', 'Hero'];
    const descriptions = [
        'Earn {threshold} cookies total to unlock this honor.',
        'Gather {threshold} cookies and prove your cookie mastery.',
        'Reach {threshold} cookies to claim this legendary badge.',
        'Make {threshold} cookies and show your empire has grown.',
        'Collect {threshold} cookies to unlock a new achievement milestone.',
        'Build up {threshold} cookies in your vault and earn this reward.',
        'Supply {threshold} cookies to gain this title.',
        'Produce {threshold} cookies and unlock this special achievement.',
        'Accumulate {threshold} cookies to earn this cookie trophy.',
        'Store {threshold} cookies and reveal this hidden achievement.'
    ];

    const ach = [];
    let threshold = 1000;
    for (let i = 0; i < count; i++) {
        threshold = Math.round(threshold * 1.35 + i * 5);
        const id = `ach_${i+1}`;
        const partA = adjectives[i % adjectives.length];
        const partB = nouns[Math.floor(i / adjectives.length) % nouns.length];
        const partC = themes[Math.floor(i / (adjectives.length * nouns.length)) % themes.length];
        const name = `${partA} ${partB} ${partC}`;
        const descTemplate = descriptions[i % descriptions.length];
        const description = descTemplate.replace('{threshold}', formatNumber(threshold));
        ach.push({
            id,
            name,
            description,
            threshold
        });
    }
    return ach;
}

const ALL_UPGRADES = createUpgrades(1000);
const ALL_ACHIEVEMENTS = createAchievements(1000);

// Expose containers in DOM map (safe lookup)
DOM.upgradesContainer = document.getElementById('upgradesContainer');
DOM.achievementsContainer = document.getElementById('achievementsContainer');
DOM.loadMoreUpgrades = document.getElementById('loadMoreUpgrades');
DOM.loadMoreAchievements = document.getElementById('loadMoreAchievements');
    DOM.buyAllUpgradesBtn = document.getElementById('buyAllUpgrades');
DOM.achCount = document.getElementById('achCount');

let upgradesRenderIndex = 0;
let achievementsRenderIndex = 0;

function renderUpgrades(loadMore = false) {
    if (!DOM.upgradesContainer) return;
    if (!loadMore) {
        upgradesRenderIndex = 0;
        DOM.upgradesContainer.innerHTML = '';
    }
    const end = Math.min(ALL_UPGRADES.length, upgradesRenderIndex + UPGRADES_PAGE_SIZE);
    for (let i = upgradesRenderIndex; i < end; i++) {
        const u = ALL_UPGRADES[i];
        const unlocked = gameState.upgradesUnlocked.includes(u.id);
        const canBuy = gameState.cookies >= u.cost && !unlocked;
        const card = document.createElement('div');
        card.className = `upgrade-item${canBuy ? '' : ' disabled'}`;
        card.innerHTML = `<div style="display:flex;justify-content:space-between;align-items:center;"><strong>${u.name}</strong><span>${formatNumber(u.cost)}</span></div><div style="font-size:0.85rem;color:#d4c3a8;margin-top:6px">${u.description}</div>`;
        if (canBuy) card.addEventListener('click', () => buyUpgrade(u.id));
        DOM.upgradesContainer.appendChild(card);
    }
    upgradesRenderIndex = end;
    // hide load-more when finished
    if (DOM.loadMoreUpgrades) {
        DOM.loadMoreUpgrades.style.display = upgradesRenderIndex >= ALL_UPGRADES.length ? 'none' : '';
    }
}

function buyUpgrade(id) {
    const u = ALL_UPGRADES.find(x => x.id === id);
    if (!u) return;
    if (gameState.upgradesUnlocked.includes(id)) return;
    if (gameState.cookies < u.cost) return setAdminStatus('Not enough cookies for upgrade.');
    gameState.cookies -= u.cost;
    gameState.upgradesUnlocked.push(id);
    // apply effect: multiply all building productions and clickPower
    gameState.buildings.forEach(b => b.production *= u.effect);
    gameState.clickPower *= u.effect;
    updateDisplay();
    saveGame();
}

function buyAllUpgrades() {
    const affordableUpgrades = ALL_UPGRADES
        .filter(u => !gameState.upgradesUnlocked.includes(u.id) && gameState.cookies >= u.cost)
        .sort((a, b) => a.cost - b.cost);

    if (!affordableUpgrades.length) {
        setAdminStatus('No affordable upgrades available.');
        return;
    }

    let purchased = 0;
    affordableUpgrades.forEach(u => {
        if (gameState.cookies >= u.cost && !gameState.upgradesUnlocked.includes(u.id)) {
            gameState.cookies -= u.cost;
            gameState.upgradesUnlocked.push(u.id);
            gameState.buildings.forEach(b => b.production *= u.effect);
            gameState.clickPower *= u.effect;
            purchased += 1;
        }
    });

    if (purchased > 0) {
        setAdminStatus(`Purchased ${purchased} upgrade${purchased > 1 ? 's' : ''}.`);
        showNotification(`Bought ${purchased} upgrade${purchased > 1 ? 's' : ''}!`);
        updateDisplay();
        saveGame();
    }
}

function renderAchievements(loadMore = false) {
    if (!DOM.achievementsContainer) return;
    if (!loadMore) {
        achievementsRenderIndex = 0;
        DOM.achievementsContainer.innerHTML = '';
    }
    const end = Math.min(ALL_ACHIEVEMENTS.length, achievementsRenderIndex + ACHIEVEMENTS_PAGE_SIZE);
    for (let i = achievementsRenderIndex; i < end; i++) {
        const a = ALL_ACHIEVEMENTS[i];
        const unlocked = gameState.achievementsUnlocked.includes(a.id);
        const card = document.createElement('div');
        card.className = `achievement-item${unlocked ? ' unlocked' : ''}`;
        card.innerHTML = `<div style="display:flex;justify-content:space-between;align-items:center;"><strong>${a.name}</strong>${unlocked ? '<span class="achievement-badge">Unlocked</span>' : ''}</div><div style="font-size:0.85rem;color:#d4c3a8;margin-top:6px">${a.description}</div>`;
        DOM.achievementsContainer.appendChild(card);
    }
    achievementsRenderIndex = end;
    // update count display
    if (DOM.achCount) DOM.achCount.textContent = gameState.achievementsUnlocked.length;
    // hide load-more when finished
    if (DOM.loadMoreAchievements) {
        DOM.loadMoreAchievements.style.display = achievementsRenderIndex >= ALL_ACHIEVEMENTS.length ? 'none' : '';
    }
}

function checkAchievements() {
    const cookiesTotal = Math.floor(gameState.cookies + gameState.buildings.reduce((s,b) => s + b.count * b.baseCost,0));
    // simple: check by total cookies (could be extended)
    ALL_ACHIEVEMENTS.forEach(a => {
        if (!gameState.achievementsUnlocked.includes(a.id) && gameState.cookies >= a.threshold) {
            gameState.achievementsUnlocked.push(a.id);
            setAdminStatus(`Achievement unlocked: ${a.name}`);
            showNotification(`Achievement unlocked: ${a.name}`);
        }
    });
    // refresh first page so unlocked badges appear
    if (DOM.achievementsContainer) renderAchievements(false);
}

function showNotification(text, timeout = 3000) {
    if (!DOM.notificationContainer) return;
    const n = document.createElement('div');
    n.className = 'notification';
    n.textContent = text;
    DOM.notificationContainer.appendChild(n);
    // allow transition
    requestAnimationFrame(() => n.classList.add('show'));
    setTimeout(() => {
        n.classList.remove('show');
        setTimeout(() => n.remove(), 300);
    }, timeout);
}

function animateCookie() {
    DOM.cookieBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        DOM.cookieBtn.style.transform = '';
    }, CLICK_ANIMATION_MS);
}

function adminAddCookieAmount() {
    if (!DOM.adminCookieAmountInput) return;
    const amount = Number(DOM.adminCookieAmountInput.value);
    if (isNaN(amount) || amount <= 0) {
        setAdminStatus('Enter a valid cookie amount.');
        return;
    }
    gameState.cookies += amount;
    setAdminStatus(`Added ${formatNumber(amount)} cookies.`);
    updateDisplay();
    saveGame();
    DOM.adminCookieAmountInput.value = '';
}

function adminAddBuilding() {
    if (!DOM.adminBuildingIdInput || !DOM.adminBuildingCountInput) return;
    const count = Number(DOM.adminBuildingCountInput.value);
    const query = DOM.adminBuildingIdInput.value.trim().toLowerCase();
    if (!query || isNaN(count) || count <= 0) {
        setAdminStatus('Enter a building name and a valid count.');
        return;
    }
    const target = gameState.buildings.find(
        b => b.id === query || b.name.toLowerCase() === query
    );
    if (!target) {
        setAdminStatus('Building not found. Use id or full name.');
        return;
    }
    target.count += count;
    target.cost = Math.max(0, Math.floor(target.baseCost * Math.pow(1.15, target.count)));
    if (target.id === 'cursor') {
        gameState.clickPower = 1 + target.count * 0.1;
    }
    setAdminStatus(`Added ${count} ${target.name}(s).`);
    updateDisplay();
    saveGame();
    DOM.adminBuildingIdInput.value = '';
    DOM.adminBuildingCountInput.value = '';
}

function exportSaveData() {
    const saveData = localStorage.getItem('cookieClickerSave');
    if (!saveData) {
        setAdminStatus('No save data available to export.');
        return;
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(saveData)
            .then(() => setAdminStatus('Save copied to clipboard.'))
            .catch(() => {
                window.prompt('Copy your save data:', saveData);
                setAdminStatus('Save data exported via prompt.');
            });
    } else {
        window.prompt('Copy your save data:', saveData);
        setAdminStatus('Save data exported via prompt.');
    }
}

function importSaveData() {
    const saveString = window.prompt('Paste your save data here:');
    if (!saveString) {
        setAdminStatus('Import cancelled.');
        return;
    }
    try {
        JSON.parse(saveString);
        localStorage.setItem('cookieClickerSave', saveString);
        loadGame();
        updateDisplay();
        setAdminStatus('Save imported successfully.');
    } catch (error) {
        setAdminStatus('Invalid save data. Please paste valid JSON.');
    }
}

function handleAdminCommand() {
    const command = DOM.adminCommandInput.value.trim();
    if (!command) {
        setAdminStatus('Enter a valid admin command.');
        return;
    }

    runAdminCommand(command);
    DOM.adminCommandInput.value = '';
}

function runAdminCommand(command) {
    const result = executeAdminCommand(command.toLowerCase().trim());
    setAdminStatus(result);
    updateDisplay();
    saveGame();
}

function executeAdminCommand(command) {
    const parts = command.split(' ').filter(Boolean);

    if (command === 'reset') {
        resetGame();
        return 'Game reset complete.';
    }

    if (command === 'unlock all') {
        gameState.buildings.forEach(building => {
            building.cost = 0;
        });
        return 'All buildings are now unlocked.';
    }

    if (parts[0] === 'add' && parts[1] === 'cookies') {
        const amount = Number(parts[2] || 1000);
        if (isNaN(amount) || amount <= 0) {
            return 'Enter a valid cookie amount.';
        }

        gameState.cookies += amount;
        return `Added ${formatNumber(amount)} cookies.`;
    }

    if (parts[0] === 'set' && parts[1] === 'cookies') {
        const amount = Number(parts[2]);
        if (isNaN(amount) || amount < 0) {
            return 'Enter a valid cookie amount.';
        }

        gameState.cookies = amount;
        return `Set cookies to ${formatNumber(amount)}.`;
    }

    if (parts[0] === 'add' && parts[2] && parts[3]) {
        const count = Number(parts[3]);
        const target = gameState.buildings.find(
            b => b.id === parts[2] || b.name.toLowerCase() === parts[2]
        );

        if (!target) {
            return 'Building not found.';
        }

        if (isNaN(count) || count <= 0) {
            return 'Enter a valid building count.';
        }

        target.count += count;
        target.cost = Math.max(0, Math.floor(target.baseCost * Math.pow(1.15, target.count)));

        if (target.id === 'cursor') {
            gameState.clickPower = 1 + target.count * 0.1;
        }

        return `Added ${count} ${target.name}(s).`;
    }

    return 'Unknown admin command. Try: add cookies 10000, set cookies 50000, unlock all, reset.';
}

function setAdminStatus(message) {
    DOM.adminOutput.textContent = message;
}

function resetGame() {
    gameState.cookies = 0;
    gameState.clicks = 0;
    gameState.clickPower = 1;
    gameState.buildings.forEach(building => {
        building.count = 0;
        building.cost = building.baseCost;
    });
    localStorage.removeItem('cookieClickerSave');
}

function startAutoProduction() {
    setInterval(() => {
        const production = calculateCPS();
        gameState.cookies += production / 10;
        updateDisplay({ renderBuildings: false });
    }, AUTO_TICK_MS);

    setInterval(saveGame, SAVE_INTERVAL_MS);
}

function renderBuildings() {
    DOM.buildingsContainer.innerHTML = '';

    gameState.buildings.forEach(building => {
        const canAfford = gameState.cookies >= building.cost;
        const card = document.createElement('div');
        card.className = `building-item${canAfford ? '' : ' disabled'}`;
        card.innerHTML = `
            <div class="building-name">
                <span>${building.name}</span>
                <span class="building-count">${building.count}</span>
            </div>
            <div class="building-info">
                <span class="building-production">+${building.production}/s</span>
                <span class="building-cost">${formatNumber(building.cost)} cookies</span>
            </div>
        `;

        if (canAfford) {
            card.addEventListener('click', () => buyBuilding(building));
        }

        DOM.buildingsContainer.appendChild(card);
    });
}

function buyBuilding(building) {
    if (gameState.cookies < building.cost) {
        return;
    }

    gameState.cookies -= building.cost;
    building.count += 1;
    building.cost = Math.floor(building.baseCost * Math.pow(1.15, building.count));

    if (building.id === 'cursor') {
        gameState.clickPower = 1 + building.count * 0.1;
    }

    updateDisplay();
    saveGame();
}

function calculateCPS() {
    return gameState.buildings.reduce((sum, building) => sum + building.count * building.production, 0);
}

function updateDisplay() {
    DOM.cookiesDisplay.textContent = formatNumber(Math.floor(gameState.cookies));
    DOM.cpsDisplay.textContent = calculateCPS().toFixed(1);
    DOM.clicksDisplay.textContent = gameState.clicks;
    // check for achievements each display update
    checkAchievements();
    if (arguments[0] === undefined || arguments[0].renderBuildings !== false) {
        renderBuildings();
    }
}

function formatNumber(value) {
    const number = Number(value);

    if (number >= 1e30) return `${(number / 1e30).toFixed(2)}Q`;
    if (number >= 1e27) return `${(number / 1e27).toFixed(2)}R`;
    if (number >= 1e24) return `${(number / 1e24).toFixed(2)}Y`;
    if (number >= 1e21) return `${(number / 1e21).toFixed(2)}Z`;
    if (number >= 1e18) return `${(number / 1e18).toFixed(2)}E`;
    if (number >= 1e15) return `${(number / 1e15).toFixed(2)}P`;
    if (number >= 1e12) return `${(number / 1e12).toFixed(2)}T`;
    if (number >= 1e9) return `${(number / 1e9).toFixed(2)}B`;
    if (number >= 1e6) return `${(number / 1e6).toFixed(2)}M`;
    if (number >= 1e3) return `${(number / 1e3).toFixed(2)}K`;

    return number.toString();
}

function saveGame() {
    const save = {
        cookies: gameState.cookies,
        clicks: gameState.clicks,
        clickPower: gameState.clickPower,
        buildings: gameState.buildings.map(({ id, count, cost }) => ({ id, count, cost })),
        upgradesUnlocked: gameState.upgradesUnlocked || [],
        achievementsUnlocked: gameState.achievementsUnlocked || []
    };

    localStorage.setItem('cookieClickerSave', JSON.stringify(save));
}

function loadGame() {
    const saveData = localStorage.getItem('cookieClickerSave');
    if (!saveData) return;

    try {
        const parsed = JSON.parse(saveData);
        gameState.cookies = parsed.cookies || 0;
        gameState.clicks = parsed.clicks || 0;
        gameState.clickPower = parsed.clickPower || 1;

        if (Array.isArray(parsed.buildings)) {
            parsed.buildings.forEach(saved => {
                const target = gameState.buildings.find(b => b.id === saved.id);
                if (target) {
                    target.count = saved.count || 0;
                    target.cost = saved.cost || target.baseCost;
                }
            });
        }
        if (Array.isArray(parsed.upgradesUnlocked)) {
            gameState.upgradesUnlocked = parsed.upgradesUnlocked;
            parsed.upgradesUnlocked.forEach(id => {
                const u = ALL_UPGRADES.find(x => x.id === id);
                if (u) {
                    gameState.buildings.forEach(b => b.production *= u.effect);
                    gameState.clickPower *= u.effect;
                }
            });
        }
        if (Array.isArray(parsed.achievementsUnlocked)) {
            gameState.achievementsUnlocked = parsed.achievementsUnlocked;
        }
    } catch (error) {
        console.warn('Failed to load saved game:', error);
    }
}

document.addEventListener('DOMContentLoaded', init);
