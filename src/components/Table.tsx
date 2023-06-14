import { useState } from "react";
import { useGetWeatherQuery } from "../api";

function Table() {
  /** Keep track of the current unit used to display the ATS and GTS. */
  const [tempUnit, setTempUnit] = useState(0);

  /** Fetch data from the API. */
  const { data } = useGetWeatherQuery();

  /** Retrieve the 7 most recent weather readings. */
  const latest = data?.soles.slice(0, 7);

  /**
   * Switch the current temperature unit (Celsius ↔ Fahrenheit).
   */
  const switchTempUnit = () => {
    setTempUnit(tempUnit === 0 ? 1 : 0);
  };

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

  return (
    <table id="mars-table" className="w-full border-collapse border rounded">
      <thead>
        <tr>
          <th>Sol</th>
          <th>Earth Day</th>
          <th colSpan={2}>
            <span>
              Air Temperature
              <span style={{ cursor: "pointer" }} onClick={switchTempUnit}>
                &nbsp;(°{tempUnit === 0 ? "C" : "F"})
              </span>
            </span>
          </th>
          <th colSpan={2}>
            <span>
              Ground Temperature
              <span style={{ cursor: "pointer" }} onClick={switchTempUnit}>
                &nbsp;(°{tempUnit === 0 ? "C" : "F"})
              </span>
            </span>
          </th>
          <th>Pressure (Pa)</th>
          <th>Sunrise</th>
          <th>Sunset</th>
        </tr>
        <tr>
          <th colSpan={2}></th>
          <th>Max.</th>
          <th>Min.</th>
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
                {tempUnit === 0
                  ? reading.min_temp
                  : convertToF(reading.min_temp, true)}
              </td>
              <td>
                {tempUnit === 0
                  ? reading.max_gts_temp
                  : convertToF(reading.max_gts_temp, true)}
              </td>
              <td>
                {tempUnit === 0
                  ? reading.min_gts_temp
                  : convertToF(reading.min_gts_temp, true)}
              </td>
              <td>{reading.pressure}</td>
              <td>{reading.sunrise}</td>
              <td>{reading.sunset}</td>
            </tr>
          );
        })}
      </tbody>
      <caption className="caption-bottom mt-2 text-md text-left whitespace-normal">
        Weather reported from the Gale crater by the Mars Curiosity Rover.{" "}
        <a
          href="https://mars.nasa.gov/msl/home/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Read more
        </a>
      </caption>
    </table>
  );
}

export default Table;
