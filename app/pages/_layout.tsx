import { router, Tabs, usePathname } from "expo-router";
import React, { useEffect } from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useAuth } from "@/hooks/useAuth";
import { useAdmin } from "@/hooks/useAdmin";
import UserProvider from "@/context/UserContext";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isAuthenticated = useAuth();
  const pathname = usePathname();
  const isAdmin = useAdmin();

  useEffect(() => {
    if (
      isAuthenticated === false &&
      (pathname.startsWith("/pages") ||
        pathname.startsWith("/admin-pages") ||
        pathname.startsWith("/profile-pages"))
    ) {
      router.push("/");
    }
    if (isAdmin && pathname.startsWith("/pages")) {
      router.push("/admin-pages/home");
    }
  }, [isAuthenticated, pathname, router]);

  return (
    <UserProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: {
            backgroundColor: Colors[colorScheme ?? "light"].background,
            borderTopColor: Colors[colorScheme ?? "light"].background,
            ...Platform.select({
              ios: {
                // Use a transparent background on iOS to show the blur effect
                position: "absolute",
              },
              default: {},
            }),
          },
          animation: "none",
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: " Início ",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="house.fill" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="camera"
          options={{
            title: " Câmera ",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={21} name="camera" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="tasks"
          options={{
            title: "Atividades ",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={21} name="task.fill" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: " Perfil ",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={21} name="user-alt" color={color} />
            ),
          }}
        />
      </Tabs>
    </UserProvider>
  );
}
