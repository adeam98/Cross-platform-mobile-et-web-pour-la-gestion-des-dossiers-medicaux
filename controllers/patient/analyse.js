const pool = require('../../config/db'); // assuming you've set up your db.js correctly
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


/* const getAnalyse = async (req, res) => {
    const { id_user, id_analyse } = req.params;
    try {
       const userCheck = await pool.query('SELECT * FROM users WHERE id_user = $1', [id_user]); 
       if (userCheck.rows.length === 0) {
       return res.status(404).json({ message: "User not found" });
       }
      const result = await pool.query(
        'SELECT * FROM analyses WHERE id_analyse = $1 AND id_user = $2',
        [id_analyse, id_user]
      );
  
      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Analyse not found" });
      }
  
      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error("Error fetching analyse:", error);
      res.status(500).json({ message: "Server error" });
    }
  };  */
  const getALLAnalyse = async (req, res) => {
    const { id_user } = req.params;
  
    try {
      const userCheck = await pool.query('SELECT * FROM users WHERE id_user = $1', [id_user]);
      if (userCheck.rows.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const result = await pool.query(
        'SELECT * FROM analyses WHERE id_user = $1',
        [id_user]
      );
  
      if (result.rows.length === 0) {
        return res.status(404).json({ message: "No analyses found for this user" });
      }
  
      res.status(200).json(result.rows);
    } catch (error) {
      console.error("Error fetching analyses:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
const getAnalyseByEtat = async (req, res) => {
  const { id_user, etat } = req.params;
  try {
    const userCheck = await pool.query('SELECT * FROM users WHERE id_user = $1', [id_user]);
    if (userCheck.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const result = await pool.query(
      'SELECT * FROM analyses WHERE etat = $1 AND id_user = $2',
      [etat, id_user]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "No analyses found with this state" });
    }

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching analyses by state:", error);
    res.status(500).json({ message: "Server error" });
  }
}


module.exports = {
<<<<<<< HEAD
    getAnalyse,
    getALLAnalyse,
    getAnalyseByEtat
}
=======
    //getAnalyse,
    getALLAnalyse
}
>>>>>>> f2723cf90180971392ddadadeb267444bda532b0
