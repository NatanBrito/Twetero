import express from "express";
import cors from "cors";
import chalk from "chalk"
const app= express();
let users;
const tweets=[];
app.use(cors());
app.listen(5000,console.log(chalk.bold.green("Silencio, estamos no AR!!!")))
app.post("/sign-up",(req,res)=>{
 const {username,avatar}=req.params;
    users={username:username,avatar:avatar};
    res.send(users)
    console.log("ai calica")
})
app.post("/tweets",(req,res)=>{
    const {username,tweet}=req.params;
    tweets.push({username:username,tweet:tweet})
    res.send(tweets)
})

app.get("/tweets",(req,res)=>{
    const send=[]
    let xx=tweets.length;
    if(xx>10){
        xx=10
    }
    for(let i=0;i<xx;i++){
     send.push({
		username: tweets[(tweets.length - i)-1].username,
		avatar: tweets[(tweets.length - i)-1].avatar,
	  tweet: tweets[(tweets.length - i)-1].tweet
	})
    }
    res.send(send)
})
