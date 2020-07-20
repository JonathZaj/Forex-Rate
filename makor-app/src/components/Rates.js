import React from "react";

class RatesComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      rates: [],
    };
  }

  componentDidMount() {
    try {
      setInterval(async () => {
        var res = await fetch(
          "https://www.live-rates.com/rates?key=a86be87a24"
        );
        var rateJson = await res.json();
        this.setState({
          isLoaded: true,
          rates: rateJson,
        });
      }, 1000);
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { error, isLoaded, rates } = this.state;
    if (error) {
      return <div>Error</div>;
    } else if (!isLoaded) {
      return <div className="loadingPage">Loading...</div>;
    } else {
      return (
        <>
          <h2 className="title">Forex Data</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Currency</th>
                <th>Rate</th>
                <th>Bid</th>
                <th>Ask</th>
                <th>High</th>
                <th>Low</th>
                <th>Open</th>
                <th>Close</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {rates.map((data) => (
                <tr key={data.currency}>
                  <td>{data.currency} </td>
                  <td>{data.rate}</td>
                  <td>{data.ask}</td>
                  <td>{data.bid}</td>
                  <td>{data.high}</td>
                  <td>{data.low}</td>
                  <td>{data.open}</td>
                  <td> {data.close}</td>
                  <td>
                    {new Intl.DateTimeFormat("en-GB", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    }).format(data.timestamp)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      );
    }
  }
}

export default RatesComponent;
