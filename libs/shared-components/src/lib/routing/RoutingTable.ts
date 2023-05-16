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
  login: {
    root: 'login',
  },
} as const;
