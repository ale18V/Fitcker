import { Redirect } from "expo-router";

export default function StatsIndex() {
  return <Redirect href={"/stats/calendar"} />;
}
