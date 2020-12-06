import React from "react";
import moment from "moment";
import { getMarsInsight } from "./api";
import { convertToFahrenheit, convertToMph } from "./util";

interface IState {
  data: Array<any>;
  celsius: Boolean;
  meters: Boolean;
}

class App extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      data: [] as Array<any>,
      celsius: true,
      meters: true,
    };
  }

  componentDidMount() {
    getMarsInsight()
      .then((res) => {
        let keys = res.data.sol_keys;
        for (let i = 0; i < keys.length; i++) {
          const sol = res.data[keys[i]];
          this.setState({
            data: [...this.state.data, { id: keys[i], sol: sol }],
          });
        }
      })
      .then(() => this.setState({ data: this.state.data.reverse() }));
  }

  switchTemp() {
    this.setState({ celsius: !this.state.celsius });
  }

  switchWindSpeed() {
    this.setState({ meters: !this.state.meters });
  }

  renderInSight() {
    return (
      <table className="striped responsive-table" style={{ marginTop: "1em" }}>
        <thead>
          <tr>
            <th>Earth Day</th>
            <th>Sol</th>
            <th>Avg. Temperature ({this.state.celsius ? "°C" : "°F"})</th>
            <th>Avg. Wind Speed ({this.state.meters ? "m/s" : "mph"})</th>
            <th>Avg. Pressure (Pa)</th>
          </tr>
        </thead>

        <tbody>
          {this.state.data.map((e) => {
            return (
              <tr key={e.id}>
                <td>{moment(e.sol.First_UTC).format("MMMM D")}</td>
                <td>{e.id}</td>
                <td>
                  {e.sol.AT !== undefined ? (
                    <>
                      {this.state.celsius
                        ? e.sol.AT.av.toFixed(2)
                        : convertToFahrenheit(e.sol.AT.av).toFixed(2)}
                    </>
                  ) : (
                    <>-</>
                  )}
                </td>
                <td>
                  {e.sol.HWS !== undefined ? (
                    <>
                      {this.state.meters
                        ? e.sol.HWS.av.toFixed(2)
                        : convertToMph(e.sol.HWS.av).toFixed(2)}
                    </>
                  ) : (
                    <>-</>
                  )}
                </td>
                <td>
                  {e.sol.PRE !== undefined ? (
                    <>{e.sol.PRE.av.toFixed(2)}</>
                  ) : (
                    <>-</>
                  )}
                </td>
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
              className="btn-small"
              onClick={() => this.switchTemp()}
            >
              Switch to {this.state.celsius ? "Fahrenheit" : "Celsius"}
            </button>
            &nbsp;
            <button
              type="button"
              className="btn-small"
              onClick={() => this.switchWindSpeed()}
            >
              Switch to{" "}
              {this.state.meters ? "Miles per Hour" : "Meters per Second"}
            </button>
            {this.renderInSight()}
            <p>
              Data from{" "}
              <a
                href="https://api.nasa.gov/#insight"
                target="_blank"
                rel="noopener noreferrer"
              >
                NASA InSight API
              </a>
            </p>
          </>
        )}
      </>
    );
  }
}

export default App;
