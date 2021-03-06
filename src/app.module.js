angular.module('app', []);

angular.module('app')
    .constant('AppConstant', {
        calcFunction: {
            plus: '+',
            minus: '-'
        }
    });

angular.module('app')
    .directive('focus', function focus() {
        return {
            link: function(scope, element) {
                element[0].focus();
            }
        };
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

    var showResultTimeout;

    vm.calcCount;
    vm.calcBase;
    vm.calcFunction;
    vm.numberOne;
    vm.numberTwo;
    vm.calcResult;
    vm.calcResultIsCorrect;
    vm.currentScore;
    vm.correctCount;
    vm.errorCount;
    vm.maxErrorCount = 3;

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

        angular.element('#calcResult').focus();
    }

    function checkResult() {
        if (!vm.calcResult) {
            $log.error('no result given');
            return;
        }
        vm.calcCorrectResult = (vm.numberOne + vm.numberTwo);
        vm.calcResultIsCorrect = vm.calcResult == vm.calcCorrectResult;
        vm.calcScore = (vm.calcBase / 10);
        vm.calcScore = parseInt(vm.calcCorrectResult / 10);
        vm.calcCount++;

        if (vm.calcResultIsCorrect) {
            vm.correctCount++;
            // vm.currentScore += vm.calcScore;
            vm.currentScore += vm.calcScore;
            vm.currentScore = vm.currentScore;
            vm.calcBase = 10 + (vm.correctCount * 2);
        }
        else {
            vm.errorCount++;
        }

        if (vm.errorCount >= vm.maxErrorCount) {
            showResults();
        }
    }

    function showResults() {
        showResultTimeout = $timeout(function() {
            vm.calcResultIsCorrect = undefined;
            vm.showSummary = true;
        }, 5000);
    }

    function restart() {
        $timeout.cancel(showResultTimeout);
        vm.showSummary = false;

        vm.calcCount = 0;
        vm.calcBase = 10;
        vm.calcFunction;
        vm.numberOne;
        vm.numberTwo;
        vm.calcResult;
        vm.calcResultIsCorrect;
        vm.currentScore = 0;
        vm.correctCount = 0;
        vm.errorCount = 0;
        vm.maxErrorCount = 3;
        newCalculation();
    }

    vm.newCalculation = newCalculation;
    vm.checkResult = checkResult;
    vm.restart = restart;

    // init ui for the first time
    restart();
}