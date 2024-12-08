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

function parseColumnSettings(text: string): Record<string, string> {
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

export const MultiColumn: QuartzTransformerPlugin<Partial<Options>> = (userOptions: Partial<Options> = {}) => {
  const options = { ...defaultOptions, ...userOptions }

  return {
    name: "MultiColumn",
    markdownPlugins() {
      return [
        () => (tree: Root) => {
          let inMultiColumn = false
          let currentColumns: string[] = []
          let currentSettings: Record<string, string> = {}
          let toRemove: number[] = []
          
          visit(tree, "paragraph", (node, index, parent) => {
            if (!parent || index === null) return

            const content = node.children?.[0]?.value || ""
            console.log("Processing node:", content.substring(0, 50))

            // Start of multi-column section
            if (content.trim().startsWith("--- start-multi-column:")) {
              console.log("Found start of multi-column")
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

            // Column separator
            if (content.trim() === "--- end-column ---" && inMultiColumn) {
              console.log("Found column separator")
              currentColumns.push("")
              toRemove.push(index)
              return
            }

            // End of multi-column section
            if (content.trim() === "--- end-multi-column" && inMultiColumn) {
              console.log("Found end of multi-column")
              inMultiColumn = false
              toRemove.push(index)

              const columnCount = parseInt(currentSettings.number_of_columns) || options.defaultColumnCount
              const largestColumn = currentSettings.largest_column || "left"

              const wrapperHtml = {
                type: "html",
                value: `
                  <div class="multi-column-wrapper" data-largest="${largestColumn}">
                    <style>
                      .multi-column-wrapper {
                        display: grid;
                        grid-template-columns: repeat(${columnCount}, 1fr);
                        gap: ${options.defaultGap};
                        margin: 1em 0;
                        padding: 1em;
                        border: 2px solid #ff0000; /* Debug border */
                      }
                      
                      .multi-column-wrapper .column {
                        background: rgba(0,0,0,0.05); /* Debug background */
                        padding: 1em;
                        border-radius: 4px;
                      }
                      
                      .multi-column-wrapper[data-largest="left"] .column:first-child {
                        grid-column: span 2;
                      }
                      
                      .multi-column-wrapper[data-largest="right"] .column:last-child {
                        grid-column: span 2;
                      }
                      
                      @media (max-width: 768px) {
                        .multi-column-wrapper {
                          grid-template-columns: 1fr;
                        }
                        .multi-column-wrapper .column {
                          grid-column: span 1 !important;
                        }
                      }
                    </style>
                    ${currentColumns.map((col, idx) => `<div class="column"><!-- Column ${idx + 1} -->${col}</div>`).join("\n")}
                  </div>
                `
              }

              parent.children.splice(index, 1, wrapperHtml)
              console.log("Generated columns:", currentColumns.length)
              return
            }

            // Collect content for current column
            if (inMultiColumn) {
              const lastIndex = currentColumns.length - 1
              currentColumns[lastIndex] += (
                node.type === "paragraph" 
                  ? `<p>${content}</p>` 
                  : content
              )
              toRemove.push(index)
            }
          })

          // Remove processed nodes in reverse order to maintain correct indices
          toRemove.sort((a, b) => b - a).forEach(index => {
            tree.children.splice(index, 1)
          })
        }
      ]
    }
  }
}
