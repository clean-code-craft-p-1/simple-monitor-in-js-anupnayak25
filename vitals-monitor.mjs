async function displayLoading() {
  for (let i = 0; i < 6; i++) {
    process.stdout.write("\r* ");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    process.stdout.write("\r *");
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}

function getAlertMessage(value, min, max, message) {
  if (value < min || value > max) {
    return message;
  }
  return null;
}

function getSpo2AlertMessage(spo2) {
  if (spo2 < 90) {
    return "Oxygen Saturation out of range!";
  }
  return null;
}

export function validateVitals(temperature, pulseRate, spo2) {
  return getAlertMessage(temperature,95,102,"Temperature is critical!") || 
  getAlertMessage(pulseRate,60,100,"Pulse Rate is out of range!") || 
  getSpo2AlertMessage(spo2);
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
