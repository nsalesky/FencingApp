const RootScreens = {
  WELCOME: "Welcome",

  REGISTER: "Register",
  ACCOUNT_CREATION: "AccountCreation",

  LOGIN: "Login",
};

type RootStackParamList = {
  Welcome: undefined;
  Register: undefined;
  AccountCreation: {
    fullName: string;
    prefName: string;
  };
  Login: undefined;
};

export { RootScreens, RootStackParamList };
