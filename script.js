// Constants for scaling factors
const STUDENTS_PER_AWS_INSTANCE = 2000;
const STUDENTS_PER_ENGINEERING_HOUR = 125;
const STUDENTS_PER_SALES_HOUR = 250;
const STUDENTS_PER_LEGAL_HOUR = 500;

// Function to update all values and calculate results
function updateAllValues() {
    const students = parseInt(document.getElementById('students').value) || 0;
    const tokens = parseInt(document.getElementById('tokens').value) || 0;
    
    // Update input values based on number of students only if they haven't been manually changed
    if (document.getElementById('awsInstances').dataset.manuallyChanged !== 'true') {
        document.getElementById('awsInstances').value = Math.max(1, Math.ceil(students / STUDENTS_PER_AWS_INSTANCE));
    }
    if (document.getElementById('engineeringHours').dataset.manuallyChanged !== 'true') {
        document.getElementById('engineeringHours').value = Math.max(40, Math.ceil(students / STUDENTS_PER_ENGINEERING_HOUR));
    }
    if (document.getElementById('salesHours').dataset.manuallyChanged !== 'true') {
        document.getElementById('salesHours').value = Math.max(20, Math.ceil(students / STUDENTS_PER_SALES_HOUR));
    }
    if (document.getElementById('legalHours').dataset.manuallyChanged !== 'true') {
        document.getElementById('legalHours').value = Math.max(10, Math.ceil(students / STUDENTS_PER_LEGAL_HOUR));
    }

    // Get updated input values
    const awsInstances = parseInt(document.getElementById('awsInstances').value);
    const engineeringHours = parseInt(document.getElementById('engineeringHours').value);
    const salesHours = parseInt(document.getElementById('salesHours').value);
    const legalHours = parseInt(document.getElementById('legalHours').value);

    const openAICost = parseFloat(document.getElementById('openAICost').value);
    const awsCostPerInstance = parseFloat(document.getElementById('awsCostPerInstance').value);
    const engineeringCostPerHour = parseFloat(document.getElementById('engineeringCostPerHour').value);
    const salesCostPerHour = parseFloat(document.getElementById('salesCostPerHour').value);
    const legalCostPerHour = parseFloat(document.getElementById('legalCostPerHour').value);

    // Calculate costs
    const openaiCost = (tokens / 1000) * openAICost * students; // $0.03 per 1,000 tokens
    const awsCost = awsInstances * awsCostPerInstance; // Assuming $200 per instance
    const engineeringCost = engineeringHours * engineeringCostPerHour; // $25/hour
    const salesCost = salesHours * salesCostPerHour; // $25/hour
    const legalCost = legalHours * legalCostPerHour; // $100/hour

    // Calculate total cost
    const totalCost = openaiCost + awsCost + engineeringCost + salesCost + legalCost;

    // Calculate revenue based on pricing tiers
    let revenue;
    if (students <= 1000) {
        revenue = students * 25;
    } else if (students <= 2500) {
        revenue = students * 22;
    } else if (students <= 5000) {
        revenue = students * 20;
    } else if (students <= 10000) {
        revenue = students * 18;
    } else {
        revenue = students * 15;
    }

    // Calculate profit margin
    const profit = revenue - totalCost;
    const profitMargin = (revenue > 0) ? (profit / revenue) * 100 : 0;

    // Display results
    document.getElementById('costOutput').textContent = `$${totalCost.toFixed(2)}`;
    document.getElementById('revenueOutput').textContent = `$${revenue.toFixed(2)}`;
    document.getElementById('profitMarginOutput').textContent = `${profitMargin.toFixed(2)}%`;
}

// Add event listeners to all input fields
const allInputFields = ['students', 'tokens', 'awsInstances', 'engineeringHours', 'salesHours', 'legalHours', 'openAICost', 'awsCostPerInstance', 'engineeringCostPerHour', 'salesCostPerHour', 'legalCostPerHour'];
allInputFields.forEach(fieldId => {
    document.getElementById(fieldId).addEventListener('input', updateAllValues);
});

// Add event listeners to mark fields as manually changed
['awsInstances', 'engineeringHours', 'salesHours', 'legalHours'].forEach(fieldId => {
    const field = document.getElementById(fieldId);
    field.addEventListener('input', function() {
        this.dataset.manuallyChanged = 'true';
    });
});

// Add event listener to reset manual changes when number of students changes
document.getElementById('students').addEventListener('input', function() {
    ['awsInstances', 'engineeringHours', 'salesHours', 'legalHours'].forEach(fieldId => {
        const field = document.getElementById(fieldId);
        field.dataset.manuallyChanged = 'false';
    });
    updateAllValues();
});

// Call updateAllValues initially to set default values
updateAllValues();

// Toggle settings panel
const toggleBtn = document.getElementById('toggleSettings');
const settingsPanel = document.getElementById('settingsPanel');
const container = document.querySelector('.container');

toggleBtn.addEventListener('click', () => {
    settingsPanel.classList.toggle('open');
    container.classList.toggle('shifted');
});

// Add event listeners to cost setting inputs
['students', 'tokens', 'awsInstances', 'engineeringHours', 'salesHours', 'legalHours', 'openAICost', 'awsCostPerInstance', 'engineeringCostPerHour', 'salesCostPerHour', 'legalCostPerHour'].forEach(fieldId => {
    document.getElementById(fieldId).addEventListener('input', updateAllValues);
});