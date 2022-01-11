/**
 * The route parameters expected for each of the root stack screens.
 */
type RootStackParamList = {
  Welcome: undefined;
  Register: undefined;
  AccountCreation: {
    fullName: string;
    prefName: string;
  };
  Login: undefined;
  MainTabFlow: undefined;
};

export { RootStackParamList };
