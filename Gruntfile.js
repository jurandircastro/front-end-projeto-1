module.exports = function(grunt){

grunt.initConfig({
    wiredep: {
    task: {

        src: [
        'app/views/**/*.html',   // .html support...
        'app/views/**/*.jade',   // .jade support...
        'app/styles/main.scss',  // .scss & .sass support...
        'app/config.yml'         // and .yml & .yaml support out of the box!
        ],
        options: {
            
        }
    }
    }
});

grunt.loadNpmTasks('grunt-wiredep');

};
