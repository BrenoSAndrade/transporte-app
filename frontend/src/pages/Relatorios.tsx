import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Button,
  Chip,
} from '@mui/material';
import { Download, TrendingUp, People, DirectionsBus } from '@mui/icons-material';
import { fetchRelatorioAnalise } from '../services/api';
import { RelatorioAnalise } from '../types';

export const Relatorios: React.FC = () => {
  const [relatorio, setRelatorio] = useState<RelatorioAnalise | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const relatorioData = await fetchRelatorioAnalise();
        setRelatorio(relatorioData);
      } catch (error) {
        console.error('Erro ao carregar relatório:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const MetricCard = ({ title, value, icon, color, subtitle }: any) => (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ color, fontSize: 32 }}>
            {icon}
          </Box>
          <Chip label="Últimos 30 dias" size="small" variant="outlined" />
        </Box>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color, mb: 1 }}>
          {value}
        </Typography>
        <Typography variant="h6" sx={{ mb: 1 }}>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        )}
      </CardContent>
    </Card>
  );

  if (loading || !relatorio) {
    return (
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <Typography>Carregando relatórios...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Relatórios Analíticos
        </Typography>
        <Button
          variant="contained"
          startIcon={<Download />}
          onClick={() => {
            // Implementar download do relatório
            console.log('Download do relatório');
          }}
        >
          Exportar Relatório
        </Button>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Total de Passageiros"
            value={relatorio.total_passageiros.toLocaleString('pt-BR')}
            icon={<People />}
            color="#1E4B87"
            subtitle="Período: 30 dias"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Linhas Alta Demanda"
            value={relatorio.linhas_alta_demanda}
            icon={<TrendingUp />}
            color="#F44336"
            subtitle="Acima de 2000 pass./dia"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Linhas Média Demanda"
            value={relatorio.linhas_media_demanda}
            icon={<DirectionsBus />}
            color="#FF9800"
            subtitle="1000-2000 pass./dia"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Eficiência Operacional"
            value={`${relatorio.eficiencia_operacional}%`}
            icon={<TrendingUp />}
            color="#2E7D32"
            subtitle="Meta: 85%"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Resumo Executivo
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Período de Análise:</strong> {relatorio.periodo}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Total de Linhas Monitoradas:</strong> {relatorio.linhas_alta_demanda + relatorio.linhas_media_demanda + relatorio.linhas_baixa_demanda}
                </Typography>
                <Typography variant="body1">
                  <strong>Média de Passageiros por Dia:</strong> {Math.round(relatorio.total_passageiros / 30).toLocaleString('pt-BR')}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Indicadores de Performance
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Pontualidade:</strong> 92.5%
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Satisfação dos Usuários:</strong> 4.2/5.0
                </Typography>
                <Typography variant="body1">
                  <strong>Tempo Médio de Viagem:</strong> 45 min
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};