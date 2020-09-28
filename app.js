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

			// Normal click
			square.addEventListener('click', function (e) {
				click(square);
			});
		}

		// Add numbers
		for (let i = 0; i < squares.length; i++) {
			let total = 0;
			const isLeftEdge = i % width === 0;
			const isRightEdge = i % width === width - 1;

			if (squares[i].classList.contains('valid')) {
				if (i > 0 && !isLeftEdge && squares[i - 1].classList.contains('bomb')) total++;
				if (i > 9 && !isRightEdge && squares[i + 1 - width].classList.contains('bomb'))
					if (i > 10 && squares[i - width].classList.contains('bomb')) total++;
				if (i > 11 && !isLeftEdge && squares[i - 1 - width].classList.contains('bomb'))
					total++;
				if (i < 98 && !isRightEdge && squares[i + 1].classList.contains('bomb')) total++;
				if (i < 90 && !isLeftEdge && squares[i - 1 + width].classList.contains('bomb'))
					total++;
				if (i < 88 && !isRightEdge && squares[i + 1 + width].classList.contains('bomb'))
					total++;
				if (i < 89 && squares[i + width].classList.contains('bomb')) total++;
				squares[i].setAttribute('data', total);
				console.log(squares[i]);
			}
		}
	}
	createBoard();
});

// Click functions
function click(square) {
	if (square.classList.contains('bomb')) {
		console.log('You lose.');
	} else {
		let total = square.getAttribute('data');
		if (total != 0) {
			square.classList.add('checked');
		}
	}
}
