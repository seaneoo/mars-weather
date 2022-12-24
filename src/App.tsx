import styled from "styled-components";
import WeatherTable from "./components/WeatherTable";

const _Main = styled.main`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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
  return (
    <_Main>
      <_Wrapper>
        <_Title>Last 7 Days at the Gale Crater</_Title>
        <WeatherTable />
      </_Wrapper>
    </_Main>
  );
}

export default App;
