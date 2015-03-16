var randoms = {
    title: [
        'Embedded datastore for node.js',
        'A complete routing solution for React.js',
        'Developing User Interfaces With React',
        'Rethinking Web App Development at Facebook',
        'Secrets of the Virtual DOM',
    ],
    content: [
        '"In this talk I’ll be discussing why we built a virtual DOM, how it compares to other systems, and its relevance to the future of browser technologies." -- Pete Hunt',
        'Facebook engineers Bill Fisher and Jing Chen talk about Flux and React, and how using an application architecture with a unidirectional data flow cleans up a lot of their code.',
        'Most of the time, I simply find React to make me more productive with the work-a-day tasks of building a UI in the browser. Other times, when I\'m asked by fellow developers or designers if, and how, we could do some kind of crazy sounding thing, I find that React saw it coming.',
        'Immutable data unlocks powerful memoization techniques and prohibits accidental coupling via shared mutable state. It\'s no accident that these are the the same benefits provided by React.',
        'Netflix has rebuilt our mobile and web UIs. These UIs are hosted in the browser, and we\'ve seen big performance gains thanks to React\'s virtual DOM. But what if the DOM is just too slow on a given platform?'
    ],
    weather: ['sunny', 'rainy', 'cloudy', 'windy', 'snowy'],
    tag: ['ui', 'ue', 'webdev', 'interesting', 'movie']
}

// var 
function getRandom(key){
    var r = Math.random();
    r = r*5;
    var index = parseInt(r);
    return randoms[key][index];
}

function makeRandomBlog(){
    var blog = {};
    for(var i in randoms){
        blog[i] = getRandom(i);
    }
    console.log(blog)
    return blog;
}


module.exports = makeRandomBlog;