# Индивидуальная (лабораторная) работа №1

**Цель**: Ознакомиться с основными функциями и с синтаксисом JavaScript на основе **консольного приложения для анализа транзакций**.

## Файлы

1. `transaction.json` - Транзакции с которыми работаем

```JSON
[
  {
    "transaction_id": "1",
    "transaction_type": "debit",
    "transaction_amount": 100.5,
    "transaction_date": "2019-01-01T12:00:00Z",
    "merchant_name": "Merchant A",
    "transaction_description": "Purchase at Merchant A"
  },
  {
    "transaction_id": "2",
    "transaction_type": "credit",
    "transaction_amount": 200.0,
    "transaction_date": "2019-02-01T12:00:00Z",
    "merchant_name": "Merchant B",
    "transaction_description": "Refund from Merchant B"
  }
]
```
## Пример обьекта
```js
const transaction = {
    transaction_id: "1",
    transaction_date: "2019-01-01",
    transaction_amount: "100.00",
    transaction_type: "debit",
    transaction_description: "Payment for groceries",
    merchant_name: "SuperMart",
    card_type: "Visa",
}
```
2. `index.js` - Основной файл в котором реализована вся логика приложения(Включает основной класс по обработке транзакций)

### Класс `TransactionAnalyzer`

1. Создал класс `TransactionAnalyzer` для обработки транзакций.
2. Класс имеет методы для анализа транзакций, описанные ниже.
3. Конструктор класса принимает все транзакции в качестве аргумента.
4. Методы для добавления новой транзакции и получения списка всех транзакций.
    1. `addTransaction()`
    2. `getAllTransaction()`
5. Методы для аназила транзакций.
    1. `getUniqueTransactionType()` // Returns unique transaction types.

    2. `calculateTotalAmount()` // Returns the total amount of all transactions.

    3. `calculateTotalAmountByDate(year, month, day)` // Returns the total amount of transactions for the specified year, month, and day (year, month, and day are optional).

    4. `getTransactionByType(type)` // Returns transactions of the specified type (e.g., 'debit' or 'credit').

    5. `getTransactionsInDateRange(startDate, endDate)` // Returns transactions within the specified date range.

    6. `getTransactionsByMerchant(merchantName)` // Returns transactions made with the specified merchant.

    7. `calculateAverageTransactionAmount()` // Returns the average transaction amount.

    8. `getTransactionsByAmountRange(minAmount, maxAmount)` // Returns transactions with amounts within the specified range.

    9. `calculateTotalDebitAmount()` // Returns the total amount of debit transactions.

    10. `findMostTransactionsMonth()` // Returns the month with the highest number of transactions.

    11. `findMostDebitTransactionMonth()` // Returns the month with the highest number of debit transactions.

    12. `mostTransactionTypes()` // Determines which transaction type occurs more frequently (either debit or credit).

    13. `getTransactionsBeforeDate(date)` // Returns transactions before the specified date.

    14. `findTransactionById(id)` // Finds a transaction by its unique ID.

    15. `mapTransactionDescriptions()` // Returns an array of all transaction descriptions.


## Пример использования
```JavaScript
const analyzer = new TransactionAnalyzer(transactionsData);


// Get all debit transactions
console.log('Debit transactions:', analyzer.getTransactionByType('debit'));

// Get all transactions
console.log(analyzer.getAllTransactions());

//Add new transaction
analyzer.addTransaction(transaction);

// Get Transaction by Id
console.log(analyzer.findTransactionById("9999"));
```



## Контрольные вопросы

1. Какие примитивные типы данных существуют в JavaScript?
- Стандартные, как и в других языках (+undefined, symbol, bigint)
2. Какие методы массивов вы использовали для обработки и анализа данных в вашем приложении, и как они помогли в выполнении задачи?

### `map` — для преобразования массива:

**Пример:** Извлечение всех типов транзакций:
```javascript
const transactionTypes = this.transactions.map(t => t.transaction_type);
```
- Помогает создать новый массив на основе существующего, преобразуя каждый элемент.


### `filter` — для фильтрации массива по определенным условиям:

**Пример:** Получение транзакций за определенную дату:
```javascript
const filteredTransactions = this.transactions.filter(t => t.date === '2023-01-01');
```
- Удобен для отбора только тех элементов, которые соответствуют критериям.

### `reduce` — для свертки массива в одно значение:

**Пример:** Подсчет общей суммы транзакций:
```javascript
const totalAmount = this.transactions.reduce((sum, t) => sum + t.amount, 0);
```
- Помогает суммировать, агрегировать данные или конструировать объекты.

### `forEach` — для выполнения операции над каждым элементом массива:

**Пример:** Подсчет количества транзакций в месяц:
```javascript
const counts = {};
this.transactions.forEach(t => {
    const month = new Date(t.date).toLocaleString('default', { month: 'long' });
    counts[month] = (counts[month] || 0) + 1;
});

```
- Используется, когда нужно пройти по массиву и выполнить операции без создания нового массива.

### `find` — для поиска первого элемента, удовлетворяющего условию:

**Пример:** Поиск транзакции с определенным ID:
```javascript
const transaction = this.transactions.find(t => t.id === '123');
```
- Удобен для поиска одного элемента.


3. В чем состоит роль конструктора класса?
Роль конструктора класса в JavaScript:

- Конструктор — это специальный метод класса, который вызывается при создании нового экземпляра класса.
- Он используется для:
- Инициализации свойств объекта.
- Установки начального состояния объекта.
- Передачи и обработки входных параметров.

4. Каким образом вы можете создать новый экземпляр класса в JavaScript?
- Новый экземпляр класса создается с помощью ключевого слова new, которое вызывает конструктор класса.
```js
const analyzer = new TransactionAnalyzer(transactionsData);
```
## Библиография
1. [Guide from Git](https://github.com/MSU-Courses/javascript_typescript/tree/main/lab/LI1)

2. ChatGPT

3. moodle/usm/course-js