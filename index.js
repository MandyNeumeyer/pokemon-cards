const input = document.querySelector('#input');
const pokemonContainer = document.querySelector('.pokemon-container')
const pokemonElement = document.createElement("div")
pokemonElement.classList.add("pokemon-element")
const btn = document.querySelector('button')
btn.addEventListener('click', fetchData)



async function fetchData(e) {
    e.preventDefault()
    input.setAttribute('placeholder', "search pokemon ...")
    const url = await `https://pokeapi.co/api/v2/pokemon/${input.value.toLowerCase()}`
    console.log(input);
    if (!input.value){
        input.setAttribute('placeholder', "nothing was entered?")
    }
    input.value = ""
    if (pokemonContainer.children.length > 0) {
        pokemonContainer.removeChild(pokemonElement)
    }
    fetch(url)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('response was not ok.')
            }
        })
        .then((data) => {
            console.log(data);
            const pokemonObj = {
                name: data.name,
                imgFront: data.sprites.front_default,
                stats: data.stats,
                abilities: data.abilities
            };
            displayData(pokemonObj)
        })
        .catch((error) => {
            console.log('Something went wrong.', error);
        });
}

function displayData(obj) {

    pokemonElement.innerHTML =
        `<h2>${obj.name}</h2>
        <img src="${obj.imgFront}"/>
            <h3>stats</h3>
        <ul>
			${obj.stats.map(stat =>
            `<li class='stat'><span>${stat.stat.name}</span><span>${stat.base_stat}</span></li>`).join('')}
		</ul>
            <h3>abilities</h3>
        <ul>
			${obj.abilities.map(power =>
                `<li class='ability'>${power.ability.name}</li>`).join('')}
		</ul>
                            `
    pokemonContainer.appendChild(pokemonElement)
}
