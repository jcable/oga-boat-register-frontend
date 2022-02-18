import React, { useRef } from "react";
import { useTheme, ThemeProvider } from '@mui/material/styles'
import Typography from "@mui/material/Typography";
import { useFieldApi } from "@data-driven-forms/react-form-renderer";
import MUIRichTextEditor from "mui-rte";
import { stateToHTML } from "draft-js-export-html";
import {
  convertFromHTML,
  ContentState,
  convertFromRaw,
  convertToRaw,
} from "draft-js";

function htmlToRTE(html) {
  const contentHTML = convertFromHTML(html || "<p><br/></p>");
  return ContentState.createFromBlockArray(
    contentHTML.contentBlocks,
    contentHTML.entityMap
  );
}

export const HtmlEditor = ({ component, name, title, ...rest }) => {
  const ref = useRef(null);
  const { input } = useFieldApi({ component, name });

  const handleBlur = () => {
    // console.log("RTE blur", input.name, ref);
    ref.current.save();
  };

  const handleSave = (data) => {
    const html = stateToHTML(convertFromRaw(JSON.parse(data)));
    // console.log("RTE save", input.name, html);
    input.onChange(html);
  };

  const theme = useTheme();
  Object.assign(theme, {
    overrides: {
      MUIRichTextEditor: {
        root: {
          width: "100%",
          clear: "both",
        },
        toolbar: {
          borderTop: "1px solid gray",
          borderLeft: "1px solid gray",
          borderRight: "1px solid gray",
          backgroundColor: "whitesmoke",
        },
        editor: {
          border: "1px solid gray",
          marginBottom: theme.spacing(2),
          paddingLeft: theme.spacing(1),
          paddingRight: theme.spacing(1),
        }
      }
    }
})

  return (
    <div
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.stopPropagation();
        }
      }}
    >
      <Typography sx={{ paddingTop: "1em" }}>{title}</Typography>
      <ThemeProvider theme={theme}>
        <MUIRichTextEditor
          label="type some text"
          {...rest}
          defaultValue={JSON.stringify(convertToRaw(htmlToRTE(input.value)))}
          onSave={handleSave}
          onBlur={handleBlur}
          ref={ref}
        />
      </ThemeProvider>
    </div>
  );
};


export const BasicHtmlEditor = ({ onSave, data, name, title, ...rest }) => {
  const ref = useRef(null);

  const handleBlur = () => {
    ref.current.save();
  };

  const handleSave = (data) => {
    onSave(stateToHTML(convertFromRaw(JSON.parse(data))));
  };

  const theme = useTheme();
  Object.assign(theme, {
    overrides: {
      MUIRichTextEditor: {
        root: {
          width: "100%",
          clear: "both",
        },
        toolbar: {
          borderTop: "1px solid gray",
          borderLeft: "1px solid gray",
          borderRight: "1px solid gray",
          backgroundColor: "whitesmoke",
        },
        editor: {
          border: "1px solid gray",
          marginBottom: theme.spacing(2),
          paddingLeft: theme.spacing(1),
          paddingRight: theme.spacing(1),
        }
      }
    }
})

  return (
    <div
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.stopPropagation();
        }
      }}
    >
      <Typography sx={{ paddingTop: "1em" }}>{title}</Typography>
      <ThemeProvider theme={theme}>
        <MUIRichTextEditor
          label="type some text"
          {...rest}
          defaultValue={JSON.stringify(convertToRaw(htmlToRTE(data)))}
          onSave={handleSave}
          onBlur={handleBlur}
          ref={ref}
        />
      </ThemeProvider>
    </div>
  );
};