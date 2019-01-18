<?php
require_once('Manager.php');

class CreateElem extends Manager {
  public function create($table, $col, $param) {
    try {
      $req = $this->_connexion->getDb()->prepare("INSERT $table($col) VALUES($param)");
      $req->execute();
      echo "Enregistrement effectué";
    }
    catch(Exception $e) {
      echo $e;
    }
    $req->closeCursor();
  }
}
 ?>
