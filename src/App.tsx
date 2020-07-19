import React from "react";
import moment from "moment";
import { getMarsInsight } from "./api";
import Sol from "./Sol";
import { convertToFahrenheit, convertToMph } from "./util";

interface IState {
  data: Array<Sol>;
  celsius: Boolean;
  meters: Boolean;
}

class App extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = { data: [] as Array<Sol>, celsius: true, meters: true };
  }

  componentDidMount() {
    getMarsInsight().then((res) => {
      let keys = res.data.sol_keys;
      for (let i = 0; i < keys.length; i++) {
        let sol = res.data[keys[i]];

        this.setState((state) => ({
          data: [
            ...state.data,
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

  switchTemp() {
    this.setState({ celsius: !this.state.celsius });
  }

  switchWindSpeed() {
    this.setState({ meters: !this.state.meters });
  }

  renderInSight() {
    return (
      <>
        <ul>
          {this.state.data.map((sol) => {
            let airTempMin = sol.airTemp.min.toFixed(2),
              airTempMax = sol.airTemp.max.toFixed(2);

            let windSpeedMin = sol.windSpeed.min.toFixed(2),
              windSpeedMax = sol.windSpeed.max.toFixed(2);

            return (
              <li key={sol.id}>
                <strong>Sol {sol.id}</strong> &bull;{" "}
                {moment(sol.date).format("MMMM D")}
                <br />
                {this.state.celsius
                  ? airTempMin
                  : convertToFahrenheit(parseInt(airTempMin)).toFixed(2)}
                ,{" "}
                {this.state.celsius
                  ? airTempMax
                  : convertToFahrenheit(parseInt(airTempMax)).toFixed(2)}{" "}
                {this.state.celsius ? "°C" : "°F"}
                <br />
                {this.state.meters
                  ? windSpeedMin
                  : convertToMph(parseInt(windSpeedMin)).toFixed(2)}
                ,{" "}
                {this.state.meters
                  ? windSpeedMax
                  : convertToMph(parseInt(windSpeedMax)).toFixed(2)}{" "}
                {this.state.meters ? "m/s" : "mph"}
                <br />
                {sol.pressure.min.toFixed(2)}, {sol.pressure.max.toFixed(2)} Pa
              </li>
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
        {this.state.data.length < 1 ? (
          <p>Loading</p>
        ) : (
          <>
            <button type="button" onClick={() => this.switchTemp()}>
              Switch to {this.state.celsius ? "Fahrenheit" : "Celsius"}
            </button>
            &nbsp;
            <button type="button" onClick={() => this.switchWindSpeed()}>
              Switch to{" "}
              {this.state.meters ? "Miles per Hour" : "Meters per Second"}
            </button>
            <br />
            <br />
            {this.renderInSight()}
          </>
        )}
      </>
    );
  }
}

export default App;
