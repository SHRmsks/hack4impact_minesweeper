
import BFS from "@/utility/BFS";
import { Cell } from "./type";
import Game from "@/utility/Game";
import { memo, useCallback, useRef, useState } from "react";
import {
  CellComponent,
  FlagComponent,
  MineComponent,
  SoilComponent,
} from "@/utility/Cells";
import { LoseBanner, RestartButton, WinBanner } from "@/utility/Banner";

@TODO win state, Game State, winChecker, undo Flag, Cell Clicker, flagClicker
const Board = ({
  board,
  height,
  width,
  game,
  restartCallback,
  nextLevelCallback,
}: {
  board: Cell[][];
  height: number;
  width: number;
  game: Game;
  restartCallback: () => void;
  nextLevelCallback: () => void;
}) => {
  // my board rendering logic
  const [win, setWin] = useState<boolean | null>(null);
  const [boardState, setBoardState] = useState<Cell[][]>(board);
  



  return (
    <div className="relative w-full h-full flex flex-col justify-center items-center gap-y-[30px]">


      {win !== null && (
        <div className="absolute w-full h-full flex justify-center items-center z-10">
          {win ? (
            <WinBanner
              restartCallback={restartCallback}
              nextLevelCallback={nextLevelCallback}
            />
          ) : (
            <LoseBanner restartCallback={restartCallback} />
          )}
        </div>
      )}


      <div
        className={`grid justify-center items-center gap-x-[3px] rounded-2xl gap-y-[3px] bg-gray-600 ${
          win !== null ? "opacity-50" : ""
        } overflow-hidden`}
        style={{
          gridTemplateRows: `repeat(${height}, 40px)`,
          gridTemplateColumns: `repeat(${width}, 40px)`,
          height: `${height * 40 + 3 * (height - 1)}px`,
          width: `${width * 40 + 3 * (width - 1)}px`,
        }}
      >

        
        {boardState.map((row, rowIndex) => {
          return row.map((cell, colIndex) => {
            // ** conditional rendering logic **
            // if not revealed, is it flagged? if it's flagged, show flagged button component

            return boardState[rowIndex][colIndex].isRevealed ? (
              boardState[rowIndex][colIndex].isMine ? (
                <MineComponent key={`${rowIndex}-${colIndex}`} />
              ) : (
                <SoilComponent key={`${rowIndex}-${colIndex}`} cell={cell} />
              )
            ) : boardState[rowIndex][colIndex].isFlagged ? (
              <FlagComponent
                key={`${rowIndex}-${colIndex}`}
                undoFlag={undoFlag}
                cell={cell}
              />
            ) : (
              <CellComponent
                key={`${rowIndex}-${colIndex}`}
                prop={{
                  cell: cell,
                  cellModifier: cellClicker,
                  flagModifier: flagClicker,
                }}
              />
            );
          });
        })}
      </div>
      {win == null ? <RestartButton restartCallback={restartCallback} /> : null}
    </div>
  );
};
export default memo(Board);
