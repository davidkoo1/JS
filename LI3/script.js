/**
 * Класс для представления финансовой транзакции.
 */
class Transaction {
    /**
     * Создает объект транзакции.
     * @param {number} id - Уникальный идентификатор.
     * @param {string} date - Дата и время транзакции.
     * @param {number} amount - Сумма транзакции.
     * @param {string} category - Категория транзакции.
     * @param {string} description - Описание транзакции.
     */
    constructor(id, date, amount, category, description) {
        this.id = id;
        this.date = date;
        this.amount = amount;
        this.category = category;
        this.description = description;
    }

    /**
     * Получает краткое описание (первые 4 слова).
     * @returns {string} - Краткое описание.
     */
    getShortDescription() {
        return this.description.split(' ').slice(0, 4).join(' ') + '...';
    }
}

let transactions = [];
let transactionId = 1;

// Обработчик события отправки формы

document.getElementById("transactionForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Предотвращаем стандартное поведение формы
    addTransaction();
});

/**
 * Добавляет новую транзакцию.
 */
function addTransaction() {
    const category = document.getElementById("category").value;
    const amount = parseFloat(document.getElementById("amount").value);
    const description = document.getElementById("description").value;
    const date = new Date().toLocaleString();

    const transaction = new Transaction(transactionId++, date, amount, category, description);
    transactions.push(transaction);
    addTransactionToTable(transaction);
    document.getElementById("transactionForm").reset();
    calculateTotal();
}

/**
 * Добавляет транзакцию в таблицу.
 * @param {Transaction} transaction - Транзакция.
 */
function addTransactionToTable(transaction) {
    const tableBody = document.getElementById("transactionsTable").getElementsByTagName('tbody')[0];
    const row = tableBody.insertRow();

    row.dataset.id = transaction.id;
    row.style.backgroundColor = transaction.amount >= 0 ? "#d4edda" : "#f8d7da"; 

    row.innerHTML = `
        <td>${transaction.id}</td>
        <td>${transaction.date}</td>
        <td>${transaction.category}</td>
        <td>${transaction.getShortDescription()}</td>
        <td><button class="delete">Удалить</button></td>
    `;

    // Обработчик удаления транзакции
    row.querySelector(".delete").addEventListener("click", function() {
        removeTransaction(transaction.id);
    });

    // Обработчик клика для отображения деталей
    row.addEventListener("click", function() {
        showTransactionDetail(transaction);
    });
}

/**
 * Удаляет транзакцию по ID.
 * @param {number} id - Идентификатор транзакции.
 */
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id); 
    document.querySelector(`tr[data-id='${id}']`).remove(); 
    calculateTotal(); 
}

/**
 * Рассчитывает и обновляет общую сумму всех транзакций.
 */
function calculateTotal() {
    const total = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
    document.getElementById("totalAmount").textContent = total.toFixed(2) + ' MDL';
}

/**
 * Отображает полное описание транзакции.
 * @param {Transaction} transaction - Транзакция.
 */
function showTransactionDetail(transaction) {
    const fullDescription = document.getElementById("fullDescription");
    fullDescription.textContent = `Категория: ${transaction.category}\nОписание: ${transaction.description}\nСумма: ${transaction.amount} MDL`;
}
