/* eslint-disable */
import { getJestProjects } from '@nrwl/jest';

export default {
  projects: getJestProjects(),
  // Enable coverage collection
  collectCoverage: true,
  // Define coverage reporters
  coverageReporters: ['json', 'html'],
  // Define coverage thresholds
  /*coverageThreshold: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80
    }
  }*/
};
