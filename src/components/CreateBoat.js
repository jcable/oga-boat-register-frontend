import React, { useState } from 'react';
import FormRenderer, {
  componentTypes, dataTypes,
} from "@data-driven-forms/react-form-renderer";
import {
  componentMapper,
  FormTemplate,
} from "@data-driven-forms/mui-component-mapper";
import { MuiThemeProvider } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core/styles';
import { mapPicker } from "./Rig";
import { usePicklists } from "../util/picklists";
import { designerItems, builderItems, designClassItems } from "./ddf/util";
import { theme, HtmlEditor } from "./ddf/RTE";

const useStyles = makeStyles((theme) => ({
  editor: {
    minwidth: 500,
    minHeight: 500,
    margin: 10,
    padding: 10,
    border: 'none',
    boxShadow: 'none'
  },
  grid: {
    margin: '10px',
    width: 'auto'
  },
  dialog: {
    maxWidth: 'max-content',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(0),
    marginLeft: theme.spacing(0),
  },
}));
 
const schema = (pickers) => {
  return {
    title: "New Boat",
    name: "boat",
    component: componentTypes.SUB_FORM,
    fields: [
        {
            component: componentTypes.TEXT_FIELD,
            name: "name",
            label: "Name",
            type: 'string',
            dataType: dataTypes.STRING,
        },
        {
        component: "html",
        title: "Short description",
        name: "short_description",
        controls: ["bold", "italic"],
        maxLength: 500,
      },
      {
        component: componentTypes.SELECT,
        name: "generic_type",
        label: "Generic Type",
        isReadOnly: false,
        isSearchable: true,
        isClearable: true,
        options: mapPicker(pickers.generic_type),
      },
      {
        component: componentTypes.SELECT,
        name: "rig_type",
        label: "Rig",
        isRequired: true,
        options: mapPicker(pickers.rig_type),
      },
      {
        component: componentTypes.SELECT,
        name: "mainsail_type",
        label: "Mainsail",
        isRequired: true,
        options: mapPicker(pickers.sail_type),
      },
      {
        component: componentTypes.TEXT_FIELD,
        name: "year",
        label: "Year Built",
        type: 'number',
        dataType: dataTypes.INTEGER,
      },
      {
        component: componentTypes.CHECKBOX,
        name: "year_is_approximate",
        label: "Approximate",
        dataType: "boolean",
      },      
      ...designerItems(pickers),
      ...builderItems(pickers),
      ...designClassItems(pickers),
      {
        component: componentTypes.TEXT_FIELD,
        name: "place_built",
        label: "Place built",
      },
    ],
  };
};

const CreateBoatDialog = ({ classes, onClose, open }) => {
  const { loading, error, data } = usePicklists();

  if (loading) return <CircularProgress />;
  if (error) return <p>Error :(can't get picklists)</p>;

  const pickers = data;
return (
  <Dialog open={open} onClose={onClose} className={classes.dialog} aria-labelledby="form-dialog-title">
  <Grid spacing={4} container className={classes.grid}>
  <MuiThemeProvider theme={theme}>
    <FormRenderer
      componentMapper={{
        ...componentMapper,
        html: HtmlEditor,
      }}
      FormTemplate={FormTemplate}
      schema={schema(pickers)}
      onSubmit={console.log}
      onCancel={() => {console.log('Cancel action'); onClose()}}
    />
    </MuiThemeProvider>
  </Grid>
  </Dialog>
);
}

function CreateBoatButton() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  const handleCancel = () => {
    console.log('cancel');
    setOpen(false);    
  }
  const handleSend = () => {
    console.log('send');
    setOpen(false);    
    setSnackBarOpen(true);
  }

  const snackBarClose = () => {
    setSnackBarOpen(false);
  }

  return (
    <>
      <Button className={classes.button} size="small"
        color="secondary" onClick={() => setOpen(true)}>
        form
      </Button>
      <CreateBoatDialog
        classes={classes}
        open={open}
        onCancel={handleCancel}
        onSend={handleSend}
      />
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={snackBarOpen}
        autoHideDuration={2000}
        onClose={snackBarClose}
        message="Thanks, we'll get back to you."
        severity="success"
      />
    </>
  );
}

export default CreateBoatButton;
