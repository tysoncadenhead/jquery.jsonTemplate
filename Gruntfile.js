module.exports = function (grunt) {

    grunt.initConfig({

        'uglify': {
            my_target: {
                files: {
                    'lib/jquery.jsonml.min.js': [
                        'src/jquery.jsonml.js'
                    ]
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', []);

};