
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
                 $.get('https://software-tracker-mulamos.c9users.io/php/logout.php',{
                    user: cookie 
                 });
                 Cookies.remove('user',{path: '/pages/'},100);
                  Cookies.remove('role',{path: '/pages/'},100);
                  
    
                 window.location.href = 'https://software-tracker-mulamos.c9users.io/pages/login.html';
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

