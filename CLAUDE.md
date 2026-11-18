@AGENTS.md

# Balcony: ticket booking platform (frontend rules)

Monorepo: `apps/web` (user app), `apps/admin` (admin panel), `apps/api` (NestJS). These rules apply to `apps/web` and `apps/admin`. Both use Feature-Sliced Design (FSD).

## Stack (do not substitute)

- Next.js App Router with TypeScript strict. No Pages Router.
- Redux Toolkit for client state. RTK Query for every API call.
- shadcn/ui for components. Tailwind CSS for all styling.
- React Hook Form + Zod for forms.
- Package manager: pnpm.

Do NOT add any of these: another state library (Zustand, Jotai, MobX, Recoil), another data-fetching library (TanStack Query, SWR, axios), another UI kit (MUI, Chakra, Ant Design, Bootstrap), CSS modules, styled-components, or inline `style={{}}` except for values computed at runtime.

Before adding any new dependency, stop and ask me. Say what it is for and what it costs in bundle size.

## Commands

- `pnpm dev` runs everything. `pnpm --filter web dev` runs one app.
- After every change run: `pnpm lint && pnpm typecheck`. Fix all errors before saying the task is done.
- Add a shadcn component with `pnpm dlx shadcn@latest add <name>` from the app folder. It is configured to write into `shared/ui`. Never hand-write a component that shadcn already provides.

## Naming conventions

- Files and folders: **kebab-case** (e.g. `seat-picker.tsx`, `features/select-seats/`).
- Functions and variables: **camelCase** (e.g. `getTotalPrice`, `selectedSeats`).
- React components: PascalCase (React requires this), exported as named exports.
- Types: PascalCase (e.g. `type Props`, `type Booking`).
- No default exports except Next.js route files.

## Folder structure (Feature-Sliced Design)

```
apps/web/src/
├── app/                      # Next.js routes + composition only
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── (main)/
│   │   ├── page.tsx                       # home
│   │   ├── movies/[movieId]/page.tsx
│   │   ├── events/
│   │   ├── checkout/[bookingId]/page.tsx
│   │   └── bookings/page.tsx
│   ├── layout.tsx
│   ├── providers.tsx                      # "use client": Redux Provider, Toaster
│   └── globals.css
│
├── widgets/                  # big composed blocks for one page section
│   └── seat-map/ | header/ | movie-grid/ | showtime-list/ | booking-summary/
│
├── features/                 # one user action each
│   └── select-seats/ | hold-seats/ | pay-booking/ | cancel-booking/ | verify-otp/ | auth-by-email/ | post-review/ | filter-movies/
│
├── entities/                 # business nouns
│   └── movie/ | show/ | seat/ | booking/ | payment/ | user/ | theatre/ | review/
│
└── shared/                   # reusable, knows nothing about the business
    ├── ui/                   # shadcn components live here
    ├── lib/                  # cn(), formatters, hooks
    ├── api/                  # base-api.ts (createApi), baseQuery, tagTypes
    ├── config/               # env.ts, constants
    └── types/
```

Every slice (a folder inside `widgets`, `features` or `entities`) uses these segments:

```
features/select-seats/
├── ui/            seat-picker.tsx
├── model/         slice.ts, selectors.ts
├── api/           endpoints injected into shared/api
├── lib/           helpers for this slice only
└── index.ts       public API: the ONLY file other slices may import from
```

## Import rules (enforced by ESLint; a wrong import fails CI)

- Layers import downwards only: `app → widgets → features → entities → shared`. Never upwards.
- A slice never imports from another slice on the same layer. Need both? Compose them in a higher layer.
- Import only from a slice's `index.ts`: `@/features/select-seats`. Never reach inside: `@/features/select-seats/model/slice` is forbidden.
- `shared` imports nothing from the business layers.

## Which layer does this go in?

| Question | Layer |
| --- | --- |
| Is it a user action with a verb? (select seats, pay, cancel, verify OTP) | features |
| Is it a business noun and its data? (movie, seat, booking) | entities |
| Is it a whole page section built from features and entities? (seat map, header) | widgets |
| Could it be copied to an unrelated project? (Button, cn, date format) | shared |
| Is it a route, a layout or a provider? | app |

## Component rules

- One component per file. If a file passes about 150 lines or does more than one job, split it.
- `app/` pages stay under about 50 lines: they compose widgets and nothing else. No business logic, no fetching, no `useState` in a page.
- Container versus presentational: a slice's `ui` may read its own `model`; `shared/ui` and `entities/*/ui` components take props only and never touch the store.
- Server Components by default. Add `"use client"` only to the smallest leaf that needs state, effects or event handlers. Never put `"use client"` on a page or layout; `app/providers.tsx` is the one client boundary at the top.
- Props are typed with an explicit `type Props`. No `any`. No prop drilling past two levels: lift to a slice or compose with children.
- Every async screen handles four states: loading (skeleton), empty, error (with retry), success.
- Use `cn()` from `shared/lib` to merge Tailwind classes. Use the design tokens in the Tailwind theme, never raw hex colours.
- Accessibility: semantic elements, labels on inputs, keyboard support, visible focus. Use shadcn primitives for dialogs, sheets and menus.
- File names are kebab-case; components are named exports in PascalCase. No default exports except Next.js route files.

## Redux Toolkit rules

- One `createApi` in `shared/api/base-api.ts` with all `tagTypes`. Every slice adds its endpoints with `injectEndpoints` in its own `api/` segment. Never write `fetch` or `useEffect` data loading in a component.
- Entity endpoints (read a movie, read a seat map) live in `entities/*/api`. Mutation endpoints for an action (hold seats, pay) live in `features/*/api`.
- Server data lives in RTK Query only. Do not copy it into a slice. Use `providesTags` and `invalidatesTags` for cache updates.
- Slices hold client-only state: selected seats, hold countdown, UI filters, auth session. Keep state minimal and derive the rest with selectors.
- Always use the typed `useAppSelector` and `useAppDispatch` from `shared/lib`. Select the smallest value needed; never select a whole slice object.
- Use `createSelector` for derived data (e.g. the total price of selected seats) and `createEntityAdapter` for lists keyed by id (e.g. the seat map).
- The store is created per request inside `app/providers.tsx`; no global store singleton on the server.

## Performance rules

- Fetch on the server where possible (Server Components, fetch with revalidate) for home, movie and listing pages. Use RTK Query on the client for interactive data: seat map, bookings, checkout.
- Images: always `next/image` with `width`, `height` and `sizes`. `priority` only on the hero image.
- Fonts: `next/font` only.
- Heavy client components (charts, seat-layout editor, QR code) are loaded with `next/dynamic`.
- The seat map renders hundreds of seats: each `Seat` is wrapped in `React.memo`, receives primitive props, and reads its own status with a selector by id. Clicking one seat must not re-render the others.
- Do not add `useMemo` or `useCallback` by default. Add them only for a memoised child's props or a measured slow computation, and say why in one comment.
- Stable `key` values from ids, never array indexes.
- Lists over about 100 rows are paginated or virtualised.
- Debounce search inputs. Cancel stale requests.
- A slice's `index.ts` exports only what other layers need. Do not create barrel files that re-export whole folders.

## Figma designs

- Design file: **"Ticket Booking Platform: UI screens"** (Figma team: "Ankit's team").
- Link: TODO: paste the Figma file URL here.
- Use the Figma MCP tools to read screens, screenshots and design tokens from this file. Do not guess layouts, colours or spacing.
- Map Figma colours, fonts and spacing to Tailwind theme tokens. Never copy raw hex values into components.
- The Figma plan is Starter (rate-limited): work one screen or frame at a time.

## Theme (from Figma)

- Dark mode only. There is no light theme; do not add `dark:` variants.
- Palette lives in `src/app/globals.css` as `--palette-*` variables; semantic tokens (`primary`, `background`, `card`, `border`, ...) point at them. Components use the semantic tokens only.
- Primary/accent is amber `#F5B93A`, used for the main button, links ("Forgot password?", "Create an account") and focus rings.
- Font: Inter via `next/font` (`--font-sans`).
- Inputs and main buttons are `h-11` (44px), `rounded-lg`; labels are `text-xs`.
- If CSS changes don't show in `npm run dev`, stop it, run `rm -rf .next/dev`, and start again (Turbopack can cache stale CSS).

## How to work

- Before writing code for a new feature, tell me which layer and slice each new file goes in, show the component tree, then wait for my OK.
- Make small changes: one feature or one fix per task. Do not refactor unrelated files.
- Match the Figma screens in "Ticket Booking Platform: UI screens". Ask if a state is not designed.
- After finishing, list what you changed, what you did not do, and anything you were unsure about.
- I am learning from this project. When you make a non-obvious choice, explain it in two or three plain sentences.
