import { url } from 'inspector';
import create from 'zustand'
export enum AppstateEnum {
    INIT = 'INIT',
    LOADINGAMES = 'LOADINGAMES',
    SUCCESSLOADINGGAMES = 'SUCCESSLOADINGGAMES',
    ERRORLOADINGGAMES = 'ERRORLOADINGGAMES',
    LOADINGGAMEDATA = 'LOADINGGAMEDATA',

    SUCCESSLOADINGGAMEDATA = 'SUCCESSLOADINGGAMEDATA',
    ERRORLOADINGGAMEDATA = 'ERRORLOADINGGAMEDATA',
    LOADNEXTGAME = 'LOADNEXTGAME',
    PLAYGAME = 'PLAYGAME',
}

export enum GamestateEnum {
    IDELE = 'IDELE',
    LOADING = 'LOADING',
    PLAYGAME = 'PLAYGAME',
    ERROR = 'ERROR',
}
export interface IGameItem {
    id: string;
    url: string;
}

export interface ICharGridItem {
    id: string;
    char: string;
    isHighlighted: boolean;
    isFound: boolean;
}

// Zustand implementation
type Store = {
    appstate: AppstateEnum,
    totalGames: number
    currentGameNumber: number | null
    currentGameState: GamestateEnum,
    wins: number
    gamesList: IGameItem[],
    isGamesListLoaded: boolean,
    source_language: string | null,
    target_language: string | null,
    word: string | null,
    word_locations: { [key: string]: string },
    charecters: ICharGridItem[],
}

type Actions = {
    setAppState: (appstate: AppstateEnum) => void
    loadGamesList: () => void
    loadGameData: (gameId: string) => void
    loadNextGame: () => void
}

export const loadAllGames = async () => {
    try {
        console.log('loadAllGames');
        const data = await fetch('/data/games.json');
        const games = await data.json();
        return games;
    } catch {
        return [];
    }
}

export const loadGame = async (url: string) => {
    try {
        console.log('Load game data');
        const data = await fetch(`/data/${url}`);
        const game = await data.json();
        return game;
    } catch {
        return null;
    }
}

const useStore = create<Store & Actions>((set, get) => ({
    appstate: AppstateEnum.INIT,
    totalGames: 0,
    currentGameNumber: 0,
    gamesList: [],
    wins: 0,
    isGamesListLoaded: false,
    currentGameState: GamestateEnum.IDELE,
    source_language: null,
    target_language: null,
    word: null,
    word_locations: {},
    charecters: [],
    setAppState: (appstate: AppstateEnum) => set({ appstate }),
    loadGamesList: async () => {
        set({ appstate: AppstateEnum.LOADINGAMES });
        const games = await loadAllGames();
        if (games.length > 0) {
            console.log('loadGamesList', games);

            set({
                appstate: AppstateEnum.SUCCESSLOADINGGAMES,
                totalGames: games.length,
                gamesList: games, isGamesListLoaded: true
            });
            get().loadGameData(games[0].url);
            //useStore.getState().loadGameData(useStore.getState().gamesList[0].url);
        } else {
            set({ appstate: AppstateEnum.ERRORLOADINGGAMES });
        }
    },
    loadGameData: async (gameId: string) => {
        set({ currentGameState: GamestateEnum.LOADING});
        const data = await fetch(`/data/${gameId}`);
        const game = await data.json();
        if (game) {
            set({ currentGameState: GamestateEnum.PLAYGAME});

        } else {
            set({ currentGameState: GamestateEnum.ERROR });
        }
    },
    loadNextGame: () => {
        set({ appstate: AppstateEnum.LOADNEXTGAME });
    }
}))



export default useStore;