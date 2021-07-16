//Qiao Wang 20095140
function grilleJeu(n){
    this.n = n;
    this.fini = false;
    localStorage.erreur = 0;
    $("#erreur").text("0");
    
    
    var temps = parseInt($("#counter").text(),10) || 0;
    var seconde = setInterval(function () {
          $("#counter").text(temps++);
    }, 1000);
    
    this.initDraw();
    this.addRandomInt();
	this.update();
	
	
	$("#fin_btn").click(function(){
        terminer(erreur);
        clearInterval(seconde);
        $("#counter").text("0");
    })
}


/*
 * Afficher N/2 nombres aleatoires dans N/2 cellules aleatoires.
 */
grilleJeu.prototype.addRandomInt=function(){
    var n = this.n;
    var num_max = Math.floor(n/2);
    //Creation de N/2 positions aleatoires de 0 à N*N-1 dans un array
    var pos_arr = [];
    while(pos_arr.length < num_max){
        var r = Math.floor(Math.random() * (n*n));
        if(pos_arr.indexOf(r) === -1) pos_arr.push(r);
    }
    //Creation de N/2 nombre aleatoire de 1 à N dans un array
    var num_arr = [];
    while(num_arr.length < num_max){
        var r = Math.floor(Math.random() * n) + 1;
        if(num_arr.indexOf(r) === -1) num_arr.push(r);
    }
    
    //Mettre les N/2 nombres aleatoires dans des cellules aleatoires.
    for(var k = 0;k < num_max; k++){
        var cellid = "#cell-"+ pos_arr[k];
        $(cellid).val(num_arr[k]).addClass("readonly").attr("disabled", true);
    }
}
grilleJeu.prototype.update = function(){
    $('input').keyup(function(event){
        $(this).blur();
        var val = $(this).val();
        var pos = $(this).attr('class');
        checkconflit(val,pos);
    });
}
var checkconflit= function(val,pos){
    
   var r = "."+pos.split(" ")[0];
   var c = "."+pos.split(" ")[1];
   var verify_r = [];
   var verify_c = [];
   var pos_class = r+c;
   var pos_id = $(pos_class).attr("id");
   
   $(r).each(function(){
      verify_r.push($(this).attr("id"));
    })
    $(c).each(function(){
      verify_c.push($(this).attr("id"));
    })
    
    var error = verifie(verify_c).concat(verifie(verify_r));
    
    
    if(error.length < 2){
            $(error[0]).removeClass("error");
            $(pos_class).removeClass("current");
    }else{
        for(var i = 0; i< error.length; i++){
            if(error[i] != "#"+pos_id && (!$(error[i]).hasClass("error"))){
                $(error[i]).addClass("error");
                 localStorage.erreur = Number(localStorage.erreur) + 1;
                 $("#erreur").text(localStorage.erreur);
             }else{$(pos_class).addClass("current");
             }
        }
    }
}
function unique(value, index,self){
   return self.indexOf(value) === index; 
}
function verifie(verify){
    var i= verify.length;
    var j,value;
    var error_id = [];
    
    while(i--){
        value = $("#"+verify[i]).val();
        j = i;
        while(j--){
            if($("#"+verify[j]).val() === value && $("#"+verify[j]).val() > 0 ){
                error_id.push("#"+verify[i]);
                error_id.push("#"+verify[j]);
            }
        }
    }
    return error_id.filter(unique);
}


var terminer = function(){
    var cases = $(".error").length;
    document.getElementById("message").innerHTML= cases+" cases de conflit";
    
    
}    
grilleJeu.prototype.initDraw = function(){
    var n = this.n;
    $("#message").empty();
    var grille = $("#grille");
    var i,j ,k= 0;
    grille.empty();
    for (i =0; i < n;i++){
        var tr = $("<tr></tr>")
        for(j = 0;j <n;j++){
            var coordinate = "r-"+i+" c-"+j;
            var td = $("<td></td>");
            var inp = $("<input type='text'maxlength='1' />").attr("id","cell-"+k)
            .addClass(coordinate);
            k++;
            td.append(inp);
            tr.append(td);
        }
        grille.append(tr);
    }
}
$(document).ready(function(){
    var start = document.querySelector("#debut_btn");
    var submit = document.querySelector("#fin_btn");
    localStorage.clear();
    this.grilleJeu = new grilleJeu(4);
    $("#debut_btn").click(function(){
        localStorage.clear();
        var n = $('input[name="optradio"]:checked').val();
        this.grilleJeu = new grilleJeu(n);
        $("#debut_btn").text("Recommencer");
        return false;
    });
    
    
});
    