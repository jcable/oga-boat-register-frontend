import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';
import { useLocation, useHistory } from 'react-router-dom';
import SearchAndFilterBoats from './searchandfilterboats';
import BoatCards from './boatcards';
import BoatsForSaleIntro from './boatsforsaleintro';
import BoatRegisterIntro from './boatregisterintro';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
}));

function Intro({boatsForSale}) {
  if (boatsForSale) {
    return (<BoatsForSaleIntro/>)
  }
  return (<BoatRegisterIntro/>);
}

function BrowseBoats({ window }) {
  const { state, search } = useLocation();
  const history = useHistory();
  const classes = useStyles();
  //const [mobileOpen, setMobileOpen] = useState(false);
  const params = new URLSearchParams(search);
  const options = params.get('options');
  //const handleDrawerToggle = () => {
  //  setMobileOpen(!mobileOpen);
  //};
 
  const handlePageSizeChange = (_, a) => {
    history.replace('/', { ...state, boatsPerPage: a });
    // setBoatsPerPage(a)
  };
  
  function setSortField(field) {
    history.replace('/', { ...state, sortField: field });
  }

  function setSortDirection(dir) {
    history.replace('/', { ...state, sortDirection: dir });
  }

  function setFilters(f) {
    history.replace('/', { ...state, filters: f });
  }

  // const container = window !== undefined ? () => window().document.body : undefined;
  //filters: { year: { firstYear: 1800, lastYear: new Date().getFullYear() }},
  let filters = {}
  let config = state;
  if (config) {
    filters = config.filters;
  }

  if (options === 'forsale') {
    filters.sale = true;
    filters.nopics = true;
  }
  if (config) {
    config.filters = filters;
  } else {
    config = { 
      boatsPerPage: '12',
      sortField: 'name',
      sortDirection: 'asc',
      filters,    
     }
     history.replace('/', config);
  }

  console.log(config);

  console.log('BrowseBoats history', history);

  return (
    <div className={classes.root}>
      <CssBaseline />
      {/*
      <LeftMenu open={mobileOpen} onClose={handleDrawerToggle} container={container} />
      */}
      <Paper>
        {/*
        <Grid container direction="row">
          <DrawerController onClick={handleDrawerToggle}/>
        </Grid>
        */}
        <Container>
          <Intro boatsForSale={filters.sale} />
        <SearchAndFilterBoats
          sortDirection={config.sortDirection}
          sortField={config.sortField}
          boatsPerPage={config.boatsPerPage}
          filters={config.filters}
          onPageSizeChange={handlePageSizeChange}
          onSortFieldChange={(field) => setSortField(field)}
          onSortDirectionChange={(event) =>
            setSortDirection(event.target.checked ? 'desc' : 'asc')
          }
          onFilterChange={(f) => setFilters(f)}
        />
        </Container>
        <Divider />
        <BoatCards
          boatsPerPage={parseInt(config.boatsPerPage)}
          sortField={config.sortField}
          sortDirection={config.sortDirection}
          filters={config.filters}
        />
        <Divider />
        <p>Other great places to look for boats are:</p>
        <List>
          <ListItem>
            <a href="https://www.nationalhistoricships.org.uk">
              National Historic Ships
            </a>
          </ListItem>
          <ListItem>
            <a href="https://nmmc.co.uk/explore/databases/">NMM Cornwall</a>{' '}
            maintain a number of interesting databases including small boats,
            yacht designs
          </ListItem>
        </List>
      </Paper>
    </div>
  );
}

BrowseBoats.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};
export default BrowseBoats;
