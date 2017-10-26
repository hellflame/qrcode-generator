function hash(str){
    var result = 0
    for(var i=0;i<str.length;i++){

      console.log(33 * result + str.charCodeAt(i), (i > 0 ? str.charCodeAt(i-1): 66))

      result = 33 * result + str.charCodeAt(i) ^ (i > 0 ? str.charCodeAt(i-1): 66)
      
      console.log(result)
      console.log("======")
    }
console.log(Math.abs(result).toString(16))
}

//hash('hellflame')

function hash2(str){
    var result = 0, tab = [0x1234, 0x2345, 0x3456, 0x4567, 0x5678, 0x789a, 0x89ab, 0x9abc, 0xabcd, 0xbcde, 0xcdef];
    for(var i=0;i<str.length;i++){
      /* 移位操作发生截断 */
      result = 33 * result + str.charCodeAt(i) ^ (i > 0 ? str.charCodeAt(i-1): 66) + tab[i % tab.length];
    }
    return Math.abs(result).toString(16)
  }

console.log(hash2(''))
