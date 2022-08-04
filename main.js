const server = require('./server')
const PORT=1616;
server.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})
