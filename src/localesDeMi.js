!function(a,b){"function"==typeof define&&define.amd?define(["../numeral"],b):b("object"==typeof module&&module.exports?require("../numeral"):a.numeral)}(this,function(a){a.register("locale","de",{delimiters:{thousands:" ",decimal:","},abbreviations:{thousand:"k",million:"m",billion:"b",trillion:"t"},ordinal:function(a){return"."},currency:{symbol:"€"}})});