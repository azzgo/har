import { expect, test } from "vitest";
import { EntryWrapper, HarWrapper, PageWrapper } from "../src/wrapper";
import { createEntry, createHar, createPage } from "./test-factories";

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
