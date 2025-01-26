import MainCard from 'components/MainCard';
import { brokers } from 'data/miscellaneous';

const Brokers = () => {
  return (
    <MainCard>
      <Grid container spacing={3}>
        {brokers.map((item, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Typography variant="h6" gutterBottom>
              {item.name}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {item.description}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </MainCard>
  );
};

export default Brokers;
