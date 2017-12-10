// const safeEval = require('safe-eval')

const Sandbox = require('sandbox');
const q = require('Q');
const Promise = require('promise');


const sandboxQExecutor = {
  execute: function(code) {
    var deferred = q.defer()

    var s = new Sandbox();
    s.run(code, function(output) {
      console.log(output);
      deferred.resolve(output);
    });

    return deferred.promise;
  }
};

const sandboxPromiseExecutor = {
  execute: function(code) {
    var deferred = q.defer()

    var s = new Sandbox();
    s.run(code, function(output) {
      console.log(output);
      deferred.resolve(output);
    });

    return deferred.promise;
  }
};


var executor = {
  test0: function(code) {
    //safe eval
    console.log("sdf");
    var evaluated = safeEval(code);
    console.log(evaluated);
  },



  executeAsync: async function(code) {
    console.log('dddddddddddddd');
    return await sandboxQExecutor.execute(code);
  },

  executeGenerator: function*(code) {
    console.log('dddddddddddddd');
    const R = yield sandboxQExecutor.execute(code);
    return R;
  },

  executeWithPromise: async function(code) {
     console.log('executeWithPromise');
    var promise = new Promise((resolve, reject) => {
      var s = new Sandbox();
      s.run(code, function(output) {
        console.log(output);
         resolve(output);
      });
    });

    // promise.then(function(r){
    //   return r;
    // });

    promise.then((r) =>{
      return r;
    })


    return promise;

  },

};
module.exports = executor;
