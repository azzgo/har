# Har Blz - A Http Archive File parser

HAR 全称是 Http Archive File, 具体可见 W3C 文档 [HTTP Archive (HAR) format](https://w3c.github.io/web-performance/specs/HAR/Overview.html)。

虽然 HAR 文档格式已经被废弃了，但是当今你仍然可以在现代浏览器还有其他比如 Charles、Fiddler 以及 Postman 等等软件看到在广泛地使用。

我创建这个 library 目的是为了方便从 HAR 文件中提取 API 数据，从而进行数据分析或者开发网页客户端时准备 mock server 的数据，希望也能帮到你

## Install

```bash
npm install --save harblz
```

## Usage

### 获取所有 json 返回的 Entry

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

### Exception

- InvalidHarFormat: 当读取的 HAR 文件内容或者 HAR JSON String 不符合 HAR 文档格式时抛出
- UnsupportSpecVersion: 当 HAR 文档版本格式不支持（当前仅支持 1.2 版本）

### Wrapper

提供一些 Wrapper，基于 HAR Object 提供一些方便的工具函数

**HarWrapper**

```ts
import { HarWrapper } from "harbiz";

// const har = fromString('...')
const harWrapper = new HarWrapper(har);
```

| field        | type         | description              |
| :----------- | ------------ | ------------------------ |
| version      | string       | HAR 文件版本号           |
| creator      | Creator      | HAR 文件的创建者信息     |
| browser      | Browser      | User Agent 相关信息      |
| pageWrapper  | PageWrapper  | Pages 封装，目前是空实现 |
| entryWrapper | EntryWrapper | Entries 封装             |

**EntryWrapper**

| method                 | type                                                                 | description                          |
| :--------------------- | -------------------------------------------------------------------- | ------------------------------------ |
| filterByHttpMethod     | (method: string): Entry[]                                            | 按 HTTP 请求 method 过滤 Entries     |
| filterByRequestHeader  | (headers: Record<string, string>): Entry[]                           | 按 HTTP 请求 headers 过滤 Entries    |
| filterByResponseHeader | (headers: Record<string, string>): Entry[]                           | 按 HTTP 响应 headers 过滤 Entries    |
| filterByStatus         | (filterOrFilterFn: ((status: number) => boolean) \| number): Entry[] | 按 HTTP 响应状态码过滤 Entries       |
| filterByMimeType       | (mineType: string): Entry[]                                          | 按 HTTP 响应的 mineType 过滤 Entries |
