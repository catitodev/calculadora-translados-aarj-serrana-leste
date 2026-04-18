export const VEHICLES = [
  { id: 'carro-pequeno', name: 'Carro Pequeno', consumption: 10 },
  { id: 'carro-medio', name: 'Carro Médio', consumption: 12 },
  { id: 'carro-grande', name: 'Carro Grande', consumption: 8 },
  { id: 'motocicleta', name: 'Motocicleta', consumption: 30 },
  { id: 'van', name: 'Van', consumption: 7 },
  { id: 'caminhonete', name: 'Caminhonete', consumption: 10 },
];

export function getVehicleById(id) {
  return VEHICLES.find(v => v.id === id) || null;
}
