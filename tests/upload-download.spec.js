const ExcelJS = require('exceljs');
const {test, expect} = require('@playwright/test');


async function writeExcelTest(searchText, filePath, change, replaceText)
{
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet =  workbook.getWorksheet('Sheet1');
    const output = readExcel(searchText, worksheet);

    const cell = worksheet.getCell(output.row + change.row, output.column + change.column);
    cell.value = replaceText;
    await workbook.xlsx.writeFile(filePath);

}

function readExcel(searchText, worksheet)
{
    let output = {row: -1, column: -1};

    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, columnNumber) => {
            if (searchText === cell.value)
            {
                output = {row: rowNumber, column: columnNumber};
            }
        });
    });

    return output;

}


test('Upload download excel validation', async ({ page }) => {
    const searchText = 'Mango';
    const updateValue = 350;
    await page.goto('https://rahulshettyacademy.com/upload-download-test/index.html');
 
    const download = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download' }).click();
    const dl = await download;
    const filePath = '/Users/sunnychahal/Downloads/download.xlsx';
    await dl.saveAs(filePath); 
    await writeExcelTest(searchText, filePath, {row: 0, column: 2}, updateValue);
    await page.locator('#fileinput').setInputFiles(filePath);

    const desiredRow = page.getByRole('row').filter({ hasText: searchText });
    await expect(desiredRow.getByRole('cell').nth(3)).toHaveText(String(updateValue));
});