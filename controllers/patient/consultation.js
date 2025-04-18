const getConsultation = async (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(user => user.id === userId);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    if (!user.consultation || user.consultation.length === 0) {
        return res.status(200).json({ message: "No consultations found", data: [] });
    }
    res.status(200).json(user.consultation);
};
