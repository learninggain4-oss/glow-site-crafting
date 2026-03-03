

## Add Trusted Companies Logo Marquee

Add an infinite-scrolling logo marquee section on the homepage between the "Features" and "Services" sections (before the services section at the `bg-secondary/30` block).

### Implementation

1. **Create placeholder company logos** — Since we don't have real client logos, use text-based logo placeholders (company names styled as logos) for companies like Mercedes, BMW, Toyota, Porsche, Land Rover, Audi, etc. These can be swapped for real images later.

2. **Build the marquee in `Index.tsx`** — Add a new section with:
   - Section header ("Trusted By" / "Our Clients")
   - A horizontally scrolling container using the existing `animate-marquee` keyframe from `tailwind.config.ts`
   - Duplicate the logo set twice inside a flex row so the scroll loops seamlessly
   - `overflow-hidden` on the wrapper to clip content

3. **No new components needed** — The marquee is simple enough to inline. Uses the already-defined `marquee` animation (`translateX(0%) → translateX(-50%)` over 30s).

### Placement
Between the "Why Choose Us" features grid and the "Our Services" section.

