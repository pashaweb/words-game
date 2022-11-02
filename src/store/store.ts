import create from "zustand/react";
import { devtools } from "zustand/middleware";


export interface ICharAddress {
    x: number;
    y: number;
}

export interface IChar {
    text: string;
    address: ICharAddress;
}


export interface IGameData {
    id: number;
    targetLanguage: string;
    sourceLanguage: string;

}

export interface IGameStore {
    totalGames: number;  
    totalWins: number;
    curentGame: number;        
}


// export const useStore = create(
//     devtools((set) => ({
//         count: 0,
//         increment: () => set((state) => ({ count: state.count + 1 })),
//         decrement: () => set((state) => ({ count: state.count - 1 })),
//     }))
// );