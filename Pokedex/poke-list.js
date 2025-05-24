const MAX_POKEMON = 100000;
const listWrapper = document.querySelector(".list-wrapper");
const searchInput = document.querySelector("#search-inout");
const numberFilter = document.querySelector("#number");
const nameFilter = document.querySelector("#name");
const notFoundMessage = document.querySelector("#not-found-message");

let allPokemon = [];


fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
    .then((response) => response.json())
    .then((data) => {
        allPokemon = data.results;
        displayPokemons(allPokemon);
    })
    .catch((error) => {
        console.error("Failed to fetch Pokemon list:", error);
    });

async function fetchPokemonDataBeforeRedirect(id) {
    if (!id) {
        console.error("Invalid ID:", id);
        return false;
    }
    try {
        console.log(`Fetching data for ID: ${id}`);
        const [pokemon, pokemonSpecies] = await Promise.all([
            fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) => res.json()),
            fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then((res) => res.json()),
        ]);
        console.log("Fetched data successfully:", { pokemon, pokemonSpecies });
        return true;
    } catch (error) {
        console.error("Failed to fetch Pokemon data before redirect:", error);
        return false;
    }
}

function displayPokemons(pokemonList) {
    listWrapper.innerHTML = "";

    if (pokemonList.length === 0) {
        notFoundMessage.style.display = "block";
        return;
    }

    notFoundMessage.style.display = "none";

    pokemonList.forEach((pokemon) => {
        const pokemonID = pokemon.url.split("/")[6];

        const listItem = document.createElement("div");
        listItem.className = "list-item";
        listItem.innerHTML = `
      <div class="number-wrap">
        <p class="caption-fonts">#${pokemonID}</p>
      </div>
      <div class="img-wrap">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonID}.png" alt="Pokemon ${pokemon.name}"/>
      </div>
      <div class="name-wrap">
        <p class="body3-fonts">${pokemon.name}</p>
      </div>
    `;

        listItem.addEventListener("click", async () => {
            const success = await fetchPokemonDataBeforeRedirect(pokemonID);
            if (success) {
                window.location.href = `./detail.html?id=${pokemonID}`;
            }
        });

        listWrapper.appendChild(listItem);
    });
}

                                                            
searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase().trim();

    const filteredPokemon = allPokemon.filter((pokemon) => {
        return nameFilter.checked
            ? pokemon.name.toLowerCase().includes(query)
            : pokemon.url.split("/")[6].startsWith(query);
    });

    displayPokemons(filteredPokemon);
});


[numberFilter, nameFilter].forEach((filter) => {
    filter.addEventListener("change", () => {
        const sortedPokemon = [...allPokemon];

        if (numberFilter.checked) {
            sortedPokemon.sort((a, b) => {
                return parseInt(a.url.split("/")[6], 10) - parseInt(b.url.split("/")[6], 10);
            });
        } else if (nameFilter.checked) {
            sortedPokemon.sort((a, b) => a.name.localeCompare(b.name));
        }

        displayPokemons(sortedPokemon);
    });
});

const closeButton = document.querySelector(".search-close-icon");
closeButton.addEventListener("click", clearSearch);

function clearSearch() {
    searchInput.value = "";
    displayPokemons(allPokemon);
    notFoundMessage.style.display = "none";
}

