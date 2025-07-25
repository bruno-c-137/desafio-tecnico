# 🎯 Desafio Técnico - Sistema de Agendamento

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.1.1-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0.7-38B2AC.svg)](https://tailwindcss.com/)

## 📋 Descrição

Sistema de agendamento desenvolvido como desafio técnico, demonstrando habilidades em desenvolvimento frontend com React, TypeScript e tecnologias modernas. A aplicação oferece um sistema completo de autenticação e gerenciamento de clientes com interface responsiva e moderna.

## ✨ Funcionalidades

### 🔐 Autenticação
- **Login/Cadastro**: Sistema completo de autenticação com validação
- **Proteção de Rotas**: Middleware para proteger páginas autenticadas
- **Persistência de Sessão**: Token JWT armazenado no localStorage
- **Redirecionamento Inteligente**: Redireciona para página original após login

### 👥 Gerenciamento de Clientes
- **Listagem**: Visualização de todos os clientes cadastrados
- **Adição**: Modal para cadastro de novos clientes
- **Edição**: Edição inline de dados dos clientes
- **Exclusão**: Remoção segura de clientes
- **Validação**: Formulários com validação em tempo real

### 🎨 Interface
- **Design Responsivo**: Adaptável a diferentes tamanhos de tela
- **Animações**: Transições suaves e feedback visual
- **Loading States**: Indicadores de carregamento
- **Error Handling**: Tratamento elegante de erros
- **Modal System**: Sistema de modais para ações importantes

## 🛠️ Tecnologias Utilizadas

### Core
- **React 18.2.0** - Biblioteca JavaScript para interfaces
- **TypeScript 5.7.3** - Superset JavaScript com tipagem estática
- **Vite 6.1.1** - Build tool e dev server ultra-rápido

### Styling & UI
- **Tailwind CSS 4.0.7** - Framework CSS utility-first
- **Sass** - Pré-processador CSS
- **RSuite 5.83.2** - Biblioteca de componentes React
- **Headless UI 2.2.6** - Componentes acessíveis sem estilos

### Routing & State
- **React Router DOM 6.22.3** - Roteamento declarativo
- **React Hook Form 7.61.1** - Gerenciamento de formulários
- **Context API** - Gerenciamento de estado global

### HTTP & Data Fetching
- **Axios 1.7.9** - Cliente HTTP
- **SWR 2.3.2** - Hooks para data fetching

### Development Tools
- **ESLint** - Linting de código
- **SWC** - Compilador JavaScript/TypeScript rápido
- **Vite Plugin SVGR** - Importação de SVGs como componentes

## 🚀 Como Executar

### Pré-requisitos
- Node.js (versão 18 ou superior)
- Yarn ou npm

### Instalação

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd Desafio_Tecnico
```

2. **Instale as dependências**
```bash
yarn install
# ou
npm install
```

3. **Configure as variáveis de ambiente**
```bash
# Crie um arquivo .env.local na raiz do projeto
VITE_API=http://localhost:3000/api
```

4. **Execute o projeto**
```bash
# Desenvolvimento
yarn dev
# ou
npm run dev

# Build para produção
yarn build
# ou
npm run build

# Preview da build
yarn preview
# ou
npm run preview
```

## 📁 Estrutura do Projeto

```
src/
├── assets/
│   └── styles/           # Estilos globais e SCSS
├── components/           # Componentes reutilizáveis
│   ├── ErrorBoundary/    # Tratamento de erros
│   ├── Loading/          # Componentes de loading
│   └── DialogError/      # Diálogos de erro
├── constants/            # Constantes da aplicação
├── context/              # Context API (UseLayout)
├── helpers/              # Funções utilitárias
├── pages/                # Páginas da aplicação
│   ├── (sign-in)/        # Páginas não autenticadas
│   │   ├── Login/        # Página de login/cadastro
│   │   └── LayoutSignIn/ # Layout para páginas públicas
│   └── (signed)/         # Páginas autenticadas
│       ├── Home/         # Página principal
│       └── LayoutSigned/ # Layout para páginas privadas
├── services/             # Serviços e APIs
│   ├── api.ts           # Configuração do Axios
│   └── services.ts      # Serviços da aplicação
├── main.tsx             # Ponto de entrada
└── router.tsx           # Configuração de rotas
```

## 🔧 Configurações

### TypeScript
- Configurado com paths aliases (`@/*` → `src/*`)
- Strict mode habilitado
- Configurações otimizadas para React

### Vite
- Plugin SWC para compilação rápida
- Plugin SVGR para importação de SVGs
- Alias de paths configurado
- Build otimizado para produção

### Tailwind CSS
- Configuração customizada com cores personalizadas
- Breakpoints responsivos
- Utilitários customizados

### ESLint
- Configuração para React + TypeScript
- Regras para hooks e refresh
- Máximo de warnings configurado

## 🎨 Design System

### Cores Personalizadas
```css
--color-azul-1: #465eff
--color-amarelo-1: #fcfc30
--color-rosa-1: #ff6e91
```

### Breakpoints
- **sm**: 768px
- **md**: 992px
- **lg**: 1132px

## 🔒 Segurança

- **Autenticação JWT**: Tokens seguros para autenticação
- **Proteção de Rotas**: Middleware para páginas protegidas
- **Validação de Formulários**: Validação client-side e server-side
- **Sanitização de Dados**: Prevenção contra XSS

## 📱 Responsividade

A aplicação é totalmente responsiva e funciona em:
- 📱 Dispositivos móveis
- 📱 Tablets
- 💻 Desktops
- 🖥️ Telas grandes

## 🚀 Performance

- **Code Splitting**: Carregamento lazy de componentes
- **Bundle Optimization**: Build otimizado para produção
- **Image Optimization**: Otimização automática de imagens
- **Caching**: Estratégias de cache implementadas

## 🧪 Testes

Para executar os testes:
```bash
yarn test
# ou
npm test
```

## 📦 Scripts Disponíveis

```json
{
  "dev": "vite",                    # Servidor de desenvolvimento
  "build": "tsc && vite build",     # Build para produção
  "lint": "eslint . --ext ts,tsx",  # Linting do código
  "preview": "vite preview"         # Preview da build
}
```

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Autor

**Bruno** - [GitHub](https://github.com/seu-usuario)

## 🙏 Agradecimentos

- Equipe de desenvolvimento
- Comunidade React
- Contribuidores do projeto

---

⭐ Se este projeto te ajudou, considere dar uma estrela!