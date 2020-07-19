import React from "react";
import moment from "moment";
import { getMarsInsight } from "./api";
import Sol from "./Sol";
import { convertToFahrenheit, convertToMph, convertToPsi } from "./util";

interface IState {
  data: Array<Sol>;
  celsius: Boolean;
  meters: Boolean;
  pascal: Boolean;
}

class App extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: [] as Array<Sol>,
      celsius: true,
      meters: true,
      pascal: true,
    };
  }

  componentDidMount() {
    getMarsInsight().then((res) => {
      let keys = res.data.sol_keys;
      for (let i = 0; i < keys.length; i++) {
        let sol = res.data[keys[i]];

        // make sure a key isn't undefined before setting it
        // i.e. issue with 'HWS' not being valid one day
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

  switchPressure() {
    this.setState({ pascal: !this.state.pascal });
  }

  renderInSight() {
    return (
      <>
        <ul>
          {this.state.data.map((sol) => {
            let airTempMin = sol.airTemp.min,
              airTempMax = sol.airTemp.max;

            let windSpeedMin = sol.windSpeed.min,
              windSpeedMax = sol.windSpeed.max;

            let pressureMin = sol.pressure.min,
              pressureMax = sol.pressure.max;

            return (
              <li key={sol.id}>
                <strong>Sol {sol.id}</strong> &bull;{" "}
                {moment(sol.date).format("MMMM D")}
                <br />
                {this.state.celsius
                  ? airTempMin.toFixed(2)
                  : convertToFahrenheit(airTempMin).toFixed(2)}
                ,{" "}
                {this.state.celsius
                  ? airTempMax.toFixed(2)
                  : convertToFahrenheit(airTempMax).toFixed(2)}{" "}
                {this.state.celsius ? "°C" : "°F"}
                <br />
                {this.state.meters
                  ? windSpeedMin.toFixed(2)
                  : convertToMph(windSpeedMin).toFixed(2)}
                ,{" "}
                {this.state.meters
                  ? windSpeedMax.toFixed(2)
                  : convertToMph(windSpeedMax).toFixed(2)}{" "}
                {this.state.meters ? "m/s" : "mph"}
                <br />
                {this.state.pascal
                  ? pressureMin.toFixed(2)
                  : convertToPsi(pressureMin).toFixed(2)}
                ,{" "}
                {this.state.pascal
                  ? pressureMax.toFixed(2)
                  : convertToPsi(pressureMax).toFixed(2)}{" "}
                {this.state.pascal ? "Pa" : "Psi"}
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
            &nbsp;
            <button type="button" onClick={() => this.switchPressure()}>
              Switch to{" "}
              {this.state.pascal ? "Pounds per Square Inch" : "Pascal"}
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
