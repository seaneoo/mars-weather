import { Fragment, useEffect, useState } from 'react';
import { Button, Flex, Grid, Heading, useColorMode } from '@chakra-ui/react';
import { SunIcon, MoonIcon, RepeatIcon } from '@chakra-ui/icons';
import { getMarsWeather, Sol } from '../api';
import WeatherTable from './WeatherTable';
import { TemperatureUnit } from '../constants';

const App = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const [data, setData] = useState<Sol[]>([]);
  const [tempUnit, setTempUnit] = useState<TemperatureUnit>(
    TemperatureUnit.Celsius
  );

  useEffect(() => {
    getMarsWeather().then((res) =>
      setData(res.slice(0, res.length > 7 ? 7 : res.length))
    );
  }, []);

  const toggleTemperatureUnit = () => {
    setTempUnit(
      tempUnit === TemperatureUnit.Celsius
        ? TemperatureUnit.Fahrenheit
        : TemperatureUnit.Celsius
    );
  };

  return (
    <Fragment>
      <Button onClick={toggleColorMode} pos="absolute" top={8} right={8}>
        {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      </Button>

      <Grid height="100vh" justifyContent="center" alignItems="center">
        <div>
          <Heading textAlign="center">Latest Weather on Mars</Heading>
          <br />
          <Flex direction="row" gridGap="1rem">
            {/* Celsius ↔ Fahrenheit */}
            <Button
              onClick={toggleTemperatureUnit}
              size="sm"
              colorScheme="orange">
              <RepeatIcon />
              &nbsp;
              {tempUnit === TemperatureUnit.Celsius ? 'Fahrenheit' : 'Celsius'}
            </Button>
          </Flex>
          <br />
          {data.length > 0 ? (
            <WeatherTable data={data} tempUnit={tempUnit} />
          ) : (
            <Heading size="md">Loading...</Heading>
          )}
        </div>
      </Grid>
    </Fragment>
  );
};

export default App;
