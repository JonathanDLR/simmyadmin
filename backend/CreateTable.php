<?php
require_once('Manager.php');

class CreateTable extends Manager {
  public function create($table) {
    try {
      $req = $this->_connexion->getDb()->prepare("CREATE TABLE $table (id INT(11) AUTO_INCREMENT PRIMARY KEY)");
      $req->execute();
      echo "la table ".$table." a été créée!";
    }
    catch(Exception $e) {
      echo "la table ".$table." existe déjà!";
    }
    $req->closeCursor();
  }
}
 ?>
