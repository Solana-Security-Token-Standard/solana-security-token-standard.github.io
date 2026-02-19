---
title: API overview
---

The core API surface is defined by the Security Token Program instruction set.

## Main instruction groups

| Group | Representative instructions |
| --- | --- |
| Mint and metadata | `InitializeMint`, `UpdateMetadata` |
| Verification config | `InitializeVerificationConfig`, `UpdateVerificationConfig`, `TrimVerificationConfig` |
| Token lifecycle | `Mint`, `Burn`, `Transfer`, `Pause`, `Resume`, `Freeze`, `Thaw` |
| Corporate actions | `CreateRateAccount`, `Split`, `Convert`, `CreateDistributionEscrow`, `ClaimDistribution` |
| Proof and receipts | `CreateProofAccount`, `UpdateProofAccount`, receipt close instructions |

## Core account types

- `MintAuthority`
- `VerificationConfig`
- `Rate`
- `Receipt`
- `Proof`

## Virtual PDA authorities

- distribution escrow authority
- permanent delegate authority
- pause authority
- freeze authority
- transfer-hook authority

## Full reference

Use the full generated instruction reference page:

- [All Instructions](/docs/api-security-token-program)
