import MainCard from 'components/MainCard';
import { roadmap } from 'data/learn';

const Roadmap = () => {
  return (
    <MainCard>
      <Typography variant="h2">Roadmap</Typography>
      <ul>
        {roadmap.map((item) => (
          <li key={item.id}>
            <Typography variant="body2">{item.title}</Typography>
          </li>
        ))}
      </ul>
    </MainCard>
  );
};

export default Roadmap;
