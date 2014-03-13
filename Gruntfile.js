/*global module:false */

module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    meta: {
      banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today() %> */\n'
    },

    build: {
      dest: 'public'
    },

    jade: {
      compile: {
        options: {
          pretty: true,
          data: {
            debug: false,
            appcache: null,
            title: "Made by Digitas"
          }
        },
        files: [{
          expand: true,
          cwd: "app/views/",
          src: ["*.jade"],
          dest: "<%= build.dest %>/",
          ext: ".html"
        }, {
          expand: true,
          cwd: "app/views/common/",
          src: ["*.jade"],
          dest: "<%= build.dest %>/exported-blocks/",
          ext: ".html"
        }, {
          expand: true,
          cwd: "app/views/datas/",
          src: ["*.jade"],
          dest: "<%= build.dest %>/datas/",
          ext: ".html"
        }]
      }
    },

    less: {
      build: {
        options: {
          compress: false
        },
        files: {
          '<%= build.dest %>/stylesheets/app.css': 'app/assets/stylesheets/app.less'
        }
      }
    },

    jshint: {
      options: {
        predef: ['io'],
        devel: false,
        curly: true,
        eqeqeq: true,
        immed: false,
        latedef: true,
        newcap: false,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true,
        expr: true,
        globals: {
          Modernizr: true,
          jQuery: true,
          $: true
        }
      },
      files: ['package.json', 'Gruntfile.js', 'app/assets/javascripts/**/*.js']
    },

    concat: {
      head: {
        src: [
          'app/assets/vendor/modernizr/modernizr.js',
          'app/assets/javascripts/app.js'
        ],
        dest: '<%= build.dest %>/javascripts/libs/head.js'
      },
      vendor: {
        src: [
          'app/assets/vendor/jquery/jquery.js',
          'app/assets/vendor/bootstrap/js/transition.js',
          'app/assets/vendor/bootstrap/js/alert.js',
          'app/assets/vendor/bootstrap/js/button.js',
          'app/assets/vendor/bootstrap/js/carousel.js',
          'app/assets/vendor/bootstrap/js/collapse.js',
          'app/assets/vendor/bootstrap/js/dropdown.js',
          'app/assets/vendor/bootstrap/js/modal.js',
          'app/assets/vendor/bootstrap/js/tooltip.js',
          'app/assets/vendor/bootstrap/js/popover.js',
          'app/assets/vendor/bootstrap/js/scrollspy.js',
          'app/assets/vendor/bootstrap/js/tab.js',
          'app/assets/vendor/bootstrap/js/affix.js'
        ],
        dest: '<%= build.dest %>/javascripts/libs/vendor.js'
      },
      application: {
        options: {
          banner: '<%= meta.banner %>'
        },
        src: [
          // ---------------------
          // Your javascript files
          // ---------------------
          'app/assets/javascripts/app-plugin-sample.js'
        ],
        dest: '<%= build.dest %>/javascripts/app.js'
      }
    },

    uglify: {
      // options: {
      //   compress: true,
      //   beautify: false,
      //   preserveComments: false,
      //   banner: '<%= meta.banner %>',
      //   mangle: false
      // },
      head: {
        files: {
          '<%= build.dest %>/javascripts/libs/head.min.js': ['<%= concat.head.dest %>']
        }
      },
      vendor: {
        files: {
          '<%= build.dest %>/javascripts/libs/vendor.min.js': ['<%= concat.vendor.dest %>']
        }
      },
      application: {
        files: {
          '<%= build.dest %>/javascripts/app.min.js': ['<%= concat.application.dest %>']
        }
      }
    },

    cssmin: {
      compress: {
        files: {
          '<%= build.dest %>/stylesheets/app.min.css': '<%= build.dest %>/stylesheets/app.css'
        }
      }
    },

    usemin: {
      html: ['<%= build.dest %>/**/*.html'],
      css: ['<%= build.dest %>/stylesheets/**/*.css']
    },

    copy: {
      icons: {
        files: [{
          expand: true,
          cwd: "app/assets/ico/",
          src: ["favicon.png"],
          dest: "<%= build.dest %>"
        }]
      },
      humans: {
        files: [{
          expand: true,
          cwd: "app/assets/humans/",
          src: ["*.txt"],
          dest: "<%= build.dest %>"
        }]
      },
      robots: {
        files: [{
          expand: true,
          cwd: "app/assets/robots/",
          src: ["*.txt"],
          dest: "<%= build.dest %>"
        }]
      },
      images: {
        files: [{
          expand: true,
          cwd: "app/assets/images/",
          src: ["**/*"],
          dest: "<%= build.dest %>/images/"
        }]
      },
      fonts: {
        files: [{
          expand: true,
          cwd: "app/assets/fonts/",
          src: ["**/*"],
          dest: "<%= build.dest %>/fonts/"
        }]
      },
      flash: {
        files: [{
          expand: true,
          cwd: "app/assets/flash/",
          src: ["**/*"],
          dest: "<%= build.dest %>/flash/"
        }]
      },
      newsLetterHtml: {
        files: [{
          expand: true,
          cwd: "app/views/HTMLnewsletter/",
          src: ["**/*"],
          dest: "<%= build.dest %>/"
        }]
      },
      newsLetterImages: {
        files: [{
          expand: true,
          cwd: "app/views/HTMLnewsletter/images",
          src: ["**/*"],
          dest: "<%= build.dest %>/images/"
        }]
      }
    },

    watch: {
      application: {
        files: ['<%= jshint.files %>'],
        tasks: ['jshint', 'concat']
      },
      less: {
        files: ['app/assets/stylesheets/**/*.less'],
        tasks: ['less:build']
      },
      jade: {
        files: ['app/views/**/*.jade'],
        tasks: ['jade']
      },
      fonts: {
        files: ['app/assets/fonts/**/*'],
        tasks: ['copy:fonts']
      }
    },

    shell: {
      start: {
        command: ['node app/server.js'],
        options: {          
          stdout: true        
        }
      },
      prepare: {        
        command: [
          'BRANCH="gh-pages"',
          'mkdir <%= build.dest %>',
          'cd <%= build.dest %>',
          'git init',
          'git remote add origin <%= pkg.repository.url %>',
          'git checkout -b $BRANCH',
          'git pull origin $BRANCH',
          'rm -rf ./*'
        ].join(' && '),
        options: {          
          stdout: true        
        }
      },
      deploy: {        
        command: [
          'BRANCH="gh-pages"',
          "HASH=`git log --pretty=format:'%h - %s' -n 1`",
          'cd <%= build.dest %>',
          'git add -A .',
          'git commit -m "Deploy from $HASH"',
          'git push --force origin $BRANCH'
        ].join(' && '),
        options: {          
          stdout: true        
        }
      }
    },

    clean: {
      build: ['<%= build.dest %>']
    },

    notify: {
      build: {
        options: {
          title: 'Build Complete', // optional
          message: 'Less and concat finished running' //required
        }
      },
      deploy: {
        options: {
          title: 'Deploy Complete', // optional
          message: 'Build and Deploy tasks finished running' //required
        }
      },
      optimized: {
        options: {
          title: 'Optimized Build Complete', // optional
          message: 'Copy, Uglify and CSSmin finished running' //required
        }
      }
    },

    nodemon: {
      server: {
        options: {
          file: 'app/server.js',
          ignoredFiles: ['README.md', 'node_modules/**', 'assets/**'],
          watchedExtensions: ['js', 'json'],
          watchedFolders: ['app/']
        }
      }
    },

    concurrent: {
      start: {
        tasks: ['nodemon', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    },

    imagemin: {
      jpg:{
        options:{
          progressive: true
        },
        files:[{
          expand:true,
          cwd:"public/images/",
          src:["**/*.jpg"],
          dest:"public/images/",
          ext: ".jpg"
        }]
      },
      png: {
        options: {
          optimizationLevel: 2,
          pngquant: true
        },
        files: [{
          expand: true,
          cwd:"public/images/",
          src: ["**/*.png"],
          dest:"public/images/",
          ext: ".png"
        }]
      },
      gif: {
        files: [{
          expand: true,
          cwd:"public/images/",
          src: ["**/*.gif"],
          dest:"public/images/",
          ext: ".gif"
        }]
      }
    }

  });

  grunt.file.expand('./node_modules/grunt-*/tasks').forEach(grunt.loadTasks);

  grunt.registerTask('default', ['build']);

  grunt.registerTask('start', ['build', 'concurrent:start']);

  grunt.registerTask('build', ['jshint', 'clean:build', 'concat', 'less:build', 'copy', 'jade', 'notify:build']);

  grunt.registerTask('deploy', ['jshint', 'clean:build', 'shell:prepare', 'concat', 'less:build', 'copy', 'jade', 'uglify', 'cssmin', 'imagemin', 'shell:deploy', 'notify:deploy']);

  grunt.registerTask('release', ['build', 'uglify', 'cssmin', 'imagemin','notify:optimized']);

};
