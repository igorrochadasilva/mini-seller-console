# Mini Seller Console

A modern, lightweight React-based console application designed for sales teams to efficiently triage leads and convert them into opportunities. Built with cutting-edge technologies and following industry best practices for maintainable, scalable code.

## 🎯 Project Overview

The Mini Seller Console is a comprehensive sales management tool that streamlines the lead qualification process and opportunity conversion workflow. It provides an intuitive interface for sales representatives to manage their pipeline with real-time filtering, sorting, and detailed lead management capabilities.

### Core Features

- **Lead Management**: Comprehensive lead listing with advanced filtering and sorting
- **Lead Qualification**: Inline editing of lead status and contact information
- **Opportunity Conversion**: Seamless conversion of qualified leads to opportunities
- **Pipeline Tracking**: Visual representation of sales stages and progress
- **Responsive Design**: Optimized for both desktop and mobile devices

## 🚀 Technologies & Stack

### Frontend Framework

- **React 19.1.1** - Latest React with modern features and performance improvements
- **TypeScript 5.9.2** - Full type safety and enhanced developer experience
- **Vite 7.1.2** - Lightning-fast build tool and development server

### Styling & UI

- **Tailwind CSS 4.1.12** - Utility-first CSS framework with custom design system
- **Radix UI** - Accessible, unstyled UI primitives
- **Lucide React** - Beautiful, consistent icon library
- **Class Variance Authority** - Type-safe component variant management

### State Management & Data Fetching

- **Zustand 5.0.7** - Lightweight, scalable state management
- **TanStack React Query 5.85.3** - Powerful data fetching and caching
- **React Hook Form 7.62.0** - Performant forms with validation

### Validation & Type Safety

- **Zod 4.0.17** - TypeScript-first schema validation
- **@hookform/resolvers** - Form validation integration

### Development Tools

- **ESLint 9.33.0** - Code quality and consistency
- **Prettier 3.6.2** - Code formatting
- **Husky 9.1.7** - Git hooks for code quality
- **Vitest 3.2.4** - Fast unit testing framework
- **Testing Library** - Comprehensive testing utilities

## 🏗️ Architecture & Design Patterns

### Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (Button, Input, etc.)
│   ├── LeadsList/      # Lead management components
│   ├── LeadDetailPanel/ # Lead detail and editing
│   └── ConvertToOpportunityModal/ # Opportunity conversion
├── hooks/               # Custom React hooks
├── stores/              # Zustand state stores
├── services/            # API and data services
├── types/               # TypeScript type definitions
├── schemas/             # Zod validation schemas
└── lib/                 # Utility functions and constants
```

### Design Principles

- **Component Composition**: Modular, reusable components with clear interfaces
- **Type Safety**: Full TypeScript coverage with strict typing
- **State Management**: Centralized state with Zustand for predictable updates
- **Form Handling**: Controlled forms with validation using React Hook Form
- **Error Boundaries**: Comprehensive error handling and user feedback

## ✨ Key Features

### 1. Leads Management

- **Smart Filtering**: Search by name/company, filter by status
- **Advanced Sorting**: Sort by score (ascending/descending)
- **Real-time Updates**: Instant feedback on data changes
- **Bulk Operations**: Efficient handling of multiple leads

### 2. Lead Detail Panel

- **Inline Editing**: Edit status and email directly in the interface
- **Validation**: Real-time email format validation
- **Auto-save**: Automatic saving with error handling
- **Responsive Design**: Optimized for all screen sizes

### 3. Opportunity Conversion

- **Multi-stage Pipeline**: Comprehensive sales stage management
- **Flexible Amounts**: Optional monetary value tracking
- **Account Management**: Link opportunities to company accounts
- **Workflow Integration**: Seamless transition from lead to opportunity

### 4. User Experience

- **Loading States**: Smooth loading indicators and skeleton screens
- **Error Handling**: User-friendly error messages and recovery options
- **Empty States**: Helpful guidance when no data is available
- **Responsive Layout**: Mobile-first design approach

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd mini-seller-console
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run test suite
- `npm run test:ui` - Run tests with UI
- `npm run test:coverage` - Generate coverage report
- `npm run lint` - Check code quality
- `npm run lint:fix` - Fix linting issues
- `npm run format` - Format code with Prettier

## 🧪 Testing

The project includes comprehensive testing setup with:

- **Unit Tests**: Component and utility function testing
- **Integration Tests**: End-to-end workflow testing
- **Test Coverage**: Detailed coverage reporting
- **Mock Data**: Realistic test data for development

Run tests with:

```bash
npm run test
npm run test:coverage
```

## 📱 Responsive Design

The application is built with a mobile-first approach, ensuring optimal performance across all devices:

- **Desktop**: Full-featured interface with advanced controls
- **Tablet**: Optimized layout for medium screens
- **Mobile**: Touch-friendly interface with simplified navigation

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=your_api_url
VITE_APP_TITLE=Mini Seller Console
```

### Tailwind Configuration

Customize the design system in `tailwind.config.js`:

- Color palette
- Typography scales
- Spacing and sizing
- Breakpoint definitions

## 📊 Data Structure

### Lead Entity

```typescript
interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  source: string;
  score: number;
  status: LeadStatus;
}
```

### Opportunity Entity

```typescript
interface Opportunity {
  id: string;
  name: string;
  stage: OpportunityStage;
  amount?: number;
  accountName: string;
}
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel/Netlify

The project is optimized for modern deployment platforms with:

- Optimized bundle splitting
- Static asset optimization
- Environment variable support
- Automatic CI/CD integration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards

- Follow TypeScript best practices
- Maintain 100% test coverage
- Use conventional commit messages
- Follow the established component patterns

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with modern React patterns and best practices
- Inspired by enterprise sales management systems
- Designed for developer productivity and maintainability

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**
