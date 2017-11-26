// Generated on 2015-04-23 using
// generator-webapp 0.5.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// If you want to recursively match all subfolders, use:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Configurable paths
  var config = {
    dev: 'dev',
    mid: 'integration',
    dist: 'dist'
  };

  grunt.registerMultiTask('create','Create a new html from template',function(){

    var options = this.options({
      compact: true
    });

    var htmlTemplatePath = config.dev + '/_template.html.tpl';
    var jsTemplatePath = config.dev + '/js/_template.js.tpl';
    var blockName = grunt.option('name');
    var replacedName = blockName.replace(/-/g,'_');

    if(typeof blockName === 'undefined') {
      grunt.log.warn('Please specify a block name (e.g. grunt create --name=user_defined_name)');
      return;
    }

    if(grunt.file.exists(htmlTemplatePath)){

      var template = grunt.file.read(htmlTemplatePath).replace(/#\{\{block_name\}\}#/g,blockName);
      var targetHtml = config.dev + '/' + blockName + '.html';

      if(grunt.file.exists(targetHtml)){
        grunt.log.warn('We already have a html of the same name.');
      }else {
        grunt.file.write(targetHtml,template);
      }

    }else {
      grunt.log.warn('Template file _template.html.tpl not found!');
    }

    if(grunt.file.exists(jsTemplatePath)){

      var template = grunt.file.read(jsTemplatePath).replace(/#\{\{block_name\}\}#/g,blockName).replace(/#\{\{replaced_name\}\}#/g,replacedName).replace(/#\{\{created_time\}\}#/g, new Date().toGMTString()).replace(/#\{\{last_modified\}\}#/g, new Date().toGMTString());

      var targetJs = config.dev + '/js/' + blockName + '.js';

      if(grunt.file.exists(targetJs)){
        grunt.log.warn('We already have a js of the same name.');
      }else {
        grunt.file.write(targetJs,template);
      }

    }else {
      grunt.log.warn('Template file _template.js.tpl not found!');
    }

    if(options.compact) {

      var scssTemplatePath = config.dev + '/styles/sass/_compact.scss.tpl';

      if(grunt.file.exists(scssTemplatePath)){

        var template = grunt.file.read(scssTemplatePath).concat('\n.' + blockName + ' {\n  //TO DO\n}');

        var targetScss = config.dev + '/styles/sass/' + blockName + '.scss';

        if(grunt.file.exists(targetScss)){
          grunt.log.warn('We already have a scss file of the same name.');
        }else {
          grunt.file.write(targetScss,template);
        }

      }else {
        grunt.log.warn('Template file _compact.scss.tpl not found!');
      }

    }

  });

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    config: config,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= config.dev %>/{,*/}*.html',
          '<%= config.dev %>/styles/{,*/}*.css',
          '<%= config.dev %>/products/{,*/}*'
        ]
      },
      scripts: {
        files: '<%= config.dev %>/scripts/{,*/}*.js',
        tasks: ['concat:dist']
      }
    },

    create: {
      compact: {
        options: {
          compact: true
        }
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        open: true,
        livereload: 35729,
        // Change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function(connect) {
            return [
              connect.static('.tmp'),
              connect().use('/bower_components', connect.static('./bower_components')),
              connect.static(config.dev)
            ];
          }
        }
      },
      test: {
        options: {
          open: true,
          port: 9001,
          livereload: false,
          base: '<%= config.mid %>',
          hostname: 'localhost',
          keepalive: true
        }
      },
      dist: {
        options: {
          base: '<%= config.dist %>',
          livereload: false
        }
      }
    },

    // Empties folders to start fresh
    clean: {
      mid: {
        files: [{
          dot: true,
          src: [
            '<%= config.mid %>/*',
            '!<%= config.mid %>/.git*'
          ]
        }]
      },
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= config.dist %>/*',
            '!<%= config.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },

    compass: {
      clean: {
        options: {
          clean: true
        }
      },
      dev: {
        //using an external configuration file
        //also you can override some variables
        options: {
          config: 'config.rb',
          sourcemap: true,
          outputStyle: 'expanded'
        }
      },
      dist: {
        //using an external configuration file
        //also you can override some variables
        options: {
          config: 'config.dist.rb',
          sourcemap: false,
          outputStyle: 'compressed'
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= config.dev %>/js/{,*/}*.js',
        '!<%= config.dev %>/js/vendor/*',
        'test/spec/{,*/}*.js'
      ]
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }, {
          expand: true,
          cwd: '<%= config.dev %>',
          src: 'styles/{,*/}*.css',
          dest: '<%= config.dist %>'
        }]
      }
    },

    // Automatically inject Bower components into the HTML file
    wiredep: {
      app: {
        ignorePath: /^\/|\.\.\//,
        src: ['<%= config.dev %>/index.html'],
        exclude: ['bower_components/bootstrap/dist/js/bootstrap.js']
      }
    },

    filerev: {
      options: {
        algorithm: 'md5',
        length: 8
      },
      dist: {
        src: [
          '<%= config.dist %>/js/{,*/}*.js',
          '<%= config.dist %>/styles/{,*/}*.css',
          '<%= config.dist %>/products/{,*/,**/}*.{png,jpg,jpeg,gif,webp,svg}',
          '<%= config.dist %>/styles/fonts/{,*/}*.*',
          '<%= config.dist %>/*.{ico,png}'
        ]
      }
    },

    // The following *-min tasks produce minified files in the dist folder
    imagemin: {
      mid: {
        files: [{
          expand: true,
          cwd: '<%= config.dev %>/products',
          src: '{,*/,**/}*.{gif,jpeg,jpg,png}',
          dest: '<%= config.mid %>/products'
        }]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.dev %>/products',
          src: '{,*/,**/}*.{gif,jpeg,jpg,png}',
          dest: '<%= config.dist %>/products'
        }]
      }
    },

    svgmin: {
      mid: {
        files: [{
          expand: true,
          cwd: '<%= config.dev %>/products',
          src: '{,*/}*.svg',
          dest: '<%= config.mid %>/products'
        }]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.dev %>/products',
          src: '{,*/}*.svg',
          dest: '<%= config.dist %>/products'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          conservativeCollapse: true,
          removeAttributeQuotes: true,
          removeCommentsFromCDATA: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true,
          removeRedundantAttributes: true,
          useShortDoctype: true
        },
        files: [{
          expand: true,
          cwd: '<%= config.dist %>',
          src: '{,*/}*.html',
          dest: '<%= config.dist %>'
        }]
      }
    },


    
    concat: {
      options: {separator: ';'},
      dist : {
        src : ['<%= config.dev %>/js/vendor/jquery.js',
              '<%= config.dev %>/js/vendor/jquery.mobile.custom.min.js',
              '<%= config.dev %>/js/vendor/bootstrap.js',
              '<%= config.dev %>/js/plugins/underscore.js'
              ],
        dest : '<%= config.dev %>/js/global.js'
      }
    },

    uglify: {
      mid: {
        files: [{
          expand: true,
          cwd: '<%= config.dev %>/js',
          src: '**/*.js',
          dest: '<%= config.mid %>/js'
        }]
      },
      dist : {
        files : [{
          src:'<%= config.dev %>/js/global.js',
          dest : '<%= config.mid %>/js/global.min.js' 
        }]
      }
    },

    cssmin : {
      css : {
        src : '<%= config.dev %>/styles/base.css',
        dest : '<%= config.mid %>/styles/base.min.css'
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      bower: {
        files: [{
          '<%= config.dev %>/js/vendor/bootstrap.js':'bower_components/bootstrap/dist/js/bootstrap.js',
          '<%= config.dev %>/js/vendor/jquery.js':'bower_components/jquery/dist/jquery.js'
        },
        {
          '<%= config.dev %>/js/plugins/underscore.js':'bower_components/underscore/underscore.js',
          '<%= config.dev %>/js/plugins/jquery.lazyload.js':'bower_components/jquery.lazyload/jquery.lazyload.js',
          '<%= config.dev %>/js/plugins/swiper.jquery.min.js':'bower_components/Swiper/dist/js/swiper.jquery.min.js',
          '<%= config.dev %>/styles/plugins/swiper.min.css':'bower_components/Swiper/dist/css/swiper.min.css',
          '<%= config.dev %>/js/plugins/jquery.ui.touch-punch.js':'bower_components/jquery-ui-touch-punch/jquery.ui.touch-punch.js'
        }],
      },
      
      dist: {
        files: [
        {
          src: 'node_modules/apache-server-configs/dist/.htaccess',
          dest: '<%= config.dist %>/.htaccess'
        }]
      }
    },

    // Run some tasks in parallel to speed up build process
    concurrent: {
      mid: [
        'copy:mid'
      ],
      dist: [
        'imagemin',
        'svgmin'
      ]
    }
  });


  grunt.registerTask('start', 'start the server and preview your app, --allow-remote for remote access', function (target) {
    if (grunt.option('allow-remote')) {
      grunt.config.set('connect.options.hostname', '0.0.0.0');
    }
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'autoprefixer',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run([target ? ('start:' + target) : 'start']);
  });

  grunt.registerTask('test', function (target) {
    if (target !== 'watch') {
      grunt.task.run([
        'clean:server',
        'autoprefixer'
      ]);
    }

    grunt.task.run([
      'connect:test'
    ]);
  });

  grunt.registerTask('build', [
    'clean:mid',
    'compass:clean',
    'compass:dist',
    'concurrent:mid',
    'copy:midBuild',
    'concat',
    'cssmin',
    'uglify'
  ]);

  grunt.registerTask('pingping',[
    'concat',
    'uglify:dist',
    'cssmin'
  ]);

  grunt.registerTask('default', [
    'test',
    'build'
  ]);

  grunt.registerTask('copybower',[
    'copy:bower'
  ]);
};
