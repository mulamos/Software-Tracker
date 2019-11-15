<?php 
    include 'classes/Database.php';
    
/////////////////////////////Recieve software name from javascript to pass to php
    $soft_name = htmlspecialchars($_POST['search_softName']);
    
    $conn = new DB();
    
////////////////////////////Passing software name to php
    $conn->area_data($soft_name);
?>