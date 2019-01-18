<?php
require_once('Manager.php');

class DeleteCol extends Manager {
  public function delete($table, $col) {
    try {
      $req = $this->_connexion->getDb()->prepare("ALTER TABLE $table DROP COLUMN $col");
      $req->execute();
      echo "la colonne ".$col." a été supprimé!";
    }
    catch(Exception $e) {
      echo $e;
    }
    $req->closeCursor();
  }
}
 ?>
