const { NUMBERS_RANGE: numbers } = require("../constants")

const drawNumbers = (limit = 6) => {
    const selected = [];
    while (selected.length < limit) {
      const index = Math.floor(Math.random() * numbers.length);
      const selected_number = numbers[index];
      if (selected.indexOf(selected_number) === -1) {
        selected.push(selected_number);
      }
    }
  
    return selected;
};


const compareBets = (randomDraw, userBets) => {
    const results = []
    const drawNumbers = randomDraw;
    userBets.forEach((bet)=>{
      const betNumbers = bet.numbers;
      const numb = betNumbers.filter((number)=>{
        return drawNumbers.includes(number)
      })    
      bet.selected_numbers = numb;
      bet.status = "done";
      bet.combination = numb.length;
      bet.won = numb.length >= 2; 
      results.push(bet);
    })
    return results
  };

module.exports = {
    drawNumbers, 
    compareBets
};