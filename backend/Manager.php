<?php
require_once('Bdd.php');

class Manager {
  protected $_connexion;

  public function __construct() {
    $this->_connexion = new Bdd();
    $this->_connexion->setDns('mysql:host=localhost; dbname=jdlr');
    $this->_connexion->setUser('root');
    $this->_connexion->setMdp('coda2018');
    $this->_connexion->connect();
    $this->_connexion->setAttribute();
  }
}
