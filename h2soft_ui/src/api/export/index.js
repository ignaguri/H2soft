import zipcelx from 'zipcelx'
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
pdfMake.vfs = pdfFonts.pdfMake.vfs

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
  exportToPDF (data) {
    const { razonSocial, cuil, domicilio, fechaFirma, vigenciaDesde, vigenciaHasta, clausulas } = data
    const tablaDeProductos = [
      [
        {text: 'Producto', style: 'tableHeader'},
        {text: 'Cantidad desde', style: 'tableHeader'},
        {text: 'Cantidad hasta', style: 'tableHeader'},
        {text: 'Precio por unidad (en ARS$)', style: 'tableHeader'}
      ]
    ]
    clausulas.forEach(c => tablaDeProductos.push([c.producto, c.cantidadMinima, c.cantidadMaxima, c.precioPorUnidad]))
    const docDefinition = {
      info: {
        title: 'Exported from H2Soft app',
        author: 'H2Soft Team'
      },
      footer: () => {
        const today = new Date().toLocaleString('es-AR')
        return {text: `Impreso el ${today}`, alignment: 'right'}
      },
      content: [
        {
          text: 'Contrato con EcoAgua',
          style: 'header',
          alignment: 'center'
        },
        {
          text: 'El siguiente documento representa un resumen del acuerdo entre las partes. No tiene validez ni formato legal de contrato.',
          style: ['header', 'small'],
          alignment: 'center'
        },
        '\n\n\n',
        {
          text: [
            'Razón social del cliente: ',
            {text: razonSocial, style: 'data'},
            '\nCUIL: ',
            {text: cuil, style: 'data'},
            '\nDomicilio fiscal: ',
            {text: domicilio, style: 'data'}
          ],
          style: 'normal',
          alignment: 'left'
        },
        '\n\n\n',
        {
          text: [
            'Fecha de firma: ',
            {text: fechaFirma, style: 'data'},
            '\nVigente del:  ',
            {text: vigenciaDesde, style: 'data'},
            '  al:  ',
            {text: vigenciaHasta, style: 'data'}
          ],
          style: 'normal',
          alignment: 'left'
        },
        '\n\n\n',
        {text: 'Cláusulas', style: 'subheader', alignment: 'center'},
        {
          style: 'table',
          table: {
            headerRows: 1,
            widths: ['*', '*', '*', '*'],
            body: tablaDeProductos
          }
        }
      ],
      styles: {
        header: {
          fontSize: 24,
          bold: true,
          alignment: 'justify'
        },
        small: {
          fontSize: 8
        },
        normal: {
          fontSize: 18
        },
        data: {
          italics: true,
          bold: true,
          fontSize: 20
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5]
        },
        table: {
          margin: [0, 5, 0, 15]
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black'
        }
      }
    }
    pdfMake.createPdf(docDefinition).download(`Contrato_EcoAgua_${razonSocial}`)
  }
}

function toCellData (input) {
  if (typeof input === 'string') return {value: input, type: 'string'}

  if (typeof input === 'number') return {value: input, type: 'number'}

  if (input === null) return {value: input, type: 'string'}

  throw new Error(`Unsupported data type for value: ${input}`)
}
