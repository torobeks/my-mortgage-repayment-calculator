function clearForm() {
  document.getElementById('amount').value = '';
  document.getElementById('years').value = '';
  document.getElementById('rate').value = '';
  document.querySelector('input[name="type"][value="repayment"]').checked = true;
  
  document.getElementById('results').style.display = 'none';
  document.getElementById('no-result').style.display = 'block';
}

function calculate() {
  const amount = Number(document.getElementById('amount').value);
  const years  = Number(document.getElementById('years').value);
  const rate   = Number(document.getElementById('rate').value);
  const type   = document.querySelector('input[name="type"]:checked').value;

  if (!amount || amount <= 0 || !years || years <= 0 || !rate || rate < 0) {
    alert('Please enter valid positive numbers in all fields.');
    return;
  }

  const monthlyRate = rate / 100 / 12;
  const months = years * 12;

  let monthlyPayment = 0;
  let totalPayment = 0;

  if (type === 'repayment') {
    if (monthlyRate === 0) {
      monthlyPayment = amount / months;
    } else {
      const power = Math.pow(1 + monthlyRate, months);
      monthlyPayment = amount * (monthlyRate * power) / (power - 1);
    }
    totalPayment = monthlyPayment * months;
  } else {
    // Interest Only
    monthlyPayment = (amount * (rate / 100)) / 12;
    totalPayment = amount + (monthlyPayment * months);
  }

  // Format with commas
  document.getElementById('monthly').textContent = 
    '$' + monthlyPayment.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
  document.getElementById('total').textContent = 
    '$' + totalPayment.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  document.getElementById('no-result').style.display = 'none';
  document.getElementById('results').style.display = 'block';
}