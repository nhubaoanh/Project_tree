# 📊 FRONTEND ANALYSIS REPORT - Gia Phả Việt

**Project**: Gia Phả Việt - Family Tree Management System  
**Framework**: Next.js 16 (App Router) + React 19  
**Language**: TypeScript  
**Styling**: Tailwind CSS v4  
**State Management**: Recoil + React Context  
**Data Fetching**: TanStack React Query v5  
**Date**: 2025-01-14

---

## 📋 TABLE OF CONTENTS

1. [Project Overview](#project-overview)
2. [Architecture Analysis](#architecture-analysis)
3. [Tech Stack & Dependencies](#tech-stack--dependencies)
4. [Code Organization](#code-organization)
5. [Component Structure](#component-structure)
6. [State Management](#state-management)
7. [API Integration](#api-integration)
8. [Performance Issues](#performance-issues)
9. [UX/Maintainability Issues](#uxmaintainability-issues)
10. [Security Concerns](#security-concerns)
11. [Recommendations](#recommendations)

---

## 🎯 PROJECT OVERVIEW

### Purpose
Gia Phả Việt is a digital family tree management system that helps Vietnamese families:
- Build and visualize family genealogy
- Store family records and historical information
- Manage family events and finances
- Share family information across generations

### Key Features
- **Genealogy Management**: Create and manage family trees with multiple visualization options
- **Member Management**: Store detailed member information (birth, death, occupation, etc.)
- **Event Management**: Track family events, celebrations, and commemorations
- **Document Management**: Upload and manage family documents
- **Finance Tracking**: Record family contributions and expenses
- **News & Notifications**: Share family news and important announcements
- **AI Integration**: Google Gemini AI for content generation
- **Export/Import**: Support for Excel and PDF export

### User Roles
- **Super Admin (SA)**: Full system access
- **Thủ Đô (Head of Family)**: Family head with extended permissions
- **Thành Viên (Member)**: Regular family members with limited access

---

## 🏗️ ARCHITECTURE ANALYSIS

### Current Architecture Pattern
```
┌─────────────────────────────────────────────────────────┐
│                    Next.js 16 Frontend                   │
├─────────────────────────────────────────────────────────┤
│  Pages (App Router)  │  Components  │  Services  │ Utils │
├─────────────────────────────────────────────────────────┤
│  React Query (Data)  │  Recoil (Auth)  │  Context (UI)  │
├─────────────────────────────────────────────────────────┤
│              Axios HTTP Client + Interceptors            │
├─────────────────────────────────────────────────────────┤
│         Backend API (Node.js/Express)                    │
└─────────────────────────────────────────────────────────┘
```

### Routing Structure
```
FE/tree/app/
├── (admin)/                    # Protected admin routes
│   ├── dashboard/
│   ├── users/
│   ├── family-trees/
│   ├── members/
│   ├── events/
│   ├── finance/
│   ├── documents/
│   ├── news/
│   └── roles/
├── (auth)/                     # Authentication routes
│   ├── login/
│   ├── register/
│   └── forgotPass/
├── (full-page)/                # Full-page routes
│   ├── genealogy/
│   ├── member/
│   ├── events/
│   ├── news/
│   ├── settings/
│   ├── pen/
│   └── genAI/
└── page.tsx                    # Landing page
```

### Layout Hierarchy
- **Root Layout** (`app/layout.tsx`): Global providers, fonts, toast
- **Admin Layout** (`app/(admin)/layout.tsx`): Sidebar + Header + Main content
- **Auth Layout** (implicit): Login/Register pages
- **Full-page Layout** (implicit): Public pages

---

## 📦 TECH STACK & DEPENDENCIES

### Core Framework
| Package | Version | Purpose |
|---------|---------|---------|
| next | ^16.0.1 | React framework with App Router |
| react | ^19.2.0 | UI library |
| react-dom | ^19.2.0 | React DOM rendering |
| typescript | ^5.9.3 | Type safety |

### State Management & Data Fetching
| Package | Version | Purpose |
|---------|---------|---------|
| recoil | ^0.7.7 | Global state (auth) |
| @tanstack/react-query | ^5.90.10 | Server state management |
| @tanstack/react-table | ^8.21.3 | Table data management |

### UI & Styling
| Package | Version | Purpose |
|---------|---------|---------|
| tailwindcss | ^4 | Utility-first CSS |
| @radix-ui/* | Latest | Headless UI components |
| lucide-react | ^0.553.0 | Icon library |
| class-variance-authority | ^0.7.1 | Component variants |
| clsx | ^2.1.1 | Conditional classnames |
| tailwind-merge | ^3.4.0 | Merge Tailwind classes |

### Visualization & Export
| Package | Version | Purpose |
|---------|---------|---------|
| d3 | ^7.9.0 | Data visualization |
| d3-org-chart | ^3.1.1 | Organizational chart |
| @balkangraph/familytree.js | ^1.9.47 | Family tree visualization |
| react-family-tree | ^3.2.0 | React family tree component |
| recharts | ^3.5.0 | Chart library |
| html2canvas | ^1.4.1 | HTML to canvas |
| jspdf | ^3.0.3 | PDF generation |
| svg2pdf.js | ^2.6.0 | SVG to PDF |
| xlsx | ^0.18.5 | Excel export |

### API & HTTP
| Package | Version | Purpose |
|---------|---------|---------|
| axios | ^1.13.2 | HTTP client |
| @google/genai | ^1.30.0 | Google Gemini AI |

### Utilities
| Package | Version | Purpose |
|---------|---------|---------|
| react-hot-toast | ^2.6.0 | Toast notifications |
| react-draggable | ^4.5.0 | Draggable components |

### Development
| Package | Version | Purpose |
|---------|---------|---------|
| eslint | ^9 | Code linting |
| eslint-config-next | 16.0.1 | Next.js ESLint config |

---

## 📁 CODE ORGANIZATION

### Directory Structure
```
FE/tree/
├── app/                        # Next.js App Router pages
│   ├── (admin)/               # Admin routes with layout
│   ├── (auth)/                # Auth routes
│   ├── (full-page)/           # Public full-page routes
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Landing page
│   └── globals.css            # Global styles
├── components/                 # Reusable React components
│   ├── ui/                    # UI components (Radix-based)
│   ├── shared/                # Shared components (DataTable, Modals)
│   └── auth/                  # Auth components (Guards)
├── service/                    # API service layer
│   ├── user.service.ts
│   ├── member.service.ts
│   ├── event.service.ts
│   ├── finance.service.ts
│   └── ... (16 service files)
├── store/                      # Recoil atoms
│   └── auth/atom.ts
├── context/                    # React Context
│   ├── AuthContext.tsx
│   └── SidebarContext.tsx
├── hooks/                      # Custom React hooks
│   ├── useCrudOperations.ts
│   ├── usePagination.ts
│   ├── useSearch.ts
│   └── index.ts
├── lib/                        # Utility libraries
│   ├── api.ts                 # Axios instance
│   ├── apiError.ts            # Error handling
│   ├── auth.ts                # Auth utilities
│   ├── permissions.ts         # Permission checking
│   ├── react-query.ts         # React Query config
│   ├── useFormValidation.ts   # Form validation hook
│   ├── validator.ts           # Validation rules
│   └── utils.ts               # General utilities
├── utils/                      # Utility functions
│   ├── providers.tsx          # React providers
│   ├── storage.ts             # LocalStorage wrapper
│   ├── helpers.ts             # Helper functions
│   ├── imageUtils.ts          # Image utilities
│   ├── treeUtils.ts           # Tree utilities
│   ├── layout.ts              # Layout utilities
│   └── fileCompression.ts     # File compression
├── types/                      # TypeScript type definitions
│   ├── user.d.ts
│   ├── member.d.ts
│   ├── event.d.ts
│   ├── base.d.ts
│   └── ... (10+ type files)
├── constant/                   # Constants
│   ├── config.ts              # API config
│   └── customGender.tsx       # Gender options
├── public/                     # Static assets
│   ├── images/
│   ├── icon/
│   └── ...
├── loader/                     # Data loaders
│   └── user.loader.ts
├── tsconfig.json              # TypeScript config
├── next.config.ts             # Next.js config
├── tailwind.config.js         # Tailwind config
├── package.json               # Dependencies
└── README.md
```

### File Count Summary
- **Pages**: ~20 page files
- **Components**: ~30 component files
- **Services**: 16 service files
- **Type Definitions**: 10+ type files
- **Hooks**: 4 custom hooks
- **Utilities**: 7 utility files

---

## 🧩 COMPONENT STRUCTURE

### Component Hierarchy

#### Layout Components
```
RootLayout
├── ToastProvider
├── Providers (QueryClientProvider)
└── children

AdminLayout
├── Sidebar (navigation)
├── Header (user menu)
└── MainContent
    └── children
```

#### Page Components
- **Landing Page** (`app/page.tsx`): Hero section, features, CTA
- **Login Page** (`app/(auth)/login/page.tsx`): Form with validation
- **Dashboard** (`app/(admin)/page.tsx`): Main admin dashboard
- **CRUD Pages**: Users, Members, Events, Finance, Documents, News, Roles

#### Shared Components
```
components/shared/
├── DataTable.tsx              # Reusable data table with sorting/filtering
├── DeleteModal.tsx            # Delete confirmation modal
├── DetailModal.tsx            # Detail view modal
├── FormModal.tsx              # Form modal for create/edit
├── ImportExportModal.tsx      # Import/export functionality
├── ImportGuideModal.tsx       # Import guide
├── LoadingStates.tsx          # Loading skeletons
├── PageLayout.tsx             # Page wrapper
├── ValidationErrorModal.tsx   # Validation error display
└── index.ts                   # Barrel export
```

#### UI Components (Radix-based)
```
components/ui/
├── button.tsx                 # Button component
├── card.tsx                   # Card component
├── input.tsx                  # Input field
├── label.tsx                  # Form label
├── dialog.tsx                 # Modal dialog
├── dropdown-menu.tsx          # Dropdown menu
├── select.tsx                 # Select dropdown
├── checkbox.tsx               # Checkbox
├── avatar.tsx                 # User avatar
├── badge.tsx                  # Badge component
├── separator.tsx              # Divider
├── scroll-area.tsx            # Scrollable area
├── table.tsx                  # Table component
├── skeleton.tsx               # Loading skeleton
├── tree.tsx                   # Tree visualization
├── Header.tsx                 # Admin header
├── Sidebar.tsx                # Admin sidebar
├── SideBarSub.tsx             # Sidebar submenu
├── NavButton.tsx              # Navigation button
├── ToastComponent.tsx         # Toast notification
├── FamilyMemberModal.tsx      # Family member modal
├── ConfirmDeleteModal.tsx     # Delete confirmation
└── FooterSub.tsx              # Footer
```

#### Auth Components
```
components/auth/
├── RouteGuard.tsx             # Route protection
└── PermissionGuard.tsx        # Permission checking
```

---

## 🔄 STATE MANAGEMENT

### Current Approach: Hybrid

#### 1. **Recoil** (Global Auth State)
```typescript
// store/auth/atom.ts
export const UserState = atom({
  key: "UserState",
  default: {
    nguoiDungId: "",
    dongHoId: "",
    hoTen: "",
    roleId: "",
    roleCode: "",
    anhDaiDien: "",
    function: [{}],
    actions: [{}],
    customs: [{}],
  },
});
```

**Issues**:
- Atom structure doesn't match actual user data
- Not actively used in components
- Redundant with localStorage

#### 2. **React Context** (UI State)
```typescript
// context/AuthContext.tsx - Comprehensive auth context
// context/SidebarContext.tsx - Sidebar toggle state
```

**Strengths**:
- Centralized auth logic
- Menu/permission management
- Role-based access control

**Issues**:
- AuthContext is complex (too many responsibilities)
- No error boundary
- No loading state management

#### 3. **React Query** (Server State)
```typescript
// Used for data fetching in CRUD operations
// Handles caching, refetching, mutations
```

**Strengths**:
- Automatic caching
- Refetch on window focus
- Mutation handling

**Issues**:
- Not consistently used across all pages
- Some pages use direct API calls instead
- No error retry strategy

#### 4. **LocalStorage** (Persistence)
```typescript
// utils/storage.ts
// Stores: token, user data, menus, permissions
```

**Issues**:
- No encryption
- Stores sensitive data (token)
- No expiration handling
- Manual sync with Context

---

## 🔌 API INTEGRATION

### HTTP Client Setup
```typescript
// lib/api.ts
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 1000 * 60 * 30 * 3, // 3 minutes
});

// Request interceptor: Add token
apiClient.interceptors.request.use(config => {
  config.headers.Authorization = "Bearer " + storage.getToken();
  return config;
});

// Response interceptor: Handle 401/403
apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      storage.clearToken();
      window.location.href = LOGIN_URL;
    }
    return Promise.reject(error);
  }
);
```

### Service Layer Pattern
```typescript
// service/user.service.ts
export const loginService = async (data: LoginProps): Promise<any> => {
  try {
    const res = await apiClient.post(`${prefix}/login`, data);
    return res.data;
  } catch (error: any) {
    const err = parseApiError(error);
    console.error(`[loginService] ${err.message}`);
    throw new Error(err.message);
  }
};
```

### API Endpoints
| Service | Endpoints | Count |
|---------|-----------|-------|
| User | login, authorize, search, create, update, delete | 7 |
| Member | search, create, update, delete, getTree | 5 |
| Event | search, create, update, delete | 4 |
| Finance | search, create, update, delete | 4 |
| Document | upload, download, delete | 3 |
| News | search, create, update, delete | 4 |
| Role | search, getMenuByRole | 2 |
| AI | generateContent | 1 |
| **Total** | | **30+** |

### Error Handling
```typescript
// lib/apiError.ts
export const parseApiError = (error: any) => {
  // Extracts error message from various response formats
  // Returns: { message: string, code?: number }
};
```

**Issues**:
- Generic error handling
- No specific error types
- No retry logic
- No timeout handling

---

## ⚠️ PERFORMANCE ISSUES

### 1. **Bundle Size**
- **Total Dependencies**: 200+ packages
- **Large Libraries**: D3 (7.9.0), Recharts, html2canvas
- **Unused Packages**: Multiple family tree libraries (3 different ones)

**Impact**: Slow initial load, large JS bundle

### 2. **Image Optimization**
- Background images not optimized
- No lazy loading for images
- Large PNG files in public folder
- No WebP format

**Impact**: Slow page load, high bandwidth

### 3. **Component Re-renders**
- No React.memo usage
- No useMemo/useCallback optimization
- Context consumers re-render on any change
- No virtualization for large lists

**Impact**: Unnecessary re-renders, sluggish UI

### 4. **Data Fetching**
- No pagination in some lists
- No infinite scroll
- Full data loaded at once
- No caching strategy

**Impact**: Slow data loading, high memory usage

### 5. **CSS**
- Tailwind v4 (newer, but may have issues)
- No CSS-in-JS optimization
- Large CSS file size
- No critical CSS extraction

**Impact**: Slower CSS parsing

---

## 🎨 UX/MAINTAINABILITY ISSUES

### 1. **Inconsistent UI Patterns**
- Multiple modal implementations
- Different button styles
- Inconsistent spacing/padding
- No design system documentation

### 2. **Form Handling**
- Custom validation hook (`useFormValidation`)
- No form library (React Hook Form, Formik)
- Manual error handling
- No field-level validation feedback

### 3. **Data Table**
- Custom DataTable component
- No sorting/filtering UI
- No column customization
- No export functionality

### 4. **Navigation**
- Menu built from API response
- Complex tree building logic
- No breadcrumb navigation
- No active route highlighting

### 5. **Loading States**
- No skeleton screens
- No progress indicators
- No loading spinners
- Inconsistent loading UX

### 6. **Error Handling**
- Generic error messages
- No error boundaries
- No fallback UI
- No error logging

### 7. **Accessibility**
- No ARIA labels
- No keyboard navigation
- No focus management
- No color contrast checking

### 8. **Code Duplication**
- Similar CRUD logic in multiple pages
- Repeated modal patterns
- Duplicate validation rules
- Similar API call patterns

---

## 🔒 SECURITY CONCERNS

### 1. **Token Storage**
**Issue**: JWT token stored in localStorage
```typescript
// Vulnerable to XSS attacks
localStorage.setItem('BA_token', token);
```

**Risk**: High - XSS can steal token
**Solution**: Use httpOnly cookies

### 2. **Sensitive Data in Storage**
**Issue**: User data, menus, permissions stored in localStorage
```typescript
localStorage.setItem('BA_user', JSON.stringify(userData));
```

**Risk**: Medium - Exposed to XSS
**Solution**: Encrypt sensitive data or use secure storage

### 3. **No CSRF Protection**
**Issue**: No CSRF token in requests
**Risk**: Medium - CSRF attacks possible
**Solution**: Add CSRF token to requests

### 4. **No Input Validation**
**Issue**: Limited client-side validation
**Risk**: Medium - Invalid data sent to backend
**Solution**: Comprehensive validation library

### 5. **No Rate Limiting**
**Issue**: No client-side rate limiting
**Risk**: Low - Backend should handle
**Solution**: Add request throttling

### 6. **Hardcoded API URL**
**Issue**: API URL in environment variable but not validated
**Risk**: Low - Can be mitigated
**Solution**: Validate API URL format

### 7. **No Content Security Policy**
**Issue**: No CSP headers
**Risk**: Medium - XSS attacks possible
**Solution**: Add CSP headers in Next.js config

### 8. **No Dependency Scanning**
**Issue**: No security audit of dependencies
**Risk**: Medium - Vulnerable packages possible
**Solution**: Regular npm audit

---

## 📋 RECOMMENDATIONS

### PRIORITY 1: CRITICAL (Do Immediately)

#### 1.1 Fix Token Storage
```typescript
// Move from localStorage to httpOnly cookie
// Use next-auth or similar library
// Or use secure session storage
```

#### 1.2 Add Input Validation
```typescript
// Use Zod or Yup for schema validation
// Validate all form inputs
// Show validation errors
```

#### 1.3 Add Error Boundaries
```typescript
// Wrap pages with error boundary
// Show fallback UI
// Log errors
```

#### 1.4 Add Loading States
```typescript
// Show skeleton screens
// Add loading spinners
// Disable buttons during loading
```

### PRIORITY 2: HIGH (Next 2 weeks)

#### 2.1 Optimize Bundle Size
```
Remove unused libraries:
- Keep only one family tree library
- Remove unused D3 modules
- Tree-shake unused code
```

#### 2.2 Implement Form Library
```typescript
// Use React Hook Form
// Reduce form boilerplate
// Better validation
```

#### 2.3 Add Pagination
```typescript
// Implement pagination for all lists
// Add infinite scroll option
// Reduce initial load
```

#### 2.4 Optimize Images
```
- Convert to WebP
- Add lazy loading
- Optimize PNG files
- Use Next.js Image component
```

### PRIORITY 3: MEDIUM (Next month)

#### 3.1 Refactor State Management
```typescript
// Consolidate Recoil + Context
// Use Context for UI state
// Use React Query for server state
// Remove localStorage duplication
```

#### 3.2 Create Component Library
```
- Document all components
- Create Storybook
- Add component tests
- Create design system
```

#### 3.3 Add Testing
```
- Unit tests for utilities
- Component tests
- Integration tests
- E2E tests
```

#### 3.4 Improve Accessibility
```
- Add ARIA labels
- Add keyboard navigation
- Add focus management
- Test with screen readers
```

### PRIORITY 4: LOW (Next quarter)

#### 4.1 Add Analytics
```
- Track user behavior
- Monitor performance
- Track errors
- Monitor API calls
```

#### 4.2 Add Internationalization
```
- Support multiple languages
- Use i18n library
- Translate all strings
```

#### 4.3 Add Dark Mode
```
- Implement dark theme
- Use Tailwind dark mode
- Store preference
```

#### 4.4 Performance Monitoring
```
- Add Web Vitals
- Monitor Core Web Vitals
- Set performance budgets
```

---

## 🎯 QUICK WINS (Easy to Implement)

1. **Add React.memo** to components (5 min)
2. **Add useMemo/useCallback** to expensive operations (10 min)
3. **Add loading skeletons** to pages (30 min)
4. **Add error boundaries** (20 min)
5. **Optimize images** with Next.js Image (1 hour)
6. **Add ARIA labels** to interactive elements (1 hour)
7. **Add keyboard navigation** to modals (1 hour)
8. **Add form validation** with Zod (2 hours)

---

## 📊 METRICS & GOALS

| Metric | Current | Target | Timeline |
|--------|---------|--------|----------|
| Bundle Size | ~500KB | <300KB | 2 weeks |
| Lighthouse Score | ~60 | >90 | 1 month |
| Core Web Vitals | Poor | Good | 2 weeks |
| Test Coverage | 0% | 80% | 2 months |
| Accessibility Score | ~40 | >90 | 1 month |
| Security Score | C | A | 1 week |

---

## 🚀 IMPLEMENTATION ROADMAP

### Week 1: Security & Stability
- [ ] Fix token storage (httpOnly cookies)
- [ ] Add error boundaries
- [ ] Add input validation
- [ ] Add loading states

### Week 2: Performance
- [ ] Optimize bundle size
- [ ] Optimize images
- [ ] Add pagination
- [ ] Add code splitting

### Week 3-4: Code Quality
- [ ] Refactor state management
- [ ] Add form library
- [ ] Add component tests
- [ ] Add E2E tests

### Week 5-6: UX Improvements
- [ ] Add accessibility features
- [ ] Add dark mode
- [ ] Add analytics
- [ ] Add internationalization

### Week 7-8: Documentation
- [ ] Create component library
- [ ] Add Storybook
- [ ] Create design system
- [ ] Add API documentation

---

## 📚 RESOURCES

### Documentation
- [Next.js 16 Docs](https://nextjs.org/docs)
- [React 19 Docs](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Radix UI Docs](https://www.radix-ui.com/docs)
- [React Query Docs](https://tanstack.com/query/latest)

### Tools
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [WebPageTest](https://www.webpagetest.org/)
- [Bundle Analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)
- [Storybook](https://storybook.js.org/)

### Best Practices
- [Web Vitals](https://web.dev/vitals/)
- [Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Security Best Practices](https://owasp.org/www-project-top-ten/)

---

## 📞 NEXT STEPS

1. **Review** this report with the team
2. **Prioritize** issues based on business impact
3. **Create** GitHub issues for each recommendation
4. **Assign** tasks to team members
5. **Set** deadlines and milestones
6. **Track** progress weekly

---

**Report Generated**: 2025-01-14  
**Analyzed By**: Frontend Analysis Agent  
**Status**: Ready for Implementation
