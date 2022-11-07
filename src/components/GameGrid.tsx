import React, { useCallback } from "react";
import useStore from "../store/store";
import { IGameGrid } from "../utils/utils";
import "./GameGrid.css"
function GameGrid() {

  const gameGrid: IGameGrid | null = useStore((state) => state.currentGameGrid);
  const inlineStyle = {
    gridTemplateColumns: `repeat(${gameGrid?.cols}, 1fr)`,
    gridTemplateRows: `repeat(${gameGrid?.rows}, 1fr)`,
  }
  const setcurrentStartSelectionPoint = useStore((state) => state.setcurrentStartSelectionPoint);
  const setSelection = useStore((state) => state.setSelection);
  const currentStartSelectionPoint = useStore((state) => state.currentStartSelectionPoint);
  const checkSelection = useStore((state) => state.checkSelection);

  const mouseDounHandler = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    const target = e.target as HTMLDivElement;
    setcurrentStartSelectionPoint(target.id);
    document.addEventListener(
      "mouseup",
      () => {
        console.log("mouse up");
        checkSelection();
      },
      { once: true });
  }, [setcurrentStartSelectionPoint, checkSelection]);

  const mouseEnterHandler = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    if (currentStartSelectionPoint) {
      const target = e.target as HTMLDivElement;
      setSelection(target.id);
    }
  }, [setSelection, currentStartSelectionPoint]);


  return (
    <div style={inlineStyle} className="game-grid-container" >
      {gameGrid && gameGrid.charGrid.map((item) => {
        return <div
          onMouseDown={mouseDounHandler}
          onMouseEnter={mouseEnterHandler}
          className={`game-grid-item ${item.isHighlighted ? 'hilight' : ''} ${item.isFound ? 'selected' : ''}`}
          key={item.id}
          id={item.id}
        >
          {item.char}
        </div>
      })}

    </div>
  )
}

export default GameGrid