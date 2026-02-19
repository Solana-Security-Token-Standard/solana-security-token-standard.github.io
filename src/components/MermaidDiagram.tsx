'use client'

import { useEffect, useState } from 'react'

const lightThemeVariables = {
  background: '#f8fafc',
  primaryColor: '#ffffff',
  primaryTextColor: '#0f172b',
  primaryBorderColor: '#2A2D6E',
  lineColor: '#2A2D6E',
  textColor: '#0f172b',
  mainBkg: '#ffffff',
  secondaryColor: '#ecf9f9',
  tertiaryColor: '#f1f5f9',
  clusterBkg: '#ecf9f9',
  clusterBorder: '#00A8A8',
  edgeLabelBackground: '#f8fafc',
  actorTextColor: '#0f172b',
  actorBkg: '#ffffff',
  actorBorder: '#2A2D6E',
  actorLineColor: '#2A2D6E',
  signalColor: '#2A2D6E',
  signalTextColor: '#0f172b',
  labelBoxBkgColor: '#f8fafc',
  labelBoxBorderColor: '#2A2D6E',
  fontFamily: 'var(--font-inter), ui-sans-serif, system-ui, sans-serif',
}

const darkThemeVariables = {
  background: '#0f172b',
  primaryColor: '#1e293b',
  primaryTextColor: '#e2e8f0',
  primaryBorderColor: '#00A8A8',
  lineColor: '#94a3b8',
  textColor: '#e2e8f0',
  mainBkg: '#1e293b',
  secondaryColor: '#111827',
  tertiaryColor: '#0f172b',
  clusterBkg: '#111827',
  clusterBorder: '#00A8A8',
  edgeLabelBackground: '#0f172b',
  actorTextColor: '#e2e8f0',
  actorBkg: '#1e293b',
  actorBorder: '#00A8A8',
  actorLineColor: '#94a3b8',
  signalColor: '#94a3b8',
  signalTextColor: '#e2e8f0',
  labelBoxBkgColor: '#0f172b',
  labelBoxBorderColor: '#94a3b8',
  fontFamily: 'var(--font-inter), ui-sans-serif, system-ui, sans-serif',
}

function isDarkMode() {
  return (
    typeof document !== 'undefined' &&
    document.documentElement.classList.contains('dark')
  )
}

export function MermaidDiagram({ chart }: { chart: string }) {
  const [svg, setSvg] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [themeVersion, setThemeVersion] = useState(0)

  useEffect(() => {
    const root = document.documentElement
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.attributeName === 'class') {
          setThemeVersion((value) => value + 1)
          break
        }
      }
    })
    observer.observe(root, {
      attributes: true,
      attributeFilter: ['class'],
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    let disposed = false

    async function renderMermaid() {
      try {
        const mermaid = (await import('mermaid')).default

        mermaid.initialize({
          startOnLoad: false,
          securityLevel: 'strict',
          theme: 'base',
          themeVariables: isDarkMode()
            ? darkThemeVariables
            : lightThemeVariables,
          flowchart: {
            useMaxWidth: true,
            htmlLabels: true,
            curve: 'basis',
          },
          sequence: {
            useMaxWidth: true,
          },
        })

        const renderId = `ssts-mermaid-${Math.random().toString(36).slice(2, 11)}`
        const rendered = await mermaid.render(renderId, chart.trim())

        if (disposed) {
          return
        }

        setSvg(rendered.svg)
        setError(null)
      } catch (cause) {
        if (disposed) {
          return
        }

        setSvg('')
        setError(
          cause instanceof Error
            ? cause.message
            : 'Failed to render Mermaid diagram.',
        )
      }
    }

    renderMermaid()

    return () => {
      disposed = true
    }
  }, [chart, themeVersion])

  if (error) {
    return (
      <div className="mermaid-diagram not-prose my-8 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-300">
        <p className="text-sm font-semibold">Mermaid render error</p>
        <p className="mt-1 text-sm">{error}</p>
        <pre className="mt-3 overflow-x-auto text-xs">{chart.trim()}</pre>
      </div>
    )
  }

  return (
    <div className="mermaid-diagram not-prose my-8 overflow-x-auto rounded-xl border border-slate-200 bg-slate-50 p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900/50">
      {svg ? (
        <div
          className="mermaid-diagram__content min-w-[20rem]"
          // Mermaid returns SVG markup.
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      ) : (
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Rendering diagram...
        </p>
      )}
    </div>
  )
}
