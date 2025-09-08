import { ICrew, ICrewRules } from "@models/collections";

export function getCrewRules(crews: ICrew[]): Partial<ICrewRules> {
  return crews.reduce((acc, crew) => {
    if (crew.rules) {
      // search for true values into crew.rules
      Object.entries(crew.rules).forEach(([key, value], index) => {
        if (value === true) {
          acc[key as keyof ICrewRules] = value;
        }

        if (key === "free_weekends" && value === false) {
          acc["free_weekends" as keyof ICrewRules] = false;
        }
      });
    }

    return acc;
  }, {} as ICrewRules);
}
