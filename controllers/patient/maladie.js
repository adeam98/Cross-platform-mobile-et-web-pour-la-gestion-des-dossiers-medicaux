const getMaladie = async (req, res) => {
    const userId = parseInt(req.params.id); 
    const user = users.find(user => user.id === userId); 
    if (!user) {
        return res.status(404).json({ message: "User not found" }); 
    }
    
    const maladies = user.maladies || []; 

    if (maladies.length === 0) {
        return res.status(200).json({ message: "No maladies found", data: [] }); 
        
    }
    res.status(200).json(maladies); 
}
