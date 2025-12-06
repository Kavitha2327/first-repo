var express = require('express');

var EmpData = [
    {
        'username':"",
        'password' :""
    },
    {
        'username':"",
        'password' :""
    },
    {
        'username':"",
        'password' :""
    }
]

const GetData = (req,res) =>{
  res.send("Responding")
}


const PostData = (req,res) =>{

     return res.status(201).json(req.body.username);

}
exports.GetData = GetData;
exports.PostData = PostData;
