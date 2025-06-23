# 🚍 Transporte Público DF – Análise de Dados com Django + React

Este é um sistema Full Stack que analisa dados de transporte público usando aprendizado de máquina.  
O projeto é dividido em:

- **Frontend:** React + Vite + TailwindCSS
- **Backend:** Django + Django REST Framework + Pandas + Scikit-Learn

---

## 📁 Estrutura do Projeto

transporte-app/
├── backend/ # Projeto Django com API REST
├── frontend/ # Interface React para envio de CSV e visualização de resultado
├── requirements_backend.txt # Lista de dependências Python
├── .gitignore # Ignora arquivos desnecessários no Git
└── README.md

---

🚀 Passo a Passo para Executar o Projeto
📁 1. Clonar o repositório
Abra o terminal e execute:

cd C:\Users\User\Desktop
git clone https://github.com/BrenoSAndrade/transporte-app.git
cd transporte-app
⚙️ 2. Executar o Backend (Django)
A. Entrar na pasta backend

cd backend
B. Instalar as dependências do Python (arquivo está na raiz)

python -m pip install -r ../requirements_backend.txt
C. Aplicar as migrações do Django

python manage.py migrate
D. Iniciar o servidor Django

python manage.py runserver
Acesse a API em:
🔗 http://127.0.0.1:8000

✅ Observação: O endpoint ativo é http://127.0.0.1:8000/api/analisar/

🖥️ 3. Executar o Frontend (React)
A. Em outro terminal, acesse a pasta do frontend:

cd C:\Users\User\Desktop\transporte-app\frontend
B. Instalar as dependências do Node

npm install
C. Iniciar o servidor de desenvolvimento do React

npm run dev
Acesse a interface em:
🔗 http://localhost:5173

🧪 4. Como usar
Acesse o frontend no navegador: http://localhost:5173

Envie um arquivo .csv com dados de transporte.

A API processará os dados com KMeans.

Os resultados aparecerão na tela com gráficos e mapas.

⚙️ Tecnologias Utilizadas
Frontend
React

Vite

TailwindCSS

Axios

Backend
Django

Django REST Framework

Pandas

Scikit-Learn

