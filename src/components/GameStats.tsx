import React from 'react'
import useStore from '../store/store';

export default function GameStats(): JSX.Element {
    const totalGames = useStore((state) => state.totalGames);
    const wins = useStore((state) => state.wins);
    const currentGameNumber = useStore((state) => state.currentGameNumber);
    const word_locations = useStore((state) => state.word_locations);
    const word = useStore((state) => state.word);
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
                Word: {word}
            </div>
            <div>
               Translations: {JSON.stringify(word_locations)}
            </div>
            
        </>
    )
}