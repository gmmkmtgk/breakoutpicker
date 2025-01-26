import MainCard from 'components/MainCard';
import { voices } from 'data/community';

const Voices = () => {
  return (
    <MainCard title="Voices">
      <ul>
        {voices.map((voice) => (
          <li key={voice.id}>{voice.name}</li>
        ))}
      </ul>
    </MainCard>
  );
};

export default Voices;
