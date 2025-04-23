const pool = require('../config/db'); 

const getAllMedicament = async (req, res) => {
    const { id_user } = req.params;
    try {
        const userCheck = await pool.query('SELECT * FROM users WHERE id_user = $1', [id_user]);
        if (userCheck.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
    
        const result = await pool.query(
            'SELECT * FROM medicaments WHERE id_user = $1',[ id_user]
        );
    
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Medicaments not found" });
        }
        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Error fetching medicaments:", error);
        res.status(500).json({ message: "Server error" });
    }
};
module.exports = {  
    getAllMedicament
};
