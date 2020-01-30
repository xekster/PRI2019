parser grammar mongo_importParser;

options{
    tokenVocab = mongo_importLexer;
}

user
    : exp (MUDALINHA exp)*
    ;

exp
    : TUDO COMMA TUDO
    ;