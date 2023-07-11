import { expect, test } from "vitest";
import { fromPath, fromString, Har } from "../src/lib";
import path from "path";
import fs from "fs";
import { InvalidHarFormat, UnsupportSpecVersion } from "../src/error";
import { HarObject } from '../src/wrapper'

test("read har from file", () => {
  // sample copy from https://gist.github.com/ericduran/6330201
  const har = fromPath(path.resolve(__dirname, "./sample-1.2.har"));
  expect(har).not.toBeNull();
  expect(har?.log.version).toEqual("1.2");
  expect(har?.log.creator.name).toEqual("WebInspector");
});

test("read har from string", () => {
  const har = fromString(
    fs.readFileSync(path.resolve(__dirname, "./sample-1.2.har"), {
      encoding: "utf-8",
    })
  );
  expect(har).not.toBeNull();
  expect(har?.log.version).toEqual("1.2");
  expect(har?.log.creator.name).toEqual("WebInspector");
});

test("throw exception when format wrong", () => {
  expect(() => fromString('{ "log": 1 }')).toThrowError(
    new InvalidHarFormat("InvalidHarFormat")
  );
});

test('only version 1.2 is valid', () => {
  expect(() => fromString('{ "log": { "version": "1.0" } }')).toThrowError(
    new UnsupportSpecVersion("HTTP Archive (HAR) format Only Support version 1.2")
  );
})

