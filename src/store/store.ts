import create from 'zustand'
import { loadAllGames, loadGame } from '../api/api';
import { convertCharacterGrid, findSelection, ICharGridItem, IGameGrid, setIsHeighlighted } from '../utils/utils';
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



// Zustand implementation
type Store = {
    appstate: AppstateEnum,
    totalGames: number
    currentGameNumber: number | null
    currentGameState: GamestateEnum,
    currentGameGrid: IGameGrid | null,
    wins: number
    gamesList: IGameItem[],
    isGamesListLoaded: boolean,
    source_language: string | null,
    target_language: string | null,
    word: string | null,
    word_locations: { [key: string]: string },
    currentStartSelectionPoint: string | null,

}

type Actions = {
    setAppState: (appstate: AppstateEnum) => void
    loadGamesList: () => void
    loadGameData: () => void
    loadNextGame: () => void
    setcurrentStartSelectionPoint: (point: string) => void
    setIsHeighlighted: (points: string[]) => void
    setSelection: (point: string) => void
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
    currentGameGrid: null,
    currentStartSelectionPoint: null,
    setAppState: (appstate: AppstateEnum) => set({ appstate }),
    loadGamesList: async () => {
        set({ appstate: AppstateEnum.LOADINGAMES });
        const games = await loadAllGames();
        if (games.length > 0) {
            set({
                appstate: AppstateEnum.SUCCESSLOADINGGAMES,
                totalGames: games.length,
                gamesList: games, isGamesListLoaded: true
            });
        } else {
            set({ appstate: AppstateEnum.ERRORLOADINGGAMES });
        }
    },
    loadGameData: async () => {
        set({ currentGameState: GamestateEnum.LOADING });
        const game = await loadGame(get().gamesList[get().currentGameNumber!].url);
        if (game) {
            set({ currentGameState: GamestateEnum.PLAYGAME });
            const { source_language, target_language, word, word_locations } = game;
            set({ source_language, target_language, word, word_locations });
            const gameGrid = convertCharacterGrid(game.character_grid);
            set({ currentGameGrid: gameGrid });
        } else {
            set({ currentGameState: GamestateEnum.ERROR });
        }
    },
    loadNextGame: () => {
        set({ appstate: AppstateEnum.LOADNEXTGAME });

    },
    setcurrentStartSelectionPoint: (point: string) => {
        console.log('setcurrentStartSelectionPoint', point);
        set({ currentStartSelectionPoint: point });
        get().setIsHeighlighted([]);
    },
    setIsHeighlighted: (points: string[]) => {
        const currentGameGrid = get().currentGameGrid;
        const charGrid: ICharGridItem[] | undefined = currentGameGrid?.charGrid;
        const startPoint: string = get().currentStartSelectionPoint || "";
        if (charGrid) {
            const newCharGrid = setIsHeighlighted(points, charGrid, startPoint);
            set({ currentGameGrid: { ...currentGameGrid!, charGrid: newCharGrid } });
        }
    },
    setSelection: (point: string) => {
        console.log('setSelection', point);
        const currentGameGrid = get().currentGameGrid;
        const charGrid: ICharGridItem[] | undefined = currentGameGrid?.charGrid;
        const startPoint: string = get().currentStartSelectionPoint || "";
        const points:string[] = findSelection(startPoint, point);
        
        if (charGrid) {
            const newCharGrid = setIsHeighlighted(points, charGrid, startPoint);
            set({ currentGameGrid: { ...currentGameGrid!, charGrid: newCharGrid } });
        }
    }
}));



export default useStore;