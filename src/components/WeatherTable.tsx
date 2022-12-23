import styled from "styled-components";
import { useGetWeatherQuery } from "../api";

const _Table = styled.table`
  &,
  th,
  td {
    border: 1px solid;
  }
`;

function WeatherTable() {
  const { data, isLoading } = useGetWeatherQuery();

  /** Retrieve the 7 most recent weather readings. */
  const latest = data?.soles.slice(0, 7);

  if (isLoading) return <></>;

  return (
    <_Table>
      <thead>
        <tr>
          <th>Sol</th>
          <th>Earth Day</th>
          <th colSpan={2}>Air Temperature</th>
          <th>Pressure</th>
          <th>Sunrise</th>
          <th>Sunset</th>
        </tr>
        <tr>
          <th></th>
          <th></th>
          <th>Max.</th>
          <th>Min.</th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {latest?.map((reading, i) => {
          return (
            <tr key={i}>
              <td>{reading.sol}</td>
              <td>{reading.terrestrial_date}</td>
              <td>{reading.max_temp}</td>
              <td>{reading.min_temp}</td>
              <td>{reading.pressure}</td>
              <td>{reading.sunrise}</td>
              <td>{reading.sunset}</td>
            </tr>
          );
        })}
      </tbody>
    </_Table>
  );
}

export default WeatherTable;
