var React=require('react');
var ReactDOM=require('react-dom');
var createReactClass=require('create-react-class');
require('./css/index.css');
require('./css/bookItem.css');
import {Router,Route,browserHistory,Link} from 'react-router';

//module requires
var BookItem=require('./bookItem');
var AddItem=require('./addItem');
var bookStore=require('./bookstore')

//this Componenet consist of two pages, which are rendered in this file and bookstore.js, this componenent will be returned to the index.html
var App = createReactClass({
    render: function(){
        return(
            <Router history={browserHistory}>
                <Route path={"/"} component={MainComponent}></Route>
                <Route path={"/bookstore"} component={bookStore}></Route>
            </Router>
        );
    }
});

//create Maincomponent as the index page
var MainComponent = createReactClass({

    //the initial state containss three empty arrays, to present
    getInitialState:function () {
        return {
            book:[],
            all_books:[],
            buy_books:[]
        }
    },
    render:function () {

        //got the three states representing popular books, all the books and books in shopping chart
        var book = this.state.book;
        var all_books=this.state.all_books;
        var buy_books=this.state.buy_books;

        //Now create components for the three kinds of books, let them return a list of books with certain contents
        var bookList;
        bookList = book.map(function(book, index){
            return(
                <li key={index}>
                    <BookItem item={book} key={index} onDelete={this.onDelete}/>
                    <span className="name">Author: {book.author}</span>
                    <span className="item-delete">   Price: {book.price} $</span>
                </li>
            );
        }.bind(this));

        var all_bookList;
        all_bookList = all_books.map(function(book, index){
            return(
                <li key={index}>
                    <BookItem item={book} key={index} onDelete={this.onDelete}/>
                    <span className="name">Category: {book.Category}</span>
                    <span className="name">Author: {book.author}</span>
                    <span className="item-delete">     Price: {book.price} $</span>
                </li>
            );
        }.bind(this));

        var buy_bookList;
        buy_bookList = buy_books.map(function(book, index){
            return(
                <li key={index}>
                    <BookItem item={book.name} key={index}/>
                    <span className="name">Author: {book.author}</span>
                    <span className="item-delete">   Price: {book.price} $</span>
                </li>
            );
        });

        //this page contains several parts, including a link to bookstore management page in the head, a block to show
        // the popular books("id: popular books"), a block for donating book to the store(id:donate books),
        // and a block to observe all the books, a block to search one book by name, and a block for shopping chart and checkout
        return(
            <div id="front_shop">
                <div>
                    <Link to={'/bookstore'}>  bookstore management</Link>
                    <h1 onClick={this.clicked}>Welcome to the bookstore.. </h1>
                    <hr/>
                    <div id="popular books">
                        <h2>The following are the popular books in our store</h2>
                        <ul onClick={this.getbook}>
                            <h4>Click to see</h4>
                            {bookList}
                        </ul>
                    </div>
                    <hr/>
                    <div id="donate books">
                        <h3>Please help us build our Bookstore~ </h3>
                        <h3>Have some books to donate?</h3>
                        <AddItem onAdd={this.onAdd}/>
                    </div>
                    <hr/>
                </div>

                <div id="book-container">
                    <form id="search" onSubmit={this.observeAll}>
                        <input type="submit" value="Observe all the books"/>
                    </form>
                    <ul>
                        {all_bookList}
                    </ul>
                    <hr/>
                    <form id="search" onSubmit={this.handleSubmit}>
                        <input type="submit" value="Search a book by name"/>
                        <label>Enter the book you want to buy:</label>
                        <input type="text" ref="bookname" placeholder="book name" required />
                    </form>
                    <hr/>
                    <ul>
                        <h4>Your Shopping Cart:</h4>
                        {buy_bookList}
                    </ul>
                    <form>
                        <button onClick={this.checkOut}>Check Out</button>
                    </form>
                </div>
            </div>
        );
    },//render finished


    //other functions
    getbook:function () {
        fetch('/books?Category=Popular' ).then(function(data){
            return data.json();
        }).then( json => {
            this.setState({
                book: json
            });
        });
    },

    //click the title
    clicked:function(){
        console.log("you clicked me");
    },

    //put the selected item into the chart
    onDelete:function (item) {
        var updatedBooks = this.state.buy_books;
        updatedBooks.push(item)
        this.setState({
            buy_books: updatedBooks
        });
    },

    //add the donated book into the DB
    onAdd:function (item) {
        fetch('/books',{method:"POST",body:JSON.stringify({"name":item,"author":"Unknown","price":0}),
            headers: {"Content-Type": "application/json"}} );

        var updatedBooks=this.state.all_books;
        updatedBooks.push({"name":item,"Category":"Free book","author":"Unknown","price":0});
        this.setState({
            all_books:updatedBooks
        });
    },

    //get all the books in DB
    observeAll:function (e) {
        e.preventDefault();
        fetch('/books' ).then(function(data){
            return data.json();
        }).then( json => {
            this.setState({
                all_books: json
            });
        });
    },

    //update the shopping chart as the book the user is looking for
    handleSubmit: function(e){
        console.log('handle submit');
        e.preventDefault();
        var bookname=this.refs.bookname.value;

        fetch('/books?name=' + bookname ).then(function(data){
            console.log(data);
            return data.json();
        }).then( json => {
            this.setState({
                buy_books: json
            });
        });
    },

    //remove all the books in the chart from DB
    checkOut:function () {
        var buy=this.state.buy_books;
        buy = buy.map(function(book, index){
            fetch('/books/'+book._id,{method:"DELETE"} );
        })
    }

});


ReactDOM.render(<App/>,document.getElementById('bookstore'))