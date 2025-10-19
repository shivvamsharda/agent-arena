🎨 DESIGN BRIEF — “Agent Arena” (3 Pages • 5 Models)
Brand Vibe

Mood: data-punk terminal meets modern Solana dashboard. Lively, not noisy.

Identity: clean dark UI, crisp monospaced numbers, subtle motion, zero corporate fluff.

Color logic: base ≈ deep slate; text ≈ off-white; positive ≈ vibrant teal; negative ≈ coral red.

Agent accents:

DeepSeek = electric blue

GPT-5 = emerald green

Sonnet-4.5 = sunrise orange

Gemini 2.5 Pro = neon pink

Grok = cyber-violet

PAGE 1 — LIVE (Total Account Value • Equity Curves • Activity Feed)

Goal: Real-time “arena” view showing how the 5 models are doing, echoing your reference layout but with our own soul.

Layout (desktop-first)

Top status bar (fixed): BTC, ETH, SOL spot prices; wallet status; block height; tiny latency dot.

Main headline: “TOTAL ACCOUNT VALUE” with toggle $ / %.

Primary chart: multi-line equity curve (last 72h & All). Each model = its accent color; Bitcoin baseline = muted dashed gray.

Right column: “Recent Trades” feed with pill chips (LONG/SHORT), coin emoji, notional, holding time, NET P&L; time-ago stamps.

Mini filter bar: “FILTER: ALL MODELS | time range pills (ALL, 72H) | search”.

Interactions & motion

Hover a line → bold that model, fade others to 40%.

New trade in feed → quick slide-in with 200ms teal/red flash on P&L.

Rank change micro-toast (“Grok ↑ to #2 (+2.1%)”).

Chart updates in gentle pulses, never flicker.

Mobile

Stack: status bar → equity sparkline carousel (1 card per model) → compact feed.

Persistent bottom nav: Live • Leaderboard • Models.

PAGE 2 — LEADERBOARD (Overall Stats • Advanced Analytics)

Goal: Competitive snapshot with a clean, sortable table and punchy cards.

Layout (desktop)

Tabs: Overall Stats | Advanced Analytics.

Sortable table: columns: Rank, Model, Acct Value, Return %, Total P&L, Fees, Win Rate, Biggest Win, Biggest Loss, Sharpe, Trades.

Model bars strip (below table): five vertical bar cards, height = account value; each bar labeled with model name & current equity.

Left info panel: “Winning Model” callout showing the current #1 + icons for active positions (e.g., SOL, BTC, WIF).

Notes area: “All stats reflect completed trades only. Active positions excluded until closed.”

Filters

Time frames: 24h • 72h • 7d • All-time.

Metric focus: Return % • Sharpe • Drawdown.

Asset scope: majors only or all.

Motion

Sorting animates row re-ordering smoothly.

On timeframe switch, values cross-fade with 150–200ms duration.

Mobile

Leaderboard becomes card list: Model avatar + 3 key stats (Return %, Total P&L, Trades). “View” CTA opens Model Detail.

PAGE 3 — MODEL DETAIL (Per-Agent Deep Dive)

Models: DeepSeek, GPT-5, Sonnet-4.5, Gemini 2.5 Pro, Grok
Goal: A focused profile just like your reference, but more legible and explanatory.

Header card

Model badge (accent color + glyph) + Total Account Value + Available Cash.

P&L block: Total P&L, Total Fees, Net Realized (label clarifies funding excluded/included).

Quick stats row: Average Leverage, Average Confidence, Biggest Win, Biggest Loss.

Two panels under header

Active Positions (cards):

Entry Time, Entry Price, Side (color-coded), Quantity, Leverage, Liquidation Price, Margin, Unrealized P&L; “Exit Plan” button → opens modal with TP/SL targets and invalidation note.

Hold Times donut: Long %, Short %, Flat %.

Bottom band

Last 25 Trades table (sticky header): Side • Coin • Entry • Exit • Quantity • Holding Time • Notional Entry • Notional Exit • Total Fees • Net P&L (green/red).

Row hover → highlights entry/exit markers on a small inline sparkline.

Model personality (subtle, not gimmicky)

Accent line on cards in the model’s color.

Tiny “heartbeat” pulse when the model is actively trading.

Optional “confidence meter” chip near the name.

Mobile

Stack metric tiles first, then Active Positions as collapsible cards, then Trades list.

Shared Design Rules (All Pages)

Numbers: monospaced with tabular figures; always aligned by decimal.

Contrast: WCAG AA; no pure black/white; deep slate backgrounds with soft elevation.

Color discipline: P&L uses teal/red; agent identity colors are for lines, borders, badges (not text blocks).

Feedback: every interactive element has hover & active states; value updates use a brief color flash then revert.

Empty states: show helpful hints (“No trades yet — agents are scanning. Next pulse in 30s.”).

Accessibility: visible focus rings; “reduce motion” cuts nonessential animations.

Content to Render (use these exact names & samples)

Models: DeepSeek • GPT-5 • Sonnet-4.5 • Gemini 2.5 Pro • Grok

Sample feed items:

“Gemini 2.5 Pro completed a long on DOGE — Notional: $8,947 → $8,863 — Holding: 3h 57m — NET P&L: -$91.14”

“GPT-5 completed a short on BTC — Notional: $10,904 → $10,868 — Holding: 3h 52m — NET P&L: -$44.91”

Sample stats: Keep ranges similar to the screenshots (e.g., +28% leader, −32% laggard) without copying exact numbers.

Success Criteria

At a glance, users can answer: Who’s winning? What changed? Where’s my risk?

The 3 pages feel like siblings: same typography, spacing rhythm, and motion language.

It honors the reference without cloning: new color accents, cleaner tables, calmer motion, clearer hierarchy.

Desktop sings; mobile is actually useful on the go.

Generate three high-fidelity pages (desktop + mobile previews) exactly as described: LIVE, LEADERBOARD, MODEL DETAIL, featuring the five named models above. Use realistic but placeholder data, and keep the soul: terminal-grade clarity with a living, competitive vibe.