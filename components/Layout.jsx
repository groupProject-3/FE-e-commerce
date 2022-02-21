import Navbar from "./Navbar";
import { useRouter } from "next/router";
export default function Layout({ children }) {
  function ReturnNavbar() {
    const router = useRouter();
    const { asPath } = router;
    if (asPath === "/user/login" || asPath === "/user/create") {
      return <></>;
    } else {
      return <Navbar />;
    }
  }

  function returnPage() {
    return <main>{children}</main>;
  }

  return (
    <>
      {ReturnNavbar()}
      {returnPage()}
    </>
  );
}
