<?php
$id = htmlspecialchars($_GET['user']);
require 'classes/Auth.php';

$auth = new Authentication();
$auth->logoutUser($id);