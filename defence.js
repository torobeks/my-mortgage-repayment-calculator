function calculateMortgage() {
    let amount = document.getElementById("amount").value;
    let rate = document.getElementById("rate").value;
    let years = document.getElementById("years").value;

    amount = Number(amount);
    annualRate = Number(rate);
    years = Number(years);

    if (amount <= 0 || rate < 0 || years <= 0) {
        document.getElementById("result").innerHTML =
        '<p style="color: #e11d48; font-weight: 500;">Please enter valid positive numbers.</p>';
        return;
    }

    let monthlyRate = rate / 100 / 12;
    let months = years * 12;
    let payment;

    if (monthlyRate === 0) {
        payment = amount / months;
    } else{
        let temp = Math.pow(1 + monthlyRate, months);
        payment = amount * (monthlyRate * temp) / (temp - 1);
    }

    document.getElementById("result").innerHTML = 
    "Monthly Payment: $" + payment.toFixed(2);
}