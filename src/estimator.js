
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

const calculateImpact = (data) => {
  const { periodType, timeToElapse } = data;

  const timeInDays = convertToDays(periodType, timeToElapse);
  const currentlyInfected = data.reportedCases * 10;
  const infectionsByRequestedTime = currentlyInfected * (2 ** (Math.round(timeInDays / 3)));

  return {
    currentlyInfected,
    infectionsByRequestedTime
  };
};

const calculateSevereImpact = (data) => {
  const timeInDays = convertToDays(data.periodType, data.timeToElapse);
  const currentlyInfected = data.reportedCases * 50;
  const infectionsByRequestedTime = currentlyInfected * (2 ** Math.round(timeInDays / 3));

  return {
    currentlyInfected,
    infectionsByRequestedTime
  };
};

const covid19ImpactEstimator = (data) => ({
  data,
  impact: calculateImpact(data),
  severeImpact: calculateSevereImpact(data)
});

export default covid19ImpactEstimator;


// {
//   region: {
//     name: "Africa",
//       avgAge: 19.7,
//       avgDailyIncomeInUSD: 5,
//       avgDailyIncomePopulation: 0.71
//   },
//   periodType: "days",
//     timeToElapse: 58,
//   reportedCases: 674,
//   population: 66622705,
//   totalHospitalBeds: 1380614
// }
