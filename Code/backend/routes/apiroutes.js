const express = require("express");
const mysql = require("mysql");

let router = express.Router();

// Login databases
const pool2 = mysql.createPool({
    connectionLimit: 100,
    host: "localhost",
    user: "root",
    password: "KuppaFiilu",
    database: "pfpstore",
    supportBigNumbers: true
});

function checkAccountsUser(userId, accountId, callback) {
    // Check that the given account id belongs to the user
    let sql = "SELECT ??.* FROM ?? INNER JOIN ?? ON ?? = ?? WHERE ?? = ? AND ?? = ?";
    let query = mysql.format(sql,["accounts", "accounts", "accounts_users", "accounts_users.account_id", "accounts.id", "accounts_users.user_id", userId, "accounts.id", accountId]);
    pool2.query(query, (err, rows) => {
        if(err) {
            console.log("Failed to find accounts. Returning false. Reason:",err);
            return callback(false);
        }
        if(rows.length === 1) {
            return callback(true);
        } else {
            console.log("Failed to find the account, returning false, row amount:" + rows.length);
            return callback(false);
        }
    })
}

// ACCOUNTS
// Get Accounts for user according to userId
router.get("/accounts", function(req,res) {
    let sql = "SELECT ??.* FROM ?? INNER JOIN ?? ON ?? = ?? WHERE ?? = ?";
    let query = mysql.format(sql,["accounts","accounts", "accounts_users", "accounts_users.account_id", "accounts.id", "accounts_users.user_id", req.session.user_id]);
    
    pool2.query(query, (err, accounts) => {
        if(err) {
            console.log("Failed to find accounts. Reason:",err);
            return res.status(500).json({message:"Internal server error"})
        }
        return res.status(200).json(accounts);
    })
});

// Add an account for user
router.post("/accounts", function(req,res) {
    if(!req.body) {
        return res.status(400).json({message:"Bad request"});
    }
    if(!req.body.name) {
        return res.status(400).json({message:"Bad request"});
    }
    if(!req.body.depository) {
        return res.status(400).json({message:"Bad request"});
    }
    if(!req.body.balance) {
        return res.status(400).json({message:"Bad request"});
    }
    // Get userid
    let userId = req.session.user_id;
    // Add the account
    let sql = "INSERT INTO ?? (??,??,??) VALUES (?,?,?)";
    let insertQuery = mysql.format(sql,["accounts", "accounts.name", "accounts.depository", "accounts.balance", req.body.name, req.body.depository, req.body.balance]);
    pool2.query(insertQuery, (err, result) => {
        if(err) {
            console.log("Failed to insert account. Reason:",err);
            return res.status(500).json({message:"Internal server error"})
        }
        // Get the id of the account record
        let accountId = result.insertId;
        // Add new record to accounts_users -table with userid and accountid
        let sql2 = "INSERT INTO ?? (??,??) VALUES (?,?)";
        let insertQuery2 = mysql.format(sql2,["accounts_users", "accounts_users.user_id", "accounts_users.account_id", userId, accountId]);
        pool2.query(insertQuery2, (err2, result2) => {
            if(err2) {
                console.log("Failed to insert accounts_users -link. Reason:",err2);
                return res.status(500).json({message:"Internal server error"})
            }
            return res.status(200).json({message:"success!"});
        })
    })
});

// Update user's edited account
router.put("/account/:id", function(req,res) {
    if(!req.body) {
        return res.status(400).json({message:"Bad request"});
    }
    if(!req.body.name) {
        return res.status(400).json({message:"Bad request"});
    }
    if(!req.body.depository) {
        return res.status(400).json({message:"Bad request"});
    }
    if(!req.body.balance) {
        return res.status(400).json({message:"Bad request"});
    }
    if(!req.params.id) {
        return res.status(400).json({message:"Bad request"});
    }
    let checkID = false;
    checkAccountsUser(req.session.user_id, req.params.id, function(result) {
        checkID = result;
        if(checkID === true) {
            // Account belongs to the user, do the update
            let sql2 = "UPDATE ?? SET ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?";
            let updateQuery = mysql.format(sql2,["accounts", "accounts.name", req.body.name, "accounts.depository", req.body.depository, "accounts.balance", req.body.balance, "accounts.id", req.params.id]);
            pool2.query(updateQuery, (err, result) => {
                if(err) {
                    return res.status(500).json({message:"Internal server error"})
                }
                return res.status(200).json({message:"success!"});
            })
        } else {
            return res.status(500).json({message:"Internal server error"})
        }
    })
});

// Delete user's account
router.delete("/account/:id", function(req,res) {
    if(!req.params.id) {
        return res.status(400).json({message:"Bad request"});
    }
    let checkID = false;
    checkAccountsUser(req.session.user_id, req.params.id, function(result) {
        checkID = result;
        if(checkID === true) {
            // Account belongs to the user
            // Check whether there are receipts / budgets linked to this account
            // first the budgets:
            let bsql = "SELECT ??.* from ?? WHERE ?? = ?";
            let bCheckQuery = mysql.format(bsql,["accounts_budgets", "accounts_budgets", "accounts_budgets.account_id", req.params.id]);
            pool2.query(bCheckQuery, (err, result) => {
                if(err) {
                    checkID = false;
                    console.log("Failed to find budgets. Reason:",err);
                    return res.status(500).json({message:"Internal server error"})
                }
                if(result.length === 0) {
                    // then the receipts:
                    let rsql = "SELECT ??.* from ?? WHERE ?? = ?";
                    let rCheckQuery = mysql.format(rsql,["accounts_receipts", "accounts_receipts", "accounts_receipts.account_id", req.params.id]);
                    pool2.query(rCheckQuery, (err, result) => {
                        if(err) {
                            checkID = false;
                            console.log("Failed to find receipts. Reason:",err);
                            return res.status(500).json({message:"Internal server error"})
                        }
                        if(result.length === 0) {
                            // Delete account
                            let sql2 = "DELETE FROM ?? WHERE ?? = ?";
                            let deleteQuery = mysql.format(sql2,["accounts", "accounts.id", req.params.id]);
                            pool2.query(deleteQuery, (err, result) => {
                                if(err) {
                                    console.log("Failed to delete account. Reason:",err);
                                    return res.status(500).json({message:"Internal server error"})
                                }
                                // Delete link record
                                let sql3 = "DELETE FROM ?? WHERE ?? = ?";
                                let deleteLinkQuery = mysql.format(sql3,["accounts_users", "accounts_users.account_id", req.params.id]);
                                pool2.query(deleteLinkQuery, (err, result) => {
                                    if(err) {
                                        console.log("Failed to delete account's link record. Reason:",err);
                                        return res.status(500).json({message:"Internal server error"})
                                    }
                                    return res.status(200).json({message:"success"})
                                })
                            })
                        } else {
                            return res.status(500).json({message:"Internal server error"})
                        }
                    })
                } else {
                    return res.status(500).json({message:"Internal server error"})
                }
            })
        } else {
            return res.status(500).json({message:"Internal server error"})
        }
    })
});

// Get Budgets for user according to userId
router.get("/budgets", function(req,res) {
    //let sql = "SELECT ??.* FROM ?? INNER JOIN ?? ON ?? = ?? WHERE ?? = ?";
    //let query = mysql.format(sql,["budgets","budgets", "accounts_users", "accounts_users.account_id", "accounts.id", "accounts_users.user_id", req.session.user_id]);
    //pool2.query(query, (err, accounts) => {
    //    if(err) {
    //        console.log("Failed to find accounts. Reason:",err);
    //        return res.status(500).json({message:"Internal server error"})
    //    }
    //    return res.status(200).json(accounts);
    //})
});


/*
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
//*/

/*
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
//*/

/*
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
//*/

module.exports = router;
