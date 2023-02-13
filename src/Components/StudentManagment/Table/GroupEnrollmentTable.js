import React, { useState } from 'react'
import { useTable, usePagination, useExpanded } from 'react-table'

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

// Let's add a fetchData method to our Table component that will be used to fetch
// new data when pagination state changes
// We can also add a loading state to let our table know it's loading new data
export const GroupEnrollmentTable = ({
  columns,
  data,
  updateMyData,
  fetchData,
  loading,
  pageCount: controlledPageCount,
  renderRowSubComponent
}) => {

  const [showContextMenu, setShowContextMenu] = useState(false);

  const showContextMenuEvent = () => {
    setShowContextMenu(!showContextMenu);
  }

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageIndex,
    setPageSize,
    allColumns,
    getToggleHideAllColumnsProps,
    visibleColumns,
    // Get the state from the instance
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 }, // Pass our hoisted table state
      manualPagination: true, // Tell the usePagination
      // hook that we'll handle our own data fetching
      // This means we'll also have to provide our own
      // pageCount.
      pageCount: controlledPageCount,
      updateMyData
    },
    useExpanded,
    usePagination
  )

  // Listen for changes in pagination and use the state to fetch our new data
  React.useEffect(() => {
    fetchData({ pageIndex, pageSize })
  }, [fetchData, pageIndex, pageSize])

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
      <div className='' style={{ height: "25px", marginBottom: "10px" }}>
        <div className="table-setting-icon" onClick={() => showContextMenuEvent()}>
          <img src='/assets/images/settings-icon.png' />
        </div>
        <div className="table-setting-icon" onClick={(e) => exportToCsv(e)}>
          <img src='/assets/images/download-icon.png' alt='Export' />
        </div>
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
      </div>
      <table className='transaction-table' {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <React.Fragment>
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  })}
                </tr>
                {row.isExpanded ? (
                  <tr>
                    <td colSpan={visibleColumns.length}>
                      {renderRowSubComponent({ row })}
                    </td>
                  </tr>
                ) : null}
              </React.Fragment>
            )
          })}
          <tr>
            {loading ? (
              // Use our custom loading state to show a loading indicator
              <td colSpan="10000">Loading...</td>
            ) : (
              <td colSpan="10000">
                Showing {page.length} of ~{controlledPageCount * pageSize}{' '}
                results
              </td>
            )}
          </tr>
        </tbody>
      </table>
      {/* 
          Pagination can be built however you'd like. 
          This is just a very basic UI implementation:
        */}
      <div className="pagination">
        <button className='btn--pagination' onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button className='btn--pagination' onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button className='btn--pagination' onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button className='btn--pagination' onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
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
            value={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
            className='editable-input--cell'
          />
        </span>{' '}
        <select
          value={pageSize}
          style={{ width: '150px' }}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
          className='editable-input--cell'
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  )
}