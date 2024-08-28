const form = document.querySelector("form");
const expense = document.getElementById("expense");
const category = document.getElementById("category");
const amount = document.getElementById("amount");
const btnAddExpense = document.getElementById("btnExpense");
const expenseList = document.querySelector("ul");
const expenseTotal = document.getElementById("totalExpense");
const totalAmount = document.querySelector("h2");

amount.oninput = () => {
  // Formata o input para que receba somente números
  let value = amount.value.replace(/\D/g, "");
  // Transforma em centavos o resultado de value
  value = Number(value) / 100;
  // Formata o value utilizando o resultado da função formatCurrencyBRL
  amount.value = formatCurrencyBRL(value);
};

// Essa função faz a formatação do texto do input para que ele seja atualizado no formato padrão da moeda
function formatCurrencyBRL(value) {
  value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return value;
}

// Captura a variável form e add um evento padrão quando submit
form.onsubmit = (event) => {
  event.preventDefault();

  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    created_at: new Date(),
  };

  expenseAdd(newExpense)
};

function expenseAdd(newExpense) {
  try {
    const expenseItem = document.createElement("li");
    expenseItem.className = "expense";

    // Cria uma nova tag li dinamicamente pelo js
    expenseItem.innerHTML = `
  <img src="./img/${newExpense.category_id}.svg" alt="Ícone de tipo da despesa" />
  <div class="expense-info">
    <strong>${newExpense.expense}</strong>
    <span>${newExpense.category_name}</span>
  </div>
  <span class="expense-amount"><small>R$</small>${newExpense.amount.toUpperCase().replace("R$", "")}</span>
  <img src="./img/remove.svg" alt="remover" class="remove-icon" />
`;

    // Add o novo html li na lista já existente
    expenseList.appendChild(expenseItem);

    // Remove um item add na lista
    const removeIcon = expenseItem.querySelector(".remove-icon");
    removeIcon.onclick = () => {
      expenseList.removeChild(expenseItem);
      updateExpenseTotal();
    };

    updateExpenseTotal();

    form.reset();  
  } catch (error) {
    alert("ERRO! Não foi possível atualizar a lista");
    console.error(error);
  }
}

function updateExpenseTotal() {
  let total = 0;
  const expenses = expenseList.querySelectorAll(".expense-amount");
  expenses.forEach(expense => {
    const value = parseFloat(expense.textContent.replace("R$", "").replace(".", "").replace(",", "."));
    total += value;
  });
  totalAmount.innerHTML = `<small>R$</small>${formatCurrencyBRL(total).toUpperCase().replace("R$", "")}`;
  expenseTotal.textContent = expenseList.children.length + " despesas";
}