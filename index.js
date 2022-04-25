import express from "express";
import cors from "cors";
import chalk from "chalk"
const app= express();
let users;
const tweets=[];
app.use(cors());
app.use(express.json());
app.listen(5000,console.log(chalk.bold.green("Silencio, estamos no AR!!!")))
app.post("/sign-up",(req,res)=>{
 const {username,avatar}=req.body;
   if(username.length ===0 || avatar.length ===0){
       res.sendStatus(400)
   }
    users={username:username,avatar:avatar};
    res.status(201).send(users)
    console.log("ai calica")
})
app.post("/tweets",(req,res)=>{
    const {username,tweet}=req.body;
    if(tweet.length===0){
        res.status(400).send("Todos os campos são obrigatórios!")
    }
    console.log(tweet)
    tweets.push({username:username,tweet:tweet,avatar:users.avatar})
    res.status(201).send(tweets)
})

app.get("/tweets",(req,res)=>{
    const send=[];
    let xx=tweets.length;
    if(xx>10){
        xx=10
    }
    for(let i=0;i<xx;i++){
     send.push({
        username: tweets[(tweets.length - i)-1].username,
        avatar:tweets[(tweets.length - i)-1].avatar ,
      tweet: tweets[(tweets.length - i)-1].tweet
    })
    }
    res.send(send)
})
app.get("/tweets/:USERNAME",(req,res)=>{
    const {username}=req.params
let ttUser=tweets.filter(tt=>{
     if(tt.username === username){
         return tt.tweet
     }
    })
    res.send(ttUser)
})
app.get("/tweets?page=1",(req,res)=>{
    const first=[]
    let xx=tweets.length;
    if(xx>10){
        xx=10
    }
    for(let i=0;i<xx;i++){
     first.push({
		username: tweets[(tweets.length - i)-1].username,
		avatar:users.avatar ,
	  tweet: tweets[(tweets.length - i)-1].tweet
	})
    }
    res.send(first)
})
