import Post from "../models/post.model.js";

export const createPost = async (req, res, next) => {
  const { description, post_type } = req.body;
  const { id: user_id } = req.user;
  const pictures = [req.file?.fileName];

  try {
    const post = await Post.create(user_id, description, post_type, pictures);
    res.status(201).json({ message: 'Post created', post, success: true });
  } catch (error) {
    next(error);
  }
}

export const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.status(200).json({ posts, message: 'Posts found', success: true });
  } catch (error) {
    next(error);
  }
}