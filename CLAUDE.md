# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

NULL:UHR is a Murder Mystery Dinner website for a New Year's Eve event. The theme is an illegal rave in the "Felsenkeller" (underground cellars) of Kronach, Germany. The DJ "Bassmuschi" gets murdered, and guests must find the killer.

## Architecture

The app has two main areas:
- **Public**: Event info + character cards showing public information (role name, real name, dresscode)
- **Private**: Each character has a secret page (`/charakter/[id]`) with background story, secrets, motives, and clues - unlocked via a unique 6-digit code

### Key Data Structure

Characters have:
- Public info: `id`, `realName`, `roleName`, `publicDescription`, `dresscode`
- Private info: `background`, `relationshipToBassmuschi`, `secret`, `motive`, `whatYouKnow`, `yourGoal`, `isMurderer`
- Special: Ben ("Agent B") has `specialMissions` for the child detective role

The murderer is **Lena** (`isMurderer: true`).

## Source Files

- `NullUhrApp.jsx` - Complete React component with inline styles (rave/underground aesthetic)
- `characters.json` - All 15 character profiles with public and private data, plus clues and event timeline

## Design System

- Primary accent: `#ff6b35` (neon orange)
- Background: Dark gradients (`#0a0a0a`, `#1a0a1a`)
- Font: Courier New (monospace)
- Style: Dark/rave/underground aesthetic with mobile-first responsive design

## Development Commands

```bash
npm install        # Install dependencies
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
```

## Deployment

Designed for static hosting (Vercel, Netlify). No backend required - character codes are generated at build time.
