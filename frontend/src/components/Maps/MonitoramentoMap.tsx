import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { Box, Typography, Chip } from '@mui/material';
import { Veiculo } from '../../types';
import { fetchVeiculosTempoReal } from '../../services/api';
import 'leaflet/dist/leaflet.css';

// Ícones customizados para diferentes status
const createBusIcon = (status: string) => {
  const color = status === 'em_movimento' ? '#2E7D32' : status === 'parado' ? '#FF9800' : '#F44336';
  return new Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(`
      <svg width="24" height="24" viewBox="0 0 24 24" fill="${color}" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 16C4 16.88 4.39 17.67 5 18.22V20C5 20.55 5.45 21 6 21H7C7.55 21 8 20.55 8 20V19H16V20C16 20.55 16.45 21 17 21H18C18.55 21 19 20.55 19 20V18.22C19.61 17.67 20 16.88 20 16V6C20 4.89 19.11 4 18 4H6C4.89 4 4 4.89 4 6V16ZM7.5 17C6.67 17 6 16.33 6 15.5S6.67 14 7.5 14 9 14.67 9 15.5 8.33 17 7.5 17ZM16.5 17C15.67 17 15 16.33 15 15.5S15.67 14 16.5 14 18 14.67 18 15.5 17.33 17 16.5 17ZM18 11H6V6H18V11Z"/>
      </svg>
    `)}`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

export const MonitoramentoMap: React.FC = () => {
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVeiculos = async () => {
      try {
        const data = await fetchVeiculosTempoReal();
        setVeiculos(data);
      } catch (error) {
        console.error('Erro ao carregar veículos:', error);
      } finally {
        setLoading(false);
      }
    };

    loadVeiculos();
    
    // Atualizar a cada 30 segundos
    const interval = setInterval(loadVeiculos, 30000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'em_movimento': return 'success';
      case 'parado': return 'warning';
      case 'manutencao': return 'error';
      default: return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'em_movimento': return 'Em Movimento';
      case 'parado': return 'Parado';
      case 'manutencao': return 'Manutenção';
      default: return status;
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
        <Typography>Carregando mapa...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ height: 500, width: '100%', borderRadius: 2, overflow: 'hidden' }}>
      <MapContainer
        center={[-15.7942, -47.8822]} // Brasília
        zoom={11}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {veiculos.map((veiculo) => (
          <Marker
            key={veiculo.id}
            position={[veiculo.latitude, veiculo.longitude]}
            icon={createBusIcon(veiculo.status)}
          >
            <Popup>
              <Box sx={{ p: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Veículo {veiculo.id}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Linha: {veiculo.linha}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Velocidade: {veiculo.velocidade} km/h
                </Typography>
                <Chip 
                  label={getStatusText(veiculo.status)}
                  color={getStatusColor(veiculo.status) as any}
                  size="small"
                />
                <Typography variant="caption" sx={{ display: 'block', mt: 1, color: 'text.secondary' }}>
                  Última atualização: {new Date(veiculo.ultima_atualizacao).toLocaleTimeString('pt-BR')}
                </Typography>
              </Box>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </Box>
  );
};