import classNames from "classnames";
import { twMerge } from "tailwind-merge";
export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const parseDate = (dateString: string) => {
  const b = dateString.split(/\D+/);
  const offsetMult = dateString.indexOf("+") !== -1 ? -1 : 1;
  const hrOffset = offsetMult * (+b[7] || 0);
  const minOffset = offsetMult * (+b[8] || 0);
  return new Date(
    Date.UTC(
      +b[0],
      +b[1] - 1,
      +b[2],
      +b[3] + hrOffset,
      +b[4] + minOffset,
      +b[5],
      +b[6] || 0
    )
  );
};

export const cn = (...args: classNames.ArgumentArray): string =>
  twMerge(classNames(args));

export const toISODateString = (date: Date) => {
  return date.toISOString().split("T")[0];
}