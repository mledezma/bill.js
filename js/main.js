(function(window){
    // Variables
    var form = document.getElementById('billForm');
    var billA = document.getElementById('billA');
    var billB = document.getElementById('billB');
    var billC = document.getElementById('billC');
    var bill = [];
    var sumArray = [[],[],[]];
    var sortName = '';
    var sortCont = 0;

    // Class that creates a bill object
    function Bill(data) {
        this.name = data.name;
        this.type = data.type;
        this.date = data.date;
        this.amount = parseInt(data.amount);
    };


    // Creates an object with the info of the form when the user submit
    var newBill = function newBill(){
        var data = {
            name: form.name.value,
            type: form.type.value,
            date: form.date.value,
            amount: form.amount.value,
        };

        //Validation of the form
        if(data.name === '' || !isNaN(data.name)){              
            alert('Insert a name');
            return;
        }
        if(data.date === ''){
            alert('Insert a date');
            return;
        }
        if(data.amount === '' || isNaN(data.amount)){
            alert('Insert an amount');
            return;
        }
        

        bill.push(new Bill(data));

        // Render a new bill
        renderBill();

        // Sum every bill
        sumBill();                          
    };

    

    // Render the bill(s) as table(s)
    var renderBill = function renderBill(){
        document.getElementById('billTable').innerHTML = '';        
        for(var i = 0; bill.length > i; i++){
            var tr = document.createElement('tr');
            for(prop in bill[i]){
                var td = document.createElement('td');
                td.textContent = bill[i][prop];
                tr.appendChild(td);
                document.getElementById('billTable').appendChild(tr);
            };
        };
    };

    // Sum every new bill
    var sumBill = function sumBill(){
        var billType = bill[bill.length-1].type;
        var billAmount = bill[bill.length-1].amount;

        switch (billType) {
            case "a":          
                sumArray[0].push(billAmount);
                var sumA = sumArray[0].reduce(function(acc, val) {
                    return acc + val;
                }, 0);
                billA.innerHTML = sumA;
                break;
            case "b":
                sumArray[1].push(billAmount);
                var sumB = sumArray[1].reduce(function(acc, val) {
                    return acc + val;
                }, 0);          
                billB.innerHTML = sumB;              
                break;
            case "c":
                sumArray[2].push(billAmount);            
                var sumC = sumArray[2].reduce(function(acc, val) {
                    return acc + val;
                }, 0);    
                billC.innerHTML = sumC;                          
                break;
            default:
                alert('Invalid type!');
                break;
        }
    }

    // Sort
    var sortBill = function sortBill() {
        if(sortName == 'name') {
            if(sortCont === 0) {
                document.getElementById('sortName').innerHTML = '&#9650';
                bill.sort(function(a, b){
                    if(a.name < b.name) return -1;
                    if(a.name > b.name) return 1;
                    return 0;
                })
                sortCont = 1;
            } else if(sortCont === 1) {              
                document.getElementById('sortName').innerHTML = '&#9660';
                bill.sort(function(b, a){
                    if(a.name < b.name) return -1;
                    if(a.name > b.name) return 1;
                    return 0;
                })
                sortCont = 0;
            };
        };
        if(sortName == 'type'){
            if(sortCont === 0) {
                document.getElementById('sortType').innerHTML = '&#9650';
                bill.sort(function(a, b){
                    if(a.type < b.type) return -1;
                    if(a.type > b.type) return 1;
                    return 0;
                })
                sortCont = 1;
            } else if(sortCont === 1) {               
                document.getElementById('sortType').innerHTML = '&#9660';
                bill.sort(function(b, a){
                    if(a.type < b.type) return -1;
                    if(a.type > b.type) return 1;
                    return 0;
                })
                sortCont = 0;
            };
        };
        if(sortName == 'date'){
            if(sortCont === 0) {
                document.getElementById('sortDate').innerHTML = '&#9650';
                bill.sort(function(a, b){
                    if(a.date < b.date) return -1;
                    if(a.date > b.date) return 1;
                    return 0;
                })
                sortCont = 1;
            } else if(sortCont === 1) {               
                document.getElementById('sortDate').innerHTML = '&#9660';
                bill.sort(function(b, a){
                    if(a.date < b.date) return -1;
                    if(a.date > b.date) return 1;
                    return 0;
                })
                sortCont = 0;
            }; 
        }
        if(sortName == 'amount'){
            if(sortCont === 0) {
                document.getElementById('sortAmount').innerHTML = '&#9650';
                bill.sort(function(a, b){
                    if(a.amount < b.amount) return -1;
                    if(a.amount > b.amount) return 1;
                    return 0;
                })
                sortCont = 1;
            } else if(sortCont === 1) {             
                document.getElementById('sortAmount').innerHTML = '&#9660';
                bill.sort(function(b, a){
                    if(a.amount < b.amount) return -1;
                    if(a.amount > b.amount) return 1;
                    return 0;
                })
                sortCont = 0;
            };            
        }

        // Render the bill
        renderBill();
        
    }

    // Return to global scope
    window.app = {
        bill: newBill,
        sort: sortBill,
        sortName: function(sort){
            sortName = sort;
        },
    };

}(window));

document.getElementById('submit').addEventListener('click', function(event) {
    event.preventDefault();
    app.bill(); 
});

document.getElementById('sortName').addEventListener('click', function() {
    app.sortName('name');           
    app.sort();
});

document.getElementById('sortType').addEventListener('click', function() {
    app.sortName('type');           
    app.sort();
});

document.getElementById('sortDate').addEventListener('click', function() {
    app.sortName('date');           
    app.sort();
});

document.getElementById('sortAmount').addEventListener('click', function() {
    app.sortName('amount');           
    app.sort();
});