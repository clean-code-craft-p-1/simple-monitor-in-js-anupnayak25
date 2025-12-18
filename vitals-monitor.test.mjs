import { expect } from 'chai';
import { vitalsOk ,validateVitals } from './vitals-monitor.mjs';
import { describe, it } from 'node:test';

describe('vitals checker', function () {
  it('returns true when all vitals are in range', async function () {
    expect(await vitalsOk(98.1, 70, 98)).to.be.true;
  });

  it('returns false when temperature is too low or too high', async function () {
    expect(await vitalsOk(94, 70, 98)).to.be.false;   // low temp
    expect(await vitalsOk(103, 70, 98)).to.be.false;  // high temp
  });

  it('returns false when pulse rate is too low or too high', async function () {
    expect(await vitalsOk(98.1, 59, 98)).to.be.false;  // low pulse
    expect(await vitalsOk(98.1, 101, 98)).to.be.false; // high pulse
  });

  it('returns false when spo2 is too low', async function () {
    expect(await vitalsOk(98.1, 70, 89)).to.be.false;
  });

  it('returns out of bound messages', function () {
    expect(validateVitals(94, 70, 98)).to.equal("Temperature is critical!");
    expect(validateVitals(103, 70, 98)).to.equal("Temperature is critical!");
    expect(validateVitals(98.1, 59, 98)).to.equal("Pulse Rate is out of range!");
    expect(validateVitals(98.1, 101, 98)).to.equal("Pulse Rate is out of range!");
    expect(validateVitals(98.1, 70, 89)).to.equal("Oxygen Saturation out of range!");
    expect(validateVitals(98.1, 70, 98)).to.equal(null);
  });
});
