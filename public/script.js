const trainers = [
	{
			name: "Ash",
			pokemonTeam: ["Pikachu", "Charizard", "Bulbasaur", "Squirtle", "Jigglypuff", "Meowth"]
	},
	{
			name: "Misty",
			pokemonTeam: ["Starmie", "Psyduck", "Gyarados", "Togepi", "Politoed", "Corsola"]
	},
	{
			name: "Brock",
			pokemonTeam: ["Onix", "Geodude", "Vulpix", "Zubat", "Croagunk", "Sudowoodo"]
	}
];


function createTrainerContainer(trainer) {
	// Create the main container div
	const trainerContainer = document.createElement('div');
	trainerContainer.classList.add('trainer-container');

	// Create and set the trainer name element
	const trainerNameElement = document.createElement('h2');
	trainerNameElement.textContent = `Trainer ${trainer.name}!`;
	trainerContainer.appendChild(trainerNameElement);

	// Create the list container
	const pokemonList = document.createElement('ul');
	
	// Create and append each list item
	trainer.pokemonTeam.forEach( async (pokemon, index) => {
			pokemon = pokemon.toLowerCase();
			const listItem = document.createElement('li');
			const pokemonPic = document.createElement('img');
			const imageUrl = await getPokemonImage(pokemon);
			pokemonPic.setAttribute("src", imageUrl);
			listItem.textContent = `${pokemon}`;
			listItem.appendChild(pokemonPic);
			pokemonList.appendChild(listItem);
	});

	// Append the list to the trainer container
	trainerContainer.appendChild(pokemonList);

	return trainerContainer;
}

function createAllTrainerContainers(trainers) {
	const trainersContainer = document.getElementById('trainers-container');

	trainers.forEach(trainer => {
			const trainerContainer = createTrainerContainer(trainer);
			trainersContainer.appendChild(trainerContainer);
	});
}

async function getPokemonImage (name) {
	if (name === "Mr. Mime") name = "mr-mime";
	let result = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
	let body = await result.json();
	return body.sprites.other["official-artwork"].front_default
}

// Call the function with the sample data
createAllTrainerContainers(trainers);