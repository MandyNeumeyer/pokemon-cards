const input = document.querySelector('#input');
const pokemonContainer = document.querySelector('.pokemon-container')
const pokemonElement = document.createElement("div")
pokemonElement.classList.add("pokemon-element")
const btn = document.querySelector('button')
btn.addEventListener('click', fetchData)

input.onfocus=()=> {
    input.setAttribute('placeholder', "search pokemon ...")
    input.style.border='1px solid rgb(226, 107, 226)'
}

async function fetchData(e) {
    e.preventDefault()
    if(!input.value){
        input.style.border = '1px solid red';
        input.setAttribute('placeholder', "nothing entered")
        return
    }
    const userInput = input.value.toLowerCase()
    const url = await `https://pokeapi.co/api/v2/pokemon/${userInput}`
    console.log(input);
    input.value = ""
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
            console.log(error);
            input.setAttribute('placeholder', 'pokemon not found')
            input.style.border = '1px solid red';
        });
    
}

function displayData(obj) {
    if (pokemonContainer.children.length > 0) {
        pokemonContainer.removeChild(pokemonElement)
    }
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
