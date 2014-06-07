#!/usr/bin/env node
/*! pandoc-docx-header-num | (C) 2014 Mike Henderson <mvhenderson@tds.net> | License: MIT */
'use strict';

var filter = require('pandoc-filter');

var curr = 0;
var levels = [ null, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];

function action(type,value,format,meta) {
  if ((format === 'docx' || format === 'openxml') && type === 'Header') {
    var level = value[0];
    if (level < curr) {
      for (var i=level+1;i<levels.length;++i) {
        levels[i] = 0;
      }
    }
    levels[level] += 1;
    curr = level;

    value[2].unshift(filter.Space());
    value[2].unshift(filter.Str(levels.slice(1,level+1).join('.')));
    return {
      t: 'Header',
      c: value
    };
  }
}
filter.stdio(action);
