import { Board } from "../models/board.model.js";

export const createBoard = (data) => Board.create(data);

export const findById = (id) => Board.findById(id);

export const listBoards = () => Board.find();
