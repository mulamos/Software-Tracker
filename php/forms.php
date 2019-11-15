<?php

include 'classes/Database.php';

//++++++++++++++++++++++++++++Form Input Data+++++++++++++++++++++++++++++
  $id = htmlspecialchars($_POST['id']);
  $fname = htmlspecialchars($_POST['fname']);
  $lname = htmlspecialchars($_POST['lname']);
  $dept = htmlspecialchars($_POST['dept']);
  $s_name = htmlspecialchars($_POST['software_name']);
  $num_license = htmlspecialchars($_POST['num_license']);
  $s_version = htmlspecialchars($_POST['s_version']);
  $os = htmlspecialchars($_POST['os']);
  // $comp_name = htmlspecialchars($_POST['comp_name']);
  $installer = htmlspecialchars($POST['installer']);
  $date = date('d/m/Y', strtotime(htmlspecialchars($_POST['date'])));
//++++++++++++++++++++++++End Forn Input Data++++++++++++++++++++++++++++

 $conn = new DB();

$conn->insertData($id,$fname,$lname,$dept,$s_name,$num_license,$s_version,$os,$installer,$date);


header("Location: https://software-tracker-mulamos.c9users.io/pages/tables.html");