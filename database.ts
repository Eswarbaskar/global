const {Client}=require('pg')
 
const pg = new Client({
    host:"localhost",
    port:5432,
    user:"postgres",
    password:"1234",
    database:"postgres"
})  
pg.connect((err:any)=>{
    if(err) console.log(err)
    console.log("Database connecting");

})

module.exports=pg