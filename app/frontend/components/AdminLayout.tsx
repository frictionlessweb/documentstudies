import React from "react";
import { Flex, Text, Button } from "@adobe/react-spectrum";
import { useCurrentAdmin } from "@/components/Providers/AdminProvider";
import { logout } from "@/utils/util";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminToolbar = () => {
  const { name } = useCurrentAdmin();
  return (
    <Flex
      width="100%"
      alignItems="center"
      justifyContent="space-between"
      UNSAFE_style={{
        padding: "8px",
        backgroundColor: "#3f51b5",
        color: "white",
      }}
    >
      <Text UNSAFE_style={{ fontWeight: "bold" }} marginX="size-500">Welcome, {name}</Text>
      <Flex marginEnd="16px">
        <Button onPress={logout} variant="overBackground" marginX="size-500">
          Logout
        </Button>
      </Flex>
    </Flex>
  );
};

export const AdminLayout = (props: AdminLayoutProps) => {
  const { children } = props;
  return (
    <Flex width="100%" direction="column" >
      <AdminToolbar />
      <Flex direction="column" margin={8}>
        {children}
      </Flex>
    </Flex>
  );
};
