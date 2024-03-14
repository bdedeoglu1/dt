"use client";
import { ReactNode } from "react";

import { ChatProvider } from "@/lib/context";
import { ChatsProvider } from "@/lib/context/ChatsProvider/chats-provider";
// import { useSupabase } from "@/lib/context/SupabaseProvider";
// import { redirectToLogin } from "@/lib/router/redirectToLogin";

// import { ChatsList } from "./components/ChatsList";

interface LayoutProps {
  children?: ReactNode;
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
  // const { session } = useSupabase();

  // if (session === null) {
  //   redirectToLogin();
  // }

  return (
    <ChatsProvider>
      <ChatProvider>
        <div className="relative flex items-stretch w-full h-full justify-stretch">
          {/* <ChatsList /> */}
          {children}
        </div>
      </ChatProvider>
    </ChatsProvider>
  );
};

export default Layout;
