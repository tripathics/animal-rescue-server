import Post from "../models/post.model.js";

export const createPost = async (req, res, next) => {
  const { description, post_type } = req.body;
  const { id: user_id } = req.user;
  const pictures = req.files?.map(file => file.filename)

  try {
    const post = await Post.create(user_id, description, post_type, pictures || null);
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

export const getPostById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    res.status(200).json({ post, message: 'Post found', success: true });
  } catch (error) {
    next(error);
  }
}

export const getDonationPosts = async (req, res, next) => {
  try {
    const donationPosts = await Post.findDonationPosts();
    res.status(200).json({ posts: donationPosts, message: 'Donation posts found', success: true });
  } catch (error) {
    next(error);
  }
}