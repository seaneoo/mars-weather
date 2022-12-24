import styled from "styled-components";
import { useGetWeatherQuery } from "../api";
import WeatherTable from "./WeatherTable";

const _Main = styled.main`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: 1rem;

  @media screen and (min-width: 768px) {
    width: 720px;
  }

  @media screen and (min-width: 992px) {
    width: 960px;
  }

  @media screen and (min-width: 1200px) {
    width: 1140px;
  }

  @media screen and (min-width: 1400px) {
    width: 1320px;
  }
`;

const _Wrapper = styled.div`
  display: block;
  width: 100%;
  overflow-x: auto;
  white-space: nowrap;
`;

const _Title = styled.h1`
  display: inline-block;
  align-self: flex-start;
  color: #f6d365;
  font-size: 3rem;
  background: linear-gradient(120deg, #f6d365 0%, #fda085 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;

function App() {
  const { isLoading } = useGetWeatherQuery();

  return (
    <_Main>
      {!isLoading ? (
        <>
          <_Title>The Last 7 Days on Mars</_Title>
          <_Wrapper>
            <WeatherTable />
          </_Wrapper>
        </>
      ) : (
        <span>Loading</span>
      )}
    </_Main>
  );
}

export default App;
