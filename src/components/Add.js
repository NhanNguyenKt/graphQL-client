import { useEffect, useRef, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {
  GET_AUTHORS,
  GET_GENRES,
  ADD_AUTHOR,
  ADD_BOOK,
  ADD_GENRE,
  GET_BOOKS,
} from '../graphql-client/queries';
import {
  Card,
  CardColumns,
  Row,
  Col,
  Button,
  Form,
  Container,
} from 'react-bootstrap';

const Add = () => {
  const [adder, setAdder] = useState('');
  const infoAdding = useRef();
  const [addAuthor, dataAuthorMutation] = useMutation(ADD_AUTHOR);
  const [addBook, dataBookMutation] = useMutation(ADD_BOOK);
  const [addGenre, dataGenreMutation] = useMutation(ADD_GENRE);
  useEffect(() => {
    infoAdding.current = '';
  }, [adder]);

  const HandleAdd = () => {
    if (adder === 'book') {
      addBook({
        variables: {
          name: infoAdding.current.name,
          genreId: infoAdding.current.genreId,
          authorId: infoAdding.current.authorId,
        },
        refetchQueries: [{ query: GET_BOOKS }],
      });
    } else if (adder === 'author') {
      addAuthor({
        variables: {
          name: infoAdding.current.name,
          age: parseInt(infoAdding.current.age),
        },
        refetchQueries: [{ query: GET_AUTHORS }],
      });
    } else if (adder === 'genre') {
      addGenre({
        variables: {
          name: infoAdding.current.name,
        },
        refetchQueries: [{ query: GET_GENRES }],
      });
    }
  };

  //component them tac giar
  const AddAuthor = ({ addInfo }) => {
    const [author, setAuthor] = useState({ name: '', age: '' });
    useEffect(() => {
      addInfo.current = author;
    }, [author]);

    return (
      <Row className='text-center' style={{ justifyContent: 'center' }}>
        <Col xs={4}>
          <input
            placeholder='Nhập tên tác giả'
            type='string'
            onChange={(e) => setAuthor({ ...author, name: e.target.value })}
            value={author.name}
          ></input>
        </Col>
        <Col xs={4}>
          <input
            placeholder='Nhập tuổi tác giả'
            type='number'
            onChange={(e) => setAuthor({ ...author, age: e.target.value })}
            value={author.age}
          ></input>
        </Col>
      </Row>
    );
  };

  //component them the thoai
  const AddGenre = ({ addInfo }) => {
    const [genre, setGenre] = useState({ name: '' });

    useEffect(() => {
      addInfo.current = genre;
    }, [genre]);
    return (
      <Row className='text-center' style={{ justifyContent: 'center' }}>
        <Col xs={5}>
          <input
            onChange={(e) => setGenre({ name: e.target.value })}
            style={{ width: '80%' }}
            value={genre.name}
            placeholder='Nhập thể loại tác phẩm'
            type='string'
          ></input>
        </Col>
      </Row>
    );
  };

  //component them sach
  const AddBook = ({ addInfo }) => {
    const [book, setBook] = useState('');
    const [genre, setGenre] = useState(-1);
    const [author, setAuthor] = useState(-1);
    useEffect(() => {
      addInfo.current = {
        name: book,
        authorId: genres[parseInt(genre)] ? genres[parseInt(genre)].id : '',
        genreId: authors[parseInt(author)] ? authors[parseInt(author)].id : '',
      };
    }, [book, genre, author]);
    const QueryMultiple = () => {
      const res1 = useQuery(GET_GENRES);
      const res2 = useQuery(GET_AUTHORS);
      return [res1, res2];
    };
    const [authors, genres] = [
      QueryMultiple()[0].data.genres,
      QueryMultiple()[1].data.authors,
    ];
    //console.log(authors);
    //console.log(genres);

    const { loading, error, data } = useQuery(GET_GENRES);
    if (loading) return <p> Loading ...</p>;
    if (error) return <p> Error ...</p>;
    return (
      <Row className='text-center' style={{ justifyContent: 'center' }}>
        <Col xs={4}>
          <input
            style={{ width: '70%', marginTop: '5px' }}
            className='mx-5'
            placeholder='Nhập tên sách'
            type='string'
            onChange={(e) => setBook(e.target.value)}
            value={book}
          ></input>
        </Col>
        <Col xs={4}>
          <Form.Select
            onChange={(e) => {
              setGenre(e.target.value);
            }}
            value={genre}
          >
            <option value={-1}>Chọn tác giả</option>
            {genres
              ? genres.map((el, index) => (
                  <option key={index} value={index}>
                    {el.name}
                  </option>
                ))
              : ''}
          </Form.Select>
        </Col>
        <Col xs={4}>
          <Form.Select
            onChange={(e) => {
              setAuthor(e.target.value);
            }}
            value={author}
          >
            <option value={-1}>Chọn thể loại</option>
            {authors
              ? authors.map((el, index) => (
                  <option key={index} value={index}>
                    {el.name}
                  </option>
                ))
              : ''}
          </Form.Select>
        </Col>
      </Row>
    );
  };
  return (
    <>
      <Row className='text-center mt-2'>
        <Col xs={4}>
          <Button
            variant={adder === 'book' ? 'warning' : 'primary'}
            onClick={() => setAdder('book')}
          >
            Thêm Sách
          </Button>
        </Col>
        <Col xs={4}>
          <Button
            variant={adder === 'author' ? 'warning' : 'primary'}
            onClick={() => setAdder('author')}
          >
            Thêm Tác Giả
          </Button>
        </Col>
        <Col xs={4}>
          <Button
            variant={adder === 'genre' ? 'warning' : 'primary'}
            onClick={() => setAdder('genre')}
          >
            Thêm Thể Loại
          </Button>
        </Col>
      </Row>
      <Row className='mt-3 '>
        {adder === 'author' ? (
          <AddAuthor addInfo={infoAdding}></AddAuthor>
        ) : adder === 'genre' ? (
          <AddGenre addInfo={infoAdding}></AddGenre>
        ) : adder === 'book' ? (
          <AddBook addInfo={infoAdding}></AddBook>
        ) : null}
      </Row>
      {adder ? (
        <Row style={{ justifyContent: 'end', marginTop: '15px' }}>
          <Col xs={1}>
            <Button style={{ width: '100%' }} onClick={() => HandleAdd()}>
              Add
            </Button>
          </Col>
          <Col xs={1}>
            <Button style={{ width: '100%' }} onClick={() => setAdder('')}>
              Cancle
            </Button>
          </Col>
          <Col xs={1}></Col>
        </Row>
      ) : null}
    </>
  );
};
export default Add;
