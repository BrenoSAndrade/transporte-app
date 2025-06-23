import React, { useState } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  LinearProgress,
  Grid,
  Paper,
} from '@mui/material';
import { CloudUpload, CheckCircle, Error } from '@mui/icons-material';
import { importarDados } from '../services/api';
import { DadosImportacao } from '../types';

export const ImportarDados: React.FC = () => {
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [tipoImportacao, setTipoImportacao] = useState<'linhas' | 'veiculos' | 'horarios'>('linhas');
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState<{ sucesso: boolean; mensagem: string } | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setArquivo(file);
      setResultado(null);
    }
  };

  const handleImport = async () => {
    if (!arquivo) return;

    setLoading(true);
    setResultado(null);

    try {
      const dados: DadosImportacao = {
        arquivo,
        tipo: tipoImportacao,
      };

      const sucesso = await importarDados(dados);
      
      setResultado({
        sucesso,
        mensagem: sucesso 
          ? 'Dados importados com sucesso!' 
          : 'Erro ao importar dados. Verifique o formato do arquivo.'
      });
    } catch (error) {
      setResultado({
        sucesso: false,
        mensagem: 'Erro interno do sistema. Tente novamente.'
      });
    } finally {
      setLoading(false);
    }
  };

  const formatosAceitos = {
    linhas: '.csv, .xlsx - Colunas: numero, itinerario, demanda',
    veiculos: '.csv, .xlsx - Colunas: id, linha, latitude, longitude',
    horarios: '.csv, .xlsx - Colunas: linha, horario, tipo_dia'
  };

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
        Importação de Dados
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3 }}>
                Upload de Arquivo
              </Typography>

              <Box sx={{ mb: 3 }}>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Tipo de Dados</InputLabel>
                  <Select
                    value={tipoImportacao}
                    label="Tipo de Dados"
                    onChange={(e) => setTipoImportacao(e.target.value as any)}
                  >
                    <MenuItem value="linhas">Linhas de Ônibus</MenuItem>
                    <MenuItem value="veiculos">Veículos</MenuItem>
                    <MenuItem value="horarios">Horários</MenuItem>
                  </Select>
                </FormControl>

                <Box
                  sx={{
                    border: '2px dashed #ccc',
                    borderRadius: 2,
                    p: 4,
                    textAlign: 'center',
                    backgroundColor: '#fafafa',
                    cursor: 'pointer',
                    '&:hover': {
                      borderColor: '#1E4B87',
                      backgroundColor: '#f5f7fa',
                    },
                  }}
                  onClick={() => document.getElementById('file-input')?.click()}
                >
                  <input
                    id="file-input"
                    type="file"
                    accept=".csv,.xlsx,.xls"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
                  <CloudUpload sx={{ fontSize: 48, color: '#ccc', mb: 2 }} />
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    {arquivo ? arquivo.name : 'Clique para selecionar um arquivo'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Formatos aceitos: {formatosAceitos[tipoImportacao]}
                  </Typography>
                </Box>
              </Box>

              {loading && (
                <Box sx={{ mb: 2 }}>
                  <LinearProgress />
                  <Typography variant="body2" sx={{ mt: 1, textAlign: 'center' }}>
                    Processando arquivo...
                  </Typography>
                </Box>
              )}

              {resultado && (
                <Alert 
                  severity={resultado.sucesso ? 'success' : 'error'}
                  icon={resultado.sucesso ? <CheckCircle /> : <Error />}
                  sx={{ mb: 2 }}
                >
                  {resultado.mensagem}
                </Alert>
              )}

              <Button
                variant="contained"
                fullWidth
                onClick={handleImport}
                disabled={!arquivo || loading}
                startIcon={<CloudUpload />}
                size="large"
              >
                {loading ? 'Importando...' : 'Importar Dados'}
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Instruções
              </Typography>
              
              <Paper sx={{ p: 2, mb: 2, backgroundColor: '#f8f9fa' }}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
                  Formato do Arquivo:
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  • Utilize arquivos CSV ou Excel (.xlsx)
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  • Primeira linha deve conter os cabeçalhos
                </Typography>
                <Typography variant="body2">
                  • Dados devem estar limpos e formatados
                </Typography>
              </Paper>

              <Paper sx={{ p: 2, backgroundColor: '#e3f2fd' }}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
                  Colunas Obrigatórias:
                </Typography>
                <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>
                  {tipoImportacao === 'linhas' && 'numero, itinerario, demanda'}
                  {tipoImportacao === 'veiculos' && 'id, linha, latitude, longitude'}
                  {tipoImportacao === 'horarios' && 'linha, horario, tipo_dia'}
                </Typography>
              </Paper>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};