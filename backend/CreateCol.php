<?php
require_once('Manager.php');

class CreateCol extends Manager {
  public function create($table, $type, $name) {
    try {
      $req = $this->_connexion->getDb()->prepare("ALTER TABLE $table ADD $name $type");
      $req->execute();
      echo "la colonne ".$name." a été créée!";
    }
    catch(Exception $e) {
      echo "la colonne ".$name." existe déjà!";
    }
    $req->closeCursor();
  }
}
 ?>
