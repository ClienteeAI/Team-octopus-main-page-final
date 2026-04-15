---
name: generating-ui-ux-design
description: Provides design intelligence for building professional UI/UX across multiple platforms and frameworks. Includes 67 styles, 161 industrial reasoning rules, and 57 font pairings. Use when the user requests UI/UX work, design systems, or component implementation.
---

# UI UX Pro Max

This skill provides a comprehensive design guide and reasoning engine for web and mobile applications. It contains 67 styles, 161 industry-specific color palettes, 57 font pairings, 99 UX guidelines, and 25 chart types across 13 technology stacks.

## When to use this skill
- Designing a new landing page or dashboard.
- Selecting color palettes and typography for a specific industry (e.g., Fintech, SaaS).
- Implementing UI components using React, Tailwind, or shadcn/ui.
- Reviewing existing UI for accessibility and professional standards.

## Workflow (Superpowers Alignment)

Follow this systematic process for all UI/UX tasks:

1.  **Brainstorming**: Analyze user requirements (Product type, style, industry, stack).
2.  **Design System Generation**: Run the reasoning engine first to establish a Source of Truth.
3.  **Cross-Reference Brand**: Check [.agent/skills/brand-identity/SKILL.md](../brand-identity/SKILL.md) for project-specific constraints.
4.  **Implementation Planning**: Break down the design into small, verifiable tasks.
5.  **Execution & TDD**: Implement components with failing tests first when logic is involved.
6.  **Verification**: Use the Pre-Delivery Checklist below.

## Instructions

### 1. Generate Design System (REQUIRED)

**Always start with `--design-system`** to get comprehensive recommendations with reasoning:

```bash
python3 .agent/skills/ui-ux-pro-max/scripts/search.py "<product_type> <industry> <keywords>" --design-system [-p "Project Name"]
```

Example:
```bash
python3 .agent/skills/ui-ux-pro-max/scripts/search.py "fintech dashboard analytics dark" --design-system -p "Octopus Finance"
```

### 2. Persist & Retrieve (Master + Overrides Pattern)

To save the design system for hierarchical retrieval across sessions, add `--persist`:

```bash
python3 .agent/skills/ui-ux-pro-max/scripts/search.py "<query>" --design-system --persist -p "Project Name"
```

This creates:
- `design-system/MASTER.md` — Global Source of Truth.
- `design-system/pages/` — Page-specific deviations.

### 3. Detailed Search Domains

Use specific domains for deeper intelligence:

| Need | Domain | Command |
|------|--------|---------|
| General Style | `style` | `python3 .agent/skills/ui-ux-pro-max/scripts/search.py "glassmorphism" --domain style` |
| Charts | `chart` | `python3 .agent/skills/ui-ux-pro-max/scripts/search.py "dashboard" --domain chart` |
| UX Rules | `ux` | `python3 .agent/skills/ui-ux-pro-max/scripts/search.py "animation" --domain ux` |
| Typography | `typography` | `python3 .agent/skills/ui-ux-pro-max/scripts/search.py "modern" --domain typography` |

### 4. Stack-Specific Guidelines

Default to `html-tailwind` if no stack is specified.

```bash
python3 .agent/skills/ui-ux-pro-max/scripts/search.py "<keyword>" --stack react
```
*Available stacks: html-tailwind, react, nextjs, vue, svelte, swiftui, react-native, flutter, shadcn, jetpack-compose.*

## Pre-Delivery Checklist

Before delivering UI code, verify these items:

### Visual & Interaction
- [ ] No emojis used as icons (use SVG: Heroicons/Lucide).
- [ ] All clickable elements have `cursor-pointer`.
- [ ] Hover states provide clear feedback and don't cause layout shifts.
- [ ] Transitions are smooth (150-300ms).

### Accessibility & Layout
- [ ] Contrast ratio 4.5:1 minimum (WCAG AA).
- [ ] Borders visible in both light/dark modes.
- [ ] Responsive at 375px, 768px, 1024px, 1440px.
- [ ] No horizontal scroll on mobile.

## Resources
- [Scripts](scripts/)
- [Data](data/)
- [Design Systems](../../design-system/)
