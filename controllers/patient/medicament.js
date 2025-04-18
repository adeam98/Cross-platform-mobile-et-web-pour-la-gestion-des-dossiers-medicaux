const getMedicaments = (req, res) => {
    const userId = parseInt(req.params.id); 
    const user = users.find(user => user.id === userId); 

    if (!user) {
        return res.status(404).json({ message: "User not found" }); 
    }

    const medicaments = user.medicaments || []; 
    if (medicaments.length === 0) {
        return res.status(200).json({ message: "No medicaments found", data: [] }); 
    }
    res.status(200).json(medicaments); 
};
