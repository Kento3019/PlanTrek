export const NAME_PAYER = "payer" as const;
export const NAME_CONTENT = "content" as const;
export const NAME_AMOUNT = "amount" as const;
export const NAME_INVOLVES = "involves" as const;
export const NAME_STARTDATE = "date.start" as const;
export const NAME_ENDDATE = "date.end" as const;
export const NAME_STARTTIME = "time.start" as const;
export const NAME_ENDTIME = "time.end" as const;
export const NAME_ALLDAY = "allDay" as const;
export const NAME_CONTENTURL = "contentURL" as const;
export const NAME_REMARKS = "remarks" as const;
export const NAME_CATEGORIES = "categories" as const;

export type FieldName =
    | typeof NAME_PAYER
    | typeof NAME_CONTENT
    | typeof NAME_INVOLVES
    | typeof NAME_AMOUNT
    | typeof NAME_STARTDATE
    | typeof NAME_ENDDATE
    | typeof NAME_ALLDAY
    | typeof NAME_STARTTIME
    | typeof NAME_ENDTIME
    | typeof NAME_CONTENTURL
    | typeof NAME_REMARKS
    | typeof NAME_CATEGORIES;
