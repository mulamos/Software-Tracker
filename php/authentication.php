<?php
require ('classes/Database.php');

$id = htmlspecialchars($_POST['id']);

$conn = new DB();

$conn->getUserType($id);