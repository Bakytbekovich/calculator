import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [amount, setAmount] = useState(100000);
  const [rate, setRate] = useState(10);
  const [period, setPeriod] = useState(1);
  const[width,setWhidth]=useState();
  const[pwidthh,setPwhidth]=useState();



  useEffect(() => {
    math();
  }, [amount, rate, period]);

  const [monthlyPayment, setMonthlyPayment] = useState(466);
  const [totalCost, setTotalCost] = useState(151777);

  const handleAmountChange = event => {
    const cleanAmount = removeCommas(event.target.value);
    setAmount(cleanAmount);
  };

  const handleRateChange = event => {
    setRate(event.target.value);
  };

  const handlePeriodChange = event => {
    setPeriod(event.target.value);
  };

  const math = () => {
    if (!period) return setMonthlyPayment(0);

    const months = period * 12;

    if (!rate || parseInt(rate) === 0) {
      setTotalCost(amount);
      setMonthlyPayment(Math.round(amount / months));
    } else {
      const rateDecimal = rate / 1200;

      const top = Math.round(rateDecimal * amount * months);
      const bottom = 1 - Math.pow(1 + rateDecimal, -months);
      const totalLoanCost = Math.round(top / bottom);
      setTotalCost(totalLoanCost);
      setMonthlyPayment(Math.round(totalLoanCost / months));
      setWhidth(amount*100/totalLoanCost);
      setPwhidth(((totalLoanCost-amount)*100)/totalLoanCost);
    }
  };

  const addCommas = x => {
    if (!x) return '';
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const removeCommas = x => {
    return parseInt(x.replace(/,/g, ''));
  };



  return (
    <div className="App">
      <div className="main-container">
        <h1> Кредитный калькулятор</h1>
        <div className="flex-container">
          <div className="flex-item">
            <sup>Cумма вложений,(сом)</sup>
            <input
              className="input"
              value={addCommas(amount)}
              onChange={handleAmountChange}
            ></input>
          </div>

          <div className="flex-item">
            <sup>Процентная ставка, (%)годовых</sup>
            <div>
              <input
                className="input"
                value={rate}
                onChange={handleRateChange}
              ></input>
            </div>
          </div>

          <div className="flex-item">
            <sup>Срок кредита/займа, (год)</sup>
            <div>
              <input
                className="input"
                value={period}
                onChange={handlePeriodChange}
              ></input>
            </div>
          </div>
        </div>
        <br></br>
        <br></br>
        <div className="flex-container">
          <div>
            <h2> <sup>Общая стоимость кредита &nbsp;  {addCommas(totalCost)} сом</sup></h2>
          </div>
        </div>

        <div className="flex-container">
          <div><h3>Ежамесячное оплата &nbsp; {addCommas(monthlyPayment)} сом</h3>
          </div>
        </div>
        <div className='row mt-5'>
          <div className='zel mt-1'></div>Кредит
          <div className='war mt-1'></div>Переплата
        </div>
        <br></br>
        <br></br>
        <div class="progress">
          <div class="progress-bar bg-success" role="progressbar" style={{ width: width+"%"}} aria-valuenow={15} aria-valuemin={0} aria-valuemax={100}>{Math.round(width)}%</div>
          <div class="progress-bar bg-warning" role="progressbar" style={{ width: pwidthh+"%" }} aria-valuenow={30} aria-valuemin={0} aria-valuemax={100}>{Math.round(pwidthh)}%</div>
        </div>
      </div>

    </div>
  );
}

export default App;
