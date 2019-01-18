<?php
require($_SERVER['DOCUMENT_ROOT'].'/tp_bdd/backend/CreateTable.php');
require($_SERVER['DOCUMENT_ROOT'].'/tp_bdd/backend/DeleteTable.php');
require($_SERVER['DOCUMENT_ROOT'].'/tp_bdd/backend/UpdateTable.php');
require($_SERVER['DOCUMENT_ROOT'].'/tp_bdd/backend/ChoiceTable.php');
require($_SERVER['DOCUMENT_ROOT'].'/tp_bdd/backend/CreateCol.php');
require($_SERVER['DOCUMENT_ROOT'].'/tp_bdd/backend/DeleteCol.php');
require($_SERVER['DOCUMENT_ROOT'].'/tp_bdd/backend/UpdateCol.php');
require($_SERVER['DOCUMENT_ROOT'].'/tp_bdd/backend/SendCol.php');
require($_SERVER['DOCUMENT_ROOT'].'/tp_bdd/backend/CreateElem.php');
require($_SERVER['DOCUMENT_ROOT'].'/tp_bdd/backend/SendElem.php');
require($_SERVER['DOCUMENT_ROOT'].'/tp_bdd/backend/DeleteElem.php');
require($_SERVER['DOCUMENT_ROOT'].'/tp_bdd/backend/UpdateElem.php');

function getAccueil() {
  require('frontend/view/head.html');
  require('frontend/view/accueil.html');
  require('frontend/view/script.html');
}

function setCreateTable() {
  if (!empty($_POST['table'])) {
    $table = strip_tags($_POST['table']);
    $createTable = new CreateTable();
    $response = $createTable->create($table);

    echo $response;
  }
  else {
    echo 'Veuillez renseigner le nom de la table!';
  }
}

function deleteTable() {
  if (!empty($_POST['tableDel'])) {
    $tableDel = strip_tags($_POST['tableDel']);
    $delTable = new DeleteTable();
    $reponseDel = $delTable->delete($tableDel);
    echo $reponseDel;
  }
}

function updateTable() {
  if (!empty($_POST['tableUp'])) {
    $tableUp = strip_tags($_POST['tableUp']);
    $newName = strip_tags($_POST['newName']);
    $updateTable = new UpdateTable();
    $reponseUpd = $updateTable->update($tableUp, $newName);
    echo $reponseUpd;
  }
}

function receiveTable() {
  $receiveTable = new ChoiceTable();
  $responseChoice = $receiveTable->choice();
  echo $responseChoice;
}

function setCreateCol() {
  if (!empty($_POST['type'])) {
    $table = strip_tags($_POST['table']);
    $type = strip_tags($_POST['type']);
    $name = strip_tags($_POST['name']);
    $createCol = new CreateCol();
    $reponseCol = $createCol->create($table, $type, $name);
    echo $reponseCol;
  } else {
    echo 'Veuillez renseigner le nom de la colonne!';
  }
}

function getCol() {
  $tableCol = strip_tags($_POST['tableCol']);
  $getCol = new SendCol();
  $reponseGetCol = $getCol->send($tableCol);
  echo $reponseGetCol;
}

function delCol() {
  $tableDelCol = strip_tags($_POST['tableDelCol']);
  $col = strip_tags($_POST['col']);
  $delCol = new DeleteCol();
  $reponseDelCol = $delCol->delete($tableDelCol, $col);
  echo $reponseDelCol;
}

function updCol() {
  $tableUpCol = strip_tags($_POST['tableUpCol']);
  $col = strip_tags($_POST['col']);
  $newName = strip_tags($_POST['newName']);
  $newType = strip_tags($_POST['newType']);
  $updCol = new UpdateCol();
  $reponseUpdCol = $updCol->update($tableUpCol, $col, $newName, $newType);
}

function sendElem() {
  if (!empty($_POST['param'])) {
    $col = implode(",", $_POST['col']);
    $table = $_POST['table'];
    $param = implode(",", $_POST['param']);
    $createElem = new CreateElem();
    $reponseElem = $createElem->create($table, $col, $param);
    echo $reponseElem;
  }
}

function getElem() {
  $tableElem = strip_tags($_POST['tableElem']);
  $getElem = new SendElem();
  $reponseGetElem = $getElem->send($tableElem);
  echo $reponseGetElem;
}

function delElem() {
  if (!empty($_POST['id'])) {
    $table = strip_tags($_POST['table']);
    $id = $_POST['id'];
    $delElem = new DeleteElem();
    $reponseDelElem = $delElem->delete($table, $id);
    echo $reponseDelElem;
  }
}

function updElem() {
  if (!empty($_POST['paramUpd'])) {
    $table = strip_tags($_POST['table']);
    $idCol = $_POST['idCol'];
    $paramUpd = implode(", ", $_POST['paramUpd']);
    $updElem = new UpdateElem();
    $reponseUpdElem = $updElem->update($table, $paramUpd, $idCol);
    echo $reponseUpdElem;
  }
}

if(isset($_POST['choice'])) {
  receiveTable();
}

if(isset($_POST['create'])) {
  setCreateTable();
}

if(isset($_POST['tableDel'])) {
  deleteTable();
}

if(isset($_POST['tableUp'])) {
  updateTable();
}

if(isset($_POST['type'])) {
  setCreateCol();
}

if(isset($_POST['tableCol'])) {
  getCol();
}

if(isset($_POST['tableDelCol'])) {
  delCol();
}

if(isset($_POST['tableUpCol'])) {
  updCol();
}

if(isset($_POST['param'])) {
  sendElem();
}

if(isset($_POST['tableElem'])) {
  getElem();
}

if(isset($_POST['id'])) {
  delElem();
}

if(isset($_POST['paramUpd'])) {
  updElem();
}
?>
