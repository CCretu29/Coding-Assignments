const API_URL = 'https://pokeapi.co/api/v2/pokemon/'; // Base URL for the Pokémon API
const pokemonContainer = document.getElementById('pokemon-container'); // Get the container to display Pokémon cards
const loadButton = document.getElementById('load-pokemon'); // Get the button to load Pokémon
const battleButton = document.getElementById('battle-button'); // Get the button to initiate a battle
const battleResult = document.getElementById('battle-result'); // Get the element to display battle results

// Function to fetch and display a Pokémon by its ID
async function fetchPokemon(id) {
    try {
        const response = await fetch(`${API_URL}${id}`); // Fetch Pokémon data from the API
        const data = await response.json(); // Parse the response as JSON
        displayPokemon(data); // Call function to display the Pokémon
    } catch (error) {
        console.error('Error fetching Pokémon:', error); // Log any errors during the fetch process
    }
}

// Function to create and display a Pokémon card
function displayPokemon(pokemon) {
    const card = document.createElement('div'); // Create a new div for the Pokémon card
    card.classList.add('pokemon-card'); // Add a class to the card for styling
    
    // Set the inner HTML of the card with the Pokémon's image, name, and stats
    card.innerHTML = `
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}"> <!-- Pokémon image -->
        <div class="pokemon-name">${pokemon.name}</div> <!-- Pokémon name -->
        <div class="pokemon-stats">HP: ${pokemon.stats[0].base_stat}</div> <!-- Pokémon HP -->
        <div class="pokemon-stats">Attack: ${pokemon.stats[1].base_stat}</div> <!-- Pokémon Attack -->
        <div class="pokemon-stats">Defense: ${pokemon.stats[2].base_stat}</div> <!-- Pokémon Defense -->
    `;
    
    pokemonContainer.appendChild(card); // Append the card to the Pokémon container
}

// Load multiple Pokémon when the load button is clicked
loadButton.addEventListener('click', () => {
    pokemonContainer.innerHTML = ''; // Clear existing Pokémon cards from the container
    // Generate an array of 3 random Pokémon IDs from 1 to 151
    const randomIds = Array.from({ length: 3 }, () => Math.floor(Math.random() * 151) + 1);
    randomIds.forEach(id => fetchPokemon(id)); // Fetch Pokémon data for each random ID
});

// Battle between the displayed Pokémon when the battle button is clicked
battleButton.addEventListener('click', () => {
    const cards = document.querySelectorAll('.pokemon-card'); // Get all Pokémon cards displayed
    // Check if there are at least 2 Pokémon cards to battle
    if (cards.length < 2) {
        battleResult.textContent = 'You need at least 2 Pokémon to battle!'; // Display a message if not enough Pokémon
        return; // Exit the function
    }

    // Map through the cards to create an array of Pokémon with their names and attack stats
    const [pokemon1, pokemon2] = Array.from(cards).map(card => {
        return {
            name: card.querySelector('.pokemon-name').textContent, // Get Pokémon name
            attack: parseInt(card.querySelector('.pokemon-stats:nth-child(3)').textContent.split(': ')[1]) // Get attack value
        };
    });

    // Compare attack values to determine the winner
    if (pokemon1.attack > pokemon2.attack) {
        battleResult.textContent = `${pokemon1.name} wins the battle!`; // Display the winner
    } else if (pokemon2.attack > pokemon1.attack) {
        battleResult.textContent = `${pokemon2.name} wins the battle!`; // Display the winner
    } else {
        battleResult.textContent = 'It\'s a draw!'; // Display a draw message if attacks are equal
    }
});
