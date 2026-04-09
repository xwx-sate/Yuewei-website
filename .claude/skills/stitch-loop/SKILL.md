---
name: stitch-loop
description: Teaches agents to iteratively build websites using Stitch with an autonomous baton-passing loop pattern
---

# Stitch Build Loop

You are an **autonomous frontend builder** participating in an iterative site-building loop. Your goal is to generate a page using Stitch, integrate it into the site, and prepare instructions for the next iteration.

## Overview

The Build Loop pattern enables continuous, autonomous website development through a "baton" system. Each iteration:
1. Reads the current task from a baton file (`.stitch/next-prompt.md`)
2. Generates a page using Stitch
3. Integrates the page into the site structure
4. Writes the next task to the baton file for the next iteration

## Prerequisites

**Required:**
- A Stitch project (existing or will be created)
- A `.stitch/DESIGN.md` file (generate one using the `design-md` skill if needed)
- A `.stitch/SITE.md` file documenting the site vision and roadmap

## The Baton System

The `.stitch/next-prompt.md` file acts as a relay baton between iterations:

```markdown
---
page: about
---
A page describing how the product works.

**DESIGN SYSTEM (REQUIRED):**
[Copy from .stitch/DESIGN.md Section 6]

**Page Structure:**
1. Header with navigation
2. Explanation section
3. Footer with links
```

**Critical rules:**
- The `page` field in YAML frontmatter determines the output filename
- The prompt content must include the design system block from `.stitch/DESIGN.md`
- You MUST update this file before completing your work to continue the loop

## Execution Protocol

### Step 1: Read the Baton
Parse `.stitch/next-prompt.md` to extract:
- **Page name** from the `page` frontmatter field
- **Prompt content** from the markdown body

### Step 2: Consult Context Files

Before generating, read these files:

| File | Purpose |
|------|---------|
| `.stitch/SITE.md` | Site vision, Project ID, existing pages (sitemap), roadmap |
| `.stitch/DESIGN.md` | Required visual style for prompts |

**Important checks:**
- Section 4 (Sitemap) - Do NOT recreate pages that already exist
- Section 5 (Roadmap) - Pick tasks from here if backlog exists
- Section 6 (Creative Freedom) - Ideas for new pages if roadmap is empty

### Step 3: Generate with Stitch

Generate the page using the enhanced prompt with design system context.

### Step 4: Integrate into Site

1. Move generated HTML from `.stitch/designs/{page}.html` to `site/public/{page}.html`
2. Fix any asset paths to be relative to the public folder
3. Update navigation:
   - Find existing placeholder links and wire them to the new page
   - Add the new page to the global navigation if appropriate
4. Ensure consistent headers/footers across all pages

### Step 5: Update Site Documentation

Modify `.stitch/SITE.md`:
- Add the new page to Section 4 (Sitemap) with `[x]`
- Remove any idea you consumed from Section 6 (Creative Freedom)
- Update Section 5 (Roadmap) if you completed a backlog item

### Step 6: Prepare the Next Baton (Critical)

**You MUST update `.stitch/next-prompt.md` before completing.** This keeps the loop alive.

1. **Decide the next page**:
   - Check `.stitch/SITE.md` Section 5 (Roadmap) for pending items
   - If empty, pick from Section 6 (Creative Freedom)
   - Or invent something new that fits the site vision
2. **Write the baton** with proper YAML frontmatter

## File Structure Reference

```
project/
├── .stitch/
│   ├── metadata.json   # Project & screen IDs
│   ├── DESIGN.md       # Visual design system
│   ├── SITE.md         # Site vision, sitemap, roadmap
│   ├── next-prompt.md  # The baton - current task
│   └── designs/        # Staging area for output
│       ├── {page}.html
│       └── {page}.png
└── site/public/        # Production pages
    ├── index.html
    └── {page}.html
```

## Common Pitfalls

- Forgetting to update `.stitch/next-prompt.md` (breaks the loop)
- Recreating a page that already exists in the sitemap
- Not including the design system block from `.stitch/DESIGN.md` in the prompt
- Leaving placeholder links (`href="#"`) instead of wiring real navigation
