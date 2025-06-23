export interface Linha {
  numero: string;
  itinerario: string;
  demanda: 'alta' | 'media' | 'baixa';
  passageiros_dia?: number;
  status?: 'ativo' | 'inativo';
}

export interface Veiculo {
  id: string;
  linha: string;
  latitude: number;
  longitude: number;
  velocidade: number;
  status: 'em_movimento' | 'parado' | 'manutencao';
  ultima_atualizacao: string;
}

export interface Alerta {
  id: string;
  tipo: 'operacional' | 'manutencao' | 'emergencia';
  titulo: string;
  descricao: string;
  linha_afetada?: string;
  data_criacao: string;
  ativo: boolean;
}

export interface DadosImportacao {
  arquivo: File;
  tipo: 'linhas' | 'veiculos' | 'horarios';
}

export interface RelatorioAnalise {
  periodo: string;
  total_passageiros: number;
  linhas_alta_demanda: number;
  linhas_media_demanda: number;
  linhas_baixa_demanda: number;
  eficiencia_operacional: number;
}