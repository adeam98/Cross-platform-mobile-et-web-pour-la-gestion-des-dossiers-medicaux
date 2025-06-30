const path = require('path');
const fs = require('fs');

const servePdfFile = (req, res) => {
  const filePath = path.join(__dirname, '../uploads', req.params.fileName);

  fs.exists(filePath, (exists) => {
    if (exists) {
      res.setHeader('Content-Type', 'application/pdf');
      res.sendFile(filePath);
    } else {
      res.status(404).json({ message: 'File not found' });
    }
  });
};

module.exports = {
  servePdfFile
};
