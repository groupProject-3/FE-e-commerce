import React from "react";
import { useEffect } from "react";
import Router, { useRouter } from "next/router";
function index() {
  useEffect(() => {
    Router.push("user/login");
  }, []);

  return <div></div>;
}

export default index;
