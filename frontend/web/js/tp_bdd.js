INIT = {
  init: function() {
    CREATETABLE.init();
    CHOICETABLE.init();
    DELTABLE.init();
    UPDTABLE.init();
    CREATECOL.init();
    GETCOL.init();
    GETELEM.init();
  }
},

CREATETABLE = { // CREATION D'UNE TABLE
  init: function() {
    $("#BUTcreateTable").on('click', CREATETABLE.ajax);
  },

  ajax: function() {
    var create = "create";
    var table = $('#INPcreateTable').val();
    $.post(
      'controller/Controller.php',
      {
        create: create, // PARAM INDIQUANT AU CONTROLLER QUON SOUHAITE CREER
        table: table // NOM DE LA TABLE
      },
      function success(data) {
        $("#ARTreponse").empty(); // ON VIDE LE CHAMP DE REPONSE
        $("#ARTreponse").text(data);
        CHOICETABLE.ajax(); // ON LANCE AUTOMATIQUEMENT LE CHARGEMENT DES TABLES
      }
    )
  }
},

DELTABLE = { // SUPPRESSION DUNE TABLE
  init: function() {
    $("#BUTdeleteTable").on("click", DELTABLE.delTable);
  },

  delTable: function() {
    var tableDel = $("#choiceBddDel").val();
    console.log(tableDel);
    $.post(
      'controller/Controller.php',
      {
        tableDel: tableDel // LE NOM DE LA TABLE A SUPPRIMER
      },
      function success(data) {
        $("#ARTtblDel").empty();
        $("#ARTtblDel").text(data);
        CHOICETABLE.ajax();
      }
    )
  }
},

UPDTABLE = { // MODIFICATION DU NOM DUNE TABLE
  init: function() {
    $("#BUTupdTable").on("click", UPDTABLE.updTable);
  },

  updTable: function() {
    var tableUp = $("#choiceBddDel").val();
    var newName = $("#INPupdTable").val();
    $.post(
      'controller/Controller.php',
      {
        tableUp: tableUp, // LE NOM DE LA TABLE A MODIFIEE
        newName: newName // LE NOUVEAU NOM DE LA TABLE
      },
      function success(data) {
        $("#ARTtblUpd").empty();
        $("#ARTtblUpd").text(data);
        CHOICETABLE.ajax();
      }
    )
  }
},

CHOICETABLE = { // RECUPERATION DE TOUTES LES TABLES DANS LINPUT
  init: function() {
    CHOICETABLE.ajax();
  },

  ajax: function() {
    var choice = "choice";
    $.post(
      'controller/Controller.php',
      {
        choice: choice
      },
      function success(data){
        $(".choiceBdd").empty();
        var objReponse = jQuery.parseJSON(data);
        for (var i in objReponse) {
          $('<option>', { // ON CREE LES DIFFERENTES OPTIONS DANS LINPUT
            value: objReponse[i],
            class: objReponse[i]
          }).appendTo($(".choiceBdd"));
          $(".".concat(objReponse[i])).text(objReponse[i]);
        }
      }
    )
  }
},

CREATECOL = { // CREATION DUNE COLONNE
  init: function() {
    $("#BUTcreateCol").on('click', CREATECOL.ajax);
  },

  ajax: function() {
    var table = $("#choiceBddCol").val();
    var typeCol = $("#choiceCol").val();
    var long = $("#INPlong").val();
    var type = typeCol.concat("("); // ON ADAPTE LE PARAM A SQL
    type += long.concat(")");
    var name = $("#INPcreateCol").val();
    $.post(
      'controller/Controller.php',
      {
        table: table,
        type: type,
        name: name
      },
      function success(data) {
        if (!$("#ARTtblColRep").empty()) {
          GETCOL.ajax();
        }
        $("#ARTreponseCol").empty();
        $("#ARTreponseCol").text(data);
      }
    )
  }
},

GETCOL = { // RECUPERATION DES COLONNES DUNE TABLE
  init: function() {
    $("#BUTrecupElem").on('click', GETCOL.ajax);
  },

  ajax:function() {
    var tableCol = $("#choiceBddEnt").val();
    $.post(
      'controller/Controller.php',
      {
        tableCol: tableCol
      },
      function success(data) {
        $("#ARTtblColRep").empty();
        var objColRep = jQuery.parseJSON(data); // ON PARSE LE JSON ENVOYE PAR PHP
        enleveID = objColRep.splice(0,1); // ON ENLEVE LA COLONNE ID QUI NE DOIT PAS ETRE TOUCHEE
        for (var i in objColRep) { // ON CREE LES DIFFERENTS ELEMENTS HTML POUR CHAQUE COL
          $('<p>', {
            id: "P".concat(objColRep[i])
          }).appendTo($("#ARTtblColRep"));
          $('<span>', {
            id: "SPA".concat(objColRep[i])
          }).appendTo($("#P".concat(objColRep[i])));
          $("#SPA".concat(objColRep[i])).text(objColRep[i].concat(": "));
          $('<input>', {
            type: "text",
            id: "INP".concat(objColRep[i]),
            placeholder: "votre elem",
            class: "param"
          }).appendTo($("#ARTtblColRep").children().last());
          $('<button>', {
            id: objColRep[i]
          }).appendTo($("#ARTtblColRep").children().last());
          $("#".concat(objColRep[i])).text("SUPPRIMER LA COLONNE");
          $("#".concat(objColRep[i])).on("click", DELCOL.delCol); // ON AJOUTE LECOUTEUR SUR CE BOUTON
          $('<span>', {
            id : "SPAup".concat(objColRep[i])
          }).appendTo($("#ARTtblColRep").children().last());
          $("#SPAup".concat(objColRep[i])).text("Modifier la colonne: ");
          $('<select>', {
            id: "SEL".concat(objColRep[i])
          }).appendTo($("#ARTtblColRep").children().last());
          $('<option>', {
            value: "TINYINT",
            id: "OPTTI".concat(objColRep[i])
          }).appendTo($("#SEL".concat(objColRep[i])));
          $("#OPTTI".concat(objColRep[i])).text("TINYINT");
          $('<option>', {
            value: "SMALLINT",
            id: "OPTSI".concat(objColRep[i])
          }).appendTo($("#SEL".concat(objColRep[i])));
          $("#OPTSI".concat(objColRep[i])).text("SMALLINT");
          $('<option>', {
            value: "INT",
            id: "OPTI".concat(objColRep[i])
          }).appendTo($("#SEL".concat(objColRep[i])));
          $("#OPTI".concat(objColRep[i])).text("INT");
          $('<option>', {
            value: "VARCHAR",
            id: "OPTVA".concat(objColRep[i])
          }).appendTo($("#SEL".concat(objColRep[i])));
          $("#OPTVA".concat(objColRep[i])).text("VARCHAR");
          $('<option>', {
            value: "TEXT",
            id: "OPTTE".concat(objColRep[i])
          }).appendTo($("#SEL".concat(objColRep[i])));
          $("#OPTTE".concat(objColRep[i])).text("TEXT");
          $('<option>', {
            value: "DATETIME",
            id: "OPTDA".concat(objColRep[i])
          }).appendTo($("#SEL".concat(objColRep[i])));
          $("#OPTDA".concat(objColRep[i])).text("DATETIME");
          $('<input>', {
            type: "text",
            placeholder: "longeur colonne",
            id: "INPupLong".concat(objColRep[i])
          }).appendTo($("#ARTtblColRep").children().last());
          $('<input>', {
            type: "text",
            placeholder: "nouveau nom",
            id: "INPupName".concat(objColRep[i])
          }).appendTo($("#ARTtblColRep").children().last());
          $('<button>', {
            id: "BUTupName".concat(objColRep[i])
          }).appendTo($("#ARTtblColRep").children().last());
          $("#BUTupName".concat(objColRep[i])).text("MODIFIER");
          $("#BUTupName".concat(objColRep[i])).on("click", UPDCOL.updCol); // ON AJOUTE LECOUTEUR
        }
        $('<button>', {
          id: "BUTcreateElem"
        }).appendTo($("#ARTtblColRep"));
        $('#BUTcreateElem').text("Créer l'élément");
        SENDPARAM.init();
      }
    )
  }
},

DELCOL = { // SUPRESSION DE COLONNE
  delCol: function(e) {
    var tableDelCol = $("#choiceBddEnt").val();
    var col = $(e.target)[0].id; // ON RECUP LE NOM DE LA COL QUI SE TROUVE DANS LID DU BOUTON
    $.post(
      'controller/Controller.php',
      {
        tableDelCol: tableDelCol,
        col: col
      },
      function success(data) {
        GETCOL.ajax();
        $("#ARTtblColRep").empty();
        $("#ARTtblColRep").text(data);
      }
    )
  }
},

UPDCOL = { // MODIF DE COLONNE
  updCol: function(e) {
    var node = e.target.parentNode; // PARENT DU BOUTON
    var tableUpCol = $("#choiceBddEnt").val();
    var col = e.target.id.substr(9); // RECUP DU NOM DE LA COL QUI SE TROUVE DANS LID DU BOUTON
    var newName = node.childNodes[6].value; // RECUP DES DIFFERENTES VALEURS A ENVOYE
    var newType = node.childNodes[4].value;
    var newLong = node.childNodes[5].value;
    var envoi = true;
    if (newName == "" || newLong == "") { // SI UN CHAMP NEST PAS REMPLI ON NE FAIT RIEN
      envoi = false;
    }else {
      newType = newType.concat("("); // ON ADAPTE LE PARAM A SQL
      newType += newLong.concat(")");
      $.post(
        'controller/Controller.php',
        {
          tableUpCol: tableUpCol,
          col: col,
          newName: newName,
          newType: newType
        },
        function success(data) {
          GETCOL.ajax(); // ON MET A JOUR LA LISTE DES COLONNES
          $("#ARTelemValid").empty();
          $("#ARTelemValid").text(data);
        }
      )
    }
  }
},

SENDPARAM = { // CREATION DUNE ENTREE
  init: function() {
    $("#BUTcreateElem").on("click", SENDPARAM.send);
  },

  send: function() {
    var table = $("#choiceBddEnt").val();
    var inpElem = $("#SECCcreateElem input:nth-child(2)"); // SELECTION DES INPUTS CONCERNES
    var inpId = []; // TABLEAU NOMS COLONNES
    var inpVal = []; // TABLEAU VALEURS DES ENTREES
    var envoi = true;
    for (var i = 0; i < inpElem.length; i++) {
      if (inpElem[i].value == "") { // SI UN CHAMP EST VIDE ON NE FAIT RIEN
        envoi = false;
      } else {
        $.each(inpElem, function (i, elem) {
          var elemId = elem.id.substr(3); // ON RECUP LE NOM DE LA COL QUI SE TROUVE DANS LID
          inpId.push(elemId); // ON PUSH DANS LE TABLEAU
          var elemValue = elem.value
          elemValue = "'".concat(elem.value); // ON ADAPTE LA SYNTAXE A SQL
          inpVal.push(elemValue.concat("'")); // ON PUSH
        });
        $.post(
          'controller/Controller.php',
          {
            col: inpId,
            table: table,
            param: inpVal
          },
          function success(data) {
            GETELEM.getElem(); // MAJ DES ENTREES
            $("#ARTelemValid").empty();
            $("#ARTelemValid").text(data);
          }
        )
      }
    }
  }
},

GETELEM = { // RECUPERATION DES ENTREES
  init: function() {
    $("#BUTrecupElemDel").on("click", GETELEM.getElem);
  },

  getElem: function() {
    var tableElem = $("#choiceBddElmDel").val();
    $.post(
      'controller/Controller.php',
      {
        tableElem: tableElem
      },
      function success(data) {
        $("#ARTtblElemRep").empty();
        var objElemRep = jQuery.parseJSON(data); // ON PARSE LE JSON RECUPERE
        $('<p>', { // CREATION DES ELEMENTS HTML
          id: "Pcol"
        }).appendTo($("#ARTtblElemRep"));
        for (var i in objElemRep) {
          var key = objElemRep[i];
          var pval = "Pval".concat(i);
          $('<p>', {
            id: pval
          }).appendTo($("#ARTtblElemRep"));
          for (var keyB in key) {
            if (i == 0) {
              $('<span>', {
                id: "SPAcol".concat(keyB)
              }).appendTo($("#Pcol"));
            }
            $("#SPAcol".concat(keyB)).text(keyB);
            var idInp = "INPcol".concat(keyB) + key[keyB];
            $('<input>', {
              id : idInp,
              value: key[keyB]
            }).appendTo($("#Pval".concat(i)));
            $("#".concat(idInp)).attr({'data-col': keyB}); // ON AJOUTE UN ATTR DATA POUR ENREGISTRER LE NOM DE LA COL
          }
          var pFirst = $("#".concat(pval));
          pFirst[0].firstChild.setAttribute('readonly', 'readonly'); // ON PASSE CHAQUE PREMIER INPUT EN READONLY

          var idBut = $("#Pval".concat(i)).find('input:first')[0].value;
          $('<button>', {
            id: idBut
          }).appendTo($("#Pval".concat(i)));
          $("#".concat(idBut)).text("SUPPRIMER");
          $("#".concat(idBut)).on("click", DELELEM.delElem); // ON AJOUTE LECOUTEUR
          var idButDel = "BUTup".concat(idBut)
          $('<button>', {
            id: idButDel
          }).appendTo($("#Pval".concat(i)));
          $("#".concat(idButDel)).text("MODIFIER");
          $("#".concat(idButDel)).on("click", UPDELEM.updElem); // ON AJOUTE LECOUTEUR
        }
      }
    )
  }
},

DELELEM = { // SUPPRESSION DUNE ENTREE
  delElem: function() {
    var table = $("#choiceBddDel").val();
    var id = $(this)[0].id;
    $.post(
      'controller/Controller.php',
      {
        table: table,
        id: id
      },
      function success(data) {
        $("#ARTtblElemRep").empty();
        GETELEM.getElem();
        $("#ARTdelValid").empty();
        $("#ARTdelValid").text(data);
      }
    )
  }
},

UPDELEM = { // MODIFICATION DUNE ENTREE
  updElem: function(e) {
    var table = $("#choiceBddDel").val();
    var idCol = e.target.id.substr(5); // ON RECUP LE NOM DE LA COL DE LID DU BOUTON
    var param = []; // TABLEAU DES PARAMS A ENVOYES
    var elem = $(this).parent().children("input:not(:first-child)"); // ON RECUP TOUS LES INPUTS DU PARENT  DU BOUTON SAUF LE PREMIER
    var envoi = true;
    for (var i = 0; i < elem.length; i++) {
      if (elem[i].value == "") { // SI UN CHAMP EST VIDE ON NE FAIT RIEN
        envoi = false;
      }
    }
    if (envoi == true) {
      $.each(elem, function(i, elemVal) {
        paramValue = "\"".concat(elem[i].value); // ON ADAPTE LES PARAM A LA SYNTAXE SQL
        paramValue+= "\""
        paramElem = elem[i].dataset.col;
        paramElem += "=".concat(paramValue);
        param.push(paramElem);
      });
      $.post(
        'controller/Controller.php',
        {
          table: table,
          idCol: idCol,
          paramUpd: param
        },
        function success(data) {
          $("#ARTdelValid").empty();
          $("#ARTdelValid").text(data);
        }
      )
    }
    else {
      $("#ARTdelValid").empty();
      $("#ARTdelValid").text("Veuillez compléter tous les champs!");
    }
  }
}

window.onload = INIT.init();
