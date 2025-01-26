import MainCard from 'components/MainCard';
import { useState, useEffect } from 'react';
import { shorts } from 'data/community';

// Assuming we have a Shorts component to display a list of shorts
const Shorts = () => {
  const [shortsData, setShortsData] = useState([]);

  useEffect(() => {
    // Fetch or set initial data for shorts
    setShortsData(shorts);
  }, []);

  return (
    <MainCard>
      <h1>Community Shorts</h1>
      <ul>
        {shortsData.map((short, index) => (
          <li key={index}>{short.title}</li>
        ))}
      </ul>
    </MainCard>
  );
};

export default Shorts;

