import React from 'react'
import Divider from '@material-ui/core/Divider'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Grid from '@material-ui/core/Grid'
import Switch from '@material-ui/core/Switch'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import { usePicklists } from '../util/picklists';
import Picker from './picker'

const pickers = {
    designer: [],
    builder: [],
    rig_type: [],
    sail_type: [],
    generic_type: [],
    design_class: [],
    construction_material: [],    
};

 const sortLabels = [
    { field: 'name', name: "Boat Name" },
    { field: 'oga_no', name: "OGA Boat No." },
    { field: 'year', name: "Year Built" },
    { field: 'updated_at', name: "Last Updated" },
    { field: 'price', name: "Price" },
 ];

const sortFieldByLabel = sortLabels.reduce((r, { field, name}) => { r[name]=field; return r;}, {});
const sortLabelByField = sortLabels.reduce((r, { field, name}) => { r[field]=name; return r;}, {});

const pageSize = [];
for(let i=1; i<=8; i++) {
    pageSize.push({name: `${6*i}` });
}

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 200,
      },
    },
  }));

export function makeBoatNameList(boat) {
  const currentBoatNames = boat.map((b) => (b.name));
  const previousBoatNames = boat.map((b) => b.previous_names).flat();
  const setOfBoats = new Set([...currentBoatNames, ...previousBoatNames]);
  const allBoatNames = [...setOfBoats].filter((name) => name);
  allBoatNames.sort((a, b) => (a.toLowerCase().localeCompare(b.toLowerCase())));
  if (allBoatNames[0] === '') allBoatNames.shift();
  return allBoatNames.map((n) => ({ name: n, __typename: 'boat' }));
}

export default function SearchAndFilterBoats({
    sortDirection,
    sortField,
    boatsPerPage,
    filters,
    onFilterChange,
    onPageSizeChange,
    onSortFieldChange,
    onSortDirectionChange,
}) {
    const classes = useStyles();

    const { loading, error, data } = usePicklists();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(SearchAndFilterBoats)</p>;

    const boatNames = makeBoatNameList(data.boat);

    function sw(event, value) {
        if (event.target.id) {
            onFilterChange({ ...filters, [event.target.id]: value });
        }
    }

    function pl(id, value) {
        onFilterChange({ ...filters, [id]: value });
    }

    function o(event) {
        onFilterChange({ ...filters, ogaNo: event.target.value });
    }

    function sy(event) {
        const { id, value } = event.target;
        const year = { ...filters.year };
        console.log('sy', id, value, year);
        if (value.length === 4) {
            year[id] = parseInt(value);
            onFilterChange({ ...filters, year });
        } else if (value === '') {
            delete year[id];
            onFilterChange({ ...filters, year });
        } else {
            console.log('unchanged', year);
        }
    }

    function handleSortFieldChange(id, value) {
        const field = sortFieldByLabel[value];
        console.log('handleSortFieldChange', value, field);
        onSortFieldChange(field);
    }

    const yearProps = { min: "1800", max: `${new Date().getFullYear()+1}`, step: "10" };

    return (
    <form className={classes.root}>
        <p></p>
        <Divider/>
        <FormHelperText>Use these controls to sort the list by name, price, etc. and to choose how much you want to see</FormHelperText>
        <Grid container direction="row" justify="space-between" alignItems="stretch" >
            <FormGroup>
            <Picker clearable={false} value={sortLabelByField[sortField]} id="sort-field" onChange={handleSortFieldChange} options={sortLabels} label="Currently Sorting By" />
            <span>&nbsp;&nbsp;&nbsp;<FormControlLabel id="sort-direction" onChange={onSortDirectionChange} control={<Switch checked={sortDirection==='desc'} />} label="reversed" /></span>
            </FormGroup>
            <FormGroup>
            <FormControlLabel control={<Switch id="nopics" onChange={sw} checked={!!filters.nopics} />} label="include boats without pictures"  />
            <FormControlLabel control={<Switch id="sale" onChange={sw} checked={!!filters.sale} />} label="only boats for sale"/>
            </FormGroup>
            <Picker clearable={false} value={boatsPerPage} id="page-size" onChange={onPageSizeChange} options={pageSize} label="Boats Per Page"/>
        </Grid>
        <Divider/>
        <FormHelperText>Use these controls to filter the list in one or more ways</FormHelperText>
        <Grid container direction="row" justify="space-between" alignItems="stretch" >
            <Picker onChange={pl} id="boat-name" options={boatNames} label="Boat Name" value={filters['boat-name']} />
            <TextField onChange={o} id="oga-no" label="OGA Boat No." variant="outlined" value={filters['ogaNo']} />
            <Picker onChange={pl} options={pickers.designer} label="Designer" value={filters['designer-name']} />
            <Picker onChange={pl} options={pickers.builder} label="Builder" value={filters['builder-name']} />
            <TextField onChange={sy} id="firstYear" label="Built After" variant="outlined"
                type="number" inputProps={yearProps} 
            />
            <TextField onChange={sy} id="lastYear" label="Built Before" variant="outlined"
                type="number" inputProps={yearProps} 
            />
            <Picker onChange={pl} options={pickers.rig_type} label="Rig Type" value={filters['rig-type']}/>
            <Picker onChange={pl} options={pickers.sail_type} label="Mainsail Type" value={filters['mainsail-type']}/>
            <Picker onChange={pl} options={pickers.generic_type} label="Generic Type" value={filters['generic-type']}/>
            <Picker onChange={pl} options={pickers.design_class} label="Design Class" value={filters['design-class']}/>
            <Picker onChange={pl} options={pickers.construction_material} label="Construction Material" />
        </Grid>
    </form>
    );
}
