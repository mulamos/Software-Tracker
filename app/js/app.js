/* global moment */
/* global $ */
/* global angular */
/* global dTable */

var app = angular.module("myApp",[]);

app.controller("controller", ($scope,$http) => {
    
    var target = document.getElementById('loader');
    var spinner = new Spinner().spin(target);
    $('#loader').show();
    
    var spinner = new Spinner().spin();
    target.appendChild(spinner.el);
                
$http.get('http://localhost/app/php/retrieve_data.php')
  .then((response) => {
   $scope.objects = response.data;
  $scope.showTable = () => {
      $('#loader').hide();
      var content;
      for (var i = 0; i < $scope.objects.length; i++){
          content +=`
          <tr class="odd gradeX">
            <td>${$scope.objects[i].ID_Number}</td>
            <td>${$scope.objects[i].First_Name} ${$scope.objects[i].Last_Name}</td>
            <td>${$scope.objects[i].Department}</td>
            <td>${$scope.objects[i].Software_Name}</td>
            <td>${$scope.objects[i].No_Of_License}</td>
            <td>${$scope.objects[i].Software_Version}</td>
            <td>${$scope.objects[i].OS_Type}</td>
            <td>None</td>
            <td>${$scope.objects[i].Installer_Name}</td>
            <td>${moment($scope.objects[i].Date_DD_MM_YYYY).calendar()}</td>
        </tr>
        `;
      }
        $('#software-data').html(content);
        
        
             dTable = $('#software-table');
             dTable.DataTable({
                responsive: true,
                dom: 'Bfrtip',
                buttons: [
                    'copy', 'csv', 'excel', 
                    {
                        extend:'pdf',
                        title : function() {
                            return "Software Tracker Table";
                        },
                        orientation : 'landscape',
                        pageSize : 'LEGAL',
                        text : '<i class="fa fa-file-pdf-o"> PDF</i>',
                        titleAttr : 'PDF'
                    }
                    ,'print'
                ],
                destroy: true,
                select: true
            });
    };
    
 $('#loader').show();
 $http.get('http://localhost:80/app/php/retrieve_users.php')
 .then((response) => {
     $('#loader').hide();
     $scope.persons = response.data;
    //  console.log(response.data);
 });
    
    $scope.showUsers = () => {
    return;
    };
    
    // function deleteUser(){
    // $scope.removePerson = (index,row_id) =>{
    //             $scope.persons.splice(index,1);
    //             $http({
    //                 url: 'http://localhost:80/app/php/delete_user.php', 
    //                 method: "GET",
    //                 params: {user_id: row_id}
    //             });    
    //         };// deleting user when user clicks delete
    // }
    
    $scope.addUser = () => {

        $scope.userId =[];
        $scope.persons.forEach((person)=>{
            $scope.userId.push(person['user_id'])
        })
        
        if($scope.userId.includes($('#idNumber').val())){
            swal.fire('Duplicate User','ID already exist in the database','error')
            
        }else{
             $http({
                url: 'http://localhost:80/app/php/add_user.php', 
                method: "GET",
                headers:"'Access-Control-Allow-Origin': '*'"
                // params: { 
                //     id: $('#idNumber').val(),
                //     role: $('#user_role').val().slice(7)
                // }
        
        });
            swal.fire('User Added Successfully','','success');
            $scope.persons.push({'user_id':$('#idNumber').val(), 'user_role':$('#user_role').val().slice(7)});
        }
       
    };
    
    
    $scope.removePerson = (index,row_id) =>{
        $scope.persons.splice($scope.persons.indexOf(row_id));
        $http({
            url: 'http://localhost:80/app/php/delete_user.php', 
            method: "GET",
            headers: {  'Access-Control-Allow-Origin': '*' },
            params: {user_id: row_id}
        });    
        
        var index = $scope.userId.indexOf(row_id);
        
        if (index > -1){
            $scope.userId.splice(index,1)
        }
                    
    }
     

    $scope.deleteUser = (index,row_id) => {
        Swal.fire({
          title: 'Are you sure?',
          text: "You are about to delete a user, You won't be able to revert this!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete User!',
        }).then((result) => {
            if(result.value){
            Swal.fire(
              'Deleted!',
              'User has been deleted.',
              'success'
            );
            $scope.removePerson(index,row_id)
        }else if(result.dismiss === Swal.DismissReason.cancel){
             Swal.fire(
                'Cancelled',
                'User was not deleted',
                'error'
                );
         }
        })
    }  
        
    
    $scope.showAdduser = () => {
        'Adding users...';
    };
    $scope.roles = {
        'admin': 'Administrator',
        'intern': 'Intern'
    };
  
 
  });
  
});



