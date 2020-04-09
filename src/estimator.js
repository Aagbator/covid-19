const calculateImpact = (data) => ({
  currentlyInfected: data.reportedCases * 10,
  infectionsByRequestedTime: this.currentlyInfected * (2 ** Math.floor(data.timeToElapse / 3))
});

const calculateSevereImpact = (data) => ({
  currentlyInfected: data.reportedCases * 50,
  infectionsByRequestedTime: this.currentlyInfected * (2 ** Math.floor(data.timeToElapse / 3))
});

const covid19ImpactEstimator = (data) => ({
  data,
  impact: calculateImpact(data),
  severeImpact: calculateSevereImpact(data)
});

export default covid19ImpactEstimator;
