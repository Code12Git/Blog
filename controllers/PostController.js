import userModel from "../models/User.js";
import postModel from "../models/Post.js";

//Create Post
export const createPostController = async (req, res) => {
  const newPost = new postModel(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
};
//Update Post Controller
export const updatePostController = async (req, res) => {
  try {
    const post = await postModel.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedpost = await postModel.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedpost);
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(401).json("You can update only your post");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

//Delete Post Controller
export const deletePostController = async (req, res) => {
  try {
    const post = await postModel.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await postModel.deleteOne();
        res.status(200).json("Post has been deleted Successfully!");
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(401).json("You can delete only your post");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

//Get Post Controller
export const getPostController = async (req, res) => {
  try {
    const post = await postModel.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
};

//Get All Post
export const getAllPostController = async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await postModel.find({ username });
    } else if (catName) {
      posts = await postModel.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await postModel.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
};
