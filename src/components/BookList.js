import { useEffect, useState } from 'react';
import { Card, CardColumns, Row, Col, Button, Form } from 'react-bootstrap';
import BookDetail from './BookDetail';
import { useQuery } from '@apollo/client';
import { GET_BOOKS } from '../graphql-client/queries';
import Filter from './Filter';
import Add from './Add';

const BookList = () => {
  const [choosingBook, setChoosingBook] = useState(null);
  const [filter, setFilter] = useState({ authorId: '', genreId: '' });
  useEffect(() => {
    setChoosingBook(null);
  }, [filter]);
  const handleFilter = (param) => {
    setFilter({ ...filter, ...param });
  };
  const handleClickBook = (id) => {
    //console.log(id);
    setChoosingBook(id);
  };
  const { loading, error, data } = useQuery(GET_BOOKS);
  if (loading) return <p> Loading ...</p>;
  if (error) return <p> Error ...</p>;
  console.log(data);
  return (
    <>
      <Add></Add>
      <Filter onChangeFilter={handleFilter}></Filter>

      <Row>
        <Col xs={8}>
          <Row>
            {data.books
              .filter((el) =>
                filter.authorId !== '' ? el.author.id === filter.authorId : true
              )
              .filter((el) =>
                filter.genreId !== '' ? el.genre.id === filter.genreId : true
              )
              .map(({ name, id }) => (
                <Col key={id} xs={4}>
                  <Card
                    bg={id == choosingBook ? 'warning' : ''}
                    onClick={() => {
                      handleClickBook(id);
                    }}
                    border='info'
                    text={id == choosingBook ? 'dark' : 'info'}
                    className=' my-3 text-center shadow'
                  >
                    <Card.Body>
                      <div>{name}</div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
          </Row>
        </Col>
        <Col xs={4}>
          <Row
            style={{
              justifyContent: 'center',
              paddingTop: '20px',
            }}
          >
            <BookDetail choosingBookId={choosingBook}></BookDetail>
          </Row>
        </Col>
      </Row>
    </>
  );
};
export default BookList;
