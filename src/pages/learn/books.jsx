import MainCard from 'components/MainCard';
import { books } from 'data/learn';

const Books = () => {
  return (
    <MainCard title="Books">
      <Stack spacing={2}>
        {books.map((book) => (
          <Stack key={book.title} direction="row" spacing={2}>
            <Typography variant="subtitle2">{book.title}</Typography>
            <Typography variant="subtitle2">{book.author}</Typography>
          </Stack>
        ))}
      </Stack>
    </MainCard>
  );
};

export default Books;
