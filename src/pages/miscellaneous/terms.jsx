import MainCard from 'components/MainCard';
import { terms } from 'data/miscellaneous';

const Terms = () => {
  return (
    <MainCard>
      <Grid container spacing={3}>
        {terms.map((item, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Typography variant="h6" gutterBottom>
              {item.title}
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

export default Terms;
