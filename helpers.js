var banterArray = [
  'Ouch! That must hurt!',
  'That should teach you a lesson!',
  'Ha ha ha ha!',
  'Damn milenial!',
  'Take that, you fool!',
  'Feel the pain!',
  'You probably still use Notepad++...',
  'Your pull request is horrible.',
  'Your JIRA ticket sucks.',
  'Your Trello card is lame. Do you even Markdown bro?',
  'Ooooh snap!',
  'Get slapped, son!',
  'Your bloody hipster!',
  'Now go back to work!',
  'Go buy us some Ice Cream!',
  'Why don’t you go back to your desk and tail call yourself?',
  'Are you a priest? Your code is running on pure faith and no logic…',
  'Your code, just like C, has no class!'
];

function getRandomBanter() {
  var index = Math.floor(Math.random() * banterArray.length);
  return banterArray[index];
}

function validEmojiFormat(str) {
  const isEmojiRegex = /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/;
  if (str && typeof str === 'string' && !isEmojiRegex.test(str)) {
    if (str[0] !== ':') {
      str = `:${str}`;
    }
    if (str[str.length - 1] !== ':') {
      str = `${str}:`;
    }
    return str;
  }
  return str;
}

module.exports = {
  validEmojiFormat,
  getRandomBanter,
  banterArray
};
