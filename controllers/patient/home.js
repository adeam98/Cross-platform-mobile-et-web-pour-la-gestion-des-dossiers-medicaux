const users = require('../path/to/users/data');

const getHomePage = (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({
    welcome: `Welcome back Mr , ${user.name}`,
    folders: user.folder,
  });
};

module.exports = { getHomePage };