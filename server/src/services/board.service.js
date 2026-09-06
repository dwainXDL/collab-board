import * as boardRepo from "../repositories/board.repo.js";
import { NotFoundError, ForbiddenError } from "../utils/AppError.js";

export async function assertMember(boardId, userId) {
  const board = await boardRepo.findById(boardId);
  if (!board) throw new NotFoundError("Board");
  if (!board.members.some((m) => m.userId.equals(userId)))
    throw new ForbiddenError();
  return board;
}

export async function createBoard(userId, { name }) {
  return boardRepo.createBoard({
    name,
    ownerId: userId,
    members: [{ userId, role: "owner" }],
  });
}

export async function listBoardsForUser(userId) {
  const boards = await boardRepo.listBoards();
  return boards.filter((b) => b.members.some((m) => m.userId.equals(userId)));
}
