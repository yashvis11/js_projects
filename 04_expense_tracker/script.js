document.addEventListener("DOMContentLoaded",()=>{
  const form = document.getElementById("expense-form");
  const expenseName = document.getElementById("expense-name");
  const amount = document.getElementById("expense-amount");
  const addButton = document.getElementById("add");
  const list = document.getElementById("expense-list");
  const totalContainer = document.getElementById("total");
  const totalAmount = document.getElementById("total-amount");

  let summation = 0;
  let expenses=JSON.parse(localStorage.getItem('expenses'))|| [];
  expenses.forEach(e => {
    displayExpense(e);
  });

  form.addEventListener('submit', (e)=>{
    e.preventDefault();

    const expense = {
      id: Date.now(),
      /*textContent does not work on input or any tags that do not have closing tags. 
    .value returns a string to get a number you have to convert it using parseFloat() or Number()
    incase the input is empty use || 0 for safety*/
      name: expenseName.value.trim(),
      price: parseFloat(amount.value.trim()) || 0,
    };
    expenseName.value = "";
    amount.value = "";
    expenses.push(expense);
    saveData();
    displayExpense(expense);

    
  })
  function displayExpense(expense){
    const li = document.createElement("li"); //expense item individual
    li.innerHTML = `<span>${expense.name}</span>
    <span>Rs. ${expense.price}</span>
    <button>Delete</button>`;
    list.appendChild(li);
    let total = calculateTotal(expense.price);
    console.log("Total", total);
    totalAmount.innerHTML = `${total}`;

    li.querySelector(`button`).addEventListener("click", () => {
      li.remove();
      expenses = expenses.filter((e) => e.id != expense.id);
      saveData();
      //update the total to calculate the new price
      total = total - expense.price;
      totalAmount.innerHTML = `${total}`;
    });
  }

  function saveData(){
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }

  function calculateTotal(price){
    summation = summation+price;
    return summation;
  }
})