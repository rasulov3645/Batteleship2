
//(Представление) Объект для пердставление данных 
var view = { 

	  // Метод получает строковое сообщение и выводит
      // его в области сообщений 
      displayMessage: function (msg){
          var messageArea = document.getElementById("messageArea");
          messageArea.innerHTML = msg;
      },  
      displayHit: function (location){
          var cell = document.getElementById(location);
          cell.setAttribute("class", "hit");
      },  
      displayMiss: function(location){
          var cell = document.getElementById(location);
          cell.setAttribute("class", "miss"); 

      }

};

// var ship1 = { locations: ["00", "20", "30"], hits: ["", "", ""] };
// var ship2 = { locations: ["32", "33", "34"], hits: ["", "", ""] };
// var ship3 = { locations: ["63", "64", "65"], hits: ["", "", "hit"] };


/*var ships = [ { locations: ["06", "16", "26"], hits: ["hit", "miss", "miss"] },
              { locations: ["10", "11", "12"], hits: ["hit", "miss", "hit"] },
              { locations: ["63", "64", "65"], hits: ["hit", "", "hit"] }
            ];*/

// Задание(практика)
// var ship2 = ships[1];
// var locations = ship2.locations;
// console.log("Location is " + locations[1]);

// var ship3 = ships[2];
// var hits = ship3.hits;
// if (hits[0] === "hit") {
//    console.log("Ouch, hit on third ship at location one");
// }
// var ship1 = ships[0];
// var hits = ship1.hits;
// hits[2] = "nit";
// console.log(ship1.hits);


// Объект модели 
var model = {
   boardSize: 7,     // 
   numShips: 3,      // Кол-во кораблей 
   shipLength: 3,    // Длина коробля(в клетках)    
   shipsSunk: 0,     // Кол-во потопленных кораблей 
   
   ships: [ { locations: [0, 0, 0], hits: ["", "", ""] },
            { locations: [0, 0, 0], hits: ["", "", ""] },
            { locations: [0, 0, 0], hits: ["", "", ""] }
          ],
   
   fire: function(guess) {
       for (var i = 0; i < this.numShips; i++) {
           var ship = this.ships[i];
           var index = ship.locations.indexOf(guess);  // В веде сцепление смотрирся прилично  
             //var tempLocations = ship.locations;
             //var index = locations.indexOf(guess);
           if (index >= 0){ // Есть попадание!
              ship.hits[index] = "hit";
              view.displayHit(guess);
              view.displayMessage("HIT!");
              if (this.isSunk(ship)){ // Если корабль потоплень увеличиваем счеткик потопленных кораблей 
                  view.displayMessage("You sank my battleship!");
                  this.shipSunk++;
              } 
            return true;
          }
       }
     view.displayMiss(guess);
     view.displayMessage("You missed.");
     return false;
   }, 
 // Метод дает знать потоплен корабль или нет 
   isSunk: function(ship){ 
        for(var i = 0; i < this.shipLength; i++){
           if(ship.hits[i] !== "hit"){
              return false;
           }
        }
     return true;
   },
   generateShipLocations: function(){
       var locations;
       for(var i = 0; i < this.numShips; i++){
          do{
            locations = this.generateShip();
          } while(this.collision(locations))
          this.ships[i].locations = locations;
       }


   },
   generateShip: function(){
       var direction = Math.floor(Math.random() * 2);
       var row, col;

       var newShipLocations = [];
       for (var i = 0; i < this.shipLength; i++){
          
        // Сгенерировать начальную позицию для горизонтального корабля
          if (direction === 1){
             row = Math.floor(Math.random() * this.boardSize);
             col = Math.floor(Math.random() * (this.boardSize - this.shipLength));          
             newShipLocations.push(row + "" + (col + i));
          }else{ // Сгенерировать начальную позицию для вертикального корабля
             row = Math.floor(Math.random() * (this.boardSize - this.shipLength));
             col = Math.floor(Math.random() * this.boardSize); 
             newShipLocations.push((row + i) + "" + col);
          }
        
       }
     return newShipLocations; // Когда все позиция сгенированы метод возвращает массив 
   },
   collision: function(locations){
       for (var i = 0; i < this.numShips; i++){
          var ship = model.ships[i];
          for (var j = 0; j < locations.length; j++){
             if (ship.locations.indexOf(locations[j]) >= 0){
                return true;
             }
          } 
       }
      return false;
   }

};

// Тест-драйв 
// model.fire("53");
// model.fire("06");
// model.fire("16");
// model.fire("26");
// model.fire("34");
// model.fire("24");
// model.fire("44");
// model.fire("12");
// model.fire("11");
// model.fire("10");


// Объект Контроллер 
var controller = {
  guesses: 0,
  processGuess: function(guess){
     var location = parseGuess(guess);    
     if(location){ // Если не нул то выплняем 
        this.guesses++;
        var hit = model.fire(location);
        if (hit && model.shipsSunk === model.numShips){
          view.displayMessage("You sank all my battleships, in " + this.guesses + " guesses");
        }
     } 
  }

};


function parseGuess(guess){
 var alphabet = ["A","B","C","D","E","F","G"];
     if(guess === null || guess.length !== 2){
        alert("Oops, please enter a letter and a number on the board.");
     }else{
        firstChar = guess.charAt(0);   // Первая цифра в строке 
        var row = alphabet.indexOf(firstChar);
        var column = guess.charAt(1);  // Вторая цифра в стороке 
     }  
     if (isNaN(row) || isNaN(column)){
        alert("Oops, that is't on the board.");
     }else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize){
        alert("Oops, that's off the board!");
     }else{
        return row + column; 
     }
     return null
  }


// Тест-драйв 
/*console.log(parseGuess("A0"));
console.log(parseGuess("B6"));
console.log(parseGuess("G3"));
console.log(parseGuess("H0"));
console.log(parseGuess("A7"));
*/

// controller.processGuess("A0");
// controller.processGuess("A6");
// controller.processGuess("B6");
// controller.processGuess("C6");
// controller.processGuess("C4");
// controller.processGuess("D4");
// controller.processGuess("E4");
// controller.processGuess("B0");
// controller.processGuess("B1");
// controller.processGuess("B2");

function init(){
   var fireButton = document.getElementById("fireButton");  
   fireButton.onclick = handleFireButton; // Кнопке можно назначить обработчик события нажатия — функцию handleFireButton.
   var guessInput = document.getElementById("guessInput");
   guessInput.onkeypress = handleKeyPress;  // Тоже обработчик для кнопки 'Enter'
   
   // Вызываем метод генирирующий позиция кораблей 
   model.generateShipLocations(); 
}

// Это функция handleFireButton. Она будет вызываться при каждом нажатии кнопки Fire!.
function handleFireButton(){
    var guessInput = document.getElementById("guessInput");
    var guess = guessInput.value;
    controller.processGuess(guess);

    guessInput.value = ""; // Обнуляем введенные координаты чтобы ползователь ввел новые 
}

// Само функциия для обработчика кнопки 'Enter'
function handleKeyPress(e) {
   var fireButton = document.getElementById("fireButton");
   if (e.keyCode === 13) {
      fireButton.click();
      return false;
   }
  // guessInput.value = ""; // Обнуляем введенные координаты чтобы ползователь ввел новые 
}


window.onload = init; // Браузер выполняет init при полном загрузке страницы 