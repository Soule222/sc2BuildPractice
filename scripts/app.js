// Creating a worker, and a figure handler from my figure class in figures.js

const myWorker = new Worker('../scripts/worker.js');
document.getElementById('makeCounter').addEventListener('click', createCounter);
let figureTool = new figureCreator();

// this Sets up what will happen when I recieve data from my worker
myWorker.onmessage = function(message){
   
    // The object selectors here are a custom object that I am making, using the event. data is where the
    // Information from the worker is passed, as an object, and then I select what pieces I want

    document.getElementById(message['data']['id']).innerHTML = message['data']['count'];

    // Deletes the figure if the counter is completed, after 5 seconds. 
    
    if (message['data']['count'] === message['data']['timeToBuild']){
        console.log('needs to be removed');
        console.log('Build it!!!!!')
        setTimeout(() => document.getElementById(message['data']['id']).parentElement.remove(), 5000);
    }
}

myWorker.onerror = function(e){
    console.log(e);
}

function createCounter(){

    //  Using counter number to be able to count the number of counters that are in the collection
    // Then use that number to assign an id to the counter so that I can pass that to my worker to manipulate it. 

    let counterContainer = document.getElementById('counterContainer');
    let counterNumber = counterContainer.childElementCount;

    // Tests to see if data is valid, and creates a data object if it is. 
    let creationData = figureTool.figureDataHandling();
    
    // Creating the figure then starting the worker up, if it passed validation
    creationData[`timerId`] = counterNumber + 1 

    if(creationData){
        figureTool.makeFigure(`${creationData[`whatToBuild`]}`, (counterNumber + 1))
        myWorker.postMessage(creationData);
    } else {
        console.log('please check your inputs');
    }

}

document.getElementById('getInputData').addEventListener('click', figureTool.getData);

// Getting the build order table then
// Adding functionality to the delete buttons with event bubbling.

document.getElementById('buildOrderTable').addEventListener('click', function(e){

    if (e.target.classList.contains('deleteButton')) {
        console.log(e.target.parentElement.parentElement);
        e.target.parentElement.parentElement.remove();
    }
});

function makeFormFigure(){
    console.log('MAKING IT');

    let rowCount = document.getElementById('buildOrderTable').children.length;


    let testRow = document.getElementById(`tableRow-1`);
    const myElement = testRow;
    let myData = {};

    // Loops through the table row children, and put their information into an object
    // values are [production, supply, time]. -1 prevents delete button from being added. 

    for (let i = 0; i < myElement.children.length - 1; i++) {
        myData[myElement.children[i].classList[0]] = myElement.children[i].innerHTML;
    }

    // Taking the time data, and splitting it so it can be passed to time. + is the urnary operator, makes it a number. 
    splitTime = myData['time'].split(":");

    let minutes = +splitTime[0];
    let seconds = +splitTime[1];

    let production = myData['production'];
    let parsedProduction = production.toLowerCase();
    parsedProduction = parsedProduction.split(' ').join('');

    console.log(parsedProduction);

    let timeToBuildSeconds = (minutes * 60) + seconds

    let counterContainer = document.getElementById('counterContainer');
    let counterNumber = counterContainer.childElementCount;

    // Tests to see if data is valid, and creates a data object if it is. 
    
    let creationData = {}

    creationData['timeToBuild'] = timeToBuildSeconds;
    creationData['whatToBuild'] = parsedProduction;

    // Creating the figure then starting the worker up, if it passed validation
    creationData[`timerId`] = counterNumber + 1;

    if(creationData){
        figureTool.makeFigure(`${creationData[`whatToBuild`]}`, (counterNumber + 1))
        myWorker.postMessage(creationData);
    } else {
        console.log('please check your inputs');
    }
    
}
    

document.getElementById('formButton').addEventListener('click', makeFormFigure);















// Test code
let today = new Date();

console.log(today.getTime())

let startTime = today.getTime()
let seconds = 10
let miliSeconds = seconds * 1000

endTime = startTime + miliSeconds

console.log(startTime, endTime);

// This is a test function that I am going to be using to set the workers into motion. This will check the timing over and over again until 
// It is time for the worker to pass data back to the main application script. 
// const myTest = setInterval(function(){

//     if ((new Date().getTime()) < endTime){
//         console.log('continuing');
//         console.log(new Date().getTime());
//     } else if ((new Date().getTime()) >= endTime){
//         console.log('Success');
//         clearInterval(myTest);
//     }
// }, 100)



let testData = {
    '1': {'unit': 'scv', 'time': '00:05'},
    '2': {'unit': 'scv', 'time': '00:20'}
}

// document.getElementById(`test`).addEventListener(`click`, checkRadio);

console.log(testData['1'])
console.log(Object.keys(testData));

let someData = (Object.keys(testData));


function testingStuff(data){
    console.log(parseInt(data))
    if(isNaN(parseInt(data))){
        return('That sucked');
    }else {
        return('That worked');
    }
}

console.log(testingStuff('bl'))

let someVariable = '2'

someVariable = +someVariable
console.log(typeof(someVariable));

console.log('poop')

// let testRow = document.getElementById(`tableRow-1`);

// console.log(testRow);

// console.log(testRow.childNodes);

// const myElement = testRow;
// let myData = {};

// // Loops through the table row children, and put their information into an object

// for (let i = 0; i < myElement.children.length - 1; i++) {
//   console.log(myElement.children[i].classList);
//   console.log(myElement.children[i].classList[0]);
//   myData[myElement.children[i].classList[0]] = myElement.children[i].innerHTML;

// }

// console.log(myData);

function doMyStuff(){
    let rowCount = document.getElementById('buildOrderTable').children.length;

    console.log(rowCount);

    console.log(document.getElementById('buildOrderTable').children);

}
let testButton = document.getElementById('testButton');
testButton.addEventListener('click', doMyStuff);