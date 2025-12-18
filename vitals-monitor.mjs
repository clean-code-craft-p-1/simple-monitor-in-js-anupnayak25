async function displayLoading() {
  for (let i = 0; i < 6; i++) {
    process.stdout.write("\r* ");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    process.stdout.write("\r *");
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}

function checkTemperature(temperature) {
  if (temperature < 95 || temperature > 102) {
    return "Temperature is critical!";
  }
  return null;
}

function checkPulseRate(pulseRate) {
  if (pulseRate < 60 || pulseRate > 100) {
    return "Pulse Rate is out of range!";
  }
  return null;
}

function checkSpo2(spo2) {
  if (spo2 < 90) {
    return "Oxygen Saturation out of range!";
  }
  return null;
}

export function validateVitals(temperature, pulseRate, spo2) {
  return checkTemperature(temperature) || checkPulseRate(pulseRate) || checkSpo2(spo2);
}

export async function vitalsOk(temperature, pulseRate, spo2) {
  const error = validateVitals(temperature, pulseRate, spo2);
  if (error) {
    console.log(error);
    await displayLoading();
    return false;
  }
  return true;
}
