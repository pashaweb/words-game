import useStore, { GamestateEnum } from "./store";
import { AppstateEnum } from "./store";


describe("Store", () => {
    it("should be start with init state", () => {
        expect(useStore.getState().appstate).toBe(AppstateEnum.INIT);
    });

    it("error loading games list", async () => {
        await useStore.getState().loadGamesList();
        expect(useStore.getState().appstate).toBe(AppstateEnum.ERRORLOADINGGAMES);
    });

    it("success loading games list", async () => {
        global.fetch = jest.fn((url) => {
            console.log(url);
            const resp: Response = new Response(JSON.stringify({ "source_language": "en", "word": "woman", "character_grid": [["v", "\u00e1", "q", "t", "b", "f", "q"], ["y", "x", "i", "a", "\u00fc", "v", "a"], ["r", "d", "y", "\u00ed", "t", "n", "a"], ["f", "v", "\u00f3", "w", "l", "a", "v"], ["b", "u", "\u00fa", "j", "q", "h", "\u00e1"], ["c", "o", "m", "u", "j", "e", "r"], ["h", "o", "d", "\u00fa", "w", "d", "\u00fc"]], "word_locations": { "2,5,3,5,4,5,5,5,6,5": "mujer" }, "target_language": "es" })+"\n");
            return Promise.resolve(resp);
        });
        await useStore.getState().loadGamesList();
        expect(useStore.getState().currentGameState).toBe(GamestateEnum.PLAYGAME);

    });
});