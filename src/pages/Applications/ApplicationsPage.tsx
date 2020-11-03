import React, { useContext, useEffect, Fragment, useState } from "react";
import { AppContext } from "../../App";
import { ApplicationsList, Loader } from "../../components";
import { request } from "../../functions";

export default function ApplicationsPage(): JSX.Element {
  const { token } = useContext(AppContext);
  const [applications, setApplications] = useState<any[]>([]);
  const [hideLoader, setHideLoader] = useState<boolean>(false);
  useEffect(() => {
    request("/api/v1/applications", "GET", {
      Authorization: `Bearer ${token}`,
    })
      .then((data) => {
        setApplications(data);
      })
      .finally(() => {
        setHideLoader(true);
      });
  }, [token]);
  return <>{applications.length || hideLoader ? <ApplicationsList applications={applications} /> : <Loader />}</>;
}
