
export const loadAllGames = async () => {
    try {
        console.log('loadAllGames');
        const data = await fetch('/data/games.json');
        const games = await data.json();
        return games;
    } catch {
        return [];
    }
};

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