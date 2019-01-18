<?php
require_once('Manager.php');

class DeleteTable extends Manager {
  public function delete($table) {
    try {
      $req = $this->_connexion->getDb()->prepare("DROP TABLE $table");
      $req->execute();
      echo "la table ".$table." a été supprimée!";
    }
    catch(Exception $e) {
      echo "la table ".$table." n'existe pas!";
    }
    $req->closeCursor();
  }
}
 ?>
