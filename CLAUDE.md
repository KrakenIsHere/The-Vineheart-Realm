# The Vineheart Realm — vault conventions

An Obsidian vault for a homebrew D&D setting (5e + 2024 baseline, homebrew on top).
Published to GitHub Pages via Quartz from the `v4` branch, so anything not tagged
`private` OR has DM in front is public.

> [!Note] Where these conventions come from
> Everything below is drawn from Kraken's own notes, not from the AI-written
> passes in the vault. Those passes introduced things that were not house style
> (a Core concept / Friction callout template on the Peoples notes, an emoji
> status legend in the Gazetteer, "New to canon" flags, British spellings, and
> invented single-use tags), and all of them have been rolled back. Do not
> reintroduce them by imitating a note that still carries one.
>
> More of the vault is AI-written than a first pass suggests. Confirmed so far:
> `fb98047` (Peoples, Gazetteer, Items, Shieldhaven), `9ae06f0` (the index
> rewrite), and `c13a0dc` (the DM screen). The commit messages are a decent tell
> — `feat:`/`chore:` prefixes and words like "comprehensive", "Establish",
> "Enhance" cluster on the AI commits, while Kraken's own read like "Spelling
> cleaning." and "Update Character Creation.md". Verify before inferring style
> from any note.

## Voice

Plain voice. Kraken commissioned this direction explicitly (commit `9ae06f0`,
"rewrite descriptions in plain voice"), and it's the target for all prose.

- Short declarative sentences. Concrete over evocative.
- Contractions are sparse, roughly one per 900 words, and they cluster where the
  tone turns funny ("maintaining they're DEFINITELY still feuding"). Rules and
  history stay in the fuller register. Don't sprinkle them in for warmth.
- Second person for anything a player or DM has to *do*.
- Say what it means at the table, not what it feels like in the abstract.
  "When one fails, the whole continent finds out."
- Dry humor lands at the end of a paragraph, never mid-sentence, never signposted.
  "...and endless amusement for the locals." "(this was one guy, once, 150 years ago)"
  Both from [[Fallowfield]], which is Kraken's own writing.
- No epic-trailer prose. No "In a world where", no "testament to", no stacked
  adjectives, no ancient-evil-stirs framing.
- Comma splices are the house rhythm, not errors. Leave them. Same for `&` in
  headers and terse lists (prose sentences use "and").
- Bullets can be fragments and can start lowercase. That's fine in rules notes.

**American English throughout.** color, favor, honor, rumor, traveling, realize,
defense, gray. Not colour, favour, travelling, realise.

Do not imitate typos or the possessive `it's`. Match the voice, not the slips, fix the slips.

## Emphasis and numbers

- **Bold** proper nouns and mechanics on first mention: **House Arca**, **Poorly Rested**.
- *Italics* for a single stressed word: they don't have a *word* for that.
- Dice bolded, odds in parens: roll a **1d20** _(against the DM's 1d10)_, "(8.45% Chance)".
- Metric follows imperial: "500 lbs (about 227 kg)".

## Frontmatter

```yaml
---
title: The village of Mistlin
tags:
  - Arcanum
  - Villages
  - Mistlin
---
```

- `title:` is the display name and is usually longer than the filename
  ("Kingdom of Arcanum", "The Wound of Divine arrogance"). Quote it if it has a colon.
- Tags: two-space indent, one per line. Topic tags are CamelCase with no spaces
  (`VineheartRealm`, `DivineWar`, `SecretsOfVillainy`). Functional tags are lowercase
  (`index`, `private`, `project`).
- `VineheartRealm` is the general world tag; add the specific ones after it.
- **Reuse the existing tag vocabulary, don't invent.** Utility notes take `Tools`,
  reference notes `Details`, session notes `Notes`, rules `Rules`. A tag that ends
  up used in exactly one note is almost always filler — check what comparable
  notes already use before adding one. Entity tags (`Shieldhaven`, `Mistlin`) are
  the exception: those name a place other notes point at.

## Structure

- Deep header nesting is normal, down to `######`. Multiple `#` H1s as top-level
  sections is an accepted pattern (Fallowfield, Shieldhaven).
- **Empty headers are scaffolding, not omissions.** Leaving a skeleton of headers
  for a place that isn't written yet is intentional. Don't fill them with filler
  and don't delete them.
- Location notes open with `## Map` and an image embed.
- Reuse blocks by transclusion rather than copying: `![[Godwound Containment#Tide Sealing]]`.
- Faction and kingdom notes carry the reputation ladder, -2 to +4, with tier names
  specific to that faction.

## Links

- Wikilinks throughout, aliased so the sentence reads naturally:
  `[[The Godwounded|The Wounded]]`.
- Link into headers when that's the real target: `[[Peoples#The Core Races|Core Races]]`.
- Books link by page: `[[DnD 5e Players Handbook (BnW OCR).pdf#page=8|5e]]`.

## Player-facing vs DM-facing

**The published site filters on the `DM ` filename prefix.** That prefix is what
actually keeps a note off the site, not the tag.

Every note with secrets is split in two:

- The public note holds what players can read, and links across with
  `[[DM Items#Bag of Holding|DM Extras]]`.
- The DM note is a separate file prefixed `DM `, tagged `private`, and mirrors
  the public note's headers so the pair stays in sync.

The `DM ` prefix and the `private` tag follow each other. A note has both or
neither — never one alone.

`GM ` is not an old spelling of `DM `. Renaming a note from `DM ` to `GM ` is how
a finished campaign gets released to the players, so a `GM ` note is deliberately
public and must not carry the `private` tag. [[GM GitMF Notes]] was published this
way when Goblins in the Misty Falls wrapped.

Never put a secret, a twist, or a stat block in a note that isn't prefixed `DM `.

**Adventure hooks are the exception, and depth decides.** A one-line seed
("Miners vanished after opening a Godwound-tainted seam") stays on the public
location note; eight of them do, across the islands and poles. A developed hooks
block that gives away plot belongs in the `DM ` note, which is why Shieldhaven's
moved. In between, [[Special Sites]] shows the third option: keep the hook public
but label it, `> [!Note] GM Note: **Adventure Hook:**`.

**DM and GM mark visibility, in labels as well as filenames.** Game-master
material sitting on a public note is labelled **GM** (`> [!Note] GM Note:`,
`# GM Screen`); on a `DM `-prefixed note it is labelled **DM**. Two things keep
`DM` regardless: links to real `DM `-prefixed files ([[DM Items]],
`DM Custom Rules`), since that is their actual filename, and the person running
the game ("DM adjudicates", "player 1d20 vs DM 1d10"), since that is a role and
not a visibility marker.

## Callouts

`> [!Note]` is the default (title case). Give it a custom title. `> [!Warning]`
for cautions. Callouts carry genuine asides and conditions, mostly in the rules
notes — they are not a structural template. Ordinary sections use plain `##`
headers, and recurring section names across sibling notes (`## Reputation`,
`## Map`, `## Friction`) are the normal way to keep a set consistent.

Never put scaffolding on a player-facing note — no "new to canon", no "adjust
freely", no notes about what a pass invented or left undone. Untagged notes
publish to players.

Open questions and provisional names do belong in the vault, just in the
`private` DM note, where the DM is the audience and the Gazetteer's
what's-written-and-what-isn't tracking already lives. See
[[DM Shieldhaven#Names still open]] for the shape.

## Tables and diagrams

- Encounter tables are `| Roll (d20) | Encounter |`, ten rows, paired ranges
  1-2 through 19-20.
- Status is written in words, not emoji: Developed, Stub, Empty, Unwritten.
- Timelines are mermaid with `%%{init: {'theme':'forest'}}%%`.

## Working here

- The [[Gazetteer]] is the master worklist. Update a place's status marker there
  when its note changes state.
- Keep [[index|index.md]] in sync when adding a hub-level note.
- Content lives in `0. World`, `1. Rules`, `2. Sessions`, `3. Characters`,
  `4. Assets`. `4. Assets/Books` is reference material, not vault writing.
