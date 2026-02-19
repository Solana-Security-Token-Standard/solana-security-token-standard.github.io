---
title: Verification programs
---

Verification programs are the policy layer in SSTS. They let issuers implement compliance and transfer controls without changing the core standard.

## Typical checks

- KYC / AML allowlist and denylist checks
- investor-class and accreditation logic
- transfer windows or holding period constraints
- concentration and holder-cap rules
- dual-approval or transfer-agent workflows

## Interface expectations

A verification program should provide deterministic pass/fail behavior for the policy it enforces and accept the instruction/account context required by the selected verification mode.

## Execution modes

- Introspection mode: verifier calls appear earlier in the same transaction and are validated by the core program.
- CPI mode: core program invokes configured verifier programs directly.

{% callout title="Implementation baseline" %}
Verifier logic should fail closed when required context accounts are missing or malformed. Keep account validation explicit so behavior is consistent in both introspection and CPI paths.
{% /callout %}

## Design recommendations

1. Keep verifier logic narrowly scoped to policy concerns.
2. Fail closed when required context is missing.
3. Version policy programs and test them against realistic transfer and lifecycle scenarios.
