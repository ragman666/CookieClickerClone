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

const pageType = document.body.dataset.page || 'game';

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
    adminOutput: document.getElementById('adminOutput'),
    usernameInput: document.getElementById('usernameInput'),
    loginBtn: document.getElementById('loginBtn'),
    logoutBtn: document.getElementById('logoutBtn'),
    usernameDisplay: document.getElementById('usernameDisplay'),
    loginStatus: document.getElementById('loginStatus'),
    createStatus: document.getElementById('createStatus')
};

const AUTO_TICK_MS = 100;
const SAVE_INTERVAL_MS = 2000;
const CLICK_ANIMATION_MS = 80;
const UPGRADES_PAGE_SIZE = 50;
const ACHIEVEMENTS_PAGE_SIZE = 50;
const HOLD_DELAY_MS = 250;
const HOLD_REPEAT_MS = 120;
let holdBuyTimer = null;
let holdBuyInterval = null;

function init() {
    const savedUser = getCurrentUser();

    if (pageType === 'login') {
        const accounts = getAccounts();
        if (savedUser) {
            window.location.href = 'index.html';
            return;
        }
        if (accounts.length === 0) {
            window.location.href = 'create-account.html';
            return;
        }

        DOM.usernameInput = document.getElementById('usernameInput');
        DOM.rememberCheckbox = document.getElementById('rememberCheckbox');
        DOM.loginBtn = document.getElementById('loginBtn');
        DOM.loginStatus = document.getElementById('loginStatus');
        DOM.createAccountLink = document.getElementById('createAccountLink');

        if (DOM.loginBtn) {
            DOM.loginBtn.addEventListener('click', handleLogin);
        }
        if (DOM.usernameInput) {
            DOM.usernameInput.addEventListener('keydown', e => { if (e.key === 'Enter') handleLogin(); });
        }
        if (DOM.createAccountLink) {
            DOM.createAccountLink.addEventListener('click', event => {
                event.preventDefault();
                window.location.href = 'create-account.html';
            });
        }
        return;
    }
    if (pageType === 'create') {
        if (savedUser) {
            window.location.href = 'index.html';
            return;
        }

        DOM.usernameInput = document.getElementById('usernameInput');
        DOM.rememberCheckbox = document.getElementById('rememberCheckbox');
        DOM.createAccountBtn = document.getElementById('createAccountBtn');
        DOM.createStatus = document.getElementById('createStatus');
        DOM.loginLink = document.getElementById('loginLink');

        if (DOM.createAccountBtn) {
            DOM.createAccountBtn.addEventListener('click', handleCreateAccount);
        }
        if (DOM.usernameInput) {
            DOM.usernameInput.addEventListener('keydown', e => { if (e.key === 'Enter') handleCreateAccount(); });
        }
        if (DOM.loginLink) {
            DOM.loginLink.addEventListener('click', event => {
                event.preventDefault();
                window.location.href = 'login.html';
            });
        }
        return;
    }

    if (!savedUser) {
        const accounts = getAccounts();
        if (accounts.length === 0) {
            window.location.href = 'create-account.html';
        } else {
            window.location.href = 'login.html';
        }
        return;
    }

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
        DOM.buyAllUpgradesBtn.addEventListener('click', () => buyAllUpgrades(false));
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

    if (DOM.cookieBtn) {
        DOM.cookieBtn.addEventListener('click', handleCookieClick);
    }
    if (DOM.adminExecuteBtn) {
        DOM.adminExecuteBtn.addEventListener('click', handleAdminCommand);
    }
    if (DOM.adminCommandInput) {
        DOM.adminCommandInput.addEventListener('keydown', event => {
            if (event.key === 'Enter') {
                handleAdminCommand();
            }
        });
    }

    if (DOM.adminAddCookieAmountBtn) {
        DOM.adminAddCookieAmountBtn.addEventListener('click', adminAddCookieAmount);
    }
    if (DOM.adminAddBuildingBtn) {
        DOM.adminAddBuildingBtn.addEventListener('click', adminAddBuilding);
    }
    if (DOM.adminAddCookiesBtn) {
        DOM.adminAddCookiesBtn.addEventListener('click', () => runAdminCommand('add cookies 100000'));
    }
    if (DOM.adminAddMillionCookiesBtn) {
        DOM.adminAddMillionCookiesBtn.addEventListener('click', () => runAdminCommand('add cookies 1000000'));
    }
    if (DOM.adminUnlockBtn) {
        DOM.adminUnlockBtn.addEventListener('click', () => runAdminCommand('unlock all'));
    }
    if (DOM.adminExportBtn) {
        DOM.adminExportBtn.addEventListener('click', exportSaveData);
    }
    if (DOM.adminImportBtn) {
        DOM.adminImportBtn.addEventListener('click', importSaveData);
    }
    if (DOM.adminResetBtn) {
        DOM.adminResetBtn.addEventListener('click', () => runAdminCommand('reset'));
    }

    DOM.usernameInput = document.getElementById('usernameInput');
    DOM.loginBtn = document.getElementById('loginBtn');
    DOM.logoutBtn = document.getElementById('logoutBtn');
    DOM.usernameDisplay = document.getElementById('usernameDisplay');

    if (DOM.logoutBtn) {
        DOM.logoutBtn.addEventListener('click', handleLogout);
    }

    // show loaded username
    updateUsernameDisplay();
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
        const canBuy = !unlocked && gameState.cookies >= u.cost;
        const displayCost = unlocked ? 'Purchased' : formatNumber(u.cost);
        const card = document.createElement('div');
        card.className = `upgrade-item${unlocked ? ' bought' : ''}${canBuy ? '' : ' disabled'}`;
        card.innerHTML = `<div style="display:flex;justify-content:space-between;align-items:center;"><strong>${u.name}</strong><span class="upgrade-status">${displayCost}</span></div><div style="font-size:0.85rem;color:#d4c3a8;margin-top:6px">${u.description}</div>`;
        // Always attach a click handler so clicks work even if affordability changes
        card.addEventListener('click', () => {
            if (unlocked) return;
            if (gameState.cookies >= u.cost) {
                buyUpgrade(u.id);
            } else {
                setAdminStatus('Not enough cookies for upgrade.');
                showNotification('Not enough cookies for that upgrade.');
            }
        });
        DOM.upgradesContainer.appendChild(card);
    }
    upgradesRenderIndex = end;
    // hide load-more when finished
    if (DOM.loadMoreUpgrades) {
        DOM.loadMoreUpgrades.style.display = upgradesRenderIndex >= ALL_UPGRADES.length ? 'none' : '';
    }
}

function refreshUpgradesDisplay() {
    if (!DOM.upgradesContainer) return;
    const cards = Array.from(DOM.upgradesContainer.children);
    cards.forEach((card, index) => {
        const u = ALL_UPGRADES[index];
        if (!u) return;
        const unlocked = gameState.upgradesUnlocked.includes(u.id);
        const canBuy = !unlocked && gameState.cookies >= u.cost;
        const displayCost = unlocked ? 'Purchased' : formatNumber(u.cost);
        card.className = `upgrade-item${unlocked ? ' bought' : ''}${canBuy ? '' : ' disabled'}`;
        card.innerHTML = `<div style="display:flex;justify-content:space-between;align-items:center;"><strong>${u.name}</strong><span class="upgrade-status">${displayCost}</span></div><div style="font-size:0.85rem;color:#d4c3a8;margin-top:6px">${u.description}</div>`;
        card.onclick = canBuy ? () => buyUpgrade(u.id) : null;
    });
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
    refreshUpgradesDisplay();
    saveGame();
}

function buyAllUpgrades(retried = false) {
    const affordableUpgrades = ALL_UPGRADES
        .filter(u => !gameState.upgradesUnlocked.includes(u.id) && gameState.cookies >= u.cost)
        .sort((a, b) => a.cost - b.cost);

    if (!affordableUpgrades.length) {
        if (!retried) {
            const TEST_COOKIE_GRANT = 10000; // small test amount
            setAdminStatus('No affordable upgrades available. Granting test cookies.');
            gameState.cookies += TEST_COOKIE_GRANT;
            showNotification(`Added ${formatNumber(TEST_COOKIE_GRANT)} test cookies to try upgrades.`);
            if (DOM.upgradesContainer) {
                DOM.upgradesContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            updateDisplay();
            saveGame();
            // retry once after granting
            setTimeout(() => buyAllUpgrades(true), 150);
            return;
        }

        // already retried once and still nothing affordable
        setAdminStatus('No affordable upgrades available even after granting test cookies.');
        showNotification('Still no affordable upgrades available.');
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
        refreshUpgradesDisplay();
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

function refreshAchievementsDisplay() {
    if (!DOM.achievementsContainer) return;
    const cards = Array.from(DOM.achievementsContainer.children);
    cards.forEach((card, index) => {
        const a = ALL_ACHIEVEMENTS[index];
        if (!a) return;
        const unlocked = gameState.achievementsUnlocked.includes(a.id);
        card.className = `achievement-item${unlocked ? ' unlocked' : ''}`;
        card.innerHTML = `<div style="display:flex;justify-content:space-between;align-items:center;"><strong>${a.name}</strong>${unlocked ? '<span class="achievement-badge">Unlocked</span>' : ''}</div><div style="font-size:0.85rem;color:#d4c3a8;margin-top:6px">${a.description}</div>`;
    });
    if (DOM.achCount) DOM.achCount.textContent = gameState.achievementsUnlocked.length;
    if (DOM.loadMoreAchievements) {
        DOM.loadMoreAchievements.style.display = achievementsRenderIndex >= ALL_ACHIEVEMENTS.length ? 'none' : '';
    }
}

function checkAchievements() {
    const cookiesTotal = Math.floor(gameState.cookies + gameState.buildings.reduce((s,b) => s + b.count * b.baseCost,0));
    // simple: check by total cookies (could be extended)
    ALL_ACHIEVEMENTS.forEach(a => {
        if (!gameState.achievementsUnlocked.includes(a.id) && cookiesTotal >= a.threshold) {
            gameState.achievementsUnlocked.push(a.id);
            setAdminStatus(`Achievement unlocked: ${a.name}`);
            showNotification(`Achievement unlocked: ${a.name}`);
        }
    });
    // refresh current page so unlocked badges appear without collapsing loaded pages
    if (DOM.achievementsContainer) refreshAchievementsDisplay();
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

    if (command === 'reset accounts') {
        resetAccounts();
        return 'All accounts have been reset.';
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

    return 'Unknown admin command. Try: add cookies 10000, set cookies 50000, unlock all, reset, reset accounts.';
}

function resetAccounts() {
    localStorage.removeItem('cookieClickerAccounts');
    clearCurrentUser();
}

function setAdminStatus(message) {
    if (DOM.adminOutput) {
        DOM.adminOutput.textContent = message;
    } else if (DOM.loginStatus) {
        DOM.loginStatus.textContent = message;
    } else if (DOM.createStatus) {
        DOM.createStatus.textContent = message;
    } else {
        console.log(message);
    }
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

function getAccounts() {
    const raw = localStorage.getItem('cookieClickerAccounts');
    if (!raw) return [];
    try {
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return [];

        let normalized = [];
        let changed = false;

        parsed.forEach(item => {
            if (item && typeof item.username === 'string') {
                const account = { username: item.username };
                normalized.push(account);
                if ('password' in item) {
                    changed = true;
                }
            }
        });

        if (changed) {
            saveAccounts(normalized);
        }

        return normalized;
    } catch {
        return [];
    }
}

function saveAccounts(accounts) {
    localStorage.setItem('cookieClickerAccounts', JSON.stringify(accounts));
}

function findAccount(username) {
    return getAccounts().find(account => account.username === username);
}

function getCurrentUser() {
    return localStorage.getItem('cookieClickerUser') || sessionStorage.getItem('cookieClickerUser') || '';
}

function clearCurrentUser() {
    localStorage.removeItem('cookieClickerUser');
    sessionStorage.removeItem('cookieClickerUser');
}

function setCurrentUser(username, remember = false) {
    if (remember) {
        localStorage.setItem('cookieClickerUser', username);
        sessionStorage.removeItem('cookieClickerUser');
    } else {
        sessionStorage.setItem('cookieClickerUser', username);
        localStorage.removeItem('cookieClickerUser');
    }
    gameState.username = username;
}

// --- Login / username handling ---
function updateUsernameDisplay() {
    const saved = getCurrentUser();
    const name = saved || gameState.username || '';
    gameState.username = name || '';
    if (DOM.usernameDisplay) DOM.usernameDisplay.textContent = name ? name : 'Guest';
    if (DOM.usernameInput) DOM.usernameInput.value = '';
    if (DOM.loginBtn) DOM.loginBtn.style.display = name ? 'none' : '';
    if (DOM.logoutBtn) DOM.logoutBtn.style.display = name ? '' : 'none';
}

async function handleLogin() {
    if (!DOM.usernameInput) return setAdminStatus('Login control missing.');
    const name = DOM.usernameInput.value.trim();
    if (!name) return setAdminStatus('Enter a username to login.');

    const account = findAccount(name);
    if (!account) {
        return setAdminStatus('Account not found. Create one first.');
    }

    const remember = DOM.rememberCheckbox?.checked === true;
    setCurrentUser(name, remember);
    saveGame();
    updateUsernameDisplay();
    setAdminStatus(`Logged in as ${name}.`);
    showNotification(`Welcome, ${name}`);

    window.location.href = 'index.html';
}

function handleCreateAccount() {
    if (!DOM.usernameInput) return setAdminStatus('Create account controls missing.');
    const name = DOM.usernameInput.value.trim();
    if (!name) return setAdminStatus('Enter a username to create an account.');

    const existing = findAccount(name);
    if (existing) {
        return setAdminStatus('That username is already taken. Choose another.');
    }

    const accounts = getAccounts();
    accounts.push({ username: name });
    saveAccounts(accounts);
    const remember = DOM.rememberCheckbox?.checked === true;
    setCurrentUser(name, remember);
    saveGame();
    setAdminStatus(`Account created for ${name}. Redirecting to game...`);
    showNotification(`Account created for ${name}`);

    window.location.href = 'index.html';
}

function handleLogout() {
    gameState.username = '';
    clearCurrentUser();
    saveGame();
    updateUsernameDisplay();
    setAdminStatus('Logged out.');
    if (pageType === 'game') {
        window.location.href = 'login.html';
    }
}

function startAutoProduction() {
    setInterval(() => {
        const production = calculateCPS();
        gameState.cookies += production / 10;
        updateDisplay({ renderBuildings: false });
    }, AUTO_TICK_MS);

    setInterval(saveGame, SAVE_INTERVAL_MS);
}

function stopHoldBuy() {
    document.removeEventListener('mouseup', stopHoldBuy);
    document.removeEventListener('touchend', stopHoldBuy);
    document.removeEventListener('touchcancel', stopHoldBuy);

    if (holdBuyTimer) {
        clearTimeout(holdBuyTimer);
        holdBuyTimer = null;
    }
    if (holdBuyInterval) {
        clearInterval(holdBuyInterval);
        holdBuyInterval = null;
    }
}

function startHoldBuy(building, card) {
    stopHoldBuy();
    buyBuilding(building, { renderBuildings: false, card });

    document.addEventListener('mouseup', stopHoldBuy);
    document.addEventListener('touchend', stopHoldBuy);
    document.addEventListener('touchcancel', stopHoldBuy);

    holdBuyTimer = setTimeout(() => {
        holdBuyInterval = setInterval(() => {
            if (gameState.cookies < building.cost) {
                stopHoldBuy();
                return;
            }
            buyBuilding(building, { renderBuildings: false, card });
        }, HOLD_REPEAT_MS);
    }, HOLD_DELAY_MS);
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
                <span class="building-production">+${formatNumber(building.production, 3)}/s</span>
                <span class="building-cost">${formatNumber(building.cost)} cookies</span>
            </div>
        `;

        if (canAfford) {
            card.addEventListener('mousedown', event => {
                if (event.button !== 0) return;
                event.preventDefault();
                startHoldBuy(building, card);
            });
            card.addEventListener('touchstart', event => {
                event.preventDefault();
                startHoldBuy(building, card);
            }, { passive: false });
            card.addEventListener('mouseleave', stopHoldBuy);
            card.addEventListener('blur', stopHoldBuy);
        }

        DOM.buildingsContainer.appendChild(card);
    });
}

function updateBuildingCard(card, building) {
    const canAfford = gameState.cookies >= building.cost;
    card.className = `building-item${canAfford ? '' : ' disabled'}`;
    card.innerHTML = `
            <div class="building-name">
                <span>${building.name}</span>
                <span class="building-count">${building.count}</span>
            </div>
            <div class="building-info">
                <span class="building-production">+${formatNumber(building.production, 3)}/s</span>
                <span class="building-cost">${formatNumber(building.cost)} cookies</span>
            </div>
        `;
}

function buyBuilding(building, options = {}) {
    if (gameState.cookies < building.cost) {
        return;
    }

    const { renderBuildings = true, card = null } = options;

    gameState.cookies -= building.cost;
    building.count += 1;
    building.cost = Math.floor(building.baseCost * Math.pow(1.15, building.count));

    if (building.id === 'cursor') {
        gameState.clickPower = 1 + building.count * 0.1;
    }

    if (card && !renderBuildings) {
        updateBuildingCard(card, building);
    }

    updateDisplay({ renderBuildings });
    saveGame();
}

function calculateCPS() {
    return gameState.buildings.reduce((sum, building) => sum + building.count * building.production, 0);
}

function updateDisplay(options) {
    const opts = options || {};
    DOM.cookiesDisplay.textContent = formatNumber(Math.floor(gameState.cookies));
    DOM.cpsDisplay.textContent = calculateCPS().toFixed(1);
    DOM.clicksDisplay.textContent = gameState.clicks;
    // check for achievements each display update
    checkAchievements();
    if (opts.renderBuildings !== false) {
        renderBuildings();
    }
    // refresh upgrades affordance without resetting loaded pages
    if (opts.renderUpgrades !== false) {
        refreshUpgradesDisplay();
    }
    if (opts.renderAchievements !== false) {
        refreshAchievementsDisplay();
    }
}

function formatNumber(value, precision = 2) {
    const number = Number(value);
    if (Number.isNaN(number)) return '0';

    const format = num => num.toFixed(precision).replace(/\.0+$|(?<=\.[0-9]*[1-9])0+$/g, '');

    if (number >= 1e30) return `${format(number / 1e30)}Q`;
    if (number >= 1e27) return `${format(number / 1e27)}R`;
    if (number >= 1e24) return `${format(number / 1e24)}Y`;
    if (number >= 1e21) return `${format(number / 1e21)}Z`;
    if (number >= 1e18) return `${format(number / 1e18)}E`;
    if (number >= 1e15) return `${format(number / 1e15)}P`;
    if (number >= 1e12) return `${format(number / 1e12)}T`;
    if (number >= 1e9) return `${format(number / 1e9)}B`;
    if (number >= 1e6) return `${format(number / 1e6)}M`;
    if (number >= 1e3) return `${format(number / 1e3)}K`;

    return format(number);
}

function saveGame() {
    const save = {
        cookies: gameState.cookies,
        clicks: gameState.clicks,
        clickPower: gameState.clickPower,
        buildings: gameState.buildings.map(({ id, count, cost }) => ({ id, count, cost })),
        upgradesUnlocked: gameState.upgradesUnlocked || [],
        achievementsUnlocked: gameState.achievementsUnlocked || [],
        username: gameState.username || getCurrentUser() || ''
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
        // load username from current session or saved user
        const savedUser = getCurrentUser();
        if (savedUser) {
            gameState.username = savedUser;
        }
    } catch (error) {
        console.warn('Failed to load saved game:', error);
    }
}

document.addEventListener('DOMContentLoaded', init);
