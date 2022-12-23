import styled from "styled-components";
import WeatherTable from "./components/WeatherTable";

const _Main = styled.main`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

function App() {
  return (
    <_Main>
      <WeatherTable />
    </_Main>
  );
}

export default App;
