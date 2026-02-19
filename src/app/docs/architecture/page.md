---
title: Architecture
---

SSTS architecture has clear boundaries between standard Solana programs, foundation-managed core deployments, and issuer policy deployments.

## 1) Deployment boundaries

```mermaid
flowchart TB
  subgraph OFFCHAIN["Issuer (Off-Chain)"]
    direction TB
    BACKEND["Issuer backend and deployment scripts"]
    WALLET["Wallets and custody systems"]
  end

  subgraph STANDARD["Solana Programs"]
    direction TB
    T22["SPL Token-2022 Program"]
    ATA["SPL Associated Token Account Program (ATA)"]
  end

  subgraph CORE["SSTS Core Programs"]
    direction TB
    STP["Security Token Program"]
    TH["SSTS Transfer Hook Program"]
  end

  subgraph ISSUER["Issuer Programs"]
    direction TB
    VP["Verification Program(s)"]
  end

  BACKEND --> STP
  BACKEND --> T22
  WALLET --> T22

  STP --> T22
  STP --> TH
  STP --> VP

  T22 --> TH
  TH --> VP

  BACKEND -.->|"token account creation"| ATA
```

`ATA` is the SPL Associated Token Account program. It is the standard program used to derive and create canonical token accounts for a wallet + mint pair.

## 2) On-chain account topology (per mint)

```mermaid
flowchart TB
  subgraph STP_STATE["1) Core data accounts"]
    direction TB
    CORE_OWNER["Owner: Security Token Program"]
    MA["MintAuthority PDA"]
    VCM["VerificationConfig PDA (Mint)"]
    VCT["VerificationConfig PDA (Transfer)"]
    RATE["Rate Account(s)"]
    RECEIPT["Receipt Account(s)"]
    PROOF["Proof Account(s)"]
    CORE_OWNER --> MA --> VCM --> VCT --> RATE --> RECEIPT --> PROOF
  end

  subgraph TH_STATE["2) Hook data accounts"]
    direction TB
    HOOK_OWNER["Owner: SSTS Transfer Hook Program"]
    EAML["ExtraAccountMetaList PDA (per mint)"]
    HOOK_OWNER --> EAML
  end

  subgraph TOKEN_STATE["3) Token-2022 accounts"]
    direction TB
    TOKEN_OWNER["Owner: SPL Token-2022 Program"]
    MINT["Token-2022 Mint (+ extensions)"]
    ATA_A["Token Account A"]
    ATA_B["Token Account B"]
    TOKEN_OWNER --> MINT --> ATA_A --> ATA_B
  end

  subgraph VP_STATE["4) Issuer policy accounts"]
    direction TB
    POLICY_OWNER["Owner: Issuer Verification Program"]
    P_CFG["Policy Config PDA(s)"]
    P_ENTRY["Policy Entry PDA(s)"]
    POLICY_OWNER --> P_CFG --> P_ENTRY
  end

  subgraph VIRTUAL["5) Virtual authority PDAs"]
    direction TB
    AUTH_ROOT["Derived by Security Token Program (no data accounts)"]
    V_PD["PermanentDelegateAuthority"]
    V_TH["TransferHookAuthority"]
    V_PAUSE["PauseAuthority"]
    V_FREEZE["FreezeAuthority"]
    V_DIST["DistributionEscrowAuthority"]
    AUTH_ROOT --> V_PD --> V_TH --> V_PAUSE --> V_FREEZE --> V_DIST
  end

  CORE_OWNER --> HOOK_OWNER --> TOKEN_OWNER --> POLICY_OWNER --> AUTH_ROOT
  CORE_OWNER --> MINT
  HOOK_OWNER --> MINT
  HOOK_OWNER --> P_CFG
```

## 3) Transfer enforcement entry points

```mermaid
flowchart TB
  CORE_TX["SSTS Core Transfer instruction"] --> STP["Security Token Program"]
  DIRECT_TX["Direct Token-2022 transfer_checked"] --> T22["Token-2022 Program"]

  STP -->|"forced transfer via permanent delegate"| T22
  T22 --> TH["SSTS Transfer Hook Program"]

  STP -->|"verification when cpi_mode = true"| VP["Verification Program(s)"]
  STP -.->|"pre-called verifier path when cpi_mode = false"| VP
  TH -->|"verification on direct transfers"| VP
```

## Ownership and responsibility summary

| Category | Component examples | Deployed and managed by |
| --- | --- | --- |
| Standard Solana / SPL | `Token-2022`, `Associated Token Account Program (ATA)` | Solana / SPL ecosystem |
| SSTS core | `Security Token Program`, `SSTS Transfer Hook Program` | SSTS Foundation |
| Issuer policy | verification program(s) and their policy PDAs | issuer / integrator teams |

## Why these diagrams

- Diagram 1 answers deployment and trust boundaries.
- Diagram 2 answers which accounts exist and which program owns them.
- Diagram 3 answers where transfer policy is enforced for both transfer entry paths.

For instruction-level account order, discriminators, and authorization rules, see [Verification model](/docs/verification-model) and [All Instructions](/docs/api-security-token-program).
