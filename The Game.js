//Классы, Растения, Животные
class Plant {
    constructor(x, y) {
        this.ID;
        this.name = "i";
        this.step = false;
        this.hp = 100;
        this.timeToLife = 1000;
        this.i = x;
        this.j = y;
        this.ilast = this.i;
        this.jlast = this.j;
    }
}
class BigPlant {
    constructor(x, y) {
        this.ID;
        this.name = "i";
        this.step = false;
        this.timeToLife = 1000;
        this.hp = 1000;
        this.i = x;
        this.j = y;
        this.ilast = this.i;
        this.jlast = this.j;
    }
}
class Pet {
    constructor(i, j) {
        this.ID;
        this.timeToLife = 30;
        this.name = "X";
        this.step = " ";
        this.hp = 50;
        this.food= 10;
        this.i = i;
        this.j = j;
        this.ilast = this.i;
        this.jlast = this.j;
    }
}
//Сама игра
class Game {// добавить количество зверушек и кустов
    constructor(n, m, swarm, plants, time) {
        this.map = this.genMap(n, m);//генератор только карты
        this.n = n + 2;// размер карты
        this.m = m + 2;
        this.Animals = [];
        this.Plants = [];
        this.startPosition(swarm, plants); //дабавить зверотраву
        this.gameTime = time;
    }
    genMap(x, y) {
        x = x + 2;
        y = y + 2;
        var tempM = [];
        var tempN = [];
        for (var i = 0; i < x; i++) {
            for (var j = 0; j < y; j++) {
                tempN[j] = " ";
            }
            tempM[i] = tempN.slice();
        }
        for (var i = 1; i < y - 1; i++) {
            tempM[0][i] = "═";
            tempM[x - 1][i] = "═";
        }
        for (var i = 1; i < x - 1; i++) {
            tempM[i][0] = "║";
            tempM[i][y - 1] = "║";
        }
        tempM[0][0] = "╔";
        tempM[0][y - 1] = "╗";
        tempM[x - 1][0] = "╚";
        tempM[x - 1][y - 1] = "╝";
        return tempM;
    }
    delay(x) {// пауза
        var d = new Date();
        var c, diff;
        while (1) {
            c = new Date();
            diff = c - d;
            if (diff > x) break;
        }
    }
    print(t) { //печать карты после хода
        if (t == 1) {
            console.clear();
        };
        for (var i = 0; i < this.map.length; i++) {
            console.log(this.map[i].join(""));
        }
    }
    rand(min, max) {// случайное число
        let rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
    }

    startPosition(swarm, plants) {
        var tempArray = []; //Временный массив координат, для исключения повторов.
        for (var i = 1; i < this.map.length - 1; i++) {
            for (var j = 1; j < this.map[0].length - 1; j++) {
                tempArray.push(i + " " + j);
            }
        }
        //TO DO добавить иф если swarm+plants > n*m

        //для травы
        for (var k = 0; k < plants; k++) {
            var temp = this.rand(0, tempArray.length - 1);
            var tempArrij = tempArray[temp].split(" ");
            let i = tempArrij[0];
            let j = tempArrij[1];
            this.Plants[k] = new Plant(i, j);
            this.Plants[k].i = i;
            this.Plants[k].j = j;
            this.Plants[k].ID = k;
            tempArray.splice(temp, 1);
            this.map[i][j] = this.Plants[k].name;

        };
        //Zvery
        for (var k = 0; k < swarm; k++) {
            var temp = this.rand(0, tempArray.length - 1);
            var tempArrij = tempArray[temp].split(" ");
            let i = tempArrij[0];
            let j = tempArrij[1];
            this.Animals[k] = new Pet(i, j);
            this.Animals[k].ID = k;
            tempArray.splice(temp, 1);
            this.map[i][j] = this.Animals[k].name;

        }
    }
    //не работает
    tempJset(i, jX) {
        if (i == 1) return --jX;
        if (i == 2) return jX;
        if (i == 3) return ++jX;
        if (i == 4) return --jX;
        if (i == 5) return jX;
        if (i == 6) return ++jX;
        if (i == 7) return --jX;
        if (i == 8) return jX;
        if (i == 9) return ++jX;
    }
    tempIset(i, iX) {
        if (i == 1) return --iX;
        if (i == 2) return --iX;
        if (i == 3) return --iX;
        if (i == 4) return iX;
        if (i == 5) return iX;
        if (i == 6) return iX;
        if (i == 7) return ++iX;
        if (i == 8) return ++iX;
        if (i == 9) return ++iX;
    }
    setstep(iX, jX, ID) {//i- номер зверя ID

        var around = [];
        var whantToGO = [];
        var tempI;
        var tempJ;

        for (let i = 1; i < 10; i++) {
            tempI = this.tempIset(i, iX);
            tempJ = this.tempJset(i, jX);
             if (this.map[tempI][tempJ] == " " || this.map[tempI][tempJ] == this.Animals[ID].step) around.push(i);
            if (this.map[tempI][tempJ] == "i") whantToGO.push(i);
        }
        if (whantToGO.length > 0) {
            //console.log(this.Animals[ID]);
            //this.delay(100);

            // console.log("Нашел " + whantToGO);
            //this.delay(1000);
            return whantToGO;
        } else
            if (around.length > 0) {
                //console.log(around);
                return around;
            } else return [5];
    }

    stepAnimal() {
        for (var i = 0; i < this.Animals.length; i++) {
            var num = 5;
            var a = this.setstep(this.Animals[i].i, this.Animals[i].j, this.Animals[i].ID);

            if (typeof a == "number") { num = a; }
            else
            if (a.length == 1) { num = a[0]; }
            else { //Если ход - стоять на месте (5)
                num = a[this.rand(0, a.length - 1)];
                }

            //console.log("ID = "+this.Animals[i].ID+ " Ходит из: "+this.Animals[i].ilast+" "+this.Animals[i].jlast+" В сторону: "+num +" Из набора: " + a+ " a.length="+a.length);
            //this.delay(1000);
            switch (num) {
                case 1:
                    //i-1 j-1
                    this.Animals[i].ilast = this.Animals[i].i;
                    this.Animals[i].jlast = this.Animals[i].j;
                    this.Animals[i].i--;
                    this.Animals[i].j--;
                    this.map[this.Animals[i].i][this.Animals[i].j] = this.Animals[i].name;
                    this.map[this.Animals[i].ilast][this.Animals[i].jlast] = this.Animals[i].step;
                    //Придумать функцию отрисовки
                    break;
                case 2:
                    //i-1 j
                    this.Animals[i].ilast = this.Animals[i].i;
                    this.Animals[i].jlast = this.Animals[i].j;
                    this.Animals[i].i--;
                    this.Animals[i].j;
                    this.map[this.Animals[i].i][this.Animals[i].j] = this.Animals[i].name;
                    this.map[this.Animals[i].ilast][this.Animals[i].jlast] = this.Animals[i].step;
                    break;
                case 3:

                    this.Animals[i].ilast = this.Animals[i].i;
                    this.Animals[i].jlast = this.Animals[i].j;
                    this.Animals[i].i--;
                    this.Animals[i].j++;
                    this.map[this.Animals[i].i][this.Animals[i].j] = this.Animals[i].name;
                    this.map[this.Animals[i].ilast][this.Animals[i].jlast] = this.Animals[i].step;
                    break;
                case 4:

                    this.Animals[i].ilast = this.Animals[i].i;
                    this.Animals[i].jlast = this.Animals[i].j;
                    this.Animals[i].i;
                    this.Animals[i].j--;
                    this.map[this.Animals[i].i][this.Animals[i].j] = this.Animals[i].name;
                    this.map[this.Animals[i].ilast][this.Animals[i].jlast] = this.Animals[i].step;
                    break;
                case 5:
                    break;
                case 6:

                    this.Animals[i].ilast = this.Animals[i].i;
                    this.Animals[i].jlast = this.Animals[i].j;
                    this.Animals[i].i;
                    this.Animals[i].j++;
                    this.map[this.Animals[i].i][this.Animals[i].j] = this.Animals[i].name;
                    this.map[this.Animals[i].ilast][this.Animals[i].jlast] = this.Animals[i].step;
                    break;
                case 7:
                    this.Animals[i].ilast = this.Animals[i].i;
                    this.Animals[i].jlast = this.Animals[i].j;
                    this.Animals[i].i++;
                    this.Animals[i].j--;
                    this.map[this.Animals[i].i][this.Animals[i].j] = this.Animals[i].name;
                    this.map[this.Animals[i].ilast][this.Animals[i].jlast] = this.Animals[i].step;
                    break;
                case 8:
                    this.Animals[i].ilast = this.Animals[i].i;
                    this.Animals[i].jlast = this.Animals[i].j;
                    this.Animals[i].i++;
                    this.Animals[i].j;
                    this.map[this.Animals[i].i][this.Animals[i].j] = this.Animals[i].name;
                    this.map[this.Animals[i].ilast][this.Animals[i].jlast] = this.Animals[i].step;
                    break;
                case 9:
                    this.Animals[i].ilast = this.Animals[i].i;
                    this.Animals[i].jlast = this.Animals[i].j;
                    this.Animals[i].i++;
                    this.Animals[i].j++;
                    this.map[this.Animals[i].i][this.Animals[i].j] = this.Animals[i].name;
                    this.map[this.Animals[i].ilast][this.Animals[i].jlast] = this.Animals[i].step;
                    break;
            }
        }
    }

    start() {
        this.print(1);
        //this.delay(1000);
        console.log("START");
        //this.delay(1000);
        for (var i = 0; i < this.gameTime; i++) {
            this.print(1);//0 без стирания консоли
            this.stepAnimal();
            this.delay(100);
        }
        this.print(1);
    }
}

//размер карты i j зверьки трава время(игры)
var a = new Game(20, 60, 3, 1000, 1000);
a.start();

// TO DO
// Большое дерево
// Мелкое дерево
// Хищники
// Сколько схомячил
// - к времени за жизни за ход (Сколько должен жить и голод или восстановление ходов)
// Восстановление ходов за еду + набор для новой зверушки
// Варианты хищников или поедание травы

var map = [[" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
[" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
[" ", " ", " ", "Z", " ", "X", " ", " ", " ", " "],
[" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
[" ", " ", " ", " ", " ", " ", " ", " ", " ", " "]];

var a = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var iX = 2;
var jX = 2;

console.log("'clg + Tab' запускает скрип консоллога");


function growUp() {
}
//test
