import { Outlet, Link } from "react-router-dom";
import CardContainer from "./CardContainer";
import Search from "./Serach.jsx";
import { createContext, useRef, useState } from "react";

export const dashboardContext = createContext(null);

export default function Dashboard() {

    const [apiData, setApiData] = useState({
        allItems: [],
        specificPokemn:[],
    });

    return (
        <dashboardContext.Provider value={{ apiData, setApiData }}>
            <>
                <div className="dashboard">
                    <div className="wrapper">
                        <div className="dashboardInner">
                            <h1 className="text-center">Pokedex</h1>
                            {/* <div className="linkContainer flex justify-center gap-4 pt-4">
                            <Link className="button buttonV1" to='/search'>Search Bar</Link>
                            <Link className="button buttonV2" to='/cardContainer'>Card Container</Link>
                        </div> */}
                            <Search />
                            <CardContainer />
                        </div>
                    </div>
                </div>
            </>
        </dashboardContext.Provider>
    )
}