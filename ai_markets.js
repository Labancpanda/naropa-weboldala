const modelMarkets = [
    {
        model: 'OpenAI GPT-5',
        marketQuestion: 'Will GPT-5 be released before Jan 1, 2027?',
        yesProbability: 0.63,
        deadlineIso: '2026-12-31T23:59:59Z',
        expectedReleaseIso: '2026-10-15',
        sourceUrl: 'https://polymarket.com/',
    },
    {
        model: 'Anthropic Claude 4.5',
        marketQuestion: 'Will Anthropic release Claude 4.5 in 2026?',
        yesProbability: 0.52,
        deadlineIso: '2026-12-31T23:59:59Z',
        expectedReleaseIso: '2026-11-10',
        sourceUrl: 'https://polymarket.com/',
    },
    {
        model: 'Google Gemini 3.0',
        marketQuestion: 'Will Gemini 3.0 launch before Dec 31, 2026?',
        yesProbability: 0.47,
        deadlineIso: '2026-12-31T23:59:59Z',
        expectedReleaseIso: '2026-12-01',
        sourceUrl: 'https://polymarket.com/',
    },
    {
        model: 'Meta Llama 5',
        marketQuestion: 'Will Meta launch Llama 5 by Q4 2026?',
        yesProbability: 0.58,
        deadlineIso: '2026-10-31T23:59:59Z',
        expectedReleaseIso: '2026-09-20',
        sourceUrl: 'https://polymarket.com/',
    },
    {
        model: 'xAI Grok 4',
        marketQuestion: 'Will xAI release Grok 4 before 2027?',
        yesProbability: 0.41,
        deadlineIso: '2026-12-31T23:59:59Z',
        expectedReleaseIso: '2026-12-15',
        sourceUrl: 'https://polymarket.com/',
    },
];

function formatDate(isoDate) {
    return new Date(isoDate).toLocaleDateString('hu-HU', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
}

function formatPercent(value) {
    return `${Math.round(value * 100)}%`;
}

function renderSnapshotMeta() {
    const snapshotMeta = document.getElementById('snapshot-meta');
    const previousSnapshot = localStorage.getItem('aiMarketSnapshotAt');
    const snapshotAt = previousSnapshot || new Date().toISOString();

    if (!previousSnapshot) {
        localStorage.setItem('aiMarketSnapshotAt', snapshotAt);
    }

    snapshotMeta.textContent = `Helyi snapshot időpontja: ${formatDate(snapshotAt)} (${new Date(snapshotAt).toLocaleTimeString('hu-HU')})`;
}

function renderCards() {
    const grid = document.getElementById('model-card-grid');
    grid.innerHTML = '';

    modelMarkets.forEach((item) => {
        const card = document.createElement('article');
        card.className = 'model-card';

        const probability = document.createElement('div');
        probability.className = 'model-probability';
        probability.textContent = formatPercent(item.yesProbability);

        const probabilityBar = document.createElement('div');
        probabilityBar.className = 'probability-bar';
        const barFill = document.createElement('div');
        barFill.className = 'probability-bar-fill';
        barFill.style.width = `${item.yesProbability * 100}%`;
        probabilityBar.appendChild(barFill);

        card.innerHTML = `
            <h3>${item.model}</h3>
            <p class="market-question">${item.marketQuestion}</p>
            <p><strong>Várható megjelenés:</strong> ${formatDate(item.expectedReleaseIso)}</p>
            <p><strong>Piac határideje:</strong> ${formatDate(item.deadlineIso)}</p>
            <p><a href="${item.sourceUrl}" target="_blank" rel="noopener noreferrer">Polymarket forrás</a></p>
        `;

        card.insertBefore(probability, card.children[1]);
        card.appendChild(probabilityBar);

        grid.appendChild(card);
    });
}

function renderTimeline() {
    const timeline = document.getElementById('deadline-timeline');
    timeline.innerHTML = '';

    const sorted = [...modelMarkets].sort(
        (a, b) => new Date(a.deadlineIso).getTime() - new Date(b.deadlineIso).getTime(),
    );

    sorted.forEach((item) => {
        const row = document.createElement('div');
        row.className = 'timeline-row';

        row.innerHTML = `
            <div class="timeline-date">${formatDate(item.deadlineIso)}</div>
            <div class="timeline-content">
                <strong>${item.model}</strong>
                <span>${formatPercent(item.yesProbability)} esély</span>
            </div>
        `;

        timeline.appendChild(row);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const refreshBtn = document.getElementById('refresh-snapshot-btn');

    refreshBtn.addEventListener('click', () => {
        localStorage.setItem('aiMarketSnapshotAt', new Date().toISOString());
        renderSnapshotMeta();
    });

    renderSnapshotMeta();
    renderCards();
    renderTimeline();
});
