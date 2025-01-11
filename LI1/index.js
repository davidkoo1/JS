class TransactionAnalyzer {

    /**
     * Конструктор класса
     * @param {Array} datas - массив транзакций
     */
    constructor(datas) {
        this.datas = datas;
    }

    /**
    * Возвращает все транзакции
    * @returns {Array} - массив транзакций
    */
    getAllTransactions() {
        return this.datas;
    }

    /**
     * Добавляет новую транзакцию
     * @param {Object} transaction - объект транзакции
     */
    addTransaction(NewTransaction) {
        this.datas.push(NewTransaction);
    }

    /**
     * Возвращает множество уникальных типов транзакций
     * @returns {Set} - множество уникальных типов
     */
    getUniqueTransactionType() {
        const uniqueTypes = new Set();
        for (let i = 0; i < this.datas.length; i++) {
            uniqueTypes.add(this.datas[i].transaction_type);
        }
        return uniqueTypes; // Array.from();
    }

    /**
         * Рассчитывает общую сумму всех транзакций
         * @returns {Number} - общая сумма
         */
    calculateTotalAmount() {
        let sum = 0;
        for (let i = 0; i < this.datas.length; i++) {
            sum += this.datas[i].transaction_amount;
        }
        return sum;
    }

    /**
     * Рассчитывает сумму транзакций за указанный год, месяц и день
     * @param {Number} year - год
     * @param {Number} month - месяц
     * @param {Number} day - день
     * @returns {Number} - сумма транзакций
     */
    calculateTotalAmountByDate(year, month, day) {
        return this.datas
            .filter(t => {
                const date = new Date(t.transaction_date);
                return (!year || date.getFullYear() === year) &&
                    (!month || date.getMonth() + 1 === month) &&
                    (!day || date.getDate() === day);
            })
            .reduce((sum, t) => sum + parseFloat(t.transaction_amount), 0);
    }

    /**
     * Возвращает транзакции указанного типа
     * @param {String} type - тип транзакции (debit или credit)
     * @returns {Array} - массив транзакций
     */
    getTransactionByType(type) {
        return this.datas.filter(t => t.transaction_type === type);
    }

    /**
     * Возвращает транзакции в указанном диапазоне дат
     * @param {String} startDate - начальная дата
     * @param {String} endDate - конечная дата
     * @returns {Array} - массив транзакций
     */
    getTransactionsInDateRange(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        return this.datas.filter(t => {
            const date = new Date(t.transaction_date);
            return date >= start && date <= end;
        });
    }

    /**
     * Возвращает транзакции по имени торговой точки
     * @param {String} merchantName - имя торговой точки
     * @returns {Array} - массив транзакций
     */
    getTransactionsByMerchant(merchantName) {
        return this.datas.filter(t => t.merchant_name === merchantName);
    }

    /**
     * Рассчитывает среднее значение транзакций
     * @returns {Number} - среднее значение
     */
    calculateAverageTransactionAmount() {
        return this.calculateTotalAmount() / this.datas.length;
    }

    /**
     * Возвращает транзакции с суммой в заданном диапазоне
     * @param {Number} minAmount - минимальная сумма
     * @param {Number} maxAmount - максимальная сумма
     * @returns {Array} - массив транзакций
     */
    getTransactionsByAmountRange(minAmount, maxAmount) {
        return this.datas.filter(t => {
            const amount = parseFloat(t.transaction_amount);
            return amount >= minAmount && amount <= maxAmount;
        });
    }

    /**
     * Рассчитывает общую сумму дебетовых транзакций
     * @returns {Number} - сумма дебетовых транзакций
     */
    calculateTotalDebitAmount() {
        return this.getTransactionByType('debit').reduce((sum, t) => sum + t.transaction_amount, 0);
    }

    /**
     * Находит месяц с наибольшим количеством транзакций
     * @returns {String} - месяц
     */
    findMostTransactionsMonth() {
        const counts = {};
        this.datas.forEach(t => {
            const month = new Date(t.transaction_date).toLocaleString('default', { month: 'long' });
            counts[month] = (counts[month] || 0) + 1;
        });
        return Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
    }

    /**
         * Возвращает месяц с наибольшим количеством дебетовых транзакций
         * @returns {String} - месяц
         */
    findMostDebitTransactionMonth() {
        const counts = {};
        this.getTransactionByType('debit').forEach(t => {
            const month = new Date(t.transaction_date).toLocaleString('default', { month: 'long' });
            counts[month] = (counts[month] || 0) + 1;
        });
        return Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
    }

    /**
     * Возвращает тип транзакций, которых больше всего
     * @returns {String} - 'debit', 'credit' или 'equal'
     */
    mostTransactionTypes() {
        const debitCount = this.getTransactionByType('debit').length;
        const creditCount = this.getTransactionByType('credit').length;
        return debitCount > creditCount ? 'debit' : creditCount > debitCount ? 'credit' : 'equal';
    }

    /**
     * Возвращает транзакции, совершенные до указанной даты
     * @param {String} date - дата
     * @returns {Array} - массив транзакций
     */
    getTransactionsBeforeDate(date) {
        const targetDate = new Date(date);
        return this.datas.filter(t => new Date(t.transaction_date) < targetDate);
    }

    /**
     * Возвращает транзакцию по уникальному идентификатору
     * @param {String} id - уникальный идентификатор
     * @returns {Object} - транзакция 
     */
    findTransactionById(id) {
        return this.datas.find(t => t.transaction_id === id); //|| null;
    }

    /**
     * Возвращает массив описаний транзакций
     * @returns {Array} - массив описаний
     */
    mapTransactionDescriptions() {
        return this.datas.map(t => t.transaction_description);
    }
}

const transaction = {
    transaction_id: "9999",
    transaction_date: "2019-01-01",
    transaction_amount: 100.00, //""?
    transaction_type: "debit",
    transaction_description: "Payment for groceries",
    merchant_name: "SuperMart",
    card_type: "Visa",
}

const transactions = require("./transaction.json");

const analyzer = new TransactionAnalyzer(transactions);

//console.log(analyzer.getAllTransactions()); //OK

analyzer.addTransaction(transaction); //OK

console.log(analyzer.calculateTotalAmount()); //OK

console.log(analyzer.calculateTotalAmountByDate(null, 4, 10)); //OK

//console.log(analyzer.getTransactionByType("debit")); //OK

//console.log(analyzer.getTransactionsInDateRange("2019-01-01", "2019-01-01")); //OK

//console.log(analyzer.getUniqueTransactionType()); //Ok

console.log(analyzer.calculateAverageTransactionAmount()); // ok

console.log(analyzer.getTransactionsByAmountRange(100, 120));

console.log(analyzer.calculateTotalDebitAmount()); // ok

console.log(analyzer.findMostTransactionsMonth()); //OK

console.log(analyzer.findMostDebitTransactionMonth()); //OK

console.log(analyzer.mostTransactionTypes()); //OK

//console.log(analyzer.getTransactionsBeforeDate("2019-04-01")); //OK

console.log(analyzer.findTransactionById("9999")); //OK

//console.log(analyzer.mapTransactionDescriptions()); //OK

//console.log(analyzer.getTransactionsByMerchant("ElectronicsStoreXYZ")); //ok

