const boards = [];

export const createBoard = (board) => {
  boards.push(board);
  return board;
};

export const findById = (id) => boards.find((b) => b.id === id) ?? null;

export const listBoards = () => boards;
