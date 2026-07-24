// project import
import researchs from './research';import portfolio from './portfolio';
import learn from './learn';
import ipos from './ipos';
import community from './community';
import miscellaneous from './miscellaneous';
import games from './games';
import algotrading from './algotrading';
import health from './health';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  // Breaks lives at `/` only — not listed in the drawer (main product surface).
  items: [portfolio, researchs, learn, ipos, community, health, games, miscellaneous, algotrading]
};

export default menuItems;
