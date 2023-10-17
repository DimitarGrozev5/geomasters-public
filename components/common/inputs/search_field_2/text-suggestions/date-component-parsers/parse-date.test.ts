import { parseDate } from './parse-date';
import {} from './parse-month';

describe('Parsing date', () => {
  it('should parse numeric date', () => {
    const d = '12';
    const res = parseDate(1, 2022)(d);
    expect(res).toBe(12);
  });

  it('should reject non numeric date', () => {
    const d = 'ab';
    const res = parseDate(1, 2022)(d);
    expect(res).toBe(false);
  });

  it('should reject date bellow 1', () => {
    const d = '0';
    const res = parseDate(1, 2022)(d);
    expect(res).toBe(false);
  });

  it('should accept 31 for January', () => {
    const d = '31';
    const res = parseDate(0, 2022)(d);
    expect(res).toBe(31);
  });

  it('should accept 30 for April', () => {
    const d = '30';
    const res = parseDate(3, 2022)(d);
    expect(res).toBe(30);
  });

  it('should reject date above 31 for January', () => {
    const d = '32';
    const res = parseDate(0, 2022)(d);
    expect(res).toBe(false);
  });

  it('should reject date above 28 for Feb 2022', () => {
    const d = '29';
    const res = parseDate(1, 2022)(d);
    expect(res).toBe(false);
  });

  it('should accept date for 29 Feb 2024', () => {
    const d = '29';
    const res = parseDate(1, 2024)(d);
    expect(res).toBe(29);
  });

  it('should reject date above 30 Apr 2022', () => {
    const d = '31';
    const res = parseDate(3, 2022)(d);
    expect(res).toBe(false);
  });
});
