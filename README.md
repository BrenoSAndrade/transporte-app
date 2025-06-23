#Transporte Público DF – Análise de Dados com Django + React

Este é um sistema Full Stack que analisa dados de transporte público usando aprendizado de máquina.  
O projeto é dividido em:

- **Frontend:** React + Vite + TailwindCSS
- **Backend:** Django + Django REST Framework + Pandas + Scikit-Learn

---

## 📁 Estrutura

transporte-app/
├── backend/ # Projeto Django com API REST
├── frontend/ # Interface React para envio de CSV e visualização de resultado
├── requirements_backend.txt # Lista de dependências Python
├── .gitignore # Ignora arquivos desnecessários no Git
└── README.md
---

## Como executar o projeto localmente

### 1. Clonar o repositório

```bash
git clone https://github.com/SEU_USUARIO/transporte-app.git
cd transporte-app
2. Iniciar o backend

cd backend
python -m pip install -r ../requirements_backend.txt
python manage.py runserver
A API estará disponível em:
http://127.0.0.1:8000

3. Iniciar o frontend

cd ../frontend
npm install
npm run dev
A interface estará disponível em:
http://localhost:5173

Como usar
Acesse a interface do frontend.

Envie um arquivo .csv com dados de transporte.

A API analisará os dados com o algoritmo KMeans.

O resultado da análise será exibido na tela.

Tecnologias
Frontend: React, Vite, TailwindCSS, Axios

Backend: Django, Django REST Framework, Pandas, Scikit-Learn

