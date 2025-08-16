// ============================================================================
// TEST INDEX - Centraliza todos os testes do projeto
// ============================================================================

// Componentes
export * from './components/LeadsList/LeadsTable.test';

// Páginas
export * from './pages/Home.test';

// Hooks
export * from './hooks/leads/useLeadsFilters.test';

// Utilitários
export * from './lib/leadUtils.test';

// Integração
export * from './integration/LeadsWorkflow.test';

// ============================================================================
// ESTRUTURA DOS TESTES
// ============================================================================
/*
src/test/
├── index.ts                    # Este arquivo - índice central
├── setup.ts                    # Configuração global dos testes
├── utils.tsx                   # Utilitários de teste
├── mocks/                      # Dados mock para testes
│   └── leads.ts
├── components/                 # Testes dos componentes
│   └── LeadsList/
│       └── LeadsTable.test.tsx
├── pages/                      # Testes das páginas
│   └── Home.test.tsx
├── hooks/                      # Testes dos hooks
│   └── leads/
│       └── useLeadsFilters.test.ts
├── lib/                        # Testes das funções utilitárias
│   └── leadUtils.test.ts
└── integration/                # Testes de integração
    └── LeadsWorkflow.test.tsx
*/
