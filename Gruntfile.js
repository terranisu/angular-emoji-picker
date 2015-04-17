module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      temp: {
        src: ['tmp']
      }
    },

    html2js: {
      dist: {
        src: ['src/templates/**/*.html'],
        dest: 'tmp/templates.js'
      }
    },

    concat: {
      options: {
        separator: '\n'
      },
      dist: {
        src: [
          'tmp/templates.js',
          'src/js/*.js',
          'src/js/**/*.js'
        ],
        dest: 'dist/js/emoji-picker.js'
      }
    },

    copy: {
      dist: {
        files: [{
          expand: true,
          flatten: true,
          src: ['src/img/*'],
          dest: 'dist/img/',
          filter: 'isFile'
        }, {
          expand: true,
          flatten: true,
          src: ['src/css/emoji-picker.css'],
          dest: 'dist/css/',
          filter: 'isFile'
        }]
      }
    },

    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'dist/css',
          src: ['*.css', '!*.min.css'],
          dest: 'dist/css',
          ext: '.min.css'
        }]
      }
    },

    uglify: {
      build: {
        files: {
          'dist/js/emoji-picker.min.js': ['dist/js/emoji-picker.js']
        },
        options: {
          mangle: true // false: prevent changes to your variable and function names.
        }
      }
    },

    watch: {
      dev: {
        files: [
          'Gruntfile.js',
          'src/css/**/*.css',
          'src/js/**/*.js',
          'src/templates/**/*.html',
          'demo/**/*'
        ],
        tasks: ['install'],
        options: {
          atBegin: true,
          livereload: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-html2js');

  grunt.registerTask('install', [
    'html2js',
    'concat',
    'copy',
    'cssmin',
    'uglify',
    'clean'
  ]);

  grunt.registerTask('default', ['install']);
};
