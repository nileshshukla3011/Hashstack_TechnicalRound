import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

const conv_rates = {
  "USD/INR": 82.97,
  "USD/AUD": 1.53,
  "INR/USD": 0.012,
  "INR/AUD": 0.018,
  "AUD/USD": 0.65,
  "AUD/INR": 54.15,
};

function App() {
  const [formValues, setFormValues] = useState({
    source: "USD",
    target: "USD",
  });
  const [ratesState, setRatesState] = useState(conv_rates);

  useEffect(() => {
    const fluctuate = setInterval((E) => {
      const newState = {};
      Object.entries(ratesState).forEach(([k, v]) => {
        newState[k] = v + (Math.random() > 0.5 ? +v * 0.03 : v * -0.03);
      });
      setRatesState({ ...ratesState, ...newState });
      if (formValues.amount) {
        if (formValues.source === formValues.target) {
          setResult(parseInt(formValues.amount));
          return;
        }
        setResult(
          formValues.amount *
            ratesState[`${formValues.source}/${formValues.target}`]
        );
      }
    }, 1000);
    return () => clearInterval(fluctuate);
  }, []);

  const [result, setResult] = useState(0);

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formValues.source === formValues.target) {
      setResult(parseInt(formValues.amount));
      return;
    }
    setResult(
      formValues.amount *
        ratesState[`${formValues.source}/${formValues.target}`]
    );
  };
  return (
    <div className="body">
      <div className="markets">
        <h1>Markets</h1>
        <table>
          <tr>
            <th>Ticker</th>
            <th>Conversion Rate</th>
          </tr>
          {Object.entries(ratesState).map((e) => {
            return (
              <tr>
                <td>{e[0]}</td>
                <td>{e[1]}</td>
              </tr>
            );
          })}
        </table>
      </div>
      <div className="conversion">
        <h1 className="header">Currency Convertor</h1>
        <form
          className="convertor"
          onSubmit={handleSubmit}
          onChange={handleChange}
        >
          <label> Source Currency</label>
          <select className="from" defaultValue="USD" id="source" name="from">
            <option value={"USD"}>USD</option>
            <option value={"INR"}>INR</option>
            <option value={"AUD"}>AUD</option>
          </select>

          <label> Target Currency</label>
          <select className="to" defaultValue="USD" id="target" name="to">
            <option value={"USD"}>USD</option>
            <option value={"INR"}>INR</option>
            <option value={"AUD"}>AUD</option>
          </select>
          <label>Amount</label>
          <input
            id="amount"
            placeholder="Amount (in number)"
            type="number"
          ></input>

          <h3 className="estimate">
            Estimated converted amount:{"     "}
            <span className="result">
              {result} {formValues.target}
            </span>
          </h3>
          <button className="excb" type="submit">
            Exchange
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
