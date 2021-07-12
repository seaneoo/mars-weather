import { chakra, Flex, Td, Tr } from '@chakra-ui/react';
import { ArrowUpIcon, ArrowDownIcon } from '@chakra-ui/icons';
import { format, parse } from 'date-fns';
import { Sol } from '../api';
import { TemperatureUnit } from '../constants';

type Props = {
  data: Sol;
  tempUnit: TemperatureUnit;
};

const WeatherRow = ({ data, tempUnit }: Props) => {
  const getTerrestrialDate = () => {
    const d = parse(data.terrestrial_date, 'yyyy-MM-dd', new Date());
    return format(d, 'MMMM d, yyyy');
  };

  const getAvgTemp = () => {
    // Gets avg temp in celsius
    const min = parseInt(data.min_temp),
      max = parseInt(data.max_temp);
    return (min + max) / 2;
  };

  const celsiusToFahrenheit = (c: number) => {
    return c * (9 / 5) + 32;
  };

  return (
    <Tr>
      <Td>{getTerrestrialDate()}</Td>
      <Td isNumeric>{data.sol}</Td>
      <Td isNumeric>
        {tempUnit === TemperatureUnit.Celsius
          ? getAvgTemp()?.toFixed(1)
          : celsiusToFahrenheit(getAvgTemp()).toFixed(1)}
        <br />
        <Flex direction="row" gridGap="0.5rem">
          <chakra.span color="gray.500" fontSize="80%">
            <ArrowUpIcon />
            &nbsp;
            {tempUnit === TemperatureUnit.Celsius
              ? parseInt(data.max_temp).toFixed(1)
              : celsiusToFahrenheit(parseInt(data.max_temp)).toFixed(1)}
          </chakra.span>
          <chakra.span color="gray.500" fontSize="80%">
            <ArrowDownIcon />
            &nbsp;
            {tempUnit === TemperatureUnit.Celsius
              ? parseInt(data.min_temp).toFixed(1)
              : celsiusToFahrenheit(parseInt(data.min_temp)).toFixed(1)}
          </chakra.span>
        </Flex>
      </Td>
      <Td isNumeric>{data.pressure}</Td>
      <Td isNumeric>{data.sunrise}</Td>
      <Td isNumeric>{data.sunset}</Td>
    </Tr>
  );
};

export default WeatherRow;
