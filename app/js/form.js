$.ajax({
    url: "http://localhost:80/app/php/auto-complete-dep.php",
    crossDomain:true,
    headers: {  'Access-Control-Allow-Origin': '*' },
    cache: false, 
    dataType: "json",
    timeout:3000,
    success : function (data) {
        // console.log(data);
        
        var availableTags = data;
        $( "#tags" ).autocomplete({
          source: availableTags
        });
    },
    error : function (xmlHttpRequest, textStatus, errorThrown) {
     alert("Error " + errorThrown);
     if(textStatus==='timeout')
         alert("request timed out");
    }
});

$.ajax({
    url: "http://localhost:80/app/php/auto-complete-sN.php",
    crossDomain:true,
    headers: {  'Access-Control-Allow-Origin': '*' },
    cache: false, 
    dataType: "json",
    timeout:3000,
    success : function (data) {
        // console.log(data);
        
        var availableTags1 = data;
        $( "#tags1" ).autocomplete({
          source: availableTags1
        });
    },
    error : function (xmlHttpRequest, textStatus, errorThrown) {
     alert("Error " + errorThrown);
     if(textStatus==='timeout')
         alert("request timed out");
    }
});

$.ajax({
    url: "http://localhost:80/app/php/auto-complete-iN.php",
    crossDomain:true,
    headers: {  'Access-Control-Allow-Origin': '*' },
    cache: false, 
    dataType: "json",
    timeout:3000,
    success : function (data) {
        // console.log(data);
        
        var availableTags2 = data;
        $( "#tags2" ).autocomplete({
          source: availableTags2
        });
    },
    error : function (xmlHttpRequest, textStatus, errorThrown) {
     alert("Error " + errorThrown);
     if(textStatus==='timeout')
         alert("request timed out");
    }
});