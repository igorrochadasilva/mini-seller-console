# Guia de Testes - Mini Seller Console

Este projeto utiliza **Vitest + @testing-library/react** para testes unitários e de integração, seguindo as melhores práticas de mercado.

## 🚀 Executando os Testes

### Comandos Disponíveis

```bash
# Executar testes em modo watch (desenvolvimento)
npm run test

# Executar testes uma vez
npm run test:run

# Executar testes com interface gráfica
npm run test:ui

# Executar testes com cobertura
npm run test:coverage
```

## 🏗️ Estrutura dos Testes

```
src/
└── test/                      # TODOS OS TESTES CENTRALIZADOS AQUI
    ├── index.ts               # Índice central dos testes
    ├── setup.ts               # Configuração global dos testes
    ├── utils.tsx              # Utilitários de teste
    ├── mocks/                 # Dados mock para testes
    │   └── leads.ts
    ├── components/            # Testes dos componentes
    │   └── LeadsList/
    │       └── LeadsTable.test.tsx
    ├── pages/                 # Testes das páginas
    │   └── Home.test.tsx
    ├── hooks/                 # Testes dos hooks
    │   └── leads/
    │       └── useLeadsFilters.test.ts
    ├── lib/                   # Testes das funções utilitárias
    │   └── leadUtils.test.ts
    └── integration/           # Testes de integração
        └── LeadsWorkflow.test.tsx
```

## 📝 Escrevendo Testes

### 1. Testes de Componentes

```tsx
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { MyComponent } from '../MyComponent';
import { render } from '@/test/utils';

describe('MyComponent', () => {
  it('should render correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('should handle user interactions', async () => {
    const user = userEvent.setup();
    render(<MyComponent />);

    const button = screen.getByRole('button');
    await user.click(button);

    expect(screen.getByText('Clicked!')).toBeInTheDocument();
  });
});
```

### 2. Testes de Hooks

```tsx
import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useMyHook } from '../useMyHook';

describe('useMyHook', () => {
  it('should return initial state', () => {
    const { result } = renderHook(() => useMyHook());
    expect(result.current.value).toBe(0);
  });
});
```

### 3. Testes de Funções Utilitárias

```tsx
import { describe, expect, it } from 'vitest';

import { formatCurrency } from '../utils';

describe('formatCurrency', () => {
  it('should format positive numbers correctly', () => {
    expect(formatCurrency(1234.56)).toBe('$1,234.56');
  });

  it('should handle zero correctly', () => {
    expect(formatCurrency(0)).toBe('$0.00');
  });
});
```

## 🎯 Boas Práticas

### 1. Nomenclatura

- Use nomes descritivos para os testes
- Siga o padrão: `should [action] when [condition]`
- Exemplo: `should show error message when API fails`

### 2. Organização

- Agrupe testes relacionados em `describe` blocks
- Use `beforeEach` para setup comum
- Use `afterEach` para cleanup quando necessário

### 3. Assertions

- Teste um comportamento por vez
- Use assertions específicas e descritivas
- Evite testes que dependem de implementação interna

### 4. Mocks

- Mock apenas o que é necessário
- Use mocks consistentes entre testes
- Documente mocks complexos

## 🔧 Configuração

### Vitest

- Configurado no `vite.config.js` e `vitest.config.ts`
- Suporte a TypeScript e JSX
- Ambiente jsdom para testes de componentes

### Testing Library

- Foco em comportamento do usuário
- Queries baseadas em acessibilidade
- Utilitários para interações do usuário

### Cobertura

- Relatórios em HTML, JSON e texto
- Exclusão de arquivos de configuração e testes
- Configurável via `vitest.config.ts`

## 🚨 Troubleshooting

### Problemas Comuns

1. **Erro de importação**: Verifique se o alias `@` está configurado
2. **Componente não renderiza**: Verifique se todos os providers necessários estão no `TestWrapper`
3. **Testes lentos**: Use `vi.mock()` para componentes pesados
4. **Erros de CSS**: Verifique se `css: true` está habilitado no Vitest

### Debug

```bash
# Executar teste específico
npm run test LeadsTable

# Executar com logs detalhados
npm run test -- --reporter=verbose

# Executar com debug
npm run test -- --reporter=verbose --no-coverage
```

## 📚 Recursos Adicionais

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library](https://testing-library.com/)
- [React Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Testing Implementation Details](https://kentcdodds.com/blog/testing-implementation-details)

## 🤝 Contribuindo

Ao adicionar novos componentes ou funcionalidades:

1. Escreva testes antes ou junto com o código
2. Mantenha cobertura de testes acima de 80%
3. Siga os padrões estabelecidos
4. Atualize esta documentação se necessário
