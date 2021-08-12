if (localStorage.getItem("idJuego")) {
    undum.game.id = localStorage.getItem("idJuego");
} else {
    undum.game.id = "0";
}
function ir() {
    window.alert('Para una experiencia mas personalizada, este juego registra usuario y contraseña.\n\
    Si aun no lo has hecho, solo te llevara unos segundos...\n\
    Si tienes guardada la partida, te llevaré hasta ella!!\n\
    Vuelves al principio tras pulsar en el boton Borrar!');
}
function ir2() {
    var nombreUsuario = document.getElementById('nombre').value;
    undum.game.id = document.getElementById('password').value;
    localStorage.setItem("idJuego", document.getElementById('password').value);
    localStorage.setItem("anteriorId", document.getElementById('password').value);
    $("button").attr('disabled', false);
    window.alert('Bienvenido ' + nombreUsuario + ', su nombre y clave han quedado registrados. Acepte y vaya al Menu del Juego para continuar.');
    return nombreUsuario;
}
/* VERSION DEL JUEGO. Aqui se controlan las partidas guardadas. Evidentemente,
 * una partida guardada, al cambiar la version del juego, si luego la cargas
 * no va a funcionar. */
undum.game.version = "4.0";
/* Variable usada para Web responsive. */
undum.game.mobileHide = 2000;
/* Variable la opcion de velocidad del fade out. */
undum.game.fadeSpeed = 1500;
/* Variable que cambia la velocidad de deslizamiento al pulsar una opcion. */
undum.game.slideUpSpeed = 500;
/* SITUACIONES DEL JUEGO. CADA UNA CON UN UNICO ID. */

undum.game.situations = {
    inicio: new undum.SimpleSituation(
            "<form name='formulario' action=''>\
            <h3><div><label for='nombre'>Nombre</label><input type='text' name='nom' id='nombre' value= '' class='marco'></label></div></h3>\
            <h3><div><label for='password'>Contraseña</label><input type='password' name='pass' id='password' value= '' class='marco'></label></div></h3>\
            <center><input type='button' id = 'boton' value='ACEPTAR' onclick='ir2()' VSPACE='40' class='marco'>\
            </FORM></center>\
            <center><H1><a href='menu' class='click'><span id='span1'></span><span id='span2'></span><span id='span3'></span> \
                <span id='span4'></span>Menu del Juego</a></H1>",
            {
                heading: "_____Identificación_____"
            }
    ),
    menu: new undum.SimpleSituation(
            function ir3() {
                nombreUsuario = document.getElementById('nombre').value;
                return "<center><H4>Hola " + nombreUsuario + ", aqui tienes tu Menu de juego:</H4></center><H1><a href='iniciohistoria' class='click'><span id='span1'></span><span id='span2'></span><span id='span3'></span> \
                <span id='span4'></span><center>NUEVO JUEGO</center></a></H1> \
        <H1><a href='cargarjuego' class='click'><span id='span1'></span><span id='span2'></span><span id='span3'></span> \
                <span id='span4'></span><center>CARGAR JUEGO</center></a></H1> \
        <H1><a href='salir' class='click'><span id='span1'></span><span id='span2'></span><span id='span3'></span> \
                <span id='span4'></span><center>SALIR</center></p></H1>";
            }
    ),
    iniciohistoria: new undum.SimpleSituation(
            "<p><img src='media/img/curso.png' class='float_right'>Tienes las pilas recargadas tras unas increibles vacaciones de tres días. ¡Qué rápido pasa el tiempo!  \
	  Este cuatrimestre cursas la asignatura más difícil de la carrera. </p><p>Tienes que hacer todo lo por aprobar y tomar las decisiones correctas. Una tercera matrícula duele mucho.</p><p><a href='./ayuda'> ¿Necesitas ayuda?</a><p><a href='biblioteca'> Comenzar el cuatrimestre.</a></p>", {
                enter: function (character, system, from) {
                    system.setCharacterText(
                            "<p>Progreso del juego 0%</p>"
                            );
                },
                heading: "1 de Febrero: Fin de las vacaciones",
                actions: {
                    "ayuda": function (character, system, action) {
                        system.setCharacterText(
                                "<p>Debes de conseguir más de 100 puntos de conocimiento o interés para aprobar. Si tienes menos de 0 suspenderás.</p>"
                                );
                    }
                }
            }
    ),
    cargarjuego: new undum.SimpleSituation(
            "<div><center><p>No tiene ningun juego guardado, empieze uno nuevo!!</p><img src='media/img/error.png' class='float_up'></p></center></div>\
                        <div><center><H1><p class='transient'>Volvamos al menu...</p></H1></center></div><div><p></center><H1><a href='menu'>MENU DEL JUEGO</a></p></div></center></H1>",
            {
                enter: function () {
                    undum.game.id = localStorage.getItem("idJuego");
                    anterior = localStorage.getItem("anteriorId");
                    if (undum.game.id !== anterior) {
                        window.alert('No se han encontrado datos guardados.');
                    }
                }
            }
    ),
    salir: new undum.SimpleSituation(
            "<h1>Inicio.</h1>",
            {
                enter: function () {
                    location.reload();
                }
            }
    ),
  iniciohistoria2: new undum.SimpleSituation(
    "<p><img src='media/img/curso.png' class='float_right'>Tienes las pilas recargadas tras... ¡Un momento, esto ya lo has vivido!  \
	  Acabas de viajar al pasado tras suspender el examen. </p><p>Debes de todo lo posible por aprobar y tomar las decisiones correctas. Una tercera matrícula duele mucho.  No debes desaprovechar esta oportunidad</p><p><a href='./ayuda'> ¿Necesitas ayuda?</a><p><a href='biblioteca'> Volver a comenzar el cuatrimestre</a></p>", {
      enter: function(character, system, from) {
        system.setCharacterText(
          "<p>Progreso del juego 0%</p>"
        );
		system.animateQuality("interes", character.qualities.interes + 20);
        system.animateQuality("conocimiento", character.qualities.conocimiento + 20);
		system.animateQuality("suspenso", character.qualities.suspenso - 1);

      },
      heading: "Otra vez 1 de Febrero: Fin de las vacaciones",
	  actions: {
        "ayuda": function(character, system, action) {
          system.setCharacterText(
            "<p>Debes de conseguir más de 100 puntos de conocimiento o interés para aprobar.</p>"
          );

        }
      },

    }
  ),
  fin1: new undum.SimpleSituation(
    "<p><a href='finsuspenso'> Continuar.</a></p>", {
     
    }
  ),
  fin2: new undum.SimpleSituation(
    "<p><a href='finaprobado'> Continuar.</a></p>", {

      

    }
  ),

  ir_tutoria: new undum.SimpleSituation(
    "<p><img src='media/img/duda.png' class='float_right' style=\"max-width: 40%;\"> Nuestro estudiante se decidió\
          finalmente por ir a la tutoría. \
          <p> Buenos dias Profesor, tengo una duda con esta práctica. No entiendo porque no me compila. -dice sentandose en el despacho del profesor</p> \
          <p> Buenos dias Alumno, por lo que puedo ver, no estás inicializando bien esta variable y te da error aqui. Compruebalo y me dices. -dice señalando el error </p> \
          <p>Al terminar la tutoría todo le quedo más claro y pudo completar sin ninguna dificultad sus prácticas. <a href='finaprobado'>Continuar.</a></p>", {
      enter: function(character, system, from) {
        system.setCharacterText(
          "<p>Progreso del juego 90%</p>"
        );
        system.animateQuality("interes", character.qualities.interes + 60);
        system.animateQuality("conocimiento", character.qualities.conocimiento + 60);

        if (character.qualities.conocimiento <= 0 || character.qualities.interes <= 0 || character.qualities.conocimiento < 100 || character.qualities.interes < 100) {
          system.doLink('fin1');
          system.setCharacterText(
            "<p>Estoy...¿Suspenso?</p>"
          );
        } else if (character.qualities.conocimiento >= 100 || character.qualities.interes >= 100) {
          system.doLink('fin2');
          system.setCharacterText(
            "<p>Al final el esfuerzo tiene su recompensa</p>"
          );
        }

      },

      heading: "Ir a tutoría",
      diplayOrder: 3,
      tags: ["tutoria"],

    }
  ),

  no_ir_tutoria: new undum.SimpleSituation(
    "<p>Nuestro estudiante se decicido\
          por no ir a la tutoría e intentar sacar la practica por si solo. Tras mucho tiempo y esfuerzo consigio\
          sacar la practica adelante\
           <a href='finaprobado'>Continuar.</a></p>", {
      enter: function(character, system, from) {
        system.setCharacterText(
          "<p>Progreso del juego 90%</p>"
        );
        system.animateQuality("conocimiento", character.qualities.conocimiento - 50);

        if (character.qualities.conocimiento <= 0) {
          system.doLink('fin1');
          system.setCharacterText(
            "<p>Estoy...¿Suspenso?</p>"
          );
        } else if (character.qualities.conocimiento >= 100) {
          system.setCharacterText(
            "<p>Al final el esfuerzo tiene su recompensa</p>"
          );
        }
      },

      heading: "No ir a tutoría",
      diplayOrder: 3,
      tags: ["tutoria"],

    }
  ),


  seguir_estudiando: new undum.SimpleSituation(
    "<p><img src='media/img/descansar.gif' class='float_right' style=\"max-width: 40%;\">Después de un día agotador\
        nuestro estudiante quiso seguir estudiando, al llevar todo el día estudiando y exigirse demasiado no solo no aprendió\
        nada sino que empezó a confundir términos, al no descansar adecuadamente su rendimiento académico bajo\
        a la mañana siguiente se despertó con varios <a href='debo_dejar_practica'>mensajes de un compañero</a></p>", {
      enter: function(character, system, from) {
        system.setCharacterText(
          "<p>Progreso del juego 75%</p>"
        );
        system.animateQuality("conocimiento", character.qualities.conocimiento + 50);
        system.animateQuality("interes", character.qualities.interes + 50);

        if (character.qualities.conocimiento <= 0 || character.qualities.interes <= 0) {
          system.doLink('fin1');
          system.setCharacterText(
            "<p>Estoy...¿Suspenso?</p>"
          );
        } else if (character.qualities.conocimiento >= 100 || character.qualities.interes >= 100) {
          system.doLink('fin2');
          system.setCharacterText(

            "<p>Al final el esfuerzo tiene su recompensa</p>"
          );
        }
      },

      heading: "Continuar estudiando",
      diplayOrder: 3,
      tags: ["estudiar"],

    }
  ),

  no_estudiar: new undum.SimpleSituation(
    "<p><img src='media/img/descansar.png' class='float_right' style=\"max-width: 45%;\">Al ver que no rendía más nuestro estudiante decidió dejar de  estudiar\
          e irse temprano a la cama, a la mañana siguiente se sentía más productivo y con ganas de afrontar nuevos\
          retos, al mirar el móvil tenia varios <a href='debo_dejar_practica'>mensajes de un compañero</a></p>",

    {
      enter: function(character, system, from) {
        system.setCharacterText(
          "<p>Progreso del juego 75%</p>"
        );
        system.animateQuality("interes", character.qualities.interes - 10);

        if (character.qualities.conocimiento <= 0 || character.qualities.interes <= 0) {
          system.doLink('fin1');
          system.setCharacterText(
            "<p>Estoy...¿Suspenso?</p>"
          );
        } else if (character.qualities.conocimiento >= 100 || character.qualities.interes >= 100) {
          system.doLink('fin2');
          system.setCharacterText(

            "<p>Al final el esfuerzo tiene su recompensa</p>"
          );
        }
      },

      heading: "Descansar",
      diplayOrder: 3,
      tags: ["estudiar"],

    }
  ),

  debo_dejar_practica: new undum.SimpleSituation(
    "<h1 class='transient'>Dejar las practicas</h1>\
      <p><img src='media/img/compañero.png' class='float_right' style=\"max-width: 45%;\">Un compañero de clase te pide las prácticas que terminaste la semana pasada, sabes que el profesor advirtió\
      en numerosas ocasiones que la copia de ejercicios esta castigada con un 0 en esa practica, pero tu no quieres que el compañéro\
      suspenda <a href='dejar_practica'>¿Debería dejársela?</a> o <a href='no_dejar_practica'>¿Debería no dejársela?</a>  </p>",

    {
      enter: function(character, system, from) {
        system.setCharacterText(
          "<p>Progreso del juego 80%</p>"
        );
      },

      // heading: "Dejar Practica",
      // diplayOrder: 3,
      // tags: ["dejar_practica"],

    }
  ),

  dejar_practica: new undum.SimpleSituation(
    "<p> Asumes un riesgo para que tu compañero pueda aprobar esa practica ¿Te salió rentable? o ¿simplemente \
        echaste a perder todo tu trabajo?\
       <a href='tutoria'>Continuar.</a>  </p>",

    {
      enter: function(character, system, from) {
        system.setCharacterText(
          "<p>Progreso del juego 85%</p>"
        );
        var aleatorio = Math.floor(Math.random() * 11);
        if (aleatorio > 5) {
          system.animateQuality("interes", character.qualities.interes - 50);
          if (character.qualities.conocimiento <= 0 || character.qualities.interes <= 0) {
            system.doLink('fin1');
            system.setCharacterText(
              "<p>Estoy...¿Suspenso?</p>"
            );
          } else if (character.qualities.conocimiento >= 100 || character.qualities.interes >= 100) {
            system.doLink('fin2');
            system.setCharacterText(

              "<p>Al final el esfuerzo tiene su recompensa</p>"
            );
          }
          system.setCharacterText("<p>El profesor me puso un 0 por copia</p>");
        } else {
          system.setCharacterText("<p>El profesor no se dio cuenta de que le deje las prácticas</p>");
        }


      },


      // heading: "Dejar Practica",
      // diplayOrder: 3,
      // tags: ["dejar_practica"],

    }
  ),

  no_dejar_practica: new undum.SimpleSituation(
    "<p> Le explicas que lo mejor para los dos es no dejar la practica ya que no ayuda a ninguna de las partes\
        y pones en riego el trabajo de tu compañero, el compañero parece que lo entiendo y te pide ayuda para la próximas practicas\
        tu encantado le ayudaras.\
       <a href='tutoria'>Continuar</a>  </p>",

    {
      enter: function(character, system, from) {
        system.setCharacterText(
          "<p>Progreso del juego 0%</p>"
        );
      },

      heading: "Dejar Practica",
      diplayOrder: 3,
      tags: ["dejar_practica"],

    }
  ),

  biblioteca: new undum.SimpleSituation(
    "<p><img src='media/img/bibliote.png' Ya que hoy nuestro estudiante decidió\
        ir a la biblioteca con un amigo. \
         </p><p><a href='dudasamigo'>Preguntar dudas que le surgen a su compañero.</a></p> \
         </p><p><a href='bibliomusica'>Ponerse musica para estudiar.</a></p> \
         </p><p><a href='verordenador'>Mirar ordenador un rato.</a></p>", {
      enter: function(character, system, from) {
        system.setCharacterText(
          "<p>Progreso del juego 5%</p>"
        );
        system.animateQuality("interes", character.qualities.interes + 10);
        system.animateQuality("conocimiento", character.qualities.conocimiento + 10);

        if (character.qualities.conocimiento <= 0 || character.qualities.interes <= 0) {
          system.doLink('fin1');
          system.setCharacterText(
            "<p>Estoy...¿Suspenso?</p>"
          );
        } else if (character.qualities.conocimiento >= 100 || character.qualities.interes >= 100) {
          system.doLink('fin2');
          system.setCharacterText(

            "<p>Al final el esfuerzo tiene su recompensa</p>"
          );
        }
      },

      heading: "15 de Febrero: Biblioteca con un amigo",
      diplayOrder: 3,
      tags: ["biblioteca"],

    }
  ),

  dudasamigo: new undum.SimpleSituation(
    "<p> Nos surge una duda mientras estudiamos,</p><p><a href='dialogos'>Le preguntamos.</a></p> </p>", {
      enter: function(character, system, from) {
        system.setCharacterText(
          "<p>Progreso del juego 7%</p>"
        );
        system.animateQuality("interes", character.qualities.interes + 20);
        system.animateQuality("apuntes", character.qualities.apuntes + 1);
        system.animateQuality("conocimiento", character.qualities.conocimiento + 20);

        if (character.qualities.conocimiento <= 0 || character.qualities.interes <= 0) {
          system.doLink('fin1');
          system.setCharacterText(
            "<p>Estoy...¿Suspenso?</p>"
          );
        } else if (character.qualities.conocimiento >= 100 || character.qualities.interes >= 100) {
          system.doLink('fin2');
          system.setCharacterText(

            "<p>¿Estoy aprobado?</p>"
          );
        }
      },

      heading: "Un día en la biblioteca",
      diplayOrder: 3,
      tags: ["dudasamigo"],

    }
  ),

  dialogos: new undum.SimpleSituation(
    "<p> ¿Esto que sale en este ejercicio estaría bien? ¿El modelo conceptual sería este? - Preguntamos agobiados \
  <p>Pues la verdad es que el ejercicio lo tienes bastante mal... y el modelo también. Te recomiendo apuntarte a <a href='particulares'>Clases Particulares</a> -dice mientras continua estudiando </p></p>", {
      enter: function(character, system, from) {
        system.setCharacterText(
          "<p>Progreso del juego 9%</p>"
        );
        system.animateQuality("interes", character.qualities.interes + 10);
        system.animateQuality("apuntes", character.qualities.apuntes + 1);
        system.animateQuality("conocimiento", character.qualities.conocimiento + 10);
        if (character.qualities.conocimiento <= 0 || character.qualities.interes <= 0) {
          system.doLink('fin1');
          system.setCharacterText(
            "<p>Estoy...¿Suspenso?</p>"
          );
        } else if (character.qualities.conocimiento >= 100 || character.qualities.interes >= 100) {
          system.doLink('fin2');
          system.setCharacterText(

            "<p>Al final el esfuerzo tiene su recompensa</p>"
          );
        }
      },

      heading: "Resolviendo dudas en dialogo",
      diplayOrder: 3,
      tags: ["dialogos"],

    }
  ),

  bibliomusica: new undum.SimpleSituation(
    "<p>Nos ponemos musica mientras estudiamos para evitar el murmullo de la <a href='biblioteca'>biblioteca</a></p>", {
      enter: function(character, system, from) {
        system.setCharacterText(
          "<p>Progreso del juego 1%</p>"
        );
        system.animateQuality("interes", character.qualities.interes - 10);
        system.animateQuality("conocimiento", character.qualities.conocimiento + 10);

        if (character.qualities.conocimiento <= 0 || character.qualities.interes <= 0) {
          system.doLink('fin1');
          system.setCharacterText(
            "<p>Estoy...¿Suspenso?</p>"
          );
        } else if (character.qualities.conocimiento >= 100 || character.qualities.interes >= 100) {
          system.doLink('fin2');
          system.setCharacterText(

            "<p>Al final el esfuerzo tiene su recompensa</p>"
          );
        }
      },

      heading: "Duda",
      diplayOrder: 3,
      tags: ["bibliomusica"],

    }
  ),

  verordenador: new undum.SimpleSituation(
    "<p>Nos distraemos con el ordenador (Viendo Twitter,Memes...) pero un momento... en Docencia Virtual \n\
estoy viendo que se puede hacer una entrega de un trabajo <a href='voluntario'>voluntario.</a></p>", {
      enter: function(character, system, from) {
        system.setCharacterText(
          "<p>Progreso del juego 10%</p>"
        );
        system.animateQuality("interes", character.qualities.interes - 30);
        system.animateQuality("conocimiento", character.qualities.conocimiento - 20);

        if (character.qualities.conocimiento <= 0 || character.qualities.interes <= 0) {
          system.doLink('fin1');
          system.setCharacterText(
            "<p>Estoy...¿Suspenso?</p>"
          );
        } else if (character.qualities.conocimiento >= 100 || character.qualities.interes >= 100) {
          system.doLink('fin2');
          system.setCharacterText(

            "<p>Al final el esfuerzo tiene su recompensa</p>"
          );
        }
      },
      heading: "Perder el tiempo en el PC",
      diplayOrder: 3,
      tags: ["verordenador"],
    }

  ),

  particulares: new undum.SimpleSituation(
    "<p>Nuestro estudiante toma la decisión de apuntarse a una academia para afrontar la asignatura.\n\
    Hoy es el primer día</p><p> <a href='irparticulares'>Ir a clases particulares.</a></p><p><a href='noirparticulares'>No ir a clases particulares.</a></p>", {
      enter: function(character, system, from) {
        system.setCharacterText(
          "<p>Progreso del juego 15%</p>"
        );
        system.animateQuality("pasta", character.qualities.pasta - 150);
      },
      heading: "Clases particulares",
      diplayOrder: 3,
      tags: ["particulares"],
    }

  ),

  irparticulares: new undum.SimpleSituation(
    "<p>Nuestro estudiante se ha levantado productivo y va hacia la academia para mejorar en la asignatura</p>\
        <p><a href='voluntario'>Continuar.</a></p>", {
      enter: function(character, system, from) {
        system.setCharacterText(
          "<p>Progreso del juego 17%</p>"
        );
        system.animateQuality("interes", character.qualities.interes + 30);
        system.animateQuality("conocimiento", character.qualities.conocimiento + 20);

        if (character.qualities.conocimiento <= 0 || character.qualities.interes <= 0) {
          system.doLink('fin1');
          system.setCharacterText(
            "<p>Estoy...¿Suspenso?</p>"
          );
        } else if (character.qualities.conocimiento >= 100 || character.qualities.interes >= 100) {
          system.doLink('fin2');
          system.setCharacterText(

            "<p>Al final el esfuerzo tiene su recompensa</p>"
          );
        }
      },
      heading: "Asiste a clases particulares",
      diplayOrder: 3,
      tags: ["irparticulares"],
    }

  ),

  noirparticulares: new undum.SimpleSituation(
    "<p>Nuestro estudiante se ha levantado vaguete y no va<p><a href='voluntario'>Continuar.</a></p></p>", {
      enter: function(character, system, from) {
        system.setCharacterText(
          "<p>Progreso del juego 17%</p>"
        );
        system.animateQuality("interes", character.qualities.interes - 20);
        system.animateQuality("conocimiento", character.qualities.conocimiento - 0);

        if (character.qualities.conocimiento <= 0 || character.qualities.interes <= 0) {
          system.doLink('fin1');
          system.setCharacterText(
            "<p>Estoy...¿Suspenso?</p>"
          );
        } else if (character.qualities.conocimiento >= 100 || character.qualities.interes >= 100) {
          system.setCharacterText(
            "<p>Al final el esfuerzo tiene su recompensa</p>"
          );
        }
      },
      heading: "No asiste a clases particulares",
      diplayOrder: 3,
      tags: ["noirparticulares"],
    }

  ),

  clase: new undum.SimpleSituation(
    "<p><img src='media/img/despertador.gif' class='float_right'>Son las ocho de la mañana y despues de desactivar cuatro alarmas por fín te levantas de la cama. Estás hecho polvo tras trasnochar haciendo la práctica de Desarrollo Ágil.\
        </p><p>Aún es prácticamente de noche, no ha salido apenas el sol. Vas a desayunar y no queda leche. Vaya manera de empezar el día.</p>\
        \
        <p >\Sin embargo, por lo menos parece que va a hacer una buena mañana. Te surje una duda existencial. Debes decidir entre <a href='clase1'>ir andando</a> o <a href='clase2'>ir en autobus</a> a clase.\
        </p> ", {
      heading: "17 de Marzo: Un Día Normal de clase",

      enter: function(character, system, to) {
        system.setCharacterText(
          "<p>Progreso del juego 30%</p>"
        );

        system.setQuality("interes", character.qualities.interes + 2);
        system.setQuality("pasta", character.qualities.pasta - 30);


      }
    }

  ),
  clase1: new undum.SimpleSituation(
    "<p><img src='media/img/andando.png' class='float_right'>Misteriosamente te apetecía hacer ejercicio y has decidido bajar andando a la Universidad. Cojes la mochila y te aseguras de no olvidarte las llaves antes de salir de casa.</p>\
		<p>Te pegas una larga caminata de media hora hacia la Universidad de Jaén, podrías haberte buscado un piso más cercano. <p>Por el camino te encuentras un autobús de la línea que sueles cojer\
		averiado en mitad de la carretera. Suerte que has decidido ir andando. </p><p>Por fin, has llegado. Entras en el edificio A4 y a tu aula. Hoy explicaban uno de los temas más difíciles.\
       <p><a href='./tomarapuntes'>Tomar apuntes.</a></p> <p><a href='faltar'>Continuar historia.</a></p> ", {
      heading: "Decides ir a clase andando",
      enter: function(character, system, to) {
        system.setCharacterText(
          "<p>Progreso del juego 35%</p>"
        );

        system.setQuality("interes", character.qualities.interes - 2);

      },
      actions: {
        "tomarapuntes": function(character, system, action) {
          system.setCharacterText(
            "<p>Objeto: Apuntes del tema 2.</p>"
          );
          system.setQuality("conocimiento", character.qualities.conocimiento + 10);
          system.setQuality("interes", character.qualities.interes + 5);
          system.setQuality("tema2", character.qualities.tema2 + 1);

        }
      },


    }

  ),

  clase2: new undum.SimpleSituation(
    "<p><img src='media/img/bus.png' class='float_right'>Has decidido ir en autobús, no te apetecía andar media hora hacia la Universidad. Cojes la mochila y te aseguras de no olvidarte las llaves antes de salir de casa.</p>\
		<p>Te dirijes hacia la parada de autobús mas cercana. Aunque vas escuchando música la espera se te hace infinita. Es bus ha llegado veinte minutos tarde. </p>\
		<p>Por fin estas dentro. Te sientas en el último asiento, cerca del motor. Tras dos minutos de trayecto se oye como un crujido en el motor y se detiene súbitamente.</p>\
		<p>El conductor dice que no puede arreglarlo, te has quedao plantado en mitad de camino. El próximo bus de la línea llega en una hora. Solo te queda bajar andando. </p>\<p>Por fin llegas ha clase pero solo te da tiempo a dar 20 minutos de clase. Prácticamente como si no hubieras ido.\
           <p><a href='faltar'>Continuar historia.</a></p>",

    {
      heading: "Has decidido ir a clase andando",
      enter: function(character, system, to) {
        system.setCharacterText(
          "<p>Progreso del juego 35%</p>"
        );
        system.setCharacterText(
          "<p>No has podido tomar apuntes del tema 2.</p>"
        );
        system.setQuality("conocimiento", character.qualities.conocimiento - 10);
        system.setQuality("pasta", character.qualities.pasta - 1);


      }

    }

  ),

  faltar: new undum.SimpleSituation(
    "<p><img src='media/img/pensar.png' class='float_right'>No te has planificado nada bien. Se te han juntado la práctica de Desarrollo Ágil con la de Concurrentes y Calidad del Software. Debes decicir entre <a href='faltar1'>faltar el miércoles</a> o <a href='faltar2'> faltar el jueves</a> para tener tiempo a hacer todas las prácticas.\
            </p><p>Ninguna de las dos es una buena decisión pero no te queda otra.</p>", {
      heading: "23 de Marzo: Faltar un día a clase",
      enter: function(character, system, to) {
        system.setCharacterText(
          "<p>Progreso del juego 50%</p>"
        );

        system.setQuality("interes", character.qualities.interes - 3);
        system.setQuality("pasta", character.qualities.pasta - 10);


      }


    }

  ),
  faltar1: new undum.SimpleSituation(
    "<p>Hablando por WhatsApp con tu amigo Manolo te dice que el profesor ha explicado uno de los temas más difíciles. Además, han pasado lista.</p>\
          <p><a href='./pedirapuntes'>Pedir que te pase los apuntes.</a></p>\
          \
            <p><a href='estudiar'>Continuar historia.</a></p>", {
      heading: "Decides faltar el miércoles ",
      enter: function(character, system, to) {
        system.setCharacterText(
          "<p>Progreso del juego 60%</p>"
        );
        system.setCharacterText(
          "<p>Han pasado lista y han hecho ejercicios.</p>"
        );
        system.setQuality("conocimiento", character.qualities.conocimiento - 15);
        system.setQuality("interes", character.qualities.interes - 5);


      },
      actions: {
        "pedirapuntes": function(character, system, action) {
          system.setCharacterText(
            "<p>Le has pedido apuntes del Tema 8 a Manolo.</p>"
          );
          system.setQuality("conocimiento", character.qualities.conocimiento + 5);
          system.setQuality("interes", character.qualities.interes + 5);
          system.setQuality("tema8", character.qualities.tema8 + 1);

        }
      }



    }

  ),
  faltar2: new undum.SimpleSituation(
    "<p>Hablando por WhatsApp con tu amigo Manolo te dice que se ha puesto a leer diapositivas y no te has perdido gran cosa.</p>\
        <p><a href='./pedirapuntes'>Pedir que te pase los apuntes.</a></p>\
          \
            <p><a href='estudiar'>Continuar historia.</a></p></p>", {
      heading: "Decides faltar el jueves",
      enter: function(character, system, to) {
        system.setCharacterText(
          "<p>Progreso del juego 60%</p>"
        );
        system.setCharacterText(
          "<p>No te has perdido gran cosa.</p>"
        );
        system.setQuality("conocimiento", character.qualities.conocimiento - 10);
        system.setQuality("interes", character.qualities.interes - 10);


      },
      actions: {
        "pedirapuntes": function(character, system, action) {
          system.setCharacterText(
            "<p>Le has pedido apuntes del Tema 9 a Manolo.</p>"
          );
          system.setQuality("conocimiento", character.qualities.conocimiento + 20);
          system.setQuality("interes", character.qualities.interes + 30);
          system.setQuality("tema9", character.qualities.tema9 + 1);

        }
      }


    }

  ),

  voluntario: new undum.SimpleSituation(
    "<p><img src='media/img/libro.png' class='float_right'>Estabas mirando Docencia Virtual tranquilamente y observas que hay una entrega de actividad voluntaria para dentro de cinco horas.\
        <p>Te surje la duda sobre si es obligatorio o no entregarla. Este tipo de actividades casi nunca tienen valor y además pone que es voluntaria.\
        <p>\ <p><a href='voluntario2'>Entregar el ejercicio.</a> </p><p><a href='voluntario1'>No entregar el ejercicio</a>. </p><p><a href='guia'>Mirar detalladamente</a> en la guía docente para salir de dudas.</p></p > ", {
      heading: "Decisión ejercicio voluntario",
      enter: function(character, system, to) {
        system.setCharacterText(
          "<p>Progreso del juego 20%</p>"
        );


        system.setQuality("pasta", character.qualities.pasta - 10);


      },


    }

  ),

  guia: new undum.SimpleSituation(
    "<p>Realización de trabajos, casos o ejercicios | Realización de trabajos casos o ejercicios | Entrega de ejercicios 5.0%</p>\
        <p>Se te presenta una difícil decisión: <a href='voluntario2'>Entregar el ejercicio</a> o <a href='voluntario1'>No entregar el ejercicio</a>.</p>", {
      heading: "Guía docente de la asignatura",
      enter: function(character, system, to) {
        system.setCharacterText(
          "<p>Progreso del juego 22%</p>"
        );
        system.setCharacterText(
          "<p>No te has perdido gran cosa.</p>"
        );
        system.setQuality("conocimiento", character.qualities.conocimiento + 1);


      }


    }

  ),

  voluntario1: new undum.SimpleSituation(
    "<p>Para hacer el ejercicio a prisa prefieres no entregar nada. En más de una asignatura has acabado suspendiendo a pesar de haber entregado los ejercicios voluntarios.</p><p>Además el profesor podría haber avisado.</p>\
        <p><a href='clase'>Continuar.</a></p>", {
      heading: "Decides no entregar ejercicio voluntario",
      enter: function(character, system, to) {
        system.setCharacterText(
          "<p>Progreso del juego 25%</p>"
        );

        system.setQuality("conocimiento", character.qualities.conocimiento - 30);
        system.setQuality("interes", character.qualities.interes - 5);


      }


    }

  ),

  voluntario2: new undum.SimpleSituation(
    "<p>Aunque queda poco y habías quedado para ir al cine decides ponerte a hacer el ejercicio.</p>\
        <p>Aprobar esta asignatura es el pricipal objetivo este año, harás todo lo que esté en tu mano.</p>\
        <p>Quizás si el profesor ve que has entregado todos los ejercicios volutarios te aprueba en caso de duda.</p>\
        <p><a href='clase'>Continuar.</a></p>", {
      heading: "Decides entregar ejercicio voluntario",
      enter: function(character, system, to) {
        system.setCharacterText(
          "<p>Progreso del juego 25%</p>"
        );

        system.setQuality("conocimiento", character.qualities.conocimiento + 40);
        system.setQuality("interes", character.qualities.interes + 1);


      }


    }

  ),

  finaprobado: new undum.SimpleSituation(
    "<p><img src='media/img/aprobado.png' class='float_right'>HAS APROBADO. POR FIN. QUIEN LA SIGUE LA CONSIGUE.</p>", {
      enter: function(character, system, from) {
        system.setCharacterText(
          "<p>Progreso del juego 100%</p>"
        );
		system.setQuality("aprobado", character.qualities.aprobado + 1);

      },

      heading: "Día del Examen"


    }
  ),
  finsuspenso: new undum.SimpleSituation(
    "<p><img src='media/img/suspendo.png' class='float_right'>Has suspendido... pero no pasa nada la vida suele dar <a href='iniciohistoria2'>más oportunidades.</a></p>", {
      enter: function(character, system, from) {
        system.setCharacterText(
          "<p>Progreso del juego 99%</p>"
        );
		system.setQuality("suspenso", character.qualities.suspenso + 1);
		

      },

      heading: "Día del Examen",
	  


    }
  ),

};

// ---------------------------------------------------------------------------
/* SITUACION DE INICIO DEL JUEGO. */
undum.game.start = "inicio";


// ---------------------------------------------------------------------------
/*AQUI SE DEFINEN LAS CUALIDADES DEL PERSONAJE. */
undum.game.qualities = {
  interes: new undum.IntegerQuality(
    "Interés", {
      priority: "0001",
      group: 'status'
    }
  ),
  conocimiento: new undum.IntegerQuality(
    "Conocimiento", {
      priority: "0001",
      group: 'status'
    }
  ),
  pasta: new undum.IntegerQuality(
    "Pasta", {
      priority: "0003",
      group: 'inventario'
    }
  ),
  suspenso: new undum.OnOffQuality(
    "Suspenso", {
      priority: "0001",
      group: 'progreso',
      onDisplay: "&#10003;"
    }
  ),
  aprobado: new undum.OnOffQuality(
    "Aprobado", {
      priority: "0002",
      group: 'progreso',
      onDisplay: "&#10003;"
    }
  ),
  tema2: new undum.OnOffQuality(
    "Apuntes del Tema 2", {
      priority: "0003",
      group: 'progreso',
      onDisplay: "&#10003;"
    }
  ),
  tema8: new undum.OnOffQuality(
    "Apuntes del Tema 8", {
      priority: "0004",
      group: 'progreso',
      onDisplay: "&#10003;"
    }
  ),
  tema9: new undum.OnOffQuality(
    "Apuntes del Tema 9", {
      priority: "0004",
      group: 'progreso',
      onDisplay: "&#10003;"
    }
  ),
};

// ---------------------------------------------------------------------------
/* GRUPOS DE CUALIDADES. */
undum.game.qualityGroups = {
  status: new undum.QualityGroup('Habilidades', {
    priority: "0001"
  }),
  inventario: new undum.QualityGroup('Inventario', {
    priority: "0002"
  }),
  progreso: new undum.QualityGroup('Progreso', {
    priority: "0003"
  })
};

// ---------------------------------------------------------------------------
/* This function gets run before the game begins. It is normally used
 * to configure the character at the start of play. */
undum.game.init = function(character, system) {
  character.qualities.interes = 10;
  character.qualities.conocimiento = 0;
  character.qualities.pasta = 200;
  character.qualities.suspenso = 0;
  character.qualities.aprobado = 0;
  character.qualities.tema2 = 0;
  character.qualities.tema8 = 0;
  character.qualities.tema9 = 0;
  system.setCharacterText("<p>Estado del personaje:</p>");
};
