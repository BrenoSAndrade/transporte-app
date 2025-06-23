import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Chip,
} from '@mui/material';
import { DirectionsBus, Speed, Warning, CheckCircle } from '@mui/icons-material';
import { MonitoramentoMap } from '../components/Maps/MonitoramentoMap';
import { fetchVeiculosTempoReal } from '../services/api';
import { Veiculo } from '../types';

export const Monitoramento: React.FC = () => {
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const veiculosData = await fetchVeiculosTempoReal();
        setVeiculos(veiculosData);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, []);

  const stats = {
    total: veiculos.length,
    emMovimento: veiculos.filter(v => v.status === 'em_movimento').length,
    parados: veiculos.filter(v => v.status === 'parado').length,
    manutencao: veiculos.filter(v => v.status === 'manutencao').length,
  };

  const StatCard = ({ title, value, icon, color }: any) => (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color }}>
              {value}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {title}
            </Typography>
          </Box>
          <Box sx={{ color, fontSize: 40 }}>
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
        Monitoramento em Tempo Real
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total de Veículos"
            value={stats.total}
            icon={<DirectionsBus />}
            color="#1E4B87"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Em Movimento"
            value={stats.emMovimento}
            icon={<Speed />}
            color="#2E7D32"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Parados"
            value={stats.parados}
            icon={<Warning />}
            color="#FF9800"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Em Manutenção"
            value={stats.manutencao}
            icon={<CheckCircle />}
            color="#F44336"
          />
        </Grid>
      </Grid>

      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">
              Localização dos Veículos
            </Typography>
            <Chip 
              label="Atualização automática a cada 30s"
              color="primary"
              variant="outlined"
              size="small"
            />
          </Box>
          <MonitoramentoMap />
        </CardContent>
      </Card>
    </Container>
  );
};