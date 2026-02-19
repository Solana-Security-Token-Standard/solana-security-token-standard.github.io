---
title: Verification model
---

SSTS verification is defined by two dimensions:

1. authorization profile
2. verification execution mode

## Authorization profiles

| Profile | Meaning | Typical instructions |
| --- | --- | --- |
| Permissionless | No external authorization required | `InitializeMint`, `Verify` |
| Initial mint authority OR verification programs | Either creator signature (`MintAuthority`) or verifier approval | metadata/config/rate/distribution admin instructions |
| Verification programs only | Must pass configured verifier checks | `Mint`, `Burn`, `Pause`, `Resume`, `Freeze`, `Thaw`, `Transfer`, `Split`, `Convert`, proof and claim instructions |

## Verification execution modes

### Introspection mode (`cpi_mode = false`)

- Verifier instructions run before the core instruction in the same transaction.
- Core checks the instructions sysvar and validates expected verifier calls.
- Verifier calls must match instruction data and account context requirements.

### CPI mode (`cpi_mode = true`)

- Core invokes each configured verification program directly during execution.
- Verification program accounts are appended at the end of the core instruction account list.
- Core strips verification overhead accounts before verifier CPI so verifiers receive consistent core context.

## Forced transfer path (core `Transfer` instruction)

```mermaid
sequenceDiagram
  participant User
  participant Core as SSTS Core Program
  participant Verify as Verification Programs
  participant T22 as Token-2022
  participant Hook as SSTS Transfer Hook

  User->>Core: Transfer instruction
  alt cpi_mode = true
    Core->>Verify: CPI verification calls
    Verify-->>Core: Approve or reject
  else cpi_mode = false
    User->>Verify: Pre-call verification programs
    Verify-->>User: Approve
    User->>Core: Transfer instruction in same transaction
  end
  Core->>T22: transfer_checked (authority = permanent_delegate PDA)
  T22->>Hook: Execute transfer hook
  Hook-->>T22: Bypass path (permanent_delegate and no extra accounts)
  T22-->>Core: Transfer result
  Core-->>User: Success or failure
```

## Direct wallet transfer path (Token-2022)

```mermaid
sequenceDiagram
  participant Holder
  participant T22 as Token-2022
  participant Hook as SSTS Transfer Hook
  participant Verify as Verification Programs

  Holder->>T22: transfer_checked
  T22->>Hook: Execute transfer hook
  Hook->>Hook: Load VerificationConfig from extra accounts
  Hook->>Verify: CPI verification program calls
  Verify-->>Hook: Approve or reject
  Hook-->>T22: Return decision
  T22-->>Holder: Settle transfer or fail atomically
```

## Verification overhead accounts

When an instruction uses verification-program authorization, the first three accounts are:

1. `mint`
2. `verification_config`
3. `instructions_sysvar` (introspection) or CPI placeholder

When the initial-mint-authority authorization path is used, the first three accounts are:

1. `mint`
2. `mint_authority`
3. `creator` signer

For complete account layouts and discriminators, see [All Instructions](/docs/api-security-token-program).
