import React, { useContext, createContext, useEffect, useRef, useState } from 'react'
import { getPokeAPI } from '../services/getPokeAPI'
import Card from './Card';
import { dashboardContext } from './Dashboard';


function CardContainer() {
    const {apiData, setApiData} = useContext(dashboardContext);

    const apiRef = useRef({
        data:[],
        reachedEndOfDocument:false,
    })

    let dataEl;
    useEffect(() => {
        (async function parentFun() {
            dataEl = await getPokeAPI('https://pokeapi.co/api/v2/pokemon');
            setApiData(prev => ({...prev, allItems:dataEl.results}));  
            apiRef.current.data = dataEl;
        })()      
    }, [])



    useEffect(()=>{
        window.addEventListener('scroll', throttleScreen);  
        return () => {
            window.removeEventListener('scroll', throttleScreen);
          };
    }, [])
    

    async function loadMoreData(){
        if(!apiRef.current.data.next) return;
        let newAPIData = await getPokeAPI(apiRef.current.data.next);
        setApiData(prev => ({...prev, allItems:[...prev.allItems, ...newAPIData.results]}));
        apiRef.current.data = newAPIData;
        apiRef.current.reachedEndOfDocument = false;
    }     
    
 
    const throttleScreen = throttle(checkEndOfScreen, 10);

    function throttle(callbackFun, intervalTime){
        let initialTime = 0; 
        return function(){
            let currentTime = new Date().getTime();
            if(currentTime - initialTime < intervalTime) return;
            initialTime = currentTime;
            return callbackFun();
        }
    }

    function checkEndOfScreen(){
        if(apiRef.current.reachedEndOfDocument) return;
        apiRef.current.reachedEndOfDocument = window.innerHeight + window.scrollY >= document.body.offsetHeight;
        apiRef.current.reachedEndOfDocument && loadMoreData();
    }


      
      
      

    return (
        <>
            <div className="cardContainerMain pt-20">
                <div className='cardContainerTop text-center'>
                    <h2>All Cards</h2>
                </div>
                <div className="cardContainer pt-4 flex justify-center items-center flex-wrap" >
                    {(apiData.specificPokemn.length>0?apiData.specificPokemn:apiData.allItems)?.map((item, index) => (
                        <Card key={item.url?.split('/').filter(Boolean).pop()} id={item.url?.split('/').filter(Boolean).pop()} allData={item} />
                    ))}
                </div>
                <div className='buttonContainer py-20 text-center' >
                    <button className='button buttonV1' onClick={loadMoreData}>Load More</button>
                </div>
            </div>
        </>
    )
}

export default CardContainer