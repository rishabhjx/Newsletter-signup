//jshint esversion : 6

const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");
const app=express();
 app.use(express.static("public"));
 app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html");
})

app.post("/",function(req,res){
    const fName=req.body.fName;
    const LName=req.body.lName;
    const email=req.body.email;

    console.log(fName,LName,email);
     const data={
        members: [
            {
                email_address : email,
                status : "subscribed",
                merge_fields : {
                    FNAME:fName,
                    LNAME:LName,

                } 


            }
        ]
     };
     const jsonData=JSON.stringify(data);
     const url="https://us8.mailchimp.com/3.0/lists/da23e056f2";
     const options={
        method: "POST",
        auth:"rishabhjx:4ae34dbd71f080cb75e6456babaf8542-us8",
     }
    
    const request=https.request(url,options,function(response){
        response.on("data",function(data){
            console.log(JSON,parse(data));
        } 

    )
    request.write(jsonData);
    request.end();

})})
const client = require("@mailchimp/mailchimp_marketing");
const { log } = require("console");
const { parse } = require("path");

client.setConfig({
  apiKey: "4ae34dbd71f080cb75e6456babaf8542-us8",
  server: "us8",
});
//list id
// da23e056f2
const run = async () => {
  const response = await client.lists.getAllLists();
  console.log(response);
};

run();

//api key
// 4ae34dbd71f080cb75e6456babaf8542-us8
app.listen(3000,function(){ 
    console.log("server has started on port 3000");
})