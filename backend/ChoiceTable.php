<?php
require_once('Manager.php');

class ChoiceTable extends Manager {
  public function choice() {
    try {
      $req = $this->_connexion->getDb()->query("SHOW TABLES");
      $choice = $req->fetchAll(PDO::FETCH_ASSOC);
      $tblAjax = [];

      foreach ($choice as $key => $value) {
        foreach ($value as $keyB => $valueB) {
          array_push($tblAjax, $valueB);
        }
      }

      $tblJson = json_encode($tblAjax);
      return $tblJson;
    }
    catch(Exception $e) {

    }
    $req->closeCursor();
  }
}
 ?>
