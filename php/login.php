<?php 
include 'classes/Auth.php';
session_start();
$id = $_POST["idNumber"];
$password = $_POST["password"];
$remember = $_POST["remember"];
$auth = new Authentication();

//Authnetication instance to validate user
$chk = $auth->loginUser($id,$password);
if($chk == 0){
    // header('HTTP/1.0 403 Forbidden');
    // echo "You must enter a valid login ID and password to access this resource\n";
    // $res = "false";
    // echo json_encode($res);
    header("Location: http://localhost:9000/pages/login_fail.html");
    // exit;
    
}else{
    $auth->setSession($id);
    header("Location: http://localhost:9000/pages/");
}