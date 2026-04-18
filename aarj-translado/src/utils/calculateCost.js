export const DEPRECIATION_RATE = 1.0;

export function calculateCost({ distance, consumption, fuelPrice }) {
  const sanitizedDistance = Math.max(0, parseFloat(distance) || 0);
  const sanitizedConsumption = Math.max(0.1, parseFloat(consumption) || 0.1);
  const sanitizedFuelPrice = Math.max(0, parseFloat(fuelPrice) || 0);

  const fuelNeeded = sanitizedDistance / sanitizedConsumption;
  const fuelCost = fuelNeeded * sanitizedFuelPrice;
  const depreciationCost = sanitizedDistance * DEPRECIATION_RATE;
  const totalCost = fuelCost + depreciationCost;

  return {
    distance: sanitizedDistance,
    consumption: sanitizedConsumption,
    fuelPrice: sanitizedFuelPrice,
    fuelNeeded: Math.round(fuelNeeded * 100) / 100,
    fuelCost: Math.round(fuelCost * 100) / 100,
    depreciationCost: Math.round(depreciationCost * 100) / 100,
    totalCost: Math.round(totalCost * 100) / 100,
    depreciationRate: DEPRECIATION_RATE,
  };
}

export function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

export function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString + 'T00:00:00');
  return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }).format(date);
}
