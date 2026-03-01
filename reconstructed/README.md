# Reconstructed source artifacts

This directory contains restoration artifacts from the obfuscated `cod.txt` bundle.

## Files

- `part1.capacitor-http-app.ts` — first normalized/reconstructed module (Capacitor bootstrap + web plugins).
- `full-bundle.ts` — full source snapshot copied from `cod.txt` so the entire code is now tracked under `reconstructed/` as requested.

## Notes

`full-bundle.ts` preserves original bundler shape and symbol aliases for fidelity.
Further passes can progressively split this into typed modules (`api/`, `stores/`, `components/`, `pages/`) without losing behavior.
