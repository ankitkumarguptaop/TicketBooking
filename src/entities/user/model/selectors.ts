export const selectCurrentUser = (state: RootState) => state.session.user;

export const selectIsAuthenticated = (state: RootState) => state.session.user !== null;
