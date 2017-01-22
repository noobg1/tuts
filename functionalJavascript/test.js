var duck = {
      quack: function() {
        console.log('quack')
      }
    }

    console.log(duck.hasOwnProperty('quack'));
    console.log(Object.prototype.hasOwnProperty.call(duck, 'quack'));