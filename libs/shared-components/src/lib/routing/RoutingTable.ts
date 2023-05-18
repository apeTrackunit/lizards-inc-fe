export const RoutingTable = {
  root: '/',
  home: {
    root: 'home',
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
