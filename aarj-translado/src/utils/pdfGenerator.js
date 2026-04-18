import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { getVehicleById } from '../data/vehicles';

export async function generatePDF(data) {
  try {
    const element = document.getElementById('pdf-content');
    if (!element) throw new Error('Elemento não encontrado');

    const canvas = await html2canvas(element, { scale: 2, useCORS: true, logging: false, backgroundColor: '#ffffff' });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pageWidth - 20;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.setFillColor(75, 144, 164);
    pdf.rect(0, 0, pageWidth, 25, 'F');

    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text('AARJ', 10, 12);

    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Articulação Agroecológica do Rio de Janeiro', 10, 18);

    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Relatório de Custo de Translado', pageWidth - 10, 12, { align: 'right' });

    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'normal');
    const today = new Date().toLocaleDateString('pt-BR');
    pdf.text(`Gerado em: ${today}`, pageWidth - 10, 18, { align: 'right' });

    const yPosition = 30;
    if (imgHeight + yPosition > pageHeight - 20) {
      const scaledHeight = pageHeight - 20 - yPosition;
      const scaledWidth = (scaledHeight * canvas.width) / canvas.height;
      const xOffset = (pageWidth - scaledWidth) / 2;
      pdf.addImage(imgData, 'PNG', xOffset, yPosition, scaledWidth, scaledHeight);
    } else {
      const xOffset = (pageWidth - imgWidth) / 2;
      pdf.addImage(imgData, 'PNG', xOffset, yPosition, imgWidth, imgHeight);
    }

    const footerY = pageHeight - 10;
    pdf.setFillColor(253, 251, 247);
    pdf.rect(0, footerY - 5, pageWidth, 15, 'F');

    pdf.setTextColor(107, 107, 107);
    pdf.setFontSize(7);
    pdf.text('© 2026 AARJ - Articulação Agroecológica do Rio de Janeiro', pageWidth / 2, footerY + 2, { align: 'center' });
    pdf.text('Este documento foi gerado automaticamente pela Calculadora de Translados AARJ', pageWidth / 2, footerY + 6, { align: 'center' });

    const vehicle = getVehicleById(data.vehicle);
    const dateStr = data.date.replace(/-/g, '');
    const fileName = `translado_AARJ_${vehicle?.name?.replace(/\s/g, '_') || 'veiculo'}_${dateStr}.pdf`;

    pdf.save(fileName);
    return { success: true, fileName };
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
    throw error;
  }
}
