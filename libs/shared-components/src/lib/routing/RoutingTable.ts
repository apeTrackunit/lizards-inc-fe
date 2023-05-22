export const RoutingTable = {
  root: '/',
  home: {
    root: 'home',
  },
  history: {
    root: 'history',
  },
  animals: {
    root: 'animals',
    detail: {
      edit: 'edit',
    },
  },
  limitsAndBoundaries: {
    root: 'limits-and-boundaries'
  }
} as const;
