import { Browser, Creator, Entry, Har, Page } from "type";

export class HarWrapper {
  constructor(private har: Har) {}

  get version(): string {
    return this.har.log.version;
  }

  get creator(): Creator {
    return this.har.log.creator;
  }

  get browser(): Browser {
    return this.har.log.browser;
  }

  get pageWrapper(): PageWrapper | null {
    if (!this.har.log.pages) {
      return null;
    }
    return new PageWrapper(this.har.log.pages);
  }

  get entryWrapper(): EntryWrapper | null {
    if (!this.har.log.entries) {
      return null;
    }
    return new EntryWrapper(this.har.log.entries);
  }
}

export class EntryWrapper {
  constructor(private entries: Entry[]) {}

  filterByHttpMethod(method: string): Entry[] {
    return this.entries.filter(
      (entry) =>
        entry.request.method.toLowerCase() === method.toLowerCase().trim()
    );
  }
  filterByRequestHeader(headers: Record<string, string>): Entry[]  {
    return this.filterByHeader(headers, 'request')
  }

  filterByResponseHeader(headers: Record<string, string>): Entry[] {
    return this.filterByHeader(headers, 'response')
  }

  private filterByHeader(
    headers: Record<string, string>,
    resreq: "request" | "response"
  ): Entry[] {
    const _headers = Object.entries(headers).map(([key, value]) => [
      key.toLowerCase(),
      value,
    ]);
    return this.entries.filter((entry) => {
      if (entry[resreq].headers.length === 0) return false;
      return _headers.reduce((result, current) => {
        const header = entry[resreq].headers.find(
          (header) => header.name.toLowerCase() === current[0]
        );
        if (header && header.value === current[1]) {
          return result && true;
        }
        return false;
      }, true);
    });
  }
}

export class PageWrapper {
  constructor(private pages: Page[]) {}
}
