class Calculator{
    constructor (currentOperationInnerText,previousOperationInnerText){
        this.currentOperationInnerText = currentOperationInnerText;
        this.previousOperationInnerText = previousOperationInnerText;
        this.clear();
    }
    clear(){
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined;
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1)
    }

    concat(number){
        if(number === '.' && this.currentOperand.includes('.')) return 
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }
    chooseOperation(operation){
        if(this.currentOperand === '') return
        if(this.previousOperand !== ''){
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute(){
        let result = 0;
        const previos = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if(isNaN(previos) || isNaN(current)){return} 
        switch (this.operation){
            case '+' :
                result = previos + current;
            break;
            case '-':
                result = previos - current;
            break;
            case 'x':
                result= previos * current;
            break;
            case '÷':
                result = previos / current;
            break;
            default:
                return    
        }
        this.previousOperand = '';
        this.currentOperand = result;
        this.operation = undefined;
        
    }
    getDisplayNumber(number){
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay
        if(isNaN(integerDigits)){
            integerDisplay = ''
        }else{
            integerDisplay = integerDigits.toLocaleString('en',{
            maximumFractionDigits: 0});
        }
        if(decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay;
        }
    }
    updateDisplay(){
        this.currentOperationInnerText.innerText = this.getDisplayNumber(this.currentOperand);
        if(this.operation != null){
            this.previousOperationInnerText.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else{
            this.previousOperationInnerText.innerText = '';
        }
    }
}


const numberButtons =  document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const currentOperationInnerText = document.querySelector('[data-current-operation-text]');
const previousOperationInnerText = document.querySelector('[data-previous-operation-text]');
const equalButton = document.querySelector('[data-equal]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');

const calculator = new Calculator(previousOperationInnerText,currentOperationInnerText);

numberButtons.forEach(button => button.addEventListener('click',() => {
    calculator.concat(button.innerText);
    calculator.updateDisplay();
}));

operationButtons.forEach(button => button.addEventListener ('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
}))

equalButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
});

allClearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});