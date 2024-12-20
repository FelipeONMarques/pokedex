const pokemonList = document.getElementById("pokemonList")
const loadMoreButton = document.getElementById("loadMoreButton")

const maxRecrods = 151
const limit = 10
let offset = 0




function loadpokemonItems(offset, limit){

    PokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) =>
            `
                <li class="pokemon ${pokemon.type}">
                    <span class="number">#${pokemon.pokeNumber}</span>
                    <span class="name">${pokemon.name}</span>
        
                    <div class="detail">
                        
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join("")}
                        </ol>
                        <img src="${pokemon.photo}" alt="${pokemon.name}">
        
                    </div>
                    
                </li>
            `
        ).join("")
    
        pokemonList.innerHTML += newHtml
        })    
}

loadpokemonItems(offset, limit)

loadMoreButton.addEventListener("click", () => {
    offset += limit

    const qtdRercordWithNextPage = offset + limit

    if(qtdRercordWithNextPage >= maxRecrods){
       const newLimit = maxRecrods - offset
       loadpokemonItems(offset, newLimit)


       loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else{
        loadpokemonItems(offset, limit)
    }
})