---
title: Overview
---

SSTS (Solana Security Token Standard) is a security token framework for Solana that combines Token-2022 primitives with configurable verification logic.

## Why this model

SSTS is designed for regulated asset issuance without forcing every issuer to deploy and audit a bespoke token contract.

- One reusable core standard program
- Per-mint configuration via program-derived accounts
- Pluggable verification programs for policy enforcement
- Support for corporate action workflows beyond basic transfers

## Design goals

- Neutrality: avoid hardcoding any single jurisdiction or asset class policy
- Extensibility: allow issuers to compose local rules with verification programs
- Auditability: keep core behavior predictable and move custom policy to explicit modules
- Operational control: include pause/freeze/delegate controls and receipt/proof tracking

## User scope

For most adopters, core program lifecycle is foundation-managed. Integration work focuses on:

- issuer-side transaction and policy orchestration
- verification program composition
- runtime configuration (program IDs, cluster settings, and account context)

## Core features in scope

- Token-2022 extension wiring (Transfer Hook, Permanent Delegate, Pausable, Freeze)
- Instruction-level verification configuration (`VerificationConfig`)
- Verification in introspection and CPI modes
- Corporate actions (split, convert, distribution claims)
- Proof and receipt account patterns for replay protection and claim validation
