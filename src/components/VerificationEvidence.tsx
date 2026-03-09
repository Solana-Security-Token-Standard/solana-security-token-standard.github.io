import programIds from '@/data/program-ids.json'
import verificationEvidence from '@/data/verification-evidence.json'

type ProgramKey = 'securityTokenProgram' | 'transferHookProgram'

type ProgramEvidence = {
  expectedProgramHash: string
  deployTx: string
  verifyUploadTx: string
}

type NetworkEvidence = {
  lastUpdated: string
  rpcUrl: string
  repoUrl: string
  commitHash: string
  programs: Record<ProgramKey, ProgramEvidence>
}

type NetworkProgramIds = {
  securityTokenProgram: string | null
  transferHookProgram: string | null
}

type ProgramMeta = {
  key: ProgramKey
  label: string
}

const PROGRAMS: ProgramMeta[] = [
  { key: 'securityTokenProgram', label: 'Security Token Program' },
  { key: 'transferHookProgram', label: 'Transfer Hook Program' },
]

function txExplorerLink(tx: string, cluster: string) {
  return `https://explorer.solana.com/tx/${tx}?cluster=${cluster}`
}

function programExplorerLink(programId: string, cluster: string) {
  return `https://explorer.solana.com/address/${programId}?cluster=${cluster}`
}

export function VerificationEvidenceBlock({ network = 'devnet' }) {
  const idsByNetwork = programIds as Record<string, NetworkProgramIds>
  const evidenceByNetwork = verificationEvidence as Record<string, NetworkEvidence>

  const networkIds = idsByNetwork[network]
  const networkEvidence = evidenceByNetwork[network]

  if (!networkIds || !networkEvidence) {
    return (
      <p>
        No verification evidence published for <code>{network}</code>.
      </p>
    )
  }

  const expectedHashes: Record<string, string> = {}
  const auditTrail: Record<string, Record<string, string>> = {}
  const verifyCommands: string[] = []
  const hashCommands: string[] = []

  for (const program of PROGRAMS) {
    const programId = networkIds[program.key]
    if (!programId) {
      continue
    }

    const evidence = networkEvidence.programs[program.key]
    expectedHashes[programId] = evidence.expectedProgramHash
    auditTrail[program.label] = {
      deployTx: evidence.deployTx,
      verifyUploadTx: evidence.verifyUploadTx,
    }

    hashCommands.push(
      `solana-verify get-program-hash -u ${networkEvidence.rpcUrl} ${programId}`,
    )

    verifyCommands.push(
      [
        `solana-verify verify-from-repo -u ${networkEvidence.rpcUrl} \\`,
        `  --program-id ${programId} \\`,
        `  ${networkEvidence.repoUrl} \\`,
        `  --commit-hash ${networkEvidence.commitHash} \\`,
        `  --library-name ${
          program.key === 'securityTokenProgram'
            ? 'security_token_program'
            : 'security_token_transfer_hook'
        }`,
      ].join('\n'),
    )
  }

  return (
    <>
      <p>
        Network: <code>{network}</code>
        <br />
        Last updated: <code>{networkEvidence.lastUpdated}</code>
        <br />
        RPC URL: <code>{networkEvidence.rpcUrl}</code>
        <br />
        Verification commit hash: <code>{networkEvidence.commitHash}</code>
      </p>

      <h3>Published Program IDs ({network})</h3>
      <pre>
        <code className="language-json">
          {JSON.stringify(networkIds, null, 2)}
        </code>
      </pre>

      <h3>Expected Program Hashes</h3>
      <pre>
        <code className="language-json">
          {JSON.stringify(expectedHashes, null, 2)}
        </code>
      </pre>

      <h3>Quick Integrity Check</h3>
      <pre>
        <code className="language-bash">{hashCommands.join('\n')}</code>
      </pre>

      <h3>Reproducible Verification Commands</h3>
      <pre>
        <code className="language-bash">{verifyCommands.join('\n\n')}</code>
      </pre>

      <h3>Audit Trail (Transaction IDs)</h3>
      <pre>
        <code className="language-json">{JSON.stringify(auditTrail, null, 2)}</code>
      </pre>

      <h3>Explorer Links</h3>
      <ul>
        {PROGRAMS.map((program) => {
          const programId = networkIds[program.key]
          if (!programId) {
            return null
          }
          const evidence = networkEvidence.programs[program.key]
          return (
            <li key={program.key}>
              {program.label}:{' '}
              <a href={programExplorerLink(programId, network)}>
                program account
              </a>
              ,{' '}
              <a href={txExplorerLink(evidence.deployTx, network)}>
                deploy transaction
              </a>
              ,{' '}
              <a href={txExplorerLink(evidence.verifyUploadTx, network)}>
                verification upload transaction
              </a>
            </li>
          )
        })}
      </ul>
    </>
  )
}
