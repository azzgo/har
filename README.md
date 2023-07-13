# Har Blz - A Http Archive File parser

HAR stands for Http Archive File, as described in the W3C documentation [HTTP Archive (HAR) format ↗](https://w3c.github.io/web-performance/specs/HAR/Overview.html).

Although the HAR document format has been deprecated, it is still widely used today in modern browsers and other software such as Charles, Fiddler, and Postman.

The purpose of creating this library is to make it easy to extract API data from HAR files for data analysis or to prepare data for mock servers when developing web clients. I hope it can help you too.

## Install

```bash
npm install --save harblz
```

## Usage

### Get all json returned Entry

```ts
import { fromPath, HarWrapper, fromString } from "harbiz";

const har = fromPath(path.resolve(__dirname, "./sample-1.2.har"));
// or const har = fromString('{ "log": { ... } ');

const harWrapper = new HarWrapper(har);

const entires = harWrapper.entryWrapper.filterByMimeType("application/json");

// prepare data and launch a mock server
```

## API

### Load HAR object

```ts
// load from file
const har = fromPath(path.resolve(__dirname, "./sample-1.2.har"));

// load from json string
const har = fromString(
  fs.readFileSync(path.resolve(__dirname, "./sample-1.2.har"), {
    encoding: "utf-8",
  })
);
```

### Exceptions

- InvalidHarFormat: thrown when the content of the HAR file read or the HAR JSON String does not conform to the HAR document format.
- UnsupportSpecVersion: thrown when the HAR document version format is not supported (currently only version 1.2 is supported).

### Wrappers

Provides some wrappers that provide convenient utility functions based on the HAR Object.

**HarWrapper**

```ts
import { HarWrapper } from "harbiz";

// const har = fromString('...')
const harWrapper = new HarWrapper(har);
```

| field        | type         | description              |
| :----------- | ------------ | ------------------------ |
| version      | string       | The version number of the HAR file |
| creator      | Creator      | Information about the creator of the HAR file |
| browser      | Browser      | User Agent related information |
| pageWrapper  | PageWrapper  | Pages wrapper, currently an empty implementation |
| entryWrapper | EntryWrapper | Entries wrapper |

**EntryWrapper**

| method                 | type                                                                 | description                          |
| :--------------------- | -------------------------------------------------------------------- | ------------------------------------ |
| filterByHttpMethod     | (method: string): Entry[]                                            | Filter Entries by HTTP request method |
| filterByRequestHeader  | (headers: Record<string, string>): Entry[]                           | Filter Entries by HTTP request headers |
| filterByResponseHeader | (headers: Record<string, string>): Entry[]                           | Filter Entries by HTTP response headers |
| filterByStatus         | (filterOrFilterFn: ((status: number) => boolean) \| number): Entry[] | Filter Entries by HTTP response status code |
| filterByMimeType       | (mineType: string): Entry[]                                          | Filter Entries by HTTP response mimeType |
