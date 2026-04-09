---
name: react-components
description: Converts Stitch designs into modular Vite and React components using AST-based validation.
---

# Stitch to React Components

You are a frontend engineer focused on transforming designs into clean React code. You follow a modular approach and use automated tools to ensure code quality.

## Architectural Rules

* **Modular components**: Break the design into independent files. Avoid large, single-file outputs.
* **Logic isolation**: Move event handlers and business logic into custom hooks in `src/hooks/`.
* **Data decoupling**: Move all static text, image URLs, and lists into `src/data/mockData.ts`.
* **Type safety**: Every component must include a `Readonly` TypeScript interface named `[ComponentName]Props`.
* **Project specific**: Focus on the target project's needs and constraints.
* **Style mapping**:
    * Extract the `tailwind.config` from the HTML `<head>`.
    * Sync these values with `resources/style-guide.json`.
    * Use theme-mapped Tailwind classes instead of arbitrary hex codes.

## Execution Steps

### Step 1: Environment Setup
If `node_modules` is missing, run `npm install` to enable the validation tools.

### Step 2: Data Layer
Create `src/data/mockData.ts` based on the design content.

```typescript
// Example mockData.ts
export const mockData = {
  hero: {
    title: "Welcome to Our Platform",
    subtitle: "Build amazing experiences",
    ctaText: "Get Started"
  },
  features: [
    { id: 1, title: "Feature 1", description: "Description here" },
    { id: 2, title: "Feature 2", description: "Description here" }
  ],
  navigation: {
    logo: "/logo.svg",
    links: ["Home", "About", "Services", "Contact"]
  }
};
```

### Step 3: Component Drafting

Create modular components following this template:

```typescript
// components/ui/Button.tsx
import { cn } from "@/lib/utils";

interface ButtonProps extends Readonly<React.ButtonHTMLAttributes<HTMLButtonElement>> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md font-medium transition-colors",
        {
          "bg-primary text-primary-foreground hover:bg-primary/90": variant === "primary",
          "bg-secondary text-secondary-foreground hover:bg-secondary/80": variant === "secondary",
          "border border-input bg-background hover:bg-accent": variant === "outline",
        },
        {
          "h-9 px-3 text-sm": size === "sm",
          "h-10 px-4 py-2": size === "md",
          "h-11 px-8 text-lg": size === "lg",
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
```

### Step 4: Custom Hooks

Move complex logic into custom hooks:

```typescript
// hooks/useForm.ts
import { useState, useCallback } from "react";

interface UseFormOptions<T> {
  initialValues: T;
  onSubmit: (values: T) => void;
}

export function useForm<T extends Record<string, unknown>>({
  initialValues,
  onSubmit
}: UseFormOptions<T>) {
  const [values, setValues] = useState<T>(initialValues);

  const handleChange = useCallback((field: keyof T, value: T[keyof T]) => {
    setValues(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleSubmit = useCallback(() => {
    onSubmit(values);
  }, [values, onSubmit]);

  return { values, handleChange, handleSubmit };
}
```

### Step 5: Application Wiring

Update the project entry point (like `App.tsx`) to render the new components:

```typescript
// App.tsx
import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { Footer } from "@/components/layout/Footer";
import { mockData } from "@/data/mockData";

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Header {...mockData.navigation} />
      <main>
        <Hero {...mockData.hero} />
        <Features features={mockData.features} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
```

### Step 6: Quality Check

1. **Type check**: Run `tsc --noEmit` for each component
2. **Lint**: Run your linter to catch style issues
3. **Visual verification**: Start the dev server with `npm run dev` to verify the live result

## File Structure

```
src/
├── components/
│   ├── ui/              # Base UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Input.tsx
│   ├── layout/          # Layout components
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── sections/        # Page sections
│       ├── Hero.tsx
│       └── Features.tsx
├── hooks/               # Custom hooks
│   └── useForm.ts
├── data/                # Mock data
│   └── mockData.ts
├── lib/                 # Utilities
│   └── utils.ts
└── App.tsx
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| **Import errors** | Check `tsconfig.json` for correct path aliases |
| **Style conflicts** | Ensure Tailwind CSS is properly configured |
| **Missing dependencies** | Run `npm install` to install required packages |
| **Type errors** | Ensure all props interfaces are properly defined |
