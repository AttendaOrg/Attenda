import { hashMacId } from './hash';

describe('test if the hashing method works correctly', () => {
  it('should hash correctly with out salt ', () => {
    const salt = '';
    const str = '1';
    const hash =
      '6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b';
    const res = hashMacId(salt, str);

    expect(res).toBe(hash);
  });
  it('should hash correctly with salt ', () => {
    const salt = 'salt';
    const str = 'string';
    const hash =
      '294c604d1dd366635aae44c902b45023d3e2652f975641bc512a118749984725';
    const res = hashMacId(salt, str);

    expect(res).toBe(hash);
  });
});
