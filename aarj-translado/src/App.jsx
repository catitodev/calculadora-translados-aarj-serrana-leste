import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import FormCard from './components/FormCard';
import DashboardCard from './components/DashboardCard';
import Auth from './components/Auth';
import { calculateCost } from './utils/calculateCost';
import { getVehicleById } from './data/vehicles';
import { generatePDF } from './utils/pdfGenerator';
import { supabase } from './utils/supabase';
import { AlertCircle, CheckCircle, LogOut } from 'lucide-react';

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
  const [session, setSession] = useState(null);
  const [loadingSession, setLoadingSession] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoadingSession(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setView('form');
    setFormData(initialFormState);
    setResultData(null);
  };

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

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!validateForm()) { showNotification('Por favor, preencha todos os campos corretamente', 'error'); return; }
    setIsCalculating(true);
    setTimeout(async () => {
      const result = calculateCost({ distance: formData.distance, consumption: formData.consumption, fuelPrice: formData.fuelPrice });
      const resultObj = { name: formData.name.trim(), vehicle: formData.vehicle, date: formData.date, result };
      setResultData(resultObj);

      const payload = {
        user_id: session.user.id,
        name: formData.name.trim(),
        vehicle: formData.vehicle,
        distance: result.distance,
        consumption: result.consumption,
        fuel_price: result.fuelPrice,
        total_cost: result.totalCost,
        date: formData.date,
      };

      const { error } = await supabase.from('translados').insert(payload);

      if (error) showNotification('Erro ao salvar translado.', 'error');
      else showNotification('Cálculo realizado e salvo!', 'success');

      setView('dashboard');
      setIsCalculating(false);
    }, 500);
  }, [formData, validateForm, showNotification, session]);

  const handleBack = useCallback(() => setView('form'), []);
  const handleNewCalculation = useCallback(() => { setFormData(initialFormState); setErrors(initialErrors); setResultData(null); setView('form'); }, []);

  const handleGeneratePDF = useCallback(async () => {
    if (!resultData) return;
    setIsGeneratingPDF(true);
    try { await generatePDF(resultData); showNotification('PDF gerado com sucesso!', 'success'); }
    catch (error) { showNotification('Erro ao gerar PDF. Tente novamente.', 'error'); }
    finally { setIsGeneratingPDF(false); }
  }, [resultData, showNotification]);

  if (loadingSession) return <div className="min-h-screen bg-aarj-cream flex items-center justify-center"><p className="text-aarj-text-light">Carregando...</p></div>;

  if (!session) return <Auth />;

  return (
    <div className="min-h-screen flex flex-col bg-aarj-cream">
      <Header />
      <div className="flex justify-end px-4 py-2 max-w-xl mx-auto w-full">
        <button onClick={handleLogout} className="flex items-center gap-1 text-sm text-aarj-text-light hover:text-aarj-error transition-colors">
          <LogOut className="w-4 h-4" />Sair
        </button>
      </div>
      <main className="flex-1 py-4 sm:py-8 px-4">
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