import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  TextField,
  Box,
  InputAdornment,
  TableSortLabel,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { Linha } from '../../types';

interface DemandaTableProps {
  linhas: Linha[];
}

type SortField = 'numero' | 'demanda' | 'passageiros_dia';
type SortDirection = 'asc' | 'desc';

export const DemandaTable: React.FC<DemandaTableProps> = ({ linhas }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('numero');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const getDemandaColor = (demanda: string) => {
    switch (demanda) {
      case 'alta': return 'error';
      case 'media': return 'warning';
      case 'baixa': return 'success';
      default: return 'default';
    }
  };

  const getDemandaText = (demanda: string) => {
    switch (demanda) {
      case 'alta': return 'Alta';
      case 'media': return 'Média';
      case 'baixa': return 'Baixa';
      default: return demanda;
    }
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredAndSortedLinhas = linhas
    .filter(linha => 
      linha.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
      linha.itinerario.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      let aValue: any = a[sortField];
      let bValue: any = b[sortField];
      
      if (sortField === 'demanda') {
        const demandaOrder = { 'alta': 3, 'media': 2, 'baixa': 1 };
        aValue = demandaOrder[a.demanda as keyof typeof demandaOrder];
        bValue = demandaOrder[b.demanda as keyof typeof demandaOrder];
      }
      
      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Buscar por número da linha ou itinerário..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#F5F7FA' }}>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={sortField === 'numero'}
                  direction={sortField === 'numero' ? sortDirection : 'asc'}
                  onClick={() => handleSort('numero')}
                >
                  Número da Linha
                </TableSortLabel>
              </TableCell>
              <TableCell>Itinerário</TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortField === 'demanda'}
                  direction={sortField === 'demanda' ? sortDirection : 'asc'}
                  onClick={() => handleSort('demanda')}
                >
                  Classificação
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">
                <TableSortLabel
                  active={sortField === 'passageiros_dia'}
                  direction={sortField === 'passageiros_dia' ? sortDirection : 'asc'}
                  onClick={() => handleSort('passageiros_dia')}
                >
                  Passageiros/Dia
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAndSortedLinhas.map((linha) => (
              <TableRow 
                key={linha.numero}
                sx={{ 
                  '&:hover': { backgroundColor: '#F8F9FA' },
                  '&:nth-of-type(even)': { backgroundColor: '#FAFBFC' }
                }}
              >
                <TableCell sx={{ fontWeight: 'bold', color: '#1E4B87' }}>
                  {linha.numero}
                </TableCell>
                <TableCell>{linha.itinerario}</TableCell>
                <TableCell>
                  <Chip
                    label={getDemandaText(linha.demanda)}
                    color={getDemandaColor(linha.demanda) as any}
                    size="small"
                    sx={{ fontWeight: 'bold' }}
                  />
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                  {linha.passageiros_dia?.toLocaleString('pt-BR') || 'N/A'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};