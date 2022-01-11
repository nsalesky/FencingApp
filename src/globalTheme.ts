import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-elements/dist/buttons/Button";

/**
 * A global theme allowing for some consistent styling among common components.
 */
export const globalTheme = StyleSheet.create({
  /**
   * A wide round button.
   */
  wideButton: {
    width: "50%",
    borderRadius: 20,
  },

  /**
   * Signifies that the user is ready to proceed.
   */
  ready: {
    backgroundColor: "#363535",
  },

  /**
   * Signifies that the user is not ready to proceed yet.
   */
  notReady: {
    backgroundColor: "#737070",
  },
});
