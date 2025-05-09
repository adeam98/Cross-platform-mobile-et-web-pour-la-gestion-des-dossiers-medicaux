const pool = require('../../config/db'); 

const AddAnalyse = async (req, res) => {
   const {idc}= req.params;
   const {cin,result,date_exam}=req.body;

   try {
    const check = await pool.query('SELECT * FROM centres_analyses WHERE id_user=$1',[idc]);

    if(check.rows.length==0)
    {
       return  res.status(404).json({message: 'user not found'});
    }
    const check2 = await pool.query('SELECT *FROM patients WHERE cin=$1',[cin]);
    if(check2.rows.length==0)
        {
            return  res.status(404).json({message: 'patients not found'});
        } 
    const me = check.rows[0];
     await pool.query('INSERT INTO analyses(resultat,date_examen,nom_centre_analyse,etat) VALUES ($1,$2,$3,1) WHERE id_analyse= $4',[result,date_exam,me.nom,id_analyse])
     res.status(200).json({message:'analyse add successfully'});
   }
   catch(err)
   {
    console.error("Error adding analyse:", err);
     res.status(500).json({ message: "Server error", err });
   }
};

/*const getAnalyseById = async (req, res) => {
    const {id_user,id_analyse} = req.params;
    if (!id_user || !id_analyse) {
        return res.status(400).json({ message: "All fields are required" });
    }
    if (isNaN(id_user) || isNaN(id_analyse)) {
        return res.status(400).json({ message: "id_user and id_analyse must be numbers" });
    }
    if (id_user <= 0 || id_analyse <= 0) {
        return res.status(400).json({ message: "id_user and id_analyse must be positive numbers" });
    } 
    try{
          const check = await pool.query('SELECT * FROM patients where id_user = $1',[id_user])
          if(check.rows.length === 0){
            return res.status(404).json({ message: "User not found" });
          }
            const result = await pool.query('SELECT * FROM analyses where id_analyse = $1 and id_user = $2',[id_analyse,id_user])   
            if(result.rows.length === 0){
                return res.status(404).json({ message: "Analyse not found" });
            }
            res.status(200).json(result.rows[0]); 
    }
    catch(error){
        console.error("Error fetching analyse:", error);
        res.status(500).json({ message: "Server error" });
    }
}*/

/*const updateAnalyse = async (req, res) => {

    const { id_user, id_analyse } = req.params;
    const { nom, description, etat, resultat, date_examen, nom_centre_analyse } = req.body;
    if (!id_user || !id_analyse || !nom || !description || !resultat || !date_examen || !nom_centre_analyse) {
        return res.status(400).json({ message: "All fields are required" });
    }   
    if (isNaN(id_user) || isNaN(id_analyse)) {
        return res.status(400).json({ message: "id_user and id_analyse must be numbers" });
    }
    if (id_user <= 0 || id_analyse <= 0) {
        return res.status(400).json({ message: "id_user and id_analyse must be positive numbers" });
    }
    if(etat==1&&resultat==null){
        return res.status(400).json({ message: "resultat is required" });
    }
    if(etat==0&&resultat!=null){
        return res.status(400).json({ message: "etat is required" });
    }
    if (etat !== 0 && etat !== 1) {
        return res.status(400).json({ message: "etat must be 0 or 1" });     
    }
    try {
        const userCheck = await pool.query('SELECT * FROM patients WHERE id_user = $1', [id_user]);
        if (userCheck.rows.length === 0) {
            return res.status(404).json({ message: "Patient not found" });
        }
        const analyseCheck = await pool.query('SELECT * FROM analyses WHERE id_analyse = $1 AND id_user = $2', [id_analyse, id_user]);
        if (analyseCheck.rows.length === 0) {
            return res.status(404).json({ message: "Analyse not found" });
        }
        const result = await pool.query(
            `UPDATE analyses
             SET nom = $1, description = $2, etat = $3, resultat = $4, date_examen = $5, nom_centre_analyse = $6
             WHERE id_analyse = $7 AND id_user = $8
             RETURNING *`,      
            [nom, description, etat, resultat, date_examen, nom_centre_analyse, id_analyse, id_user]
        );
        if (result.rows.length === 0) { 
            return res.status(404).json({ message: "Analyse not found" });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("Error updating analyse:", error);
        res.status(500).json({ message: "Server error", error });
    }
}; */
/*const getAllAnalyse = async (req, res) => {
    const userId = parseInt(req.params.id);
    try {
        const check = await pool.query('SELECT * FROM patients where id_user = $1',[userId])
        if(check.rows.length === 0){
            return res.status(404).json({ message: "User not found" });
        }
}catch( error){
    console.error("Error fetching analyse:", error);
    res.status(500).json({ message: "Server error" });

}
    const result = await pool.query('SELECT * FROM analyses where id_user = $1',[userId])
    if (result.rows.length === 0) {
        return res.status(404).json({ message: "No analyses found for this user" });
    }
    res.status(200).json(result.rows);

}*/
/*const getAnalyseByEtat = async (req, res) => {
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
}*/

module.exports = { AddAnalyse }

