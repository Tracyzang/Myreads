import React from "react";


export class Read extends React.Component {
  state = {
    value: "read"
  };

  updateValue(value) {
    this.setState({
      value: value
    });
  }

  render() {
    console.log(this.state.value)
    const { Books } = this.props;
    const readBooks = Books.filter(a => {
      return a.shelf === "read";
    });
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">Read</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            <div className="book">
              {readBooks.map(a => (
                <li key={a.id}>
                  <div className="book-top">
                    <div
                      className="book-cover"
                      style={{
                        width: 128,
                        height: 188,
                        backgroundImage: `url(${a.imageLinks.thumbnail})`
                      }}
                    />
                  </div>
                  <p className="book-title">{a.title}</p>
                  <p className="book-authors">{a.authors}</p>
                  <div className="book-shelf-changer">
                    <select
                      value={this.state.value}
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
            </div>
          </ol>
        </div>
      </div>
    );
  }
}
