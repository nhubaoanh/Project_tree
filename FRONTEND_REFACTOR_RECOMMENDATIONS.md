# 🎯 FRONTEND REFACTOR RECOMMENDATIONS

**Project**: Gia Phả Việt Frontend  
**Current Grade**: B-  
**Target Grade**: A  
**Estimated Timeline**: 8 weeks

---

## 🔴 CRITICAL ISSUES (Fix This Week)

### 1. Token Storage Vulnerability
**Severity**: 🔴 CRITICAL  
**Issue**: JWT token stored in localStorage (XSS vulnerable)

```typescript
// ❌ CURRENT (Vulnerable)
localStorage.setItem('BA_token', token);

// ✅ RECOMMENDED
// Option 1: Use httpOnly cookies
// Option 2: Use next-auth library
// Option 3: Use secure session storage
```

**Action Items**:
- [ ] Implement httpOnly cookie storage
- [ ] Update axios interceptor to use cookies
- [ ] Remove token from localStorage
- [ ] Test authentication flow

**Files to Update**:
- `utils/storage.ts`
- `lib/api.ts`
- `app/layout.tsx`

---

### 2. Missing Error Boundaries
**Severity**: 🔴 CRITICAL  
**Issue**: No error boundary - app crashes on component error

```typescript
// ✅ CREATE: components/ErrorBoundary.tsx
'use client';

import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Oops! Something went wrong</h1>
            <button 
              onClick={() => this.setState({ hasError: false })}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
```

**Action Items**:
- [ ] Create ErrorBoundary component
- [ ] Wrap admin layout with ErrorBoundary
- [ ] Add error logging
- [ ] Test error handling

---

### 3. No Input Validation
**Severity**: 🔴 CRITICAL  
**Issue**: Limited validation, invalid data sent to backend

```typescript
// ✅ INSTALL: npm install zod

// ✅ CREATE: lib/schemas.ts
import { z } from 'zod';

export const loginSchema = z.object({
  tenDangNhap: z.string().email('Invalid email'),
  matKhau: z.string().min(6, 'Password must be 6+ chars'),
});

export const memberSchema = z.object({
  hoTen: z.string().min(1, 'Name required'),
  gioiTinh: z.number().min(0).max(2),
  ngaySinh: z.date(),
  // ... more fields
});

// ✅ UPDATE: components/LoginForm.tsx
const { data, error } = loginSchema.safeParse(formData);
if (!data) {
  showError(error.errors[0].message);
  return;
}
```

**Action Items**:
- [ ] Install Zod validation library
- [ ] Create validation schemas for all forms
- [ ] Update form components to use schemas
- [ ] Add field-level error messages
- [ ] Test validation

---

### 4. No Loading States
**Severity**: 🔴 CRITICAL  
**Issue**: No visual feedback during data loading

```typescript
// ✅ CREATE: components/LoadingSkeleton.tsx
export function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-12 bg-gray-200 rounded animate-pulse" />
      ))}
    </div>
  );
}

// ✅ UPDATE: app/(admin)/users/page.tsx
export default function UsersPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  if (isLoading) return <LoadingSkeleton />;
  
  return <DataTable data={data} />;
}
```

**Action Items**:
- [ ] Create skeleton components
- [ ] Add loading states to all pages
- [ ] Add loading spinners to buttons
- [ ] Test loading UX

---

## 🟠 HIGH PRIORITY (Next 2 Weeks)

### 5. Bundle Size Optimization
**Severity**: 🟠 HIGH  
**Issue**: 500KB+ bundle, slow initial load

```typescript
// ✅ ANALYZE: npm install -D @next/bundle-analyzer

// ✅ UPDATE: next.config.ts
import withBundleAnalyzer from '@next/bundle-analyzer';

const nextConfig = {
  // ... existing config
};

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})(nextConfig);

// Run: ANALYZE=true npm run build
```

**Action Items**:
- [ ] Analyze bundle size
- [ ] Remove unused libraries (keep 1 family tree lib)
- [ ] Implement code splitting
- [ ] Add dynamic imports for heavy components
- [ ] Target: <300KB

**Libraries to Remove**:
- `pedigree-tree` (unused)
- `react-family-tree` (duplicate)
- Unused D3 modules

---

### 6. Image Optimization
**Severity**: 🟠 HIGH  
**Issue**: Large unoptimized images, no lazy loading

```typescript
// ✅ UPDATE: app/page.tsx
import Image from 'next/image';

// ❌ BEFORE
<img src="/images/trongdong.png" alt="..." />

// ✅ AFTER
<Image
  src="/images/trongdong.png"
  alt="..."
  width={600}
  height={600}
  priority={false}
  loading="lazy"
  quality={75}
/>
```

**Action Items**:
- [ ] Convert all images to WebP format
- [ ] Use Next.js Image component
- [ ] Add lazy loading
- [ ] Optimize PNG files (use TinyPNG)
- [ ] Target: 50% size reduction

---

### 7. Implement Form Library
**Severity**: 🟠 HIGH  
**Issue**: Custom form validation, lots of boilerplate

```typescript
// ✅ INSTALL: npm install react-hook-form

// ✅ UPDATE: components/LoginForm.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/lib/schemas';

export function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('tenDangNhap')} />
      {errors.tenDangNhap && <span>{errors.tenDangNhap.message}</span>}
    </form>
  );
}
```

**Action Items**:
- [ ] Install React Hook Form
- [ ] Refactor all forms to use library
- [ ] Reduce form boilerplate by 60%
- [ ] Add better error handling

---

### 8. Add Pagination
**Severity**: 🟠 HIGH  
**Issue**: Loading all data at once, slow performance

```typescript
// ✅ UPDATE: hooks/usePagination.ts
export function usePagination(pageSize = 10) {
  const [pageIndex, setPageIndex] = useState(0);
  
  const { data, isLoading } = useQuery({
    queryKey: ['items', pageIndex],
    queryFn: () => getItems({ pageIndex, pageSize }),
  });

  return {
    data: data?.data || [],
    pageIndex,
    pageSize,
    totalPages: data?.totalPages || 0,
    goToPage: setPageIndex,
  };
}
```

**Action Items**:
- [ ] Implement pagination for all lists
- [ ] Add page size selector
- [ ] Add infinite scroll option
- [ ] Update API calls to use pagination

---

## 🟡 MEDIUM PRIORITY (Next Month)

### 9. Refactor State Management
**Severity**: 🟡 MEDIUM  
**Issue**: Hybrid approach (Recoil + Context + localStorage) is confusing

```typescript
// ✅ CONSOLIDATE: Use Context + React Query

// Remove Recoil (unused)
// Use Context for UI state (sidebar, modals)
// Use React Query for server state (data)
// Use localStorage only for non-sensitive data

// ✅ CREATE: context/UIContext.tsx
export const UIContext = createContext();

export function UIProvider({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [modals, setModals] = useState({});

  return (
    <UIContext.Provider value={{ sidebarOpen, setSidebarOpen, modals, setModals }}>
      {children}
    </UIContext.Provider>
  );
}
```

**Action Items**:
- [ ] Remove Recoil dependency
- [ ] Consolidate Context usage
- [ ] Update all components
- [ ] Test state management

---

### 10. Add Component Tests
**Severity**: 🟡 MEDIUM  
**Issue**: 0% test coverage

```typescript
// ✅ INSTALL: npm install -D @testing-library/react vitest

// ✅ CREATE: components/__tests__/Button.test.tsx
import { render, screen } from '@testing-library/react';
import { Button } from '@/components/ui/button';

describe('Button', () => {
  it('renders button with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick handler', () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click</Button>);
    screen.getByText('Click').click();
    expect(onClick).toHaveBeenCalled();
  });
});
```

**Action Items**:
- [ ] Set up testing framework
- [ ] Write tests for utilities
- [ ] Write tests for components
- [ ] Write tests for hooks
- [ ] Target: 80% coverage

---

### 11. Improve Accessibility
**Severity**: 🟡 MEDIUM  
**Issue**: No ARIA labels, poor keyboard navigation

```typescript
// ✅ ADD ARIA LABELS
<button 
  aria-label="Open menu"
  aria-expanded={isOpen}
  onClick={toggleMenu}
>
  <Menu />
</button>

// ✅ ADD KEYBOARD NAVIGATION
useEffect(() => {
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') closeModal();
    if (e.key === 'Enter') submitForm();
  };
  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, []);
```

**Action Items**:
- [ ] Add ARIA labels to all interactive elements
- [ ] Add keyboard navigation to modals
- [ ] Add focus management
- [ ] Test with screen readers
- [ ] Target: >90 accessibility score

---

### 12. Add Analytics
**Severity**: 🟡 MEDIUM  
**Issue**: No user behavior tracking

```typescript
// ✅ INSTALL: npm install next-gtag

// ✅ UPDATE: app/layout.tsx
import { GoogleAnalytics } from 'next-gtag';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <GoogleAnalytics gaId="GA_ID" />
      </body>
    </html>
  );
}
```

**Action Items**:
- [ ] Set up Google Analytics
- [ ] Track page views
- [ ] Track user interactions
- [ ] Set up custom events
- [ ] Monitor performance

---

## 📊 IMPLEMENTATION CHECKLIST

### Week 1: Security & Stability
- [ ] Fix token storage (httpOnly cookies)
- [ ] Add error boundaries
- [ ] Add input validation (Zod)
- [ ] Add loading states
- [ ] Test all changes

### Week 2: Performance
- [ ] Analyze bundle size
- [ ] Remove unused libraries
- [ ] Optimize images
- [ ] Add code splitting
- [ ] Measure improvements

### Week 3-4: Code Quality
- [ ] Implement form library
- [ ] Add pagination
- [ ] Refactor state management
- [ ] Add component tests
- [ ] Improve accessibility

### Week 5-6: UX Improvements
- [ ] Add dark mode
- [ ] Add analytics
- [ ] Add internationalization
- [ ] Create design system
- [ ] Add Storybook

### Week 7-8: Documentation
- [ ] Create component library docs
- [ ] Add API documentation
- [ ] Create developer guide
- [ ] Add deployment guide
- [ ] Create troubleshooting guide

---

## 🎯 SUCCESS METRICS

| Metric | Current | Target | Week |
|--------|---------|--------|------|
| Bundle Size | 500KB | <300KB | 2 |
| Lighthouse Score | 60 | >90 | 4 |
| Core Web Vitals | Poor | Good | 2 |
| Test Coverage | 0% | 80% | 6 |
| Accessibility | 40 | >90 | 4 |
| Security Score | C | A | 1 |
| Page Load Time | 3s+ | <1s | 2 |

---

## 📚 RESOURCES & TOOLS

### Libraries to Add
```json
{
  "zod": "^3.22.0",
  "react-hook-form": "^7.48.0",
  "@hookform/resolvers": "^3.3.0",
  "next-auth": "^4.24.0",
  "next-gtag": "^1.2.0"
}
```

### Development Tools
```json
{
  "@testing-library/react": "^14.0.0",
  "vitest": "^0.34.0",
  "@next/bundle-analyzer": "^14.0.0",
  "storybook": "^7.5.0"
}
```

### Documentation
- [Next.js Best Practices](https://nextjs.org/docs/app/building-your-application/optimizing)
- [React Performance](https://react.dev/reference/react/useMemo)
- [Web Accessibility](https://www.w3.org/WAI/WCAG21/quickref/)
- [Security Best Practices](https://owasp.org/www-project-top-ten/)

---

## 🚀 QUICK WINS (Easy to Implement)

1. **Add React.memo** (5 min) - Prevent unnecessary re-renders
2. **Add useMemo** (10 min) - Memoize expensive calculations
3. **Add useCallback** (10 min) - Memoize callbacks
4. **Add ARIA labels** (1 hour) - Improve accessibility
5. **Optimize images** (2 hours) - Reduce bundle size
6. **Add loading skeletons** (1 hour) - Improve UX
7. **Add error boundaries** (30 min) - Prevent crashes
8. **Add form validation** (2 hours) - Improve data quality

---

## 📞 NEXT STEPS

1. **Review** this document with the team
2. **Prioritize** based on business impact
3. **Create** GitHub issues for each item
4. **Assign** tasks to team members
5. **Set** weekly milestones
6. **Track** progress in project board
7. **Review** weekly in team meetings

---

**Document Version**: 1.0  
**Last Updated**: 2025-01-14  
**Status**: Ready for Implementation  
**Estimated Effort**: 8 weeks (1 developer)
