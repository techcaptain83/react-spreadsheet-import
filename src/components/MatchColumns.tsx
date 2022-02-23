import React, { useCallback, useState } from "react"
import { Box, Flex, Heading, Text } from "@chakra-ui/react"
import { FadingWrapper } from "./FadingWrapper"
import { UserTableColumn } from "./UserTableColumn"
import { useRsi } from "../hooks/useRsi"
import { TemplateColumn } from "./TemplateColumn"
import type { Field } from "../types"
import uniqBy from "lodash/uniqBy"

const MATCH_COLUMNS_TITLE = "Validate column matching"
const USER_TABLE_TITLE = "Your table"
const TEMPLATE_TITLE = "Will become"

type MatchColumnsProps = {
  data: (string | number)[][]
  headerIndex: number
}

export enum ColumnType {
  empty,
  ignored,
  matched,
  matchedSelect,
  matchedSelectOptions,
}

type MatchedOptions = {
  entry: string | number
  value: string
}

export type Column =
  | { type: ColumnType.empty; index: number; header: string }
  | { type: ColumnType.ignored; index: number; header: string }
  | { type: ColumnType.matched; index: number; header: string; value: string }
  | {
      type: ColumnType.matchedSelect
      index: number
      header: string
      value: string
      matchedOptions: Partial<MatchedOptions>[]
    }
  | {
      type: ColumnType.matchedSelectOptions
      index: number
      header: string
      value: string
      matchedOptions: MatchedOptions[]
    }

type Columns = Column[]

const uniqueEntries = (data: MatchColumnsProps["data"], index: number): Partial<MatchedOptions>[] =>
  uniqBy(
    data.map((row) => ({ entry: row[index] })),
    "entry",
  )

const setColumn = (oldColumn: Column, field?: Field<any>, data?: MatchColumnsProps["data"]): Column => {
  switch (field?.fieldType.type) {
    case "select":
      return {
        ...oldColumn,
        type: ColumnType.matchedSelect,
        value: field.key,
        matchedOptions: uniqueEntries(data || [], oldColumn.index),
      }
    case "checkbox":
    case "input":
      return { index: oldColumn.index, type: ColumnType.matched, value: field.key, header: oldColumn.header }
    default:
      return { index: oldColumn.index, header: oldColumn.header, type: ColumnType.empty }
  }
}

const setIgnoredColumn = ({ header, index }: Column): Column => ({ header, index, type: ColumnType.ignored })

export const MatchColumns = ({ data, headerIndex }: MatchColumnsProps) => {
  const header = data[headerIndex].map((el) => el.toString())
  const trimmedData = data.slice(headerIndex + 1)
  const dataExample = trimmedData.slice(0, 2)
  const [columns, setColumns] = useState<Columns>(
    header.map((headerValues, index) => ({ type: ColumnType.empty, index, header: headerValues })),
  )
  const { fields } = useRsi()

  const onChange = useCallback(
    (value, columnIndex) => {
      const field = fields.find((field) => field.key === value)

      setColumns(
        columns.map((column, index) => (columnIndex === index ? setColumn(column, field, trimmedData) : column)),
      )
    },
    [columns, setColumns],
  )

  const onIgnore = useCallback(
    (columnIndex) => {
      setColumns(columns.map((column, index) => (columnIndex === index ? setIgnoredColumn(column) : column)))
    },
    [columns, setColumns],
  )

  const onRevertIgnore = useCallback(
    (columnIndex) => {
      setColumns(columns.map((column, index) => (columnIndex === index ? setColumn(column) : column)))
    },
    [columns, setColumns],
  )

  return (
    <Flex flex={1} flexDir="column" minH={"100vh"} px={4}>
      <Heading size="lg" mb={8}>
        {MATCH_COLUMNS_TITLE}
      </Heading>
      <Flex
        flex={1}
        display="grid"
        gridTemplateRows="auto auto auto 1fr"
        gridTemplateColumns={`0.75rem repeat(${header.length}, minmax(20rem, auto)) 0.75rem`}
      >
        <Box gridColumn={`1/${header.length + 3}`}>
          <Text fontSize="2xl" lineHeight={8} fontWeight="semibold" mb={4}>
            {USER_TABLE_TITLE}
          </Text>
        </Box>
        {columns.map((column, index) => (
          <Box gridRow="2/3" gridColumn={`${index + 2}/${index + 3}`} pt={3} key={column.header}>
            <UserTableColumn
              column={column}
              onIgnore={onIgnore}
              onRevertIgnore={onRevertIgnore}
              entries={dataExample.map((row) => row[column.index])}
            />
          </Box>
        ))}
        <FadingWrapper gridColumn={`1/${header.length + 3}`} gridRow="2/3" />
        <Box gridColumn={`1/${header.length + 1}`}>
          <Text fontSize="2xl" lineHeight={8} fontWeight="semibold" mb={4} mt={7}>
            {TEMPLATE_TITLE}
          </Text>
        </Box>
        <FadingWrapper gridColumn={`1/${header.length + 3}`} gridRow="4/5" />
        {columns.map((column, index) => (
          <Box gridRow="4/5" gridColumn={`${index + 2}/${index + 3}`} key={column.index} py="1.125rem" pl={2} pr={3}>
            <TemplateColumn column={column} onChange={onChange} />
          </Box>
        ))}
      </Flex>
    </Flex>
  )
}
