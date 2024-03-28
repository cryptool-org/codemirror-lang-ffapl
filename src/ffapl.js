import { LRLanguage, LanguageSupport } from "@codemirror/language"
import { continuedIndent, delimitedIndent, indentNodeProp } from "@codemirror/language"

import { parser } from "./parser"

export const FFaplLanguage = LRLanguage.define({
  name: "FFapl",
  parser: parser.configure({
    props: [
      indentNodeProp.add({
        Block: delimitedIndent({ closing: "}" }),
        FuncBlock: delimitedIndent({ closing: "}" }),
        ProgramBlock: delimitedIndent({ closing: "}" }),
        ConstDecl: continuedIndent({ except: /^{/ }),
        Decl: continuedIndent({ except: /^{/ }),
        Statement: continuedIndent({ except: /^{/ })
      })
    ]
  }),
  languageData: {
    closeBrackets: { brackets: ["(", "[", "{", '"'] },
    commentTokens: { line: "//", block: { open: "/*", close: "*/" }},
    indentOnInput: /^\s*(?:.*\{|\})$/,
    wordChars: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  }
})

export function FFapl() {
  return new LanguageSupport(FFaplLanguage, [])
}
