import MainCard from 'components/MainCard';
import { peopleInvest } from 'data/portfolio';

const PeopleInvest = () => {
  return (
    <MainCard title="People Invest" content={peopleInvest} />
  );
};

export default PeopleInvest;
