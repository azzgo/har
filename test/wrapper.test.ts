import { describe, expect, test } from "vitest";
import { EntryWrapper, HarWrapper, PageWrapper } from "../src/wrapper";
import {
  createEntry,
  createHar,
  createPage,
  createRequest,
} from "./test-factories";

test("create a Har Wrapper", () => {
  const har = {
    log: {
      version: "1.2",
      browser: { name: "Firefox", version: "3.6" },
      creator: { name: "Firebug", version: "1.6" },
    },
  };
  const wrapper = new HarWrapper(har);
  expect(wrapper.version).toBe("1.2");
  expect(wrapper.browser.name).toEqual("Firefox");
  expect(wrapper.creator.name).toEqual("Firebug");
});

describe("Har Wrapper", () => {
  test("can get Entry Wrapper", () => {
    const wrapper = new HarWrapper(
      createHar({
        entries: [createEntry({})],
      })
    );

    expect(wrapper.entryWrapper).toBeInstanceOf(EntryWrapper);
  });

  test("can get Entry Wrapper", () => {
    const wrapper = new HarWrapper(
      createHar({
        pages: [createPage({})],
      })
    );

    expect(wrapper.entryWrapper).toBeInstanceOf(EntryWrapper);
  });

  test("can get Page Wrapper", () => {
    const wrapper = new HarWrapper(
      createHar({
        entries: [createEntry({})],
      })
    );

    expect(wrapper.pageWrapper).toBeInstanceOf(PageWrapper);
  });
});

test("EntryWrapper can filter entry by HTTP method", () => {
  const entry1 = createEntry({ request: createRequest({ method: "POST" }) });
  const entry2 = createEntry({ request: createRequest({ method: "POST" }) });
  const entry3 = createEntry({ request: createRequest({ method: "GET" }) });
  const entry4 = createEntry({ request: createRequest({ method: "PATCH" }) });
  const wrapper = new EntryWrapper([entry1, entry2, entry3, entry4]);

  const postEntries = wrapper.filterByHttpMethod("POST");
  expect(postEntries.length).toEqual(2);
  expect(postEntries.indexOf(entry1)).greaterThan(-1);
  expect(postEntries.indexOf(entry2)).greaterThan(-1);

  const getEntries = wrapper.filterByHttpMethod("GET");
  expect(getEntries.length).toEqual(1);
  expect(getEntries[0]).toEqual(entry3);

  const patchEntries = wrapper.filterByHttpMethod("patch");
  expect(patchEntries.length).toEqual(1);
  expect(patchEntries[0]).toEqual(entry4);

  expect(wrapper.filterByHttpMethod("delete")).toEqual([]);
  expect(wrapper.filterByHttpMethod("HEAD")).toEqual([]);
  expect(wrapper.filterByHttpMethod("put")).toEqual([]);
});
