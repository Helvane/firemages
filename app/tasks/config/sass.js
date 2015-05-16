/**
 * Created by king on 5/16/15.
 */

module.exports = function(grunt) {

    grunt.config.set('sass', {
        dev: {
            files: [{
                expand: true,
                cwd: 'assets/styles/',
                src: ['app.scss'],
                dest: '.tmp/public/styles/',
                dest: 'assets/styles/',
                ext: '.css'
            }]
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
};