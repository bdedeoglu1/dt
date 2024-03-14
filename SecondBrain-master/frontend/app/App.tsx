"use client";

import { PropsWithChildren, useEffect } from "react";

import Footer from "@/lib/components/Footer";
import { NavBar } from "@/lib/components/NavBar";
import { TrackingWrapper } from "@/lib/components/TrackingWrapper";
import { useBrainContext } from "@/lib/context/BrainProvider/hooks/useBrainContext";
import { useSupabase } from "@/lib/context/SupabaseProvider";
import '../lib/config/LocaleConfig/i18n'
import { UpdateMetadata } from "@/lib/helpers/updateMetadata";

// This wrapper is used to make effect calls at a high level in app rendering.
export const App = ({ children }: PropsWithChildren): JSX.Element => {
  const { fetchAllBrains, fetchAndSetActiveBrain } = useBrainContext();
  const { session } = useSupabase();

  // Condition to render NavBar & Footer
  const renderNavBarFooter = location.pathname !== "/share-brain" && location.pathname !== "/embed";

  useEffect(() => {
    if (renderNavBarFooter) { 
      void fetchAllBrains();
      void fetchAndSetActiveBrain();
    }
  }, [session?.user]);

  return (
    <>
      <TrackingWrapper />
      {renderNavBarFooter && <NavBar />}
      <div className="flex-1">{children}</div>
      {renderNavBarFooter && <Footer />}
      <UpdateMetadata />
    </>
  );
};
