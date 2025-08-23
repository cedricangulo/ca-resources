import { Route } from "next"

import React from "react"

import Link from "next/link"

import { Separator } from "../ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import ImageRender from "./image-render"
import {
  BorderProps,
  GuideImageProps,
  IListProps,
  ITableProps,
  orderedList,
  studentData,
  tblCellSpan,
} from "./interface/mdx-elements"

const BorderExample: React.FC<BorderProps> = ({
  borderWidth = "3px",
  borderStyle = "solid",
  borderColor = "hsl(var(--foreground))",
  text,
}) => {
  const style: React.CSSProperties = {
    margin: "8px 0",
    borderWidth,
    borderStyle,
    borderColor,
    border: `${borderWidth} ${borderStyle} ${borderColor}`,
  }

  return (
    <div
      style={style}
      className="text-foreground p-2 text-center"
    >
      {text}
    </div>
  )
}
BorderExample.displayName = "BorderExample"

const DataTable = ({ children }: { children: React.ReactNode }) => {
  return <div className="data-table mt-4 w-full">{children}</div>
}
DataTable.DisplayName = "DataTable"

const DataTableExample = () => {
  return (
    <Table className="mx-auto mt-6 w-full md:mx-0 md:w-2/4">
      <TableHeader>
        <TableRow className="border-border">
          <TableHead className="text-xl font-semibold tracking-tight">
            Student Name
          </TableHead>
          <TableHead className="text-xl font-semibold tracking-tight">
            Student Number
          </TableHead>
          <TableHead className="text-right text-xl font-semibold tracking-tight">
            Age
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow className="border-border">
          <TableCell>Juan Dela Cruz</TableCell>
          <TableCell>2021-21067</TableCell>
          <TableCell className="text-right">18</TableCell>
        </TableRow>
        <TableRow className="border-border">
          <TableCell>Pedro Cruise</TableCell>
          <TableCell>2021-21114</TableCell>
          <TableCell className="text-right">19</TableCell>
        </TableRow>
        <TableRow className="border-border">
          <TableCell>Simon Ibarra</TableCell>
          <TableCell>2021-21584</TableCell>
          <TableCell className="text-right">18</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
DataTableExample.DisplayName = "DataTableExample"

const GuideImage: React.FC<Partial<GuideImageProps>> = ({
  src = "",
  alt = "Image",
  width = 100,
  maxWidth,
  height = 100,
  className = "",
  ...props
}) => (
  <ImageRender
    {...props}
    src={src}
    alt={alt}
    width={width}
    height={height}
    className={`mx-auto my-4 w-full md:max-w-[${maxWidth}] ${className}`}
  />
)

GuideImage.displayName = "GuideImage"

const MDXLink = ({
  children,
  href,
  target,
}: {
  children: React.ReactNode
  href: string
  target: string
}) => {
  return (
    <Link
      className="link"
      href={href as Route}
      target={target}
    >
      {children}
    </Link>
  )
}
MDXLink.DisplayName = "MDXLink"

const SummaryTable = ({ children }: { children: React.ReactNode }) => {
  return <div className="mt-4 table w-full">{children}</div>
}
SummaryTable.DisplayName = "SummaryTable"

const OrderedList: React.FC<IListProps> = ({
  listStyle,
  type,
  startVal,
  position,
  image,
}) => {
  const font = "Times New Roman, serif"
  const h1: React.CSSProperties = {
    fontFamily: font,
    margin: "1.34rem 0",
    fontSize: "2.25rem",
  }
  const h3: React.CSSProperties = {
    fontFamily: font,
    margin: "1rem 0",
    fontSize: "1.5rem",
  }
  const ol: React.CSSProperties = {
    listStyleType: type,
    listStylePosition: position,
    margin: "1rem 0",
    paddingLeft: "2.5rem",
  }
  const li: React.CSSProperties = {
    fontFamily: font,
    color: "hsl(var(--foreground))",
    marginBottom: 0,
    padding: 0,
  }

  return (
    <div className="border-border bg-background-foreground mt-4 rounded-lg border p-4">
      {listStyle === "type" ? (
        <>
          <h1 style={h1}>Phases of WDLC</h1>
          <ol
            style={ol}
            start={startVal}
          >
            {orderedList.ol1.map((ol) => {
              return (
                <li
                  key={ol}
                  style={li}
                >
                  {ol}
                </li>
              )
            })}
          </ol>
        </>
      ) : listStyle === "position" ? (
        <>
          <h3 style={h3}>To create a web page:</h3>
          <ol
            style={ol}
            start={startVal}
          >
            {orderedList.ol2.map((ol) => {
              return (
                <li
                  key={ol}
                  style={li}
                >
                  {ol}
                </li>
              )
            })}
          </ol>
        </>
      ) : (
        <>
          <h1 style={h1}>Most Popular Web Browsers</h1>
          <ul
            style={{
              listStyleImage: `URL(${image})`,
              margin: "1rem 0",
              paddingLeft: "2.5rem",
            }}
          >
            {orderedList.ol3.map((ol) => {
              return (
                <li
                  key={ol}
                  style={li}
                >
                  {ol}
                </li>
              )
            })}
          </ul>
        </>
      )}
    </div>
  )
}

OrderedList.displayName = "OrderedList"

const UnorderedList: React.FC<IListProps> = ({ type }) => {
  const h1: React.CSSProperties = {
    fontFamily: "Times New Roman, serif",
    margin: "1.34rem 0",
    fontSize: "2.25rem",
  }
  const ul: React.CSSProperties = {
    listStyleType: type,
    margin: "1rem 0",
    paddingLeft: "2.5rem",
  }
  const li: React.CSSProperties = {
    fontFamily: "Times New Roman, serif",
    color: "hsl(var(--foreground))",
    marginBottom: 0,
  }

  return (
    <>
      <div className="border-border bg-background-foreground mt-4 rounded-lg border p-4">
        <h1 style={h1}>Most Popular Web Browsers</h1>
        <ul style={ul}>
          {orderedList.ol3.map((ol) => {
            return (
              <li
                key={ol}
                style={li}
              >
                {ol}
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}
UnorderedList.displayName = "UnorderedList"

const TableExample: React.FC<ITableProps> = ({ example_id }) => {
  const getStyle = () => {
    const styles = ["table1", "table2", "table3", "table4", "table5"]
    return styles[example_id! - 1] || ""
  }

  return (
    <table className={`mt-4 ${getStyle()}`}>
      <thead>
        <tr>
          <th>Student Name</th>
          <th>Student Number</th>
          <th>Age</th>
        </tr>
      </thead>
      <tbody>
        {studentData.map((student, index) => (
          <tr key={index}>
            <td>{student.name}</td>
            <td>{student.id}</td>
            <td>{student.age}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
TableExample.displayName = "TableExample"

const TableCellSpanning: React.FC = () => (
  <table className="table6">
    <thead>
      <tr>
        {tblCellSpan.th.th1.map((th) => {
          return (
            <React.Fragment key={th.text}>
              {th.span === "col" ? (
                <th
                  key={th.text}
                  colSpan={th.spanVal}
                >
                  {th.text}
                </th>
              ) : (
                <th
                  key={th.text}
                  rowSpan={th.spanVal}
                >
                  {th.text}
                </th>
              )}
            </React.Fragment>
          )
        })}
      </tr>
      <tr>
        {tblCellSpan.th.th2.map((th, idx) => {
          return <th key={idx}>{th}</th>
        })}
      </tr>
    </thead>
    <tbody>
      <tr>
        {tblCellSpan.td.map((td, idx) => {
          return <td key={idx}>{td}</td>
        })}
      </tr>
    </tbody>
  </table>
)
TableCellSpanning.displayName = "TableCellSpanning"

const MDXSeparator: React.FC = () => <Separator className="my-12" />

export {
  BorderExample,
  DataTable,
  DataTableExample,
  GuideImage,
  MDXLink,
  MDXSeparator,
  SummaryTable,
  OrderedList,
  TableCellSpanning,
  TableExample,
  UnorderedList,
}
