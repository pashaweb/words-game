import { loadData } from "./api";
const loadDataMock = jest.fn(() => Promise.resolve({
    text: () => Promise.resolve('{"a": 1}\n')
}));

describe("api.loadData", () => {
    beforeEach(() => {
       jest.clearAllMocks();});
    it("0", async () => {
        // @ts-ignore
        global.fetch = loadDataMock
        const result: any = await loadData();
        const exceptedResult = [{"a": 1}]
        console.log(result)
        console.log(exceptedResult)
        expect(result.length).toBe(1);
    })
})
