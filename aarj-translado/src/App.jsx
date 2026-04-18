import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import FormCard from './components/FormCard';
import DashboardCard from './components/DashboardCard';
import { calculateCost } from './utils/calculateCost';
import { getVehicleById } from './data/vehicles';
import { generatePDF } from './utils/pdfGenerator';
import { AlertCircle, CheckCircle } from 'lucide-react';

const initialFormState = { name: '', vehicle: '', consumption: '', distance: '', fuelPrice: '', date: '' };
const initialErrors = { name: '', vehicle: '', consumption: '', distance: '', fuelPrice: '', date: '' };

function App() {
  const [view, setView] = useState('form');
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState(initialErrors);
  const [resultData, setResultData] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [notification, setNotification] = useState(null);

  const showNotification = useCallback((message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  }, []);

  const handleFieldChange = useCallback((name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    if (name === 'vehicle' && value) {
      const vehicle = getVehicleById(value);
      if (vehicle) setFormData(prev => ({ ...prev, vehicle: value, consumption: vehicle.consumption.toString() }));
    }
  }, [errors]);

  const validateForm = useCallback(() => {
    const newErrors = {};
    let isValid = true;
    if (!formData.name.trim()) { newErrors.name = 'Nome é obrigatório'; isValid = false; }
    else if (formData.name.trim().length < 2) { newErrors.name = 'Nome deve ter pelo menos 2 caracteres'; isValid = false; }
    if (!formData.vehicle) { newErrors.vehicle = 'Selecione um veículo'; isValid = false; }
    if (!formData.consumption) { newErrors.consumption = 'Consumo é obrigatório'; isValid = false; }
    else if (parseFloat(formData.consumption) <= 0) { newErrors.consumption = 'Consumo deve ser maior que zero'; isValid = false; }
    if (!formData.distance) { newErrors.distance = 'Distância é obrigatória'; isValid = false; }
    else if (parseFloat(formData.distance) <= 0) { newErrors.distance = 'Distância deve ser maior que zero'; isValid = false; }
    if (!formData.fuelPrice) { newErrors.fuelPrice = 'Preço do combustível é obrigatório'; isValid = false; }
    else if (parseFloat(formData.fuelPrice) <= 0) { newErrors.fuelPrice = 'Preço deve ser maior que zero'; isValid = false; }
    if (!formData.date) { newErrors.date = 'Data do encontro é obrigatória'; isValid = false; }
    setErrors(newErrors);
    return isValid;
  }, [formData]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (!validateForm()) { showNotification('Por favor, preencha todos os campos corretamente', 'error'); return; }
    setIsCalculating(true);
    setTimeout(() => {
      const result = calculateCost({ distance: formData.distance, consumption: formData.consumption, fuelPrice: formData.fuelPrice });
      setResultData({ name: formData.name.trim(), vehicle: formData.vehicle, date: formData.date, result });
      setView('dashboard');
      setIsCalculating(false);
      showNotification('Cálculo realizado com sucesso!', 'success');
    }, 500);
  }, [formData, validateForm, showNotification]);

  const handleBack = useCallback(() => setView('form'), []);
  const handleNewCalculation = useCallback(() => { setFormData(initialFormState); setErrors(initialErrors); setResultData(null); setView('form'); }, []);

  const handleGeneratePDF = useCallback(async () => {
    if (!resultData) return;
    setIsGeneratingPDF(true);
    try { await generatePDF(resultData); showNotification('PDF gerado com sucesso!', 'success'); }
    catch (error) { showNotification('Erro ao gerar PDF. Tente novamente.', 'error'); }
    finally { setIsGeneratingPDF(false); }
  }, [resultData, showNotification]);

  return (
    <div className="min-h-screen flex flex-col bg-aarj-cream">
      <Header />
      <main className="flex-1 py-6 sm:py-10 px-4">
        <div className="max-w-xl mx-auto">
          {view === 'form' ? (
            <FormCard formData={formData} errors={errors} onChange={handleFieldChange} onSubmit={handleSubmit} isCalculating={isCalculating} />
          ) : (
            <DashboardCard data={resultData} onBack={handleBack} onNewCalculation={handleNewCalculation} onGeneratePDF={handleGeneratePDF} isGeneratingPDF={isGeneratingPDF} />
          )}
        </div>
      </main>
      <Footer />
      {notification && (
        <div className={`fixed bottom-4 left-1/2 -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50 animate-fade-in-up ${notification.type === 'error' ? 'bg-aarj-error text-white' : 'bg-aarj-success text-white'}`}>
          {notification.type === 'error' ? <AlertCircle className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
          <span className="font-medium">{notification.message}</span>
        </div>
      )}
    </div>
  );
}

export default App;
