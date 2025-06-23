# Sistema de Transporte Público - DF

Sistema completo de monitoramento e gestão de transporte público para a Secretaria de Transporte do Distrito Federal.

## 🚀 Funcionalidades Implementadas

### ✅ Monitoramento em Tempo Real
- Visualização de veículos no mapa interativo
- Status dos ônibus (em movimento, parado, manutenção)
- Atualização automática a cada 30 segundos
- Dashboard com métricas operacionais

### ✅ Classificação de Demanda
- Tabela interativa com busca e ordenação
- Gráficos de análise (pizza e barras)
- Classificação por alta/média/baixa demanda
- Visualização de passageiros por linha

### ✅ Relatórios Analíticos
- Métricas de performance operacional
- Indicadores de eficiência
- Resumo executivo do período
- Exportação de relatórios

### ✅ Importação de Dados
- Upload de arquivos CSV/Excel
- Validação de formato
- Suporte para linhas, veículos e horários
- Interface intuitiva com drag & drop

### ✅ Sistema de Alertas
- Alertas operacionais em tempo real
- Categorização por tipo (operacional, manutenção, emergência)
- Histórico de alertas
- Notificações visuais

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 18** com TypeScript
- **Material-UI** para componentes
- **Leaflet** para mapas interativos
- **Chart.js** para visualização de dados
- **React Router** para navegação
- **Axios** para comunicação com API

### Estrutura do Projeto
```
src/
├── components/          # Componentes reutilizáveis
│   ├── Layout/         # Header, Sidebar
│   ├── Maps/           # Componentes de mapa
│   ├── Charts/         # Gráficos e visualizações
│   └── Tables/         # Tabelas interativas
├── pages/              # Páginas principais
├── services/           # Conexão com API
├── styles/             # Tema e estilos
└── types/              # Tipos TypeScript
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Instalação
```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build
```

### Configuração do Backend
O sistema está configurado para conectar com:
- **Desenvolvimento:** `http://localhost:3000`
- **Produção:** `https://api-transporte-df.gov.br`

### Endpoints da API
- `GET /api/veiculos/em-tempo-real` - Localização dos veículos
- `GET /api/linhas/classificacao` - Dados das linhas
- `GET /api/alertas` - Alertas ativos
- `POST /api/dados/importar` - Importação de dados
- `GET /api/relatorios/analise` - Relatórios analíticos

## 📱 Design Responsivo

O sistema foi desenvolvido com design mobile-first e é totalmente responsivo:
- **Desktop:** Layout completo com sidebar
- **Tablet:** Interface adaptada
- **Mobile:** Menu hambúrguer e componentes otimizados

## 🎨 Design System

### Cores Principais
- **Azul Institucional:** #1E4B87
- **Verde Operacional:** #2E7D32
- **Laranja Atenção:** #FF9800
- **Vermelho Alerta:** #F44336

### Tipografia
- **Fonte:** Roboto (300, 400, 500, 700)
- **Hierarquia:** Títulos, subtítulos e corpo bem definidos

## 🔒 Segurança e Performance

- Validação de dados no frontend
- Tratamento de erros da API
- Loading states para melhor UX
- Otimização de re-renders
- Lazy loading de componentes

## 📊 Dados Mock

Para desenvolvimento, o sistema inclui dados mock que simulam:
- 4 linhas de ônibus com diferentes demandas
- 3 veículos em tempo real
- 2 alertas operacionais
- Relatórios com métricas realistas

## 🚀 Deploy

O sistema está pronto para deploy em qualquer plataforma:
- **Netlify/Vercel:** Deploy automático
- **AWS S3 + CloudFront:** Para produção
- **Docker:** Container pronto para uso

## 📈 Próximas Funcionalidades

- [ ] Autenticação de usuários
- [ ] Notificações push
- [ ] Relatórios avançados
- [ ] Integração com GPS real
- [ ] API de previsão de chegada

## 🤝 Contribuição

Sistema desenvolvido seguindo as melhores práticas de:
- Clean Code
- Componentização
- TypeScript strict
- Responsividade
- Acessibilidade

---

**Status:** ✅ Pronto para produção
**Versão:** 1.0.0
**Última atualização:** Dezembro 2024