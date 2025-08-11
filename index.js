let express = require('express');
const mongoose = require('mongoose')
let path = require('path')
let bcrypt = require('bcrypt')
const User = require('./config');
let app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'))
app.use(express.json())

app.use(express.urlencoded({extended:false}))

app.get('/', (req, res) => {
  res.render('login');
});

app.get('/signup', (req, res) => {
  res.render('signup');
});

app.post('/signup', async (req, res) => {
  try {
      const { fstname, lstname, email, tel, password } = req.body;

      // Check if user already exists
      const existuser = await User.findOne({ Email: email });
      if (existuser) {
          return res.send("User already exists");
      }

      // Hash password before storing
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const data = {
          FirstName: fstname,
          LastName: lstname,
          Email: email,
          Tel: tel,
          Password: hashedPassword
      };

      const Userdata = await User.create(data);
      console.log(Userdata);
      res.send("Signup successful!");
  } catch (error) {
      console.error("Signup Error:", error);
      res.status(500).send("Error during signup");
  }
});

app.post('/login' , async(req,res)=>{
    try{
      console.log("Login Attempt:", req.body);
      const email = req.body.email.toLowerCase();
      const check = await User.findOne({Email : email})
      if(!check){
        res.send('USER cannot found')
      }
      const ispassmatch = await bcrypt.compare(req.body.password,check.Password)
      if(ispassmatch){
        res.render('home')
      }
      else{
        res.send('wrong pass')
      }
     }
     catch (error) {
            console.error("Login Error:", error);
            res.status(500).send('Error during login');
        }
})

app.listen(5000, () => console.log('Example app listening on port 5000!'));