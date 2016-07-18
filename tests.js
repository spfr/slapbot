var expect = require('expect');
var helpers = require('./helpers.js');
var validEmojiFormat = helpers.validEmojiFormat;
var getRandomBanter = helpers.getRandomBanter;

validEmojiFormatTest();
getRandomBanterTest();

function validEmojiFormatTest() {
  console.log('validEmojiFormat() test');
  console.log('=> should return a valid emoji format');
  expect(validEmojiFormat('heart')).toEqual(':heart:');
  expect(validEmojiFormat(':heart:')).toEqual(':heart:');
  expect(validEmojiFormat(':heart')).toEqual(':heart:');
  expect(validEmojiFormat('heart:')).toEqual(':heart:');
  console.log('✓ Passed test cases. \n');
}

function getRandomBanterTest() {
  console.log('getRandomBanter() test');
  console.log('=> should return a string');
  expect(getRandomBanter()).toBeA('string');
  expect(getRandomBanter()).toBeA('string');
  expect(getRandomBanter()).toBeA('string');
  expect(getRandomBanter()).toBeA('string');
  console.log('✓ Passed test cases. \n');  
}
