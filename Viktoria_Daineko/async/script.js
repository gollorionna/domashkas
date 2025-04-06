function hello(){
    console.log('Hello world');
    
}

let intervalId = setInterval(hello, 1000);


setTimeout(() => {
    clearInterval(intervalId)
}, 5000)

