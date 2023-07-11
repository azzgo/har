import { Browser, Creator, Entry, Har, Page } from "type";

export class HarWrapper {
  constructor(private har: Har) {}

  get version(): string {
    return this.har.log.version
  }

  get creator(): Creator {
    return this.har.log.creator
  }

  get browser(): Browser {
    return this.har.log.browser
  }

  get pageWrapper(): PageWrapper | null {
    if (!this.har.log.pages) {
      return null
    }
    return new PageWrapper(this.har.log.pages) 
  }

  get entryWrapper(): EntryWrapper | null {
    if (!this.har.log.entries) {
      return null
    }
    return new EntryWrapper(this.har.log.entries)
  }
}

export class EntryWrapper {
  constructor(private entries: Entry[]) {}
}

export class PageWrapper {
  constructor(private pages: Page[]) {}
}

