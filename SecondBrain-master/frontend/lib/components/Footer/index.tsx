"use client";
import { useSupabase } from "@/lib/context/SupabaseProvider";

const Footer = (): JSX.Element => {
  const { session } = useSupabase();

  if (session?.user !== undefined) {
    return <div />;
  }

  return (
    <footer className="bg-white dark:bg-black border-t dark:border-white/10 mt-auto py-4">
      <div className="max-w-screen-xl mx-auto flex justify-center items-center gap-4">
      </div>
    </footer>
  );
};

export default Footer;
