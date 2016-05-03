(function(global) {

    // map tells the System loader where to look for things
    var map = {
        'js':                         'js', // 'dist',
        'rxjs':                       'scripts/rxjs',
        'angular2-in-memory-web-api': 'scripts/angular2-in-memory-web-api',
        '@angular':                   'scripts/@angular',
        'lodash':                     'scripts/lodash/lodash.js'
    };

    // packages tells the System loader how to load when no filename and/or no extension
    var packages = {
        'js':                         { main: 'main.js',  defaultExtension: 'js' },
        'rxjs':                       { defaultExtension: 'js' },
        'angular2-in-memory-web-api': { defaultExtension: 'js' },
        'lodash':                     { defaultExtension: 'js' }
    };

    var packageNames = [
        '@angular/common',
        '@angular/compiler',
        '@angular/core',
        '@angular/http',
        '@angular/platform-browser',
        '@angular/platform-browser-dynamic',
        '@angular/router',
        '@angular/testing',
        '@angular/upgrade'
    ];

    // add package entries for angular packages in the form '@angular/common': { main: 'index.js', defaultExtension: 'js' }
    packageNames.forEach(function(pkgName) {
        packages[pkgName] = { main: 'index.js', defaultExtension: 'js' };
    });

    var config = {
        map: map,
        packages: packages
    }

    // filterSystemConfig - index.html's chance to modify config before we register it.
    if (global.filterSystemConfig) { global.filterSystemConfig(config); }

    System.config(config);

})(this);