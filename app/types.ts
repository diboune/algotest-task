export interface Position {
    positionType: "PositionType.Sell" | "PositionType.Buy"
    Lots: number,
    LegStopLoss: {
        Type: "LegTgtSLType.Percentage" | "LegTgtSLType.Points" | "LegTgtSLType.UnderlyingPercentage",
        Value: number
    },
    LegTarget: {
        Type: "LegTgtSLType.Percentage" | "LegTgtSLType.Points" | "LegTgtSLType.UnderlyingPercentage",
        Value: number
    },
    LegTrailSL: {
        Type: "None" | "TrailStopLossType.Points" | "TrailStopLossType.Percentage",
        Value: {
            InstrumentMove: number
            StopLossMove: number
        }
    },
    LegMomentum: {
        Type: "None" | "MomentType.PointsUp" | "MomentType.PointsDown",
        Value: number
    },
    ExpiryKind: "ExpiryType.Weekly" | "ExpiryType.Monthly",
    EntryType: "EntryType.EntryByStrikeType" | "EntryType.EntryByPremium" | "EntryType.EntryByPremiumRange" | "EntryType.EntryByStraddleWidth",
    StrikeParameter: "StrikeType.ATM" | "StrikeType.OTM1" /** EntryByStrikeType */ | number /** EntryByPremium */ | { Lower: 0, Upper: 0} /** EntryByPremiumRange, */ | {Adjustment: "Plus" | "Minus", Multiplier: number} /** EntryByStraddleWidth */,
    InstrumentKind: "LegType.CE",
    LegReentrySL: {
        Type: "ReentryType.ASAP" | "ReentryType.ASAPReverse",
        Value: number
    },
    LegReentryTP: {
        Type: "ReentryType.ASAP" | "ReentryType.ASAPReverse",
        Value: number
    }
}