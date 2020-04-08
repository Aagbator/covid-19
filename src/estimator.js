const covid19ImpactEstimator = (data) => {
  const impact = {};
  const severeImpact = {};

  impact.currentlyInfected = data.reportedCases * 10;
  impact.infectionsByRequestedTime = impact.currentlyInfected * 1024;

  severeImpact.currentlyInfected = data.reportedCases * 50;
  severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * 1024;

  return {
    data, // the input data you got
    impact, // your best case estimation
    severeImpact // your severe case estimation
  };
};

export default covid19ImpactEstimator;
