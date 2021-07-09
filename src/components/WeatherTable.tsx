import {
  Link,
  Table,
  TableCaption,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { Sole } from "../api";

type Props = {
  data: Sole[];
};

const WeatherTable = ({ data }: Props) => {
  useEffect(() => {
    console.log(data);
  }, [data]);

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
      <Tbody>{/* Populte Tbody with api data */}</Tbody>
    </Table>
  );
};

export default WeatherTable;
