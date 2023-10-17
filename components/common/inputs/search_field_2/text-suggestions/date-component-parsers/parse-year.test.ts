import { parseYear } from './parse-year';

describe('Date parsers', () => {
  it('should return false on single digit', () => {
    const c = '2';
    const res = parseYear([4])(c);
    expect(res).toBe(false);
  });

  it('should return year on two digits, if they are allowed', () => {
    const c = '22';
    const res = parseYear([2, 4])(c);
    expect(res).toBe(2022);
  });

  it('should return false on two digits, if they are not allowed', () => {
    const c = '22';
    const res = parseYear([4])(c);
    expect(res).toBe(false);
  });

  it('should return false on three digits', () => {
    const c = '202';
    const res = parseYear([4])(c);
    expect(res).toBe(false);

    const c1 = '202';
    const res1 = parseYear([2, 4])(c1);
    expect(res1).toBe(false);
  });

  it('should parse four digit date', () => {
    const c = '2022';
    const res = parseYear([4])(c);
    expect(res).toBe(2022);
  });

  it('should pareturn false on date vefore 1990', () => {
    const c = '1989';
    const res = parseYear([4])(c);
    expect(res).toBe(false);
  });

  it('should return false on non numeric strings', () => {
    const c1 = 'ab';
    const c2 = 'abcd';
    const c3 = 'a';

    const res1 = parseYear([2, 4])(c1);
    const res2 = parseYear([2, 4])(c2);
    const res3 = parseYear([2, 4])(c3);

    expect(res1).toBe(false);
    expect(res2).toBe(false);
    expect(res3).toBe(false);
  });
});
