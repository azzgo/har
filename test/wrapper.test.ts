import { expect, test } from "vitest";
import { HarWrapper } from "../src/wrapper";

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
