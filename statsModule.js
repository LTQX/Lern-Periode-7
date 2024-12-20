import { getFavorites } from './api.js';

export function renderPlayerStats() {
	try {
		renderTopScorers();
		renderTeamRankings();
		renderRecentPerformances();
		renderFavoritesChart();
	} catch (error) {
		console.error('Error rendering stats:', error);
		showStatsErrorMessage();
	}
}

function renderTopScorers() {
	const topScorersElement = document.getElementById('top-scorers');
	if (!topScorersElement) return;

	topScorersElement.innerHTML = '';

	const topScorers = [
		{ name: 'Lionel Messi', goals: 35 },
		{ name: 'Cristiano Ronaldo', goals: 32 },
		{ name: 'Kylian Mbappé', goals: 28 },
		{ name: 'Erling Haaland', goals: 25 },
		{ name: 'Robert Lewandowski', goals: 22 }
	];

	topScorers.forEach((scorer) => {
		const li = document.createElement('li');
		li.className = 'list-group-item d-flex justify-content-between align-items-center';
		li.innerHTML = `
            ${scorer.name}
            <span class="badge bg-primary rounded-pill">${scorer.goals}</span>
        `;
		topScorersElement.appendChild(li);
	});
}

function renderTeamRankings() {
	const teamRankingsElement = document.getElementById('team-rankings');
	if (!teamRankingsElement) return;

	teamRankingsElement.innerHTML = '';

	const teamRankings = [
		{ name: 'Manchester City', points: 89 },
		{ name: 'Liverpool', points: 85 },
		{ name: 'Arsenal', points: 84 },
		{ name: 'Bayern Munich', points: 82 },
		{ name: 'Paris Saint-Germain', points: 80 }
	];

	teamRankings.forEach((team) => {
		const li = document.createElement('li');
		li.className = 'list-group-item d-flex justify-content-between align-items-center';
		li.innerHTML = `
            ${team.name}
            <span class="badge bg-success rounded-pill">${team.points}</span>
        `;
		teamRankingsElement.appendChild(li);
	});
}

function renderRecentPerformances() {
	const recentPerformancesElement = document.getElementById('recent-performances');
	if (!recentPerformancesElement) return;

	recentPerformancesElement.innerHTML = '';

	const recentPerformances = [
		{ name: 'Lionel Messi', performance: 'Scored 2 goals' },
		{ name: 'Cristiano Ronaldo', performance: 'Assisted 3 times' },
		{ name: 'Kylian Mbappé', performance: 'Man of the match' },
		{ name: 'Erling Haaland', performance: 'Hat-trick' },
		{ name: 'Robert Lewandowski', performance: 'Scored winning goal' }
	];

	recentPerformances.forEach((performance) => {
		const li = document.createElement('li');
		li.className = 'list-group-item';
		li.innerHTML = `
            <strong>${performance.name}</strong>: ${performance.performance}
        `;
		recentPerformancesElement.appendChild(li);
	});
}

function renderFavoritesChart() {
	const chartCanvas = document.getElementById('favorites-chart');
	const noFavoritesMessage = document.getElementById('no-favorites-message');

	if (!chartCanvas || !noFavoritesMessage) return;

	const favorites = getFavorites();

	if (favorites.length === 0) {
		noFavoritesMessage.style.display = 'flex';
		chartCanvas.style.display = 'none';
		return;
	}

	noFavoritesMessage.style.display = 'none';
	chartCanvas.style.display = 'block';

	const script = document.createElement('script');
	script.src = 'https://cdn.jsdelivr.net/npm/chart.js@4.3.0/dist/chart.umd.min.js';
	script.onload = () => {
		createFavoritesChart(favorites);
	};
	document.head.appendChild(script);
}

function createFavoritesChart(favorites) {
	const chartCanvas = document.getElementById('favorites-chart');

	const labels = favorites.map((player) => player.name);
	const teamData = favorites.map((player) => player.team);
	const positionData = favorites.map((player) => player.position);

	if (window.favoritesChart) {
		window.favoritesChart.destroy();
	}

	window.favoritesChart = new Chart(chartCanvas, {
		type: 'bar',
		data: {
			labels: labels,
			datasets: [
				{
					label: 'Teams',
					data: teamData.map(() => 1),
					backgroundColor: 'rgba(54, 162, 235, 0.6)',
					borderColor: 'rgba(54, 162, 235, 1)',
					borderWidth: 1
				},
				{
					label: 'Positions',
					data: positionData.map(() => 1),
					backgroundColor: 'rgba(255, 99, 132, 0.6)',
					borderColor: 'rgba(255, 99, 132, 1)',
					borderWidth: 1
				}
			]
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			scales: {
				y: {
					beginAtZero: true,
					ticks: {
						stepSize: 1
					}
				}
			},
			plugins: {
				legend: {
					display: true,
					position: 'top'
				},
				title: {
					display: true,
					text: 'Favorites Breakdown'
				}
			}
		}
	});
}

function showStatsErrorMessage() {
	const statsSection = document.getElementById('player-stats-section');
	if (statsSection) {
		statsSection.innerHTML = `
            <div class="alert alert-danger text-center">
                <h4>Unable to load stats</h4>
                <p>Please try again later or check your connection.</p>
            </div>
        `;
	}
}
