/*
1. Create a new promise. The function passed to the promise should:

After 1 second, call Math.random()
If the result of Math.random() is > 0.5, call resolve()
If the result of Math.random() is <= 0.5, call reject()
2. If the promise is resolved, should console.log('success')

3. If the promise is rejected, should console.log('fail')

4. In either case, should console.log('complete')
*/
let myPromise = new Promise(function(resolve, reject) {
  setTimeout(function() {
    let result = Math.random();
    if (result > 0.5) {
      resolve(result);
    } else { reject(result); }
  }, 1000);
});

myPromise.then(
  function(value) { console.log(`Success: ${value}`); },
  function(value) { console.log(`Fail: ${value}`); }
);



