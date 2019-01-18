<?php
require_once('Manager.php');

class UpdateElem extends Manager {
  public function update($table, $param, $id) {
    try {
      $req = $this->_connexion->getDb()->prepare("UPDATE $table SET $param WHERE id = :id");
      $req->bindParam(":id", $id, PDO::PARAM_INT);
      $req->execute();
      echo "Modification effectuée";
    }
    catch(Exception $e) {
      echo $e;
    }
    $req->closeCursor();
  }
}
 ?>
