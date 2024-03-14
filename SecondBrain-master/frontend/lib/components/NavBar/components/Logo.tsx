import Image from "next/image";
import Link from "next/link";

export const Logo = (): JSX.Element => {
  return (
    <Link href={"/"} className="flex items-center gap-4">
      <Image
        className=""
        src={"/logo.png"}
        alt="EC  Logo"
        width={58}
        height={58}
      />
      <h1 className="font-bold">Educated Change</h1>
    </Link>
  );
};
