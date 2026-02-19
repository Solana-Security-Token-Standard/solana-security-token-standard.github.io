import programIds from '@/data/program-ids.json'

export function ProgramIdsBlock() {
  return (
    <pre>
      <code className="language-json">
        {JSON.stringify(programIds, null, 2)}
      </code>
    </pre>
  )
}
