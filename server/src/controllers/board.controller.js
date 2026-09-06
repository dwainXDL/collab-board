import { asyncHandler } from "../utils/asyncHandler.js";
import * as boardService from "../services/board.service.js";

export const create = asyncHandler(async (req, res) => {
  const board = await boardService.createBoard(req.user.id, req.body);
  res.status(201).json(board);
});

export const list = asyncHandler(async (req, res) => {
  res.json(await boardService.listBoardsForUser(req.user.id));
});
export const stats = asyncHandler(async (req, res) => {
  res.json(await boardService.getBoardStats(req.params.id, req.user.id));
});