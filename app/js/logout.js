
$("#logout-btn").click((e) => {
    e.preventDefault();
    window.sessionStorage.removeItem('result');
    let timerInterval;
        Swal.fire({
          title: 'Logging out...',
          timer: 2000,
          onBeforeOpen: () => {
            Swal.showLoading()
            timerInterval = setInterval(() =>{
                 $.get('https://localhost:80/app/php/logout.php',{
                    user: cookie 
                 });
                 Cookies.remove('user',{path: '/pages/'},100);
                  Cookies.remove('role',{path: '/pages/'},100);
                  
    
                 window.location.href = 'https://localhost:9000/pages/';
            });
          },
          onClose: () => {
            clearInterval(timerInterval);
          }
        }).then((result) => {
          if (
            // Read more about handling dismissals
            result.dismiss === Swal.DismissReason.timer
          ) {
           
          }
        });
    var cookie = Cookies.get('user');
   

});

