import { expect } from "chai";
import { vitalsOk, validateVitals } from "./vitals-monitor.mjs";
import { describe, it } from "node:test";

const normalBloodPressure = { systolic: 120, diastolic: 80 };

describe("vitals checker", function () {
  it("returns true when all vitals are in range", async function () {
    expect(await vitalsOk(98.1, 70, 98, normalBloodPressure)).to.be.true;
  });

  it("returns false when temperature is too low or too high", async function () {
    expect(await vitalsOk(94, 70, 98, normalBloodPressure)).to.be.false; // low temp
    expect(await vitalsOk(103, 70, 98, normalBloodPressure)).to.be.false; // high temp
  });

  it("returns false when pulse rate is too low or too high", async function () {
    expect(await vitalsOk(98.1, 59, 98, normalBloodPressure)).to.be.false; // low pulse
    expect(await vitalsOk(98.1, 101, 98, normalBloodPressure)).to.be.false; // high pulse
  });

  it("returns false when spo2 is too low", async function () {
    expect(await vitalsOk(98.1, 70, 89, normalBloodPressure)).to.be.false;
  });

  it("returns false when blood pressure is out of range", async function () {
    expect(await vitalsOk(98.1, 70, 98, { systolic: 80, diastolic: 40 })).to.be.false; // low MAP
    expect(await vitalsOk(98.1, 70, 98, { systolic: 160, diastolic: 100 })).to.be.false; // high MAP
  });

  it("returns out of bound messages", function () {
    expect(validateVitals(94, 70, 98, normalBloodPressure)).to.equal("Temperature is critical!");
    expect(validateVitals(103, 70, 98, normalBloodPressure)).to.equal("Temperature is critical!");
    expect(validateVitals(98.1, 59, 98, normalBloodPressure)).to.equal("Pulse Rate is out of range!");
    expect(validateVitals(98.1, 101, 98, normalBloodPressure)).to.equal("Pulse Rate is out of range!");
    expect(validateVitals(98.1, 70, 89, normalBloodPressure)).to.equal("Oxygen Saturation out of range!");
    expect(validateVitals(98.1, 70, 98, { systolic: 80, diastolic: 40 })).to.equal("Blood Pressure is out of range!");
    expect(validateVitals(98.1, 70, 98, { systolic: 160, diastolic: 100 })).to.equal("Blood Pressure is out of range!");
    expect(validateVitals(98.1, 70, 98, normalBloodPressure)).to.equal(null);
  });
});
