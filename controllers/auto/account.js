let users = [];

const createAccount = (req, res) => {
  const {name, birthdate, address, email, password,password2 } = req.body;

  if (users.find(user => user.email === email)) {
    return res.status(400).json({ message: "Email already exists" });
  }
if(password !== password2)
    {
        return res.status(400).json({ message: "Passwords do not match" });
    }
  const newUser = {
    id: Date.now(),
    name,
    birthdate,
    address,
    email, 
    password,
    folder:[]
  };
  users.push(newUser);
  res.status(201).json(newUser);
};

const modifyInformation = (req, res) => {
  const userId = parseInt(req.params.id); 
  const user = users.find(user => user.id === userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const { name, birthdate, address, email, password } = req.body;

  user.name = name || user.name;
  user.birthdate = birthdate || user.birthdate;
  user.address = address || user.address;
  user.email = email || user.email;
  user.password = password || user.password;

  res.status(200).json(user);
};

//const deleteAccount = (req, res) => {
   // const userId = parseInt(req.params.id);
   // const userIndex = users.findIndex(user => user.id === userId);
   // if (userIndex === -1) {
    //    return res.status(404).json({ message: "User not found" });
   // }
    //users.splice(userIndex, 1);
    //res.status(200).json({ message: "Account deleted successfully" });
//}
const login = (req, res) => {
  const { email, password } = req.body;

  const user = users.find(user => user.email === email && user.password === password);

  if (!user) {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }

  res.status(200).json({
    success: true,
    message: "Login successful",
    user
  });
};



