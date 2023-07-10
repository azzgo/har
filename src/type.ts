export interface Har {
  log: Log;
}

export interface Log {
  version: string;
  creator: Creator;
  browser: Browser;
  pages?: Page[];
  enties: Entry[];
  comment?: string;
}

export interface Creator {
  name: string;
  version: string;
  comment?: string;
}

export interface Browser {
  name: string;
  version: string;
  comment?: string;
}

export interface Page {
  startedDateTime: string;
  id: string;
  title: string;
  pageTimings: PageTimings;
  comment?: string;
}

export interface PageTimings {
  onContentLoad?: number;
  onLoad?: number;
  comment?: string;
}

export interface Entry {
  pageref?: string;
  startedDateTime: string;
  time: number;
  request: Request;
  response: Response;
  cache: Cache;
  timings: Timings;
  serverIPAddress?: string;
  connection?: string;
  comment?: string;
}

export interface Request {
  method: string;
  url: string;
  httpVersion: string;
  cookies: Cookie[];
  headers: Header[];
  querystring: Querystring[];
  postData?: PostData;
  headersSize: number;
  bodySize: number;
  comment?: string;
  headersCompression?: number;
}

export interface Cookie {
  name: string;
  value: string;
  path?: string;
  domain?: string;
  expires?: string;
  httpOnly?: boolean;
  secure?: boolean;
  comment?: boolean;
}

export interface Header {
  name: string;
  value: string;
  comment?: string;
}

export interface Querystring {
  name: string;
  value: string;
  comment?: string;
}

export interface PostData {
  mimeType: string;
  params: Params[];
  text: string;
  comment?: string;
}

export interface Params {
  name: string;
  value?: string;
  fileName: string;
  contentType?: string;
  comment?: string;
}

export interface Response {
  status: number;
  statusText: string;
  httpVersion: string;
  cookies: Cookie[];
  headers: Header[];
  content: Content;
  redirectURL: string;
  headersSize: number;
  bodySize: number;
  comment?: string;
}

export interface Content {
  size: number;
  compression?: number;
  mimeType: string;
  text?: string;
  encoding?: string;
  comment?: string;
}

export interface Cache {
  beforeRequest?: CacheEntity;
  afterRequest?: CacheEntity;
  comment?: string;
}

export interface CacheEntity {
  expires?: string;
  lastAccess: string;
  eTag: string;
  hitCount: number;
  comment?: string;
}

export interface Timings {
  blocked?: number;
  dns?: number;
  connect?: number;
  send: number;
  wait: number;
  receive: number;
  ssl?: number;
  comment?: string;
}
