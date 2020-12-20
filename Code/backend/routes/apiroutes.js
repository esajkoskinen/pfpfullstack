const express = require("express");
const mysql = require("mysql");
//const mongoose = require("mongoose");
//const itemModel = require("../models/item");

let router = express.Router();

// Login databases
const pool2 = mysql.createPool({
    connectionLimit: 100,
    host: "localhost",
    user: "root",
    password: "",
    database: "pfpstore"
});

// Get
router.get("/accounts", function(req,res) {
//    let query = {"user":req.session.user};
//    if(req.query.type) {
//        query["type"] = req.query.type.toLowerCase();
//    }
    let sql = "SELECT * FROM ?? JOIN ?? ON ?? = ?";
    let query = mysql.format(sql,["accounts", "accounts_users", "accounts_users.user_id", req.session.userid]);
    pool2.query(query, (err, rows) => {
        if(err) {
            console.log("Failed to find accounts. Reason:",err);
            return res.status(500).json({message:"Internal server error"})
        }
        console.log("Got something..");
        return res.status(200).json(accounts);
    })
});

/*
router.get("/shopping", function(req,res) {
    let query = {"user":req.session.user};
    if(req.query.type) {
        query["type"] = req.query.type.toLowerCase();
    }
    itemModel.find(query,function(err,items) {
        if(err) {
            console.log("Failed to find items. Reason:",err);
            return res.status(500).json({message:"Internal server error"})
        }
        return res.status(200).json(items);
    })
});
*/

// Post
router.post("/shopping", function(req,res) {
    let item = new itemModel({
        type:req.body.type.toLowerCase(),
        price:req.body.price,
        count:req.body.count,
        user:req.session.user
    })
    item.save(function(err) {
        if(err) {
            console.log("Failed to save item. Reason:",err);
            return res.status(500).json({message:"Internal server error"})
        }
        return res.status(200).json({message:"success!"});
    })
});

// Delete
router.delete("/shopping/:id", function(req,res) {
    itemModel.deleteOne({"_id":req.params.id,"user":req.session.user}, function(err) {
        if(err) {
            console.log("Failed to delete item. Reason:",err);
            return res.status(500).json({message:"Internal server error"})
        }
        return res.status(200).json({message:"success"})
    })
});

// Put
router.put("/shopping/:id", function(req,res) {
    if(!req.body) {
        return res.status(400).json({message:"Bad request"});
    }
    if(!req.body.type) {
        return res.status(400).json({message:"Bad request"});
    }
    let item = {
        type:req.body.type.toLowerCase(),
        price:req.body.price,
        count:req.body.count,
        user:req.session.user
    };
    itemModel.replaceOne({"_id":req.params.id,"user":req.session.user},item, function(err,item) {
        if(err) {
            console.log("Failed to edit iten. Reason:",err);
            return res.status(500).json({message:"Internal server error"})
        }
        if(!item) {
            return res.status(404).json({message:"not found"})
        }
        return res.status(200).json({message:"success"});
    })
});

module.exports = router;
