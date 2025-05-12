"use client";

import React, { useEffect } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { useToast } from "./use-toast";

export type ToastType = "success" | "error" | "info" | "warning";

export interface ToastProps {
  visible: boolean;
  message: string;
  type: ToastType;
  onHide: () => void;
}

export function Toast({ visible, message, type, onHide }: ToastProps) {
  const toast = useToast();
  const colorScheme = useColorScheme();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onHide();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [visible, onHide]);

  useEffect(() => {
    if (toast.visible) {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.delay(2000),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        toast.hideToast();
      });
    }
  }, [toast.visible]);

  const getBackgroundColor = () => {
    if (type === "error") {
      return colorScheme === "dark" ? "#991b1b" : "#fecaca";
    }
    return colorScheme === "dark" ? "#1e293b" : "#f8fafc";
  };

  const getTextColor = () => {
    if (type === "error") {
      return colorScheme === "dark" ? "#fecaca" : "#991b1b";
    }
    return colorScheme === "dark" ? "#f8fafc" : "#1e293b";
  };

  if (!visible) return null;

  const bgColor = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
    warning: "bg-yellow-500",
  }[type];

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          backgroundColor: getBackgroundColor(),
        },
      ]}
    >
      <Text style={[styles.message, { color: getTextColor() }]}>{message}</Text>
      <TouchableOpacity onPress={toast.hideToast} style={styles.closeButton}>
        <Text style={[styles.closeText, { color: getTextColor() }]}>×</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    padding: 16,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  message: {
    flex: 1,
    fontSize: 16,
  },
  closeButton: {
    marginLeft: 8,
    padding: 4,
  },
  closeText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
