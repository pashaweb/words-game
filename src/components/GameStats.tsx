import React from 'react'
import useStore from '../store/store';

export default function GameStats(): JSX.Element {
    const totalGames = useStore((state) => state.totalGames);
    const wins = useStore((state) => state.wins);
    const currentGameNumber = useStore((state) => state.currentGameNumber);
    const gamesList = useStore((state) => state.gamesList);

   // const
    return (
        <>
            <div>
                Total Games: {totalGames}
            </div>
            <div>
                Games Won: {wins}
            </div>
            <div>
               Current Game: {currentGameNumber}
            </div>
            <div>
                Games List: {
                    gamesList.map((game) => {
                        return <div key={game.id}>{game.id}</div>
                    })
                }
            </div>
            
        </>
    )
}