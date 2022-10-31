import { XCircle, Clipboard } from "lucide-react";
import { useState } from "react";
import { Position } from "~/types";
import * as Checkbox from "@radix-ui/react-checkbox";

const NewLeg = ({
  setLegs,
  legs,
  leg,
  index,
}: {
  setLegs: Function;
  legs: Position[];
  leg: Position;
  index: number;
}) => {
  const deleteLeg = () => {
    legs.splice(index, 1);
    setLegs([...legs]);
  };
  const [isMomentum, setMomentum] = useState<any>(false);
  const [isTrail, setTrail] = useState<any>(false);
  return (
    <>
      <div className="w-4/5 py-6 px-8 rounded relative bg-blue-100 flex flex-col gap-8">
        <XCircle
          onClick={deleteLeg}
          className="absolute cursor-pointer -top-2 -right-2"
        />
        <Clipboard
          className="absolute cursor-pointer top-6 -right-2"
          onClick={() => {
            alert(`copied! ${JSON.stringify(legs[index])}`),
              navigator.clipboard.writeText(JSON.stringify(legs));
          }}
        />
        <div className="flex gap-4">
        <label htmlFor="Lots">Lots</label>
        <input
          name={`legs[${index}][Lots]`}
          type="number"
          min="0"
          defaultValue={1}
          id="Lots"
          onChange={(e) =>
            setLegs(
              legs.map((item, idx) =>
                legs.indexOf(leg) === idx
                  ? { ...item, Lots: e.target.value }
                  : item
              )
            )
          }
        />
        <label htmlFor="Position">Position</label>
        <select
          onChange={(e) =>
            setLegs(
              legs.map((item, idx) =>
                legs.indexOf(leg) === idx
                  ? { ...item, positionType: e.target.value }
                  : item
              )
            )
          }
          name={`legs[${index}][positionType]`}
          defaultValue={leg.positionType}
          id="Position"
        >
          <option value="PositionType.Sell">Sell</option>
          <option value="PositionType.Buy">Buy</option>
        </select>
        <label htmlFor="Expiry">Expiry</label>
        <select
          onChange={(e) =>
            setLegs(
              legs.map((item, idx) =>
                legs.indexOf(leg) === idx
                  ? { ...item, ExpiryKind: e.target.value }
                  : item
              )
            )
          }
          name={`legs[${index}][ExpiryKind]`}
          id="Expiry"
          defaultValue={leg.ExpiryKind}
        >
          <option value="ExpiryType.Weekly">Weekly</option>
          <option value="ExpiryType.Monthly">Monthly</option>
        </select>
        <label htmlFor="Strike">Strike</label>
        <select
          onChange={(e) =>
            setLegs(
              legs.map((item, idx) =>
                legs.indexOf(leg) === idx
                  ? { ...item, EntryType: e.target.value }
                  : item
              )
            )
          }
          name={`legs[${index}][EntryType]`}
          id="Strike"
          defaultValue={leg.EntryType}
        >
          <option value="EntryType.EntryByStrikeType">Strike Type</option>
          <option value="EntryType.EntryByPremium">Premium</option>
          <option value="EntryType.EntryByPremiumRange">Premium Range</option>
          <option value="EntryType.EntryByStraddleWidth">Straddle Width</option>
        </select>
        {leg.EntryType === "EntryType.EntryByStrikeType" ? (
          <select
          name={`legs[${index}][StrikeParameter]`}

            onChange={(e) =>
              setLegs(
                legs.map((item, idx) =>
                  legs.indexOf(leg) === idx
                    ? { ...item, StrikeParameter: e.target.value }
                    : item
                )
              )
            }

          >
            <option defaultChecked value="StrikeType.ATM">
              ATM
            </option>
            <option value="StrikeType.OTM1">OTM1</option>
          </select>
        ) : leg.EntryType === "EntryType.EntryByPremium" ? (
          <input
          name={`legs[${index}][StrikeParameter]`}
            defaultValue={0}
            type="number"
            onChange={(e) =>
              setLegs(
                legs.map((item, idx) =>
                  legs.indexOf(leg) === idx
                    ? { ...item, StrikeParameter: e.target.value }
                    : item
                )
              )
            }
          />
        ) : leg.EntryType === "EntryType.EntryByPremiumRange" ? (
          <div>
            {" "}
            <input
                      name={`legs[${index}][StrikeParameter][Upper]`}
              defaultValue={0}
              type="number"
              onChange={(e) =>
                setLegs(
                  legs.map((item, idx) =>
                    legs.indexOf(leg) === idx
                      ? {
                          ...item,
                          StrikeParameter: {
                            Lower: leg.StrikeParameter?.Lower,
                            Upper: e.target.value,
                          },
                        }
                      : item
                  )
                )
              }
            />
            <input
              name={`legs[${index}][StrikeParameter][Lower]`}
              defaultValue={0}
              type="number"
              onChange={(e) =>
                setLegs(
                  legs.map((item, idx) =>
                    legs.indexOf(leg) === idx
                      ? {
                          ...item,
                          StrikeParameter: {
                            Upper: leg.StrikeParameter?.Upper,
                            Lower: e.target.value,
                          },
                        }
                      : item
                  )
                )
              }
            />
          </div>
        ) : leg.EntryType === "EntryType.EntryByStraddleWidth" ? (
          <div>
            <select
              name={`legs[${index}][StrikeParameter][Adjustment]`}

              onChange={(e) =>
                setLegs(
                  legs.map((item, idx) =>
                    legs.indexOf(leg) === idx
                      ? {
                          ...item,
                          StrikeParameter: {
                            Multiplier: leg.StrikeParameter?.Multiplier,
                            Adjustment: e.target.value,
                          },
                        }
                      : item
                  )
                )
              }
            >
              <option selected disabled hidden value="none">
                Select an Option
              </option>
              <option value="Plus">+</option>
              <option value="minus">-</option>
            </select>{" "}
            <input
              name={`legs[${index}][StrikeParameter][Multiplier]`}
              onChange={(e) =>
                setLegs(
                  legs.map((item, idx) =>
                    legs.indexOf(leg) === idx
                      ? {
                          ...item,
                          StrikeParameter: {
                            Multiplier: e.target.value,
                            Adjustment: leg.StrikeParameter?.Adjustment,
                          },
                        }
                      : item
                  )
                )
              }
              type="number"
            />{" "}
          </div>
        ) : null}
        </div>
        <div className="flex gap-4">
        <Checkbox.Root onCheckedChange={(checked) => setMomentum(checked)}>
          <input type="checkbox" />
        </Checkbox.Root>
            <p>Simple Momentum</p>
          {isMomentum ? (
            <div>
              <select
            name={`legs[${index}][LegMomentum][Type]`}

              onChange={(e) =>
                setLegs(
                  legs.map((item, idx) =>
                    legs.indexOf(leg) === idx
                      ? {
                          ...item,
                          LegMomentum: {Value: leg.LegMomentum.Value, Type: e.target.value}
                        }
                      : item
                  )
                )
              }>
                <option selected value="none" disabled hidden>Choose</option>
                <option value="MomentType.PointsDown">Down</option>
                <option value="MomentType.PointsUp">Up</option>
              </select>
              <input             name={`legs[${index}][LegMomentum][Value]`} type="number" onChange={(e) =>
                setLegs(
                  legs.map((item, idx) =>
                    legs.indexOf(leg) === idx
                      ? {
                          ...item,
                          LegMomentum: {Value: e.target.value, Type: leg.LegMomentum.Type}
                        }
                      : item
                  )
                )
              }/>
            </div>
          ) : null}
           <Checkbox.Root onCheckedChange={(checked) => setTrail(checked)}>
          <input type="checkbox" />
        </Checkbox.Root>
            <p>Trail SL</p>
          {isTrail ? (
            <div>
              <select
              name={`legs[${index}][LegTrailSL][Type]`}

              onChange={(e) =>
                setLegs(
                  legs.map((item, idx) =>
                    legs.indexOf(leg) === idx
                      ? {
                          ...item,
                          LegTrailSL: {Value: leg.LegTrailSL.Value, Type: e.target.value}
                        }
                      : item
                  )
                )
              }>
                <option selected value="none" disabled hidden>Choose</option>
                <option value="TrailStopLossType.Points">Points</option>
                <option value="TrailStopLossType.Percentage">Percentage</option>
              </select>
              <input
                name={`legs[${index}][LegTrailSL][Value][InstrumentMove]`}

              type="number" onChange={(e) =>
                setLegs(
                  legs.map((item, idx) =>
                    legs.indexOf(leg) === idx
                      ? {
                          ...item,
                          LegTrailSL: {Value: { InstrumentMove: e.target.value, StopLossMove: leg.LegTrailSL.Value.StopLossMove}, Type: leg.LegTrailSL.Type}
                        }
                      : item
                  )
                )
              }/>
              <input
              name={`legs[${index}][LegTrailSL][Value][StopLossMove]`}
              type="number" onChange={(e) =>
                setLegs(
                  legs.map((item, idx) =>
                    legs.indexOf(leg) === idx
                      ? {
                          ...item,
                          LegTrailSL: {Value: { InstrumentMove: leg.LegTrailSL.Value.InstrumentMove, StopLossMove: e.target.value}, Type: leg.LegTrailSL.Type}
                        }
                      : item
                  )
                )
              }/>
            </div>
          ) : null}
          </div>
      </div>
    </>
  );
};

export default NewLeg;
