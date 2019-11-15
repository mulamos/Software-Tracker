<?php
use Ahc\Jwt\JWT;
require '../vendor/autoload.php';
require ('Database.php');


$url = "https://apps.mona.uwi.edu/wservice/authenticate.php";
class Authentication{
    //Method to validate users' login credential
    public function loginUser($id,$password){
    //     $id = htmlentities($id);
    //     $password = htmlentities($password);
    //     //UWI Authentication Process
    //      $curl = curl_init();

    //     curl_setopt_array($curl,array(
    //     CURLOPT_RETURNTRANSFER => 1,
    //     CURLOPT_URL => 'https://apps.mona.uwi.edu/wservice/authenticate.php',
    //     CURLOPT_POST => 1,
    //     CURLOPT_POSTFIELDS => array(
    //         idnumber => "$id",
    //         password => "$password"
    //     )
    // ));
    //  $response = curl_exec($curl);
    // if(strpos($response, '200')){
         //Checks if hased password matches plain text entered
         $conn = new DB();
        $returnedHash = $conn->userExist($id,$password);
        if(password_verify($password,$returnedHash)){
            return 1;
        }else{
            return 0;
        }
    // }else{
    //     curl_close($curl);
    // }

}   
    public function isLoggedIn(){
        if(!$_SESSION['auth']){
          header('HTTP/1.0 403 Forbidden');
          echo "You must be logged in to view this section";
          exit;
     }
    }
    
    public function setSession($id){
   
    try{
    $jwt = new JWT('secret', 'HS512', 3600, 10);
    $token = $jwt->encode([
        'user_id' => "$id",
        'role' => ['admin']
    ]); 
    $conn = new DB();
    $conn->commitSessionID($id,$token);
    return true;
        
    }catch(Exception $e){
     echo 'Wrong Token';
     return false;
    }
    
}
    public function logoutUser($id){
        $conn = new DB();
        $conn->deleteSessionID($id);
    }
    
}

