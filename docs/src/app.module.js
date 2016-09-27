angular.module('app', []);

angular.module('app')
    .constant('AppConstant', {
        calcFunction: {
            plus: '+',
            minus: '-'
        }
    });

angular.module('app')
    .controller('AppController', AppController);

AppController.$inject = [
    '$log',
    '$timeout',
    'AppConstant'
];

function AppController($log, $timeout, AppConstant) {
    var vm = this;
    vm.calcCount;
    vm.calcBase;
    vm.calcFunction;
    vm.numberOne;
    vm.numberTwo;
    vm.calcResult;
    vm.calcResultIsCorrect;
    vm.currentScore;
    vm.currentLives;

    function getRandomInt(max) {
        var min = Math.ceil(1);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function newCalculation() {
        vm.calcFunction = AppConstant.calcFunction.plus;
        vm.numberOne = getRandomInt(vm.calcBase);
        vm.numberTwo = getRandomInt(vm.calcBase);
        vm.calcResult = undefined;
        vm.calcResultIsCorrect = undefined;
    }

    function checkResult() {
        vm.calcCorrectResult = (vm.numberOne + vm.numberTwo);
        vm.calcResultIsCorrect = vm.calcResult == vm.calcCorrectResult;
        vm.calcScore = (vm.calcBase / 10);

        if (vm.calcResultIsCorrect) {
            vm.currentScore += vm.calcScore;
            vm.calcBase += 2;
            vm.calcCount++;
        }
        else {
            vm.currentLives--;
        }

        $log.debug('calc:', vm.numberOne, vm.calcFunction, vm.numberTwo, '=', vm.calcResult);
        $log.debug('calc.correct', vm.calcResultIsCorrect);

        if (vm.currentLives === 0) {
            showResults();
        }
    };

    function showResults() {
        $timeout(() => {
            vm.calcResultIsCorrect = undefined;
            vm.showSummary = true;
        }, 5000);
    }

    function restart() {
        vm.showSummary = false;

        vm.calcCount = 0;
        vm.calcBase = 10;
        vm.calcFunction;
        vm.numberOne;
        vm.numberTwo;
        vm.calcResult;
        vm.calcResultIsCorrect;
        vm.currentScore = 0;
        vm.currentLives = 3;
        newCalculation();
    }

    vm.newCalculation = newCalculation;
    vm.checkResult = checkResult;
    vm.restart = restart;

    // init ui for the first time
    restart();
}

/**
 * Ideas
 * - Bonus-Points for quick calculations -> add timer (10s downwards)
 * - Multiplier for different methods (* / % -> 1.5)
 */