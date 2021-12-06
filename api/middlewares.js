const jsonServer = require('json-server')

module.exports=[
    jsonServer.rewriter({'/api/:ver/*':'/$2'}),
    delay(1_100,100),
    cleanNull('cardsOrder'),
]
// @param {number} 
// @param {number}

function delay(max,min = 0){
    return(req,res,next)=>{
        setTimeout(next,Math.random()**2 *(max- min)+min)
    }
}

// @param {string}

function cleanNull(path){
    return(req,res,next)=>{
        try{
            if (req.method !== 'GET')return

            const db=req.app.db
            const {isNull}=db._

            const newValue =db.get(path).omitBy(isNull).value()
            db.set(path,newValue).write()
        }catch(err){
            console.error(err)
        }finally{
            next()
        }
    }
}