const express = require("express");
const bodyParser = require("body-parser");
const apiroutes = require("./routes/apiroutes");
const bcrypt = require("bcrypt");
const mysql = require("mysql");

let app = express();

app.use(bodyParser.json());

// Login databases
const pool = mysql.createPool({
    connectionLimit: 100,
    host: "localhost",
    user: "root",
    password: "KuppaFiilu",
    supportBigNumbers: true
});

let loggedSessions = [];
const ttl_diff = 3600000;
// if implementing a switch for 'Keep me logged in', change the session storage to local storage

// Middleware
createToken = () => {
    let token = "";
    let letters = "ABCDEFGHIJabcdefghij0123456789"
    for(let i=0;i<128;i++) {
        let temp = Math.floor(Math.random()*letters.length);
        token = token + letters[temp];
    }
    return token;
}

isUserLogged = (req,res,next) => {
    if(!req.headers.token) {
        return res.status(403).json({message:"forbidden"});
    }
    
    let sql = "SELECT * FROM ?? WHERE ?? = ?";
    let query = mysql.format(sql,["pfpfs.sessions", "token", req.headers.token]);
    pool.query(query, (err, rows) => {
        if(err) {
            console.log("Error querying database",err);
            return res.status(500).json({message:"Internal server error"});
        }
        if(rows.length === 0) {
            console.log("No user in sessions");
            return res.status(403).json({message:"forbidden"});
        }
        let session = rows[0];
        let now = Date.now();
        if(now > session.ttl) {
            let sql = "DELETE FROM ?? WHERE ?? = ?";
            let query = mysql.format(sql,["pfpfs.sessions", "token", session.token]);
            pool.query(query, (err, rows) => {
                if(err) {
                    console.log("Error querying database",err);
                    return res.status(500).json({message:"Internal server error"});
                }
                return res.status(403).json({message:"forbidden"});
            })
        } else {
            req.session = {};
            req.session.user_email = session.user_email;
            req.session.user_id = session.user_id
            let tempTtl = now + ttl_diff;
            let sql = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
            let query = mysql.format(sql,["pfpfs.sessions", "ttl", tempTtl,"token", session.token]);
            pool.query(query, (err, rows) => {
                if(err) {
                    console.log("Error querying database",err);
                    return res.status(500).json({message:"Internal server error"});
                }
                return next();
            })
        }
    })
    
    //return res.status(403).json({message:"forbidden"});
}

// Login api

app.post("/register", function(req,res) {
    if(!req.body) {
        return res.status(400).json({message:"Bad Request"});
    }
    if(!req.body.password || !req.body.useremail) {
        return res.status(400).json({message:"Bad Request"});
    }
    if(req.body.password.length < 8 || req.body.useremail.length < 4) {
        return res.status(400).json({message:"Bad Request"});
    }
    
    let sql = "SELECT * FROM ?? WHERE ?? = ?";
    let query = mysql.format(sql,["pfpfs.users", "email", req.body.useremail]);
    pool.query(query, (err, rows) => {
        if(err) {
            if(err.errno === 1062) {
                return res.status(409).json({message:"User email is already in use"});
            }
            console.log("Error querying database",err);
            return res.status(500).json({message:"Internal server error"});
        }
        if(rows.length > 0) {
            console.log("User email is already in use");
            return res.status(409).json({message:"User email is already in use"});
        }
    })
    bcrypt.hash(req.body.password,14,function(err,hash) {
        if(err) {
            return res.status(400).json({message:"Bad Request"});
        }
        let user = {
            username:req.body.username,
            useremail:req.body.useremail,
            password:hash
        }
        
        sql = "INSERT INTO ?? (??,??,??) VALUES (?,?,?)";
        query = mysql.format(sql,["pfpfs.users", "name", "email", "password", user.username, user.useremail, user.password]);
        pool.query(query, (err, rows) => {
            if(err) {
                console.log("Error inserting user to database",err);
                return res.status(500).json({message:"Internal server error"});
            }
            return res.status(200).json({message:"success!"});
        });
    })
});

app.post("/login", function(req,res) {
    if(!req.body) {
        return res.status(400).json({message:"Bad Request"});
    }
    if(!req.body.password || !req.body.useremail) {
        return res.status(400).json({message:"Bad Request"});
    }
    if(req.body.password.length < 8 || req.body.useremail.length < 4) {
        return res.status(400).json({message:"Bad Request"});
    }
    
    let sql = "SELECT * FROM ?? WHERE ?? = ?";
    let query = mysql.format(sql,["pfpfs.users", "email", req.body.useremail]);
    pool.query(query, (err, rows) => {
        if(err) {
            console.log("Error querying database",err);
            return res.status(500).json({message:"Internal server error"});
        }
        if(rows.length === 1) {
            if(rows[0].email === req.body.useremail) {
                bcrypt.compare(req.body.password,rows[0].password,function(err,success) {
                    if(err) {
                        console.log("return 1",err);
                        return res.status(400).json({message:"Bad Request"});
                    }
                    if(!success) {
                        return res.status(403).json({message:"forbidden"});
                    }
                    let token = createToken();
                    let now = Date.now();
                    let ttl = now + ttl_diff;
                    let userid = rows[0].id;
                    let useremail = rows[0].email;
                    
                    sql = "INSERT INTO ?? (??,??,??,??) VALUES (?,?,?,?)";
                    query = mysql.format(sql,["pfpfs.sessions", "user_email", "user_id", "token", "ttl", useremail, userid, token, ttl]);
                    pool.query(query, (err, rows) => {
                        if(err) {
                            console.log("Error inserting session to database",err);
                            return res.status(500).json({message:"Internal server error"});
                        }
                    })
                    return res.status(200).json({token:token});
                });
            }
        } else {
            return res.status(403).json({message:"forbidden"});
        }
    });
});

app.post("/logout", function(req,res) {
    if(!req.headers.token) {
        return res.status(404).json({message:"not found"});
    }
    
/*    
    for(let i=0;i<loggedSessions.length;i++) {
        if(loggedSessions[i].token === req.headers.token) {
            loggedSessions.splice(i,1);
            return res.status(200).json({message:"success"});
        }
    }
//*/
    
    let sql = "DELETE FROM ?? WHERE ?? = ?";
    let query = mysql.format(sql,["pfpfs.sessions", "token", req.headers.token]);
    pool.query(query, (err) => {
        if(err) {
            console.log("Error removing session from database",err);
            return res.status(500).json({message:"Internal server error"});
        }
        return res.status(200).json({message:"success"});
    })
});

app.use("/api", isUserLogged, apiroutes);

app.listen(3001);
console.log("Running in port 3001");
