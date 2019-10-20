var express = require('express');
var router = express.Router();
var Authors = require('../models/authors');
// ALL Authors
router.get('/', async (req, res)=>{
    let searchOptions = {}
    if (req.query.name !== null && req.query.name !== ''){
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try{
        const authors = await Authors.find(searchOptions)
        res.render('authors/index', {
            authors: authors,
            searchOptions : req.query
        });
    }catch{
        res.redirect('/')
        }
})

// New Author Route
router.get('/new' , (req, res)=>{
    res.render('authors/new', { author: new Authors()});
})

router.post('/', async (req, res)=>{
    var author = new Authors({
        name:req.body.name
    })
    try{
        var newAuthor = await author.save()
        //res.redirect('author/${newAuthor.id}')
        res.redirect('authors')
    }catch{
        res.render('authors/new', {
            author : author,
            errorMessage : "Error creating Author"
        })
    }
})


module.exports = router;