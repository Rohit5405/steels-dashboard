const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTQ6kX1mngT46Apl8xolwlaBAiXrrnmQmXyu8wQqOSmjynpApHsaOpPsvUGxBgok9aRZEcbMmWzgE5d/pub?output=csv";

function parseCSV(text) {
    const rows = [];
    let row = [];
    let current = '';
    let insideQuotes = false;

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const next = text[i + 1];

        if (char === '"' && insideQuotes && next === '"') {
            current += '"';
            i++;
        } 
        else if (char === '"') {
            insideQuotes = !insideQuotes;
        } 
        else if (char === ',' && !insideQuotes) {
            row.push(current);
            current = '';
        } 
        else if ((char === '\n' || char === '\r') && !insideQuotes) {
            if (current !== '') {
                row.push(current);
                rows.push(row);
                row = [];
                current = '';
            }
        } 
        else {
            current += char;
        }
    }

    if (current !== '') {
        row.push(current);
        rows.push(row);
    }

    return rows;
}

fetch(sheetURL)
.then(res => res.text())
.then(data => {

    const rows = parseCSV(data.trim());
    const table = document.getElementById("sheetTable");
    table.innerHTML = "";

    rows.forEach((row, index) => {
        const tr = document.createElement("tr");

        row.forEach(cell => {
            const element = document.createElement(index === 0 ? "th" : "td");
            element.textContent = cell;
            tr.appendChild(element);
        });

        table.appendChild(tr);
    });

})
.catch(() => {
    document.getElementById("sheetTable").innerHTML =
        "<tr><td style='padding:40px;text-align:center;color:red;'>Error Loading Sheet</td></tr>";
});
