import create from 'zustand'
import { loadData } from '../api/api';
import { clearIsHeighlighted, convertCharacterGrid, findSelection, ICharGridItem, IGameGrid, setFound, setIsHeighlightedUtil } from '../utils/utils';
export enum AppstateEnum {
    INIT = 'INIT',
    LOADINGAMES = 'LOADINGAMES',
    SUCCESSLOADINGGAMES = 'SUCCESSLOADINGGAMES',
    ERRORLOADINGGAMES = 'ERRORLOADINGGAMES',
    LOADINGGAMEDATA = 'LOADINGGAMEDATA',
    LOADNEXTGAME = 'LOADNEXTGAME',
    PLAYGAME = 'PLAYGAME',
    WIN= 'WIN',
}

export enum GamestateEnum {
    IDELE = 'IDELE',
    LOADING = 'LOADING',
    PLAYGAME = 'PLAYGAME',
    ERROR = 'ERROR',
}

export interface IWordLocations {
    [key: string]: string;
}

export interface IGameData {
    source_language: string;
    word: string;
    character_grid: string[][];
    word_locations: IWordLocations;
    target_language: string;
}



// Zustand implementation
type Store = {
    appstate: AppstateEnum,
    totalGames: number
    currentGameNumber: number | null
    currentGameState: GamestateEnum,
    currentGameGrid: IGameGrid | null,
    wins: number
    gamesList: IGameData[],
    isGamesListLoaded: boolean,
    source_language: string | null,
    target_language: string | null,
    translationsConunt: number,
    word: string | null,
    word_locations: IWordLocations,
    currentStartSelectionPoint: string,
    currenSelection: string[] | null,
    foundedWords: string[],
}

type Actions = {
    setAppState: (appstate: AppstateEnum) => void
    loadGamesList: () => void
    loadGameData: (game: IGameData) => void
    loadNextGame: () => void
    setcurrentStartSelectionPoint: (point: string) => void
    setIsHeighlighted: (points: string[]) => void
    setSelection: (point: string) => void
    checkSelection: () => void

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
    currentStartSelectionPoint: '',
    currenSelection: null,
    foundedWords: [],
    translationsConunt: 0,
    setAppState: (appstate: AppstateEnum) => set({ appstate }),
    loadGamesList: async () => {
        const { loadGameData } = get();
        set({ appstate: AppstateEnum.LOADINGAMES });
        const games = await loadData();
        if (games.length > 0) {
            set({
                appstate: AppstateEnum.SUCCESSLOADINGGAMES,
                totalGames: games.length,
                gamesList: games,
                isGamesListLoaded: true
            });
            loadGameData(games[0]);
        } else {
            set({ appstate: AppstateEnum.ERRORLOADINGGAMES });
        }
    },
    loadGameData: (game: IGameData) => {
        set({ currentGameState: GamestateEnum.PLAYGAME });
        const { source_language, target_language, word, word_locations } = game;
        const gameGrid: IGameGrid = convertCharacterGrid(game.character_grid);
        set({
            source_language, target_language, word, word_locations,
            currentGameGrid: gameGrid,
            translationsConunt: Object.keys(word_locations).length,
            foundedWords: [],
            currenSelection: null,
            currentStartSelectionPoint: ''
        });
    },
    loadNextGame: () => {
        const { currentGameNumber, gamesList } = get();
        if (currentGameNumber !== null) {
            const nextGameNumber = currentGameNumber + 1;
            if (nextGameNumber < gamesList.length) {
                set({ currentGameNumber: nextGameNumber });
                get().loadGameData(gamesList[nextGameNumber]);
            } else {
                set({ appstate: AppstateEnum.WIN });
            }
        }
    },
    setcurrentStartSelectionPoint: (point: string) => {
        const { setIsHeighlighted } = get();
        set({ currentStartSelectionPoint: point });
        setIsHeighlighted([]);
    },
    setIsHeighlighted: (points: string[]) => {
        const { currentGameGrid, currentStartSelectionPoint } = get();
        const charGrid: ICharGridItem[] = currentGameGrid?.charGrid || [];
        const newCharGrid = setIsHeighlightedUtil(points, charGrid, currentStartSelectionPoint);
        set({ currentGameGrid: { ...currentGameGrid!, charGrid: newCharGrid } });

    },
    setSelection: (point: string) => {
        console.log('setSelection', point);
        const { currentGameGrid, currentStartSelectionPoint } = get();
        const charGrid: ICharGridItem[] | undefined = currentGameGrid?.charGrid;
        const startPoint: string = currentStartSelectionPoint;
        const points: string[] = findSelection(startPoint, point);

        if (charGrid) {
            const newCharGrid = setIsHeighlightedUtil(points, charGrid, startPoint);
            set({ currentGameGrid: { ...currentGameGrid!, charGrid: newCharGrid } });
            set({ currenSelection: points });
        }
    },
    checkSelection: () => {
        const selection: string[] = get().currenSelection || [];
        const selectionString = selection.join(',');
        const word_locations: { [key: string]: string } = get().word_locations;
        if (word_locations[selectionString]) {
            const foundedWords = get().foundedWords;
            foundedWords.push(word_locations[selectionString]);
            const updateWordLocations = { ...word_locations };
            delete updateWordLocations[selectionString];
            set({ word_locations: updateWordLocations });
            let grid = get().currentGameGrid?.charGrid || [];
            grid = clearIsHeighlighted(grid);
            grid = setFound(selection, grid);
            set({ foundedWords });
            set({ currentGameGrid: { ...get().currentGameGrid!, charGrid: grid } });
            if (Object.keys(updateWordLocations).length === 0) {
                setTimeout(() => {
                    set({ wins: get().wins + 1 });
                    set({ appstate: AppstateEnum.LOADNEXTGAME });
                    get().loadNextGame();
                }, 1000);

            }
        } else {
            const { setIsHeighlighted } = get();
            set({ currenSelection: null, currentStartSelectionPoint: '' });
            setIsHeighlighted([])
        }

    }
}));



export default useStore;