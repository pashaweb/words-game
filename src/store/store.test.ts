

import useStore from "./store";
import { AppstateEnum } from "./store";
describe("Store", () => {
    it("should be start with init state", () => {
        expect(useStore.getState().appstate).toBe(AppstateEnum.INIT);
    });
   
    it("error loading games list", async() => {
        await useStore.getState().loadGamesList();
        expect(useStore.getState().appstate).toBe(AppstateEnum.ERRORLOADINGGAMES);
    });

    it("success loading games list", async() => {
    
        await useStore.getState().loadGamesList();
        expect(useStore.getState().appstate).toBe(AppstateEnum.SUCCESSLOADINGGAMES);
    });


    
});