import React from 'react';
import { Receipt, User, Car, MapPin, Fuel, ArrowLeft, FileText, RotateCcw } from 'lucide-react';
import { formatCurrency, formatDate } from '../utils/calculateCost';
import { getVehicleById } from '../data/vehicles';

export default function DashboardCard({ data, onBack, onNewCalculation, onGeneratePDF, isGeneratingPDF }) {
  const vehicle = getVehicleById(data.vehicle);

  return (
    <div className="space-y-4 animate-fade-in-up">
      <div id="pdf-content" className="card p-6 sm:p-8 bg-gradient-to-br from-aarj-cream to-white border-l-4 border-aarj-blue">
        <div className="flex items-center gap-2 mb-6">
          <div className="p-2 bg-aarj-blue/10 rounded-lg"><Receipt className="w-5 h-5 text-aarj-blue" /></div>
          <h2 className="font-heading text-lg font-bold text-aarj-text">Resultado do Cálculo</h2>
        </div>

        <div className="text-center py-6 mb-6 bg-white rounded-xl shadow-sm">
          <p className="text-sm text-aarj-text-light mb-1">Custo Total do Translado</p>
          <p className="text-4xl sm:text-5xl font-heading font-extrabold text-aarj-gold">{formatCurrency(data.result.totalCost)}</p>
        </div>

        <div className="space-y-3">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="text-sm font-semibold text-aarj-text mb-3 flex items-center gap-2"><User className="w-4 h-4 text-aarj-text-light" />Informações</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              <div className="flex justify-between"><span className="text-aarj-text-light">Responsável:</span><span className="font-medium text-aarj-text">{data.name}</span></div>
              <div className="flex justify-between"><span className="text-aarj-text-light">Data:</span><span className="font-medium text-aarj-text">{formatDate(data.date)}</span></div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="text-sm font-semibold text-aarj-text mb-3 flex items-center gap-2"><Car className="w-4 h-4 text-aarj-text-light" />Veículo e Percurso</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              <div className="flex justify-between"><span className="text-aarj-text-light">Veículo:</span><span className="font-medium text-aarj-text">{vehicle?.name || 'Não informado'}</span></div>
              <div className="flex justify-between"><span className="text-aarj-text-light">Distância:</span><span className="font-medium text-aarj-text">{data.result.distance} km</span></div>
              <div className="flex justify-between"><span className="text-aarj-text-light">Consumo:</span><span className="font-medium text-aarj-text">{data.result.consumption} km/L</span></div>
              <div className="flex justify-between"><span className="text-aarj-text-light">Combustível:</span><span className="font-medium text-aarj-text">{formatCurrency(data.result.fuelPrice)}/L</span></div>
            </div>
          </div>

          <div className="bg-aarj-cream/50 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-aarj-text mb-3 flex items-center gap-2"><MapPin className="w-4 h-4 text-aarj-text-light" />Detalhamento de Custos</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="flex items-center gap-2 text-aarj-text-light"><Fuel className="w-4 h-4" />Combustível ({data.result.distance}km ÷ {data.result.consumption}L = {data.result.fuelNeeded}L)</span>
                <span className="font-medium text-aarj-text">{formatCurrency(data.result.fuelCost)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="flex items-center gap-2 text-aarj-text-light"><Car className="w-4 h-4" />Depreciação ({data.result.distance}km × {formatCurrency(data.result.depreciationRate)})</span>
                <span className="font-medium text-aarj-text">{formatCurrency(data.result.depreciationCost)}</span>
              </div>
              <div className="border-t border-gray-200 pt-2 mt-2">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-aarj-text">Total</span>
                  <span className="font-bold text-lg text-aarj-gold">{formatCurrency(data.result.totalCost)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100 text-center">
          <p className="text-xs text-aarj-text-light">AARJ - Articulação Agroecológica do Rio de Janeiro</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button onClick={onBack} className="btn-secondary flex items-center justify-center gap-2"><ArrowLeft className="w-5 h-5" /><span>Voltar</span></button>
        <button onClick={onGeneratePDF} disabled={isGeneratingPDF} className="btn-primary flex items-center justify-center gap-2">
          {isGeneratingPDF ? (
            <><svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg><span>Gerando PDF...</span></>
          ) : (
            <><FileText className="w-5 h-5" /><span>Gerar PDF</span></>
          )}
        </button>
      </div>

      <div>
        <button onClick={onNewCalculation} className="w-full py-3 text-aarj-text-light hover:text-aarj-text transition-colors duration-200 flex items-center justify-center gap-2">
          <RotateCcw className="w-4 h-4" /><span>Realizar novo cálculo</span>
        </button>
      </div>
    </div>  
  );
}
