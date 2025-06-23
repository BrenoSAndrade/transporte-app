import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Tabs,
  Tab,
} from '@mui/material';
import { DemandaTable } from '../components/Tables/DemandaTable';
import { DemandaChart } from '../components/Charts/DemandaChart';
import { fetchLinhas } from '../services/api';
import { Linha } from '../types';

export const Demanda: React.FC = () => {
  const [linhas, setLinhas] = useState<Linha[]>([]);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        const linhasData = await fetchLinhas();
        setLinhas(linhasData);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
        Classificação de Demanda das Linhas
      </Typography>

      <Card>
        <CardContent>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Tabs value={tabValue} onChange={handleTabChange}>
              <Tab label="Visualização em Tabela" />
              <Tab label="Gráficos e Análises" />
            </Tabs>
          </Box>

          {tabValue === 0 && (
            <DemandaTable linhas={linhas} />
          )}

          {tabValue === 1 && (
            <DemandaChart linhas={linhas} />
          )}
        </CardContent>
      </Card>
    </Container>
  );
};