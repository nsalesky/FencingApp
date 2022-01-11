const RootScreens = {
  WELCOME: "Welcome",

  REGISTER: "Register",
  ACCOUNT_CREATION: "AccountCreation",

  LOGIN: "Login",

  MAIN_TAB_FLOW: "MainTabFlow",
};

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

export { RootScreens, RootStackParamList };
