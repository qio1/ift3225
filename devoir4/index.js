//Par Qiao Wang 20095140
var tfidf_data,idf_data;
var tfidfUrl ="http://www-ens.iro.umontreal.ca/~wangqiao/ift3225/tp4/indexation.json";
var idfUrl = "http://www-ens.iro.umontreal.ca/~wangqiao/ift3225/tp4/idf.json";
$.getJSON(tfidfUrl,function(data){
		tfidf_data = data;
		console.log("tfidf success...\n"+tfidf_data);
});
$.getJSON(idfUrl,function(data){
		idf_data = data;
		console.log("idf success...\n"+idf_data);
});

//-------------------------------------
//         Mesure Cosinus
//-------------------------------------
function dotProduct(v1, v2){
    var result = 0;
    for (var i =0; i < v1.length; i++){
        result += v1[i]*v2[i];
    }
    console.log("dot: "+result);
    return result;
}
function norme(v1,v2){
    var result1 = 0;
    var result2 = 0;
    for (var i =0; i < v1.length; i++){
        result1 += v1[i]*v1[i];
        result2 += v2[i]*v2[i];
    }
     console.log("norme: "+result1+" "+result2);
    return Math.sqrt(result1)*Math.sqrt(result2);
}   
function cosSim(query_v,doc_v){
    return dotProduct(query_v,doc_v)/norme(query_v,doc_v);
}
//-------------------------------------
//        Sort similarités
//-------------------------------------
//code recuperer de https://stackoverflow.com/questions/25500316/sort-a-dictionary-by-value-in-javascript
function sort(dict){
   var items = Object.keys(dict).map(function(key){
       return[key,dict[key]];
   });
   items.sort(function(first,second){
       return second[1] -first[1];
   })
   return items;
}
//-------------------------------------
//            Affichage
//-------------------------------------
function affiche(sim_vec){
    $("#resultat").html("<div></div>");
    for(var k = 0; k < sim_vec.length;k++){
        if(sim_vec[k][1]){
            var doc_num = "document_"+sim_vec[k][0]+".txt";
            var similarite = sim_vec[k][1];
            var doc_href = "<div><a class=\"text-white\" href="+doc_num+">"+doc_num+" similarité cosinus: "+similarite+"</a></div>";
            $("#resultat").append(doc_href);
          }
    }
}
//-------------------------------------
//               Main
//-------------------------------------
function main(){
    var objs = tfidf_data;
    var obj_idf = idf_data;
    var query = $("#query").val().trim();
    console.log("input: "+query);
    if( 0 === query.length){ //si l'entree est null, fait rien
        return;
    }
    var query_v = [];
    var matche = [];
    var rank = {};
    var queryList = query.toLowerCase().split(" ");
    console.log(queryList);
    
    for(var q in queryList){
        for(var keys in obj_idf){
            if (queryList[q].startsWith(keys)){//trouver les matches
                query_v.push(obj_idf[keys]*1/queryList.length); //idf * tf des querys
                matche.push(keys);//les mots matches de querys
                
            }
        }
    }
    console.log(query_v);
    
    for (var doc in objs){
        var doc_v = [];
        for(var mot in matche){
            doc_v.push(objs[doc][matche[mot]]);
        }
        console.log("doc"+doc+": "+doc_v);
        var sim = cosSim(query_v,doc_v);
        size = Object.keys(rank).length+1;
        rank[size] = sim;
    }
    //rank = {1:sim1, 2:sim2,...}
    var sorted = sort(rank);
    affiche(sorted);
}
