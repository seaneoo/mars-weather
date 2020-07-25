import React from "react";
import moment from "moment";
import Sol from "./Sol";
import { getMarsInsight } from "./api";
import { convertToFahrenheit, convertToMph } from "./util";

interface IState {
  data: Array<Sol>;
  celsius: Boolean;
  meters: Boolean;
}

class App extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: [] as Array<Sol>,
      celsius: true,
      meters: true,
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

  renderInSight() {
    return (
      <table style={{ marginTop: "1em" }}>
        <thead>
          <tr>
            <th>Earth Day</th>
            <th>Sol</th>
            <th>Avg. Temperature ({this.state.celsius ? "°C" : "°F"})</th>
            <th>Avg. Wind Speed ({this.state.meters ? "m/s" : "mph"})</th>
            <th>Avg. Pressure</th>
          </tr>
        </thead>

        <tbody>
          {this.state.data.map((sol) => {
            return (
              <tr key={sol.id}>
                <td>{moment(sol.date).format("MMMM D")}</td>
                <td>{sol.id}</td>
                <td>
                  {this.state.celsius
                    ? sol.airTemp.average.toFixed(2)
                    : convertToFahrenheit(sol.airTemp.average).toFixed(2)}
                </td>
                <td>
                  {this.state.meters
                    ? sol.windSpeed.average.toFixed(2)
                    : convertToMph(sol.windSpeed.average).toFixed(2)}
                </td>
                <td>{sol.pressure.average.toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
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
            <button
              type="button"
              className="waves-effect waves-light deep-orange btn-small"
              onClick={() => this.switchTemp()}
            >
              Switch to {this.state.celsius ? "Fahrenheit" : "Celsius"}
            </button>
            &nbsp;
            <button
              type="button"
              className="waves-effect waves-light deep-orange btn-small"
              onClick={() => this.switchWindSpeed()}
            >
              Switch to{" "}
              {this.state.meters ? "Miles per Hour" : "Meters per Second"}
            </button>
            {this.renderInSight()}
          </>
        )}
      </>
    );
  }
}

export default App;
