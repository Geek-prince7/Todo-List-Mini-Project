const express=require('express')
const mongoose=require('./config/mongoose')
const todo=require('./models/tasks');
const path=require('path');
const port=3000
const app=express()





app.use(express.urlencoded());

//add static file


//set up ejs
app.set('view engine','ejs')
app.set('views','./views')
app.use(express.static('./assets/'));



app.get('/',(req,resp)=>{
    todo.find({},(error,all_todos)=>{
        resp.render('homepage',{tasks:all_todos})
    })
})

app.get('/tasks',(req,resp)=>{
    todo.find({},(error,all_todos)=>{
        resp.render('view_tasks',{tasks:all_todos})
    })
})

app.get('/todo/post',(req,resp)=>{
    todo.create({description:req.query.desc,category:req.query.cat,due_date:req.query.date},(error,task)=>{
        if(error)
        {
            console.log("error in saving to db \n",error);
            return ;
        }
        console.log("saved to db ",task);

       
        return resp.json(200,{
            task:task
        });
        
        

    })

})

app.get('/todo/delete',async (req,resp)=>{
    let ids=req.query.ids.trim()
    console.log('req query',req.query)
    console.log(`ids are :${ids}`)
    let all_ids=ids.split(',')
    all_ids.splice(all_ids.length-1,1)
    console.log(all_ids)
    await todo.deleteMany({_id:{$in:all_ids}})
    resp.status(200).json({message:'deleted'})
})

app.listen(port,(error)=>{
    if(error){
        console.log("error in runnings erver",error);
        return;
    }
    console.log(`server  is up on port: ${port}`)

})
