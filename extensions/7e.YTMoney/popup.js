const viewsInput = document.getElementById('views');
const contentType = document.getElementById('contentType');
const currency = document.getElementById('currency');
const rpmInput = document.getElementById('rpm');
const rpmRange = document.getElementById('rpmRange');
const currencyPrefix = document.getElementById('currencyPrefix');
const rpmValue = document.getElementById('rpmValue');
const rpmUnit = document.getElementById('rpmUnit');
const resultValue = document.getElementById('resultValue');
const resultBreakdown = document.getElementById('resultBreakdown');
const resultType = document.getElementById('resultType');
const perThousand = document.getElementById('perThousand');
const perMillion = document.getElementById('perMillion');

const currencySymbols = { USD: '$', INR: '₹', EUR: '€', GBP: '£' };
const defaultRpm = { long: 4, shorts: 0.08 };

function formatMoney(value) {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: currency.value,
    maximumFractionDigits: value < 1 ? 2 : 2
  }).format(Number.isFinite(value) ? value : 0);
}

function syncRpm(value) {
  const clean = Math.max(0, Number(value) || 0);
  rpmInput.value = clean;
  rpmRange.value = Math.min(Number(rpmRange.max), clean);
  const symbol = currencySymbols[currency.value];
  currencyPrefix.textContent = symbol;
  rpmValue.textContent = `${symbol}${clean.toFixed(2)}`;
  rpmUnit.textContent = `${currency.value} per 1,000 views`;
}

function calculate() {
  const views = Math.max(0, Number(viewsInput.value) || 0);
  const rpm = Math.max(0, Number(rpmInput.value) || 0);
  const earnings = (views / 1000) * rpm;
  resultValue.textContent = formatMoney(earnings);
  resultBreakdown.textContent = `${views.toLocaleString()} views × ${formatMoney(rpm)} RPM`;
  resultType.textContent = contentType.value === 'shorts' ? 'SHORTS' : 'LONG-FORM';
  perThousand.textContent = formatMoney(rpm);
  perMillion.textContent = formatMoney(rpm * 1000);
}

contentType.addEventListener('change', () => {
  const next = defaultRpm[contentType.value];
  syncRpm(next);
  calculate();
});
rpmInput.addEventListener('input', () => { syncRpm(rpmInput.value); calculate(); });
rpmRange.addEventListener('input', () => { syncRpm(rpmRange.value); calculate(); });
currency.addEventListener('change', () => { syncRpm(rpmInput.value); calculate(); });
viewsInput.addEventListener('input', calculate);
document.getElementById('calculator').addEventListener('submit', (event) => { event.preventDefault(); calculate(); });

syncRpm(rpmInput.value);
calculate();
