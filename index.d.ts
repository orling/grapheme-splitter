// Type definitions for @naytev/grapheme-splitter

declare class GraphemeSplitter {
  constructor()
  /** count the number of grapheme clusters in a string */
  countGraphemes(s: string): number
  /** split the string to an array of grapheme clusters */
  splitGraphemes(s: string): string[]
}

export = GraphemeSplitter
