var React=require('react');
var ReactDOM=require('react-dom');
var createReactClass=require('create-react-class');
var Link = require('react-router').Link;

require('./css/styles.css')
var Books = createReactClass({
    getInitialState: function(){
        return({
            book: [],
            Tar:[]
        });
    },
    render: function(){
        var book = this.state.book;
        book = book.map(function(book, index){
            return(
                <li key={index}>
                    <span className="name">{book.name}</span>
                </li>
            );
        });
        return(
            <div id="book-container">
                <form id="search" onSubmit={this.pressButton}>
                    <input type="submit" value="Observe all the books"/>
                    <ul>{book}</ul>
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
    //how to add item in the db, =>how to call post and put in api.js
    Editone:function (e) {
        e.preventDefault();
        console.log('Editone');

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

           console.log(Tar1);
           Tar1=Tar1.map(function(book, index) {
               fetch('/books/'+book._id,{method:"PUT",body:JSON.stringify({"name":this.refs.bookName.value,
                       "author":this.refs.bookAuthor.value,
                       "price":this.refs.bookPrice.value,
                       "Category":this.refs.bookCategory.value
                       }),headers: {
                       'Accept': 'application/json',
                       'Content-Type': 'application/json'
                   }});
               console.log(this.refs.bookName.value);
               console.log(this.refs.bookCategory.value);
               console.log(this.refs.bookAuthor.value);
               console.log(this.refs.bookPrice.value);
               console.log(book._id);
           }.bind(this))
       }.bind(this));

    },
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

    handleSubmit: function(e){
        console.log('handle submit');
        e.preventDefault();
        var bookID=this.refs.bookID.value;

        fetch('/books?name=' + bookID ).then(function(data){
            //fetch('/api/books/' + bookname ).then(function(data){
            console.log(data);
            return data.json();
        }).then( json => {
            this.setState({
                book: json
            });
            console.log(json);
            console.log(this.state.book);
        });
    }
});
module.exports=Books;