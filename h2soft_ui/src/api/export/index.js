import zipcelx from 'zipcelx'

export default {
  /*
  * exportToExcel function
  * @title: the first line in the Excel file AND the filename
  * @columns: [required] the columns that will go on the 1st row.
  *   - type: Array
  *   - example: ['Date', 'Action', 'User']
   * @rows: [required] each of the rows that will be included.
   * The order of the objects it's supposed to match the @columns
   *   - type: Array of arrays
   *   - example: [['02/05/2018', 'Logged in', 'admin'], ['03/05/2018', 'Logged in', 'john']]
   * @endRow: [optional] a final row. Useful for totals.
   * 'null' values can be used to skip columns for formatting
   *   - type: Array
   *   - example: ['Total', null, null, 7400]
   */
  exportToExcel (title = 'exported-data', columns = [], rows = [], endRow = []) {
    if (!columns.length || !rows.length) throw new Error('Missing column\'s or row\'s data')
    // if (!columns.every(c => typeof c === 'string')) throw new Error('Column\'s names must be of string type') -> overhead, toCellData alredy checks type
    const output = [[toCellData(title)], columns.map(toCellData)]
    rows.forEach(r => output.push(r.map(c => toCellData(c))))
    if (endRow.length) output.push(endRow.map(toCellData))
    const config = {
      filename: title,
      sheet: {
        data: output
      }
    }
    zipcelx(config)
  },
  exportToPDF () {
    // not implemented yet
  }
}

function toCellData (input) {
  if (typeof input === 'string') return {value: input, type: 'string'}

  if (typeof input === 'number') return {value: input, type: 'number'}

  if (input === null) return {value: input, type: 'string'}

  throw new Error(`Unsupported data type for value: ${input}`)
}
