const { JSDOM } = require('jsdom');

const jsdom = new JSDOM('<html><head></head><body><div id="app"></div></body></html>', {
  url: 'https://example.org/',
});

global.window = jsdom.window;
global.document = jsdom.window.document;
global.history = jsdom.window.History;
global.XMLHttpRequest = jsdom.window.XMLHttpRequest;
global.FormData = jsdom.window.FormData;