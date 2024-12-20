import { fetchPlayers, manageFavorites, getFavorites, logout } from './api.js';
import { renderPlayerStats } from './statsModule.js';
import { renderFavoritesManagement } from './favoritesModule.js';

document.addEventListener('DOMContentLoaded', () => {
	if (!localStorage.getItem('loggedIn')) {
		window.location.href = 'login.html';
	}

	const navButtons = {
		search: document.getElementById('nav-search'),
		stats: document.getElementById('nav-stats'),
		favorites: document.getElementById('nav-favorites'),
		logout: document.getElementById('logout')
	};

	const sections = {
		search: document.getElementById('player-search-section'),
		stats: document.getElementById('player-stats-section'),
		favorites: document.getElementById('favorites-management-section')
	};

	function showSection(sectionName) {
		Object.values(sections).forEach((section) => {
			section.classList.remove('active');
		});

		sections[sectionName].classList.add('active');

		switch (sectionName) {
			case 'stats':
				renderPlayerStats();
				break;
			case 'favorites':
				renderFavoritesManagement();
				break;
			case 'search':
				initializePlayerSearch();
				break;
		}
	}

	navButtons.search.addEventListener('click', () => showSection('search'));
	navButtons.stats.addEventListener('click', () => showSection('stats'));
	navButtons.favorites.addEventListener('click', () => showSection('favorites'));

	navButtons.logout.addEventListener('click', () => {
		logout();
		window.location.href = 'login.html';
	});

	function initializePlayerSearch() {
		const searchInput = document.getElementById('search');
		const playerList = document.getElementById('player-list');
		const favoritesList = document.getElementById('favorites-list');

		if (searchInput && playerList) {
			searchInput.addEventListener('input', async (event) => {
				const query = event.target.value.trim();
				playerList.innerHTML = '';

				if (query === '') return;

				try {
					const players = await fetchPlayers(query);
					const favorites = getFavorites();

					players.forEach((player) => {
						const item = document.createElement('li');
						const isFavorite = favorites.some((f) => f.id === player.id);

						item.innerHTML = `
                            <img src="${player.thumbnail || 'placeholder.jpg'}" alt="${player.name}">
                            <div class="player-info">
                                <strong>${player.name}</strong>
                                <p>${player.position || 'Unknown Position'}</p>
                                <p>${player.team || 'Unknown Team'}</p>
                            </div>
                            <button class="add-favorite btn btn-sm ${isFavorite
								? 'btn-secondary disabled'
								: 'btn-success'}">
                                <i class="fas fa-heart"></i> 
                                ${isFavorite ? 'Favorited' : 'Add to Favorites'}
                            </button>
                        `;

						const addButton = item.querySelector('.add-favorite');
						addButton.addEventListener('click', async () => {
							if (!addButton.classList.contains('disabled')) {
								await manageFavorites('add', player);
								showNotification(`${player.name} added to favorites!`);

								addButton.classList.remove('btn-success');
								addButton.classList.add('btn-secondary', 'disabled');
								addButton.innerHTML = '<i class="fas fa-heart"></i> Favorited';

								if (sections.favorites.classList.contains('active')) {
									renderFavoritesManagement();
								}

								updateFavoritesList();
							}
						});

						playerList.appendChild(item);
					});
				} catch (error) {
					console.error('Error searching players:', error);
					showNotification('Error searching players', 'error');
				}
			});
		}

		function updateFavoritesList() {
			const favorites = getFavorites();
			const favoritesList = document.getElementById('favorites-list');

			if (favoritesList) {
				favoritesList.innerHTML = '';

				favorites.forEach((player) => {
					const item = document.createElement('li');
					item.innerHTML = `
                        <img src="${player.thumbnail || 'placeholder.jpg'}" alt="${player.name}">
                        <div class="player-info">
                            <strong>${player.name}</strong>
                            <p>${player.position || 'Unknown Position'}</p>
                            <p>${player.team || 'Unknown Team'}</p>
                        </div>
                    `;
					favoritesList.appendChild(item);
				});
			}
		}

		updateFavoritesList();
	}

	function showNotification(message, type = 'success') {
		const notification = document.createElement('div');
		notification.className = `notification ${type}`;
		notification.textContent = message;

		notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px;
            background-color: ${type === 'success' ? '#4CAF50' : '#F44336'};
            color: white;
            border-radius: 5px;
            z-index: 1000;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            animation: slideIn 0.3s ease-out;
        `;

		document.body.appendChild(notification);

		setTimeout(() => {
			document.body.removeChild(notification);
		}, 3000);
	}

	window.showNotification = showNotification;

	showSection('search');
});
