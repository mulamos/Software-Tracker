<?php
require ('classes/Database.php');

$dept_name = htmlspecialchars($_POST['search_deptName']);

// $hash_pass = password_hash($pass,PASSWORD_BCRYPT);
$conn = new DB();

$conn->area_data_2($dept_name);
