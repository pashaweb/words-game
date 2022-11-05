import { StateCreator } from "zustand"
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
export interface IGameItem {
    id: string;
    url: string;
}

export interface IAppStateSlice {
    appstate: AppstateEnum,
    setAppState: (appstate: AppstateEnum) => void
    loadGamesList: () => void
    totalGames: number
    currentGame: number
    gamesList: IGameItem[],
    isGamesListLoaded: boolean
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
const createAppStateSlice: StateCreator<IAppStateSlice> = (set) => ({
    appstate: AppstateEnum.INIT,
    setAppState: (appstate: AppstateEnum) => set({ appstate }),
    loadGamesList: async () => {
        set({ appstate: AppstateEnum.LOADINGAMES });
        const games = await loadAllGames();
        if (games.length > 0) {
            set({
                appstate: AppstateEnum.SUCCESSLOADINGGAMES,
                totalGames: games.length,
                gamesList: games,
                isGamesListLoaded: true
            });
        } else {
            set({ appstate: AppstateEnum.ERRORLOADINGGAMES });
        }
    },
    totalGames: 0,
    currentGame: 0,
    gamesList: [],
    isGamesListLoaded: false
})

export default createAppStateSlice;


