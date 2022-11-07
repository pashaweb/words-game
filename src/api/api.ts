

export const loadData= async () => {
    try {
        const response = await fetch("https://raw.githubusercontent.com/finmid/code-challenge-fe/main/find-challenge");
        const data:string = await response.text();
        const games = data.split("\n");
        const gamesList = [];
        for (let i = 0; i < games.length; i++) {
            const game = games[i];
            try{
                const gameData = JSON.parse(game);
                gamesList.push(gameData);
            }catch(e){
            }
        }
        return gamesList;
    } catch (error) {   
        return []
    }
    
}