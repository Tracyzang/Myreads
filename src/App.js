import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import { ListBooks } from "./ListBooks.js";
import { Reading } from "./currentlyreading.js";
import { WantToRead } from "./want-to-read.js";
import { Read } from "./read.js";
import { Link } from "react-router-dom";
import { Route } from "react-router-dom";

class BooksApp extends React.Component {
  state = {
    Books: [],
    ID: "",
    shelf: ""
  };

  constructor(props) {
    super(props);
    this.updateShelf = this.updateShelf.bind(this);
  }

  componentDidMount() {
    BooksAPI.getAll().then(Books => {
      this.setState({
        Books
      });
    });
  }

  updateShelf(book, shelf) {
    let newBooks = this.state.Books.filter(b => b.id !== book.id);
    book.shelf = shelf;
    BooksAPI.update(book.id, shelf).then(response => {
      this.setState({
        Books: newBooks.concat([book])
      });
    });
  }

  render() {
    console.log(this.state.Books);
    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <Route
            exact
            path="/"
            render={() => (
              <div>
                <div className="list-books-content">
                  <Reading
                    Books={this.state.Books}
                    updateShelf={this.updateShelf}
                    ID={this.state.ID}
                  />
                  <WantToRead
                    Books={this.state.Books}
                    updateShelf={this.updateShelf}
                  />
                  <Read
                    Books={this.state.Books}
                    updateShelf={this.updateShelf}
                  />
                </div>
                <div className="open-search">
                  <Link to="./search">Add a book</Link>
                </div>
              </div>
            )}
          />

          <Route
            path="/search"
            render={() => (
              <ListBooks
                existingBooks={this.state.Books}
                updateShelf={this.updateShelf}
              />
            )}
          />
        </div>
      </div>
    );
  }
}

export default BooksApp;
