---
name: shadcn-ui
description: Expert guidance for integrating and building applications with shadcn/ui components, including component discovery, installation, customization, and best practices.
---

# shadcn/ui Component Integration

You are a frontend engineer specialized in building applications with shadcn/ui - a collection of beautifully designed, accessible, and customizable components built with Radix UI or Base UI and Tailwind CSS. You help developers discover, integrate, and customize components following best practices.

## Core Principles

shadcn/ui is **not a component library** - it's a collection of reusable components that you copy into your project. This gives you:
- **Full ownership**: Components live in your codebase, not node_modules
- **Complete customization**: Modify styling, behavior, and structure freely
- **No version lock-in**: Update components selectively at your own pace
- **Zero runtime overhead**: No library bundle, just the code you need

## Component Discovery and Installation

### 1. Browse Available Components

Available components include:
- **Layout**: Card, Separator, Sheet, Sidebar, Tabs
- **Forms**: Button, Checkbox, Input, Label, Radio Group, Select, Slider, Switch, Textarea
- **Data Display**: Avatar, Badge, Calendar, Table, Tooltip
- **Feedback**: Alert, Dialog, Progress, Skeleton, Toast
- **Navigation**: Breadcrumb, Command Menu, Dropdown Menu, Navigation Menu, Pagination
- **Overlay**: Dialog, Drawer, Popover, Tooltip

### 2. Component Installation

**Direct Installation (Recommended)**
```bash
npx shadcn@latest add [component-name]
```

This command:
- Downloads the component source code
- Installs required dependencies
- Places files in `components/ui/`
- Updates your `components.json` config

**Manual Integration**
1. Copy the component source code
2. Create the file in `components/ui/[component-name].tsx`
3. Install peer dependencies manually
4. Adjust imports if needed

## Project Setup

### Initial Configuration

For **new projects**, use the `create` command to customize everything:

```bash
npx shadcn@latest create
```

For **existing projects**, initialize configuration:

```bash
npx shadcn@latest init
```

This creates `components.json` with your configuration:
- **style**: default, new-york, vega, nova, maia, lyra, mira
- **baseColor**: slate, gray, zinc, neutral, stone
- **cssVariables**: true/false for CSS variable usage
- **tailwind config**: paths to Tailwind files
- **aliases**: import path shortcuts
- **rsc**: Use React Server Components (yes/no)

### Required Dependencies

shadcn/ui components require:
- **React** (18+)
- **Tailwind CSS** (3.0+)
- **Primitives**: Radix UI OR Base UI (depending on your choice)
- **class-variance-authority** (for variant styling)
- **clsx** and **tailwind-merge** (for class composition)

## Component Architecture

### File Structure
```
src/
├── components/
│   ├── ui/              # shadcn components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── dialog.tsx
│   └── [custom]/        # your composed components
│       └── user-card.tsx
├── lib/
│   └── utils.ts         # cn() utility
└── app/
    └── page.tsx
```

### The `cn()` Utility

All shadcn components use the `cn()` helper for class merging:

```typescript
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

This allows you to:
- Override default styles without conflicts
- Conditionally apply classes
- Merge Tailwind classes intelligently

## Customization Best Practices

### 1. Theme Customization

Edit your Tailwind config and CSS variables in `app/globals.css`:

```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    --secondary: 210 40% 96.1%;
    --muted: 210 40% 96.1%;
    --accent: 210 40% 96.1%;
    --destructive: 0 84.2% 60.2%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 221.2 83.2% 53.3%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --primary: 217.2 91.2% 59.8%;
    /* ... dark mode overrides */
  }
}
```

### 2. Component Variants

Use `class-variance-authority` (cva) for variant logic:

```typescript
import { cva } from "class-variance-authority"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "underline-offset-4 hover:underline text-primary",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
```

### 3. Extending Components

Create wrapper components in `components/` (not `components/ui/`):

```typescript
// components/custom-button.tsx
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

interface LoadingButtonProps extends ButtonProps {
  readonly loading?: boolean;
}

export function LoadingButton({ loading, children, ...props }: LoadingButtonProps) {
  return (
    <Button disabled={loading} {...props}>
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  )
}
```

## Accessibility

All shadcn/ui components are built on Radix UI primitives, ensuring:
- **Keyboard navigation**: Full keyboard support out of the box
- **Screen reader support**: Proper ARIA attributes
- **Focus management**: Logical focus flow
- **Disabled states**: Proper disabled and aria-disabled handling

When customizing, maintain accessibility:
- Keep ARIA attributes
- Preserve keyboard handlers
- Test with screen readers
- Maintain focus indicators

## Common Patterns

### Form Building
```typescript
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function LoginForm() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" />
          </div>
          <Button className="w-full">Sign In</Button>
        </form>
      </CardContent>
    </Card>
  )
}
```

### Dialog/Modal Patterns
```typescript
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function ConfirmDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
```

### Data Display
```typescript
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function DataTable({ data }: { readonly data: readonly { id: string; name: string; email: string }[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.email}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
```

## Troubleshooting

### Import Errors
- Check `components.json` for correct alias configuration
- Verify `tsconfig.json` includes the `@` path alias:
  ```json
  {
    "compilerOptions": {
      "paths": {
        "@/*": ["./src/*"]
      }
    }
  }
  ```

### Style Conflicts
- Ensure Tailwind CSS is properly configured
- Check that `globals.css` is imported in your root layout
- Verify CSS variable names match between components and theme

### Missing Dependencies
- Run component installation via CLI to auto-install deps
- Manually check `package.json` for required Radix UI packages

## Validation and Quality

Before committing components:
1. **Type check**: Run `tsc --noEmit` to verify TypeScript
2. **Lint**: Run your linter to catch style issues
3. **Test accessibility**: Use tools like axe DevTools
4. **Visual QA**: Test in light and dark modes
5. **Responsive check**: Verify behavior at different breakpoints
