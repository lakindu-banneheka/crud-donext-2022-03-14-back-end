const router = require("express").Router();
const { route } = require("express/lib/application");
const { redirect } = require("express/lib/response");
const User = require("../modules/User");
const { updateOne } = require("../modules/User");



router.get('/user/get', async (req,res) => {                             
    User.find()
    .exec((error,userList) => {
        if(error) {
            return res.status(400).json({ error });
        }
        if(userList){
            return res.status(200).json({ userList });
        }});
});

router.post('/user/add', async (req,res) => {   
    const { user } = req.body;
    const {name , email, phoneNo} = user;

    const newuser = new User ({ name, email, phoneNo });  
                   
    const all = await newuser.save();

    res.json( all );
});


router.post('/user/edit/:id', async (req,res) => {   
    let userId = req.params.id;
    const { name , email, phoneNo } = req.body;
    const updated = await User.findByIdAndUpdate(userId, {name , email, phoneNo} );
    res.status(201).json(updated);
});


router.delete('/user/delete/:id', async (req,res) => {   
    let userId = req.params.id;
    const deleted = await User.findByIdAndDelete(userId);
    res.status(204).json(deleted);
});

module.exports =  router;