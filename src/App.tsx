import React, { useEffect } from 'react';
import useStore, { AppstateEnum, GamestateEnum } from './store/store';
import './App.css';
import GameStats from './components/GameStats';
import GameGrid from './components/GameGrid';

function App() {
  const appstate = useStore((state) => state.appstate);
  const loadGamesList = useStore((state) => state.loadGamesList);
  const isGamesListLoaded = useStore((state) => state.isGamesListLoaded);
  const currentGameState = useStore((state) => state.currentGameState);
  let appInitieted:boolean = false
  useEffect(() => {
    if(appInitieted) {
      return
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    appInitieted = true;
    if (appstate === AppstateEnum.INIT) {
      loadGamesList();
    }
    return () => {};
  }, []);

  // useEffect(() => {
  //   if (isGamesListLoaded) {
  //     loadFirstGame();
  //   }
  //   return () => {};
  // }, [isGamesListLoaded, loadFirstGame]);

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
      {currentGameState === GamestateEnum.PLAYGAME && <GameGrid /> }
    </>


    // <div >
    //   {store.appstate}
    // </div>
  );
}

export default App;
