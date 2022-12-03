import React, { useState, useEffect } from "react";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormHelperText from "@mui/material/FormHelperText";
import Picker from "./picker";
import NumberEntry from "./numberentry";
import DateRangePicker from "./daterangepicker";
import useDebounce from "../util/debounce";
import AddToFleet from './addtofleet';
import NewFleet from './newfleet';

const opposite = { asc: "desc", desc: "asc" };

const pageSize = [];
for (let i = 1; i <= 8; i++) {
  pageSize.push({ name: `${6 * i}` });
}

function makePicklist(view, pickers, field) {
  if (pickers[field] && pickers[field].length > 0) {
    const p = pickers[field]
    const pl = [...new Set(p)].map((item) => ({ name: item }));
    return pl;
  }
  return [];
}

export default function SearchAndFilterBoats({
  sortDirection,
  sortField,
  boatsPerPage,
  filters,
  view,
  pickers,
  onFilterChange,
  onPageSizeChange,
  onSortChange,
  onMarkedOnly,
  isMarkedOnly,
  markList,
}) {
  const currentFilters = filters || {};
  const [ogaNo, setOgaNo] = useState(currentFilters.oga_no || "");
  const debouncedOgaNo = useDebounce(ogaNo, 1000);
  useEffect(() => {
    if (debouncedOgaNo) {
      console.log("debounced oga no", debouncedOgaNo);
      if (debouncedOgaNo === "") {
        const { oga_no, ...f } = filters;
        onFilterChange(f);
      } else if (filters && filters.oga_no) {
        console.log("new", debouncedOgaNo, "old", filters.oga_no);
        const newNo = debouncedOgaNo;
        if (newNo !== filters.oga_no) {
          onFilterChange({ ...filters, oga_no: newNo });
        }
      } else {
        onFilterChange({ ...filters, oga_no: debouncedOgaNo });
      }
    }
  }, [debouncedOgaNo, filters, onFilterChange]);

  const dateRange = [
    currentFilters.firstYear || pickers.year.min,
    currentFilters.lastYear || pickers.year.max,
  ];
  const [dr, setDr] = useState(dateRange);

  const handlePageSizeChange = (_, bpp) => {
    onPageSizeChange(parseInt(bpp, 10));
  };

  function pl(id, value) {
    if (value) {
      onFilterChange({ ...currentFilters, [id]: value });
    } else {
      const f = { ...currentFilters };
      delete f[id];
      onFilterChange(f);
    }
  }

  function handleDateRange(event, newValue) {
    setDr(newValue);
  }

  function handleDateRangeCommitted(event, [min, max]) {
    const f = { ...currentFilters };
    if (min === pickers.year.min) {
      delete f.firstYear;
    } else {
      f.firstYear = min;
    }
    if (max === pickers.year.max) {
      delete f.lastYear;
    } else {
      f.lastYear = max;
    }
    onFilterChange(f);
  }

  const sortOptions = [
    { field: "name", name: "Name", direction: "asc" },
    { field: "oga_no", name: "OGA No.", direction: "asc" },
    { field: "year", name: "Age", direction: "asc" },
    { field: "updated_at", name: "Updated", direction: "desc" },
    { field: "length_on_deck", name: "Length", direction: "desc" },
    { field: "rank", name: "Editor's choice", direction: "asc" },
  ];
  if (view === 'sell') {
    sortOptions.push({ field: "price", name: "Price", direction: "desc" });
  }
  const sortLabelByField = sortOptions.reduce((r, { field, name }) => {
    r[field] = name;
    return r;
  }, {});
  const sortDirectionByField = sortOptions.reduce((r, { field, direction }) => {
    r[field] = direction;
    return r;
  }, {});

  function handleSortFieldChange(event) {
    const field = event.target.value;
    if (field !== sortField) {
      const normal = sortDirectionByField[field];
      onSortChange(field, normal);
    }
  }

  function handleSortDirectionChange(event) {
    const normal = sortDirectionByField[sortField];
    const dir = event.target.checked ? opposite[normal] : normal;
    if (dir !== sortDirection) {
      onSortChange(sortField, dir);
    }
  }

  function handleOnlyMarkedChange(event) {
    onMarkedOnly(event.target.checked);
  }

  return (
    <form>
      <FormHelperText sx={{ marginLeft: "1em", marginBottom: "3px" }}>
        Use these controls to sort the list by name, price, etc. and to choose
        how much you want to see
      </FormHelperText>
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="flex-end"
      >
        <Grid>
          <Picker
            clearable={false}
            value={`${boatsPerPage}`}
            id="page-size"
            onChange={handlePageSizeChange}
            options={pageSize}
            label="Boats Per Page"
          />
        </Grid>
        <Grid>
          <FormControl sx={{ marginLeft: "1.5em" }}>
            <FormLabel>Sort By</FormLabel>
            <RadioGroup
              row
              aria-label="sorting"
              name="sorting"
              value={sortLabelByField[sortField]}
              onChange={handleSortFieldChange}
            >
              {sortOptions.map((option) => (
                <FormControlLabel
                  key={option.name}
                  value={option.field}
                  sx={{ marginRight: "1em", borderRightWidth: "1vw" }}
                  control={<Radio checked={sortField === option.field} />}
                  label={option.name}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid>
          <FormControl sx={{ marginLeft: "1.5em" }}>
            <FormLabel>Sort Direction</FormLabel>
            <FormControlLabel
              id="sort-direction"
              onChange={handleSortDirectionChange}
              control={
                <Switch
                  checked={sortDirection !== sortDirectionByField[sortField]}
                />
              }
              label="reversed"
            />
          </FormControl>
        </Grid>
      </Grid>
      <Divider />
      <FormHelperText sx={{ marginLeft: "1em", marginBottom: "3px" }}>
        Use these controls to filter the list in one or more ways
      </FormHelperText>
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="baseline"
      >
        <Grid>
          <Picker
            onChange={pl}
            id="name"
            options={makePicklist(view, pickers, "name")}
            label="Boat Name"
            value={currentFilters["name"]}
          />
        </Grid>
        <Grid>
          <NumberEntry
            id="oga_no"
            label="OGA Boat No."
            value={ogaNo}
            onSet={setOgaNo}
            onClear={() => {
              const { oga_no, ...f } = currentFilters;
              if (oga_no) {
                onFilterChange(f);
              }
            }}
          />
        </Grid>
        <Grid>
          <Picker
            onChange={pl}
            id="designer"
            options={makePicklist(view, pickers, "designer")}
            label="Designer"
            value={currentFilters["designer"]}
          />
        </Grid>
        <Grid>
          <Picker
            onChange={pl}
            id="builder"
            options={makePicklist(view, pickers, "builder")}
            label="Builder"
            value={currentFilters["builder"]}
          />
        </Grid>
        <Grid>
          <Picker
            onChange={pl}
            id="rig_type"
            options={makePicklist(view, pickers, "rig_type")}
            label="Rig Type"
            value={currentFilters["rig_type"]}
          />
        </Grid>
        <Grid>
          <Picker
            onChange={pl}
            id="mainsail_type"
            options={makePicklist(view, pickers, "mainsail_type")}
            label="Mainsail Type"
            value={currentFilters["mainsail_type"]}
          />
        </Grid>
        <Grid>
          <Picker
            onChange={pl}
            id="generic_type"
            options={makePicklist(view, pickers, "generic_type")}
            label="Generic Type"
            value={() => {
              const f = currentFilters["generic_type"];
              if (Array.isArray(f)) {
                return ""; // don't make a selection if multiple selected
              }
              return f;
            }}
          />
        </Grid>
        <Grid>
          <Picker
            onChange={pl}
            id="design_class"
            options={makePicklist(view, pickers, "design_class")}
            label="Design Class"
            value={currentFilters["design_class"]}
          />
        </Grid>
        <Grid>
          <Picker
            onChange={pl}
            id="construction_material"
            options={makePicklist(view, pickers, "construction_material")}
            label="Construction Material"
            value={currentFilters["construction_material"]}
          />
        </Grid>
        <Grid>
          <DateRangePicker
            value={dr}
            yearProps={pickers.year}
            label={`Built Between: ${dateRange[0]} and ${dateRange[1]}`}
            onChange={handleDateRange}
            onChangeCommitted={handleDateRangeCommitted}
            min={pickers.year.min}
            max={pickers.year.max}
            step={pickers.year.step}
          />
        </Grid>
        <Grid>
          <Box
            sx={{
              position: "relative",
              top: "18px",
              border: "1px solid lightgray",
              borderRadius: "4px",
              marginLeft: "0",
              marginRight: "1px",
              paddingTop: 0.5,
              paddingLeft: 2,
              paddingRight: 0,
              paddingBottom: 0.5,
            }}
          >
            <FormControlLabel
              id="marked"
              onChange={handleOnlyMarkedChange}
              control={<Switch checked={isMarkedOnly} />}
              label="Only Marked Boats"
            />
            <NewFleet markList={markList}/>
            <AddToFleet markList={markList}/>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
}
