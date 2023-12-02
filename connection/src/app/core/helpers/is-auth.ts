export const isAuth = (): boolean => {
  return !!localStorage.getItem('token');
};
