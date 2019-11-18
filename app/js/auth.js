
// $('#forms')[0].onclick = (e) => {
//     if (Cookies.get('user') == undefined){
//         e.preventDefault();
//         Swal.fire({
//             title:'You are not allowed to to visit this section',
//             type: 'error'
//         })
//  }
// }

if(window.location.href.includes('forms') && Cookies.get('user') == undefined){
    window.location.href = 'http://localhost:80/app/pages/login.html';
}

if(window.location.href.includes('tables') && Cookies.get('user') == undefined){
    window.location.href = 'http://localhost:80/app/pages/login.html';
}

if(window.location.href.includes('users') && Cookies.get('user') == undefined){
    window.location.href = 'http://localhost:80/app/pages/login.html';
}


    
 
    