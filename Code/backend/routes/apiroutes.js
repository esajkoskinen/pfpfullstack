const express = require("express");

let router = express.Router();

// Database

let database = [];
let id = 100;

// Get
router.get("/shopping", function(req,res) {
    let tempDatabase = database.filter(item => item.user === req.session.user);
    return res.status(200).json(tempDatabase);
});

// Post
router.post("/shopping", function(req,res) {
    let item = {
        type:req.body.type,
        price:req.body.price,
        count:req.body.count,
        id:id,
        user:req.session.user
    }
    id++;
    database.push(item);
    return res.status(200).json({message:"success!"});
});

// Delete
router.delete("/shopping/:id", function(req,res) {
    let tempId = parseInt(req.params.id,10);
    for(let i=0;i<database.length;i++) {
        if(tempId === database[i].id) {
            if(database[i].user !== req.session.user) {
                return res.status(409).json({message:"Conflict. You are not allowed to remove this object!"});
            }
            database.splice(i,1);
            return res.status(200).json({message:"success"})
        }
    }
    return res.status(404).json({message:"not found"})
});

// Put
router.put("/shopping/:id", function(req,res) {
    let tempId = parseInt(req.params.id,10);
    let item = {
        type:req.body.type,
        price:req.body.price,
        count:req.body.count,
        id:tempId,
        user:req.session.user
    };
    for(let i=0;i<database.length;i++) {
        if(database[i].id === tempId) {
            if(database[i].user !== req.session.user) {
                return res.status(409).json({message:"Conflict. You are not allowed to change this object!"});
            }
            database.splice(i, 1, item);
            return res.status(200).json({message:"success!"});
        }
    }
    return res.status(404).json({message:"not found!"});
});

module.exports = router;
