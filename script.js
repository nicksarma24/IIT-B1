// Sample data
const data = [
    { id: 1, name: "Ammonium Persulfate", vendor: "LG Chem", density: "3525.92", viscosity: "60.631", packaging: "Bag", packSize: "100.00", unit: "kg", quantity: 6495.18 },
    { id: 2, name: "Caustic Potash", vendor: "Formosa", density: "3172.15", viscosity: "48.22", packaging: "Bag", packSize: "100.00", unit: "kg", quantity: 8751.90 },
    { id: 3, name: "dimethylaminopropylamino", vendor: "LG Chem", density: "8435.37", viscosity: "12.62", packaging: "Barrel", packSize: "75.00", unit: "L", quantity: 5964.61 },
    { id: 4, name: "Mono Ammonium Phosphate",vendor : "Sinopec", density: "1597.65", viscosity: "76.51", packaging: "Bag", packSize: "105.00", unit: "kg", quantity: 8183.73 },
    { id: 5, name: "Ferric Nitrate", vendor: "DowDuPont", density: "364.04", viscosity: "14.90", packaging: "Bag", packSize: "105.00", unit: "kg", quantity: 4154.33},
    { id: 6, name: "n-Pentane", vendor: "Sinopec", density: "4535.26", viscosity: "66.76", packaging: "N/A", packSize: "N/A", unit: "t", quantity: 6272.34 },
    { id: 7, name: "Glycol ether PM", vendor: "LG Chem", density: "6495.18", viscosity: "72.12", packaging: "Bag", packSize: "250.00", unit: "kg", quantity: 8749.54 },

    

    
];

// Populate table
function populateTable() {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';
    data.forEach((row, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${row.id}</td>
            <td>${row.name}</td>
            <td>${row.vendor}</td>
            <td>${row.density}</td>
            <td>${row.viscosity}</td>
            <td>${row.packaging}</td>
            <td>${row.packSize}</td>
            <td>${row.unit}</td>
            <td>${row.quantity}</td>
        `;
        tr.onclick = () => selectRow(index);
        tableBody.appendChild(tr);
    });
}

// Sort table by column
let sortAsc = true;
function sortTable(colIndex) {
    data.sort((a, b) => {
        const valA = Object.values(a)[colIndex];
        const valB = Object.values(b)[colIndex];
        return sortAsc ? (valA > valB ? 1 : -1) : (valA < valB ? 1 : -1);
    });
    sortAsc = !sortAsc;
    populateTable();
}

// Select a row
let selectedRowIndex = null;
function selectRow(index) {
    const rows = document.querySelectorAll('#chemicalTable tbody tr');
    rows.forEach((row, i) => {
        row.classList.remove('selected');
        if (i === index) {
            row.classList.add('selected');
            selectedRowIndex = index;
        }
    });
}

// Add new row
document.getElementById('addRow').onclick = () => {
    const newRow = { id: data.length + 1, name: 'New Chemical', vendor: 'New Vendor', density: '1.0', viscosity: '10', packaging: 'New', packSize: '100', unit: 'ml', quantity: 1 };
    data.push(newRow);
    populateTable();
};

// Move row up
document.getElementById('moveUp').onclick = () => {
    if (selectedRowIndex > 0) {
        const temp = data[selectedRowIndex - 1];
        data[selectedRowIndex - 1] = data[selectedRowIndex];
        data[selectedRowIndex] = temp;
        selectedRowIndex--;
        populateTable();
        selectRow(selectedRowIndex);
    }
};

// Move row down
document.getElementById('moveDown').onclick = () => {
    if (selectedRowIndex < data.length - 1) {
        const temp = data[selectedRowIndex + 1];
        data[selectedRowIndex + 1] = data[selectedRowIndex];
        data[selectedRowIndex] = temp;
        selectedRowIndex++;
        populateTable();
        selectRow(selectedRowIndex);
    }
};

// Delete row
document.getElementById('deleteRow').onclick = () => {
    if (selectedRowIndex !== null) {
        data.splice(selectedRowIndex, 1);
        populateTable();
        selectedRowIndex = null;
    }
};

// Refresh data
document.getElementById('refresh').onclick = () => {
    populateTable();
};

// Save data
document.getElementById('save').onclick = () => {
    alert('Data saved successfully!');
};

// Initial population
populateTable();
