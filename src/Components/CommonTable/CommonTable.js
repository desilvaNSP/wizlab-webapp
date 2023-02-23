import React, { useState } from 'react'
import { useTable, usePagination, useGlobalFilter, useRowSelect, useFilters } from 'react-table'
import { DefaultColumnFilter, GlobalFilter } from '../Custom/Filters'
import { matchSorter } from 'match-sorter'

const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
        const defaultRef = React.useRef()
        const resolvedRef = ref || defaultRef

        React.useEffect(() => {
            resolvedRef.current.indeterminate = indeterminate
        }, [resolvedRef, indeterminate])

        return (
            <>
                <input className='custom-checkbox' type="checkbox" ref={resolvedRef} {...rest} />
            </>
        )
    }
)

export const CommonTable = ({ columns, data, onRowSelect, hiddenColumns, rowSelection = false, pagination = true, settings = true, globalsearch = true, downloadcsv = true }) => {

    const [showContextMenu, setShowContextMenu] = useState(false);

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

    // Use the state and functions returned from useTable to build your UI
    const defaultColumn = React.useMemo(
        () => ({
            // Let's set up our default Filter UI
            minWidth: 30,
            width: 150,
            maxWidth: 400,
            Filter: DefaultColumnFilter,
        }),
        []
    )

    const showContextMenuEvent = () => {
        setShowContextMenu(!showContextMenu);
    }

    const initialState = {
        hiddenColumns: hiddenColumns,
        pageSize: 1000
    };

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        rows,
        page, // Instead of using 'rows', we'll use page,
        // which has only the rows for the active page

        // The rest of these things are super handy, too ;)
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        selectedFlatRows,
        allColumns,
        state,
        getToggleHideAllColumnsProps,
        toggleAllRowsSelected,
        setGlobalFilter,
        preGlobalFilteredRows,
        state: { pageIndex, pageSize, selectedRowIds },
    } = useTable(
        {
            columns,
            data,
            defaultColumn, // Be sure to pass the defaultColumn option
            initialState,
            filterTypes
        },
        useFilters, // useFilters!
        useGlobalFilter, // useGlobalFilter!
        usePagination,
        useRowSelect,
        hooks => {
            hooks.visibleColumns.push(columns => [
                // Let's make a column for selection
                {
                    id: 'selection',
                    // The header can use the table's getToggleAllRowsSelectedProps method
                    // to render a checkbox
                    Header: ({ getToggleAllPageRowsSelectedProps }) => (
                        <div>
                        </div>
                    ),
                    // The cell can use the individual row's getToggleRowSelectedProps method
                    // to the render a checkbox
                    Cell: ({ row }) => (
                        <div>
                            <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                        </div>
                    ),
                },
                ...columns,
            ])
        }
    )

    React.useEffect(() => {
        if (rowSelection) {
            onRowSelect(selectedFlatRows);
        }
    }, [selectedFlatRows]);

    const downloadFile = ({ data, fileName, fileType }) => {
        const blob = new Blob([data], { type: fileType })

        const a = document.createElement('a')
        a.download = fileName
        a.href = window.URL.createObjectURL(blob)
        const clickEvt = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true,
        })
        a.dispatchEvent(clickEvt)
        a.remove()
    }

    const exportToCsv = e => {
        e.preventDefault()

        // Headers for each column
        let arrayOfheaders = allColumns.map((value) => {
            if (value.isVisible && value.id != 'selection') {
                return value.id
            }
        }).filter((value) => {
            return value != undefined
        })

        let headers = [arrayOfheaders.join(',')];

        // Convert users data to a csv
        let usersCsv = rows.reduce((acc, row) => {
            var rowLineElements = [];
            arrayOfheaders.forEach(element => {
                rowLineElements.push(row.values[element])
            });
            acc.push(rowLineElements.join(','))
            return acc
        }, [])

        downloadFile({
            data: [...headers, ...usersCsv].join('\n'),
            fileName: 'transactions-report.csv',
            fileType: 'text/csv',
        })
    }

    // Render the UI for your table
    return (
        <>
            {settings && <div className="table-setting-icon" onClick={() => showContextMenuEvent()}>
                <img src='assets/images/settings-icon.png' />
            </div>
            }            {downloadcsv &&
                <div className="table-setting-icon" onClick={(e) => exportToCsv(e)}>
                    <img src='assets/images/download-icon.png' alt='Export' />
                </div>}

            {showContextMenu && <div className='column-hiding-contextmenu'>
                <div>
                    <IndeterminateCheckbox {...getToggleHideAllColumnsProps()} /> Toggle
                    All
                </div>
                {allColumns.map(column => (
                    <div key={column.id}>
                        <label>
                            <input type="checkbox" {...column.getToggleHiddenProps()} />{' '}
                            {column.id}
                        </label>
                    </div>
                ))}
                <br />
            </div>
            }

            {/* global search implementation */
                globalsearch && <GlobalFilter
                    preGlobalFilteredRows={preGlobalFilteredRows}
                    globalFilter={state.globalFilter}
                    setGlobalFilter={setGlobalFilter}
                />
            }
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
                    {page.length > 0 ? page.map((row, i) => {
                        prepareRow(row)
                        var className = row.isSelected ? 'row row--highlighted' : 'row';
                        return (
                            <tr {...row.getRowProps()} className={className} onClick={() => {
                                // This below two line change for enable one row selection for the entire table
                                toggleAllRowsSelected(false)
                                if (row.isSelected) {
                                    row.toggleRowSelected(false)
                                } else {
                                    row.toggleRowSelected(true)
                                }
                            }}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    }) :
                        <tr>
                            <td className='table-no-results' colSpan="15">No results found</td>
                        </tr>}
                </tbody>
            </table>
            {/* 
          Pagination can be built however you'd like. 
          This is just a very basic UI implementation:
        */}
            {
                pagination &&
                <div className="pagination">
                    <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                        {'<<'}
                    </button>{' '}
                    <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                        {'<'}
                    </button>{' '}
                    <button onClick={() => nextPage()} disabled={!canNextPage}>
                        {'>'}
                    </button>{' '}
                    <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                        {'>>'}
                    </button>{' '}
                    <span>
                        Page{' '}
                        <strong>
                            {pageIndex + 1} of {pageOptions.length}
                        </strong>{' '}
                    </span>
                    <span>
                        | Go to page:{' '}
                        <input
                            type="number"
                            defaultValue={pageIndex + 1}
                            onChange={e => {
                                const page = e.target.value ? Number(e.target.value) - 1 : 0
                                gotoPage(page)
                            }}
                            style={{ width: '100px' }}
                        />
                    </span>{' '}
                    <select
                        value={pageSize}
                        onChange={e => {
                            setPageSize(Number(e.target.value))
                        }}
                    >
                        {[10, 20, 30, 40, 50].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </select>
                </div>
            }
        </>
    )
}
