import { gql } from '@apollo/client';

const GET_BOOKS = gql`
  query GetAllBooks {
    books {
      id
      name
      genre {
        id
      }
      author {
        id
      }
    }
  }
`;
const GET_BOOK = gql`
  query GetBookById($bookId: ID!) {
    book(id: $bookId) {
      name
      genre {
        name
      }
      author {
        name
        age
        books {
          name
        }
      }
    }
  }
`;
const GET_AUTHORS = gql`
  query GetAllAuthors {
    authors {
      name
      id
    }
  }
`;
const GET_GENRES = gql`
  query GetAllGenres {
    genres {
      name
      id
    }
  }
`;

const ADD_BOOK = gql`
  mutation AddBook($name: String!, $genreId: ID, $authorId: ID) {
    createBook(name: $name, genreId: $genreId, authorId: $authorId) {
      name
      genre {
        name
      }
      author {
        name
      }
    }
  }
`;

const ADD_AUTHOR = gql`
  mutation AddAuthor($name: String!, $age: Int) {
    createAuthor(name: $name, age: $age) {
      name
      age
    }
  }
`;

const ADD_GENRE = gql`
  mutation AddGenre($name: String!) {
    createGenre(name: $name) {
      name
    }
  }
`;
export {
  GET_BOOKS,
  GET_BOOK,
  GET_AUTHORS,
  GET_GENRES,
  ADD_BOOK,
  ADD_AUTHOR,
  ADD_GENRE,
};
