import jwt from "expo-jwt";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AUTH_SECRET } from "@env";
import { SupportedAlgorithms } from "expo-jwt/dist/types/algorithms";

/**
 * Creates an authentication token authenticating the user with the given `email`.
 * @param email the unique email address of the user to authenticate
 * @returns a token uniquely authenticating the user with the given `email`
 */
const createAuthToken = (email: string): string => {
  // todo: add expiration
  return jwt.encode(
    {
      email,
    },
    AUTH_SECRET,
    {
      algorithm: SupportedAlgorithms.HS256,
    }
  );
};

const AUTH_KEY = "auth_key";

/**
 * The complete login info for a given user, storing their unique email address and unique login token.
 */
interface TokenInfo {
  email: string;
  token: string;
}

/**
 * Generates a new login token for the user with the given `email` and stores it for later.
 * @param email the unique email of the user to generate a token for
 */
export const logInUser = async (email: string) => {
  const token = createAuthToken(email);

  // The complete login info
  const info = {
    email,
    token,
  };

  await AsyncStorage.setItem(AUTH_KEY, JSON.stringify(info));
};

/**
 * Clears the currently stored login token.
 */
export const logOutUser = async () => {
  await AsyncStorage.removeItem(AUTH_KEY);
};

/**
 * Gets the complete login info, if it exists.
 * @returns either an object containing the current user's email and token, or null if no user is logged in.
 */
export const getLoginInfo = async (): Promise<TokenInfo | null> => {
  const info = await AsyncStorage.getItem(AUTH_KEY);
  return info != null ? JSON.parse(info) : null;
};
