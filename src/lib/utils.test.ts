import { test } from 'node:test';
import assert from 'node:assert';
import { cn } from './utils.ts';

test('cn utility function', async (t) => {
  await t.test('merges simple classes', () => {
    assert.strictEqual(cn('a', 'b'), 'a b');
  });

  await t.test('handles conditional classes', () => {
    assert.strictEqual(cn('a', true && 'b', false && 'c'), 'a b');
  });

  await t.test('merges tailwind classes correctly (conflicts)', () => {
    // twMerge should handle this: px-4 overrides px-2
    assert.strictEqual(cn('px-2', 'px-4'), 'px-4');
    assert.strictEqual(cn('text-red-500', 'text-blue-500'), 'text-blue-500');
  });

  await t.test('handles objects and arrays', () => {
    assert.strictEqual(cn({ 'a': true, 'b': false }, 'c'), 'a c');
    assert.strictEqual(cn(['a', 'b'], 'c'), 'a b c');
  });

  await t.test('handles empty inputs', () => {
    assert.strictEqual(cn(), '');
    assert.strictEqual(cn(null, undefined, false, ''), '');
  });
});
