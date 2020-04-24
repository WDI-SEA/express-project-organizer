let sentence = 'Hello, my, good,   friend,   !,'
let words = sentence.split(/,[ ]*/).filter(Boolean)
console.log(words)