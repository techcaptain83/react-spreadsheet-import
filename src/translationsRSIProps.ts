import type { DeepPartial } from "ts-essentials"

export const translations = {
  uploadStep: {
    title: "Upload file",
    manifestTitle: "Data that we expect:",
    manifestDescription: "(You will have a chance to rename or remove columns in next steps)",
    dropzone: {
      title: "Upload .xlsx, .xls or .csv file",
      errorToastDescription: "upload rejected",
      activeDropzoneTitle: "Drop file here...",
      buttonTitle: "Select file",
      loadingTitle: "Processing...",
    },
    selectSheet: {
      title: "Select the sheet to use",
      nextButtonTitle: "Next",
    },
  },
  selectHeaderStep: {
    title: "Select header row",
    nextButtonTitle: "Next",
  },
  matchColumnsStep: {
    title: "Match Columns",
    nextButtonTitle: "Next",
    userTableTitle: "Your table",
    templateTitle: "Will become",
    selectPlaceholder: "Select column...",
    ignoredColumnText: "Column ignored",
    subSelectPlaceholder: "Select...",
    matchDropdownTitle: "Match",
    unmatched: "Unmatched",
  },
  validationStep: {
    title: "Validate data",
    nextButtonTitle: "Confirm",
    noRowsMessage: "No data found",
    noRowsMessageWhenFiltered: "No data containing errors",
    discardButtonTitle: "Discard selected rows",
    filterSwitchTitle: "Show only rows with errors",
  },
}

export type TranslationsRSIProps = DeepPartial<typeof translations>
export type Translations = typeof translations
