import React, { Component } from 'react';
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      annualSalaryAmount: 0.0,
      calculatedTotal: 0,
      healthCareAmount: 0.0,
      investmentsAmount: 0.0,
      investmentsMatchPercentage: 0.0,
      taxPercentage: 0.0,
      miscBenefitsAmount: 0.0,
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
      taxPercentage, workHoursPerWeek, miscBenefitsAmount
    } = this.state;

    // base calculations
    const workHoursPerYear = workHoursPerWeek * 52 // weeks-per-year
    const investmentsMatchAmount = (investmentsAmount * (investmentsMatchPercentage / 100));
    const taxAdjustedSalaryAmount = annualSalaryAmount + (annualSalaryAmount * (taxPercentage / 100));
    const adjustedHealthcareAmount = healthCareAmount * 12; // benefits cost per-year
    const adjustedMiscBenefitsAmount = miscBenefitsAmount * 12; // benefits cost per-year
    const adjustedInvestmentsAmount = (investmentsAmount * 12) + (investmentsMatchAmount * 12) // total per-year

    const adjustedCompensationAmount =
      taxAdjustedSalaryAmount +
      adjustedHealthcareAmount +
      adjustedInvestmentsAmount +
      adjustedMiscBenefitsAmount;

    // ultimate calculation
    const calculatedTotal = adjustedCompensationAmount / workHoursPerYear;

    this.setState({
      calculatedTotal: calculatedTotal
    });
  }

  renderFormInput(label, inputName, inputValue) {
    return (
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">{label}</label>
        </div>
        <div className="field-body">
          <div className="field">
            <p className="control">
              <input
                name={inputName}
                className="input"
                type="number"
                value={inputValue}
                onChange={this.handleChange}
                required
              />
            </p>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const {
      annualSalaryAmount, calculatedTotal,
      healthCareAmount, investmentsAmount,
      investmentsMatchPercentage, workHoursPerWeek,
      taxPercentage, miscBenefitsAmount
    } = this.state;

    return (
      <div className="app">
        <header className="section">
          <div className="container">
            <h1 className="title">Compensation Rate Calculator</h1>
            <p className="subtitle">Calculate your equivalent annual salary to an hourly rate</p>
          </div>
        </header>

        <section className="section">
          <div className="container">
            <form onSubmit={this.handleSubmit}>
              {this.renderFormInput("Work Hours Per Week", "workHoursPerWeek", workHoursPerWeek)}
              {this.renderFormInput("Annual Salary Amount", "annualSalaryAmount", annualSalaryAmount)}
              {this.renderFormInput("Tax Rate", "taxPercentage", taxPercentage)}
              {this.renderFormInput("Monthly Healthcare Premium", "healthCareAmount", healthCareAmount)}
              {this.renderFormInput("Monthly 401k Investment Amount", "investmentsAmount", investmentsAmount)}
              {this.renderFormInput("Employer 401k Investment Match", "investmentsMatchPercentage", investmentsMatchPercentage)}
              {this.renderFormInput("Monthly Miscellaneous Benefits Amount", "miscBenefitsAmount", miscBenefitsAmount)}

              <div className="field is-horizontal">
                <div className="field-label">
                  {/* Left empty for spacing */}
                </div>
                <div className="field-body">
                  <div className="field">
                    <div className="control">
                      <input
                        className="button is-primary"
                        type="submit"
                        value="Calculate"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <section className="section">
            <div className="container">
              <h2 className="title is-4">
                Your Rate: <span className="calculated-total-text">{`$${calculatedTotal.toFixed(2)}`}</span>
              </h2>
            </div>
          </section>
        </section>

        <footer className="footer">
          by <a href="https://gregjmorrison.com">Greg Morrison</a>
        </footer>
      </div>
    )
  }
}

export default App;
