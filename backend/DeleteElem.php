<?php
require_once('Manager.php');

class DeleteElem extends Manager {
  public function delete($table, $id) {
    try {
      $req = $this->_connexion->getDb()->prepare("DELETE FROM $table WHERE id = :id");
      $req->bindParam(":id", $id, PDO::PARAM_INT);
      $req->execute();
      echo "Suppression effectuée";
    }
    catch(Exception $e) {
      echo $e;
    }
    $req->closeCursor();
  }
}
 ?>
