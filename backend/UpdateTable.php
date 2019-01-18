<?php
require_once('Manager.php');

class UpdateTable extends Manager {
  public function update($table, $newNom) {
    try {
      $req = $this->_connexion->getDb()->prepare("ALTER TABLE $table RENAME TO $newNom");
      $req->execute();
      echo "la table ".$table." a été renommée!";
    }
    catch(Exception $e) {
      echo $e;
    }
    $req->closeCursor();
  }
}
 ?>
