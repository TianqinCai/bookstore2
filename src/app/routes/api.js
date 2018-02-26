
const express=require('express');
const router=express.Router();
const Books=require('../models/books')

//get a list of book from the db

router.get('/books/:ID',function (req,res,next) {

    Books.find({ID:req.params.ID}).then(function (book) {
        book = book.map(function(book, index){
            return(
                res.send(book)
            );
        });
        res.send(book);
    }).catch(next);

});


router.get('/books',function (req,res,next) {
    //res.send({type:'GET'});


    Books.find(req.query).then(function (books) {
        res.end(JSON.stringify(books))
        //res.send(books);
    });
    console.log(req.query);

});

//add a new book to the db
router.post('/books',function (req,res,next) {
    Books.create(req.body).then(function (book) {
        res.send(book);
    }).catch(next);
});

//update a book in the db
router.put('/books/:id',function (req,res,next) {
    Books.findByIdAndUpdate({_id:req.params.id},req.body).then(function () {
        Books.findOne({_id:req.params.id}).then(function (book) {
            res.send(book);
        })
    });
});

//delete a book from the db
router.delete('/books/:ID',function (req,res,next) {
    console.log(req.params.ID);
    Books.findByIdAndRemove({_id:req.params.ID}).then(function (book) {
        console.log(book);
        res.send(book);
    });
});

module.exports=router;