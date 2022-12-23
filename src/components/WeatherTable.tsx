import { useGetWeatherQuery } from "../api";

function WeatherTable() {
  const { data, isLoading } = useGetWeatherQuery();

  /** Retrieve the 7 most recent weather readings. */
  const latest = data?.soles.slice(0, 7);

  if (isLoading) return <></>;

  return <code>{JSON.stringify(latest)}</code>;
}

export default WeatherTable;
