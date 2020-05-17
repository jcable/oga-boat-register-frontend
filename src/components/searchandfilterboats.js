import React, { useState, useEffect } from 'react'
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { FormControlLabel, Grid, Switch, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Picker from './picker'

const sortFields = [
    { name: "Boat Name" },
    { name: "OGA No." },
    { name: "Year Built" },
    { name: "Last Updated" },
    { name: "Price" },
];
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
    sortDirection = 'asc',
    sortField = 'name',
    boatsPerPage = 12,
    filters = { year: { firstYear: 1800, lastYear: new Date().getFullYear() }},
    onFilterChange,
    onPageSizeChange,
    onSortFieldChange,
    onSortDirectionChange,
}) {
    const classes = useStyles();
    const [names, setNames] = useState({});
    const [ogaNo, setOgaNo] = useState();
    const [year, setYear] = useState(filters.year);
    
    function update() {
        const f = { ...names, ogaNo, year };
        console.log('updateFilters', f);
        if(onFilterChange) onFilterChange(f);
    }

    useEffect(update, [names, ogaNo, year]);

    const { loading, error, data } = useQuery(gql(`{
        boat{name previous_names}
        designer(order_by: {name: asc}){name}
        builder(order_by: {name: asc}){name}
        rig_type(order_by: {name: asc}){name}
        sail_type(order_by: {name: asc}){name}
        design_class(order_by: {name: asc}){name}
        generic_type(order_by: {name: asc}){name}
        construction_material(order_by: {name: asc}){name}
    }`));

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(SearchAndFilterBoats)</p>;

    const { boat, designer, builder, rig_type, sail_type, design_class, generic_type, construction_material } = data;

    const boatNames = makeBoatNameList(boat);

    function sw(event, val) {
        if (event.target.id) {
            const n = names;
            n[event.target.id] = val;
            setNames(n);
            update(); 
        }
    }

    function pl(id, value) {
        const n = names;
        if (value) {
            n[id] = value;
        } else {
            delete n[id];
        }
        setNames(n);
        update(); 
}

    function o(event) {
        setOgaNo(event.target.value);
        update(); 
    }

    function sy(event) {
        console.log('sy', event);
        const { id, value } = event.target;
        if (value.length === 4) {
            const y = year;
            y[id] = value;
            setYear(y);    
            update(); 
        }
    }

    return (
    <form className={classes.root}>
        <Grid container direction="row" justify="center" alignItems="center" >
            <Picker onChange={pl} id="boat-name" options={boatNames} label="Boat Name" />
            <TextField onChange={o} id="oga-no" label="OGA Boat No." variant="outlined" />
            <Picker onChange={pl} id="designer-name" options={designer} label="Designer" />
            <Picker onChange={pl} id="builder-name" options={builder} label="Builder" />
            <TextField onChange={sy} id="firstYear" label="Built After" variant="outlined"
                min={filters.year.firstYear} max={filters.year.lastYear} defaultValue={filters.year.firstYear}
            />
            <TextField onChange={sy} id="lastYear" label="Built Before" variant="outlined"
                min={filters.year.firstYear} max={filters.year.lastYear} defaultValue={filters.year.lastYear}
            />
            <Picker onChange={pl} id="rig-type" options={rig_type} label="Rig Type" />
            <Picker onChange={pl} id="mainsail-type" options={sail_type} label="Mainsail Type" />
            <Picker onChange={pl} id="generic-type" options={generic_type} label="Generic Type" />
            <Picker onChange={pl} id="design-class" options={design_class} label="Design Class" />
            <Picker onChange={pl} id="construction-material" options={construction_material} label="Construction Material" />
            <FormControlLabel control={<Switch id="nopics" onChange={sw} checked={filters.nopics} />} label="include boats without pictures"  />
            <FormControlLabel control={<Switch id="sale" onChange={sw} checked={filters.sale} />} label="only boats for sale"/>
            <Picker defaultValue={sortField} id="sort-field" onChange={onSortFieldChange} options={sortFields} label="Sort By" />
            <FormControlLabel id="sort-direction" onChange={onSortDirectionChange} control={<Switch checked={sortDirection==='desc'} />} label="reversed" />
            <Picker defaultValue={boatsPerPage} id="page-size" onChange={onPageSizeChange} options={pageSize} label="Boats Per Page" />
        </Grid>
    </form>
    );
}
