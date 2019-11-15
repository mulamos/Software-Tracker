<?php
require ('classes/Database.php');

$id = htmlspecialchars($_GET['id']);
$role = htmlspecialchars($_GET['role']);

echo $id. ' ' .$role;


// $hash_pass = password_hash($pass,PASSWORD_BCRYPT);
$conn = new DB();

$conn->addUser($id,$role);


   

