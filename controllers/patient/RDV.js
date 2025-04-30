const pool = require('../../config/db'); 

const getAllRDV = (req, res) => {
   const { id_user } = req.params;

    pool.query('SELECT * FROM rdvs WHERE id_user = $1', [id_user], (error, results) => {
        if (error) {
            console.error("Error fetching RDV:", error);
            return res.status(500).json({ message: "Server error" });
        }
        if (results.rows.length === 0) {
            return res.status(404).json({ message: "No RDV found for this user" });
        }
        res.status(200).json(results.rows);
    });
};
/*const getRDVById = async (req, res) => {
    const { id_user, id_rdv } = req.params;

    pool.query('SELECT * FROM rdvs WHERE id_rdv = $1 AND id_user = $2', [id_rdv, id_user], (error, results) => {
        if (error) {
            console.error("Error fetching RDV:", error);
            return res.status(500).json({ message: "Server error" });
        }
        if (results.rows.length === 0) {
            return res.status(404).json({ message: "RDV not found" });
        }
        res.status(200).json(results.rows[0]);
    });
}*/

module.exports = {
    getAllRDV,
    //getRDVById
};
