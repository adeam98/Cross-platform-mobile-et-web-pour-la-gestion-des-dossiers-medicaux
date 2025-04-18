const getAnalyse = async (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(user => user.id === userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    const analyses = user.analyses || [];

    if (analyses.length === 0) {
        return res.status(200).json({ message: "No analyses found", data: [] });
    }
    res.status(200).json(analyses);
}