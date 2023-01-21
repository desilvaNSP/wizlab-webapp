import React from 'react'
import { useTable,useFilters, useSortBy } from 'react-table'
import { DefaultColumnFilter } from '../../../../custom/Filters'
import { matchSorter } from 'match-sorter'


export const SubjectsTable = ({ columns, data, updateMyData, skipPageReset }) => {

    function fuzzyTextFilterFn(rows, id, filterValue) {
        return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
    }

    // Let the table remove the filter if the string is empty
    fuzzyTextFilterFn.autoRemove = val => !val

    const filterTypes = React.useMemo(
        () => ({
            // Add a new fuzzyTextFilterFn filter type.
            fuzzyText: fuzzyTextFilterFn,
            // Or, override the default text filter to use
            // "startWith"
            text: (rows, id, filterValue) => {
                return rows.filter(row => {
                    const rowValue = row.values[id]
                    return rowValue !== undefined
                        ? String(rowValue)
                            .toLowerCase()
                            .startsWith(String(filterValue).toLowerCase())
                        : true
                })
            },
        }),
        []
    )

    const hiddenColumns = ["Id"];

    // Use the state and functions returned from useTable to build your UI
    const defaultColumn = React.useMemo(
        () => ({
            // Let's set up our default Filter UI
            minWidth: 30,
            width: 150,
            maxWidth: 400,
            Filter: DefaultColumnFilter
        }),
        []
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        rows,
    } = useTable(
        {
            columns,
            data,
            defaultColumn, // Be sure to pass the defaultColumn option
            initialState: {
                hiddenColumns: hiddenColumns,
                sortBy: [
                    {
                        id: 'addedDate',
                        desc: false
                    }
                ]
            },
            filterTypes,
            // use the skipPageReset option to disable page resetting temporarily
            autoResetPage: !skipPageReset,
            // updateMyData isn't part of the API, but
            // anything we put into these options will
            // automatically be available on the instance.
            // That way we can call this function from our
            // cell renderer!
            updateMyData
        },
        useFilters, // useFilters!
        useSortBy
    )

    // Render the UI for your table
    return (
        <>
            <table className='transaction-table' {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>
                                    {column.render('Header')}
                                    {/* Render the columns filter UI */}
                                    <div>{column.canFilter ? column.render('Filter') : null}</div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.length > 0 ? rows.map((row, i) => {
                        prepareRow(row)
                        var rowClassName =  row.original.new ? 'row row--new' : 'row'
                        var cellClassName = row.original.updated && !row.original.new ? 'cell cell--updated' : 'cell';
                        return (
                            <tr {...row.getRowProps()} className={rowClassName} onClick={() => {
                            }}>
                                {row.cells.map(cell => {
                                    return <td className={cellClassName} {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    }) :
                        <tr>
                            <td className='table-no-results' colSpan="15">No result found</td>
                        </tr>}
                </tbody>
            </table>
        </>
    )
}
