import { Td, Tr } from "@chakra-ui/react";
import { format, parse } from "date-fns";
import { Sol } from "../api";

type Props = {
  data: Sol;
};

const WeatherRow = ({ data }: Props) => {
  const getTerrestrialDate = () => {
    const d = parse(data.terrestrial_date, "yyyy-MM-dd", new Date());
    return format(d, "MMMM d, yyyy");
  };

  const getAvgTemp = () => {
    const min = parseInt(data.min_temp),
      max = parseInt(data.max_temp);
    return (min + max) / 2;
  };

  return (
    <Tr>
      <Td>{getTerrestrialDate()}</Td>
      <Td isNumeric>{data.sol}</Td>
      <Td isNumeric>{getAvgTemp()}</Td>
      <Td isNumeric>{data.pressure}</Td>
      <Td isNumeric>{data.sunrise}</Td>
      <Td isNumeric>{data.sunset}</Td>
    </Tr>
  );
};

export default WeatherRow;
