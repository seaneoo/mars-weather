import styled from "styled-components";
import { useGetWeatherQuery } from "./api";
import WeatherTable from "./components/WeatherTable";

const _Main = styled.main`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

const _Wrapper = styled.div`
  display: block;
  overflow-x: auto;
  white-space: nowrap;
`;

const _Title = styled.h1`
  display: inline-block;
  color: #f6d365;
  background: linear-gradient(120deg, #f6d365 0%, #fda085 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;

function App() {
  const { isLoading } = useGetWeatherQuery();

  return (
    <_Main>
      <_Wrapper>
        {!isLoading ? (
          <>
            <_Title>Last 7 Days at the Gale Crater</_Title>
            <WeatherTable />
          </>
        ) : (
          <>
            <span>Loading</span>
          </>
        )}
      </_Wrapper>
    </_Main>
  );
}

export default App;
