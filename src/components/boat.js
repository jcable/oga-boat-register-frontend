import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import ImageCarousel from './imagecarousel';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import List from '@material-ui/core/List';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import SwipeableViews from 'react-swipeable-views';
import TabPanel from './tabpanel';
import ConditionalText from './conditionaltext';
import SailTable from './sailtable';
import G from 'glob';

function m2f(val) {
    if(val) {
        return `${(val*100/2.54/12).toFixed(2)} ft`;
    }
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const boatQuery = (id) => gql`{
    boat(where: {oga_no: {_eq: ${id}}}) {
    id
    name
    previous_names
    year
    year_is_approximate
    public
    place_built
    home_port
    home_country
    ssr
    sail_number
    nhsr
    nsbr
    oga_no
    fishing_number
    callsign
    mssi
    full_description
    image_key
    uk_part1
    constructionMaterialByConstructionMaterial { name }
    constructionMethodByConstructionMethod { name }
    construction_details
    construction_notes
    designClassByDesignClass { name }
    designerByDesigner { name }
    draft
    generic_type
    handicap_data
    hull_form
    keel_laid
    launched
    length_on_deck
    mainsail_type
    rigTypeByRigType { name }
    sail_type { name }
    short_description
    updated_at
    website
    genericTypeByGenericType { name }
    builderByBuilder { name notes }
    beam
    air_draft
    for_sale_state { text }
    for_sales(limit: 1, order_by: {updated_at: desc}) {
      asking_price
      flexibility
      offered
      price_flexibility { text }
      reduced
      sales_text
      sold
      summary
      updated_at
    }
    engine_installations {
      engine
      installed
      removed
    }
  }
  }`;

const engine = {
    engine_make: { label: 'Engine make:' },
    engine_power: { label: 'Engine power:' },
    engine_date: { label: 'Engine date:' },
    engine_fuel: { label: 'Engine fuel:' },
    previous_engine: { label: 'Previous engine(s):' },
    propellor_blades: { label: 'Propeller blades:' },
    propellor_type: { label: 'Propeller type:' },
    propellor_position: { label: 'Propeller position:' }
};



export default function Boat({ id }) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const { loading, error, data } = useQuery(boatQuery(id));

  useEffect(() => {
      if (data) {
          document.title = data.boat[0].name;
      }
  });

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: (Boat)</p>;
  const boat = data.boat[0];
  console.log(boat);

  const panes = [
    { title: 'Registration and location', children: (
        <>
        <ConditionalText value={boat.previous_names} label="Previous name/s"/>
        <ConditionalText value={boat.place_built} label="Place built"/>
        <ConditionalText value={boat.home_country} label="Home Country"/>
        <ConditionalText value={boat.year_is_approximate?'around ':''+boat.year} label="Year of Build"/>
        <ConditionalText value={boat.sail_number} label="Sail No."/>
        <ConditionalText value={boat.ssr} label="Small Ships Registry no. (SSR)"/>
        <ConditionalText value={boat.nhsr} label="National Register of Historic Vessels no. (NRHV)"/>
        <ConditionalText value={boat.fishing_number} label="Fishing No."/>
        <ConditionalText value={boat.callsign} label="Call Sign"/>
        <ConditionalText value={boat.nsbr} label="National Small Boat Register"/>
        <ConditionalText value={boat.uk_part1} label="Official Registration" />     
        </>)
     },
    { title: 'Construction', children: (
        <>
        <ConditionalText value={boat.genericTypeByGenericType} label="Generic type"/>
        <ConditionalText value={boat.hull_form.replace(/_/g, ' ')} label="Hull form"/>
        <ConditionalText value={boat.builderByBuilder} label="Builder"/>
        <ConditionalText value={boat.constructionMaterialByConstructionMaterial} label="Construction material"/>
        <ConditionalText value={boat.constructionMethodByConstructionMethod} label="Construction method"/>
        <ConditionalText value={boat.construction_details} label="Construction details"/>
        <ConditionalText value={boat.construction_notes} label="Construction notes"/>
        </>
        )    
    },
    { title: 'Hull', children: (<>
        <ConditionalText value={m2f(boat.length_on_deck)} label="Length on deck (LOD)"/>
        <ConditionalText label="Length overall (LOA)" value={m2f(boat.handicap_data?boat.handicap_data.length_overall:undefined)}/>
        <ConditionalText label="Waterline Length (LWL)" value={m2f(boat.handicap_data?boat.handicap_data.length_on_waterline:undefined)}/>
        <ConditionalText value={m2f(boat.beam)} label="Beam"/>
        <ConditionalText value={m2f(boat.draft)} label="Draft"/>        
    </>)},
  ];

  if (boat.full_description) {
    panes.unshift(
        { title: 'Full Description', children: (<div dangerouslySetInnerHTML={{ __html: boat.full_description }} />) },
    );
  }
  
  if (boat.handicap_data) {
    const data = boat.handicap_data;
    const sails = [];
    Object.entries(data).forEach(([key, value]) => {
        if (value.luff) {
            sails.push({ name: key, ...value });
        }
    });
    if(data.main || data.thcf || data.calculated_thcf || data.fore_triangle_base) {
        panes.push({ title: 'Rig and Sails', children: (
            <>
            <ConditionalText label="fore triangle base" value={m2f(data.fore_triangle_base)}/>
            <ConditionalText label="fore triangle height" value={m2f(data.fore_triangle_height)}/>
            <ConditionalText label="Calculated THCF" value={data.calculated_thcf}/>
            <ConditionalText label="THCF" value={data.thcf}/>
            <SailTable classes={classes} rows={sails}/>
            </>
        )});    
    }
    //if (engineItems.length > 0) {
    //  panes.push({ title: 'Engine', render: () => <Tab.Pane><List>{engineItems}</List></Tab.Pane> });
    //}
  }
/*
    for_sales(limit: 1, order_by: {updated_at: desc}) {
      asking_price
      flexibility
      offered
      price_flexibility { text }
      reduced
      sales_text
      sold
      summary
      updated_at
    }
*/
  if (boat.for_sale_state && boat.for_sale_state.text === 'for_sale') {
    const fs = boat.for_sales[0];
    const price = new Intl.NumberFormat('en-GB', { currency: 'GBP', style: 'currency' }
    ).format(fs.asking_price);

    panes.unshift(
        { title: 'For Sale', children: (
             <>
            <ConditionalText label="Price" value={price}/>
            <div dangerouslySetInnerHTML={{ __html: fs.sales_text }} />
            <Box width={1/3}>
            <form className={classes.root} noValidate autoComplete="off">
            <TextField fullWidth="true" type="email" id="sender-email" label="Enter your email to make an enquiry" />
            <Button
                size="small"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    endIcon={<Icon>send</Icon>}
                >Send</Button>
            </form>
            </Box>
            </>
        ) },
    );
  }
  
 const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{[1,2,3,4]}</List>
        <Divider />
        <List>{['a','b','c']}</List>
      </Drawer>
      <main className={classes.content}>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={9}>
                <Typography variant="h3" component="h3">{boat.name}</Typography>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
                <Typography variant="h3" component="h3">{boat.year}</Typography>
            </Grid>
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                <p>Chart was here</p>
                <ImageCarousel images={boat.images} />
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Typography variant="h4" component="h4">Details</Typography>
                <ConditionalText value={boat.oga_no} label="OGA no"/>
                <ConditionalText value={boat.mainsail_type} label="Mainsail"/>
                <ConditionalText value={boat.rigTypeByRigType.name} label="Rig"/>
                <ConditionalText value={boat.home_port} label="Home port or other location"/>
                <div dangerouslySetInnerHTML={{ __html: boat.short_description }}></div>
                </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12}>
            <AppBar position="static" color="default">
                <Tabs
                onChange={handleChange}
                    value={value}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                { panes.map((pane, i) => (<Tab key={i} label={pane.title}/>))}
                </Tabs>
                </AppBar>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                >
                {panes.map((pane, i) => (
                    <TabPanel key={i} value={value} index={i}>
                        {pane.children}
                    </TabPanel>
                ))}
                </SwipeableViews>
            </Grid>
          </Grid>
          <Box pt={4}>
            <p>Copyright was here</p>
          </Box>
        </Container>
      </main>
    </div>
  );
}