var app = angular.module('myapp', []);
        app.controller('panelCtrl', function($scope, $http) {
            $http.get("../php/num_soft.php")
            .then(function (response) {
                $scope.objects = response.data;
                $scope.num_soft = $scope.objects;
        });
            $http.get("../php/num_installer.php")
            .then(function (response) {
                $scope.objects = response.data;
                $scope.num_installer = $scope.objects;
        });
        $http.get("../php/num_dept.php")
            .then(function (response) {
                $scope.objects = response.data;
                $scope.num_dept = $scope.objects;
        });
        $http.get("../php/num_license.php")
            .then(function (response) {
                $scope.objects = response.data;
                $scope.num_license = $scope.objects;
        });

////////////////////////////////////////////// Display Chart two on dashboard ////////////////////////////////////////////////       
        
        $scope.s_name = "Endnote";
        var init_data = "Endnote";
        var init_form_data = {'search_softName':init_data};
        $.post('../php/morris-area.php',init_form_data).done((data) => {
            var done_data = JSON.parse(data);
            // console.log(done_data);
        Morris.Bar({
                    element: 'morris-area-chart',
                    data: done_data,
                    xkey: 'Year',
                    ykeys: ['Value'],
                    labels: ['Label'],
                    pointSize: 2,
                    hideHover: 'auto',
                    resize: true,
                    parseTime: false
                });
        });
        
        $scope.search_sN = () =>{
        $('#morris-area-chart').empty();
        $scope.sN = $("#tags");
        if ($scope.sN.val() == "") {
            swal.fire("Please enter a software name to display graph",'','warning');
            return false;
        }
        else
        {
            $scope.sN = $scope.sN.val();
            var form_data = {'search_softName':$scope.sN};
                var target = document.getElementById('loader');
                var spinner = new Spinner().spin(target);
                $('#loader').show();
            
            var spinner = new Spinner().spin();
                target.appendChild(spinner.el);
              $.post('../php/morris-area.php',form_data).done((data) => {
                    $('#loader').hide();
                    var data = JSON.parse(data);
                    if (data.length == 0) {
                            swal.fire("No data found!",'','warning');
                        }
                     var bar_chart = Morris.Bar({
                    element: 'morris-area-chart',
                    data: data,
                    xkey: 'Year',
                    ykeys: ['Value'],
                    labels: ['Label'],
                    pointSize: 2,
                    hideHover: 'auto',
                    resize: true,
                    parseTime: false
                });
                // $('#sN_form')[0].reset();
                bar_chart.setData(data);
              });
          }
        };
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////// Display Chart three on dashboard ////////////////////////////////////////////////       
        
        $scope.d_name = "CARIMAC";
        var ini_data = "CARIMAC";
        var ini_form_data = {'search_deptName':ini_data};
        $.post('../php/morris-area-2.php',ini_form_data).done((data) => {
            var done_Data = JSON.parse(data);
            // console.log(done_Data);
        Morris.Bar({
                    element: 'morris-bar-chart',
                    data: done_Data,
                    xkey: 'Year',
                    ykeys: ['Value'],
                    labels: ['Label'],
                    pointSize: 2,
                    hideHover: 'auto',
                    resize: true,
                    parseTime: false,
                    barShape: 'soft'
                });
        });
        
        $scope.search_dN = () =>{
        $('#morris-bar-chart').empty();
        $scope.dN = $("#tags_d");
        if ($scope.dN.val() == "") {
            swal.fire("Please enter a department name to display graph",'','warning');
            return false;
        }
        else
        {
            $scope.dN = $scope.dN.val();
            var form_data = {'search_deptName':$scope.dN};
                var target = document.getElementById('loader-2');
                var spinner_2 = new Spinner().spin(target);
                $('#loader-2').show();
            
            var spinner_2 = new Spinner().spin();
                target.appendChild(spinner_2.el);
              $.post('../php/morris-area-2.php',form_data).done((data) => {
                    $('#loader-2').hide();
                    var data = JSON.parse(data);
                        if (data.length == 0) {
                            swal.fire("No data found!",'','warning');
                        }
                     var bar_chart = Morris.Bar({
                    element: 'morris-bar-chart',
                    data: data,
                    xkey: 'Year',
                    ykeys: ['Value'],
                    labels: ['Label'],
                    pointSize: 2,
                    hideHover: 'auto',
                    resize: true,
                    parseTime: false,
                    barShape: 'soft'
                });
                // $('#sN_form')[0].reset();
                bar_chart.setData(data);
              });
          }
        };
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    });


////////////////////////////////////////// Display Chart one (Donut Chart) on dashboard ////////////////////////////////////////
$.ajax({
    url: "../php/morris-donut.php",
    cache: false, 
    dataType: "json",
    timeout:3000,
    success : function (data) {
        // console.log(data);
        
        Morris.Donut({
        element: 'morris-donut-chart',
        data: data,
        resize: true
        });
    },
    error : function (xmlHttpRequest, textStatus, errorThrown) {
     console.log("Error " + errorThrown);
     if(textStatus==='timeout')
         console.log("request timed out");
    }
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////// Auto complete for Software name field of chart two on dash///////////////////////
$.ajax({
    url: "../php/auto-complete-sN.php",
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
     console.log("Error " + errorThrown);
     if(textStatus==='timeout')
         console.log("request timed out");
    }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////// Auto complete for Department name field of chart three on dash/////////////////
$.ajax({
    url: "../php/auto-complete-dep.php",
    cache: false, 
    dataType: "json",
    timeout:3000,
    success : function (data) {
        // console.log(data);
        
        var availableTags = data;
        $( "#tags_d" ).autocomplete({
          source: availableTags
        });
    },
    error : function (xmlHttpRequest, textStatus, errorThrown) {
     console.log("Error " + errorThrown);
     if(textStatus==='timeout')
         console.log("request timed out");
    }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////