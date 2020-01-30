lexer grammar mongo_importLexer;

COMMA
    : ','
    ;

MUDALINHA
    : '\n'
    ;

TUDO
    : ~["{}\\[\](),\n]+
    ;

WS
   : [\r\t] -> skip
;