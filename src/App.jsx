import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Search from "./components/Serach";
import CardContainer from "./components/CardContainer";

function App() {

  const pokedexRouter = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Dashboard />} >
        <Route path="search" element={<Search />} />
        <Route path="cardContainer" element={<CardContainer />} />
      </ Route>
    )
  )


  return (
    <>
      <RouterProvider router={pokedexRouter} />
    </>
  )
}

export default App
