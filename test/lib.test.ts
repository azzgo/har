import { expect, test } from 'vitest';
import {fromPath} from '../src/lib';
import path from 'path';

test('read har from file', () => {
  // sample copy from https://gist.github.com/ericduran/6330201
  const har = fromPath(path.resolve(__dirname, './sample-1.2.har'))
  expect(har).not.toBeNull()
  expect(har?.log.version).toEqual('1.2')
  expect(har?.log.creator.name).toEqual('WebInspector')
})
