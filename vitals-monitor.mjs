async function displayLoading(){
   for (let i = 0; i < 6; i++) {
      process.stdout.write("\r* ");
      await new Promise(resolve => setTimeout(resolve, 1000));
      process.stdout.write("\r *");
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
}

export function validateVitals(temperature, pulseRate, spo2) {
  if (temperature > 102 || temperature < 95) {
    return "Temperature is critical!";
  }
  if (pulseRate < 60 || pulseRate > 100) {
    return "Pulse Rate is out of range!";
  }
  if (spo2 < 90) {
    return "Oxygen Saturation out of range!";
  }
  return null; // everything is OK
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

