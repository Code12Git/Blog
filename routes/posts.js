import express from "express";
import {
  createPostController,
  deletePostController,
  getAllPostController,
  getPostController,
  updatePostController,
} from "../controllers/PostController.js";

const router = express.Router();

//create post
router.post("/", createPostController);

//update post
router.put("/:id", updatePostController);

//delete post
router.delete("/:id", deletePostController);

//get post
router.get("/:id", getPostController);

//get all post
router.get("/", getAllPostController);

export default router;
