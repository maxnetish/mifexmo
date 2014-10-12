module.exports = function (grunt) {

    var publicJs = 'public/js';
    var publicCss = 'public/css';
    var publicFonts = 'public/fonts';
    var publicImages = 'public/images';
    var nodeModules = 'node_modules';
    var nodeModulesSelect2 = nodeModules + '/select2';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: [
            publicJs,
            publicCss,
            publicFonts,
            publicImages
        ],
        browserify: {
            options: {
                browserifyOptions: {
                    debug: true
                }
            },
            'public/js/app.js': ['webapps/public/app.js']
        },
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
    grunt.registerTask('default', ['clean', 'browserify', 'less', 'copy']);
};
