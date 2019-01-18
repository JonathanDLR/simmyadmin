<?php
require_once('Manager.php');

class SendElem extends Manager {
  public function send($table) {
    try {
      $req = $this->_connexion->getDb()->prepare("SELECT * FROM $table");
      $req->execute();
      $showElem = $req->fetchAll(PDO::FETCH_ASSOC);

      $showElemJson = json_encode($showElem);

      return $showElemJson;
    }

    catch(Exception $e) {
      echo $e;
    }
    $req->closeCursor();
  }
}
 ?>
