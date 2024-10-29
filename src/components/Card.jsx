import { Link } from "react-router-dom"
import { getPokeAPI } from "../services/getPokeAPI";

function Card({ id, allData }) {

    async function getSpecificPokemonData(pokemon) {
        pokemon.preventDefault();
        console.log(`https://pokeapi.co/api/v2/evolution-chain/${pokemon.currentTarget.dataset.index}`);
        if (pokemon.currentTarget.dataset.index) {
            let pokemonSpecies = await getPokeAPI(`https://pokeapi.co/api/v2/evolution-chain/${pokemon.currentTarget.dataset.index}`)
            console.log(pokemonSpecies);
        }
    }

    return (
        <>
            <a id={id} className="card w-2/6 space-between p-2 text-center" data-name={allData.name} data-index={id} data-url={allData.url} onClick={(e) => { getSpecificPokemonData(e) }}>
                <div className="cardInner rounded-lg bg-white p-6">
                    <div className="cardId text-white p-4 rounded-full bg-primary flex items-center justify-center w-[80px] aspect-square mx-auto">
                        <h6>{id}</h6>
                    </div>
                    <div className="pokemonImage pt-2">
                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`} alt="pokeImage" />
                    </div>
                    <div className="pokemonName pt-2 capitalize">
                        <h4>{allData.name}</h4>
                    </div>
                </div>
            </a>
        </>
    )

}

export default Card