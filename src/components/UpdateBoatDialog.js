import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import useAxios from 'axios-hooks'
import { v4 as uuidv4 } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import OneActivity from './OneActivity';
import Descriptions from './Descriptions';
import Rig from './Rig';
import Handicap from './Handicap';
import Ownership from './Ownership';
import Everything from './Everything';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: 0, // theme.spacing(3),
    marginBottom: 0, // theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  editor: {
    minwidth: 500,
    margin: theme.spacing(1),
    padding: 0,
    border: 'none',
    boxShadow: 'none'
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));
 
function getActivity({ boat, activity, handleClose, handleStart, handleCancel, classes }) {

  const handleSaveDescriptions = (short, full) => {
    handleClose({ ...boat, short_description: short, full_description: full });
  }

  switch(activity) {
    case -1: return (<OneActivity classes={classes} onCancel={handleCancel} onStart={handleStart} />);
    case 0: return (<Descriptions classes={classes} onCancel={handleCancel} onSave={handleSaveDescriptions} short={boat.short_description} full={boat.full_description} />);
    case 1: return (<Rig classes={classes} />);
    case 2: return (<Handicap classes={classes} />);
    case 3: return (<Ownership classes={classes} />);
    case 4: return (<Everything classes={classes} />);
    default: return null;
  }
}

export default function UpdateBoatDialog({ boat, onClose, open }) {

  const classes = useStyles();
  const [activity, setActivity] = useState(-1);

  const [p] = useAxios(
    `https://ogauk.github.io/boatregister/pickers.json`
  )

  if(p.error) {
    p.data = {};
  }

  const pickers = p.data;

  const handleCancel = (changes) => {
    onClose();
  }

  const handleClose = (changes) => {
    axios.post(
      'https://ae69efba7038dcdfe87ce1c3479d2976.m.pipedream.net',
      { old: boat, new: changes, uuid: uuidv4() },
    ).then(response => {
      console.log('post', response);
      // TODO snackbar from response.data
      onClose();
    }).catch(error => {
      console.log('post', error);
    });
    onClose();
  };

  const handleStart = (index) => {
    setActivity(index);
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="updateboat-dialog-title" open={open}>
      <DialogTitle id="updateboat-dialog-title">Update Boat</DialogTitle>
      {getActivity({ pickers, boat, activity, handleClose, handleStart, handleCancel, classes })}
    </Dialog>
  );
}


UpdateBoatDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
