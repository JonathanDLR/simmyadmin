<?php
require_once('Manager.php');

class SendCol extends Manager {
  public function send($table) {
    try {
      $req = $this->_connexion->getDb()->query("SHOW COLUMNS FROM $table");
      $showCol = $req->fetchAll(PDO::FETCH_ASSOC);
      $showColAjax = [];

      foreach($showCol as $key => $val) {
        foreach($val as $value => $valB) {
          if ($value == "Field") {
            array_push($showColAjax, $valB);
          }
        }
      }
      $showColJson = json_encode($showColAjax);

      return $showColJson;
    }

    catch(Exception $e) {

    }
    $req->closeCursor();
  }
}
 ?>
