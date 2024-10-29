import { useEffect, useState, useRef, useContext } from "react";
import { getPokeAPI } from "../services/getPokeAPI";
import { dashboardContext } from "./Dashboard";
import { Form } from "react-router-dom";

export default function Search() {

    const { apiData, setApiData } = useContext(dashboardContext);

    const [suggestionList, setSuggestionList] = useState({
        results: [],
    });

    const [searchInput, setSearchInput] = useState("");
    const [showSearchList, setShowSearchList] = useState(false);

    useEffect(() => {
        if (suggestionList.next !== null) {
            let url = suggestionList.next;
            (async function parentFun() {
                let data = await getPokeAPI(url);
                setSuggestionList(prev => ({ ...prev, results: [...prev.results, ...data.results], next: data.next }));
            })()
        }
    }, [suggestionList.next])

    useEffect(() => {
        setApiData((prev) => ({ ...prev, specificPokemn: [] }));
    }, [searchInput])

    function filterOptions(pokemon) {
        setSearchInput(pokemon);
        let allPokemonItems = document.querySelectorAll('.pokemonItem');
        let inputVal = pokemon.toLowerCase();
        for (let item = 0; item < allPokemonItems.length; item++) {
            let pokemonName = allPokemonItems[item].textContent || allPokemonItems[item].innerText;
            if (pokemonName.toLowerCase().indexOf(inputVal) > -1) {
                allPokemonItems[item].style.display = "block";
            } else {
                allPokemonItems[item].style.display = "none";
            }
        }
    }

    async function fetchThisPokemon(pokemon) {
        setApiData((prev) => ({ ...prev, specificPokemn: [suggestionList.results[pokemon.dataset.index]] }));
    }


    return (
        <>
            <div className="searchHeader flex justify-center items-center pt-8 ">
                <div className="searchFormContainer px-8 py-4 shadow rounded-lg bg-secondary">
                    <Form method="get" className="flex items-start gap-2" action="/pokemon">
                        <div className="inputListContainer relative">
                            <input type="text" name="searchFormInput" id="searchFormInputId" placeholder={searchInput} onKeyUp={()=>{setShowSearchList(true)}} onBlur={()=>{setShowSearchList(false)}} onChange={(e) => { filterOptions(e.target.value) }} className="p-2 border-1 outline-none border-primary bg-white rounded-lg" />
                            {suggestionList && (
                            <div className={`suggestionListParent h-full min-h-96 absolute inset-0 top-10 ${!showSearchList && 'hidden'}`}>
                                <ul className={`suggestionList w-full h-full bg-tertiary p-4 rounded-lg shadow-lg overflow-y-scroll`}>
                                    {suggestionList.results.map((pokemon, index) => (
                                        <li key={index} className="pokemonItem mt-2 p-2 cursor-pointer bg-primary rounded-lg text-white" onMouseDown={(e) => { fetchThisPokemon(e.target) }} data-index={index} data-pokemon-api-url={pokemon.url}>{pokemon.name}</li>
                                    ))}
                                </ul>
                            </div>
                            )}
                        </div>
                        {/* <button className="serachSubmit button buttonV1" type="submit">Search</button> */}
                    </Form>
                </div>
            </div>
        </>
    )
}