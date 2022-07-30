import SIL, { DebugMode } from '../src/ts';

describe('SIL', () => {

  it('is constructable', () => {
    expect(new SIL());
  });

  it('has a default debug mode', () => {
    expect(new SIL().getDebugMode()).toBe(DebugMode.None);
  })

  it('can change debug mode', () => {
    expect(new SIL(DebugMode.All).getDebugMode()).toBe(DebugMode.All);
  })

});