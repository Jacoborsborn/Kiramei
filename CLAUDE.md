# Kira Mei — Claude Code Instructions

## Project overview
Kira Mei (kiramei.co.uk) is an AI fitness influencer persona and e-commerce business.
Stack: WordPress + WooCommerce, Fanvue integration, automated weekly plan delivery via cron jobs.
The system goal is full automation: client purchase → AI chatter → weekly plan via cron.

## How to navigate this codebase
A knowledge graph of this project lives at `graphify-out/GRAPH_REPORT.md`.
Read it before answering any question about the codebase structure.
Use `graphify-out/graph.json` to look up relationships — do not grep raw files unless the graph is missing a node.

## Key areas
- `/wp-content/themes/` — Kira Mei theme, CTA components, meta description templates
- `/cron/` — automated plan delivery jobs
- `/fanvue/` — Fanvue webhook handlers and AI chatter logic
- `/seo/` — SEOAuto-generated content and meta overrides

## Priorities when editing
1. Never break Kira Mei CTA links — check `graphify-out/graph.json` for all nodes tagged `cta` before touching templates
2. Meta descriptions must follow the format defined in `/seo/meta-template.md`
3. Cron jobs must remain idempotent — no duplicate plan sends

## Context-saving rules
- Always query the graph first: `/graphify query "..."` before reading files
- Only open a file if the graph answer is insufficient
- Summarise what you changed and which graph nodes are affected at the end of each task