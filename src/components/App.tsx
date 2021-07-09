import { useEffect, useState } from "react";
import { Grid, Heading } from "@chakra-ui/react";
import { getMarsWeather, Sole } from "../api";
import WeatherTable from "./WeatherTable";

const App = () => {
  const [data, setData] = useState<Sole[]>([]);

  useEffect(() => {
    getMarsWeather().then((res) =>
      setData(res.slice(0, res.length > 7 ? 7 : res.length))
    );
  }, []);

  return (
    <Grid height="100vh" justifyContent="center" alignItems="center">
      <div>
        <Heading>Latest Weather on Mars</Heading>
        <br />
        <WeatherTable data={data} />
      </div>
    </Grid>
  );
};

export default App;
