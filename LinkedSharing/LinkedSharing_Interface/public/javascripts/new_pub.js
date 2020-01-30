$(function () {
    var cont = 1
    var cont2 = 1
    $("#post").click(function(){      
        $(".form-post").toggle();
        $(".form-event").hide();                 
    });
    
    $("#event").click(function(){      
        $(".form-event").toggle();
        $(".form-post").hide();              
    });

    $("#mais1").click(e=>{
        e.preventDefault()
        cont++
        var ficheiro = $('<div></div>',{class: 'w3-container', id: 'f'+cont})
        var ficheiroLabel = $('<label>Files:</label>')
        var ficheiroInput = $('<input/>',{class: 'w3-input', type: 'file', name:"ficheiro"})
        $('#list').append(ficheiro)
        $("#f" + cont).append(ficheiroLabel,ficheiroInput)
    });

    $("#maiss1").click(e=>{
        e.preventDefault()
        cont2++
        var ficheiro = $('<div></div>',{class: 'w3-container', id: 'ff'+cont})
        var ficheiroLabel = $('<label>Files:</label>')
        var ficheiroInput = $('<input/>',{class: 'w3-input', type: 'file', name:"ficheiro"})
        $('#list1').append(ficheiro)
        $("#ff" + cont).append(ficheiroLabel,ficheiroInput)
    });
});


