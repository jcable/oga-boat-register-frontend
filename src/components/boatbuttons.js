import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'gatsby';
import UploadPhotos from './uploadphotos';
import EditButton from './editbutton';
import Enquiry from './enquiry';

// TODO - make work in SPA mode

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
    height: 600,
  },
  fillHeight: {
    height: "100%",
  },
  button: {
    margin: theme.spacing(1),
  },
  iframe: {
    border: 'none !important'
  }
}));

function gatsbyHome(location) {
  const params = new URLSearchParams(location.search);
  const doc = (params.get('sale')==='true')?'boats_for_sale':'browse_the_register';
  let home = `${location.origin}/${doc}/${doc}.html`;

  params.delete('sale'); // not needed as destination knows!
  params.delete('oga_no');
  const qp = params.toString();
  if(qp.length>0) {
    home = `${home}?${qp}`;
  }
  return home;
}

export default function BoatButtons({ boat, link, location }) {

  const home = link?location:gatsbyHome(location);

  const classes = useStyles();
  return (
    <Paper>
        <Grid container direction="row" alignItems="flex-end">
        <Grid item xs={2}>
            <Button size="small"
            variant="contained"
            className={classes.button}
            component={link||Link}
            to={home}
            >See more boats</Button>
        </Grid>
        <Grid item xs={3} >
            <Enquiry classes={classes} boat={boat} />
        </Grid>
        <Grid item xs={3} >
            <UploadPhotos classes={classes} boat={boat} />
        </Grid>
        <Grid item xs={3} >
            <EditButton classes={classes} boat={boat} />
        </Grid>
        </Grid>
    </Paper>
  );
};
