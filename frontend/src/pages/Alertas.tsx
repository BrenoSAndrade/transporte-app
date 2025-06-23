import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  Chip,
  Grid,
  Alert,
  Button,
} from '@mui/material';
import { Warning, Build, ReportProblem, Refresh } from '@mui/icons-material';
import { fetchAlertas } from '../services/api';
import { Alerta } from '../types';

export const Alertas: React.FC = () => {
  const [alertas, setAlertas] = useState<Alerta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAlertas();
  }, []);

  const loadAlertas = async () => {
    try {
      const alertasData = await fetchAlertas();
      setAlertas(alertasData);
    } catch (error) {
      console.error('Erro ao carregar alertas:', error);
    } finally {
      setLoading(false);
    }
  };

  const getAlertIcon = (tipo: string) => {
    switch (tipo) {
      case 'operacional': return <Warning />;
      case 'manutencao': return <Build />;
      case 'emergencia': return <ReportProblem />;
      default: return <Warning />;
    }
  };

  const getAlertColor = (tipo: string) => {
    switch (tipo) {
      case 'operacional': return 'warning';
      case 'manutencao': return 'info';
      case 'emergencia': return 'error';
      default: return 'default';
    }
  };

  const getAlertSeverity = (tipo: string) => {
    switch (tipo) {
      case 'operacional': return 'warning';
      case 'manutencao': return 'info';
      case 'emergencia': return 'error';
      default: return 'info';
    }
  };

  const alertasAtivos = alertas.filter(a => a.ativo);
  const alertasInativos = alertas.filter(a => !a.ativo);

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Alertas e Avisos Operacionais
        </Typography>
        <Button
          variant="outlined"
          startIcon={<Refresh />}
          onClick={loadAlertas}
          disabled={loading}
        >
          Atualizar
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Alertas Ativos ({alertasAtivos.length})
              </Typography>
              
              {alertasAtivos.length === 0 ? (
                <Alert severity="success">
                  Nenhum alerta ativo no momento. Sistema operando normalmente.
                </Alert>
              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {alertasAtivos.map((alerta) => (
                    <Alert
                      key={alerta.id}
                      severity={getAlertSeverity(alerta.tipo) as any}
                      icon={getAlertIcon(alerta.tipo)}
                    >
                      <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                            {alerta.titulo}
                          </Typography>
                          {alerta.linha_afetada && (
                            <Chip 
                              label={`Linha ${alerta.linha_afetada}`}
                              size="small"
                              color="primary"
                            />
                          )}
                        </Box>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          {alerta.descricao}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Criado em: {new Date(alerta.data_criacao).toLocaleString('pt-BR')}
                        </Typography>
                      </Box>
                    </Alert>
                  ))}
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Resumo de Alertas
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Warning color="warning" />
                    <Typography>Operacionais</Typography>
                  </Box>
                  <Chip 
                    label={alertas.filter(a => a.tipo === 'operacional' && a.ativo).length}
                    color="warning"
                    size="small"
                  />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Build color="info" />
                    <Typography>Manutenção</Typography>
                  </Box>
                  <Chip 
                    label={alertas.filter(a => a.tipo === 'manutencao' && a.ativo).length}
                    color="info"
                    size="small"
                  />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <ReportProblem color="error" />
                    <Typography>Emergência</Typography>
                  </Box>
                  <Chip 
                    label={alertas.filter(a => a.tipo === 'emergencia' && a.ativo).length}
                    color="error"
                    size="small"
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>

          {alertasInativos.length > 0 && (
            <Card sx={{ mt: 2 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Histórico Recente
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {alertasInativos.slice(0, 3).map((alerta) => (
                    <Box key={alerta.id} sx={{ p: 1, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        {alerta.titulo}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(alerta.data_criacao).toLocaleDateString('pt-BR')}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};