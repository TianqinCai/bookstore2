var React=require('react');
var ReactDOM=require('react-dom');
var createReactClass=require('create-react-class');
require('./css/index.css');
require('./css/todoItem.css');
import {Router,Route,browserHistory,Link} from 'react-router';

//module requires
var TodoItem=require('./todoItem');
var AddItem=require('./addItem');
var bookStore=require('./bookstore')

var App = createReactClass({
    render: function(){
        return(
            <Router history={browserHistory}>
                <Route path={"/"} component={TodoComponent}></Route>
                <Route path={"/bookstore"} component={bookStore}></Route>
            </Router>
        );
    }
});



//create component
var TodoComponent = createReactClass({
    getInitialState:function () {
        return {
            pop_books:[],
            book:[],
            buy_books:[]
        }
    },
    render:function () {

        var book = this.state.book;
        var pop_books=this.state.pop_books;
        var buy_books=this.state.buy_books;

        book = book.map(function(book, index){
            return(
                <li key={index}>
                    <TodoItem item={book} key={index} onDelete={this.onDelete}/>
                    <span className="name">Author: {book.author}</span>
                    <span className="item-delete">   Price: {book.price} $</span>
                </li>
            );
        }.bind(this));

        pop_books = pop_books.map(function(book, index){
            return(
                <li key={index}>
                    <TodoItem item={book} key={index} onDelete={this.onDelete}/>
                    <span className="name">Category: {book.Category}</span>
                    <span className="name">Author: {book.author}</span>
                    <span className="item-delete">     Price: {book.price} $</span>
                </li>
            );
        }.bind(this));

        buy_books = buy_books.map(function(book, index){
            return(
                <li key={index}>
                    <TodoItem item={book.name} key={index}/>
                    <span className="name">Author: {book.author}</span>
                    <span className="item-delete">   Price: {book.price} $</span>
                </li>
            );
        });

        return(
            <div id="todo-list">
                <div>
                    <Link to={'/bookstore'}>  bookstore management</Link>
                    <h1 onClick={this.clicked}>Welcome to the bookstore.. </h1>
                    <hr/>
                    <h2>The following are the popular books in our store</h2>
                    <ul onClick={this.getbook}>
                        <h4>Click to see</h4>
                        {book}
                    </ul>
                    <hr/>
                    <h3>Please help us build our Bookstore~ </h3>
                    <h3>Have some books to donate?</h3>
                    <AddItem onAdd={this.onAdd}/>
                    <hr/>
                </div>

                <div id="book-container">
                    <form id="search" onSubmit={this.observeAll}>
                        <input type="submit" value="Observe all the books"/>
                    </form>
                    <ul>
                        {pop_books}
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
                        {buy_books}
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

    clicked:function(){
        console.log("you clicked me");
    },

    onDelete:function (item) {
        console.log('onDelete called')
        var updatedBooks = this.state.buy_books;
        updatedBooks.push(item)
        this.setState({
            buy_books: updatedBooks
        });
    },
    
    onAdd:function (item) {

        console.log('onAdd called');
        console.log(item);

        fetch('/books',{method:"POST",body:JSON.stringify({"name":item,"author":"Unknown","price":0}),
            headers: {"Content-Type": "application/json"}} );

        var updatedBooks=this.state.pop_books;
        updatedBooks.push({"name":item,"Category":"Free book","author":"Unknown","price":0});
        this.setState({
            pop_books:updatedBooks
        });
    },

    observeAll:function (e) {
        e.preventDefault();
        fetch('/books' ).then(function(data){
            return data.json();
        }).then( json => {
            this.setState({
                pop_books: json
            });
        });
    },

    handleSubmit: function(e){
        console.log('handle submit');
        e.preventDefault();
        var bookname=this.refs.bookname.value;

        fetch('/books?name=' + bookname ).then(function(data){
            //fetch('/api/books/' + bookname ).then(function(data){
            console.log(data);
            return data.json();
        }).then( json => {
            this.setState({
                buy_books: json
            });
        });

    },
    checkOut:function () {
        var buy=this.state.buy_books;
        buy = buy.map(function(book, index){
            fetch('/books/'+book._id,{method:"DELETE"} );
        })
    }

});


ReactDOM.render(<App/>,document.getElementById('todo-wrapper'))