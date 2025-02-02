export const calculateBMI = (height: number, weight: number, isMetric: boolean) => {
    if (isMetric) {
        const heightM = height / 100; // Convert height to meters
        return weight / (heightM * heightM);
    }

    else {
      return 703 * (weight/ (height * height))
    }
  };