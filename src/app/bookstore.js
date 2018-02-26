var React=require('react');
var ReactDOM=require('react-dom');
var createReactClass=require('create-react-class');
var Link = require('react-router').Link;

require('./css/styles.css')
var Books = createReactClass({

    //set up the two states as empty array
    getInitialState: function(){
        return({
            book: [],
            Tar:[]
        });
    },

    render: function(){
        //create a bookList component and put it under the observe all button
        var book = this.state.book;
        var bookList;
        bookList = book.map(function(book, index){
            return(
                <li key={index}>
                    <span className="name">{book.name}</span>
                </li>
            );
        });

        //This page contains a form for observe all, a form for edit one book, and a Link back to homepage
        return(
            <div id="book-container">

                <form id="search" onSubmit={this.pressButton}>
                    <input type="submit" value="Observe all the books"/>
                    <ul>{bookList}</ul>
                    <hr/>
                </form>

                <form id="search" onSubmit={this.Editone}>
                    <h2>Help Edit One Book</h2>
                    <input type="text" ref="target" placeholder="Enter the book name you want to edit" />
                    <h3>Enter updated book information</h3>
                    <input type="text" ref="bookName" placeholder="book name" required />
                    <input type="text" ref="bookAuthor" placeholder="book author" required />
                    <input type="text" ref="bookCategory" placeholder="book Category" required />
                    <input type="text" ref="bookPrice" placeholder="book Price" required />
                    <button>Submit</button>
                </form>

                <Link to={"/"}>Home</Link>

            </div>
        );
    },

    //function to update the bookList to represent all the books
    pressButton:function (e) {
        e.preventDefault();
        console.log('Button pressed');
        fetch('/books' ).then(function(data){
            return data.json();
        }).then( json => {
            this.setState({
                book: json
            });
        });
    },

    //function for editing book information
    Editone:function (e) {
        e.preventDefault();
        //first get the target book to update, then use the user-input information to update the book information in DB
       fetch('http://localhost:4000/books?name='+this.refs.target.value).then(function(data){
            return data.json();
        }).then(json =>{
            console.log(json);
           this.setState({
               Tar:json
           });
       }).then(function () {
           var Tar1;
           Tar1=this.state.Tar;
           Tar1=Tar1.map(function(book, index) {
               fetch('/books/'+book._id,{method:"PUT",body:JSON.stringify({"name":this.refs.bookName.value,
                       "author":this.refs.bookAuthor.value,
                       "price":this.refs.bookPrice.value,
                       "Category":this.refs.bookCategory.value
                       }),headers: {
                       'Accept': 'application/json',
                       'Content-Type': 'application/json'
                   }});
           }.bind(this))
       }.bind(this));

    }

});
module.exports=Books;