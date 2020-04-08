const calculateImpact = (data) => ({
  // currentlyInfected: data.reportedCases * 10,
  // infectionsByRequestedTime: data.currentlyInfected * 1024
});

const calculateSevereImpact = (data) => ({
  // currentlyInfected: data.reportedCases * 50,
  // infectionsByRequestedTime: data.currentlyInfected * 1024
});

const covid19ImpactEstimator = (data) => ({
  data,
  impact: calculateImpact(data),
  severeImpact: calculateSevereImpact(data)
});

export default covid19ImpactEstimator;
