import { Card, CardColumns, Row, Col, Button, Form } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import { GET_AUTHORS, GET_GENRES } from '../graphql-client/queries';
import { useEffect, useState } from 'react';

const Filter = ({ onChangeFilter }) => {
  const [author, setAuthor] = useState(-1);
  const [genre, setGenre] = useState(-1);
  useEffect(() => {
    //console.log(author);
    //console.log(genre);
  });
  const AuthorsFilter = () => {
    const { loading, error, data } = useQuery(GET_AUTHORS);
    if (loading) return <p> Loading ...</p>;
    if (error) return <p> Error ...</p>;
    //console.log(data);
    return (
      <Form.Select
        onChange={(e) => {
          onChangeFilter({
            authorId:
              e.target.value == -1 ? '' : data.authors[e.target.value].id,
          });
          setAuthor(e.target.value);
        }}
        value={author}
      >
        <option value={-1}>Lọc theo tên tác giả</option>
        {data.authors.map((el, index) => (
          <option key={index} value={index}>
            {el.name}
          </option>
        ))}
      </Form.Select>
    );
  };

  const GenresFilter = () => {
    const { loading, error, data } = useQuery(GET_GENRES);
    if (loading) return <p> Loading ...</p>;
    if (error) return <p> Error ...</p>;
    //console.log(data);

    return (
      <Form.Select
        style={{ marginBottom: '25px' }}
        onChange={(e) => {
          onChangeFilter({
            genreId: e.target.value == -1 ? '' : data.genres[e.target.value].id,
          });
          setGenre(e.target.value);
        }}
        value={genre}
      >
        <option value={-1}>Lọc theo thể loại</option>
        {data.genres.map((el, index) => (
          <option key={index} value={index}>
            {el.name}
          </option>
        ))}
      </Form.Select>
    );
  };

  return (
    <Row className='mt-5 text-center '>
      <Col xs={2}>
        <h2>Filter</h2>
      </Col>
      <Col xs={5}>
        <AuthorsFilter></AuthorsFilter>
      </Col>
      <Col xs={5}>
        <GenresFilter></GenresFilter>
      </Col>
    </Row>
  );
};
export default Filter;
