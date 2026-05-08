FROM cypress/included:13.15.0

# Define o diretório de trabalho
WORKDIR /app

# Copia as dependências
COPY package.json .
COPY package-lock.json .

# Instala as dependências (incluindo o Faker)
RUN npm install

# Copia o restante do projeto
COPY . .

# Comando padrão para rodar os testes em modo headless
ENTRYPOINT ["npx", "cypress", "run"]