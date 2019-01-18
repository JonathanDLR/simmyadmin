<?php
require_once('Manager.php');

class UpdateCol extends Manager {
  public function update($table, $col, $newName, $newType) {
    try {
      $req = $this->_connexion->getDb()->prepare("ALTER TABLE $table CHANGE $col $newName $newType");
      $req->execute();
      echo "la colonne ".$col." a été renommée!";
    }
    catch(Exception $e) {
      echo $e->getMessage();
    }
    $req->closeCursor();
  }
}
 ?>
