const pool = require('../config/db'); 

const AddAnalyse = async (req, res) => {
    const {idm}= req.params;
    const { idu,nom,description} =req.body;

    try { 
        const checkm = await pool.query('SELECT * FROM medcins WHERE id_user=$1',[idm]);
        if(checkm.rows.length==0)
        {
            return res.status(404).json({message:'medcin not found'});
        }
    }
    catch (err) {
        console.error("Error checking medcin:", err);
        return res.status(500).json({ message: "Server error" });
    }
    try {
        const checkp = await pool.query( 'SELECT FROM patients WHERE id_user=$1',[idu]);
        if(checkp.rows.length==0)
        {
           return res.status(404).json({message: 'user not found'});
        }

         await pool.query('INSERT INTO analyses(id_user,nom,description,etat) VALUES($1,$2,$3,0) RETURNING *',[idu,nom,description]);
         res.status(200).json({message:'analyse add successfully'})
         
    }
    catch (err)
     {
        console.error("Error adding analyse:", err);
        res.status(500).json({ message: "Server error", err });
    }
}

module.exports = {
    AddAnalyse
}
