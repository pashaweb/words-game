import { IGameGrid, convertCharacterGrid , setIsHeighlighted, ICharGridItem, findSelection} from './utils';
describe('Utils convertCharacterGrid', () => {
    it('should convert character grid', () => {
        const inputGrid: string[][] = [
            ['a', 'b', 'c'],
            ['d', 'e', 'f'],
            ['g', 'h', 'i'],
        ];
        const outputGrid: IGameGrid = {
            rows: 3,
            cols: 3,
            charGrid: [
                { id: '0,0', char: 'a', isHighlighted: false, isFound: false },
                { id: '0,1', char: 'b', isHighlighted: false, isFound: false },
                { id: '0,2', char: 'c', isHighlighted: false, isFound: false },
                { id: '1,0', char: 'd', isHighlighted: false, isFound: false },
                { id: '1,1', char: 'e', isHighlighted: false, isFound: false },
                { id: '1,2', char: 'f', isHighlighted: false, isFound: false },
                { id: '2,0', char: 'g', isHighlighted: false, isFound: false },
                { id: '2,1', char: 'h', isHighlighted: false, isFound: false },
                { id: '2,2', char: 'i', isHighlighted: false, isFound: false },
            ],
        };
        expect(convertCharacterGrid(inputGrid)).toEqual(outputGrid);
    });
    it('should convert character grid with empty cells', () => {
        const inputGrid: string[][] = [
            ['a', 'b', 'c'],
            ['d', 'e'],
            ['g', 'h', 'i'],
        ];
        const outputGrid: IGameGrid = {
            rows: 3,
            cols: 3,
            charGrid: [
                { id: '0,0', char: 'a', isHighlighted: false, isFound: false },
                { id: '0,1', char: 'b', isHighlighted: false, isFound: false },
                { id: '0,2', char: 'c', isHighlighted: false, isFound: false },
                { id: '1,0', char: 'd', isHighlighted: false, isFound: false },
                { id: '1,1', char: 'e', isHighlighted: false, isFound: false },
                { id: '1,2', char: '', isHighlighted: false, isFound: false },
                { id: '2,0', char: 'g', isHighlighted: false, isFound: false },
                { id: '2,1', char: 'h', isHighlighted: false, isFound: false },
                { id: '2,2', char: 'i', isHighlighted: false, isFound: false },
            ],
        };

        expect(convertCharacterGrid(inputGrid)).toEqual(outputGrid);
    })
});
describe('Utils setIsHeighlighted', () => {
    it('should set isHighlighted to true', () => {
        const points: string[] = ['0,0', '0,1', '0,2'];
        const startPoint: string = '0,0';
        const grid:  ICharGridItem[] = [
            { id: '0,0', char: 'a', isHighlighted: false, isFound: false },
            { id: '0,1', char: 'b', isHighlighted: false, isFound: false },
            { id: '0,2', char: 'c', isHighlighted: false, isFound: false },
            { id: '1,0', char: 'd', isHighlighted: false, isFound: false },
            { id: '1,1', char: 'e', isHighlighted: false, isFound: false },
            { id: '1,2', char: 'f', isHighlighted: false, isFound: false },
            { id: '2,0', char: 'g', isHighlighted: false, isFound: false },
            { id: '2,1', char: 'h', isHighlighted: false, isFound: false },
            { id: '2,2', char: 'i', isHighlighted: false, isFound: false },
        ];
        const outputGrid: ICharGridItem[] = [
            { id: '0,0', char: 'a', isHighlighted: true, isFound: false },
            { id: '0,1', char: 'b', isHighlighted: true, isFound: false },
            { id: '0,2', char: 'c', isHighlighted: true, isFound: false },
            { id: '1,0', char: 'd', isHighlighted: false, isFound: false },
            { id: '1,1', char: 'e', isHighlighted: false, isFound: false },
            { id: '1,2', char: 'f', isHighlighted: false, isFound: false },
            { id: '2,0', char: 'g', isHighlighted: false, isFound: false },
            { id: '2,1', char: 'h', isHighlighted: false, isFound: false },
            { id: '2,2', char: 'i', isHighlighted: false, isFound: false },
        ];

        expect(setIsHeighlighted(points, grid, startPoint)).toEqual(outputGrid);
    });
    it('should set isHighlighted to false except start point', () => {
        const points: string[] = [];
        const startPoint: string = '0,0';
        const grid:  ICharGridItem[] = [
            { id: '0,0', char: 'a', isHighlighted: true, isFound: false },
            { id: '0,1', char: 'b', isHighlighted: true, isFound: false },
            { id: '0,2', char: 'c', isHighlighted: true, isFound: false },
            { id: '1,0', char: 'd', isHighlighted: false, isFound: false },
            { id: '1,1', char: 'e', isHighlighted: false, isFound: false },
            { id: '1,2', char: 'f', isHighlighted: false, isFound: false },
            { id: '2,0', char: 'g', isHighlighted: false, isFound: false },
            { id: '2,1', char: 'h', isHighlighted: false, isFound: false },
            { id: '2,2', char: 'i', isHighlighted: false, isFound: false },
        ];
        const outputGrid: ICharGridItem[] = [
            { id: '0,0', char: 'a', isHighlighted: true, isFound: false },
            { id: '0,1', char: 'b', isHighlighted: false, isFound: false },
            { id: '0,2', char: 'c', isHighlighted: false, isFound: false },
            { id: '1,0', char: 'd', isHighlighted: false, isFound: false },
            { id: '1,1', char: 'e', isHighlighted: false, isFound: false },
            { id: '1,2', char: 'f', isHighlighted: false, isFound: false },
            { id: '2,0', char: 'g', isHighlighted: false, isFound: false },
            { id: '2,1', char: 'h', isHighlighted: false, isFound: false },
            { id: '2,2', char: 'i', isHighlighted: false, isFound: false },
        ];

        expect(setIsHeighlighted(points, grid, startPoint)).toEqual(outputGrid);
    });
    it('should set isHighlighted to false', () => {
        const points: string[] = [];
        const startPoint: string = '';
        const grid:  ICharGridItem[] = [
            { id: '0,0', char: 'a', isHighlighted: true, isFound: false },
            { id: '0,1', char: 'b', isHighlighted: true, isFound: false },
            { id: '0,2', char: 'c', isHighlighted: true, isFound: false },
            { id: '1,0', char: 'd', isHighlighted: false, isFound: false },
            { id: '1,1', char: 'e', isHighlighted: false, isFound: false },
            { id: '1,2', char: 'f', isHighlighted: false, isFound: false },
            { id: '2,0', char: 'g', isHighlighted: false, isFound: false },
            { id: '2,1', char: 'h', isHighlighted: false, isFound: false },
            { id: '2,2', char: 'i', isHighlighted: false, isFound: false },
        ];
        const outputGrid: ICharGridItem[] = [
            { id: '0,0', char: 'a', isHighlighted: false, isFound: false },
            { id: '0,1', char: 'b', isHighlighted: false, isFound: false },
            { id: '0,2', char: 'c', isHighlighted: false, isFound: false },
            { id: '1,0', char: 'd', isHighlighted: false, isFound: false },
            { id: '1,1', char: 'e', isHighlighted: false, isFound: false },
            { id: '1,2', char: 'f', isHighlighted: false, isFound: false },
            { id: '2,0', char: 'g', isHighlighted: false, isFound: false },
            { id: '2,1', char: 'h', isHighlighted: false, isFound: false },
            { id: '2,2', char: 'i', isHighlighted: false, isFound: false },
        ];

        expect(setIsHeighlighted(points, grid, startPoint)).toEqual(outputGrid);
    });
});

describe("Utile findSelection", () => {
    it("should find selection horizontal simple", () => {
       const startPoin= '0,0';
       const endPoint= '0,2';
       const exceptedSelection = ['0,0', '0,1', '0,2'];
       expect(findSelection(startPoin, endPoint)).toEqual(exceptedSelection); 
    });
    it("should find selection horizontal simple reverse", () => {
        const startPoin= '0,2';
        const endPoint= '0,0';
        const exceptedSelection = ['0,0', '0,1', '0,2'];
        expect(findSelection(startPoin, endPoint)).toEqual(exceptedSelection); 
     });
    it("should find selection vertical simple", () => {
        const startPoin= '0,0';
        const endPoint= '2,0';
        const exceptedSelection = ['0,0', '1,0', '2,0'];
        expect(findSelection(startPoin, endPoint)).toEqual(exceptedSelection); 
     });
     it("should find selection vertical simple reversed", () => {
        const startPoin= '2,0';
        const endPoint= '0,0';
        const exceptedSelection = ['0,0', '1,0', '2,0'];
        expect(findSelection(startPoin, endPoint)).toEqual(exceptedSelection); 
     });
     it("should find selection diagonal simple", () => {
        const startPoin= '0,0';
        const endPoint= '2,2';
        const exceptedSelection = ['0,0', '1,1', '2,2'];
        expect(findSelection(startPoin, endPoint)).toEqual(exceptedSelection); 
     })
     it("should find selection diagonal simple reversed", () => {
        const startPoin= '2,2';
        const endPoint= '0,0';
        const exceptedSelection = ['0,0', '1,1', '2,2'];
        expect(findSelection(startPoin, endPoint)).toEqual(exceptedSelection); 
     })
     it("should find selection diagonal complex", () => {
        const startPoin= '0,0';
        const endPoint= '1,2';
        const exceptedSelection = ['0,0', '1,1'];
        console.log(findSelection(startPoin, endPoint));
        expect(findSelection(startPoin, endPoint)).toEqual(exceptedSelection); 
     });

});