import React from "react";
import { StyleSheet } from "react-native";

/**
 * A global theme allowing for some consistent styling among common components.
 */
export const globalTheme = StyleSheet.create({
  /**
   * A container that positions its children vertically centered along the X axis.
   */
  centerContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

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
