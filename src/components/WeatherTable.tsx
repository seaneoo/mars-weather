import {
  chakra,
  Link,
  Table,
  TableCaption,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Sol } from "../api";
import { TemperatureUnit } from "../constants";
import WeatherRow from "./WeatherRow";

type Props = {
  data: Sol[];
  tempUnit: TemperatureUnit;
};

const WeatherTable = ({ data, tempUnit }: Props) => {
  return (
    <Table>
      <TableCaption>
        Daily weather measurements at the Gale Crater on Mars.
        <br />
        <Link href="https://mars.nasa.gov/msl/weather/">
          Data obtained from NASA's Curiosity rover.
        </Link>
      </TableCaption>
      <Thead>
        <Tr>
          <Th>Earth Day</Th>
          <Th isNumeric>Sol</Th>
          <Th isNumeric>
            Avg. Temp{" "}
            <chakra.span color="gray.500" style={{ textTransform: "initial" }}>
              {tempUnit === TemperatureUnit.Celsius ? "°C" : "°F"}
            </chakra.span>
          </Th>
          <Th isNumeric>
            Pressure{" "}
            <chakra.span color="gray.500" style={{ textTransform: "initial" }}>
              Pa
            </chakra.span>
          </Th>
          <Th isNumeric>Sunrise</Th>
          <Th isNumeric>Sunset</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data.length > 0 &&
          data.map((d) => {
            return <WeatherRow key={d.sol} data={d} tempUnit={tempUnit} />;
          })}
      </Tbody>
    </Table>
  );
};

export default WeatherTable;
