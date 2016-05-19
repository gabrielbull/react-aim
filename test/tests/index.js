import { expect } from 'chai';
import menuBuffer from '../../src/index';

describe('index', () => {
  it('should be exported', () => {
    expect(menuBuffer).to.exist;
  });
});
