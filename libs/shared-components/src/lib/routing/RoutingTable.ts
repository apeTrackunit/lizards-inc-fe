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
} as const;
