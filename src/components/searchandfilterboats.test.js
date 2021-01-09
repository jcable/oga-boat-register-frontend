import React from 'react';
import { render } from '@testing-library/react';
import { MockedProvider } from "@apollo/react-testing";
import gql from 'graphql-tag';
import SearchAndFilterBoats from './searchandfilterboats';
import { makeBoatNameList } from './browseboats';
import { sampleBoatNames, mockPicks } from '../mock/sampledata';

const mocks = [
  {
    request: {
      query: gql`{
        boat{name previous_names}
        designer{name}
        builder{name}
        rig_type {name}
        sail_type{name}
        design_class {name}
        generic_type{name}
        construction_material{name}        
    }`,
      variables: { }
    },
    result: {
      data: {
        boat: sampleBoatNames
      }
    }
  },
];

test('bad names are omitted', () => {
  const nl = makeBoatNameList([
    {
      "name": "Lizzie Girl",
      "previous_names": null
    },
    {
      "name": "Petrel",
      "previous_names": []
    },
    {
      "name": "Rowspar",
      "previous_names": ["Sparrow", "White Kitten"]
    }
  ]);
  expect(nl).toStrictEqual([
    {"__typename": "boat", "name": "Lizzie Girl"},
    {"__typename": "boat", "name": "Petrel"},
    {"__typename": "boat", "name": "Rowspar"},
    {"__typename": "boat", "name": "Sparrow"},
    {"__typename": "boat", "name": "White Kitten"}
  ]);
});

test('renders learn react link', () => {
  const { getAllByText } = render(
    <MockedProvider mocks={mocks}>
      <SearchAndFilterBoats filters={{}} pickers={mockPicks}/>
    </MockedProvider>
  );
  const wanted = getAllByText(/Loading.../);
  expect(wanted[0]).toBeInTheDocument();
});
