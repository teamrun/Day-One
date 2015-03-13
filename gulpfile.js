var gulp = require('gulp');
var gulpGen = require('start-kit').gulp;

var path = require('path');

gulpGen({
    less: {
        file: './assets/layout/layout.less',
        dest: './assets/layout',
        watch: ['./assets/layout/**/*.less', '!./assets/layout/layout.css']
    }
}, gulp);