import React from 'react';
import { Car, Fuel, MapPin, Calendar, User, Gauge, AlertCircle } from 'lucide-react';
import { DEPRECIATION_RATE, formatCurrency } from '../utils/calculateCost';

export default function FormCard({ formData, errors, onChange, onSubmit, isCalculating }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  return (
    <div className="card p-6 sm:p-8 animate-fade-in-up">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-aarj-green/10 rounded-lg"><MapPin className="w-5 h-5 text-aarj-green" /></div>
        <h2 className="font-heading text-lg font-bold text-aarj-text">Dados do Translado</h2>
      </div>

      <form onSubmit={onSubmit} className="space-y-5">
        <div>
          <label htmlFor="name" className="label"><span className="flex items-center gap-2"><User className="w-4 h-4 text-aarj-text-light" />Nome do Responsável</span></label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Seu nome completo" className={`input-field ${errors.name ? 'input-field-error' : ''}`} />
          {errors.name && <p className="mt-1 text-sm text-aarj-error flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="vehicle" className="label"><span className="flex items-center gap-2"><Car className="w-4 h-4 text-aarj-text-light" />Veículo</span></label>
          <select id="vehicle" name="vehicle" value={formData.vehicle} onChange={handleChange} className={`input-field cursor-pointer ${errors.vehicle ? 'input-field-error' : ''}`}>
            <option value="">Selecione o veículo</option>
            <option value="carro-pequeno">Carro Pequeno (10 km/L)</option>
            <option value="carro-medio">Carro Médio (12 km/L)</option>
            <option value="carro-grande">Carro Grande (8 km/L)</option>
            <option value="motocicleta">Motocicleta (30 km/L)</option>
            <option value="van">Van (7 km/L)</option>
            <option value="caminhonete">Caminhonete (10 km/L)</option>
          </select>
          {errors.vehicle && <p className="mt-1 text-sm text-aarj-error flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.vehicle}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="consumption" className="label"><span className="flex items-center gap-2"><Gauge className="w-4 h-4 text-aarj-text-light" />Consumo (km/L)</span></label>
            <input type="number" id="consumption" name="consumption" value={formData.consumption} onChange={handleChange} step="0.1" min="0.1" placeholder="Ex: 12" className={`input-field ${errors.consumption ? 'input-field-error' : ''}`} />
            {errors.consumption && <p className="mt-1 text-sm text-aarj-error flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.consumption}</p>}
          </div>
          <div>
            <label htmlFor="distance" className="label"><span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-aarj-text-light" />Distância (km)</span></label>
            <input type="number" id="distance" name="distance" value={formData.distance} onChange={handleChange} step="0.1" min="0.1" placeholder="Ex: 150" className={`input-field ${errors.distance ? 'input-field-error' : ''}`} />
            {errors.distance && <p className="mt-1 text-sm text-aarj-error flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.distance}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="fuelPrice" className="label"><span className="flex items-center gap-2"><Fuel className="w-4 h-4 text-aarj-text-light" />Preço Combustível (R$)</span></label>
            <input type="number" id="fuelPrice" name="fuelPrice" value={formData.fuelPrice} onChange={handleChange} step="0.01" min="0.01" placeholder="Ex: 5.50" className={`input-field ${errors.fuelPrice ? 'input-field-error' : ''}`} />
            {errors.fuelPrice && <p className="mt-1 text-sm text-aarj-error flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.fuelPrice}</p>}
          </div>
          <div>
            <label htmlFor="date" className="label"><span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-aarj-text-light" />Data do Encontro</span></label>
            <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} className={`input-field cursor-pointer ${errors.date ? 'input-field-error' : ''}`} />
            {errors.date && <p className="mt-1 text-sm text-aarj-error flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.date}</p>}
          </div>
        </div>

        <div className="bg-aarj-cream rounded-lg p-4 border-l-4 border-aarj-gold">
          <p className="text-sm text-aarj-text-light"><span className="font-semibold text-aarj-text">Taxa de Depreciação:</span> {formatCurrency(DEPRECIATION_RATE)} por km (valor fixo)</p>
        </div>

        <button type="submit" disabled={isCalculating} className="btn-primary flex items-center justify-center gap-2 mt-6">
          {isCalculating ? (
            <><svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg><span>Calculando...</span></>
          ) : (
            <><MapPin className="w-5 h-5" /><span>Calcular Custo</span></>
          )}
        </button>
      </form>
    </div>
  );
}
