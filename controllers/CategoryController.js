import categoryModel from "../models/Category.js";

export const CategoryController = async (req, res) => {
  const newCat = new categoryModel(req.body);
  try {
    const savedCat = await newCat.save();
    res.status(200).json(savedCat);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getCategoryController = async (req, res) => {
  try {
    const Category = await categoryModel.find();
    res.status(200).json(Category);
  } catch (err) {
    res.status(500).json(err);
  }
};
