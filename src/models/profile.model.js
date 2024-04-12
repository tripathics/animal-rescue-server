import db from '../config/db.config.js';

const profileColumns = [
  'user_id',
  'first_name',
  'last_name',
  'address',
  'pincode',
  'state',
  'city',
  'country',
  'phone',
  'avatar',
  'location_lat',
  'location_lng',
];

class Profile {
  static async createOrUpdate(userId, profileData) {
    const columns = profileColumns.filter((column) => profileData[column] !== undefined && column !== 'user_id');
    const values = [userId, ...columns.map((column) => profileData[column])];

    const sql = `
      INSERT INTO profiles (user_id, ${columns.join(', ')})
      VALUES ($1, ${columns.map((_, i) => `$${i + 2}`).join(', ')})
      ON CONFLICT (user_id) DO UPDATE SET
      ${columns.map((column) => `${column} = EXCLUDED.${column}`).join(', ')}
      RETURNING *
    `;
    const result = await db.query(sql, values);
    return result.rows[0];
  }

  static async updateAvatar(userId, avatar) {
    const result = await db.query(`
      UPDATE profiles
      SET avatar = $1
      WHERE "user_id" = $2
      RETURNING *
    `, [avatar, userId]);

    return result.rows[0];
  }
}

export default Profile;
