import { createBoard, getBoards } from "../repositories/board.repo.js";

export const createBoardService = (board) => {
  return createBoard(board);
};

export const getBoardsService = () => {
  return getBoards();
};