import React, { useState } from 'react';
import logo from './assets/investment-calculator-logo.png';
import Header from './components/Header';
import TableResult from './components/TableResult';
import UserInput from './components/UserInput/UserInput';
function App() {
  const [userInput, setUserInput]=useState(null);
  
  const calculateHandler = (userInput) => {
    setUserInput(userInput);
  };

    // Should be triggered when form is submitted
    // You might not directly want to bind it to the submit event on the form though...
    const yearlyData = []; // per-year results
    if(userInput){ 
          let currentSavings = +userInput['current-savings']; // feel free to change the shape of this input object!
          const yearlyContribution = +userInput['yearly-contribution']; // as mentioned: feel free to change the shape...
          const expectedReturn = +userInput['expected-return'] / 100;
          const duration = +userInput['duration'];


          // The below code calculates yearly results (total savings, interest etc)
          for (let i = 0; i < duration; i++) {
            const yearlyInterest = currentSavings * expectedReturn;
            currentSavings += yearlyInterest + yearlyContribution;
            yearlyData.push({
              // feel free to change the shape of the data pushed to the array!
              year: i + 1,
              yearlyInterest: yearlyInterest,
              savingsEndOfYear: currentSavings,
              yearlyContribution: yearlyContribution,
            });
          }
  }
   
  

  return (
    <div>
       
      <Header logo={logo} />
      <UserInput onCalculate={calculateHandler} />
      {/* Todo: Show below table conditionally (only once result data is available) */}
      {/* Show fallback text if no data is available */}
      {!userInput && <p style={{textAlign:'center'}}>No investment calculated yet.</p>}
      {userInput && <TableResult data={yearlyData} initialInvestment={userInput['current-savings']} />}
 
    </div>
  );
}

export default App;
