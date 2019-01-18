<?php
class Bdd {
  private $_db;
  private $_dns;
  private $_user;
  private $_mdp;
  public function connect() {
    $this->setDb(new PDO($this->getDns(), $this->getUser(), $this->getMdp()));
  }

  public function setAttribute() {
    $this->_db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  }

  public function setDb($db) {
    $this->_db = $db;
  }
  public function setDns($dns) {
    if (!is_string($dns)) {
      trigger_error('Le nom d\'hote est invalide', E_USER_WARNING);
      return;
    }
    $this->_dns = $dns;
  }
  public function setUser($user) {
    if (!is_string($user)) {
      trigger_error('Le nom de l\'user est invalide', E_USER_WARNING);
      return;
    }
    $this->_user = $user;
  }
  public function setMdp($mdp) {
    if (!is_string($mdp)) {
      trigger_error('Le mot de passe est invalide', E_USER_WARNING);
      return;
    }
    $this->_mdp = $mdp;
  }
  public function getDb() {
    return $this->_db;
  }
  public function getDns() {
    return $this->_dns;
  }
  public function getUser() {
    return $this->_user;
  }
  public function getMdp() {
    return $this->_mdp;
  }
}
?>
