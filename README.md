# SIR Citizen Service — Hackathon Prototype

Local, synthetic-only prototype for the Build What Moves India hackathon.

## Run

With Node available on your PATH:

```bash
pnpm install
pnpm dev
```

Open `http://localhost:5173`. The Express API runs on port 3001.

Demo OTP: `123456`. The prior record, voter-list search, and all submission/eSign responses are synthetic; the first eSign attempt intentionally fails, then succeeds on retry. Progress is held in the local API process and browser session storage.

The redesigned flow includes a language selector, visible progress indicator, keyboard focus treatment, a skip link, high-text-size control, integrated voter-list lookup, exact prior-SIR decision categories, guided AC/part/serial/relationship search, personal-detail fields, preview, consent, and eSign retry.

## Safety boundary

This project intentionally has no ECI integrations, real credentials, real personal data, or live eSign service. It is a hackathon prototype only.
