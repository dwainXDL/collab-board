const boards = [];

export const createBoard = (board) => {
  boards.push(board);
  return board;
};

export const listBoards = () => boards;