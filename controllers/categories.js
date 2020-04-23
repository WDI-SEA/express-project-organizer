let express = require('express')
let db = require('../models')
let router = express.Router()


// GET /categories/show - show all categories
 router.get('/', (req, res) => {
    db.category.findAll()
    .then((categories)=>{
      res.render('categories/cateIndex',{categories})
    })
    .catch(err=>{
      console.log('err',err)
      res.send('error')
    })
})

router.get('/:id',(req,res)=>{
   db.category.findOne({
      where: {id: req.params.id},
      include: [ db.project]
  })
  .then((cat)=>{
     res.render('categories/show',{cat})
       
  })
  .catch(err=>{
    console.log('err',err)
    res.send('error')
  })
  
})



module.exports = router