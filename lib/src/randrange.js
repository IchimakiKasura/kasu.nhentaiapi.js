module.exports = function randrange(int) {
  if (typeof (int) != 'number') {
    throw 'input value is not an integer!'
  }
  return Math.floor(Math.random() * int) + 1
}