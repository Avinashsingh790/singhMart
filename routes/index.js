var express = require('express');
var router = express.Router();

const userSchema = require('./users');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/cart', function(req, res, next) {
  res.render('cart');
});



router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/products', function(req, res, next) {
  res.render('products');
});



////////////////////important routes

router.post('/register', async function(req,res)
{
  try{
    const user = await userSchema.create({
      name:req.body.name,
      email:req.body.email,
      password:req.body.password
    })
  
    res.render('index');
  }


  catch (error) {
    res.status(500).json({
      success: false,
      message: "Error registering user",
      error: error.message
    });
  }
 

})



///////////////////// login route
router.post('/login', async (req, res) => {
  try {
    const user = await userSchema.findOne({ email: req.body.email });

    if (  user.password !== req.body.password) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }

    res.render('index');
  } catch (error) {
    res.status(500).json({ success: false, message: "Error logging in" });
  }
});


/////////// logout route 
router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ success: false, message: "Error logging out" });
    }
    res.redirect('/login'); 
  });
});






module.exports = router;
