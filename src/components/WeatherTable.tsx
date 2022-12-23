import { useState } from "react";
import styled from "styled-components";
import { useGetWeatherQuery } from "../api";

const _Table = styled.table`
  display: block;
  overflow-x: auto;
  white-space: nowrap;

  &,
  th,
  td {
    border: 1px solid;
  }
`;

function WeatherTable() {
  const [tempUnit, setTempUnit] = useState(0);

  const { data, isLoading } = useGetWeatherQuery();

  /** Retrieve the 7 most recent weather readings. */
  const latest = data?.soles.slice(0, 7);

  /**
   * Converts Celsius into Fahrenheit.
   * @param c The temperature, in Celsius.
   * @param round If the result should be rounded up/down.
   * @returns
   */
  const convertToF = (c: string, round: boolean = false) => {
    const f: number = Number.parseInt(c) * (9 / 5) + 32;
    if (round) return Math.round(f);
    return f;
  };

  /**
   * Switch the current temperature unit (Celsius ↔ Fahrenheit).
   */
  const switchTempUnit = () => {
    setTempUnit(tempUnit === 0 ? 1 : 0);
  };

  if (isLoading) return <></>;

  return (
    <_Table>
      <thead>
        <tr>
          <th>Sol</th>
          <th>Earth Day</th>
          <th colSpan={2}>
            Air Temperature (°{tempUnit === 0 ? "C" : "F"}){" "}
            <button
              type="button"
              title="Switch between Celsius and Fahrenheit"
              onClick={switchTempUnit}
            >
              Switch unit
            </button>
          </th>
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
              <td>
                {tempUnit === 0
                  ? reading.max_temp
                  : convertToF(reading.max_temp, true)}
              </td>
              <td>
                {" "}
                {tempUnit === 0
                  ? reading.min_temp
                  : convertToF(reading.min_temp, true)}
              </td>
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
