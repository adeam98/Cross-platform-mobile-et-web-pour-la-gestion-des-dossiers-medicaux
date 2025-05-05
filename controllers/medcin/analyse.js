const pool = require('../../config/db'); 

const addAnalyse = async (req, res) => {
    const {id_user}= req.params;
    const {nom,description} =req.body;
    try {
        const checkp = await pool.query( 'SELECT FROM patients WHERE id_user=$1',[id_user]);
        if(checkp.rows.length==0)
        {
            return res.status(404).json({message: 'user not found'});
        }

         await pool.query('INSERT INTO analyses(id_user,nom,description,etat) VALUES($1,$2,$3,0) RETURNING *',[id_user,nom,description]);
          res.status(200).json({message:'analyse add successfully'})
    }
    catch (err)
     {
        console.error("Error adding analyse:", err);
        res.status(500).json({ message: "Server error", err });
    }
}
 const getAnalyseByEtat = async (req, res) => {
   const {id_user,etat} = req.params;
 if (etat !== 0 && etat !== 1) {
          return res.status(400).json({ message: "etat must be 0 or 1" });
     }
    if (isNaN(id_user)) {
        return res.status(400).json({ message: "id_user must be a number" });   
    }
    if (id_user <= 0) {
        return res.status(400).json({ message: "id_user must be a positive number" });
    }
   try{
    const check = await pool.query('SELECT * FROM patients where id_user = $1',[id_user])
    if(check.rows.length === 0){
        return res.status(404).json({ message: "User not found" });
    }
    const result = await pool.query('SELECT * FROM analyses where id_user = $1 and etat = $2',[id_user,etat])
    if (result.rows.length === 0) {
        return res.status(404).json({ message: "No analyses found for this user" });
    }
    res.status(200).json(result.rows);     
   }
    catch(error){
     console.error("Error fetching analyse:", error);
     res.status(500).json({ message: "Server error" });
    }
}
module.exports = {
    addAnalyse,
    getAnalyseByEtat
}

