import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import { Linha } from '../../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface DemandaChartProps {
  linhas: Linha[];
}

export const DemandaChart: React.FC<DemandaChartProps> = ({ linhas }) => {
  const demandaCounts = {
    alta: linhas.filter(l => l.demanda === 'alta').length,
    media: linhas.filter(l => l.demanda === 'media').length,
    baixa: linhas.filter(l => l.demanda === 'baixa').length,
  };

  const doughnutData = {
    labels: ['Alta Demanda', 'Média Demanda', 'Baixa Demanda'],
    datasets: [
      {
        data: [demandaCounts.alta, demandaCounts.media, demandaCounts.baixa],
        backgroundColor: ['#F44336', '#FF9800', '#4CAF50'],
        borderWidth: 2,
        borderColor: '#FFFFFF',
      },
    ],
  };

  const barData = {
    labels: linhas.map(l => `Linha ${l.numero}`),
    datasets: [
      {
        label: 'Passageiros/Dia',
        data: linhas.map(l => l.passageiros_dia || 0),
        backgroundColor: linhas.map(l => 
          l.demanda === 'alta' ? '#F44336' : 
          l.demanda === 'media' ? '#FF9800' : '#4CAF50'
        ),
        borderRadius: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
              Distribuição por Demanda
            </Typography>
            <Box sx={{ height: 300, display: 'flex', justifyContent: 'center' }}>
              <Doughnut data={doughnutData} options={{ responsive: true, maintainAspectRatio: false }} />
            </Box>
          </CardContent>
        </Card>
      </Grid>
      
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
              Passageiros por Linha
            </Typography>
            <Box sx={{ height: 300 }}>
              <Bar data={barData} options={{ ...chartOptions, maintainAspectRatio: false }} />
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};