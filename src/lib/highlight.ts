/**
 * Minimal build-time syntax highlighter.
 *
 * Deliberately not a parser: it escapes the source, then walks it once with a
 * single alternation so a token can never be re-scanned and the markup it
 * emits can never be re-tokenised. Enough for the CSS and JS snippets in the
 * catalogue, and it keeps a highlighting library out of the bundle.
 */

export type Language = 'css' | 'js'

const HTML_ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;'
}

const escapeHtml = (value: string) => value.replace(/[&<>]/g, (char) => HTML_ESCAPES[char]!)

/** Token name → class name consumed by the `.t-*` rules in `global.css`. */
const TOKEN_CLASS: Record<string, string> = {
  comment: 't-com',
  string: 't-str',
  atrule: 't-at',
  variable: 't-var',
  selector: 't-sel',
  property: 't-prop',
  keyword: 't-at',
  fn: 't-fn',
  number: 't-num'
}

const NUMBER = String.raw`(?<number>-?\d*\.?\d+(?:ms|s|%|deg|vmax|vmin|dvh|vh|vw|px|rem|em)?)`
const COMMENT = String.raw`(?<comment>/\*[\s\S]*?\*/|//[^\n]*)`
const STRING = String.raw`(?<string>'[^'\n]*'|"[^"\n]*"|\`[^\`]*\`)`

const GRAMMARS: Record<Language, RegExp> = {
  css: new RegExp(
    [
      COMMENT,
      STRING,
      String.raw`(?<atrule>@[\w-]+)`,
      String.raw`(?<variable>--[\w-]+)`,
      String.raw`(?<selector>::?[\w-]+(?:\([^)\n]*\))?|\.[\w-]+)`,
      String.raw`(?<property>-?[a-zA-Z][\w-]*(?=\s*:))`,
      String.raw`(?<fn>[a-zA-Z][\w-]*(?=\())`,
      NUMBER
    ].join('|'),
    'g'
  ),
  js: new RegExp(
    [
      COMMENT,
      STRING,
      String.raw`(?<keyword>\b(?:const|let|var|function|return|if|else|new|await|async|export|import|from|try|catch|typeof)\b)`,
      String.raw`(?<fn>[a-zA-Z_$][\w$]*(?=\())`,
      NUMBER
    ].join('|'),
    'g'
  )
}

const TOKEN_NAMES = Object.keys(TOKEN_CLASS)

/** Returns HTML with `<span class="t-*">` wrappers. Safe to use with `set:html`. */
export function highlight(source: string, language: Language = 'css'): string {
  return escapeHtml(source).replace(GRAMMARS[language], (match, ...rest) => {
    const groups = rest.at(-1) as Record<string, string | undefined>
    const name = TOKEN_NAMES.find((token) => groups[token] !== undefined)

    return name ? `<span class="${TOKEN_CLASS[name]}">${match}</span>` : match
  })
}
