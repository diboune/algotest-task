import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import NewOption from "~/components/NewOption";
import { getLegs } from "~/server/firebase.server";

export const loader: LoaderFunction = async () => {
  const data = await getLegs();
  return { data };
};

export default function Index() {
  const { data } = useLoaderData();
  const [theData, setTheData] = useState()
  return (
    <div className="w-full h-screen flex flex-col gap-20 mt-20">
      <NewOption/>
      <button onClick={() => setTheData(data)}>Show the Data from firebase</button>
      <button onClick={() => setTheData({})}>Hide the Data from firebase</button>
      <pre>{JSON.stringify(theData, null, 2)}</pre>
    </div>
  );
}
