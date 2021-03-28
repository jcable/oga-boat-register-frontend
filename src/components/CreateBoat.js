import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import FormRenderer, {
  componentTypes, dataTypes,
} from "@data-driven-forms/react-form-renderer";
import {
  componentMapper,
  FormTemplate,
} from "@data-driven-forms/mui-component-mapper";
import { MuiThemeProvider } from "@material-ui/core/styles";
import HullForm from "./HullForm";
import { mapPicker } from "./Rig";
import { usePicklists } from "../util/picklists";
import { theme, HtmlEditor } from "./ddf/RTE";

const extendableItems = ({pickers, name, label}) => {
  return [
    {
      component: componentTypes.SELECT,
      name,
      label,
      isReadOnly: false,
      isSearchable: true,
      isClearable: true,
      options: mapPicker(pickers[name]),
    },
    {
      component: componentTypes.TEXT_FIELD,
      condition: {
        when: name,
        isEmpty: true,
      },
      name: `new_${name}`,
      label: `a ${label.toLowerCase()} not listed`,
      isRequired: false,
    },
  ];
};

const builderItems = (pickers) => extendableItems({pickers, name: 'builder', label: 'Builder'})
const designerItems = (pickers) => extendableItems({pickers, name: 'designer', label: 'Designer'})

const form = (pickers) => {
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
      {
        component: componentTypes.TEXT_FIELD,
        name: "place_built",
        label: "Place built",
      },
    ],
  };
};

export default function CreateBoat({classes, onCancel, onSave }) {
  const { loading, error, data } = usePicklists();

  if (loading) return <CircularProgress />;
  if (error) return <p>Error :(can't get picklists)</p>;

  const pickers = data;

  const handleSubmit = (values) => {
    console.log("submit");
    const { email, ddf, ...result } = values;
    console.log(ddf);
    onSave( result, email);
  };

  return (
    <MuiThemeProvider theme={theme}>
      <FormRenderer
        schema={form(pickers)}
        componentMapper={{
          ...componentMapper,
          "hull-form": HullForm,
          html: HtmlEditor,
        }}
        FormTemplate={(props) => (
          <FormTemplate {...props} showFormControls={false} />
        )}
        onCancel={onCancel}
        onSubmit={handleSubmit}
      />
    </MuiThemeProvider>
  );
}
