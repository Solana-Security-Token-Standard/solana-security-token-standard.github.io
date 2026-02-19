---
title: Program IDs and network configuration
---

For standard users, the key dependency is correct network program IDs published by the SSTS Foundation.

## Core programs used by integrations

- Security Token Program
- Transfer Hook Program

Your app, backend, or issuer scripts should treat these as external dependencies per cluster.

## Published core program IDs

{% program-ids /%}

## Operational guidance

1. Keep cluster-specific IDs in config, not hardcoded in application logic.
2. Validate IDs resolve to executable accounts on startup or in CI.
3. Treat ID changes as controlled configuration updates with review and rollout planning.
