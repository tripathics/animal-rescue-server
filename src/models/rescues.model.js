import db from '../config/db.config.js'

class Rescues {
  static async create(user_id, org_id, animal_name, description, location_lat, location_lng, pictures) {
    const { rowCount } = await db.query(`
      INSERT INTO rescues (user_id, org_id, animal_name, description, location_lat, location_lng, pictures)
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *
    `, [user_id, org_id, animal_name, description, location_lat, location_lng, pictures]);
    return rowCount > 0;
  }

  static async find() {

  }


  static async findById(id) {

  }
}

export default Rescues;