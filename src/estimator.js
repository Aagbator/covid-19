
const convertToDays = (periodType, timeToElapse) => {
  let days;
  if (periodType === 'weeks') {
    days = timeToElapse * 7;
  } else if (periodType === 'months') {
    days = timeToElapse * 30;
  } else {
    days = timeToElapse;
  }
  return days;
};

const hospitalBedsByRequestedTime = (data, severeCases) => {
  const availableBeds = data.totalHospitalBeds * 0.35;
  return Math.trunc(availableBeds - severeCases);
};

const dollarsInFlight = (data, infectionsByRequestedTime, timeInDays) => {
  const RequestedTimeByRegion = infectionsByRequestedTime * data.region.avgDailyIncomePopulation;
  return Math.trunc((RequestedTimeByRegion * data.region.avgDailyIncomeInUSD) / timeInDays);
};

const calculateImpact = (data) => {
  const timeInDays = convertToDays(data.periodType, data.timeToElapse);
  const currentlyInfected = data.reportedCases * 10;
  const infectionsByRequestedTime = currentlyInfected * (2 ** (Math.floor(timeInDays / 3)));
  const severeCasesByRequestedTime = Math.trunc(0.15 * infectionsByRequestedTime);
  const casesForICUByRequestedTime = Math.trunc(0.05 * infectionsByRequestedTime);
  const casesForVentilatorsByRequestedTime = Math.trunc(0.02 * infectionsByRequestedTime);

  return {
    currentlyInfected,
    infectionsByRequestedTime,
    severeCasesByRequestedTime,
    hospitalBedsByRequestedTime: hospitalBedsByRequestedTime(data, severeCasesByRequestedTime),
    casesForICUByRequestedTime: Math.trunc(casesForICUByRequestedTime),
    casesForVentilatorsByRequestedTime,
    dollarsInFlight: dollarsInFlight(data, infectionsByRequestedTime, timeInDays)
  };
};

const calculateSevereImpact = (data) => {
  const timeInDays = convertToDays(data.periodType, data.timeToElapse);
  const currentlyInfected = data.reportedCases * 50;
  const infectionsByRequestedTime = currentlyInfected * (2 ** Math.trunc(timeInDays / 3));
  const severeCasesByRequestedTime = Math.trunc(0.15 * infectionsByRequestedTime);
  const casesForICUByRequestedTime = Math.trunc(0.05 * infectionsByRequestedTime);
  const casesForVentilatorsByRequestedTime = Math.trunc(0.02 * infectionsByRequestedTime);

  return {
    currentlyInfected,
    infectionsByRequestedTime,
    severeCasesByRequestedTime,
    hospitalBedsByRequestedTime: hospitalBedsByRequestedTime(data, severeCasesByRequestedTime),
    casesForICUByRequestedTime: Math.trunc(casesForICUByRequestedTime),
    casesForVentilatorsByRequestedTime,
    dollarsInFlight: dollarsInFlight(data, infectionsByRequestedTime, timeInDays)
  };
};

const covid19ImpactEstimator = (data) => ({
  data,
  impact: calculateImpact(data),
  severeImpact: calculateSevereImpact(data)
});

export default covid19ImpactEstimator;
