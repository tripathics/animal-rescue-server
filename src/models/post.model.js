import db from '../config/db.config.js'

class Post {
  static async create(user_id, description, post_type = 'post', pictures = null) {
    const { rowCount } = await db.query(`
      INSERT INTO posts (user_id, description, pictures, post_type)
      VALUES ($1, $2, $3, $4)
    `, [user_id, description, pictures, post_type]);
    return rowCount > 0;
  }

  static async find() {
    const { rows } = await db.query(`
    SELECT posts.*, profiles.first_name, profiles.last_name, profiles.avatar
    FROM posts LEFT JOIN profiles ON posts.user_id = profiles.user_id
    ORDER BY posts.created_at DESC
    `);
    return rows;
  }

  static async findDonationPosts() {
    const { rows } = await db.query(`
    SELECT posts.*, profiles.first_name, profiles.last_name, profiles.avatar
    FROM posts LEFT JOIN profiles ON posts.user_id = profiles.user_id
    WHERE post_type = 'donation'
    ORDER BY posts.created_at DESC
    `);
    return rows;
  }

  static async findById(id) {
    const { rows } = await db.query(`
    SELECT posts.*, profiles.first_name, profiles.last_name, profiles.avatar
    FROM posts LEFT JOIN profiles ON posts.user_id = profiles.user_id
    WHERE posts.id = $1 ORDER BY posts.created_at DESC
    `, [id]);
    return rows[0];
  }
}

export default Post;