import {loadGame} from "../store"
// @ponicode
describe("store.loadGames", () => {
    test("0", async () => {
      const t =  await loadGame("1");
        expect(t).toBe(null);
    })
})
