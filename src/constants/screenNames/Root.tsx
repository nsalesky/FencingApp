const RootScreens = {
  WELCOME: "Welcome",

  REGISTER: "Register",
  ACCOUNT_CREATION: "AccountCreation",

  LOGIN: "Login",

  HOME: "Home",
};

type RootStackParamList = {
  Welcome: undefined;
  Register: undefined;
  AccountCreation: {
    fullName: string;
    prefName: string;
  };
  Login: undefined;
  Home: undefined;
};

export { RootScreens, RootStackParamList };
