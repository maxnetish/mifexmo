module.exports = function (grunt) {

    var publicJs = 'public/js';
    var publicCss = 'public/css';
    var publicFonts = 'public/fonts';
    var publicImages = 'public/images';
    var nodeModules = 'node_modules';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: [
            publicJs,
            publicCss,
            publicFonts,
            publicImages
        ],
        less: {
            build: {
                files: [
                    {
                        src: 'webapps/less/style.less',
                        dest: publicCss + '/app.css'
                    }
                ]
            },
            options: {
                // sourceMap: true
                // cleancss: true
            }
        },
        concat: {
            options: {
                separator: ';' + grunt.util.linefeed,
                sourceMap: true,
                sourceMapStyle: 'embed'
            },
            buildJs: {
                src: [
                        nodeModules + '/lodash/dist/lodash.js',
                        nodeModules + '/jquery/dist/jquery.js',
                        nodeModules + '/angular/angular.js',
                    'webapps/public/**/*.js'
                ],
                dest: publicJs + '/app.js'
            }
        },
        copy: {
            addFonts: {
                files: [
                    {
                        expand: true,
                        filter: 'isFile',
                        flatten: true,
                        src: nodeModules + '/bootstrap/dist/fonts/*',
                        dest: publicFonts + '/'
                    }
                ]
            },
            addBootstrapCss: {
                files: [
                    {
                        expand: true,
                        filter: 'isFile',
                        flatten: true,
                        src: nodeModules + '/bootstrap/dist/css/*',
                        dest: publicCss + '/'
                    }
                ]
            },
            addImages: {
                files: [
                    {
                        expand: true,
                        filter: 'isFile',
                        flatten: true,
                        src: 'webapps/images/*',
                        dest: publicImages + '/'
                    }
                ]
            }
        }
    });

    require('load-grunt-tasks')(grunt);
    grunt.registerTask('default', ['clean', 'less', 'copy', 'concat']);
};
