import { useRouter } from "next/router";

// Landing pages have special styling
export const landingPages = ["/"];

export const useIsLandingPage = () => {
  const pathname = useRouter().pathname;
  const landingPages = ["/", "/varna"];
  return landingPages.includes(pathname);
};
