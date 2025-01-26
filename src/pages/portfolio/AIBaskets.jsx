import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Typography
} from '@mui/material';

// project import
import MainCard from 'components/MainCard';

// ==============================|| AI BASKETS ||============================== //

const AIBaskets = () => {
  const [loading, setLoading] = useState(false);

  const handleLoad = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <MainCard
      title="AI Baskets"
      secondary={
        <Button
          color="primary"
          size="small"
          variant="contained"
          disabled={loading}
          onClick={handleLoad}
        >
          {loading ? 'Loading...' : 'Load More'}
        </Button>
      }
    >
      <CardHeader title="AI Baskets" />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardHeader title="Basket 1" />
              <CardContent>
                <Typography variant="body2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                  hac habitasse platea dictumst. Nunc accumsan magna non lorem
                  convallis, sit amet tincidunt magna gravida.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardHeader title="Basket 2" />
              <CardContent>
                <Typography variant="body2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                  hac habitasse platea dictumst. Nunc accumsan magna non lorem
                  convallis, sit amet tincidunt magna gravida.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardHeader title="Basket 3" />
              <CardContent>
                <Typography variant="body2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                  hac habitasse platea dictumst. Nunc accumsan magna non lorem
                  convallis, sit amet tincidunt magna gravida.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
    </MainCard>
  );
};

AIBaskets.propTypes = {
  theme: PropTypes.object
};

export default AIBaskets;
