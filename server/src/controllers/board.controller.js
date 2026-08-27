import {
  createBoardService,
  getBoardsService,
} from "../services/board.service.js";

export const createBoard = (req, res) => {
  const board = createBoardService(req.body);
  res.status(201).json(board);
};

export const getBoards = (req, res) => {
  const boards = getBoardsService();
  res.json(boards);
};