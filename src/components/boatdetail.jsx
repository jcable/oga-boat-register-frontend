/* eslint-disable react/jsx-no-target-blank */
import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import TabPanel from './tabpanel';
import ConditionalText from './conditionaltext';
import SailTable from './sailtable';
import { m2f, price, formatDesignerBuilder, kg } from '../util/format';
import DetailBar from './detailbar';
import Owners from './owners';
import { Typography } from '@mui/material';

const registration_fields = ['sail_number', 'ssr', 'nhsr', 'fishing_number', 'mmsi', 'callsign', 'nsbr', 'uk_part1'];

export function HandicapDisplay({ handicapData }) {
  if (handicapData?.checked) {
    return <>
      <ConditionalText label='T(H)CF' value={handicapData?.thcf?.toFixed(3)} />
      <ConditionalText label='Solent Rating' value={handicapData?.solent.thcf?.toFixed(3)} />
    </>;
  } else {
    return (<><Typography variant='subtitle2' component='span'>T(H)CF: </Typography><Typography variant="body1" component='span'>
      We are asking all boat owners to re-validate the data used to calculate handicaps.
      The best way to do this is to use the 'I have Edits' button and step through the choices,
      making any changes you want. If all is correct, just submit the form. Alternatively, email
      the boat register editors.
    </Typography></>)
  }
}

export default function BoatDetail({ boat, user }) {
  const [value, setValue] = useState(0);

  // TODO const { ref } = useInView({ threshold: 0 });

  const roles = user?.['https://oga.org.uk/roles'] || [];

  const hd = boat.handicap_data || {};
  const panes = [
    {
      title: 'Design & Build', children: (
        <Paper>
          <ConditionalText value={boat.generic_type} label="Generic type" />
          <ConditionalText value={boat.design_class?.name} label="Design class" />
          <ConditionalText label="Designer" value={boat.designer?.name} />
          <ConditionalText value={boat.hull_form} label="Hull form" />
          <ConditionalText label="Builder" value={formatDesignerBuilder(boat, 'builder')} />
          <ConditionalText value={boat.place_built} label="Place built" />
          <ConditionalText value={(boat.year_is_approximate ? 'around ' : '') + boat.year} label="Year of Build" />
          <ConditionalText value={boat.construction_material} label="Construction material" />
          <ConditionalText value={boat.construction_method} label="Construction method" />
          <ConditionalText value={boat.spar_material} label="Spar material" />
          <ConditionalText value={boat.construction_details} label="Construction details" />
        </Paper>
      )
    },
    {
      title: 'Dimensions', children: (
        <Paper>
          <ConditionalText value={m2f(hd.length_on_deck)} label="Length on deck (LOD)" />
          <ConditionalText label="Waterline Length (LWL)" value={m2f(hd.length_on_waterline)} />
          <ConditionalText value={m2f(hd.beam)} label="Beam" />
          <ConditionalText value={m2f(hd.draft)} label="Draft" />
          <ConditionalText value={kg(hd.displacement)} label="Displacement" />
          <ConditionalText value={hd.solent?.hull_shape} label="Solent Rating Hull Shape" />
        </Paper>)
    },
  ];
  const registration_fields_for_boat = Object.keys(boat).filter(value => registration_fields.includes(value));
  if (registration_fields_for_boat.length > 0) {
    panes.unshift(
      {
        title: 'Registrations', children: (
          <Paper>
            <ConditionalText value={boat.sail_number} label="Sail No." />
            <ConditionalText value={boat.ssr} label="Small Ships Registry no. (SSR)" />
            <ConditionalText value={boat.nhsr} label="National Register of Historic Vessels no. (NRHV)" />
            <ConditionalText value={boat.fishing_number} label="Fishing No." />
            <ConditionalText value={boat.mmsi} label="MMSI" />
            <ConditionalText value={boat.callsign} label="Call Sign" />
            <ConditionalText value={boat.nsbr} label="National Small Boat Register" />
            <ConditionalText value={boat.uk_part1} label="Official Registration" />
          </Paper>
        )
      });
  }
  // if(hd.main || hd.thcf || hd.calculated_thcf || hd.fore_triangle_base) {
  if (hd.main || hd.fore_triangle_base) {
    panes.push({
      title: 'Rig and Sails', children: (
        <Paper>
          <ConditionalText label="Fore triangle base" value={m2f(hd.fore_triangle_base)} />
          <ConditionalText label="Fore triangle height" value={m2f(hd.fore_triangle_height)} />
          <HandicapDisplay handicapData={hd} />
          <SailTable handicapData={hd} />
        </Paper>
      )
    });
  }

  if (roles.includes('member')) {
    panes.push({
      title: 'Owners', children: (
        <Owners owners={boat.ownerships} email={user.email} />
      )
    });
  }

  /*
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
  
  */
  if (boat.full_description) {
    panes.unshift(
      { title: 'Details', children: (<Paper dangerouslySetInnerHTML={{ __html: boat.full_description }} />) },
    );
  }

  // newest for sale record
  if (boat.selling_status === 'for_sale') {
    const fs = boat.for_sales.reduce((prev, curr) =>
      (new Date(prev.created_at)
        >
        new Date(curr.created_at)
      ) ? prev : curr
    );

    if (fs) {
      panes.unshift(
        {
          title: 'For Sale', children: (
            <Paper>
              <ConditionalText label="Price" value={price(fs.asking_price)} />
              <div dangerouslySetInnerHTML={{ __html: fs.sales_text }} />
            </Paper>
          )
        },
      );
    }
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <DetailBar
        sx={{ height: "8rem" }}
        onChange={handleChange} value={value} panes={panes}
      />
      {panes.map((pane, i) => (
        <TabPanel key={i} value={value} index={i}>
          {pane.children}
        </TabPanel>
      ))}
    </>
  );
}