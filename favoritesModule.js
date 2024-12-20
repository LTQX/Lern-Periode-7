import { manageFavorites, getFavorites } from './api.js';

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
    `;

	document.body.appendChild(notification);

	setTimeout(() => {
		document.body.removeChild(notification);
	}, 3000);
}

export function renderFavoritesManagement() {
	const favoritesList = document.getElementById('favorites-list');
	const favoritesTableBody = document.getElementById('favorites-table-body');

	if (!favoritesList || !favoritesTableBody) return;

	const favorites = getFavorites();

	favoritesList.innerHTML = favorites
		.map(
			(player) => `
        <li>
            <img src="${player.thumbnail || 'placeholder.jpg'}" alt="${player.name}">
            <div class="player-info">
                <strong>${player.name}</strong>
                <p>${player.position || 'Unknown Position'}</p>
                <p>${player.team || 'Unknown Team'}</p>
                <p>Title: <span class="player-title" data-id="${player.id}">${player.title || 'My Favorite'}</span></p>
            </div>
            <div class="favorite-actions">
                <button class="edit-title btn btn-sm btn-primary" data-id="${player.id}">
                    <i class="fas fa-edit"></i> Edit Title
                </button>
                <button class="remove-favorite btn btn-sm btn-danger" data-id="${player.id}">
                    <i class="fas fa-trash"></i> Remove
                </button>
            </div>
        </li>
    `
		)
		.join('');

	favoritesTableBody.innerHTML = favorites
		.map(
			(player) => `
        <tr>
            <td><img src="${player.thumbnail || 'placeholder.jpg'}" alt="${player.name}" width="50"></td>
            <td>${player.name}</td>
            <td>${player.position || 'Unknown Position'}</td>
            <td>${player.team || 'Unknown Team'}</td>
            <td>
                <div class="title-container">
                    <span class="player-title" data-id="${player.id}">${player.title || 'My Favorite'}</span>
                    <button class="edit-title btn btn-sm btn-primary" data-id="${player.id}">
                        <i class="fas fa-edit"></i>
                    </button>
                </div>
            </td>
            <td>
                <button class="remove-favorite btn btn-danger" data-id="${player.id}">
                    <i class="fas fa-trash"></i> Remove
                </button>
            </td>
        </tr>
    `
		)
		.join('');

	const removeButtons = document.querySelectorAll('.remove-favorite');
	removeButtons.forEach((button) => {
		button.addEventListener('click', () => {
			const playerId = button.getAttribute('data-id');
			const playerToRemove = favorites.find((p) => p.id === playerId);

			if (playerToRemove) {
				manageFavorites('remove', playerToRemove);
				showNotification('Player removed from favorites!');
				renderFavoritesManagement();
			}
		});
	});

	const editTitleButtons = document.querySelectorAll('.edit-title');
	editTitleButtons.forEach((button) => {
		button.addEventListener('click', () => {
			const playerId = button.getAttribute('data-id');
			const titleSpan = document.querySelector(`.player-title[data-id="${playerId}"]`);

			const input = document.createElement('input');
			input.type = 'text';
			input.value = titleSpan.textContent;
			input.classList.add('form-control', 'mb-2');

			const saveButton = document.createElement('button');
			saveButton.textContent = 'Save';
			saveButton.classList.add('btn', 'btn-success', 'btn-sm');

			titleSpan.replaceWith(input);
			input.focus();

			const saveTitle = () => {
				const newTitle = input.value.trim() || 'My Favorite';

				const playerToUpdate = favorites.find((p) => p.id === playerId);
				if (playerToUpdate) {
					manageFavorites('updateTitle', {
						...playerToUpdate,
						title: newTitle
					});

					const newTitleSpan = document.createElement('span');
					newTitleSpan.textContent = newTitle;
					newTitleSpan.classList.add('player-title');
					newTitleSpan.setAttribute('data-id', playerId);
					input.replaceWith(newTitleSpan);

					showNotification('Title updated successfully!');
					renderFavoritesManagement();
				}
			};

			saveButton.addEventListener('click', saveTitle);
			input.addEventListener('keypress', (e) => {
				if (e.key === 'Enter') {
					saveTitle();
				}
			});

			input.after(saveButton);
		});
	});
}
