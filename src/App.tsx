import React from "react";
import moment from "moment";
import { getMarsInsight } from "./api";

interface Sol {
  id: string;
  date: string;
  airTemp: {
    min: number;
    max: number;
    average: number;
  };
  windSpeed: {
    min: number;
    max: number;
    average: number;
  };
  pressure: {
    min: number;
    max: number;
    average: number;
  };
}

class App extends React.Component<any, { insight: Array<Sol> }> {
  constructor(props: any) {
    super(props);
    this.state = { insight: [] as Array<Sol> };
  }

  componentDidMount() {
    getMarsInsight().then((res) => {
      let keys = res.data.sol_keys;
      for (let i = 0; i < keys.length; i++) {
        let sol = res.data[keys[i]];

        this.setState((state) => ({
          insight: [
            ...state.insight,
            {
              id: keys[i],
              date: sol.First_UTC,
              airTemp: {
                min: sol.AT.mn,
                max: sol.AT.mx,
                average: sol.AT.av,
              },
              windSpeed: {
                min: sol.HWS.mn,
                max: sol.HWS.mx,
                average: sol.HWS.av,
              },
              pressure: {
                min: sol.PRE.mn,
                max: sol.PRE.mx,
                average: sol.PRE.av,
              },
            },
          ],
        }));
      }
    });
  }

  renderInSight() {
    return (
      <>
        <ul>
          {this.state.insight.map((sol) => {
            return (
              <>
                <li>
                  <strong>Sol {sol.id}</strong> &bull;{" "}
                  {moment(sol.date).format("MMMM D")}
                  <br />
                  {sol.airTemp.min.toFixed(2)}, {sol.airTemp.max.toFixed(2)} °C
                  <br />
                  {sol.windSpeed.min.toFixed(2)}, {sol.windSpeed.max.toFixed(2)}{" "}
                  m/s
                  <br />
                  {sol.pressure.min.toFixed(2)}, {sol.pressure.max.toFixed(2)}{" "}
                  Pa
                </li>
                <br />
              </>
            );
          })}
        </ul>
      </>
    );
  }

  render() {
    return (
      <>
        <h1>Latest Weather on Mars</h1>
        <br />
        {this.state.insight.length > 0 ? this.renderInSight() : <p>Loading</p>}
      </>
    );
  }
}

export default App;
