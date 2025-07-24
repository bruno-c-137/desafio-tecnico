# Tela de Login e Cadastro

## Funcionalidades

### 🎨 Design Moderno
- **Gradiente de fundo**: Combinação de azul, roxo e índigo
- **Glassmorphism**: Efeito de vidro fosco com backdrop-blur
- **Design responsivo**: Adaptável a diferentes tamanhos de tela
- **Ícones SVG**: Ícone de cadeado para o logo

### ✨ Animações Avançadas
- **Flip animation**: Animação 3D de flip para transição entre formulários
- **Slide animations**: Animações de deslizamento horizontal e vertical
- **Fade effects**: Transições suaves de opacidade
- **Hover effects**: Efeitos interativos em botões e inputs
- **Scale effects**: Efeitos de escala nos inputs quando focados
- **Ripple effect**: Efeito de ondulação no botão principal
- **Loading animation**: Spinner animado durante submissão
- **Particle effects**: Partículas flutuantes no fundo
- **Toggle animation**: Animação especial no botão de alternância

### 🔄 Toggle Login/Cadastro
- **Estado único**: Um componente que alterna entre login e cadastro
- **Formulários dinâmicos**: Campos adicionais aparecem no cadastro
- **Validação**: Campos obrigatórios para ambos os modos
- **Transições suaves**: Animações ao alternar entre modos

### 📝 Formulários
- **Login**: Email, senha, "lembrar-me", "esqueceu a senha?"
- **Cadastro**: Nome completo, email, senha, confirmar senha
- **Validação**: Campos obrigatórios e validação de email
- **Estados**: Gerenciamento de estado com React hooks

### 🔐 Autenticação Social
- **Google OAuth**: Botão para login com Google
- **Ícone SVG**: Logo do Google integrado
- **Estilo consistente**: Mantém o design do tema

### 🎯 UX/UI
- **Feedback visual**: Estados de hover, focus e loading
- **Acessibilidade**: Labels apropriados e navegação por teclado
- **Micro-interações**: Transições suaves em todos os elementos
- **Cores consistentes**: Paleta de cores harmoniosa

## Estrutura de Arquivos

```
Login/
├── Login.tsx          # Componente principal com animações
├── style.scss         # Estilos SCSS e animações avançadas
└── README.md          # Documentação
```

## Tecnologias Utilizadas

- **React**: Hooks (useState, useNavigate, useSearchParams, useEffect)
- **Tailwind CSS**: Classes utilitárias para estilização
- **SCSS**: Animações avançadas e efeitos personalizados
- **TypeScript**: Tipagem estática para melhor desenvolvimento
- **CSS3**: Animações 3D e transformações avançadas

## Como Usar

1. **Importe o componente**:
```tsx
import LoginPage from "@/pages/(sign-in)/Login/Login";
```

2. **Configure as rotas** (se necessário):
```tsx
<Route path="/login" element={<LoginPage />} />
```

3. **Personalize o contexto**:
O componente usa o contexto `useLayout` para autenticação. Certifique-se de que está configurado corretamente.

## Customização

### Cores
As cores podem ser alteradas modificando as classes Tailwind no componente:
- `from-blue-900 via-purple-900 to-indigo-900` - Gradiente de fundo
- `from-blue-500 to-purple-600` - Gradiente do botão principal

### Animações
As animações estão definidas no arquivo `style.scss` e incluem:
- **Flip animation**: Rotação 3D para transição entre formulários
- **Slide animations**: Deslizamento horizontal e vertical
- **Particle effects**: Partículas flutuantes no fundo
- **Loading states**: Spinner animado durante submissão
- **Ripple effects**: Efeito de ondulação nos botões
- **Hover animations**: Transições suaves em interações

### Validação
Adicione validações customizadas no método `handleSubmit`:
```tsx
function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  
  // Validações customizadas aqui
  
  handleLogin();
}
``` 