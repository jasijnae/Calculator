/*
Requirements

function as a calcutor
accept user inputs 
    intergers and decimals
    operator
recognize and store inputs
calculate inputs
return results

clear input
delete 1 each time the delete button is pushed. 




*/

//pass the value of 
const keys = document.querySelector('.calculator-buttons');
//to grab all the values from whatever element is clicked
    keys.addEventListener('click', event => {
        const{target} = event; 
        const {value} = target; 
        //if not a botton
        if (!target.matches('button')) {
            return;
        }else {
            //pass value store in button
            calculator.parseInput(value)
        }
})

const calculator = {
    displayText: '0', //starting text
    prevTotal: null, //current number string typed to be stored before an operator or = is clicked
    currentNum: null, //the last amount or total after an operator or = is clicked.
    operation: null, //pass current operator
    total: null, //final amount displayed after = can be passed back to prevTotal if additional operators are clicked

    parseInput(value){

        //double check if it's and operator vs number

        switch (value) {


            case 'AC':
                this.clearAll();
                break;
            case 'delete':
                this.deleteLast();
                break;
            case '+':
            case '-':
            case '*':
            case '/':
              this.applyOpe(value); // All operators preform the function based on their action
                break;
            case '.': 
                //instrcutions to clear answer
                if(this.displayText == 0){
                    this.addText('0.')
                }else {
                    this.addText(value)
                }
                break;
            case '=':
                this.calculateTotal()
                break;
            default:
                this.addText(value)
                break;   
        }
    },
    
                    /*  Take whatever number is currently on the screen.
                    Save that number into 'this.prevTotal'.
                    Save the symbol '+' into 'this.activeOperator'.
                    Clear the screen (or set it to '0') so the user can type the second number.*/

    addText(value) {        
        if (this.displayText === '0'){
            this.displayText = '';

        }
        if (isNaN(+(value)) && isNaN(+(this.displayText))) {
            if(isNaN(this.displayText.slice(-1))){
                return;
            }else if(this.displayText.slice(-1) === '.'){
                return this.displayText
            }
        }
    
        this.displayText += value
        this.outputText(this.displayText)
    
    },

    applyOpe(operator ) {
        // 1. Convert the current screen text into a real number and save it to our vault
        this.prevTotal = parseFloat(this.displayText);
        
        // 2. Bookmark the operator ('+') so we remember it for later
        this.operation = operator;
        
        // 3. Reset the screen memory to '0' so the user can type the second number fresh
        this.displayText = '';
        
        // 4. Update the physical screen display to show the reset state
        this.outputText(this.displayText);
    },

    deleteLast() {
        //set the new display text to be minus the last character
        this.displayText = this.displayText.slice(0, -1);

        //if the last character is 0 then ignore
        if(this.displayText === ''){
            this.displayText = '0';
        }
        this.outputText(this.displayText)

    },

    clearAll() {
        //reset everything
        this.displayText = '0';
        this.prevTotal = null;
        this.currentNum = null;
        this.operator = null;
        this.total = null;

        // reset display
        this.outputText(this.displayText);

    },

    calculateTotal(){
        // If there's no operator or no saved first number, we can't calculate anything
        if (this.operation === null || this.prevTotal === null) {
            return;
        }

        // 1. Set currentNum equal to parseFloat of what's currently on the screen (Number B)
        this.currentNum = parseFloat(this.displayText);

        // 2. Perform math based on the saved operator property
        switch (this.operation) {
            case '+':
                this.total = this.prevTotal + this.currentNum;
                break;
            case '-':
                this.total = this.prevTotal - this.currentNum;
                break;
            case '*':
                this.total = this.prevTotal * this.currentNum;
                break;
            case '/':
                // Safety check to prevent dividing by zero
                if (this.currentNum === 0) {
                    this.displayText = 'Error';
                    this.outputText(this.displayText);
                    return;
                }
                this.total = this.prevTotal / this.currentNum;
                break;
            default:
                return;
        }

        // 3. Stringify the mathematical total back into your displayText property
        this.displayText = this.total.toString();

        // 4. Render the final answer out to the physical screen
        this.outputText(this.displayText);

        // 5. As per your plan: hand total off to prevTotal so the user can chain operators!
        this.prevTotal = this.total;
        this.currentNum = null;
        this.operator = null;
    },


    outputText(text) {
        document.querySelector('.screen input').value = text 
    }
}