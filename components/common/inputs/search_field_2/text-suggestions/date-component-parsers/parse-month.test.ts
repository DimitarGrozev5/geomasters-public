import {
  parseNumericMonth,
  parseNumericOrStringMonth,
  parseStringMonth,
} from './parse-month';

describe('Parsing numeric month', () => {
  it('should parse single digit months', () => {
    const m = '5';
    const res = parseNumericMonth()(m);
    expect(res).toBe(4);
  });

  it('should parse two digit months', () => {
    const m = '10';
    const res = parseNumericMonth()(m);
    expect(res).toBe(9);
  });

  it('should reject three digit months', () => {
    const m = '123';
    const res = parseNumericMonth()(m);
    expect(res).toBe(false);
  });

  it('should reject months less than 1', () => {
    const m = '0';
    const res = parseNumericMonth()(m);
    expect(res).toBe(false);
  });

  it('should reject months greather than 12', () => {
    const m = '13';
    const res = parseNumericMonth()(m);
    expect(res).toBe(false);
  });

  it('should reject non numeric values', () => {
    const m = 'ab';
    const res = parseNumericMonth()(m);
    expect(res).toBe(false);
  });
});

describe('Parsing text month', () => {
  it('should parse all months, when givven full name', () => {
    const testCases = [
      'Януари',
      'Февруари',
      'Март',
      'Април',
      'Май',
      'Юни',
      'Юли',
      'Август',
      'Септември',
      'Октомври',
      'Ноември',
      'Декември',
    ];

    const results = testCases.map((testCase) => parseStringMonth()(testCase));

    results.forEach((res, i) => expect(res).toBe(i));
  });

  it('should rejects strings that are not months', () => {
    const testCases = ['abc', '10', ''];
    const results = testCases.map((testCase) => parseStringMonth()(testCase));
    results.forEach((res) => expect(res).toBe(false));
  });

  it('should be case insensitive', () => {
    const c = 'януари';
    const res = parseStringMonth()(c);
    expect(res).toBe(0);
  });

  it('should parse month if givven three or more chars', () => {
    const testCases = ['апр', 'апри', 'април'];

    const results = testCases.map((testCase) => parseStringMonth()(testCase));

    results.forEach((res) => expect(res).toBe(3));
  });

  it('should reject month if givven less than three chars', () => {
    const testCases = ['', 'а', 'ап'];

    const results = testCases.map((testCase) => parseStringMonth()(testCase));

    results.forEach((res) => expect(res).toBe(false));
  });
});

describe('Parsing text or numeric month', () => {
  it('should parse string month', () => {
    const c = 'Юли';
    const res = parseNumericOrStringMonth()(c);
    expect(res).toBe(6);
  });

  it('should parse numeric month', () => {
    const c = '7';
    const res = parseNumericOrStringMonth()(c);
    expect(res).toBe(6);
  });
});
