---
title: SSTS Developer Documentation
---

Build regulated security-token workflows on Solana with the Solana Security Token Standard (SSTS). {% .lead %}

{% quick-links %}

{% quick-link title="Governance" icon="installation" href="/docs/governance" description="Understand how the SSTS Foundation steers upgrades and publishes core releases." /%}

{% quick-link title="Architecture" icon="presets" href="/docs/architecture" description="Understand the core program, transfer hook, and verification model." /%}

{% quick-link title="Issuer quickstart" icon="plugins" href="/docs/issuer-quickstart" description="Deploy the example verification program and initialize issuer state." /%}

{% quick-link title="API reference" icon="theming" href="/docs/api-overview" description="Review instruction-level references for integration and audits." /%}

{% /quick-links %}

## What is SSTS

SSTS is a Solana security token standard built on SPL Token-2022 extensions. It provides a neutral, reusable on-chain framework for:

- compliance-aware minting, transfer, burn, and administrative controls
- configurable verification programs for jurisdiction and issuer rules
- corporate actions, including split, convert, and distribution claim flows

## Primary repositories

- Core standard: [solana-security-token-standard](https://github.com/Solana-Security-Token-Standard/solana-security-token-standard)
- Issuer reference implementation: [ssts-example](https://github.com/Solana-Security-Token-Standard/ssts-example)

## Start path

1. Confirm network and published program IDs from the SSTS Foundation.
2. Review the verification model and API reference for instruction-level integration.
3. Use the issuer example to configure mint and transfer verification for your token workflow.

## Core Program IDs

This is the single source of truth for the SSTS core program IDs to use
in the issuer token projects:

{% program-ids /%}

{% callout title="Status" %}
Core standard contracts are foundation-managed. Issuer and integrator teams generally work at the configuration and policy layer.
{% /callout %}
