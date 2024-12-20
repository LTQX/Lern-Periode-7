const EXTERNAL_API_URL = 'https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=';

export async function fetchPlayers(playerName) {
	try {
		const response = await fetch(`${EXTERNAL_API_URL}${playerName}`);
		if (!response.ok) {
			throw new Error('Error fetching player data');
		}
		const data = await response.json();
		return data.player
			? data.player.map((player) => ({
					id: player.idPlayer,
					name: player.strPlayer,
					birthdate: player.dateBorn || 'Unknown',
					position: player.strPosition || 'Unknown',
					team: player.strTeam || 'Unknown',
					nationality: player.strNationality || 'Unknown',
					thumbnail: player.strThumb || '',
					description: player.strDescriptionEN || 'No description available'
				}))
			: [];
	} catch (error) {
		console.error('Error fetching player data:', error.message);
		return [];
	}
}

export function manageFavorites(action, player) {
	const FAVORITES_KEY = 'favoritePlayers';
	let favorites = JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];

	switch (action) {
		case 'add':
			if (!favorites.some((p) => p.id === player.id)) {
				const newFavorite = {
					...player,
					title: 'My Favorite',
					dateAdded: new Date().toISOString()
				};
				favorites.push(newFavorite);
				localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
			}
			break;

		case 'remove':
			favorites = favorites.filter((p) => p.id !== player.id);
			localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
			break;

		case 'updateTitle':
			favorites = favorites.map((p) => (p.id === player.id ? { ...p, title: player.title } : p));
			localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
			break;
	}

	return favorites;
}

export function getFavorites() {
	return JSON.parse(localStorage.getItem('favoritePlayers')) || [];
}

export function getFavoriteById(playerId) {
	const favorites = getFavorites();
	return favorites.find((player) => player.id === playerId) || null;
}

export function isPlayerFavorite(playerId) {
	const favorites = getFavorites();
	return favorites.some((player) => player.id === playerId);
}

export function validateCredentials(username, password) {
	const validUsername = 'admin';
	const validPassword = 'admin';

	return username === validUsername && password === validPassword;
}

export function isAuthenticated() {
	return localStorage.getItem('loggedIn') === 'true';
}

export function logout() {
	localStorage.removeItem('loggedIn');
}

export function setLoginState() {
	localStorage.setItem('loggedIn', 'true');
}
