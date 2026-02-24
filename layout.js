const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTQ6kX1mngT46Apl8xolwlaBAiXrrnmQmXyu8wQqOSmjynpApHsaOpPsvUGxBgok9aRZEcbMmWzgE5d/pub?output=csv";

fetch(sheetURL)
.then(response => response.text())
.then(csv => {

    const rows = csv.split("\n").map(row =>
        row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
    );

    const table = document.getElementById("sheetTable");
    table.innerHTML = "";

    rows.forEach((row, index) => {
        const tr = document.createElement("tr");

        row.forEach(cell => {
            const cleanCell = cell.replace(/^"|"$/g, "");
            const element = document.createElement(index === 0 ? "th" : "td");
            element.textContent = cleanCell;
            tr.appendChild(element);
        });

        table.appendChild(tr);
    });

})
.catch(() => {
    document.getElementById("sheetTable").innerHTML =
        "<tr><td style='padding:40px;text-align:center;color:red;'>Sheet Load Error</td></tr>";
});
