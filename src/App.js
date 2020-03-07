import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      annualSalaryAmount: 0.0,
      calculatedTotal: 0,
      healthCareAmount: 0.0,
      investmentsAmount: 0.0,
      investmentsMatchPercentage: 0.0,
      workHoursPerWeek: 40,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({
      [event.target.name] : parseFloat(event.target.value)
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const {
      annualSalaryAmount, healthCareAmount,
      investmentsAmount, investmentsMatchPercentage,
      workHoursPerWeek
    } = this.state;

    const workHoursPerYear = workHoursPerWeek * 52 // weeks-per-year
    const investmentsMatchAmount = (investmentsAmount * (investmentsMatchPercentage / 100));
    const adjustedCompensationAmount =
      annualSalaryAmount +
      healthCareAmount +
      investmentsAmount +
      investmentsMatchAmount
    const calculatedTotal = adjustedCompensationAmount / workHoursPerYear;

    this.setState({
      calculatedTotal: calculatedTotal
    });
  }

  render() {
    const {
      annualSalaryAmount, calculatedTotal,
      healthCareAmount, investmentsAmount,
      investmentsMatchPercentage, workHoursPerWeek
    } = this.state;

    return (
      <div className="app">
        <h1>Compensation Rate Calculator</h1>
        <p>Calculate your equivalent annual salary to an hourly rate</p>

        <form onSubmit={this.handleSubmit}>
          <div className="form-control">
            <label>Work Hours Per Week</label>
            <input
              name="annualSalaryAmount"
              type="number"
              value={workHoursPerWeek}
              onChange={this.handleChange}
              required
            />
          </div>

          <div className="form-control">
            <label>Annual Salary Amount</label>
            <input
              name="annualSalaryAmount"
              type="number"
              value={annualSalaryAmount}
              onChange={this.handleChange}
              required
            />
          </div>

          <div className="form-control">
            <label>Monthly Healthcare Premium</label>
            <input
              name="healthCareAmount"
              type="number"
              value={healthCareAmount}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-control">
            <label>Monthly Investments Amount</label>
            <input
              name="investmentsAmount"
              type="number"
              value={investmentsAmount}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-control">
            <label>Employer Investments Match Percentage</label>
            <input
              name="investmentsMatchPercentage"
              type="number"
              value={investmentsMatchPercentage}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-control">
            <input
              type="submit"
              value="Calculate"
            />
          </div>
        </form>

        <div id="calculator-total">
          <h2>Your Rate:</h2>
          {calculatedTotal.toFixed(2)}
        </div>
      </div>
    )
  }
}

export default App;
