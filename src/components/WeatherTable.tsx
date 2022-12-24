import { useState } from "react";
import styled from "styled-components";
import { useGetWeatherQuery } from "../api";

const _Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 1px solid;
  border-radius: 4px;

  caption {
    caption-side: bottom;
    margin-top: 1rem;
    font-size: 87.5%;
    text-align: left;
    white-space: normal;
  }

  tr {
    border-bottom: 1px solid #f5f5f580;
  }

  th,
  td {
    padding: 0.5rem 0.75rem;
  }

  th + th,
  td + td {
    border-left: 1px solid #f5f5f580;
  }
`;

function WeatherTable() {
  const [tempUnit, setTempUnit] = useState(0);

  const { data } = useGetWeatherQuery();

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

  return (
    <_Table>
      <thead>
        <tr>
          <th title={data?.descriptions.sol_desc_en}>Sol</th>
          <th title={data?.descriptions.terrestrial_date_desc_en}>Earth Day</th>
          <th title={data?.descriptions.temp_desc_en} colSpan={2}>
            Air Temperature (
            <span style={{ cursor: "pointer" }} onClick={switchTempUnit}>
              °{tempUnit === 0 ? "C" : "F"}
            </span>
            )
          </th>
          <th title={data?.descriptions.pressure_desc_en}>Pressure (Pa)</th>
          <th title={data?.descriptions.sunrise_sunset_desc_en}>Sunrise</th>
          <th title={data?.descriptions.sunrise_sunset_desc_en}>Sunset</th>
        </tr>
        <tr>
          <th colSpan={2}></th>
          <th>Max.</th>
          <th>Min.</th>
          <th colSpan={3}></th>
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
      <caption>
        Weather reported from the Gale crater by the Mars Curiosity Rover.{" "}
        <a
          href="https://mars.nasa.gov/msl/home/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Read more
        </a>
      </caption>
    </_Table>
  );
}

export default WeatherTable;
