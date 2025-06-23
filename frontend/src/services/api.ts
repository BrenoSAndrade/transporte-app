import axios from 'axios';
import { Linha, Veiculo, Alerta, DadosImportacao, RelatorioAnalise } from '../types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
});

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Erro na API:', error);
    return Promise.reject(error);
  }
);

export const fetchLinhas = async (): Promise<Linha[]> => {
  try {
    const response = await api.get('/api/linhas/classificacao');
    return response.data;
  } catch (error) {
    // Dados mock para desenvolvimento
    return [
      { numero: '001', itinerario: 'Plano Piloto - Taguatinga', demanda: 'alta', passageiros_dia: 2500 },
      { numero: '002', itinerario: 'Asa Norte - Ceilândia', demanda: 'alta', passageiros_dia: 2200 },
      { numero: '003', itinerario: 'Asa Sul - Samambaia', demanda: 'media', passageiros_dia: 1800 },
      { numero: '004', itinerario: 'Lago Norte - Águas Claras', demanda: 'baixa', passageiros_dia: 800 },
    ];
  }
};

export const fetchVeiculosTempoReal = async (): Promise<Veiculo[]> => {
  try {
    const response = await api.get('/api/veiculos/em-tempo-real');
    return response.data;
  } catch (error) {
    // Dados mock para desenvolvimento
    return [
      { id: 'V001', linha: '001', latitude: -15.7942, longitude: -47.8822, velocidade: 45, status: 'em_movimento', ultima_atualizacao: new Date().toISOString() },
      { id: 'V002', linha: '002', latitude: -15.7801, longitude: -47.9292, velocidade: 0, status: 'parado', ultima_atualizacao: new Date().toISOString() },
      { id: 'V003', linha: '003', latitude: -15.8267, longitude: -47.9218, velocidade: 35, status: 'em_movimento', ultima_atualizacao: new Date().toISOString() },
    ];
  }
};

export const fetchAlertas = async (): Promise<Alerta[]> => {
  try {
    const response = await api.get('/api/alertas');
    return response.data;
  } catch (error) {
    // Dados mock para desenvolvimento
    return [
      { id: 'A001', tipo: 'operacional', titulo: 'Atraso na Linha 001', descricao: 'Trânsito intenso na W3 Norte', linha_afetada: '001', data_criacao: new Date().toISOString(), ativo: true },
      { id: 'A002', tipo: 'manutencao', titulo: 'Manutenção Programada', descricao: 'Veículo V005 em manutenção preventiva', data_criacao: new Date().toISOString(), ativo: true },
    ];
  }
};

export const importarDados = async (dados: DadosImportacao): Promise<boolean> => {
  try {
    const formData = new FormData();
    formData.append('arquivo', dados.arquivo);
    formData.append('tipo', dados.tipo);
    
    await api.post('/api/dados/importar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return true;
  } catch (error) {
    console.error('Erro ao importar dados:', error);
    return false;
  }
};

export const fetchRelatorioAnalise = async (): Promise<RelatorioAnalise> => {
  try {
    const response = await api.get('/api/relatorios/analise');
    return response.data;
  } catch (error) {
    // Dados mock para desenvolvimento
    return {
      periodo: 'Últimos 30 dias',
      total_passageiros: 125000,
      linhas_alta_demanda: 8,
      linhas_media_demanda: 15,
      linhas_baixa_demanda: 12,
      eficiencia_operacional: 87.5
    };
  }
};

export default api;