import React, { useEffect } from 'react';
import useStore, { AppstateEnum } from './store/store';
import './App.css';
import GameStats from './components/GameStats';

function App() {
  const appstate = useStore((state) => state.appstate);
  const loadGamesList = useStore((state) => state.loadGamesList);
  const isGamesListLoaded = useStore((state) => state.isGamesListLoaded);

  useEffect(() => {
    loadGamesList();
  }, []);


  return (

    <>
      {
        (appstate === AppstateEnum.ERRORLOADINGGAMES && <div>ERRORLOADINGGAMES</div>)

      }
      {
        appstate === AppstateEnum.SUCCESSLOADINGGAMES &&
        <div>SUCCESSLOADINGGAMES</div>
      }
      {
        (appstate === AppstateEnum.LOADINGAMES || appstate === AppstateEnum.LOADINGGAMEDATA) && <div>LOADING</div>
      }
      {isGamesListLoaded && <GameStats />}
    </>


    // <div >
    //   {store.appstate}
    // </div>
  );
}

export default App;
