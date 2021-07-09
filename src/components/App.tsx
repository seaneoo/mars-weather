import { useEffect, useState } from "react";
import { Grid, Heading } from "@chakra-ui/react";
import { getMarsWeather, Sol } from "../api";
import WeatherTable from "./WeatherTable";

const App = () => {
  const [data, setData] = useState<Sol[]>([]);

  useEffect(() => {
    getMarsWeather().then((res) =>
      setData(res.slice(0, res.length > 7 ? 7 : res.length))
    );
  }, []);

  return (
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
  );
};

export default App;
