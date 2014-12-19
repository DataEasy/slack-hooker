'use strict';

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        watch: {
            scripts: {
                files: ['lib/**/*.js', 'test/**/*.js', '*.js'],
                tasks: ['buster:test'],
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            files: ['lib/**/*.js', 'test/**/*.js', '*.js']
        },
        concurrent: {
            dev: {
                tasks: ['nodemon:dev', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },
        nodemon: {
            dev: {
                script: 'index.js',
                options: {
                    ignore: ['node_modules/**'],
                    env: {
                        NODE_ENV: 'DEV'
                    }
                }
            }
        },
        buster: {
            test: { }
        },
        '6to5': {
            dist: {
                files: {
                    'dist/app.js': 'src/app.js'
                }
            }
        }
    });

    grunt.registerTask('dev', ['jshint', 'buster:test', 'concurrent:dev']);
    grunt.registerTask('test', ['buster:test']);
    grunt.registerTask('default', ['dev']);
};
