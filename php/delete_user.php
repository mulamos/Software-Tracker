<?php 
    include 'classes/Database.php';
    $id = htmlspecialchars($_GET['user_id']);
    $conn = new DB();
    $conn->deleteUser($id);
?>

