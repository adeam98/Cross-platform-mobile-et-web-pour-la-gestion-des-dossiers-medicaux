const pool = require('../config/db'); 
const bcrypt = require('bcrypt');

const getProfil = async (req, res) => {
    const { id_user } = req.params;

    try {
      const userResult = await pool.query('SELECT role FROM users WHERE id_user = $1', [id_user]);
  
      if (userResult.rows.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const role = userResult.rows[0].role;
  
      let profileQuery = '';

      if (role === 'patient') {

        profileQuery = 'SELECT * FROM patients WHERE id_user = $1';
      } 
      else if (role === 'medcin') {

        profileQuery = 'SELECT * FROM medcins WHERE id_user = $1';

      } else {

        return res.status(400).json({ message: "Invalid user role" });

      }
  
      const profileResult = await pool.query(profileQuery, [id_user]);
  
      if (profileResult.rows.length === 0) {

        return res.status(404).json({ message: "Profile not found" });

      }

      res.status(200).json(profileResult.rows[0]);
  
    } catch (error) {
      console.error("Error fetching profile:", error);
      res.status(500).json({ message: "Server error" });
    } 
}

module.exports = {
    getProfil 
};




