<?php

class DB {
     private $host = "us-cdbr-iron-east-01.cleardb.net";
     private $user = "bbb4d56dd55010";
     private $pass = "dff94c8c";
     private $db = "heroku_5fd5d61803a08c2";
     
     
     //Connect database
public function __construct(){
    try{
        $conn = new PDO("mysql:host=$this->host;dbname=$this->db",$this->user,$this->pass);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }catch(PDOException $e){
        //Catches connection and output it if database connection failed
      echo 'Connection failed'. $e->getMessage();
    }
  }
  
public function connect(){
    return $conn = new PDO("mysql:host=$this->host;dbname=$this->db",$this->user,$this->pass);
}
  
 
//Insert data method 
 public function insertData($id,$fname,$lname,$dept,$s_name,$num_license,$s_version,$os,$installer,$date){
     $conn = new PDO("mysql:host=$this->host;dbname=$this->db",$this->user,$this->pass);
      $stmt = $conn->prepare("INSERT INTO software_details (
      ID_Number, 
      First_Name, 
      Last_Name, 
      Department, 
      Software_Name, 
      No_Of_License, 
      Software_Version, 
      OS_Type, 
      Installer_Name, 
      Date_DD_MM_YYYY)
      
      VALUES ('$id','$fname','$lname','$dept','$s_name','$num_license','$s_version','$os','$installer','$date')");
                
        $stmt->execute();
      
  }
  
  public function auto_complete_iN(){
      $conn = new PDO("mysql:host=$this->host;dbname=$this->db",$this->user,$this->pass);
     $row = $conn->prepare("SELECT DISTINCT Installer_Name as list FROM software_details ORDER BY Installer_Name ASC;");
      $row->execute();
      
      $json_data = array();
      foreach($row as $rec)  
      {  
        $json_array=$rec['list'];  
        array_push($json_data,$json_array);  
      }
      echo json_encode($json_data);
  }
  
  public function auto_complete_dept(){
      $conn = new PDO("mysql:host=$this->host;dbname=$this->db",$this->user,$this->pass);
     $row = $conn->prepare("SELECT DISTINCT Department as dep FROM software_details ORDER BY Department ASC;");
      $row->execute();
      
      $json_data = array();
      foreach($row as $rec)  
      {  
        $json_array=$rec['dep'];  
        array_push($json_data,$json_array);  
      }
      echo json_encode($json_data);
  }
  
  public function auto_complete_sN(){
      $conn = new PDO("mysql:host=$this->host;dbname=$this->db",$this->user,$this->pass);
     $row = $conn->prepare("SELECT DISTINCT Software_Name as sN FROM software_details ORDER BY Software_Name ASC;");
      $row->execute();
      
      $json_data = array();
      foreach($row as $rec)  
      {  
        $json_array=$rec['sN'];  
        array_push($json_data,$json_array);  
      }
      echo json_encode($json_data);
  }
  
  public function area_data_2($dept_name){
      $conn = new PDO("mysql:host=$this->host;dbname=$this->db",$this->user,$this->pass);
      $row = $conn->prepare("SELECT Department, YEAR(Date_DD_MM_YYYY), 
                            COUNT(YEAR(Date_DD_MM_YYYY)) as count FROM software_details 
                            WHERE YEAR(Date_DD_MM_YYYY)>2013 AND Department = '$dept_name' 
                            GROUP BY YEAR(Date_DD_MM_YYYY);");
      $row->execute();
      $json_data = array();
      foreach($row as $rec)  
      {  
        $json_array['Label']=$rec['Department'];  
        $json_array['Year']=$rec['YEAR(Date_DD_MM_YYYY)'];
        $json_array['Value']=$rec['count'];
        array_push($json_data,$json_array);  
      }
      $data = json_encode($json_data);
      
      echo $data;
      
  }
  
  public function area_data($soft_name){
      $conn = new PDO("mysql:host=$this->host;dbname=$this->db",$this->user,$this->pass);
      $row = $conn->prepare("SELECT Software_Name, YEAR(Date_DD_MM_YYYY), 
                            COUNT(YEAR(Date_DD_MM_YYYY)) as count FROM software_details 
                            WHERE YEAR(Date_DD_MM_YYYY)>2013 AND Software_Name = '$soft_name' 
                            GROUP BY YEAR(Date_DD_MM_YYYY);");
      $row->execute();
      $json_data = array();
      foreach($row as $rec)  
      {  
        $json_array['Label']=$rec['Software_Name'];  
        $json_array['Year']=$rec['YEAR(Date_DD_MM_YYYY)'];
        $json_array['Value']=$rec['count'];
        array_push($json_data,$json_array);  
      }
      $data = json_encode($json_data);
      
      echo $data;
      
  }
  
  public function donut_data(){
      $conn = new PDO("mysql:host=$this->host;dbname=$this->db",$this->user,$this->pass);
     $row = $conn->prepare("SELECT Software_Name, 
                            COUNT(Software_Name) AS count FROM software_details 
                            GROUP BY Software_Name 
                            ORDER BY count 
                            DESC limit 5;");
      $row->execute();
      $json_data = array();
      foreach($row as $rec)  
      {  
        $json_array['label']=$rec['Software_Name'];  
        $json_array['value']=$rec['count'];  
        array_push($json_data,$json_array);  
      }
      echo json_encode($json_data);
  }
  
  public function num_of_license(){
      $conn = new PDO("mysql:host=$this->host;dbname=$this->db",$this->user,$this->pass);
      $stmt = $conn->prepare("SELECT SUM(No_Of_License) as sum FROM software_details;");
      $stmt->execute();
      $result = $stmt->fetch(PDO::FETCH_ASSOC);
      $data = json_encode($result);
      echo $result['sum'];
  }
  
  public function num_of_dept(){
      $conn = new PDO("mysql:host=$this->host;dbname=$this->db",$this->user,$this->pass);
      $stmt = $conn->prepare("SELECT COUNT(DISTINCT Department) as count FROM software_details;");
      $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        $data = json_encode($result);
        echo $result['count'];
  }
  
  public function num_of_installer(){
      $conn = new PDO("mysql:host=$this->host;dbname=$this->db",$this->user,$this->pass);
      $stmt = $conn->prepare("SELECT COUNT(DISTINCT Installer_Name) as count_of_ins FROM software_details;");
      $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        $data = json_encode($result);
        echo $result['count_of_ins'];
  }
  
  public function num_of_software(){
      $conn = new PDO("mysql:host=$this->host;dbname=$this->db",$this->user,$this->pass);
      $stmt = $conn->prepare("Select COUNT(*) as count_of_soft from software_details;");
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        $data = json_encode($result);
        echo $result['count_of_soft'];
  }
  
  public function retrieveData(){
        $conn = new PDO("mysql:host=$this->host;dbname=$this->db",$this->user,$this->pass);
        $stmt = $conn->prepare("Select * from software_details");
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $data = json_encode($result);
        echo $data;
  }
  
  public function retrieveUsers(){
            $conn = new PDO("mysql:host=$this->host;dbname=$this->db",$this->user,$this->pass);
  
        $stmt = $conn->prepare("Select * from users");
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $data = json_encode($result);
        echo $data;
  }
  
  public function deleteUser($id){
       $conn = new PDO("mysql:host=$this->host;dbname=$this->db",$this->user,$this->pass);
        $sql = $conn->prepare("DELETE FROM users 
                               WHERE user_id='$id'");
        $sql->execute();
  }
  
  public function userExist($id,$password){
        $conn = new PDO("mysql:host=$this->host;dbname=$this->db",$this->user,$this->pass);
        $sql = $conn->prepare("SELECT user_password FROM users 
                              WHERE user_id='$id'");
        $sql->execute();
        $result = $sql->fetchAll(PDO::FETCH_ASSOC);
        $hash = $result[0]['user_password'];
        
        return $hash;
  }
 
  public function addUser($id,$role){
      //Function to add new user to system
    $conn = new PDO("mysql:host=$this->host;dbname=$this->db",$this->user,$this->pass);
    $sql = $conn->prepare("INSERT INTO users SET user_id = '$id', user_role='$role' ");
    $sql->execute();
  }
  
  public function commitSessionID($id,$token){
       $conn = new PDO("mysql:host=$this->host;dbname=$this->db",$this->user,$this->pass);
    $sql = $conn->prepare("UPDATE users SET session_id = '$token' WHERE user_id = '$id'");
    $sql->execute();
      
  }
  
   public function deleteSessionID($id){
       $conn = new PDO("mysql:host=$this->host;dbname=$this->db",$this->user,$this->pass);
    $sql = $conn->prepare("UPDATE users SET session_id = '0' WHERE user_id = '$id'");
    $sql->execute();
      
  }
  
  public function getUserType($id){
    $conn = new PDO("mysql:host=$this->host;dbname=$this->db",$this->user,$this->pass);
    $sql = $conn->prepare("SELECT user_role FROM users WHERE user_id ='$id'; ");
    
    $sql->execute();
    $result = $sql->fetchAll(PDO::FETCH_ASSOC);
    $data = json_encode($result);
    echo $data;
    
  }
  
  
  /*The following functions are to deal with session handling.
  The user has the option of using the 'remember me' option when logging in.
  The set of functions below deal with all the logic affiliated with this
  functionality.*/
  
  
//   public function updateSessionID($cookiehash,$id){
//     //   Function to set new session id for user each time they log in
//      $conn = new PDO("mysql:host=$this->host;dbname=$this->db",$this->user,$this->pass);
//      $sql = $conn->prepare("UPDATE users SET session_id ='$cookiehash' WHERE user_id='$id'");
//      $sql->execute();
//   }
//   public function findSessionID($cookie){
//      $conn = new PDO("mysql:host=$this->host;dbname=$this->db",$this->user,$this->pass);
//      $sql = $conn->prepare("SELECT * FROM users WHERE session_id ='$cookie'");
//      $sql->execute();
//   }
  
//   Close database connection after running query
  public function __destruct(){
      unset($this->__construct()->conn);
  }
}
