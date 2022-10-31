import { useFetcher } from "@remix-run/react";
import { useState } from "react";
import { Position } from "~/types";
import NewLeg from "../NewLeg";

const NewOption = () => {
  const [legs, setLegs] = useState<Position[]>([]);
  const [data, showData] = useState(false)

  const updateLegs = () => {
    const newLegs : Position[] = [
      ...legs,
      {
        "positionType" : "PositionType.Buy",
        "Lots": 1,
        "LegStopLoss" :{
          "Type": "LegTgtSLType.Percentage",
          "Value": 0,
        },
        "LegTarget": {
          "Type": "LegTgtSLType.Percentage",
          "Value": 0,
        },
        "LegTrailSL": {
          "Type": "None",
          "Value": {
            "InstrumentMove": 0,
            "StopLossMove": 0
          }
        },
        'LegMomentum': {
          "Type": "MomentType.PointsDown",
          "Value": 0, 
        },
        "ExpiryKind": "ExpiryType.Weekly",
        "EntryType": "EntryType.EntryByPremium",
        "StrikeParameter": "StrikeType.ATM",
        "InstrumentKind": "LegType.CE",
        "LegReentrySL": {
          "Type": "ReentryType.ASAP",
          "Value": 0
        },
        "LegReentryTP": {
          "Type": "ReentryType.ASAP",
          "Value": 1,
        }
    }
    ]
    setLegs(newLegs)
  }

  const fetcher = useFetcher();

  return (
    <fetcher.Form method="post" action="/api/positions/newPosition" className="h-fit w-full flex flex-col ">
      <div className="h-fit flex flex-col items-center justify-center gap-4">
        {legs?.map((leg: any, index) => {
          return <NewLeg legs={legs} index={index} leg={leg} setLegs={setLegs}/>
        })}
        <button type="submit">Submit</button>
        <button type="button" onClick={updateLegs}>Add a leg</button>
        <button type="button" onClick={() => showData(true)}>Show the form data</button>
        <button type="button" onClick={() => showData(false)}>Hide the form data</button>

      </div>
      {data ? <pre>{JSON.stringify(legs, null ,2)}</pre> : null}
    </fetcher.Form>

  );
};

export default NewOption;
