angular.module('kanji').controller('StateController', ['$window', function($window){
  this.state = 1;
  /* 0    reserved for course selection
     1    sections of a particular course
     2    learning mode
     3    practice mode
  */

  this.isState = function(xstate){
    return this.state === xstate;
  };

  this.learnSection = function(){
    window.scrollTo(0, 0);
    this.state = 2;
  };

  this.practiceSection = function(){
    window.scrollTo(0, 0);
    this.state = 3;
  };

  this.returnToCourse = function(){
    window.scrollTo(0, 0);
    this.state = 1;
  };

}]);
