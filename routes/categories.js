import express from "express";
import {
  CategoryController,
  getCategoryController,
} from "../controllers/CategoryController.js";

const router = express.Router();

router.post("/", CategoryController);

//get Categories
router.get("/", getCategoryController);

export default router;
