const ExcelJs = require("exceljs");

const saveExcel = (Data) => {
    const workBook = new ExcelJs.Workbook();
    const filename = "prueba.xlsx";
    const sheet = workBook.addWorkSheet('Asistencia'); //nombre de la pagina
    const columnas = [
        {header:'Nombre', key: 'name'}
    ];

    sheet.columns = columnas;

    sheet.addRows(Data);

    workBook.xlsx.writeFile(filename).then(function (e){

    });

}