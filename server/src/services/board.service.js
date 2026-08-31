import { randomUUID } from "node:crypto";
import * as boardRepo from "../repositories/board.repo.js";
import { NotFoundError, ForbiddenError } from "../utils/AppError.js";

export function assertMember(boardId, userId) {
  const board = boardRepo.findById(boardId);
  if (!board) throw new NotFoundError("Board");
  if (!board.members.includes(userId)) throw new ForbiddenError();
  return board;
}

export function createBoard(userId, { name }) {
  const board = {
    id: randomUUID(),
    name,
    ownerId: userId,
    members: [userId],
  };

  return boardRepo.createBoard(board);
}

export function listBoardsForUser(userId) {
  return boardRepo.listBoards().filter((b) => b.members.includes(userId));
}
