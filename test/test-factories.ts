import {
  Content,
  Entry,
  Har,
  Header,
  Log,
  Page,
  Request,
  Response,
} from "../src/type";

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
  request = createRequest({}),
  response = createResponse({}),
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

export function createRequest({
  method = "GET",
  url = "http://www.example.com/path/?param=value",
  httpVersion = "HTTP/1.1",
  cookies = [],
  headers = [],
  queryString = [],
  headersSize = 150,
  bodySize = 0,
  comment = "",
}: Partial<Request>): Request {
  return {
    method,
    url,
    httpVersion,
    cookies,
    headers,
    queryString,
    headersSize,
    bodySize,
    comment,
  };
}

export function createResponse({
  status = 200,
  statusText = "OK",
  httpVersion = "HTTP/1.1",
  cookies = [],
  headers = [],
  content = createContent({}),
  redirectURL = "",
  headersSize = 160,
  bodySize = 850,
  comment = "",
}: Partial<Response>): Response {
  return {
    status,
    statusText,
    httpVersion,
    cookies,
    headers,
    content,
    redirectURL,
    headersSize,
    bodySize,
    comment,
  };
}

export function createContent({
  size = 33,
  compression = 0,
  mimeType = "text/html; charset=utf-8",
  text = "Hello World\n",
  comment = "",
}: Partial<Content>): Content {
  return {
    size,
    compression,
    mimeType,
    text,
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

export function createHeader({
  name = "Content-Type",
  value = "text/plain",
  comment,
}: Partial<Header>): Header {
  return {
    name,
    value,
    comment,
  };
}

export const createHeaderAuthorization = (authorization: string) =>
  createHeader({ name: "Authorization", value: authorization });
export const createHeaderContentType = (contentType: string) =>
  createHeader({ name: "Content-Type", value: contentType });
export const createHeaderHost = (host: string) =>
  createHeader({ name: "Host", value: host });
export const createHeaderReferer = (referer: string) =>
  createHeader({ name: "Referer", value: referer });
export const createHeaderServer = (server: string) =>
  createHeader({ name: "Server", value: server });
