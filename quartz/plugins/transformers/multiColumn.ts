// quartz/plugins/transformers/multi-column.ts
import { QuartzTransformerPlugin } from "../types"
import { Root } from "mdast"
import { visit } from "unist-util-visit"

interface Options {
  defaultColumnCount?: number
  defaultGap?: string
}

const defaultOptions: Options = {
  defaultColumnCount: 2,
  defaultGap: "2em"
}

export const MultiColumn: QuartzTransformerPlugin<Partial<Options>> = (userOptions: Partial<Options> = {}) => {
  // Add immediate console log
  console.log("MultiColumn plugin initialized with options:", userOptions)
  
  const options = { ...defaultOptions, ...userOptions }

  return {
    name: "MultiColumn",
    markdownPlugins() {
      console.log("MultiColumn markdownPlugins called")
      return [
        () => {
          console.log("MultiColumn transformer created")
          return (tree: Root) => {
            console.log("MultiColumn processing tree", tree.type)
            
            let found = false
            // Simple initial pass to check for multi-column content
            visit(tree, "paragraph", (node) => {
              const content = node.children?.[0]?.value || ""
              if (content.includes("start-multi-column")) {
                found = true
                console.log("Found multi-column content:", content)
              }
            })
            
            if (!found) {
              console.log("No multi-column content found in this file")
              return
            }

            // Rest of the plugin code...
            let inMultiColumn = false
            let currentColumns: string[] = []
            let currentSettings: Record<string, string> = {}
            let toRemove: number[] = []
            
            visit(tree, "paragraph", (node, index, parent) => {
              if (!parent || index === null) return

              const content = node.children?.[0]?.value || ""

              // Start of multi-column section
              if (content.trim().startsWith("--- start-multi-column:")) {
                console.log("Processing start-multi-column")
                inMultiColumn = true
                currentColumns = [""]
                toRemove.push(index)

                // Find and parse settings
                const nextNode = parent.children[index + 1]
                if (nextNode?.type === "code" && nextNode.lang === "column-settings") {
                  currentSettings = parseColumnSettings(nextNode.value)
                  toRemove.push(index + 1)
                }
                return
              }

              // Rest of the code remains the same...
            })
          }
        }
      ]
    }
  }
}

function parseColumnSettings(text: string): Record<string, string> {
  console.log("Parsing settings:", text)
  const settings: Record<string, string> = {}
  const regex = /(number of columns|largest column):\s*([^\n]+)/g
  let match

  while ((match = regex.exec(text)) !== null) {
    const key = match[1].replace(/\s+/g, '_')
    settings[key] = match[2].trim()
  }
  
  console.log("Parsed settings:", settings)
  return settings
}
