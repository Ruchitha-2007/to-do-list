const dotenv=require('dotenv')
dotenv.config();
const port=process.env.PORT||5001;

const app=require('./app');
app.listen(port,()=>{
    try{
        console.log(`Server listening on PORT ${port}`);
    }catch(err){
        console.log('Server connection lost')
        console.log(err)
    }
});
