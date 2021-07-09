import {
  Link,
  Table,
  TableCaption,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Sol } from "../api";
import WeatherRow from "./WeatherRow";

type Props = {
  data: Sol[];
};

const WeatherTable = ({ data }: Props) => {
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
          <Th isNumeric>Earth Day</Th>
          <Th isNumeric>Sol</Th>
          <Th isNumeric>Avg. Temp</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data.length > 0 &&
          data.map((d) => {
            return <WeatherRow key={d.sol} data={d} />;
          })}
      </Tbody>
    </Table>
  );
};

export default WeatherTable;
