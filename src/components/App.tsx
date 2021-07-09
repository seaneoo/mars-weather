import { Fragment, useEffect, useState } from "react";
import { Button, Grid, Heading, useColorMode } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { getMarsWeather, Sol } from "../api";
import WeatherTable from "./WeatherTable";

const App = () => {
  const [data, setData] = useState<Sol[]>([]);
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    getMarsWeather().then((res) =>
      setData(res.slice(0, res.length > 7 ? 7 : res.length))
    );
  }, []);

  return (
    <Fragment>
      <Button onClick={toggleColorMode} pos="absolute" top={8} right={8}>
        {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
      </Button>

      <Grid height="100vh" justifyContent="center" alignItems="center">
        <div>
          <Heading textAlign="center">Latest Weather on Mars</Heading>
          <br />
          {data.length > 0 ? (
            <WeatherTable data={data} />
          ) : (
            <Heading size="md">Loading...</Heading>
          )}
        </div>
      </Grid>
    </Fragment>
  );
};

export default App;
