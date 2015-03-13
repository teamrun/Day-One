(function(){
    var tag = document.createElement('script');
    var env;
    try{
        if(process){
            env = 'atom';
            var tag = document.createElement('script');
            tag.innerHTML = "require('node-jsx').install();  require('./webapp/app')";

        }
    }
    catch(err){
        env = 'web';
        tag.src="./webapp/bundle.js"
    }
    console.log('env:', env);
    console.time('Confirmed env -> Load-done spend');
    document.body.appendChild(tag);
})();