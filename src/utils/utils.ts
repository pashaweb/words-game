



export interface ICharGridItem {
    id: string;
    char: string;
    isHighlighted: boolean;
    isFound: boolean;
}
export interface IGridDimentions {
    rows: number;
    cols: number;
}
export interface IGameGrid extends IGridDimentions {
    charGrid: ICharGridItem[];
}

export interface IGridStep {
    direction: number;
    step: number;
}
export interface IGridStepsAndDirection {
    start: IGridStep;
    end: IGridStep;
}

export const convertCharacterGrid = (inputGrid: string[][]): IGameGrid => {
    const maxCols: number = inputGrid
        .map((row) => row.length)
        .reduce((a, b) => Math.max(a, b), 0);

    const outputGrid: IGameGrid = {
        rows: inputGrid.length,
        cols: maxCols,
        charGrid: [],
    };

    inputGrid.forEach((row, rowIndex) => {
        if (row.length < maxCols) {
            const diff = maxCols - row.length;
            for (let i = 0; i < diff; i++) {
                row.push('');
            }
        }
        row.forEach((col, colIndex) => {
            outputGrid.charGrid.push({
                id: `${rowIndex},${colIndex}`,
                char: col,
                isHighlighted: false,
                isFound: false,
            });
        });
    });

    return outputGrid;
}

export const setIsHeighlighted = (points: string[], grid: ICharGridItem[], startPoint: string): ICharGridItem[] => {
    const charGrid: ICharGridItem[] | undefined = grid;
    if (charGrid) {
        charGrid.forEach((item) => {
            if (startPoint === item.id) {
                item.isHighlighted = true;
                return;
            }
            if (points.length > 0 && points.includes(item.id)) {
                item.isHighlighted = true;
                return;
            }
            item.isHighlighted = false;
        });
    }
    return grid;
};
export const findSelection = (startPoint: string, hooverPoint: string): string[] => {
    const [startRow, startCol] = startPoint.split(',').map(Number);
    const [hooverRow, hooverCol] = hooverPoint.split(',').map(Number);
    let horizontalStep: IGridStep = {
        direction: startRow > hooverRow ? -1 : 1,
        step: Math.abs(startRow - hooverRow)
    };
    let verticalStep: IGridStep = {
        direction: startCol > hooverCol ? -1 : 1,
        step: Math.abs(startCol - hooverCol)
    };

    let totalSteps: number = 0
    if (horizontalStep.step !== 0 && verticalStep.step !== 0) {
        totalSteps = Math.min(horizontalStep.step, verticalStep.step);
        horizontalStep.step = totalSteps;
        verticalStep.step = totalSteps;
    }
    if (horizontalStep.step === 0) {
        totalSteps = verticalStep.step;
    }
    if (verticalStep.step === 0) {
        totalSteps = horizontalStep.step;
    };
    const shiftObj = {
        dirH: horizontalStep.direction,
        dirV: verticalStep.direction,
        stepH: horizontalStep.step === 0 ? 0 : 1,
        stepV: verticalStep.step === 0 ? 0 : 1,
        totalSteps
    }
    let points: string[] = [startPoint];
    for (let i = 1; i < shiftObj.totalSteps + 1; i++) {
        const row = startRow + shiftObj.dirH * shiftObj.stepH * i;
        const col = startCol + shiftObj.dirV * shiftObj.stepV * i;
        points.push(`${row},${col}`);
    }
    if (shiftObj.dirH === -1 || shiftObj.dirV === -1) {
        points = points.reverse();
    }
    return points;
}
