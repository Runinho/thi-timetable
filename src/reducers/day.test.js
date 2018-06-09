import { isOverlapping } from './../../src/reducers/day';

test('not overlapping edge a > b', () => {
  const a = [null, null, 0, 1];
  const b = [null, null, 1, 2];
  expect(isOverlapping(a, b)).toBe(false);
});
test('not overlapping edge a < b', () => {
  const a = [null, null, 1, 2];
  const b = [null, null, 0, 1];
  expect(isOverlapping(a, b)).toBe(false);
});
test('not overlapping a < b', () => {
  const a = [null, null, 0, 1];
  const b = [null, null, 2, 3];
  expect(isOverlapping(a, b)).toBe(false);
});
test('not overlapping a > b', () => {
  const a = [null, null, 2, 3];
  const b = [null, null, 0, 1];
  expect(isOverlapping(a, b)).toBe(false);
});
test('overlapping a < b', () => {
  const a = [null, null, 0, 2];
  const b = [null, null, 1, 3];
  expect(isOverlapping(a, b)).toBe(true);
});
test('overlapping a > b', () => {
  const a = [null, null, 1, 3];
  const b = [null, null, 0, 2];
  expect(isOverlapping(a, b)).toBe(true);
});
test('overlapping a in b', () => {
  const a = [null, null, 0, 3];
  const b = [null, null, 1, 2];
  expect(isOverlapping(a, b)).toBe(true);
});
test('overlapping b in a', () => {
  const a = [null, null, 1, 2];
  const b = [null, null, 0, 3];
  expect(isOverlapping(a, b)).toBe(true);
});