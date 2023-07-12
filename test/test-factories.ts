import { Entry, Har, Log, Page } from "../src/type";

export function createHar({ entries = [], pages = [] }: Partial<Log>): Har {
  return {
    log: {
      version: "1.2",
      browser: { name: "Firefox", version: "3.6" },
      creator: { name: "Firebug", version: "1.6" },
      entries,
      pages,
    },
  };
}

export function createEntry({
  pageref = "page_0",
  startedDateTime = "2009-04-16T12:07:23.596Z",
  time = 50,
  request = {
    method: "GET",
    url: "http://www.example.com/path/?param=value",
    httpVersion: "HTTP/1.1",
    cookies: [],
    headers: [],
    queryString: [],
    headersSize: 150,
    bodySize: 0,
    comment: "",
  },
  response = {
    status: 200,
    statusText: "OK",
    httpVersion: "HTTP/1.1",
    cookies: [],
    headers: [],
    content: {
      size: 33,
      compression: 0,
      mimeType: "text/html; charset=utf-8",
      text: "Hello World\n",
      comment: "",
    },
    redirectURL: "",
    headersSize: 160,
    bodySize: 850,
    comment: "",
  },
  cache = {},
  timings = {
    blocked: 0,
    dns: -1,
    connect: 15,
    send: 20,
    wait: 38,
    receive: 12,
    ssl: -1,
    comment: "",
  },
  serverIPAddress = "10.0.0.1",
  connection = "52492",
  comment = "",
}: Partial<Entry>): Entry {
  return {
    pageref,
    startedDateTime,
    time,
    request,
    response,
    cache,
    timings,
    serverIPAddress,
    connection,
    comment,
  };
}

export function createPage({
  startedDateTime = "2009-04-16T12:07:25.123+01:00",
  title = "Test Page",
  pageTimings = {
    onContentLoad: 1720,
    onLoad: 2500,
  },
  id = "test-id",
}: Partial<Page>): Page {
  return {
    startedDateTime,
    id,
    title,
    pageTimings,
    comment: "",
  };
}
