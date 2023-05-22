import { getJestProjects } from '@nrwl/jest';

export default {
  projects: getJestProjects(),

  preset: './jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nrwl/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nrwl/react/babel'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],

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
