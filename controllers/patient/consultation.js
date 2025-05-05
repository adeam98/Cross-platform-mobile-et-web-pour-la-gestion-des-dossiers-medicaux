
const pool = require('../../config/db'); // assuming you've set up your db.js correctly

/*const getConsultation = async (req, res) => {
    const { id_user, id_consultation } = req.params;

    try {
        const userCheck = await pool.query('SELECT * FROM users WHERE id_user = $1', [id_user]);
        if (userCheck.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const result = await pool.query(
            'SELECT * FROM consultations WHERE id_consultation = $1 AND id_user = $2',[id_consultation, id_user]
        );
        
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Consultation not found" });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("Error fetching consultation:", error);
        res.status(500).json({ message: "Server error" });
    }
}*/

const getALLconsultation = async (req, res) => {
    const { id_user } = req.params;

    try {
        const userCheck = await pool.query('SELECT * FROM users WHERE id_user = $1', [id_user]);
        if (userCheck.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const result = await pool.query(
            'SELECT * FROM consultations WHERE id_user = $1',
            [id_user]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "No consultations found for this user" });
        }

        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Error fetching consultations:", error);
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = {
    getALLconsultation
};
