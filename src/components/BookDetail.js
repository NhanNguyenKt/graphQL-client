import { Card } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import { GET_BOOK } from '../graphql-client/queries';
import { useEffect, useState } from 'react';
const BookDetail = ({ choosingBookId }) => {
  const [bookId, setBookId] = useState(null);
  useEffect(() => {
    setBookId(choosingBookId);
  }, [choosingBookId]);
  const BookInfo = () => {
    console.log(bookId);
    const { loading, error, data } = useQuery(GET_BOOK, {
      variables: {
        bookId: bookId,
      },
      skip: bookId == null,
    });
    if (loading) return <div>Loading ...</div>;
    if (bookId !== null && error) return <div>Error ...</div>;
    console.log(data);
    return (
      <Card bg='info' text='white' className='shadow'>
        <Card.Body>
          {bookId === null ? (
            'Thông tin sách'
          ) : (
            <>
              <Card.Title>Tên Tác Phẩm : {data.book.name}</Card.Title>
              <Card.Title>Thể loại: {data.book.genre.name}</Card.Title>
              <Card.Title>Tác Giả:</Card.Title>
              <Card.Subtitle style={{ paddingLeft: '30px' }}>
                <p> Tên: {data.book.author.name}</p>
                <p>Tuổi: {data.book.author.age}</p>
                <p>All Books by this author</p>
                <ul>
                  {data.book.author.books.map((el, index) => (
                    <li key={index}>{el.name}</li>
                  ))}
                </ul>
              </Card.Subtitle>
            </>
          )}
        </Card.Body>
      </Card>
    );
  };
  return <BookInfo></BookInfo>;
};
export default BookDetail;
