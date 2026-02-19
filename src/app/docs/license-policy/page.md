---
title: License and dependency policy
---

This page summarizes the current dependency-license policy documented in the core repo memo.

## Basis

- Project license: Apache-2.0
- `cargo-deny` policy updated for `0.19.x` schema compatibility

## Allowlist rationale

The current dependency graph requires a practical allowlist that includes:

- permissive licenses (MIT, Apache-2.0, BSD variants, ISC, CC0, 0BSD)
- Unicode data licensing (`Unicode-3.0`)
- weak copyleft in transitive deps (`MPL-2.0`)
- root certificate data licensing (`CDLA-Permissive-2.0`)

## Why this is documented

SSTS is intended as a reusable standard. Documenting dependency-license posture keeps compliance and review expectations explicit for adopters and contributors.

## Core references

- `deny.toml`
- `THIRD_PARTY_NOTICES.md`
- `docs.tmp/license-policy-memo.md` (core repo source memo)
