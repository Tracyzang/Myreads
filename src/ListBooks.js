import React from "react";
import * as BooksAPI from "./BooksAPI";
import { Link } from "react-router-dom";

export class ListBooks extends React.Component {
  state = {
    query: "",
    books: [],
    value: "none"
  };

  updateQuery(query) {
    this.setState({
      query: query.trim()
    });
  }
  updateValue(value) {
    this.setState({
      value: value
    });
  }

  search(value) {
    BooksAPI.search(value).then(books => {
      this.setState({
        books: books ? books : []
      });
    });
  }

  render() {
    const { existingBooks } = this.props;
    const { query, books } = this.state;
    let showingBooks = [];

    if (Array.isArray(books) === true) {
      showingBooks = books.filter(c => {
        var cond1 = c.title
          ? c.title.toLowerCase().includes(query.toLowerCase())
          : false;
        var cond2 = c.authors
          ? c.authors
              .toString()
              .toLowerCase()
              .includes(query.toLowerCase())
          : false;
        if (cond1 || cond2) {
          return true;
        }
        return false;
      });
    }

    console.log(showingBooks);

    return (
      <div>
        <div className="search-books">
          <div className="search-books-bar">
            <Link className="close-search" to="./">
              Close
            </Link>
            <div className="search-books-input-wrapper">
              {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
              <input
                type="text"
                placeholder="Search by title or author"
                onChange={event => this.search(event.target.value)}
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              {showingBooks.map(a => (
                <li key={a.id}>
                  <div
                    className="book-cover"
                    style={{
                      width: 128,
                      height: 188,
                      backgroundImage: `url(${
                        a.imageLinks ? a.imageLinks.thumbnail : null
                      })`
                    }}
                  />
                  <p className="book-title">{a.title}</p>
                  <p className="book-authors">{a.authors}</p>
                  <div className="book-shelf-changer">
                    <select
                      value={
                        existingBooks.filter(e => e.id === a.id).length === 0
                          ? this.state.value
                          : existingBooks.filter(e => e.id === a.id)[0].shelf
                      }
                      onChange={event => {
                        this.props.updateShelf(a.id, event.target.value);
                      }}
                    >
                      <option value="move" disabled>
                        Move to...
                      </option>
                      <option value="currentlyReading">
                        Currently Reading
                      </option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    );
  }
}
