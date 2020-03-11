import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import App from './App';

afterEach(() => {
  cleanup();
})

test('renders correctly', () => {
  const app = render(<App />);
  expect(app).toMatchSnapshot();
});

test('it calculates correctly', () => {
  // calculation setup
  const annualSalaryAmount = 120000;
  const healthCareAmount = 550;
  const investmentsAmount = 1500;
  const investmentsMatchPercentage = 4;
  const taxPercentage = 25;
  const miscBenefitsAmount = 150;
  const workHoursPerWeek = 40;

  // base calculations
  const workHoursPerYear = workHoursPerWeek * 52; // weeks-per-year
  const investmentsMatchAmount = (investmentsAmount * (investmentsMatchPercentage / 100));
  const taxAdjustedSalaryAmount = annualSalaryAmount + (annualSalaryAmount * (taxPercentage / 100));
  const adjustedHealthcareAmount = healthCareAmount * 12; // benefits cost per-year
  const adjustedMiscBenefitsAmount = miscBenefitsAmount * 12; // benefits cost per-year
  const adjustedInvestmentsAmount = (investmentsAmount * 12) + (investmentsMatchAmount * 12); // total per-year

  const adjustedCompensationAmount =
    taxAdjustedSalaryAmount +
    adjustedHealthcareAmount +
    adjustedInvestmentsAmount +
    adjustedMiscBenefitsAmount;

  // ultimate calculation
  const expectedTotal = `$${(adjustedCompensationAmount / workHoursPerYear).toFixed(2)}`;

  // render
  const { getByLabelText } = render(<App />);

  // update inputs
  const inputMap = {
    workHoursPerWeek : workHoursPerWeek,
    annualSalaryAmount : annualSalaryAmount,
    healthCareAmount : healthCareAmount,
    investmentsAmount : investmentsAmount,
    investmentsMatchPercentage : investmentsMatchPercentage,
    taxPercentage : taxPercentage,
    miscBenefitsAmount : miscBenefitsAmount,
  };
  Object.keys(inputMap).forEach(key => {
    const node = getByLabelText(key);
    fireEvent.change(node, {
      target: {
        value: inputMap[key]
      }
    });
  });

  // submit form
  const submitNode = getByLabelText('submit');
  fireEvent.click(submitNode);

  // assertions
  const resultNode = getByLabelText('calculated-total');
  expect(resultNode.value).toBe(expectedTotal);
})