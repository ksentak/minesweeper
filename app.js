document.addEventListener('DOMContentLoaded', () => {
	const grid = document.querySelector('.grid');
	let width = 10;
	let squares = [];
	let bombCount = 20;

	// Create board
	function createBoard() {
		// Shuffle game with random bombs
		const bombsArray = Array(bombCount).fill('bomb');
		const emptyArray = Array(width * width - bombCount).fill('valid');
		const gameArray = emptyArray.concat(bombsArray);
		const shuffledArray = gameArray.sort(() => Math.random() - 0.5);

		for (let i = 0; i < width * width; i++) {
			const square = document.createElement('div');
			square.setAttribute('id', i);
			square.classList.add(shuffledArray[i]);
			grid.appendChild(square);
			squares.push(square);
		}
	}

	createBoard();
});
