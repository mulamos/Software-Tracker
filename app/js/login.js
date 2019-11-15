/* global $ */
 window.role = '';
$('#btn').on('click', function(e){
        var value = $('#id-field').val();
     Cookies.set('user',value,{path: '/pages/'});
    // window.sessionStorage.setItem('result', 'true')
      let req = $.ajax({
              url: 'http://localhost:80/app/php/authentication.php',
              type: "post",
              data: {id: $('#id-field').val()},
              success: (response) => {
               var data = JSON.parse(response)
                console.log(data[0])
                if(data[0]['user_role'].includes('Intern')){
                    window.sessionStorage.setItem('result', 'true')
                }else{
                    window.sessionStorage.setItem('result', 'false') 
                    
                }
              }
            })
               

            // req.done((response) => {
            //   var data = JSON.parse(response)
            //   console.log(data[0])
            //   if(data[0]['user_role'].includes('Intern')){
            //         window.sessionStorage.setItem('result', 'true')
            //     }else{
            //         window.sessionStorage.setItem('result', 'false') 
                    
            //     }
          
        //   })
     
});

if(window.sessionStorage.getItem('result') == "true"){
     $('#user-link').remove();
}




