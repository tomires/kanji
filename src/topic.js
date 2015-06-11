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

  this.selectSection = function(xsection){
    return this.selectSectionKanji(xsection, 0);
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

}]);
