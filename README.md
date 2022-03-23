<h1 align="center">RSI react-spreadsheet-import ⚡️</h1>

<div align="center">
  
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/UgnisSoftware/react-spreadsheet-import/Node.js%20CI)
![GitHub](https://img.shields.io/github/license/UgnisSoftware/react-spreadsheet-import) [![npm](https://img.shields.io/npm/v/react-spreadsheet-import)](https://www.npmjs.com/package/react-spreadsheet-import)
  
</div>
<br />

A component used for importing XLS / XLSX / CSV documents built with [**Chakra UI**](https://chakra-ui.com). Import flow combines:

- 📥  Uploader
- ⚙️  Parser
- 📊  File preview
- 🧪  UI for column mapping
- ✏  UI for validating and editing data


✨ [**Demo**](https://ugnissoftware.github.io/react-spreadsheet-import/iframe.html?id=react-spreadsheet-import--basic&args=&viewMode=story) ✨
<br />

## Features

- Custom styles - edit Chakra UI theme to match your project's styles 🎨
- Custom validation rules - make sure valid data is being imported, easily spot and correct errors
- Hooks - alter raw data after upload or make adjustments on data changes
- Auto-mapping columns - automatically map most likely value to your template values, e.g. `name` -> `firstName` 
<br />

![rsi-preview](https://user-images.githubusercontent.com/45755753/159503528-90aacb69-128f-4ece-b45b-ab97d403a9d3.gif)


## Figma

We provide full figma designs. You can copy the designs
[here](https://www.figma.com/community/file/1080776795891439629)

## Getting started

```sh
npm i react-spreadsheet-import
```

Using the component: (it's up to you when the flow is open and what you do on submit with the imported data)

```tsx
import { ReactSpreadsheetImport } from "react-spreadsheet-import";

<ReactSpreadsheetImport
  isOpen={isOpen}
  onClose={onClose}
  onSubmit={onSubmit}
  fields={fields}
/>
```

## Required Props

```tsx
  // Determines if modal is visible.
  isOpen: Boolean
  // Called when flow is closed without reaching submit.
  onClose: () => void 
  // Called after user completes the flow. Provides data array, where data keys matches your field keys.
  onSubmit: (data) => void 
```

### Fields

Fields describe what data you are trying to collect.

```tsx
const fields = [
  {
    // Visible in table header and when matching columns.
    label: "Name",
    // This is the key used for this field when we call onSubmit.
    key: "name",
    // Allows for better automatic column matching. Optional.
    alternateMatches: ["first name", "first"],
    // Used when editing and validating information.
    fieldType: {
      // There are 3 types - "input" / "checkbox" / "select".
      type: "input",
    },
    // Used in the first step to provide an example of what data is expected in this field. Optional.
    example: "Stephanie",
    // Can have multiple validations that are visible in Validation Step table.
    validations: [
      {
        // Can be "required" / "unique" / "regex"
        rule: "required",
        errorMessage: "Name is required",
        // There can be "info" / "warning" / "error" levels. Optional. Default "error".
        level: "error",
      },
    ],
  },
] as const
```

## Optional Props
### Hooks

You can transform and validate data with custom hooks. There are 3 hooks that have different performance tradeoffs:

- **initialHook** - runs only once after column matching. Operations that should run once should be done here.
- **tableHook** - runs at the start and on any change. Runs on all rows. Very expensive, but can change rows that depend on other rows.
- **rowHook** - runs at the start and on any row change. Runs only on the rows changed. Fastest, most validations and transformations should be done here.

Example:

```tsx
<ReactSpreadsheetImport
  rowHook={(data, addError) => {
    // Validation
    if (data.name === "John") {
      addError("name", { message: "No Johns allowed", level: "info" })
    }
    // Transformation
    return { ...data, name: "Not John" }
    // Sorry John
  }}
/>
```

### Other optional props

```tsx
  // Allows submitting with errors. Default: true
  allowInvalidSubmit?: boolean
  // Translations for each text. See customisation bellow
  translations?: object
  // Theme configuration passed to underlying Chakra-UI. See customisation bellow
  customTheme?: object
  // Specifies maximum number of rows for a single import
  maxRecords?: number
  // Maximum upload filesize (in bytes)
  maxFileSize?: number
  // Automatically map imported headers to specified fields if possible. Default: true
  autoMapHeaders?: boolean
  // Headers matching accuracy: 1 for strict and up for more flexible matching. Default: 2
  autoMapDistance?: number
```

## Customisation

### Customising styles (colors, fonts)

Underneath we use Chakra-UI, you can send in a custom theme for us to apply. Read more about themes [here](https://chakra-ui.com/docs/styled-system/theming/theme)

```tsx
<ReactSpreadsheetImport
  customTheme={yourTheme}
/>
```

You can see all the changable styles [here](https://github.com/UgnisSoftware/react-spreadsheet-import/blob/master/src/theme.ts)

### Changing text (translations)

You can change any text in the flow:

```tsx
<ReactSpreadsheetImport
  translations={{
    uploadStep: {
      title: "Upload Employees",
    },
  }}
/>
```

You can see all the translation keys [here](https://github.com/UgnisSoftware/react-spreadsheet-import/blob/master/src/translationsRSIProps.ts)

## VS other libraries

Flatfile vs react-spreadsheet-import and Dromo vs react-spreadsheet-import:

|                                    | RSI            | Flatfile    | Dromo       |
|------------------------------------|----------------|-------------|-------------|
| Licence                        | MIT            | Proprietary | Proprietary |
| Price                          | Free           | Paid        | Paid        |
| Support                        | Github Issues  | Enterprise  | Enterprise  |
| Self-host                      | Yes            | Paid        | Paid        |
| Hosted solution                | In development | Yes         | No          |
| On-prem deployment             | N/A            | Yes         | Yes         |
| Hooks                          | Yes            | Yes         | Yes         |
| Automatic header matching      | Yes            | Yes         | Yes         |
| Data validation                | Yes            | Yes         | Yes         |
| Custom styling                 | Yes            | Yes         | Yes         |
| Translations                   | Yes            | Yes         | No          |
| Trademarked words `Data Hooks` | No             | Yes         | No          |

React-spreadsheet-import can be used as a free and open-source alternative to Flatfile and Dromo.

## Contributing

Feel free to open issues if you have any questions or notice bugs. If you want different component behaviour, consider forking the project.

## Credits

Created by Ugnis. [Julita Kriauciunaite](https://github.com/JulitorK) and [Karolis Masiulis](https://github.com/masiulis). You can contact us at `info@ugnis.com`
