
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
  const {
    periodType, timeToElapse, reportedCases, totalHospitalBeds
  } = data;

  const timeInDays = convertToDays(periodType, timeToElapse);
  const currentlyInfected = reportedCases * 10;
  const infectionsByRequestedTime = currentlyInfected * (2 ** (Math.round(timeInDays / 3)));
  const severeCasesByRequestedTime = (0.15 * infectionsByRequestedTime);
  const hospitalBedsByRequestedTime = () => {
    const availableBeds = totalHospitalBeds * 0.35;
    return availableBeds - severeCasesByRequestedTime;
  };

  return {
    currentlyInfected,
    infectionsByRequestedTime,
    severeCasesByRequestedTime,
    hospitalBedsByRequestedTime
  };
};

const calculateSevereImpact = (data) => {
  const {
    periodType, timeToElapse, reportedCases, totalHospitalBeds
  } = data;

  const timeInDays = convertToDays(periodType, timeToElapse);
  const currentlyInfected = reportedCases * 50;
  const infectionsByRequestedTime = currentlyInfected * (2 ** Math.round(timeInDays / 3));
  const severeCasesByRequestedTime = (0.15 * infectionsByRequestedTime);

  const hospitalBedsByRequestedTime = () => {
    const availableBeds = totalHospitalBeds * 0.35;
    return availableBeds - severeCasesByRequestedTime;
  };

  return {
    currentlyInfected,
    infectionsByRequestedTime,
    severeCasesByRequestedTime,
    hospitalBedsByRequestedTime
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
