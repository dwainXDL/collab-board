import { randomUUID } from "node:crypto";
import * as boardRepo from "../repositories/board.repo.js";

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
