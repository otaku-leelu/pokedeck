document.querySelector("#search").addEventListener("click", getPokemon);
document
  .querySelector("#pokemonName")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent default form submission
      getPokemon();
    }
  });

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function lowerCaseName(string) {
  return string.toLowerCase();
}

function getPokemon() {
  const name = document.querySelector("#pokemonName").value;
  const pokemonName = lowerCaseName(name);

  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Pokemon not found");
      }
      return response.json();
    })
    .then((data) => {
      const abilities = data.abilities.slice(0, 3);
      const moves = data.moves.slice(0, 3);

      const abilitiesList = abilities.map((ability) =>
        capitalizeFirstLetter(ability.ability.name)
      );

      const movesList = moves.map((move) =>
        capitalizeFirstLetter(move.move.name)
      );

      document.querySelector(".pokemonBox").innerHTML = `
        <div>
          <img
            src="${data.sprites.other["official-artwork"].front_default}"
            alt="${capitalizeFirstLetter(data.name)}"
          />
        </div>
        <div class="pokemonInfo">
          <h1>${capitalizeFirstLetter(data.name)}</h1>
          <br>
          <p>Height: ${data.height}</p>
          <p>Weight: ${data.weight}</p>
          <p>Abilities: ${abilitiesList.join(", ")}</p>
          <p>Moves: ${movesList.join(", ")}</p>
        </div>
      `;
    })
    .catch((err) => {
      document.querySelector(".pokemonBox").innerHTML =
        "<p>Pokemon not found</p>"; // Display error message
    });
}
