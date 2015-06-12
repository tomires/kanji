angular.module('kanji').controller('TopicController', ['$http','$window', function($http,$window){
  var kanji = this;
  this.sections = [];

  /* currently hardwired to N5 kanji selection,
     took me about 3 hours to hand-type all 103
     characters in that fucking JSON! */

  $http.get('/json/n5.json').success(function(data){
    kanji.sections = data;
  });

  this.barwidth = 0;
  this.section = 0;
  this.kanji = 0;
  this.kanjiTotal = 0;

  this.mode = 0; /* 0 - learning
                    1 - practice */
  this.currKanjiOn = [];
  this.currKanjiKun = [];
  this.guessedOn = [];
  this.guessedKun = [];
  this.userAnswer = '';
  this.congratulate = 0;

  this.selectSection = function(xsection, xmode){
    this.selectSectionKanji(xsection, 0);

    if(xmode){ /* practice mode only */
      this.kanji = parseInt(Math.random() * this.kanjiTotal);                   /* modify so it remembers previously picked kanji */
      this.prepareLists();
    }

    return true;
  };

  this.selectSectionKanji = function(xsection, xkanji){
    this.section = xsection;
    this.kanji = xkanji;
    this.kanjiTotal = this.sections[this.section].characters.length;
    this.barwidth = 100 * (this.kanji / (this.kanjiTotal - 1));
    return true;
  };

  this.isSelected = function(xsection){
    return this.section === xsection;
  };

  this.nextKanji = function(){
    $window.scrollTo(0, 0);
    if(this.kanji < this.kanjiTotal - 1) this.kanji++;
    this.barwidth = 100 * (this.kanji / (this.kanjiTotal - 1));
  };

  this.prevKanji = function(){
    $window.scrollTo(0, 0);
    if(this.kanji > 0) this.kanji--;
    this.barwidth = 100 * (this.kanji / (this.kanjiTotal - 1));
  };

  this.isNotFirstKanji = function(){
    return this.kanji > 0;
  }

  this.isNotLastKanji = function(){
    return this.kanji < (this.kanjiTotal - 1);
  }

  /* functions specific to practice mode */

  this.prepareLists = function(){
    this.currKanjiOn = this.sections[this.section].characters[this.kanji].on;
    this.currKanjiKun = this.sections[this.section].characters[this.kanji].kun;
    this.guessedOn = [];
    this.guessedKun = [];
    this.userAnswer = '';
    this.congratulate = 0;
    return true;
  }

  this.validateEntry = function(){
    if(this.congratulate)
      this.selectSection(this.section, 1);

    for(item in this.currKanjiOn){
      if(this.parseAndCompare(this.currKanjiOn[item])){
        if(this.guessedOn.indexOf(this.currKanjiOn[item]) == -1){
          this.guessedOn.push(this.currKanjiOn[item]);
          this.userAnswer = '';
          this.checkIfDone();
          return true;
        }
      }
    }

    for(item in this.currKanjiKun){
      if(this.parseAndCompare(this.currKanjiKun[item])){
        if(this.guessedKun.indexOf(this.currKanjiKun[item]) == -1){
          this.guessedKun.push(this.currKanjiKun[item]);
          this.userAnswer = '';
          this.checkIfDone();
          return true;
        }
      }
    }

    return false;
  }

  this.checkIfDone = function(){
    if(this.currKanjiKun.length == this.guessedKun.length
    && this.currKanjiOn.length == this.guessedOn.length)
      this.congratulate = 1;
  }

  this.parseAndCompare = function(xcurrKanji){
    var kanjiParts = xcurrKanji.split('/');

    if(this.userAnswer == kanjiParts[0]) return true;

    else if(kanjiParts.length > 1
      && (this.userAnswer == kanjiParts[0].concat(kanjiParts[1]))
      || (this.userAnswer == kanjiParts[0].concat('/').concat(kanjiParts[1])))
      return true;

    return false;
  }

}]);
