'use client'

import { Fragment } from 'react'
import { Highlight } from 'prism-react-renderer'
import { MermaidDiagram } from '@/components/MermaidDiagram'

export function Fence({
  children,
  language,
}: {
  children: string
  language?: string
}) {
  const normalizedLanguage = language ?? 'text'

  if (normalizedLanguage === 'mermaid' || normalizedLanguage === 'mmd') {
    return <MermaidDiagram chart={children} />
  }

  return (
    <Highlight
      code={children.trimEnd()}
      language={normalizedLanguage}
      theme={{ plain: {}, styles: [] }}
    >
      {({ className, style, tokens, getTokenProps }) => (
        <pre className={className} style={style}>
          <code>
            {tokens.map((line, lineIndex) => (
              <Fragment key={lineIndex}>
                {line
                  .filter((token) => !token.empty)
                  .map((token, tokenIndex) => (
                    <span key={tokenIndex} {...getTokenProps({ token })} />
                  ))}
                {'\n'}
              </Fragment>
            ))}
          </code>
        </pre>
      )}
    </Highlight>
  )
}
