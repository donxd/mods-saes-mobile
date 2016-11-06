NodeList.prototype.forEach = Array.prototype.forEach;

HTMLElement.prototype.padreAgregaElementoAlFinal = function ( elemento ){
	this.parentNode.appendChild( elemento );
}

HTMLElement.prototype.setTexto = function ( texto ){
	this.innerText = texto;
}

HTMLElement.prototype.ocultar = function (){
	this.classList.add( 'oculto' );
}

HTMLElement.prototype.mostrar = function (){
	this.classList.remove( 'oculto' );
}

function ajustarDisenio (){
	ajustaEstructuraPagina();
	ajustaMenu();
	ajustaEnlaces();
	ajustaElementos();
	ajustaColorFondo();
}

function ajustaEstructuraPagina (){
	// agregaCodificacion();
	ajustaAnchoContenedorPrincipal();
	mueveSeccionesPagina();
	agregaEstilosSecciones();
}

// function agregaCodificacion (){
// 	var codificacion = document.createElement( 'meta' );
// 	codificacion.setAttribute( 'charset', 'utf-8' );
// 	getElemento( 'head' ).appendChild( codificacion );
// }

function ajustaAnchoContenedorPrincipal (){
	getElementos( SELECTOR_CONTENEDOR_PRINCIPAL ).forEach( function ( elemento ){
		elemento.style.width   = '';
		elemento.style.display = 'table';
	});
}

function getElemento ( selector ){
	return document.querySelector( selector );
}

function mueveSeccionesPagina (){
	mueveElemento( SELECTOR_COLUMNA_IZQUIERDA, SELECTOR_CONTENIDO_PRINCIPAL, ANTES_DE );
	mueveElemento( SELECTOR_PIE_PAGINA, SELECTOR_CONTENEDOR_CENTRAL, DENTRO_DE );
	mueveElemento( SELECTOR_CONTENEDOR_NAVEGACION, SELECTOR_CONTENEDOR, ANTES_DE );
}

function mueveElemento ( selectorElemento, selectorDestino, posicion ){
	var elemento = copiarElemento( selectorElemento );
	eliminaElemento( selectorElemento );
	pegarElemento( elemento, selectorDestino, posicion );
}

function copiarElemento ( selectorElemento ){
	var elemento = getElemento( selectorElemento );
	if ( elemento != null ){

		return elemento.cloneNode( true );
	}

	return null;
}

function eliminaElemento ( selectorElemento ){
	var elemento = getElemento( selectorElemento );
	if ( elemento != null ){
		elemento.parentNode.removeChild( elemento );
	}
}

function pegarElemento ( elemento, selectorDestino, posicion ){
	switch ( posicion ){
		case DENTRO_DE  : pegaElementoDentro( elemento, selectorDestino ); break;
		case ANTES_DE   : pegaElementoAntes( elemento, selectorDestino ); break;
		case DESPUES_DE : pegaElementoDespues( elemento, selectorDestino ); break;
	}
}

function pegaElementoDentro ( elemento, selectorDestino ){
	var padre = getElemento( selectorDestino );
	if ( padre != null ){
		padre.appendChild( elemento );
	}
}

function pegaElementoAntes ( elemento, selectorDestino ){
	var elementoHermano = getElemento( selectorDestino );
	if ( elementoHermano != null ){
		elementoHermano.parentNode.insertBefore( elemento, elementoHermano );
	}
}

function pegaElementoDespues ( elemento, selectorDestino ){
	var elementoHermano = getElemento( selectorDestino );
	if ( elementoHermano != null ){

		if ( elementoHermano.nextSibling ){
			elementoHermano.parentNode.insertBefore( elemento, elementoHermano.nextSibling );
		} else {
			elementoHermano.padreAgregaElementoAlFinal( elemento );
		}

	}
}

function agregaEstilosSecciones (){

	getElementos( SELECTOR_COLUMNA_IZQUIERDA ).forEach( function ( elemento ){
		elemento.style.display = 'table-cell';
		elemento.style.verticalAlign = 'top';
	});

	getElementos( SELECTOR_CONTENIDO_PRINCIPAL ).forEach( function ( elemento ){
		elemento.setAttribute( 'style', getEstiloContenidoPrincipal() );
	});

	getElementos( SELECTOR_CONTENEDOR_CONTENIDO_PRINCIPAL ).forEach( function ( elemento ){
		elemento.style.marginLeft = '0px';
	});

	getElementos( SELECTOR_ACCESOS_RAPIDOS ).forEach( function ( elemento ){
		elemento.style.verticalAlign = 'top';
	});

	getElementos( SELECTOR_CONTENEDOR ).forEach( function ( elemento ){
		elemento.removeAttribute( 'style' );
	});

	getElementos( SELECTOR_ELEMENTOS_MENU_SECCIONES ).forEach( function ( elemento ){
		elemento.style.width = '';
	});

	getElementos( SELECTOR_CONTENEDOR_MENU_SECCIONES ).forEach( function ( elemento ){
		elemento.setAttribute( 'style', ' width : initial; ');
	});

	getElementos( SELECTOR_CONTENEDOR_CENTRAL ).forEach( function ( elemento ){
		elemento.setAttribute('style', getEstiloColumnaCentral() );
	});

	getElementos( SELECTOR_CONTENEDOR_NAVEGACION ).forEach( function ( elemento ){
		elemento.setAttribute( 'style', getEstiloContenedorCentral() );
	});

	getElementos( SELECTOR_OPCIONES_SECCIONES ).forEach( function ( elemento ){
		elemento.style.width = '100%';
	});

	getElementos( SELECTOR_CONTENEDOR_DESCENTRALIZADO ).forEach( function ( elemento ){
		if ( elemento.children[ 0 ].nodeName == 'TABLE' ){
			elemento.children[ 0 ].setAttribute( 'style', 'background-color: #FFF; width: 100%;' );
		}
	});

	setTimeout( ajustaEspacioNavegacion, 500 );
}

function getEstiloContenidoPrincipal (){
	return ' display : table-cell; float : none; border-left: 1px solid #FFF; border-right: 1px solid #FFF; min-width: 648px;';
}

function getEstiloColumnaCentral (){
	return 'float : initial; width : initial; margin-left : initial; padding-top : 0px; ';
}

function getEstiloContenedorCentral (){
	return ' position : initial; top : initial; left : initial; font-size : 0.9em; padding : 10px 20px;';
}

function ajustaEspacioNavegacion (){
	var menuSecciones = getElemento( SELECTOR_COLUMNA_IZQUIERDA );
	var navegacion = getElemento( SELECTOR_NAVEGACION );
	if ( navegacion != null && menuSecciones != null ){
		navegacion.setAttribute( 'style', getEstiloNavegacion( menuSecciones ) );
	}
}

function getEstiloNavegacion ( menuSecciones ){
	return 'padding: 0 '
			+ menuSecciones.clientWidth
			+'px; border-bottom: 1px solid #FFF; border-top: 1px solid #990000; background-color: #F2F2F2;';
}

function ajustaMenu (){
	getElementos( SELECTOR_SUBMENU ).forEach( function ( subMenu ){

		subMenu.style.width = 'auto';

		getElementos( '.item.ctl00_subMenu_4' ).forEach( function ( elemento ){
			if ( elemento.children.length == 2 ){
				elemento.children[ 1 ].style.paddingLeft = '20px';
			}
		});

		getElementos( '#ctl00_subMenu br' ).forEach( function ( elemento ){
			elemento.parentNode.removeChild( elemento );
		});

		getElementos( '#ctl00_subMenu img' ).forEach( function ( elemento ){
			elemento.parentNode.removeChild( elemento );
		});

		getElemento( SELECTOR_SUBNAVEGACION ).insertBefore(
			  getElementoEstilosMenu()
			, getElemento( SELECTOR_SUBMENU ).nextSibling
		);

	});
}

function ajustaEnlaces (){
	getElementos( 'a:not([href=""])' ).forEach( function ( elemento ){
	// getElementos( 'a' ).forEach( function ( elemento ){
		if ( elemento != null &&
				elemento.getAttribute( 'href' ) != null && elemento.getAttribute( 'href' ).length > 0 ){

			// elemento.setAttribute( 'style', 'color : #0F0 !important;' );

			// console.log( "enlace : "+ elemento.getAttribute( 'href' ) );
			procesaEnlace( elemento );
		}
	});
}

function procesaEnlace ( enlace ){
	switch ( enlace.getAttribute( 'href' ) ){
		case PAGINA_ETS_PRINCIPAL:
			enlace.setAttribute( 'href', '#' );
			break;
		case PAGINA_REGLAMENTO:
			enlace.setAttribute( 'href', ENLACE_REGLAMENTO  );
			enlace.setAttribute( 'target', '_blank' );
			break;
		case PAGINA_SPA_PRINCIPAL:
			enlace.setTexto( 'SPA' );
			break;
		case PAGINA_SPA_INSCRIPCION:
			enlace.setTexto( 'Inscribir SPA' );
			break;
		case PAGINA_PROFESORES_PRINCIPAL:
			enlace.setTexto( 'Profesores' );
			break;
		case PAGINA_ALUMNOS_GENERAL:
			enlace.setTexto( 'General' );
			break;
		case PAGINA_ALUMNOS_MEDICOS:
			enlace.setTexto( 'Médicos' );
			break;
		case PAGINA_ALUMNOS_DEPORTIVOS:
			enlace.setTexto( 'Deportivos' );
			break;
	}
}

function ajustaElementos (){
	getElementos( SELECTOR_CONTENEDOR_CONTENIDO_PRINCIPAL ).forEach( function ( elemento ){
		elemento.style.display = 'table';
	});
	getElementos( SELECTOR_ACCESOS_RAPIDOS ).forEach( function ( elemento ){
		elemento.style.display = 'table-cell';
		elemento.style.float   = 'none';
	});
}

function ajustaColorFondo (){
	var elemento = getElemento( 'body' );
	elemento.setAttribute(
		  'style'
		, getEstiloFondoPagina()
	);
}

function getEstiloFondoPagina (){
	return 	'text-align: center;'+
			'background-image : none !important;'+
			'background-repeat: initial !important;'+
			'background-color: #802434 !important;'+
			'font-family: Verdana, Geneva, Arial, Helvetica, sans-serif;'+
			'font-size: 0.78em; '
}

function getElementos ( selector ){
	return document.querySelectorAll( selector );
}

function getElementoEstilosMenu (){
	var disenio = document.createElement( 'style' );

	disenio.setAttribute( 'type','text/css' );
	disenio.innerHTML =  '#subnav .item { padding : 0px 7px;	border : none; display : block; }';
	disenio.innerHTML += '#subnav .item a {	width : 100%; display : block; }';
	disenio.innerHTML += '#subnav .selected:hover { background-color: #FF9900; color: #990000; }';
	disenio.innerHTML += '#subnav .hover { background-color: initial; color: #990000; }';
	disenio.innerHTML += '#subnav { margin-bottom: 0px; } ';
	disenio.innerHTML += '.sidebarcontainer { margin : 0px auto } ';

	return disenio;
}

function detectaPantalla (){
	switch ( location.pathname ){
		case PAGINA_INICIO:
		case PAGINA_PRINCIPAL1:
		case PAGINA_PRINCIPAL2:
			detectaIdentificacion();
			break;
		case PAGINA_OCUPABILIDAD:
			pantallaOcupabilidad();
			break;
		case PAGINA_KARDEX:
			pantallaKardex();
			break;
		case PAGINA_EQUIVALENCIAS:
			pantallaEquivalencias();
			break;
		case PAGINA_CALENDARIO_PARCIALES:
			pantallaParcialesCalendario();
			break;
		case PAGINA_INSCRIPCION_ACTUAL_HORARIO:
			pantallaInscripcionActualHorario();
			break;
		case PAGINA_ALUMNOS_MEDICOS:
			pantallaDatosMedicos();
			break;
		case PAGINA_ALUMNOS_DEPORTIVOS:
			pantallaDatosDeportivos();
			break;
		case PAGINA_SPA_INSCRIPCION:
			pantallaIncripcionSpa();
			break;
		case PAGINA_SPA_CALIFICACIONES:
			pantallaCalificacionesSpa();
			break;
		case PAGINA_AGENDA_ESCOLAR:
			pantallaAgendaEscolar();
			break;
		case PAGINA_CALENDARIO_ETS:
		case PAGINA_CALENDARIO_ETS2:
			pantallaCalendarioEts();
			break;
		case PAGINA_ALUMNOS_CALIFICACIONES:
			pantallaCalificaciones();
			break;
		case PAGINA_INICIO_ACCESO:
			// pantallaAlumnosInicio();
			break;
		case PAGINA_MAPA_CURRICULAR:
			// informacionPlanes();
			break;
		case PAGINA_FICHA_REINSCRIPCION:
			pantallaFichaReinscripcion();
			break;
		case PAGINA_COMPROBANTE_HORARIO:
			horarioDirecto();
			break;
		case PAGINA_REINSCRIBIR:
			pantallaReinscribir();
			break;
		case PAGINA_REPORTE_REINSCRIPCION:
			pantallaReporteHorario();
			break;
		case PAGINA_TUTORES_COMENTARIOS:
			pantallaTutoresComentarios();
			break;
		case PAGINA_TUTORES_EVUALUACION:
			pantallaEvaluacionTutores();
			break;
		case PAGINA_HORARIOS:
			pantallaHorarios();
			break;
	}
}

	/*
		case '/Alumnos/Evaluacion_docente/califica_profe.aspx':
		case '/Alumnos/Evaluacion_Docente/Califica_Profe.aspx':
			pantalla_califica_profesor();
			break;
		case '/Alumnos/Evaluacion_docente/evaluacion_profesor.aspx':
		case '/Alumnos/Evaluacion_Docente/evaluacion_profesor.aspx':
			pantalla_evalua_profesor();
			break;
	*/

function getOpcionNavegacionVigente (){
	try {
		if ( androidJs ){

			return androidJs.getOpcionNavegacion();
		}
	} catch ( error ){
	}

	return OPCION_RECARGAR;
}

function detectaIdentificacion (){
	var usuario = getElemento( SELECTOR_USUARIO_IDENTIFICACION );
	var pass    = getElemento( SELECTOR_PASS_IDENTIFICACION );

	if ( usuario != null && pass != null ){
		if ( almacenamientoDatos() ){
			muestraMensajeAlmacenamiento();
			agregaComportamientoControlesIdentificacion( usuario, pass );
			recuperaDatosIdentificacion();
		} else {
			muestraMensajeNoAlmacenamiento();
		}
	}
}

function almacenamientoDatos (){
	return window.localStorage != undefined && window.localStorage != null;
}

function muestraMensajeAlmacenamiento (){
	muestraMensaje( '<br/> Se puede Almacenar' );
}

function muestraMensajeNoAlmacenamiento (){
	muestraMensaje( '<br/> No se puede almacenar' );
}

function muestraMensaje ( mensaje ){
	getElementos( 'h2' ).forEach( function ( elemento ){
		elemento.innerHTML += mensaje;
	});
}

function agregaComportamientoControlesIdentificacion ( usuario, pass ){
	usuario.addEventListener( 'blur', guardaUsuarioIdentificacion, true );
	pass.addEventListener( 'blur', guardaPasswordIdentificacion, true );
}

function guardaUsuarioIdentificacion (){
	guardaInformacionIdentificacion( this.value, IDENTIFICACION_USUARIO );
}

function guardaInformacionIdentificacion ( valor, identificadorAlmacenamiento ){
	if ( valor != null && valor.length > 0 ){
		localStorage.setItem( identificadorAlmacenamiento, valor );
	}
}

function guardaPasswordIdentificacion (){
	guardaInformacionIdentificacion( this.value, IDENTIFICACION_PASSWORD );
}

function recuperaDatosIdentificacion (){
	recuperaUsuarioIdentificacion();
	recuperaPassIdentificacion();
}

function recuperaUsuarioIdentificacion (){
	recuperaDatoIdentificacion( IDENTIFICACION_USUARIO, SELECTOR_USUARIO_IDENTIFICACION );
}

function recuperaDatoIdentificacion ( identificadorAlmacenamiento, selectorControl ){
	var dato  = recuperaDatoAlmacenado( identificadorAlmacenamiento );
	colocaDatoIdentificacion( dato, selectorControl );
}

function colocaDatoIdentificacion ( dato, selectorControl ){
	if ( dato.length > 0 ){
		var controlDato = getElemento( selectorControl );

		if ( controlDato != null ){
			controlDato.value = dato;
		}
	}
}

function recuperaPassIdentificacion (){
	recuperaDatoIdentificacion( IDENTIFICACION_PASSWORD, SELECTOR_PASS_IDENTIFICACION );
}

function recuperaDatoAlmacenado ( identificadorAlmacenamiento ){
	var dato = localStorage.getItem( identificadorAlmacenamiento );
	if ( dato == null ){
		dato = '';
	}

	return dato;
}

function pantallaOcupabilidad (){
	agregaEstilosMostrarOcultar();
	bloqueaEtiquetas();
	deshabilitaFiltros();
	agregaControlesOcupabilidad();
}

function agregaEstilosMostrarOcultar (){
	var elementoEstilo = getElementoEstilos();
	document.getElementsByTagName( 'body' )[ 0 ].appendChild( elementoEstilo );
}

function getElementoEstilos (){
	var estilos = document.createElement( 'style' );
	estilos.innerHTML = '.visible { \
							display : table-row; \
						} \
						.oculto { \
							display : none; \
						} \
						.regresar { \
							text-align : left; \
							padding : 10px 0px 10px 15px; \
							cursor : pointer; \
						} \
						.seccion_controles { \
							width : 100%; \
							background-color : #000; \
						} \
						[name=horariosGenerados] { \
							width : 100%; \
						}';

	return estilos;
}

function bloqueaEtiquetas (){
	getElementos( SELECTOR_ETIQUETA_CARRERA + ' , ' + SELECTOR_ETIQUETA_PLAN ).forEach( function ( elemento ){
		elemento.readOnly = true;
	});
}

function deshabilitaFiltros (){
	if ( getElementos( '[name="ctl00$mainCopy$rblEsquema"]:checked' ).length == 0 ){
		getElementos(
			' #ctl00_mainCopy_Chkespecialidad \
			, #ctl00_mainCopy_ChkSemestre \
			, #ctl00_mainCopy_Chkgrupo \
			, #ctl00_mainCopy_Chkmateria '
		).forEach( function ( elemento ){

			elemento.disabled = true;
		});
	}
}

function agregaControlesOcupabilidad (){
	getElementos( SELECTOR_CONTENEDOR_OCUPABILIDAD ).forEach( function ( elemento ){
		if ( elemento.tBodies.length > 0 && elemento.tBodies[ 0 ].rows.length > 1 ){
			marcaOcupados();
			agregaBuscador( BUSCADOR_OCUPABILIDAD );
		}
	});
}

function marcaOcupados (){
	var id = SELECTOR_CONTENEDOR_OCUPABILIDAD;
	if ( getElemento( SELECTOR_CONTROL_REGISTROS ) != null ){
		id = SELECTOR_CONTROL_REGISTROS;
	}

	var numRegistros = getElemento( id ).rows.length;
	var lugares;
	var registros;

	for ( var i = POSICION_INICIO_REGISTROS; i < numRegistros; i++ ){

		registros = getElemento( id ).rows;
		lugares = parseInt( registros[ i ].cells[ COLUMNA_LUGARES_DISPONIBLES ].innerHTML );

		if ( lugares < 1 ){
			var registro = registros[ i ].cloneNode( true );
			registro.setAttribute( 'style', 'background-color: black; color: white;' );
			registros[ i ].padreAgregaElementoAlFinal( registro );
			registros[ i ].parentNode.deleteRow( i );
			i--;
			numRegistros--;
		}

	}
}

function agregaBuscador ( tipoBuscador ){
	var controlesBuscador = getNuevosControlesBuscador();

	var tipo;
	switch ( tipoBuscador ){
		case BUSCADOR_OCUPABILIDAD:
			tipo = ID_CONTENEDOR_OCUPABILIDAD;
			insertarBotonFiltrarSeleccion( controlesBuscador );
			insertarBotonActualizarOcupabilidad( controlesBuscador );
			break;
		case BUSCADOR_HORARIOS:
			tipo = ID_CONTENEDOR_HORARIOS;
			insertarControlExportarImportar( controlesBuscador );
			break;
	}

	var elemento = document.getElementById( tipo );
	elemento.parentNode.insertBefore( controlesBuscador, elemento );

	if ( tipo == ID_CONTENEDOR_HORARIOS ){
		inicializaControlesHorarios();
	}

	elemento.setAttribute( 'id', ID_CONTENEDOR_REGISTROS );
	inicializar();
}

function getNuevosControlesBuscador (){
	var controlesBuscador = document.createElement( 'div' );
	controlesBuscador
		.innerHTML =
			'<input type="search" placeholder="' + MENSAJE_CONTROL_BUSCAR + '" id="' + ID_CONTROL_BUSCAR + '"/>'+
			'<input type="button" id="' + ID_CONTROL_VER_TODO + '" value="' + MENSAJE_CONTROL_VER_TODO + '">'+
			'&nbsp;<span id="' + ID_CONTROL_CONTADOR + '"></span>&nbsp;';

	return controlesBuscador;
}

function insertarBotonFiltrarSeleccion ( controlesBuscador ){
	var boton = document.createElement( 'input' );
	boton.setAttribute( 'type','button' );
	boton.setAttribute( 'value', CONTROL_FILTRAR_SELECCION );
	boton.addEventListener( 'click', filtraSeleccion, true );

	controlesBuscador.appendChild( boton );
}

function filtraSeleccion (){
	if ( localStorage.horarioMaterias != null && localStorage.horarioMaterias != '' ){

		var listaSeleccion = JSON.parse( localStorage.horarioMaterias );
		if ( listaSeleccion.materias.length > 0 ){

			var registros = getElemento( SELECTOR_CONTROL_REGISTROS ).rows;
			var visibles  = getRegistrosVisiblesSeleccion( listaSeleccion, registros );
			var ocultos   = getRegistrosOcultos( registros, visibles );

			muestraRegistros( visibles, registros );
			ocultaRegistros( ocultos, registros );
			respaldaRegistrosVisibles( visibles );
			contar();

		} else {
			alert( MENSAJE_SIN_SELECCION );
		}

	} else {
		mensajeFiltrado();
	}
}

function getRegistrosVisiblesSeleccion ( listaSeleccion, registros ){
	var visibles = ubicaRegistrosDeLaSeleccion( listaSeleccion, registros );
	visibles = ordenar( visibles );

	return visibles;
}

function ubicaRegistrosDeLaSeleccion ( listaSeleccion, registros ){
	var visibles = new Array();

	for ( var i = 0; i < listaSeleccion.materias.length; i++ ){
		var registroSeleccion = listaSeleccion.materias[ i ];

		for ( var j = POSICION_INICIO_CONTROL_BUSCADOR; j < registros.length; j++ ){
			var registroInformacion = registros[ j ];

			if ( validaGrupoMateriaIguales( registroInformacion, registroSeleccion ) ){
				visibles.push( j );
			}

		}
	}

	return visibles;
}

function validaGrupoMateriaIguales ( registroInformacion, registroSeleccion ){
	return registroInformacion.cells[ COLUMNA_GRUPO ].innerHTML == registroSeleccion.grupo &&
						registroInformacion.cells[ COLUMNA_MATERIA ].innerHTML == registroSeleccion.materia;
}

function ordenar ( datos ){

	var limite = datos.length;
	var k      = parseInt( limite / 2 );

	var i, j, temp;

	while ( k > 0 ){

		for ( i = k; i <= limite-1; i++ ){

			j = i;
			while ( j-k >= 0 ){

				if ( datos[ j ] < datos[ j-k ] ){

					temp = datos[ j ];

					datos[ j ]   = datos[ j-k ];
					datos[ j-k ] = temp;

					j -= k;

				} else {
					break;
				}
			}

		}

		k = parseInt( k / 2 );
	}

	return datos;
}

function getRegistrosOcultos ( registros, visibles ){
	var encontrado;
	var ocultos = new Array();

	for ( var i = POSICION_INICIO_CONTROL_BUSCADOR; i < registros.length; i++ ){
		encontrado =  false;

		for ( var j = 0; !encontrado && j < visibles.length; j++ ){

			if ( i == visibles[ j ] ){
				encontrado = true;
			}

		}

		if ( !encontrado ){
			ocultos.push( i );
		}

	}

	return ocultos;
}

function muestraRegistros ( visibles, registros ){
	for ( var j = 0; j < visibles.length; j++ ){
		registros[ visibles[ j ] ].setAttribute( 'class', 'visible' );
	}
}

function ocultaRegistros ( ocultos, registros ){
	for ( var j = 0; j < ocultos.length; j++ ){
		registros[ ocultos[ j ] ].setAttribute( 'class', 'oculto' );
	}
}

function respaldaRegistrosVisibles ( visibles ){
	document.body.datosVisibles.push( visibles );
}

function contar (){
	document.getElementById( ID_CONTROL_CONTADOR ).innerHTML = getNumeroRegistrosVisibles();
}

function getNumeroRegistrosVisibles (){
	var visibles = document.body.datosVisibles;

	return visibles[ visibles.length-1 ].length + ' / ' + totalRegistros;
}

function mensajeFiltrado (){
	// alert( MENSAJE_SIN_SELECCION_DESCRIPCION );
}

function insertarBotonActualizarOcupabilidad ( controlesBuscador ){
	var boton = document.createElement( 'input' );
	boton.setAttribute( 'type','button' );
	boton.setAttribute( 'value', CONTROL_RECARGAR );
	boton.setAttribute( 'id','boton_recargar' );
	boton.addEventListener( 'click', actualizaOcupabilidad2, true );

	controlesBuscador.appendChild( boton );
}

function actualizaOcupabilidad2 (){
	// location.reload();
	document.getElementById( ID_CONTROL_PLAN_ESTUDIOS ).onchange();
	// androidJs.recargaPagina();
}

function insertarControlExportarImportar ( controlesBuscador ){
	controlesBuscador
		.innerHTML +=
			"<input type='button' id='" + ID_CONTROL_EXPIMP + "' value='" + CONTROL_IMPORTAR + "' title='" + MENSAJE_IMPORTAR + "'/>"+
			"<div id='" + ID_CONTENEDOR_EXPORTAR + "'>"+
				"<input id='" + ID_CONTROL_IMPORTACION + "' type = 'file'/>"+
				"<span class='importar'>" + MENSAJE_IMPORTAR_AREA +"</span>"+
			"</div>";
}

function inicializaControlesHorarios (){
	inicializaAreaImportacion();
	inicializaControlExportacion();
	inicializaControlImportacion();
}

function inicializaAreaImportacion (){
	document.getElementById( ID_CONTROL_EXPIMP ).addEventListener( 'click', muestraExpImp, true );
}

function inicializaControlExportacion (){

	var exportar = document.getElementById( ID_CONTENEDOR_EXPORTAR );
	exportar.classList.add( 'oculto' );
// 	exportar.classList.add( 'fueraImportar' );
// 	// exportar.addEventListener( 'dragstart',moviendo,false);
// 	exportar.addEventListener( 'dragenter',sobreImportar,true );
// 	exportar.addEventListener( 'dragover',colocandoImportar,true );
// 	exportar.addEventListener( 'drop',ingresandoImportar,true );

// 	//document.getElementById( ID_CONTROL_IMPORTACION ).addEventListener("focus",seleccionarContenido,true);
// 	if (localStorage.horarioMaterias != null && localStorage.horarioMaterias != "" && localStorage.horarioMaterias != "null" ){
// 		// document.getElementById( ID_CONTROL_IMPORTACION ).value = localStorage.horarioMaterias;
// 	}

}

function muestraExpImp (){
	var contenedorExportar = document.getElementById( ID_CONTENEDOR_EXPORTAR );
	if ( contenedorExportar.classList.contains( 'oculto' )){
		contenedorExportar.classList.remove( 'oculto' );
		// document.getElementById( ID_CONTROL_IMPORTACION ).focus();
	} else {
		contenedorExportar.ocultar();
	}
}

function inicializaControlImportacion (){
	document.getElementById( ID_CONTROL_IMPORTACION ).addEventListener( 'change', seleccionImportar, true );
}

function seleccionImportar (){
	// validaArchivo( this.files[ 0 ] );
}

var buscador;
var totalRegistros;
var totalColumnas;
var ultimaBusqueda;
var contador;
function inicializar (){
	inicializaControlBuscador();
	inicializaControlDeshacerBusqueda();
	inicializaDatos();
}

function inicializaControlBuscador (){
	buscador = document.getElementById( ID_CONTROL_BUSCAR );

	buscador.columna = 0;
	buscador.addEventListener( 'keyup', buscar, true );
	buscador.addEventListener( 'search', modificaciones, true );
}

function buscar ( lanzador ){

	var evento       = lanzador || window.event;
	var codigoTecla  = evento.charCode || evento.keyCode;
	var textoBuscado = document.getElementById( ID_CONTROL_BUSCAR ).value;

	switch ( codigoTecla ){
		case CODIGO_TECLA_DELETE:
		case CODIGO_TECLA_SUPRIMIR:

			ultimaBusqueda = textoBuscado;
			if ( textoBuscado.length > 0 ){

				var registros = document.getElementById( ID_CONTENEDOR_REGISTROS ).rows;
				var visiblesControl = document.body.datosVisibles;
				visiblesControl.pop();

				var visibles = visiblesControl[ visiblesControl.length-1 ];
				for (var i = 0; i < visibles.length; i++){
					registros[ visibles[i] ].setAttribute( 'class', 'visible' );
				}
				contar();

			} else {
				verTodo();
			}
			break;
		case CODIGO_TECLA_ENTER:
			if ( textoBuscado.length > 0 ){
				buscarTexto( textoBuscado, this.columna );
				//alert("buscarEnter");//buscarTexto
			}
			break;
		case CODIGO_TECLA_ESCAPE:
			buscador.value = '';
			verTodo();
			break;
		//~ case 0: //altg*
		//~ case 16: //shitf-izq*
		//~ case 17: //ctrl*
		//~ case 18: //alt*
		//~ case 20: //mayus*
		//~ case 35: //fin*
		//~ case 36: //inicio*
		//~ case 37: //flecha <*
		//~ case 39: //flecha >*
		//~ case 45: //insert*
		//~ case 91: //super*
		//~ case 93: //menu*
			//~ break;
		default:
			if ( ultimaBusqueda != textoBuscado ){

				ultimaBusqueda = textoBuscado;
				if ( textoBuscado.length > 0 ){
					buscarTexto( textoBuscado, this.columna );
				}
			}
	}

}

function inicializaControlDeshacerBusqueda (){
	document.getElementById( ID_CONTROL_VER_TODO ).addEventListener( 'click', verTodo, true );
}

function verTodo (){
	buscador.value = '';
	verOcultar( document.getElementById( ID_CONTENEDOR_REGISTROS ).rows, 1, 1 );
	//document.body.datosVisibles = new Array();
	while(document.body.datosVisibles.length > 1) document.body.datosVisibles.pop();
	//document.body.datosOcultos = new Array();
	contar();
	ultimaBusqueda = '';
}

function verOcultar ( datos, inicio, opc ){
	var tipo = 'oculto';
	if ( opc != 0 ){
		tipo = 'visible';
	}

	var numeroRegistros = datos.length;
	for ( var i = inicio; i < numeroRegistros; i++ ){
		datos[ i ].setAttribute( 'class', tipo );
	}

	contar();
}

function buscarTexto ( textoBuscado, columna ){
	var limite   = totalColumnas;
	var ocultos  = new Array();
	var visibles = new Array();
	var encontrado;

	if ( columna != 0 ){
		limite = columna+1;
	}

	var registrosVisibles = document.body.datosVisibles[ document.body.datosVisibles.length-1 ];
	var registros = document.getElementById( ID_CONTENEDOR_REGISTROS ).rows;

	//alert('l '+visibles.length);
	for ( var i = 0; i < registrosVisibles.length; i++ ){
		encontrado = false;

		for ( var j = columna; j < limite; j++ ){

			// if (buscarDentro(registros[registrosVisibles[i]].cells[j].innerHTML.toUpperCase(),textoBuscado.toUpperCase())){
			if ( buscarDentro(
					registros[ registrosVisibles[ i ] ].cells[ j ].innerText.toUpperCase(),
						textoBuscado.toUpperCase()
							) ){

				//registros[registrosVisibles[i]].cells[j].style.backgroundColor='blue';
				encontrado = true;
				j = limite;

				visibles.push(
					registros[
						registrosVisibles[ i ]
					].numero
				);
			}
		}

		if ( !encontrado ){
			ocultos.push(
				registros[
					registrosVisibles[ i ]
				].numero
			);
		}

	}

	for (var j = 0; j < ocultos.length; j++){
		registros[ ocultos[ j ] ].setAttribute( 'class','oculto' );
	}

	document.body.datosVisibles.push( visibles );
	//document.body.datosOcultos.push(ocultos);
	contar();
}

function buscarDentro ( palabra, fragmento ){

	var encontrado = false;
	if ( palabra.length >= fragmento.length ){

		var i = palabra.indexOf( fragmento.charAt( 0 ) );
		var limite = palabra.lastIndexOf( fragmento.charAt( fragmento.length-1 ) );

		if ( i != -1 && limite != -1 ){

			if ( fragmento.length < 2 ){
				encontrado = true;
			} else {

				while ( i < limite ){

					if ( ( i+fragmento.length-1 ) < palabra.length ){

						if ( palabra.charAt( i+fragmento.length-1 ) == fragmento.charAt( fragmento.length-1 ) ){

							if ( palabra.substring( i,i+fragmento.length ) == fragmento ){
								encontrado = true;
								//i=limite;
								break;
							}

						}

					}
					i++;

				}

			}

		}

	}

	return encontrado;
}

function modificaciones (){
	if ( this.value.length < 1 ){
		verTodo();
	}
}

function inicializaDatos (){
	document.body.datosVisibles = new Array();
	//document.body.datosOcultos = new Array();
	var registros = document.getElementById( ID_CONTENEDOR_REGISTROS ).rows;

	totalRegistros = registros.length-1;
	totalColumnas  = registros[ 0 ].cells.length;

	enumerarRegistros( registros, 1 );
	contador = document.getElementById( 'contador' );
	buscador.focus();
}

function enumerarRegistros ( datos, inicio ){
	var visibles = new Array();
	var numero = inicio;

	for ( var i = inicio; i <= datos.length-1; i++, numero++ ){
		datos[ i ].setAttribute( 'class', 'visible' );
		datos[ i ].numero = numero;
		visibles.push( numero );

		for ( var j = 0; j < totalColumnas; j++ ){
			datos[ i ].cells[ j ].addEventListener( 'click', seleccion, false );
		}
	}

	document.body.datosVisibles.push( visibles );
	contar();
}

var estadoSeleccion = true;
function seleccion (){
	if ( estadoSeleccion ){
		buscador.value = this.innerText;
		buscarTexto( this.innerText, this.cellIndex );
	}
}

function pantallaKardex (){
	ajustaDisenioKardex();
	agregaTamanioMinimoContenido();
	ajustaDisenioGrupoCalificaciones();
	// informacionHistorico();
}

function ajustaDisenioKardex (){
	document.getElementById( ID_CONTENEDOR_PANEL1 ).removeAttribute( 'style' );

	var contenedorCentral = document.getElementById( ID_CONTENEDOR_CENTRAL );
	if ( contenedorCentral.children.length < 3 ){

		var accesosRapidos = document.getElementById( ID_ACCESOS_RAPIDOS );
		var parteIzquierda = accesosRapidos.cloneNode( true );
		accesosRapidos.parentNode.removeChild( accesosRapidos );
		contenedorCentral.appendChild( parteIzquierda );

		var elementoPiePagina = document.getElementById( ID_PIE_PAGINA );
		var piePagina = elementoPiePagina.cloneNode( true );
		elementoPiePagina.parentNode.removeChild( elementoPiePagina );
		contenedorCentral.appendChild( piePagina );

		var opcionesMenu = document.getElementById( ID_OPCIONES_MENU );
		var parteDerecha = opcionesMenu.cloneNode( true );
		opcionesMenu.parentNode.removeChild( opcionesMenu );
		document.getElementById( ID_CONTENIDO_CENTRAL ).appendChild( parteDerecha );

		ajustaPeriodos();
	}
}

function agregaTamanioMinimoContenido (){
	getElementos( SELECTOR_CONTENEDOR ).forEach( function ( elemento ){
		elemento.setAttribute( 'style', 'min-width: 680px;' );
	});
}

function ajustaDisenioGrupoCalificaciones (){
	getElementos( SELECTOR_GRUPO_CALIFICACIONES ).forEach( function ( elemento ){
		elemento.setAttribute( 'style', 'border-collapse : collapse;' );
	});
}

function informacionHistorico (){
	var salidaInformacionHistorico = 'clave,materia,fecha,periodo,feval,calif\n';
	getElementos( SELECTOR_GRUPO_CALIFICACIONES ).forEach( function ( elemento ){

		if ( elemento.rows[ 0 ].cells[ 0 ].getAttribute( 'colspan' ) == 6 ){
			for ( var j = 2; j <  elemento.rows.length; j++ ){

				if ( elemento.rows[ j ].cells.length > 5 ) {
					salidaInformacionHistorico += "'"+
						elemento.rows[ j ].cells[ 0 ].innerHTML + "','" +
						elemento.rows[ j ].cells[ 1 ].innerHTML + "','" +
						elemento.rows[ j ].cells[ 2 ].innerHTML + "','" +
						elemento.rows[ j ].cells[ 3 ].innerHTML + "','" +
						elemento.rows[ j ].cells[ 4 ].innerHTML + "','" +
						elemento.rows[ j ].cells[ 5 ].innerHTML + "'\n";
				} else {
					salidaInformacionHistorico += "'"+
						elemento.rows[ j ].cells[ 0 ].innerHTML + "','" +
						elemento.rows[ j ].cells[ 1 ].innerHTML + "','" +
						elemento.rows[ j ].cells[ 2 ].innerHTML + "','" +
						elemento.rows[ j ].cells[ 3 ].innerHTML + "','" +
						elemento.rows[ j ].cells[ 4 ].innerHTML + "'\n";
				}

			}
		}

	});

	log( '->' + salidaInformacionHistorico );
}

function log ( mensaje ){
	console.log( mensaje );
}

function pantallaEquivalencias (){
	document.getElementById( ID_CONTENEDOR_EQUIVALENCIAS ).addEventListener( 'DOMSubtreeModified', ajustaEquivalencias, true );
	ajustaPresentacionDatos();
}

function ajustaEquivalencias (){
	getElementos( SELECTOR_TABLA_EQUIVALENCIAS ).forEach( function ( elemento ){
		elemento.style.width = 'auto';
	});

	getElementos( SELECTOR_PRESENTACION_DATOS ).forEach( function ( elemento ){
		elemento.removeAttribute( 'style' );
		elemento.parentNode.removeAttribute( 'style' );
	});
}

function ajustaPresentacionDatos (){
	getElementos( SELECTOR_PRESENTACION_DATOS ).forEach( function ( elemento ){
		elemento.removeAttribute( 'style' );
	});
}

function pantallaParcialesCalendario (){
	if ( getElementos( '[name="ctl00$mainCopy$rdlconsulta"]:checked' ).length == 0 ){
		document.getElementById( ID_CONTROL_PARCIAL ).disabled = true;
	}
}

function pantallaInscripcionActualHorario (){
	ajustaDisenioInscripcionActualHorario();
	retiraSabados();
	conexionDiccionario();
	comentarioRapido();
}

function ajustaDisenioInscripcionActualHorario (){
	document.getElementById( ID_CONTENEDOR_PAGINA )   .style.width = '1200px';
	document.getElementById( ID_CONTENEDOR_CENTRAL )  .style.width = '900px';
	document.getElementById( ID_CONTENIDO_CENTRAL )   .style.width = '900px';
	document.getElementById( ID_SUBCONTENIDO_CENTRAL ).style.width = '900px';

	document.getElementById( ID_CONTENIDO_INFORMACION ).setAttribute( 'style', 'width:820px;' );
	document.getElementById( ID_TABLA_HORARIO_ACTUAL ) .setAttribute( 'id', ID_CONTENEDOR_REGISTROS );
}

var sabadoActivo = false;
function retiraSabados (){
	var tabla = document.getElementById( ID_CONTENEDOR_REGISTROS );

	if ( validaContenidoColumnaSabado( tabla ) ){
		eliminaColumnaDiaSabado( tabla );
	} else {
		sabadoActivo = true;
	}
}

function validaContenidoColumnaSabado ( tabla ){

	for ( var i = POSICION_INICIO_REGISTROS; i < tabla.rows.length; i++ ){
		if ( validaRegistroColumnaSabado( tabla.rows[ i ] ) ){
			return false;
		}
	}

	return true;
}

function validaRegistroColumnaSabado ( registro ){
	var valorColumnaSabado = registro.cells[ COLUMNA_DIA_SABADO ].innerHTML;
	if ( valorColumnaSabado != null ){
		valorColumnaSabado = valorColumnaSabado.trim();
	}

	return valorColumnaSabado.length > 0 && valorColumnaSabado != ESPACIO_HTML;
}

function eliminaColumnaDiaSabado ( tabla ){
	totalColumnas--;
	for ( var i = 0; i < tabla.rows.length; i++ ){
		tabla.rows[ i ].deleteCell( COLUMNA_DIA_SABADO );
	}
}

var destinoConexion = '';
function conexionDiccionario (){
	var plantel = getNombrePlantelPagina();
	switch ( plantel ){
		case 'cecyt1':
		case 'cecyt2':
		case 'cecyt3':
		case 'cecyt4':
		case 'cecyt5':
		case 'cecyt6':
		case 'cecyt7':
		case 'cecyt8':
		case 'cecyt9':
		case 'cecyt10':
		case 'cecyt11':
		case 'cecyt12':
		case 'cecyt13':
		case 'cecyt14':
		case 'cecyt15':
		case 'cet1':
		case 'esimeazc':
		case 'esimecu':
		case 'esimetic':
		case 'esimez':
		case 'esiatec':
		case 'esiatic':
		case 'esiaz':
		case 'cicsma':
		case 'cicsst':
		case 'escasto':
		case 'escatep':
		case 'encb':
		case 'enmh':
		case 'eseo':
		case 'esm':
		case 'ese':
		case 'est':
		case 'upibi':
		case 'upiita':
		case 'escom':
		case 'esfm':
		case 'esiqie':
		case 'esit':
		case 'upiig':
			destinoConexion = 'http://diccionariodemaestros.com/' + plantel +'/';
			break;
		case 'upiicsa':
			destinoConexion = 'http://foroupiicsa.net/diccionario/';
			break;
		default:
			// alert(chrome.i18n.getMessage("campus_not_found"));
			break;
	}
}

function getNombrePlantelPagina (){
	var direccionPagina = location.host;

	return direccionPagina.substring(
		  POSICION_INICIO_NOMBRE_PLANTEL
		, direccionPagina.lastIndexOf( '.ipn' )
	);
}

function comentarioRapido (){
	if ( destinoConexion != '' ){
		insertaControlComentarioRapido();
		agregaEnlacesComentariosRapidos();
		agregaComportamientoEnlacesComentariosRapidos();
	}
}

function insertaControlComentarioRapido (){
	var controlComentarioRapido = getControlComentarioRapido();
	document.body.appendChild( controlComentarioRapido );
}

function getControlComentarioRapido (){
	var controlComentarioRapido = document.createElement( 'form' );

	controlComentarioRapido.setAttribute( 'id'     , ID_CONTROL_COMENTARIO_RAPIDO );
	controlComentarioRapido.setAttribute( 'action' , destinoConexion );
	controlComentarioRapido.setAttribute( 'target' , '_blank' );
	controlComentarioRapido.setAttribute( 'method' , 'POST' );

	controlComentarioRapido
		.innerHTML =
			'<input type="hidden" name="profesor" id="' + ID_COMENTARIO_PROFESOR + '" />' +
			'<input type="hidden" name="materia" id="' + ID_COMENTARIO_MATERIA + '" />';

	return controlComentarioRapido;
}

function agregaEnlacesComentariosRapidos (){
	var enlaces = document.getElementById( ID_CONTENEDOR_REGISTROS );
	var registroTitulos = enlaces.rows[ POSICION_TITULOS ];
	var posicionNuevaColumna = registroTitulos.cells.length;

	agregaColumnaTitulosComentarios( registroTitulos, posicionNuevaColumna );
	generaEnlacesComentariosRapidos( enlaces, posicionNuevaColumna );
}

function agregaColumnaTitulosComentarios ( registroTitulos, posicionNuevaColumna ){
	registroTitulos.insertCell( posicionNuevaColumna );
	registroTitulos.cells[ posicionNuevaColumna ].innerHTML = MENSAJE_COLUMNA_COMENTARIOS;
}

function generaEnlacesComentariosRapidos ( enlaces, posicionNuevaColumna ){
	var registro;
	var nombreProfesor;

	for ( var i = POSICION_INICIO_REGISTROS; i < enlaces.rows.length; i++ ){
		registro = enlaces.rows[ i ];

		registro.insertCell( posicionNuevaColumna );
		nombreProfesor = getNombreProfesor( registro );

		if ( validaNombreProfesor( nombreProfesor ) ){
			agregaEnlaceComentarioRapido( registro, posicionNuevaColumna );
		}
	}
}

function getNombreProfesor ( registro ){
	var nombreProfesor = registro.cells[ COLUMNA_PROFESOR ].innerHTML;
	if ( nombreProfesor != null ){
		nombreProfesor = nombreProfesor.trim();
	}

	return nombreProfesor;
}

function validaNombreProfesor ( nombreProfesor ){
	return nombreProfesor.length > 0 &&
						nombreProfesor != ESPACIO_HTML
}

function agregaEnlaceComentarioRapido ( registro, posicionNuevaColumna ){
	registro.cells[ posicionNuevaColumna ]
		.innerHTML = '<a href="#" name="' + NOMBRE_ELEMENTOS_COMENTARIO_RAPIDO + '">#</a>';
}

function agregaComportamientoEnlacesComentariosRapidos (){
	var enlaces = document.getElementsByName( NOMBRE_ELEMENTOS_COMENTARIO_RAPIDO );
	for ( var i = 0; i < enlaces.length; i++ ){
		enlaces[ i ].addEventListener( 'click', enlaceComentar, true );
	}
}

function enlaceComentar (){
	var posicion = getPosicionEnlace( this );
	var registro = document.getElementById( ID_CONTENEDOR_REGISTROS ).rows[ posicion ];

	document.getElementsByName( 'profesor' )[0].value = registro.cells[ COLUMNA_PROFESOR ].innerHTML;
	document.getElementsByName( 'materia' )[0].value  = registro.cells[ COLUMNA_MATERIA2 ].innerHTML;
	document.getElementById( ID_CONTROL_COMENTARIO_RAPIDO ).submit();
}

function getPosicionEnlace ( enlace ){
	return enlace.parentNode.parentNode.rowIndex;
}

function pantallaDatosMedicos (){
	document.getElementById( ID_CONTENIDO_INFORMACION ).removeAttribute( 'style' );
}

function pantallaDatosDeportivos (){
	getElementos( SELECTOR_CONTROL_DEPORTE + ', ' + SELECTOR_CONTROL_COMPETENCIA )
		.forEach( function ( elemento ){
			elemento.style.width = '';
		});

	ajustaPresentacionDatos();
}

function pantallaIncripcionSpa (){
	agregaTamanioMinimoContenido2();
}

function agregaTamanioMinimoContenido2 (){
	getElementos( SELECTOR_CONTENEDOR_CENTRAL ).forEach( function ( elemento ){
		elemento.setAttribute( 'style', 'width: 680px;' );
	});
}

function pantallaCalificacionesSpa (){
	agregaTamanioMinimoContenido2();
}

function pantallaAgendaEscolar (){
	ajustaTamanioAgenda();
}

function ajustaTamanioAgenda (){
	getElementos( SELECTOR_CONTENEDOR_AGENDA ).forEach( function ( elemento ){
		elemento.setAttribute( 'style', 'height:350px; overflow:auto; ' );
	});

	getElementos( SELECTOR_TABLA_AGENDA ).forEach( function ( elemento ){
		elemento.setAttribute( 'style', getEstiloTablaAgenda() );
	});
}

function getEstiloTablaAgenda (){
	return 	'color : #000;'+
			'background-color : #FFF;'+
			'border-color : #DEDFDE;'+
			'border-width : 1px;'+
			'border-style : solid;'+
			'border-collapse : collapse; ';
}

function pantallaCalendarioEts (){
	ajustaControlesCalendarioEts();
}

function ajustaControlesCalendarioEts (){
	getElementos( SELECTOR_CONTENEDOR_CONTROLES_ETS ).forEach( function ( elemento ){
		elemento.setAttribute( 'style', 'text-align: left;' );
	});

	getElementos( SELECTOR_ETIQUETAS_CONTROLES_ETS ).forEach( function ( elemento ){
		elemento.readOnly = true;
		elemento.setAttribute( 'style', getEstiloCalendarioETS() );
	});
}

function getEstiloCalendarioETS (){
	return 	'background-color: rgba(0,0,0,0);'+
			'border: none;'+
			'-moz-user-select: -moz-none;'+
			'-khtml-user-select: none;'+
			'-webkit-user-select: none;'+
			'-ms-user-select: none;'+
			'user-select: none; ';
}

function pantallaCalificaciones (){
	agregaTamanioMinimoContenido();
}

function pantallaAlumnosInicio (){
	var boleta = document.getElementById( ID_CONTENEDOR_BOLETA );
	// document.cookie = 'boleta='+boleta.innerText+';path=/';
}

function informacionPlanes (){

	var materia;
	var informacion = { materias : [] };
	var registros = document.getElementById( ID_CONTROL_MAPA_CURRICULAR );

	if ( registros != null ){

		for ( var i = POSICION_INICIO_REGISTROS; i < registros.rows.length; i++ ){
			materia = registros.rows[ i ].cells[ COLUMNA_NOMBRE_ASIGNATURA ].innerHTML;
			informacion.materias.push( materia );
		}

	}
	// log("informacionPlanes******\n"+JSON.stringify(informacion));
}

function pantallaFichaReinscripcion (){
	document.querySelector( SELECTOR_CONTENEDOR_FICHA_REINSCRIPCION ).removeAttribute( 'style' );
	agregaTamanioMinimoContenido();
}

function horarioDirecto (){
	enviaPeticionCreacionHorario();
	agregaTamanioMinimoContenido();
	agregaEnlaceHorarioDirecto();
	ajustaPresentacionDatos();
}

var peticion_http = null;
function enviaPeticionCreacionHorario (){
	peticion_http = inicializaXHR();

	peticion_http.onreadystatechange = procesaRespuestaCreacionHorario;
	peticion_http.open( 'GET', getPaginaGeneradoraComprobanteHorario(), true );
	peticion_http.send( '' );
}

function procesaRespuestaCreacionHorario (){
	if ( validaRespuestaPeticion( peticion_http ) ){
		log( 'Horario - generado' );
	}
}

function validaRespuestaPeticion ( peticion ){
	return peticion.readyState == READY_STATE_COMPLETE &&
					peticion.status == ESTADO_HTTP_OK;
}

function getPaginaGeneradoraComprobanteHorario (){
	return location.protocol+'//'+location.host+'/Alumnos/Reinscripciones/Reporte_Horario.aspx';
}

function inicializaXHR (){
	return new XMLHttpRequest();
}

function agregaEnlaceHorarioDirecto (){
	getElementos( SELECTOR_CONTROL_COMPROBANTE ).forEach( function ( elemento ){
		var boton = getCopiaBoton( elemento );
		var boleta = getBoletaAlumno();
		var enlace = creaEnlaceComprobanteDirecto( boton, boleta );

		elemento.parentNode.replaceChild( enlace, elemento );
	});
}

function getCopiaBoton ( botonOriginal ){
	var boton = botonOriginal.cloneNode( true );
	boton.setAttribute( 'type', 'button' );

	return boton;
}

function getBoletaAlumno (){
	return document.getElementById( ID_CONTENEDOR_BOLETA ).innerText;
}

function creaEnlaceComprobanteDirecto ( boton, boleta ){
	var enlace = document.createElement( 'a' );
	enlace.setAttribute( 'href', getEnlaceComprobanteDirecto( boleta ) );
	// enlace.setAttribute( 'target','_blank' );
	enlace.appendChild( boton );

	return enlace;
}

function getEnlaceComprobanteDirecto ( boleta ){
	return 'http://docs.google.com/gview?embedded=true&url='+
				location.protocol + '//' + location.host + '/PDF/Alumnos/Reinscripciones/' + boleta + '-ComprobanteHorario.pdf';
}

function pantallaReinscribir (){

	var controlHorariosVigentes      = document.getElementById( ID_CONTROL_HORARIOS_VIGENTES );
	var controlHorariosSeleccionados = document.getElementById( ID_CONTROL_HORARIOS_SELECCIONADOS );

	if ( controlHorariosVigentes != null && controlHorariosSeleccionados != null ){

		agregaControlContadorInscripcion();

		agregaComportamientoControlHorariosVigentes( controlHorariosVigentes );
		agregaComportamientoControlHorariosSeleccionados( controlHorariosSeleccionados );

		expandirHorarios2();
		expandirHorarios1();
		// cuentaMateriasInscripcion();
		ajustaPantallaReinscribir();

	} else {
		agregaTamanioMinimoContenido();
	}
}

function agregaControlContadorInscripcion (){
	var contadorInscripcion = creaControlContadorInscripcion();
	document.getElementById( ID_TABLA_HORARIO_ACTUAL ).padreAgregaElementoAlFinal( contadorInscripcion );
}

function creaControlContadorInscripcion (){
	var contadorInscripcion = document.createElement( 'div' );

	contadorInscripcion.setAttribute( 'id', ID_CONTADOR_ASIGNATURAS_INSCRIPCION );
	contadorInscripcion.style.float = 'right';
	contadorInscripcion.innerHTML = '<br/>0';

	return contadorInscripcion;
}

function agregaComportamientoControlHorariosVigentes ( controlHorariosVigentes ){
	controlHorariosVigentes.addEventListener( 'DOMSubtreeModified', tiempoHorarios2, true );
}

function agregaComportamientoControlHorariosSeleccionados ( controlHorariosSeleccionados ){
	controlHorariosSeleccionados.addEventListener( 'DOMSubtreeModified', tiempoHorarios1, true );
}

function tiempoHorarios2 (){
	setTimeout( 'expandirHorarios2()', TIEMPO_ACTUALIZACION_REINSCRIBIR );
}

function tiempoHorarios1 (){
	setTimeout( 'expandirHorarios1()', TIEMPO_ACTUALIZACION_REINSCRIBIR );
}

function expandirHorarios2 (){
	ajustaReinscripcionPanel1();
	ajustaHorarioActual();
	cuentaMateriasInscripcion();
}

function ajustaReinscripcionPanel1 (){
	var horarioNuevo = document.getElementById( ID_CONTENEDOR_PANEL1 );

	horarioNuevo.style.height 	= '';
	horarioNuevo.style.width 	= '';
	horarioNuevo.style.overflow = '';
}

function ajustaReinscripcionPanel2 (){
	var horariosDisponibles = document.getElementById( ID_CONTENEDOR_PANEL2 );

	horariosDisponibles.style.height 	= '';
	horariosDisponibles.style.width 	= '900px';
	horariosDisponibles.style.overflow 	= '';
}

function ajustaHorarioActual (){
	document.getElementById( ID_TABLA_HORARIO_ACTUAL ).style.width = '900px';
}

function cuentaMateriasInscripcion (){

	var materiasPorInscribir = document.getElementById( ID_TABLA_HORARIO_ACTUAL );
	var numeroMaterias = materiasPorInscribir.rows.length - 1;
	if ( numeroMaterias == 1 &&
			materiasPorInscribir.rows[ 1 ].cells[ COLUMNA_AJUSTAR_NOMBRE_1 ].innerHTML == ESPACIO_HTML ){

		numeroMaterias = 0;
	}

	var contadorInscripcion = document.getElementById( ID_CONTADOR_ASIGNATURAS_INSCRIPCION );
	actualizaContadorInscripcion( contadorInscripcion, numeroMaterias );
}

function actualizaContadorInscripcion ( contadorInscripcion, numeroMaterias ){
	contadorInscripcion.innerHTML = '<br/>' + numeroMaterias;
}

function expandirHorarios1 (){
	ajustaReinscripcionPanel2();
	ajustaHorarioPanel2();
}

function ajustaHorarioPanel2 (){
	document.getElementById( ID_TABLA_HORARIO_ACTUAL2 ).style.width = '900px';
}

function ajustaPantallaReinscribir (){
	document.getElementById( ID_CONTENEDOR_PAGINA ).style.width    = '1300px';
	document.getElementById( ID_CONTENEDOR_CENTRAL ).style.width   = '1000px';
	document.getElementById( ID_CONTENIDO_CENTRAL ).style.width    = '1000px';
	document.getElementById( ID_SUBCONTENIDO_CENTRAL ).style.width = '1000px';

	var elemento = document.getElementById( ID_CONTENEDOR_ELEMENTO );
	elemento.style.width  = '';
	elemento.style.height = '';
}

function pantallaReporteHorario (){
	agregaTamanioMinimoContenido();
}

function pantallaTutoresComentarios (){
	agregaTamanioMinimoContenido();
}

function pantallaEvaluacionTutores (){
	if ( evaluacionTutores() ){
		document.getElementById( ID_CONTROL_CUESTIONARIO_TUTORES ).removeAttribute( 'style' );
	}
	agregaTamanioMinimoContenido();
}

function evaluacionTutores (){
	return document.getElementById( ID_CONTROL_EVALUACION_TUTORES ) != null;
}

function pantallaHorarios (){

	if ( hayInformacionHorarios() ){

		agregaEstilosMostrarOcultar();
		document.getElementById( ID_CONTENEDOR_PANEL1 ).removeAttribute( 'style' );
		agregaBuscador( BUSCADOR_HORARIOS );
		retiraSabados();
		conexionDiccionario();
		seleccionMaterias();
		cargarMateriasHorario();
		seleccionOptativas();
		cargarOptativas();
		inicializarOrdenamiento();
		verComentarios();
		cargarHorariosGenerados();
		cargarTraslapes();
		// informacionExtra();

	}

}

function hayInformacionHorarios (){

	var controlHorarios = document.getElementById( ID_CONTENEDOR_HORARIOS );

	return controlHorarios != null &&
				controlHorarios.tBodies.length > 0 &&
						controlHorarios.tBodies[ 0 ].rows.length > 0;
}

function seleccionMaterias (){
	agregaControlVisibilidadSeleccionMaterias();
	agregaControlesSeleccionMaterias();
}

function agregaControlVisibilidadSeleccionMaterias (){
	var mostrarMateriasHorario = getControlVisibilidadSeleccionMaterias();
	document.getElementById( ID_CONTROL_CONTADOR ).padreAgregaElementoAlFinal( mostrarMateriasHorario );
}

function getControlVisibilidadSeleccionMaterias (){
	var mostrarMateriasHorario = document.createElement( 'input' );

	mostrarMateriasHorario.type  = 'button';
	mostrarMateriasHorario.value = MENSAJE_MOSTRAR_SELECCION;

	mostrarMateriasHorario.setAttribute( 'id', 'mostrarMateriasHorario' );
	mostrarMateriasHorario.addEventListener( 'click', mostrarHorario, true );

	return mostrarMateriasHorario;
}

function mostrarHorario (){
	//verifica que antes tenga algunos datos para mostrar
	if ( atajoHorarios ){
		document.getElementById( ID_CONTENEDOR_MATERIAS_SELECCIONADAS ).removeAttribute( 'class' );
	}
}

function agregaControlesSeleccionMaterias (){
	ajustaHorariosDisponibles();
	agregaControlesMateriasSeleccionadas();
	agregaComportamientoControlesSeleccionMaterias();
}

function ajustaHorariosDisponibles (){
	var tabla = document.getElementById( ID_CONTENEDOR_REGISTROS );
	var posicion = tabla.rows[ 0 ].cells.length;

	ajustaTituloHorariosDisponibles( tabla, posicion );
	agregaControlesSeleccionMateriasDisponibles( tabla, posicion );
}

function ajustaTituloHorariosDisponibles ( tabla, posicion ){
	tabla.rows[ 0 ].insertCell( posicion );
	tabla.rows[ 0 ].cells[ posicion ].innerHTML = '#';
}

function agregaControlesSeleccionMateriasDisponibles ( tabla, posicion ){
	var control;
	var controlSeleccion = getControlSeleccion();

	for (var i = POSICION_INICIO_REGISTROS; i < tabla.rows.length; i++){
		tabla.rows[ i ].insertCell( posicion );

		control = getControlSeleccionInicializado( controlSeleccion, i );
		tabla.rows[ i ].cells[ posicion ].appendChild( control );
	}
}

function getControlSeleccion (){
	var controlSeleccion   = document.createElement( 'input' );
	controlSeleccion.type  = 'checkbox';
	controlSeleccion.title = MENSAJE_AGREGAR_MATERIA;
	controlSeleccion.setAttribute( 'class','tooltip' );

	return controlSeleccion;
}

function getControlSeleccionInicializado ( controlSeleccion, identificador ){
	var control = controlSeleccion.cloneNode( true );

	control.numero = identificador;
	control.addEventListener( 'click', seleccionOpcion, true );

	return control;
}

var materiasHorario = { materias : [] };
function seleccionOpcion (){
	var numeroDias = NUMERO_DIAS_HORARIO;
	var tabla = document.getElementById( ID_CONTENEDOR_REGISTROS );
	var registroSeleccionado = getInformacionRegistro( tabla, this );

	if ( seleccionAgregar( this ) ){
		agregaRegistroSeleccion( registroSeleccionado, this.numero );
	} else {
		eliminarRegistroSeleccion( registroSeleccionado );
	}
	removerMarcaResaltado();
	visiualizacionSabado( numeroDias );
}

function getControlEstadoMateria() {
	var estadoMateria = document.createElement( 'input' );

	estadoMateria.type 	= 'checkbox';
	estadoMateria.title = MENSAJE_DESCRIPCION_CONTROL_ARMA_HORARIOS;
	estadoMateria.name 	= NOMBRE_CONTROL_ESTADO_MATERIA;
	estadoMateria.checked = true;

	estadoMateria.addEventListener( 'change', cambiarEstadoSeleccion, true );

	return estadoMateria;
}

function cambiarEstadoSeleccion (){

	var n = materiasHorario.materias.length;
	var grupo   = this.parentNode.parentNode.cells[ 0 ].innerHTML;
	var materia = this.parentNode.parentNode.cells[ 1 ].innerHTML;

	for ( var i = 0; i < n; i++ ){

		if ( materiasHorario.materias[ i ].grupo == grupo &&
			 materiasHorario.materias[ i ].materia == materia ){

			materiasHorario.materias[ i ].estado = this.checked;
			guardarMateriasHorario();
			break;
		}

	}
}

function guardarMateriasHorario (){
	// log("totalGuardadoFinal :"+materiasHorario.materias.length);
	if ( materiasHorario.materias.length != 0 ){
		localStorage.horarioMaterias = JSON.stringify( materiasHorario );
	}
}

function agregaRegistroSeleccion ( registroSeleccionado, numero ){
	var tabla = document.getElementById( ID_CONTENEDOR_REGISTROS );

	var grupo    = tabla.rows[ numero ].cells[ COLUMNA_GRUPO ].innerHTML;
	var nombre   = tabla.rows[ numero ].cells[ COLUMNA_NOMBRE_ASIGNATURA2 ].innerText;
	var profesor = tabla.rows[ numero ].cells[ COLUMNA_PROFESOR ].innerText;

	var i = POSICION_INICIO_REGISTROS;

	var dias = getDiasSemana();
	var horasSeguimiento = new Array(); //horas combinación

	// var horas,rango;
	// var j, n, celdaInicioHorario = 5, horaDeInicioHorario = 7;

	var posicion = tabla.rows[ i ].cells.length-1;
	calculaHorasSeguimiento( horasSeguimiento, tabla, registroSeleccionado.grupo, registroSeleccionado.nombre, dias );

	// ---------------
	// // encontrar los elementos de la misma materia y secuencia
	// // for (;i < tabla.rows.length && grupo == tabla.rows[i].cells[0].innerHTML; i++){
	// for (;i < tabla.rows.length; i++){
	// 	// if ((destinoConexion != "" && nombre == tabla.rows[i].cells[1].firstChild.innerHTML) || nombre == tabla.rows[i].cells[1].innerHTML){
	// 	if (grupo == tabla.rows[i].cells[0].innerHTML && nombre == tabla.rows[i].cells[1].innerText){
	// 		tabla.rows[i].cells[posicion].firstChild.checked = true;
	// 		var cambioDia = 0;
	// 		for (j = celdaInicioHorario; j < posicion; j++){
	// 			//verificacion de si existe una hora asignada
	// 			if (tabla.rows[i].cells[j].innerHTML != ESPACIO_HTML ){
	// 				horas = tabla.rows[i].cells[j].innerHTML;
	// 				horas = horas.replace("/\s+/g","");
	// 				horas = horas.replace(/:/g,".");
	// 				rango = new Array();

	// 				//generacion de los bloques apartir de la hora asignada
	// 				rango = horas.split("-");
	// 				for (n = 0; n < 2; n++){
	// 					rango[n] = parseFloat(rango[n]);
	// 					rango[n] += 0.2;
	// 					if (rango[n]%0.5 != 0) rango[n] = parseInt(rango[n]);
	// 					rango[n] -= horaDeInicioHorario;
	// 				}
	// 					// log("R1\nrango[0] : "+rango[0]+"\nrango[1] : "+rango[1]);
	// 				rango[1] = ((rango[1]-rango[0])*2)-1+(rango[0]*2)+cambioDia;
	// 				rango[0] = (rango[0]*2)+cambioDia;
	// 					// log("R2\nrango[0] : "+rango[0]+"\nrango[1] : "+rango[1]);

	// 				var encontrarInicio = false;

	// 				//se buscan intersecciones entre los rangos de los bloques
	// 				for (n = 0 ;n < horasSeguimiento.length; n++){
	// 					if (rango[0] == horasSeguimiento[n]){
	// 						// log("->CB-A : "+horasSeguimiento[n]);
	// 						encontrarInicio = true;
	// 						//busca los elementos continuos de la secuencia de los bloques
	// 						for (n++; n < horasSeguimiento.length; n++){
	// 							log("-"+(horasSeguimiento[n-1]+1)+"!="+horasSeguimiento[n]+"?");
	// 							if ((horasSeguimiento[n-1]+1) != horasSeguimiento[n]){
	// 								break;
	// 							}
	// 						}
	// 						// log("+"+horasSeguimiento[n-1]+"!="+rango[1]+"?");
	// 						if (horasSeguimiento[n-1] != rango[1]){
	// 							if (horasSeguimiento[n-1] < rango[1]){
	// 								// log("n = "+(horasSeguimiento[n-1]+1));
	// 								for (n = horasSeguimiento[n-1]+1; n <= rango[1]; n++) horasSeguimiento.push(n);
	// 								if (dias[j-celdaInicioHorario] != ESPACIO_HTML ){
	// 									// log("agregando la celda");
	// 									dias[j-celdaInicioHorario] += ","+tabla.rows[i].cells[j].innerHTML;
	// 								}
	// 								else dias[j-celdaInicioHorario] = tabla.rows[i].cells[j].innerHTML;
	// 							}
	// 						}
	// 					}
	// 				}

	// 				if ( !encontrarInicio ){

	// 					// log("->CB-N");
	// 					//guardando los rangos originales y bloques
	// 					for ( n = rango[0]; n <= rango[1]; n++ ){
	// 						horasSeguimiento.push( n );
	// 					}

	// 					if ( dias[ j-celdaInicioHorario ] != ESPACIO_HTML ){
	// 						dias[ j-celdaInicioHorario ] += ","+ tabla.rows[i].cells[j].innerHTML;
	// 					} else {
	// 						dias[ j-celdaInicioHorario ] = tabla.rows[i].cells[j].innerHTML;
	// 					}

	// 				}

	// 			}
	// 			cambioDia += 30;
	// 		}
	// 	}
	// }
	//---------------

	//guardando información recopilada
	horasSeguimiento = ordenar( horasSeguimiento );
	var asignaturaH  = { materia : nombre, profe: profesor, grupo : grupo, horas : horasSeguimiento, dias : dias, estado : true };
	materiasHorario.materias.push(asignaturaH);

	//insertando en la lista de la selección
	var asignaturasTabla = document.getElementById( ID_TABLA_ASIGNATURAS );
	asignaturasTabla.insertRow( asignaturasTabla.rows.length );

	var materiaH = asignaturasTabla.rows[ asignaturasTabla.rows.length-1 ];
	materiaH = construyeRegistroSeleccion( materiaH );

	materiaH.cells[ COLUMNA_GRUPO ].innerHTML    = asignaturaH.grupo;
	materiaH.cells[ COLUMNA_MATERIA2 ].innerHTML = asignaturaH.materia;

	var quitarMateria = getControlEliminarMateria();
	agregaComportamientoControlEliminarMateria( quitarMateria );

	materiaH.cells[ NUMERO_CELDAS-2 ].appendChild( quitarMateria );

	var estadoMateria = getControlEstadoMateria();
	materiaH.cells[ NUMERO_CELDAS-1 ].appendChild( estadoMateria );

	if ( destinoConexion != '' ){
		var enlaceDiccionario = getEnlaceDiccionario( asignaturaH );
		materiaH.cells[ 2 ].appendChild( enlaceDiccionario );
	} else {
		materiaH.cells[ 2 ].innerHTML = asignaturaH.profe;
	}

	for ( j = 0; j < NUMERO_DIAS_HORARIO; j++ ){
		materiaH.cells[ 3+j ].innerHTML = dias[ j ];
	}

	materiaH.cells[  NUMERO_CELDAS-3  ].setAttribute( 'name', 'sabado' );

	actualizaTotalSeleccion(1);

	//habilitando visualización de la lista de selección
	document.getElementById( ID_LISTA_SELECCION ).style.display = '';
	activarAtajos();
	//respaldando selección
	guardarMateriasHorario();
	agregarOptativa( nombre );
}

function getControlEliminarMateria (){
	var quitarMateria = document.createElement( 'img' );

	quitarMateria.src = getUrlImagenBorrar();
	quitarMateria.style.cursor = 'pointer';
	quitarMateria.title = MENSAJE_REMOVER_SELECCION;

	return quitarMateria;
}

function agregaComportamientoControlEliminarMateria ( elemento ){
	elemento.addEventListener( 'click', removerMateria, true );
}

function getUrlImagenBorrar (){
	return 'http://i.imgur.com/XUH5haP.png';
}


function activarAtajos (){
	atajoHorarios = true;
}

function construyeRegistroSeleccion ( materiaH ){
	var cantidadCeldas = NUMERO_CELDAS;

	materiaH.insertCell( POSICION_INICIAL );
	materiaH.cells[ POSICION_INICIAL ].setAttribute( 'colspan', cantidadCeldas );

	materiaH.cells[ POSICION_INICIAL ]
		.innerHTML =
			"<div name='"+ NOMBRE_CONTENEDOR_REGISTROS +"'><table><tr name='"+ NOMBRE_REGISTRO +"'></tr></table></div>";

	var celdaContenedor = materiaH.cells[ POSICION_INICIAL ].children[ 0 ];

	// var eventoDragStart = 'dragstart';
	// var eventoDragEnter = 'dragenter';
	// var eventoDragOver  = 'dragover';
	// var eventoDragLeave = 'dragleave';
	// var eventoDrop      = 'drop';
	// var eventoDragEnd   = 'dragend';

	var eventoDragStart = 'touchstart';
	var eventoDragEnter = 'touchenter';
	var eventoDragOver  = 'dragover';
	var eventoDragLeave = 'touchleave';
	var eventoDrop      = 'drop';
	var eventoDragEnd   = 'touchend';

	celdaContenedor.addEventListener( eventoDragStart, moviendo, false );
	celdaContenedor.addEventListener( eventoDragEnter, sobre, false );
	celdaContenedor.addEventListener( eventoDragOver, colocando, false );
	// celdaContenedor.addEventListener( eventoDragLeave, saliendo, false );
	celdaContenedor.addEventListener( eventoDrop, ingresando, false );
	celdaContenedor.addEventListener( eventoDragEnd, soltando, false );
	celdaContenedor.setAttribute( 'draggable', true );
	celdaContenedor.className = 'fuera';

	materiaH = materiaH.cells[ POSICION_INICIAL ].querySelector( SELECTOR_REGISTROS );

	for ( var j = 0; j < cantidadCeldas; j++ ){
		materiaH.insertCell( j );
	}

	return materiaH;
}

var posicionRegistroSeleccionado;
function moviendo ( evento ){
	this.style.opacity = '0.4';
	posicionRegistroSeleccionado = this.parentNode.parentNode.rowIndex-1;
	evento.dataTransfer.effectAllowed = 'move';
// 		evento.dataTransfer.setData('text/html', this.innerHTML);
}

function sobre ( evento ){
	var registros = document.querySelectorAll( SELECTOR_MATERIAS_SELECCIONADAS );

	for ( var i = 0; i < registros.length; i++ ){
		// registros[i].className = 'fuera';
		registros[ i ].classList.remove( 'sobre' );
		registros[ i ].classList.add( 'fuera' );
	}
	// this.className = 'sobre';
	this.classList.remove( 'fuera' );
	this.classList.add( 'sobre' );

	return false;
}

function colocando ( evento ){
	this.style.opacity = '1';
	evento.dataTransfer.dropEffect = 'move';

	if ( evento.preventDefault ){
		evento.preventDefault();
	}

	return false;
}

function saliendo ( evento ){
	// this.classList.remove('sobre');
	// this.classList.remove('fuera');
	return false;
}

function ingresando ( evento ){
	if ( evento.stopPropagation ){
		evento.stopPropagation();
	}

	var posicionCambio = this.parentNode.parentNode.rowIndex-1;
	var registros = document.querySelectorAll( SELECTOR_MATERIAS_SELECCIONADAS );

	if ( posicionRegistroSeleccionado != posicionCambio ){

		var temp = registros[ posicionRegistroSeleccionado ].children[ 0 ].rows[ 0 ].cloneNode( true );
		var i, j, inicio = 0, fin = 9, check = 10;

		if ( posicionRegistroSeleccionado > posicionCambio ){

			for ( i = posicionRegistroSeleccionado; i > posicionCambio; i-- ){

				for ( j = inicio; j < fin; j++ ){
					registros[ i ].children[ 0 ].rows[ 0 ].cells[ j ].innerHTML =
						registros[ i-1 ].children[ 0 ].rows[ 0 ].cells[ j ].innerHTML;
				}
				registros[ i ].children[ 0 ].rows[ 0 ].cells[ check ].children[ 0 ].checked =
					registros[ i-1 ].children[ 0 ].rows[ 0 ].cells[ check ].children[ 0 ].checked;
			}

		} else {

			for ( i = posicionRegistroSeleccionado; i < posicionCambio; i++ ){

				// console.log(i+"/"+posicionCambio+":"+registros.length);
				for ( j = inicio; j < fin; j++ ){
					registros[ i ].children[ 0 ].rows[ 0 ].cells[ j ].innerHTML =
						registros[ i+1 ].children[ 0 ].rows[ 0 ].cells[ j ].innerHTML;
				}
				registros[ i ].children[ 0 ].rows[ 0 ].cells[ check ].children[ 0 ].checked =
					registros[ i+1 ].children[ 0 ].rows[ 0 ].cells[ check ].children[ 0 ].checked;
			}
		}

		for ( j = inicio; j < fin; j++ ){
			registros[ i ].children[ 0 ].rows[ 0 ].cells[ j ].innerHTML = temp.cells[ j ].innerHTML;
		}

		registros[ i ].children[ 0 ].rows[ 0 ].cells[ check ].children[ 0 ].checked =
			temp.cells[ check ].children[ 0 ].checked;

		//remarcar los resaltados
		removerResaltado();
		agregaResaltado();
	}
	actualizaMaterias();

	return false;
}

function agregaResaltado (){
	// log("agregaResaltado\t\t1");
	var registros = document.querySelectorAll( SELECTOR_REGISTROS_RESALTADOS );
	for ( var i = 0; i < registros.length; i++ ){
		// log("agregaResaltado\t\t1.5");
		registros[ i ].parentNode.parentNode.parentNode.parentNode.parentNode.classList.add( 'resaltar' );
	}
	// log("agregaResaltado\t\t2");
}

function actualizaMaterias (){
	var i,j;
	var materiasOrdenadas =  new Array();
	var materiasSeleccion = document.querySelectorAll( SELECTOR_MATERIAS_SELECCIONADAS );

	for ( i = 0; i < materiasSeleccion.length; i++ ){

		for ( j = 0; j < materiasHorario.materias.length; j++ ){

			var registroSeleccion = materiasSeleccion[ i ].children[ 0 ].rows[ 0 ];
			var registroAlmacenado = materiasHorario.materias[ j ];

			if ( registroSeleccion.cells[ 0 ].innerHTML == registroAlmacenado.grupo &&
					registroSeleccion.cells[ 1 ].innerHTML == registroAlmacenado.materia ){

				materiasOrdenadas.push( registroAlmacenado );
				break;
			}

		}

	}

	materiasHorario.materias = materiasOrdenadas;
	guardarMateriasHorario();
}

function soltando (){
	var registros = document.querySelectorAll( SELECTOR_MATERIAS_SELECCIONADAS );

	for ( var i = 0; i < registros.length; i++ ){
		// registros[ i ].className = 'fuera';
		registros[ i ].classList.remove( 'sobre' );
		registros[ i ].classList.add( 'fuera' );
		registros[ i ].setAttribute( 'draggable', 'true' );
		registros[ i ].style.opacity = '1';
	}

	return false;
}

function getEnlaceDiccionario ( asignaturaH ){
	var enlaceDiccionario = document.createElement( 'a' );

	enlaceDiccionario.href = '#';
	enlaceDiccionario.setAttribute( 'style','color : #F90;' );
	enlaceDiccionario.innerHTML = asignaturaH.profe;
	enlaceDiccionario.addEventListener( 'click', enlaceVerComentarios, false );

	return enlaceDiccionario;
}

function enlaceVerComentarios ( evento ){
	evento.stopPropagation();
	try {


		var paginaReferencia = getPaginaReferencia( this.innerHTML );
		androidJs.verComentario( paginaReferencia );

	} catch ( error ){
		log( error );

		document.getElementsByName( 'n' )[0].value = this.innerHTML;
		document.getElementById( ID_CONTROL_COMENTARIO_RAPIDO ).submit();
		estadoSeleccion = false;
		setTimeout( 'estadoSeleccion = true;', UN_SEGUNDO );
	}
}

function getPaginaReferencia ( seleccion ){
	return document.getElementById( ID_CONTROL_COMENTARIO_RAPIDO ).action + '?sec=buscar&n='+ encodeURI( seleccion );
}

function getInformacionRegistro ( tablaRegistros, controlSeleccion ){
	return {
		grupo    : tablaRegistros.rows[ controlSeleccion.numero ].cells[ COLUMNA_GRUPO ].innerHTML,
		nombre   : tablaRegistros.rows[ controlSeleccion.numero ].cells[ COLUMNA_NOMBRE_ASIGNATURA2 ].innerText,
		profesor : tablaRegistros.rows[ controlSeleccion.numero ].cells[ COLUMNA_PROFESOR ].innerText
	};
}

function getDiasSemana (){
	return [ ESPACIO_HTML, ESPACIO_HTML, ESPACIO_HTML, ESPACIO_HTML, ESPACIO_HTML, ESPACIO_HTML, ESPACIO_HTML ];
}

function calculaHorasSeguimiento ( horasSeguimiento, tabla, grupo, nombre, dias ){
	for ( var i = POSICION_INICIO_REGISTROS; i < tabla.rows.length; i++){

		if ( registroGrupoNombreIguales( grupo, nombre, tabla.rows[ i ] ) ){
			calculaHorasRegistro( horasSeguimiento, tabla.rows[ i ], dias );
		}
	}
}

function registroGrupoNombreIguales ( grupo, nombre, registro ){
	return grupo == registro.cells[ 0 ].innerHTML &&
				nombre == registro.cells[ 1 ].innerText;
}

function calculaHorasRegistro ( horasSeguimiento, registro, dias ){

	var j, rango, valorCelda;
	var cambioDia = 0;
	var posicionUltimaCelda = registro.cells.length-1;

	registroMarcaSeleccion( registro, posicionUltimaCelda );

	for ( j = COLUMNA_HORARIO_INICIO_SELECCION; j < posicionUltimaCelda; j++ ){

		valorCelda = registro.cells[ j ];
		if ( celdaRegistroConHoraAsignada( valorCelda ) ){

			rango = calculaRango( valorCelda, cambioDia );

			var encontrarInicio = { valor : false };
			resolverIntersecciones( encontrarInicio, horasSeguimiento, rango, j );

			if ( !encontrarInicio.valor ){
				guardarHorasSeguimiento( horasSeguimiento, rango[ 0 ], rango[ 1 ] );
				vaciaDiasSeleccion( j, dias, registro );
			}

		}
		cambioDia += 30;

	}
}

function registroMarcaSeleccion ( registro, posicionUltimaCelda ){
	registro.cells[ posicionUltimaCelda ].firstChild.checked = true;
}

function celdaRegistroConHoraAsignada ( celdaRegistro ){
	return celdaRegistro.innerHTML != ESPACIO_HTML;
}

function calculaRango ( valorCelda, cambioDia ){
	var rango = new Array();
	var horas = getHorasRegistro( valorCelda );

	rango = creaRango( rango, horas );
	vaciaRango( rango, cambioDia );

	return rango;
}

function getHorasRegistro ( valorCeldaRegistro ){
	var horas = valorCeldaRegistro.innerHTML;
	horas = horas.replace( "/\s+/g", '' );
	horas = horas.replace( /:/g, '.' );

	return horas;
}

function creaRango ( rango, horas ){
	//generacion de los bloques apartir de la hora asignada
	rango = horas.split( '-' );

	for (var n = 0; n < 2; n++){
		rango[ n ] = parseFloat( rango[ n ] );
		rango[ n ] += 0.2;

		if ( rango[ n ]%0.5 != 0 ){
			rango[ n ] = parseInt( rango[ n ] );
		}

		rango[ n ] -= HORA_DE_INICIO_HORARIO;
	}

	return rango;
}

function vaciaRango ( rango, cambioDia ){
	var limiteFin    = rango[ 1 ];
	var limiteInicio = rango[ 0 ];
		// log("R1\nlimiteInicio : "+limiteInicio+"\nlimiteFin : "+limiteFin);
	rango[ 1 ] = ( (limiteFin-limiteInicio)*2 ) - 1 + (limiteInicio*2) + cambioDia;
	rango[ 0 ] = ( limiteInicio*2 ) + cambioDia;
		// log("R2\nlimiteInicio : "+limiteInicio+"\nlimiteFin : "+limiteFin);
}

function resolverIntersecciones ( encontrarInicio, horasSeguimiento, rango, posicion ){
	//se buscan intersecciones entre los rangos de los bloques
	for ( var n = 0; n < horasSeguimiento.length; n++ ){

		var inicioRango = rango[ 0 ];
		var limiteRango = rango[ 1 ];

		if ( inicioRango == horasSeguimiento[ n ] ){

			// log( "->CB-A : " + horasSeguimiento[ n ] );
			encontrarInicio.valor = true;
			n = getPosicionBloquesContinuos( n, horasSeguimiento )

			var valorHorasSeguimiento = horasSeguimiento[ n-1 ];
			// log("+"+valorHorasSeguimiento+"!="+limiteRango+"?");

			if ( valorHorasSeguimiento != limiteRango && valorHorasSeguimiento < limiteRango ){
				// log("n = "+(valorHorasSeguimiento+1));
				guardarHorasSeguimiento( horasSeguimiento, valorHorasSeguimiento+1, limiteRango );
				vaciaDiasSeleccion( posicion, dias, registro );
			}

		}

	}
}

function getPosicionBloquesContinuos ( n, horasSeguimiento ){
	//busca los elementos continuos de la secuencia de los bloques
	var bloqueA, bloqueB;
	for ( n++; n < horasSeguimiento.length; n++ ){

		bloqueA = horasSeguimiento[ n-1 ] + 1;
		bloqueB = horasSeguimiento[ n ];

		log( '-> ' + bloqueA + '!=' + bloqueB + '?' );
		if ( bloqueA != bloqueB ){
			break;
		}
	}

	return n;
}

function guardarHorasSeguimiento ( horasSeguimiento, limiteInferior, limiteSuperior ){
	// log("->CB-N");
	//guardando los rangos originales y bloques
	for ( var n = limiteInferior; n <= limiteSuperior; n++ ){
		horasSeguimiento.push( n );
	}
}

function vaciaDiasSeleccion ( posicion, dias, registro ){
	var posicionDias = posicion-COLUMNA_HORARIO_INICIO_SELECCION;

	if ( dias[ posicionDias ] != ESPACIO_HTML ){
		// log("agregando la celda");
		dias[ posicionDias ] += ','+ registro.cells[ posicion ].innerHTML;
	} else {
		dias[ posicionDias ] = registro.cells[ posicion ].innerHTML;
	}
}

function seleccionAgregar ( controlSeleccion ){
	return controlSeleccion.checked != false;
}

function agregarOptativa ( materia ){
	var listaOptativas = getAlmacenamientoOptativas();

	if ( !optativaRepetida( listaOptativas, materia ) ){
		almacenarOptativa( listaOptativas, materia );
	}
}

function getAlmacenamientoOptativas (){
	if ( localStorage.optativas == null || localStorage.optativas == '' ){
		localStorage.optativas = "[]";
	}

	return JSON.parse( localStorage.optativas );
}

function optativaRepetida ( listaOptativas, materia ){

	for ( var i = 0; i < listaOptativas.length; i++ ){
		if ( materia == listaOptativas[ i ].materia ) {

			return true;
		}
	}

	return false;
}

function almacenarOptativa ( listaOptativas, materia ){
	listaOptativas.push( { materia : materia, check : false } );
	guardarOptativas( listaOptativas );
	insertarOptativas( [ { materia : materia } ] );
}

function insertarOptativas ( materias ){
	var tablaOptativas = document.getElementById( ID_TABLA_OPTATIVAS );
	var posicionFila = tablaOptativas.rows.length;

	var checkOptativas = getCheckOptativa();

	for ( var i = 0; i < materias.length; i++ ){
		var checkOptativa = checkOptativas.cloneNode( true );
		inicializaControlOptativa( checkOptativa, materias[ i ].check );
		insertaControlOptativa( checkOptativa, tablaOptativas, posicionFila+i, materias[ i ].materia );
	}
}

function getCheckOptativa (){
	var checkOptativas = document.createElement( 'input' );

	checkOptativas.type  = 'checkbox';
	checkOptativas.name  = NOMBRE_CONTROL_OPTATIVA;
	checkOptativas.title = MENSAJE_HABILITACION_OPTATIVAS;

	return checkOptativas;
}

function inicializaControlOptativa ( checkOptativa, estadoActivado ){
	checkOptativa.addEventListener( 'change', cambiaEstadoOptativa, true );
	if ( estadoActivado ){
		checkOptativa.setAttribute( 'checked', 'true' );
	}
}

function cambiaEstadoOptativa (){
	var posicion = this.parentNode.parentNode.rowIndex-1;
	var listaOptativas = JSON.parse( localStorage.optativas );

	listaOptativas[ posicion ].check = !listaOptativas[ posicion ].check;
	localStorage.optativas = JSON.stringify( listaOptativas );
}

function insertaControlOptativa ( checkOptativa, tablaOptativas, posicionFila, nombreMateria ){
	tablaOptativas.insertRow( posicionFila );
	tablaOptativas.rows[ posicionFila ].insertCell( 0 );
	tablaOptativas.rows[ posicionFila ].insertCell( 1 );
	tablaOptativas.rows[ posicionFila ].cells[ 0 ].innerHTML = nombreMateria;
	tablaOptativas.rows[ posicionFila ].cells[ 1 ].appendChild( checkOptativa );
}

function eliminarRegistroSeleccion ( registroSeleccionado ){
	eliminaMateriaSeleccion(
		  registroSeleccionado.grupo
		, registroSeleccionado.nombre
		, POSICION_INICIO_REGISTROS
		, ELIMINACION_REGISTRO
	);
}

function eliminaMateriaSeleccion ( grupo, materia, posicion, tipoAccion ){
	// log("eliminaMateriaSeleccion\n"+grupo+", "+materia+", "+posicion+", "+tipoAccion);

	var tablaSeleccion = document.getElementById( ID_TABLA_ASIGNATURAS );
	var registros      = document.getElementById( ID_CONTENEDOR_REGISTROS );

	// var i = posicion;
	// var i;
	var posicionCheck = sabadoActivo ? 11 : 10;
	switch (tipoAccion){
		case ELIMINACION_REGISTRO:
			eliminaRegistroSeleccion( grupo, materia, tablaSeleccion, registros, posicionCheck );
			break;
		case ELIMINACION_SELECCION:
			eliminaSeleccion( grupo, materia, tablaSeleccion, registros, posicion, posicionCheck );
			break;
	}
	actualizaTotalSeleccion( -1 );
	borrarMateriaHorario( grupo, materia );
	eliminarOptativa( materia );
}

function eliminaRegistroSeleccion ( grupo, materia, tablaSeleccion, registros, posicionCheck ){
	//deseleccionando las materias del mismo grupo en los registros
	// for (; i < registros.rows.length && grupo == registros.rows[i].cells[0].innerHTML; i++){
	//comprobar si funciona para elementos separados
	for (var i = 0; i < registros.rows.length; i++){
		// log("----"+materia+" | "+registros.rows[i].cells[1].innerText);
		if ( grupo == registros.rows[ i ].cells[ 0 ].innerHTML &&
				materia == registros.rows[i].cells[ 1 ].innerText ){

			registros.rows[ i ].cells[ posicionCheck ].firstChild.checked = false;
		}
	}

	//quitando de la lista de la selección
	var materiasSeleccion = document.querySelectorAll( SELECTOR_MATERIAS_SELECCIONADAS );
	for (var i = 0; i < materiasSeleccion.length; i++){
		if ( grupo == materiasSeleccion[ i ].children[ 0 ].rows[ 0 ].cells[ 0 ].innerHTML &&
				materia == materiasSeleccion[ i ].children[ 0 ].rows[ 0 ].cells[ 1 ].innerHTML ){

			// materiasSeleccion.deleteRow(i);
			tablaSeleccion.deleteRow( materiasSeleccion[ i ].parentNode.parentNode.rowIndex );
			break;
		}
	}
}

function eliminaSeleccion ( grupo, materia, tablaSeleccion, registros, posicion, posicionCheck ){
	//quitando de la lista de la selección
	tablaSeleccion.deleteRow( posicion );

	//deseleccionando las materias del mismo grupo en los registros
	// for (var i = 1; i < registros.rows.length; i++){
	for ( i = POSICION_INICIO_REGISTROS; i < registros.rows.length; i++ ){
		// if (registros.rows[i].cells[0].innerHTML == grupo && (registros.rows[i].cells[1].innerHTML == materia || (destinoConexion != "" && registros.rows[i].cells[1].firstChild.innerHTML == materia) )){
		if ( registros.rows[ i ].cells[ 0 ].innerHTML == grupo &&
						registros.rows[ i ].cells[ 1 ].innerText == materia ){

			registros.rows[ i ].cells[ posicionCheck ].firstChild.checked = false;
		}
	}
}

function actualizaTotalSeleccion ( opcion ){
	var totalSeleccion = document.getElementById( ID_TOTAL_SELECCION );
	totalSeleccion.innerHTML = parseInt( totalSeleccion.innerHTML ) + opcion;
}

function borrarMateriaHorario ( grupo, nombre ){
	cargarMateriasHorarioGuardadas();
	// log("totalGuardado :"+materiasHorario.materias.length);
	if ( materiasHorarioConMasDeUnElemento() ){
		remueveAsignaturaSeleccionAlmacenada( grupo, nombre );
		guardarMateriasHorario();
	} else {
		borrarMateriasHorario();
	}
}

function eliminarOptativa ( materia ){
	var listaOptativas = JSON.parse( localStorage.optativas );

	for ( var i = 0; i < listaOptativas.length; i++ ){

		if ( materia == listaOptativas[ i ].materia ){
			// log("##1:"+listaOptativas.length);
			listaOptativas.splice( i, 1 );
			guardarOptativas( listaOptativas );
			// log("##2:"+listaOptativas.length);
			// removerOptativaTabla(materia);
			removerOptativaTabla( i+1 );
			break;
		}

	}

}

function guardarOptativas ( listaOptativas ){
	localStorage.optativas = JSON.stringify( listaOptativas );
}

function removerOptativaTabla ( posicion ){
	var tablaOptativas = document.getElementById( ID_TABLA_OPTATIVAS );
	tablaOptativas.deleteRow( posicion );
}

function materiasHorarioConMasDeUnElemento (){
	return materiasHorario.materias.length > 1;
}

function remueveAsignaturaSeleccionAlmacenada ( grupo, nombre ){
	for ( var i = 0; i < materiasHorario.materias.length; i++ ){

		if ( materiasHorario.materias[i].grupo == grupo &&
						materiasHorario.materias[i].materia == nombre ){

			if ( i > parseInt( materiasHorario.materias.length/2 ) ){

				for (; i < ((materiasHorario.materias.length)-1); i++){
					materiasHorario.materias[i] = materiasHorario.materias[i+1];
				}
				materiasHorario.materias.pop();

			} else {

				for (; i > 0; i--){
					materiasHorario.materias[i] = materiasHorario.materias[i-1];
				}
				materiasHorario.materias.shift();

			}
			break;
		}

	}
}

function cargarMateriasHorarioGuardadas (){
	if ( localStorage.horarioMaterias != null &&
			localStorage.horarioMaterias != '' &&
				localStorage.horarioMaterias != 'null' ){

		materiasHorario = JSON.parse( localStorage.horarioMaterias );
	}
}

function removerMarcaResaltado (){
	var posicionesFilasMarcas = new Array();
	var registros = document.querySelectorAll( SELECTOR_REGISTROS_RESALTADOS );

	for ( var i = 0; i < registros.length; i++ ){
		registros[ i ].parentNode.removeChild( registros[ i ] );
	}
}

function visiualizacionSabado ( numeroDias ){
	if ( numeroDias > NUMERO_DIAS_SEMANA ){
		verificaSeleccionSabado();
	}
}

function verificaSeleccionSabado (){
	var celdasSabado = document.querySelectorAll( SELECTOR_CELDAS_SABADO );
	var ocultarSabado = getEstadoOcultarSabado( celdasSabado );

	aplicaEstadoOcultarSabado( celdasSabado, ocultarSabado );
}

function getEstadoOcultarSabado ( celdasSabado ){
	for ( var i = POSICION_INICIO_REGISTROS; i < celdasSabado.length; i++ ){
		if ( celdasSabado[ i ].innerHTML != ESPACIO_HTML ){
			return false;
		}
	}

	return true;
}

function aplicaEstadoOcultarSabado ( celdasSabado, ocultarSabado ){
	for (var i = 0; i < celdasSabado.length; i++){
		if ( ocultarSabado ){
			celdasSabado[ i ].classList.add( 'ocultar' );
		} else {
			celdasSabado[ i ].classList.remove( 'ocultar' );
		}
	}
}

function agregaTamanioCeldasSeleccionMaterias ( estilosSeleccionMaterias ){
	var medidasCeldas = medidasCeldasSeleccion();

	for ( var j = 0; j < medidasCeldas.length; j++ ) {
		estilosSeleccionMaterias.innerHTML +=
			"table#tablaAsignaturas > tbody > tr:nth-child(1) > td:nth-child(" + (j+1) + "), "+
			"table#tablaAsignaturas table td:nth-child(" + (j+1) + ") " +
				"{ width : " + ( medidasCeldas[ j ]-4 ) + "px; } ";
	}
}

function medidasCeldasSeleccion () {
	return new Array ( 71, 229, 223, 69, 69, 69, 69, 69, 69, 63, 63 );
}

function agregaControlesMateriasSeleccionadas (){
	var materiasSeleccionadas    = getControlMateriasSeleccionadas();
	var estilosSeleccionMaterias = getEstiloSeleccionMaterias();

	var tabla = document.getElementById( ID_CONTENEDOR_REGISTROS );
	tabla.padreAgregaElementoAlFinal( materiasSeleccionadas );
	tabla.padreAgregaElementoAlFinal( estilosSeleccionMaterias );
}

function getControlMateriasSeleccionadas (){
	var materiasSeleccionadas = document.createElement( 'div' );

	materiasSeleccionadas.id  = ID_CONTENEDOR_MATERIAS_SELECCIONADAS;
	materiasSeleccionadas.ocultar();

	materiasSeleccionadas.innerHTML =
		"<div class='regresar'>"+MENSAJE_CERRAR_SELECCION_MATERIAS+"</div>"+
		"<div id='"+ ID_CONTENEDOR_RESULTADOS_HORARIOS +"'></div>"+
		"<div id='"+ ID_LISTA_SELECCION +"'>"+
			"<table id='"+ ID_TABLA_ASIGNATURAS +"'>"+
				"<tr>"+
					"<td>"+MENSAJE_GRUPO+"</td>"+
					"<td>"+MENSAJE_MATERIA+"</td>"+
					"<td>"+MENSAJE_PROFESOR+"</td>"+
					"<td>"+MENSAJE_LUNES+"</td>"+
					"<td>"+MENSAJE_MARTES+"</td>"+
					"<td>"+MENSAJE_MIERCOLES+"</td>"+
					"<td>"+MENSAJE_JUEVES+"</td>"+
					"<td>"+MENSAJE_VIERNES+"</td>"+
					"<td name = 'sabado'>"+MENSAJE_SABADO+"</td>"+
					"<td>"+MENSAJE_REMOVER+"</td>"+
					"<td>"+MENSAJE_INCLUIR+"</td>"+
				"</tr>"+
			"</table>"+
		"</div>"+
		"<div id='"+ ID_CONTENEDOR_CONTROLES_HORARIO +"'>"+
			"<input type='button' id='"+ ID_CONTROL_EXPORTAR +"' value='"+MENSAJE_EXPORTAR+"' title='"+ MENSAJE_EXPORTAR_DESCRIPCION +"'/>"+
			"<input type='button' id='"+ ID_CONTROL_BORRAR_SELECCION +"' value='"+ MENSAJE_BORRAR_SELECCION +"'/>"+
			"<input type='button' id='"+ ID_CONTROL_GENERAR_HORARIOS +"' value='"+ MENSAJE_GENERAR_HORARIOS +"'/>"+
			"<input type='button' id='"+ ID_CONTROL_OPTATIVAS +"' value='"+MENSAJE_OPTATIVAS+"'/>"+
			"<span id='"+ ID_TOTAL_SELECCION +"' title='"+MENSAJE_TOTAL_SELECCION+"'>0</span>"+
		"</div>"+
		"<div id='"+ ID_CONTENEDOR_INFORMACION_HORARIOS +"'></div>"+
		"<div id='"+ ID_INFORMACION_OPTATIVAS +"' class= 'oculto'></div>"+
		"<div id='"+ ID_CONTENEDOR_TRASLAPES +"' class= 'oculto'></div>";

	return materiasSeleccionadas;
}

function getEstiloSeleccionMaterias (){
	var estilosSeleccionMaterias = document.createElement( 'style' );
	agregaEstilosSeleccionMaterias( estilosSeleccionMaterias );
	agregaTamanioCeldasSeleccionMaterias( estilosSeleccionMaterias );

	return estilosSeleccionMaterias;
}

function agregaEstilosSeleccionMaterias ( estilosSeleccionMaterias ){

	var anchoSeleccion = getAnchoContenedorSeleccionMaterias();

	estilosSeleccionMaterias.innerHTML =
		// 'div#asignaturas { min-height : 80px; min-width : 250px; position : fixed; background-color : maroon; color : white; top : 6%; left : 50%; opacity : 0.85; z-index : 1; font-size : 17px; margin : 0px 0px 0px -525px; box-shadow: 0 0 20px 5px #000; width: 1050px; } ';
		'div#asignaturas { position : fixed; background-color : maroon; color : white; top : 0%; left : 0%; opacity : 0.85; z-index : 1; font-size : 17px; box-shadow: 0 0 20px 5px #000; width: 100%; heigth : 90%; } ';
	estilosSeleccionMaterias.innerHTML +=
		'div#asignaturas > div:nth-child(1) { background-color : #000; color : #FFF; } ';
	estilosSeleccionMaterias.innerHTML +=
		'div#resultadoHorarios { overflow-y : auto; max-height : '+anchoSeleccion+'px; } ';
	estilosSeleccionMaterias.innerHTML +=
		'div#asignaturasSeleccionadas { overflow-y:auto; max-height: '+anchoSeleccion+'px; } ';
	estilosSeleccionMaterias.innerHTML +=
		'div#asignaturasSeleccionadas > table { width:100%; } ';
	estilosSeleccionMaterias.innerHTML +=
		"table#tablaAsignaturas > tbody > tr:nth-child(1), "+
		"table[name='traslapes'] > tbody > tr:nth-child(1), "+
		"table#tablaOptativas tr:nth-child(1) { background-color : #F90; color : #FFF; } ";
	// estilosSeleccionMaterias.innerHTML +=
		// "table.traslapes tr:not(.titulos) td { border : 1px solid #FFF } ";
	estilosSeleccionMaterias.innerHTML +=
		"table[name='traslapes'] td, "+
		'div#informacionOptativas td { border : 1px solid #FFF; } ';
	estilosSeleccionMaterias.innerHTML +=
		"table[name='traslapes'], "+
		'table#tablaOptativas { border-collapse : collapse; } ';
	estilosSeleccionMaterias.innerHTML +=
		'.ocultar { display : none; } ';
	estilosSeleccionMaterias.innerHTML +=
		'span#totalSeleccion { float:right; padding-right : 30px; /*padding-top : 3px;*/ } ';
	// estilosSeleccionMaterias.innerHTML +=
		// 'table#tablaAsignaturas table td { border: 1px solid #AAA; } ';
	estilosSeleccionMaterias.innerHTML +=
		'table#tablaAsignaturas td, th { padding : 0px 0px } ';
	estilosSeleccionMaterias.innerHTML +=
		"div[name='contenedorRegistro'] { cursor : pointer; } ";
	estilosSeleccionMaterias.innerHTML +=
		"div[name='contenedorRegistro'] > table { width : 100% } ";
	estilosSeleccionMaterias.innerHTML +=
		'div#exportar { width : 560px; background-color : #DADADA; text-align : left; padding : 5px 20px 5px 20px; } ';
	estilosSeleccionMaterias.innerHTML +=
		'span.importar { text-decoration : underline; font-weight : bold; text-transform : uppercase; } ';
	estilosSeleccionMaterias.innerHTML +=
		'[draggable] { -webkit-user-select : none; -webkit-user-drag: element; } ';
	estilosSeleccionMaterias.innerHTML +=
		'.sobre { border : 2px dashed #FFF; } ';
	estilosSeleccionMaterias.innerHTML +=
		'.sobreImportar { border : 2px dashed #000; } ';
	estilosSeleccionMaterias.innerHTML +=
		'.fuera { border : 2px solid #800000; } ';
	estilosSeleccionMaterias.innerHTML +=
		'.fueraImportar { border : 1px solid #000; } ';
	estilosSeleccionMaterias.innerHTML +=
		'.seleccionado { background-color : rgba(122, 196, 41, 0.53); } ';
	estilosSeleccionMaterias.innerHTML +=
		'div.tabla { display : table; width : 100%; } ';
	estilosSeleccionMaterias.innerHTML +=
		'div.celda { display : table-cell; vertical-align : middle; } ';
	estilosSeleccionMaterias.innerHTML +=
		"div.resaltar { border : 1px solid #FFF; background-color : #154215; } ";
	estilosSeleccionMaterias.innerHTML +=
		"div#informacionOptativas { text-align : center; } ";
	estilosSeleccionMaterias.innerHTML +=
		"div#detalleTraslapes table, "+
		"table#tablaOptativas { margin : 0px auto; } ";
	estilosSeleccionMaterias.innerHTML +=
		"div#controlesHorarios, "+
		"div#informacionHorarios { background-color : #000 } ";
	estilosSeleccionMaterias.innerHTML +=
		".tooltip { display : inline; position : relative; } ";
	estilosSeleccionMaterias.innerHTML +=
		".tooltip:hover:after { background : rgba(0,0,0,.75); border-radius : 5px; bottom : 26px; color : #FFF; content : attr(title); font-size : 14px; text-aling : justify; left : 20%; padding : 5px 15px; position : absolute; z-index : 98; width : 220px; } ";
	estilosSeleccionMaterias.innerHTML +=
		".tooltip:hover:before { border : solid; border-color : #000 transparent; border-width : 6px 6px 0 6px; bottom : 20px; content : ''; left : 50%; position : absolute; z-index : 99; } ";
	estilosSeleccionMaterias.innerHTML +=
		".titulo_tabla { color : #FF9900; text-transform : uppercase; } ";
}

function getAnchoContenedorSeleccionMaterias (){
	// return parseInt( window.innerHeight * 0.9 );
	return parseInt( window.innerHeight - ( 21 + 31 + 41 ) );
}

function agregaComportamientoControlesSeleccionMaterias (){
	document.getElementById( ID_CONTROL_BORRAR_SELECCION 	).addEventListener( 'click', borrarMateriasHorario, true );
	document.getElementById( ID_CONTROL_GENERAR_HORARIOS 	).addEventListener( 'click', generarHorarios, true );
	document.getElementById( ID_CONTROL_EXPORTAR 			).addEventListener( 'click', exportar, true );
	document.getElementById( ID_CONTROL_OPTATIVAS 			).addEventListener( 'click', visibilidadOptativas, true );
	document.querySelector( '.regresar' ).addEventListener( 'click', ocultarHorario, true );
	// setTimeout(quitaEspacioCeldas,5000);
}

function borrarMateriasHorario (){
	resetearControlesSeleccionMaterias();

	ocultarHorario();
	desactivarAtajosHorarios();

	resetearContenedorSeleccionBack();
	resetearPersistenciaSeleccion();
	mostrarSeleccionMaterias();
	resetearContenedoresSeleccionMaterias();
}

function desactivarAtajosHorarios (){
	atajoHorarios = false;
}

function resetearControlesSeleccionMaterias (){
	var i;
	var tabla = document.getElementById( ID_CONTENEDOR_REGISTROS );

	for ( i = POSICION_INICIO_REGISTROS; i < tabla.rows.length; i++ ){
		tabla.rows[ i ].cells[ 10 ].firstChild.checked = false;
	}

	tabla = document.getElementById( ID_TABLA_ASIGNATURAS );
	for ( i = tabla.rows.length-1; tabla.rows.length != 1; i-- ){
		tabla.deleteRow( i );
	}
}

function ocultarHorario (){
	document.getElementById( ID_CONTENEDOR_MATERIAS_SELECCIONADAS ).classList.add( 'ocultar' );
}

function resetearContenedorSeleccionBack (){
	materiasHorario = { materias : [] };
}

function resetearPersistenciaSeleccion (){
	localStorage.horarioMaterias   = '';
	localStorage.armadoOrdenado    = '';
	localStorage.resultados        = '';
	localStorage.traslapes         = '';
	localStorage.materiasTraslapes = '';
	localStorage.optativas         = '';
}

function resetearContenedoresSeleccionMaterias (){
	document.getElementById( ID_CONTROL_IMPORTACION ).value                 = '';
	document.getElementById( ID_CONTENEDOR_RESULTADOS_HORARIOS ).innerHTML  = '';
	document.getElementById( ID_CONTENEDOR_INFORMACION_HORARIOS ).innerHTML = '';
	document.getElementById( ID_TOTAL_SELECCION ).innerHTML                 = '0';

	document.getElementById( ID_CONTENEDOR_EXPORTAR ).ocultar();
}

function mostrarSeleccionMaterias (){
	document.getElementById( ID_LISTA_SELECCION ).removeAttribute( 'class' );
	document.getElementById( ID_CONTENEDOR_CONTROLES_HORARIO ).removeAttribute( 'class' );
	document.getElementById( ID_CONTENEDOR_RESULTADOS_HORARIOS ).ocultar();
}

function generarHorarios (){
	// log("-> Generando horarios....1");
	cargarMateriasHorarioGuardadas();
	if ( materiasHorario.materias.length != 0 ){
		removerResaltado();
		// log("-> Generando horarios....1.1");
		// Agrupar las materias por la secuencia
		var materiasCombinar = materiasHorario;
		var grupoMaterias    = { materias : [] };
		var optativas = { materia : "optativa", grupos : [] };
		var listaOptativas = JSON.parse( localStorage.optativas );

		while ( materiasCombinar.materias.length != 0 ){

			// log("-> Generando horarios....1.1.1");
			var agrupado = false;
			var materiaOrdenar = materiasCombinar.materias.pop();
			if ( materiaOrdenar.estado ){
				var optativa = false;

				for ( var j = 0; j < listaOptativas.length; j++ ){
					if ( materiaOrdenar.materia == listaOptativas[j].materia && listaOptativas[j].check ){
						optativas.grupos.push( { materia : materiaOrdenar.materia, grupo : materiaOrdenar.grupo, horas : materiaOrdenar.horas, profe : materiaOrdenar.profe } );
						optativa = true;
						break;
					}
				}

				if ( !optativa ){

					for ( var i = 0; i < grupoMaterias.materias.length; i++ ){
						if ( materiaOrdenar.materia == grupoMaterias.materias[i].materia ){
							var grupo = { grupo : materiaOrdenar.grupo, horas : materiaOrdenar.horas, profe : materiaOrdenar.profe };
							grupoMaterias.materias[i].grupos.push(grupo);
							agrupado = true;
							break;
						}
					}

					if ( !agrupado ){
						var materia = { materia : materiaOrdenar.materia, grupos : [] };
						var grupo 	= { grupo : materiaOrdenar.grupo, horas : materiaOrdenar.horas, profe : materiaOrdenar.profe };
						materia.grupos.push(grupo);
						grupoMaterias.materias.push( materia );
					}

				}

			}
		}
		if (optativas.grupos.length > 0){
			grupoMaterias.materias.push(optativas);
		}
		// Se ordenan las materias agrupadas con las secuencias : ascendente
		//localStorage.armado = JSON.stringify(grupoMaterias);
		var gruposOrdenados = {materias : []};
		while (grupoMaterias.materias.length != 0){
			var materia = grupoMaterias.materias.shift();
			var i;
			for (i = 0; i < gruposOrdenados.materias.length; i++){
				if (materia.grupos.length <= gruposOrdenados.materias[i].grupos.length){
					break;
				}
			}
			gruposOrdenados.materias.splice(i,0,materia);
		}
		// localStorage.armadoOrdenado = "";
		localStorage.armadoOrdenado 	= JSON.stringify(gruposOrdenados);
		var horariosPosiblesAnteriores 	= { combinacion : [] };
		var combinacionesDisponibles 	= true;

		var traslapes = new Array();

		// alert("Numero de materias "+gruposOrdenados.materias.length);
		// log("-> Generando horarios....1.2");
		if (gruposOrdenados.materias.length != 0){
			// Inicializando las combinaciones
			// log("-> Generando horarios....1.2.1");
			for (var i = 0; i < gruposOrdenados.materias[0].grupos.length; i++){
				var combinacion = { secuencia : [i], horas : gruposOrdenados.materias[0].grupos[i].horas };
				horariosPosiblesAnteriores.combinacion.push(combinacion);
			}
			// Recorriendo los combinaciones anteriores
			// alert(JSON.stringify(horariosPosiblesAnteriores));
			for (var i = 1; combinacionesDisponibles && i < gruposOrdenados.materias.length; i++){
				//alert(i);
				var horariosPosibles = { combinacion : [] };
				//Combinando a partir de las combinaciones anteriores
				// alert("->"+horariosPosiblesAnteriores.combinacion.length);
				for (var j = 0; j < horariosPosiblesAnteriores.combinacion.length; j++){
					//alert("->"+j);
					// alert("- ->"+gruposOrdenados.materias[i].grupos.length);

					var combinacion = { secuencia : horariosPosiblesAnteriores.combinacion[j].secuencia, horas : horariosPosiblesAnteriores.combinacion[j].horas };
					for (var n = 0; n < gruposOrdenados.materias[i].grupos.length; n++){
						//alert("-->"+n);
						var encontrado = false;
						// combinacion.horas = horariosPosiblesAnteriores.combinacion[j].horas;
						// combinacion.secuencia = horariosPosiblesAnteriores.combinacion[j].secuencia;

						// alert(combinacion.horas+"###"+gruposOrdenados.materias[i].grupos[n].horas);
						// alert(i+" , "+n);
						var posicionTraslape = gruposOrdenados.materias[i].grupos[n].horas.length;
						for (var k = 0; !encontrado && k < gruposOrdenados.materias[i].grupos[n].horas.length; k++){
							if (buscarArreglo(combinacion.horas,gruposOrdenados.materias[i].grupos[n].horas[k]) != -1){
								// log("traslape 1 "+combinacion.horas+"\n"+gruposOrdenados.materias[i].grupos[n].horas[k]);
								encontrado = true;
								posicionTraslape = k;
							}
						}
						if (!encontrado){
							//alert("Agregado");
							var nuevaCombinacion = { secuencia : [], horas : combinacion.horas };
							nuevaCombinacion.horas = nuevaCombinacion.horas.concat(gruposOrdenados.materias[i].grupos[n].horas);
							nuevaCombinacion.horas = ordenar(nuevaCombinacion.horas);
							nuevaCombinacion.secuencia = nuevaCombinacion.secuencia.concat(combinacion.secuencia);
							// nuevaCombinacion.secuencia.push(n);
							nuevaCombinacion.secuencia[i] = n;
							//alert("secuencia  "+nuevaCombinacion.secuencia+" - "+nuevaCombinacion.secuencia.length);
							horariosPosibles.combinacion.push(nuevaCombinacion);
							// alert(n+" - "+nuevaCombinacion.secuencia+" # "+JSON.stringify(horariosPosibles.combinacion));
						} else {

							//Corregir informe de traslape
								//ultima materia de rama viable x materia que tiene conflicto

							var x = 0;
							//buscando al colisionador
							for (; x < traslapes.length; x++){
								// if (traslapes[x].nivel == nivel && traslapes[x].opcion == combinacion.secuencia[nivel]) break;
								if (traslapes[x].nivel == i && traslapes[x].opcion == n) break;
							}
							if (x == traslapes.length){
								// traslapes.push({ nivel : nivel, opcion : combinacion.secuencia[nivel], colision : [] });
								traslapes.push({ nivel : i, opcion : n, colision : [] });
							}
							//localizando al colisionado
							// var nivel = combinacion.secuencia.length-1;
							var nivel;
							encontrado = false;
							while (!encontrado){
								// log("totalSecuencia :"+combinacion.secuencia.length);
								for (var k = 0; !encontrado && k < combinacion.secuencia.length; k++){
									// log(k+"/"+combinacion.secuencia.length);
									// log("traslape 2 \n"+gruposOrdenados.materias[k].grupos[combinacion.secuencia[k]].horas+"\n"+gruposOrdenados.materias[i].grupos[n].horas[posicionTraslape]+"<-");
									if (buscarArreglo(gruposOrdenados.materias[k].grupos[combinacion.secuencia[k]].horas,gruposOrdenados.materias[i].grupos[n].horas[posicionTraslape]) != -1){
										encontrado = true;
										// log("en : 1");
										nivel = k;
									}
								}
								if (!encontrado) {
									log("Inf");
									break;
								}
							}


							//buscando al colisionado
							var k = 0
							for (; k < traslapes[x].colision.length; k++){
								// if (traslapes[x].colision[k].nivel == i && traslapes[x].colision[k].opcion == n) break;
								if (traslapes[x].colision[k].nivel == nivel && traslapes[x].colision[k].opcion == combinacion.secuencia[nivel]) break;
							}
							if (k == traslapes[x].colision.length){
								// traslapes[x].colision.push({ nivel : i, opcion : n, repeticiones : 1 });
								traslapes[x].colision.push({ nivel : nivel, opcion : combinacion.secuencia[nivel], repeticiones : 1 });
							} else {
								traslapes[x].colision[k].repeticiones++;
							}
						}
					}
					// alert("opciones anteriores  "+j+"/"+horariosPosiblesAnteriores.combinacion.length);
				}
				if (horariosPosibles.combinacion.length != 0) horariosPosiblesAnteriores = horariosPosibles;
				else combinacionesDisponibles = false;
				// alert("opciones anteriores  "+horariosPosiblesAnteriores.combinacion.length+" #"+JSON.stringify(horariosPosiblesAnteriores.combinacion));
			}
		}
		// alert("Listo");
		// log("-> Generando horarios....1.3");
		if ( combinacionesDisponibles && horariosPosiblesAnteriores.combinacion.length > 0 ){
			// log("-> Generando horarios....1.3.1");
			localStorage.resultados = JSON.stringify(horariosPosiblesAnteriores);
			presentarHorariosGenerados(horariosPosiblesAnteriores,gruposOrdenados);
		} else {
			// log("-> Generando horarios....1.3.2");
			document.getElementById( ID_CONTENEDOR_INFORMACION_HORARIOS ).innerHTML = MENSAJE_SIN_RESULTADOS;
			cargarMateriasHorarioGuardadas();
		}
		informeTraslapes( traslapes, gruposOrdenados );
		horariosPosiblesAnteriores = null;
	}
	// log("-> Generando horarios....2");
}

function removerResaltado (){
	// log("removerResaltado\t\t1");
	var registros = document.querySelectorAll( 'div.resaltar' );
	for (var i = 0; i < registros.length; i++){
		registros[i].classList.remove( 'resaltar' );
	}
	// log("removerResaltado\t\t2");
}

function buscarArreglo ( arreglo, buscar ){
	var posicion = buscarArregloOrdenadoBinario( arreglo, buscar );

	if ( posicion == -1 ){
		posicion = buscarArregloOrdenado( arreglo, buscar, false );
		if ( posicion == -1 ){
			posicion = buscarArregloOrdenado( arreglo, buscar, true );
		}
	}

	return posicion;
}

function buscarArregloOrdenadoBinario ( arreglo, buscar ){
	var k = parseInt(arreglo.length/2);
	var i = 0;
	var n = k;
	var l = arreglo.length;

	var encontrado = false;
	var pos = -1;
	while (k != 0){
		if (buscar != arreglo[n]){
			k = parseInt((n-i)/2);
			if (buscar > arreglo[n]){
				if (k != 1){
					i = n;
					n += k ;
				} else {
					for (n++; n < l; n++){
						if (buscar == arreglo[n]){
							encontrado = true;
							pos = n;
							break;
						}
					}
					if (!encontrado){
						break;
					}
				}
			} else {
				if (k != 1){
					n -= k;
					l = n;
				} else {
					for (n--; n >= i; n--){
						if (buscar == arreglo[n]){
							encontrado = true;
							pos = n;
							break;
						}
					}
					if (!encontrado){
						break;
					}
				}
			}
		} else {
			//encontrado = true;
			pos = n;
			break;
		}
	}

	return pos;
}

function buscarArregloOrdenado ( arreglo, buscar, version ){
	var posicion = -1;
	var inicio = 0;
	var n;
	var fin = arreglo.length - 1;

	while (inicio <= fin) {
		n = (inicio + fin) / 2;
		// console.log(buscar+"/"+arreglo[Math.round(n)]+" : "+Math.round(n));
		if (buscar == arreglo[ version ? Math.round(n) : parseInt(n) ]) {
			posicion = version ? Math.round(n) : parseInt(n);
			break;
		} else {
			if (arreglo[ version ? Math.round(n) : parseInt(n) ] > buscar) {
				fin = n - 1;
			} else {
				inicio = n + 1;
			}
		}
	}

	return posicion;
}

function exportar (){
	log( 'exportar - rehacer' );

	// var port = chrome.extension.connect({ name: "msg" });
	// port.postMessage({ method : 'limpiar' });
	// port.postMessage({ method : 'exportar', datos : localStorage.horarioMaterias });
	// port.onMessage.addListener(function (data) {
	// 	if (data.method == 'hecho') {
	// 		var fecha = new Date();
	// 		var nombreArchivo = fecha.getFullYear()+"-"+(fecha.getMonth() < 9 ? "0"+(fecha.getMonth()+1) : fecha.getMonth())+"-"+fecha.getDate()+"["+document.getElementById("totalSeleccion").innerHTML+"]"+".txt";
	// 		// log("nombre "+data.archivo+"\nurl"+data.url);
	// 		var link = document.createElement('a');
	// 		link.setAttribute('href', data.url);
	// 		link.setAttribute('download', nombreArchivo);
	// 		link.setAttribute('id', "respaldo");
	// 		document.body.appendChild(link);

	// 		var clickEvent = document.createEvent("MouseEvent");
	// 		clickEvent.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	// 		link.dispatchEvent(clickEvent);
	// 		// setTimeout(function () { document.removeChild(link); }, 10);
	// 		setTimeout(eliminaEnlace, 10);
	// 	}
	// });
}

function visibilidadOptativas (){
	switch ( this.value ){
		case MENSAJE_OPTATIVAS:
			mostrarOptativas();
			break;
		case MENSAJE_REGRESAR:
		default:
			ocultarOptativas();
			break;
	}
}

function cargarMateriasHorario (){
	if ( localStorage.horarioMaterias != null &&
			localStorage.horarioMaterias != '' &&
				localStorage.horarioMaterias != 'null' ){

		materiasHorario = JSON.parse( localStorage.horarioMaterias );

		var tabla = document.getElementById( ID_CONTENEDOR_REGISTROS );
		var asignaturasTabla = document.getElementById( ID_TABLA_ASIGNATURAS );

		var materiaH;
		var i;
		var numeroDias     = NUMERO_DIAS_HORARIO;
		var cantidadCeldas = NUMERO_CELDAS;
		var posicionCheck  = sabadoActivo ? 11 : 10;

		var quitarMaterias = getControlEliminarMateria();
		// quitarMaterias.setAttribute("class","tooltip");

		var estadoMaterias = getControlEstadoMateriaSeleccion();
		var materiaSeleccionada;

		var materiaSinEstado = false;
		var posicionFila;

		for ( i = 0; i < materiasHorario.materias.length; i++ ){

			materiaSeleccionada = materiasHorario.materias[ i ];

			posicionFila = asignaturasTabla.rows.length;
			asignaturasTabla.insertRow( posicionFila );
			materiaH = asignaturasTabla.rows[ posicionFila ];

			materiaH.insertCell( 0 );
			materiaH.cells[ 0 ].setAttribute( 'colspan', cantidadCeldas );

			materiaH.cells[ 0 ].innerHTML = getContenedorMateriaSeleccion();
			materiaH = materiaH.cells[ 0 ].querySelector( 'tr[name="registro"]' );

			for (var j = 0; j < cantidadCeldas; j++) materiaH.insertCell( j );

			vaciaGrupoMateriaContenedor( materiaH, materiaSeleccionada );
			agregaControlDiccionario( materiaH, materiaSeleccionada );
			agregarControlRemoverMateria( materiaH, quitarMaterias, cantidadCeldas );

			var estadoMateria = getControlEstadoMateriaSeleccionInstancia( estadoMaterias );

			if ( materiaSeleccionada.estado == undefined ||
					materiaSeleccionada.estado != false ){

				estadoMateria.checked = true;
				if ( materiaSeleccionada.estado == undefined ){
					materiaSeleccionada = getVariablesControlMateria( materiaSeleccionada );
					materiaSinEstado = true;
				}
			}

			materiaH.cells[cantidadCeldas-1].appendChild( estadoMateria );
			// log("**"+materiaH.cells.length+"-"+materiasHorario.materias.length+"-"+JSON.stringify(materiaSeleccionada ) );
			for ( var j = 0; j < numeroDias; j++ ) materiaH.cells[ 3+j ].innerHTML = materiaSeleccionada.dias[ j ];
			materiaH.cells[ cantidadCeldas-3 ].setAttribute( 'name', 'sabado' );

			activaSeleccionMateriaAlmacenada( tabla, materiaSeleccionada, posicionCheck );
		}

		if ( materiaSinEstado ){
			guardarMateriasHorario();
		}

		if ( i != 0 ){
			activaHorariosSeleccion( i );
		}
	}
}

function getControlEstadoMateriaSeleccion (){
	var estadoMaterias   = document.createElement( 'input' );

	estadoMaterias.type  = 'checkbox';
	estadoMaterias.title = MENSAJE_VISIBILIDAD_ARMA_HORARIOS;
	estadoMaterias.name  = 'incluirMateria';
	// estadoMaterias.setAttribute( 'class', 'tooltip' );

	return estadoMaterias;
}

function getEnlaceComentarioProfesor ( nombreProfesor ){
	return "<a href='#' name='diccionario' style='color:#F90;' title='"+ MENSAJE_VER_COMENTARIOS +"' class='tooltip'>"+
				nombreProfesor +
			"</a>";
}

function getControlRemoverMateria ( quitarMaterias ){
	var quitarMateria = quitarMaterias.cloneNode(true);
	quitarMateria.addEventListener( 'click', removerMateria, true );

	return quitarMateria;
}

function removerMateria (){
	if ( ventanaConfirmacionEliminacion() ){
		var grupo 	= this.parentNode.parentNode.cells[ 0 ].innerHTML;
		var materia = this.parentNode.parentNode.cells[ 1 ].innerHTML;
		var posicionMateriaSeleccion = getPosicionMateriaSeleccion( this );
		// eliminaMateriaSeleccion(grupo, materia, this.parentNode.parentNode.rowIndex, 1);
		// log("**"+this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode);
		eliminaMateriaSeleccion( grupo, materia, posicionMateriaSeleccion, ELIMINACION_SELECCION );
	}
}

function getControlEstadoMateriaSeleccionInstancia ( estadoMaterias ){
	var estadoMateria = estadoMaterias.cloneNode( true );
	estadoMateria.addEventListener( 'change', cambiarEstadoSeleccion, true );

	return estadoMateria;
}

function getVariablesControlMateria ( materiaHorario ){
	return {
		materia : materiaHorario.materia,
		profe   : materiaHorario.profe,
		grupo   : materiaHorario.grupo,
		horas   : materiaHorario.horas,
		dias    : materiaHorario.dias,
		estado  : true
	};
}

function activaSeleccionMateriaAlmacenada ( tabla, materiaHorario, posicionCheck ){
	for ( var j = POSICION_INICIO_REGISTROS; j < tabla.rows.length; j++ ){

		if ( materiaHorario.grupo == tabla.rows[ j ].cells[ 0 ].innerHTML &&
				materiaHorario.materia == tabla.rows[ j ].cells[ 1 ].innerText ){

			tabla.rows[ j ].cells[ posicionCheck ].firstChild.checked = true;
		}
	}
}

function activaHorariosSeleccion ( numeroMateriasSeleccionadas ){
	document.getElementById( ID_LISTA_SELECCION ).style.display = '';
	actualizaTotalSeleccion( numeroMateriasSeleccionadas );
	// document.getElementById( ID_TOTAL_SELECCION ).innerHTML = numeroMateriasSeleccionadas;
	atajoHorarios = true;
	verificaSeleccionSabado();
}

function getContenedorMateriaSeleccion (){
	return '<div name="contenedorRegistro"><table><tr name="registro"></tr></table></div>';
}

function vaciaGrupoMateriaContenedor ( materiaH, materiaSeleccionada ){
	materiaH.cells[ 0 ].innerHTML = materiaSeleccionada.grupo;
	materiaH.cells[ 1 ].innerHTML = materiaSeleccionada.materia;
}

function agregaControlDiccionario ( materiaH, materiaSeleccionada ){
	var controlDiccionario = destinoConexion != '' ?
								getEnlaceComentarioProfesor( materiaSeleccionada.profe ) :
								materiaSeleccionada.profe;

	materiaH.cells[ 2 ].innerHTML = controlDiccionario;
}

function agregarControlRemoverMateria( materiaH, quitarMaterias, cantidadCeldas ){
	var quitarMateria = getControlRemoverMateria( quitarMaterias );
	materiaH.cells[ cantidadCeldas-2 ].appendChild( quitarMateria );
}

function getPosicionMateriaSeleccion ( elemento ){
	return elemento
				.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
					.rowIndex;
}

function ventanaConfirmacionEliminacion (){
	return confirm( MENSAJE_CONFIRMAR_ELIMINACION );
}

function mostrarOptativas (){
	document.getElementById( ID_INFORMACION_OPTATIVAS ).removeAttribute( 'class' );
	document.getElementById( ID_LISTA_SELECCION ).ocultar();
	document.getElementById( ID_CONTENEDOR_CONTROLES_HORARIO ).ocultar();
	document.getElementById( ID_CONTENEDOR_INFORMACION_HORARIOS ).ocultar();
	document.getElementById( ID_CONTENEDOR_RESULTADOS_HORARIOS ).ocultar();
}

function ocultarOptativas (){
	document.getElementById( ID_INFORMACION_OPTATIVAS ).ocultar();
	mostrarSeleccionMaterias();
	document.getElementById( ID_CONTENEDOR_INFORMACION_HORARIOS ).removeAttribute( 'class' );
	var contadorSeleccion = document.getElementById( ID_CONTENEDOR_SELECCION_HORARIOS );

	if ( contadorSeleccion ){
		contadorSeleccion.value = 0;
	}
}

function seleccionOptativas (){
	//Construyendo la tabla de optativas
	var tituloOptativas = document.createElement( 'h3' );
	tituloOptativas.innerHTML = MENSAJE_OPTATIVAS;
	tituloOptativas.setAttribute( 'class', 'titulo_tabla' );

	var tablaOptativas = document.createElement( 'table' );
	tablaOptativas.setAttribute( 'id', ID_TABLA_OPTATIVAS );
	tablaOptativas.insertRow( 0 );
	tablaOptativas.rows[ 0 ].insertCell( 0 );
	tablaOptativas.rows[ 0 ].insertCell( 1 );
	tablaOptativas.rows[ 0 ].cells[ 0 ].innerHTML = MENSAJE_MATERIA;
	tablaOptativas.rows[ 0 ].cells[ 1 ].innerHTML = MENSAJE_OPTATIVA;

	var regresar = document.createElement( 'input' );
	regresar.type = 'button';
	regresar.value = MENSAJE_REGRESAR;
	regresar.addEventListener( 'click', ocultarOptativas, true );

	var segmentoRegresar = document.createElement( 'div' );
	segmentoRegresar.setAttribute( 'class', 'seccion_controles' );

	segmentoRegresar.appendChild( regresar );

	var informacionOptativas = document.getElementById( 'informacionOptativas' );
	informacionOptativas.appendChild( tituloOptativas);
	informacionOptativas.appendChild( tablaOptativas);
	informacionOptativas.appendChild( document.createElement( 'br' ) );
	informacionOptativas.appendChild( segmentoRegresar );
}

function cargarOptativas (){
	if ( localStorage.horarioMaterias != null && localStorage.horarioMaterias != '' ){

		var listaOptativas;

		if ( localStorage.optativas != null && localStorage.optativas != '' ){
			listaOptativas = JSON.parse( localStorage.optativas );
		} else {

			materiasHorario = JSON.parse( localStorage.horarioMaterias );
			//Agrupando los datos por materia
			listaOptativas = new Array();
			var i, j, encontrado;
			for ( i = 0; i < materiasHorario.materias.length; i++ ){
				encontrado = false;
				for ( j = 0; !encontrado && j < listaOptativas.length; j++ ){
					if ( materiasHorario.materias[ i ].materia == listaOptativas[ j ].materia ){
						encontrado = true;
					}
				}
				if ( !encontrado ){
					listaOptativas.push( { materia : materiasHorario.materias[ i ].materia, check : false } );
				}
			}
			localStorage.optativas = JSON.stringify( listaOptativas );

		}
		insertarOptativas( listaOptativas );
	}
}

function inicializarOrdenamiento (){
	var registros = document.querySelectorAll('div[name="contenedorRegistro"]');
	for (var i = 0; i < registros.length; i++){
		registros[i].addEventListener('dragstart',moviendo,false);
		registros[i].addEventListener('dragenter',sobre,false);
		registros[i].addEventListener('dragover',colocando,false);
		// registros[i].addEventListener('dragleave',saliendo,false);
		registros[i].addEventListener('drop',ingresando,false);
		registros[i].addEventListener('dragend',soltando,false);
		registros[i].setAttribute('draggable',true);
		registros[i].className = 'fuera';
	}
	posicionRegistroSeleccionado = null;
}

function verComentarios (){
	if ( destinoConexion != '' ){

		var formularioEnlace = document.createElement( 'form' );

		formularioEnlace.action = destinoConexion;
		formularioEnlace.setAttribute( 'id', ID_CONTROL_COMENTARIO_RAPIDO );
		formularioEnlace.target = '_blank';
		formularioEnlace.method = 'GET';
		// formularioEnlace.method = "POST";
		formularioEnlace.innerHTML = "<input type='hidden' name='sec' value='buscar'/><input type='hidden' name='n'/>";

		document.body.appendChild( formularioEnlace );

		var enlaces = document.getElementById( ID_CONTENEDOR_REGISTROS );
		for ( var i = 1; i < enlaces.rows.length; i++ ){
			creaEnlaceComentarioCelda( enlaces.rows[ i ].cells[ 1 ] );
			creaEnlaceComentarioCelda( enlaces.rows[ i ].cells[ 2 ] );
			// cuidado con los sin asignar y donde hay dos maestros en la misma materia
		}

		var nenlaces = document.getElementsByName( NOMBRE_ELEMENTOS_COMENTARIO_RAPIDO );
		for ( var i = 0; i < nenlaces.length; i++ ){
			nenlaces[i].addEventListener( 'click', enlaceVerComentarios, false );
		}
	}
}

function creaEnlaceComentarioCelda ( celda ){
	celda.innerHTML = getEnlaceComentario( celda.innerHTML );
}

function getEnlaceComentario ( descripcion ){
	return "<a href='#' name='"+
				NOMBRE_ELEMENTOS_COMENTARIO_RAPIDO +"' title='"+
				MENSAJE_VER_COMENTARIOS +"' class='tooltip'>"+
					descripcion +
			"</a>";
}

function cargarHorariosGenerados (){
	if ( almacenamientoResultadosNoVacio() && almacenamientoArmadoOrdenado() ){

		var gruposOrdenados = JSON.parse( localStorage.armadoOrdenado );
		var horariosPosiblesAnteriores = JSON.parse( localStorage.resultados );

		presentarHorariosGenerados( horariosPosiblesAnteriores, gruposOrdenados );
	}
}

function almacenamientoResultadosNoVacio (){
	return localStorage.resultados != null &&
				localStorage.resultados != '' &&
					localStorage.resultados != 'null';
}

function almacenamientoArmadoOrdenado (){
	return localStorage.armadoOrdenado != null &&
				localStorage.armadoOrdenado != '' &&
					localStorage.armadoOrdenado != 'null';
}

var totalHorarios = 0;
function presentarHorariosGenerados ( horariosPosiblesAnteriores, gruposOrdenados ){
	var nResultados = horariosPosiblesAnteriores.combinacion.length;
	totalHorarios = parseInt( nResultados );

	agregaControlesResultadosHorarios( nResultados );

	horarioSeleccionado = 0;
	agregaComportamientoControlSeleccionHorariosGenerado();
	construyeHorariosGenerados( horariosPosiblesAnteriores, nResultados, gruposOrdenados );
	ocultaControlesFlechas();
	agregaControlVerTodosResultados();
	agregaComportamientoControlVerTodosResultados();
}

function agregaControlesResultadosHorarios ( numeroResultados ){
	var seleccionHorarios = getContenedorControlesResultadosHorarios( numeroResultados );
	var informacion = getContenedorInformacionHorarios();

	informacion.appendChild( seleccionHorarios );
}

function getContenedorControlesResultadosHorarios ( numeroResultados ){
	var seleccionHorarios = document.createElement( 'table' );
	seleccionHorarios
		.innerHTML =
			"<tr>"+
				"<td>"+ MENSAJE_RESULTADOS_PARTE_1 + numeroResultados + MENSAJE_RESULTADOS_PARTE_2 +":</td>"+
				"<td>"+
					"<input id='"+ ID_CONTENEDOR_SELECCION_HORARIOS +"' type='number' min='0' max='"+ numeroResultados +"' value='0' size='4' title='"+ MENSAJE_VER_RESULTADO_N +"'/>"+
				"</td>"+
				"<td>"+MENSAJE_RESULTADOS_PARTE_3+"</td>"+
			"</tr>";

	seleccionHorarios.setAttribute( 'style', 'margin:0px auto;' );

	return seleccionHorarios;
}

function ocultaControlesFlechas (){
	var informacion = document.getElementById( ID_CONTENEDOR_INFORMACION_HORARIOS );

	var contenedoresControlesHorariosGenerados = informacion.querySelectorAll( 'td' );

	contenedoresControlesHorariosGenerados[ 1 ].ocultar();
	contenedoresControlesHorariosGenerados[ 2 ].ocultar();
}

function agregaControlVerTodosResultados (){
	var informacion = document.getElementById( ID_CONTENEDOR_INFORMACION_HORARIOS );
	var contenedorControlesHorariosGenerados = informacion.querySelector( 'table' );
	// var controlVerTodosResultados = getControlVerTodosResultados();

	var posicionControl = contenedorControlesHorariosGenerados.rows[ 0 ].cells.length;
	contenedorControlesHorariosGenerados.rows[ 0 ].insertCell( posicionControl );
	contenedorControlesHorariosGenerados.rows[ 0 ].cells[ posicionControl ]
		.innerHTML = '<input type="button" id="'+ ID_CONTROL_VER_TODOS_RESULTADOS +'" value="'+ MENSAJE_VER_TODOS_RESULTADOS +'">'
}

function agregaComportamientoControlVerTodosResultados (){
	var control = document.getElementById( ID_CONTROL_VER_TODOS_RESULTADOS );
	control.addEventListener( 'click', mostrarTodosResultados, true );
}

// function getControlVerTodosResultados (){
// 	var control = document.createElement( 'input' );

// 	control.type = 'button';
// 	control.value = MENSAJE_VER_TODOS_RESULTADOS;
// 	control.id = ID_CONTROL_VER_TODOS_RESULTADOS;
// }

function mostrarTodosResultados (){
	var resultados = getElementos( SELECTOR_HORARIO_GENERADO );

	if ( resultados.length > 0 ){

		if ( listadoSeleccionAsignaturasOculto() ){

			mostrarSeleccionMaterias();
			cambiaMensajeVerTodosResultados();

		} else {

			resultados.forEach( function ( elemento ){
				elemento.mostrar();
			});

			document.getElementById( ID_CONTENEDOR_RESULTADOS_HORARIOS ).mostrar();

			ocultarListadoSeleccionAsignaturas();
			cambiaMensajeOcultarTodosResultados();
		}

	}
}

function cambiaMensajeOcultarTodosResultados (){
	var control = document.getElementById( ID_CONTROL_VER_TODOS_RESULTADOS );
	control.value = MENSAJE_OCULTAR_TODOS_RESULTADOS;
}

function cambiaMensajeVerTodosResultados (){
	var control = document.getElementById( ID_CONTROL_VER_TODOS_RESULTADOS );
	control.value = MENSAJE_VER_TODOS_RESULTADOS;
}

function listadoSeleccionAsignaturasOculto (){
	return document.getElementById( ID_CONTENEDOR_CONTROLES_HORARIO ).classList
				.contains( 'oculto' );
}

function ocultarListadoSeleccionAsignaturas (){
	document.getElementById( ID_LISTA_SELECCION ).ocultar();
	document.getElementById( ID_CONTENEDOR_CONTROLES_HORARIO ).ocultar();
	document.getElementById( ID_CONTENEDOR_EXPORTAR ).ocultar();
}

function getContenedorInformacionHorarios (){
	var informacion = document.getElementById( ID_CONTENEDOR_INFORMACION_HORARIOS );
	informacion.setAttribute( 'style', 'text-align:center;' );
	// informacion.style = "text-aling:center;";
	// informacion.innerHTML 	= "Hay "+nResultados+" resultados: ";

	reseteaContenidoElemento( informacion );

	return informacion;
}

function agregaComportamientoControlSeleccionHorariosGenerado (){
	var seleccionHorarios = document.getElementById( ID_CONTENEDOR_SELECCION_HORARIOS );

	seleccionHorarios.setAttribute( 'style','text-align:center;' );
	seleccionHorarios.addEventListener( 'keyup', seleccionarHorario, true );
	seleccionHorarios.addEventListener( 'change', seleccionarHorario, true );
}

function seleccionarHorario (){
	if ( this.value != '' && this.value.length > 0 ){

		var numeroResultado = parseInt( this.value );
		if ( numeroResultado  >= 0  &&
				numeroResultado <= document.getElementById( ID_CONTENEDOR_SELECCION_HORARIOS ).getAttribute( 'max' ) ){

			switch (numeroResultado){
				case 0:
					mostrarSeleccionMaterias();
					break;
				default:
					mostrarHorarioGenerado( numeroResultado );
					break;
			}

		}

	}
}

function mostrarHorarioGenerado( numero ){
	if ( numero <= totalHorarios ){
		ocultarHorariosGenerados();

		document.getElementById( ID_HORARIO_GENERADO_SEGMENTO+numero).removeAttribute( 'class' );
		document.getElementById( ID_CONTENEDOR_RESULTADOS_HORARIOS ).removeAttribute( 'class' );

		ocultarListadoSeleccionAsignaturas();
	}
}

function ocultarHorariosGenerados (){
	var horariosGenerados = document.getElementsByName( 'horariosGenerados' );
	for ( var i = 0; i < horariosGenerados.length; i++) horariosGenerados[ i ].ocultar();
}

function construyeHorariosGenerados ( horariosPosiblesAnteriores, numeroResultados, gruposOrdenados ){
	var tablaInformacion = getPlantillaHorarioResultado( horariosPosiblesAnteriores );

	cargarMateriasHorarioGuardadas();

	var resultadoHorarios = document.getElementById( ID_CONTENEDOR_RESULTADOS_HORARIOS );
	reseteaContenidoElemento( resultadoHorarios );

	for ( var n = 0; n < numeroResultados; n++ ){

		var combinacionHorarioResultado = horariosPosiblesAnteriores.combinacion[ n ];
		var tablaInformacionN = getHorarioResultado( tablaInformacion, combinacionHorarioResultado, n, gruposOrdenados );

		tablaInformacionN.setAttribute( 'id', ID_HORARIO_GENERADO_SEGMENTO+(n+1) );
		tablaInformacionN.setAttribute( 'name', NOMBRE_CONTENEDOR_HORARIOS_GENERADOS );
		resultadoHorarios.appendChild( tablaInformacionN );
	}
}

function reseteaContenidoElemento ( elemento ){
	elemento.innerHTML = '';
}

function getHorarioResultado ( tablaInformacion, combinacionHorarioResultado, n, gruposOrdenados ){
	var tablaInformacionN = tablaInformacion.cloneNode( true );

	var posicionInformacionMateria = { posicion : 0 };
	var mostrarSabado = false;

	for ( var i = 0; i < combinacionHorarioResultado.secuencia.length; i++ ){

		construyeHorarioResultado( tablaInformacionN, i, combinacionHorarioResultado,
										gruposOrdenados, posicionInformacionMateria );

		var materiaInformacion = materiasHorario.materias[ posicionInformacionMateria.posicion ];

		if ( validaActivacionSabado( mostrarSabado, materiaInformacion ) ) mostrarSabado = true;
	}

	if ( !mostrarSabado ) {
		ocultaSabadoHorario( tablaInformacionN );
	}

	return tablaInformacionN;
}

function construyeHorarioResultado ( tablaInformacionN, i, combinacionHorarioResultado, gruposOrdenados, posicionInformacionMateria ){

	var registroTablaInformacion = tablaInformacionN.rows[ i+1 ];
	var materiaGrupoOrdenado = gruposOrdenados.materias[ i ];
	var materiaSeleccionadaGrupoOrdenado = materiaGrupoOrdenado.grupos[ combinacionHorarioResultado.secuencia[ i ] ];

	registroTablaInformacion.cells[ COLUMNA_GRUPO ].innerHTML = materiaSeleccionadaGrupoOrdenado.grupo;
	registroTablaInformacion.cells[ COLUMNA_NOMBRE_ASIGNATURA2 ].innerHTML = getNombreMateriaResultado( materiaGrupoOrdenado );
	agregaNombreProfesorHorarioResultado( registroTablaInformacion, materiaSeleccionadaGrupoOrdenado );

	posicionInformacionMateria.posicion = getPosicionRegistroInformacionMateria( registroTablaInformacion );
	var registroInformacionMateria = getRegistroInformacionMateria( registroTablaInformacion, posicionInformacionMateria.posicion );

	vaciaHorasMateria( registroTablaInformacion, registroInformacionMateria );
}

function getPlantillaHorarioResultado ( horariosPosiblesAnteriores ){
	var tablaInformacion = document.createElement( 'table' );

	tablaInformacion.ocultar();
	tablaInformacion.innerHTML = getEstructuraDiasHorario();

	var numeroRegistrosMaterias = horariosPosiblesAnteriores.combinacion[ 0 ].secuencia.length;

	for ( var i = 0; i < numeroRegistrosMaterias; i++ ){
		tablaInformacion.insertRow( i+1 );

		for ( var k = 0; k < NUMERO_COLUMNAS_HORARIO_GENERADO; k++ ) tablaInformacion.rows[ i+1 ].insertCell( k );
	}

	return tablaInformacion;
}

function getEstructuraDiasHorario (){
	return 	'<tr style="background-color:#FF9900; color:white;"><td>'+ MENSAJE_GRUPO
				+ '</td> <td>'+ MENSAJE_MATERIA
				+ '</td> <td>'+ MENSAJE_PROFESOR
				+ '</td> <td>'+ MENSAJE_LUNES
				+ '</td> <td>'+ MENSAJE_MARTES
				+ '</td> <td>'+ MENSAJE_MIERCOLES
				+ '</td> <td>'+ MENSAJE_JUEVES
				+ '</td> <td>'+ MENSAJE_VIERNES
				+ '</td> <td>'+ MENSAJE_SABADO
			+ '</td> </tr>';
}

function getNombreMateriaResultado ( materiaGrupoOrdenado ){
	if ( materiaGrupoOrdenado.materia == 'optativa' ){
		return materiaGrupoOrdenado.grupos[ combinacionHorarioResultado.secuencia[ i ] ].materia;
	}

	return materiaGrupoOrdenado.materia;
}

function agregaNombreProfesorHorarioResultado ( registroTablaInformacion, materiaSeleccionadaGrupoOrdenado ){
	if ( destinoConexion != '' ){

		var enlaceDiccionario = getEnlaceReferenciaProfesor( materiaSeleccionadaGrupoOrdenado );
		registroTablaInformacion.cells[ COLUMNA_PROFESOR ].appendChild( enlaceDiccionario );

	} else {
		registroTablaInformacion.cells[ COLUMNA_PROFESOR ].innerHTML = materiaSeleccionadaGrupoOrdenado.profe;
	}
}

function getEnlaceReferenciaProfesor ( materiaSeleccionadaGrupoOrdenado ){
	var enlaceDiccionario = document.createElement( 'a' );

	enlaceDiccionario.href = '#';
	enlaceDiccionario.setAttribute('style','color : #F90;');
	enlaceDiccionario.innerHTML = materiaSeleccionadaGrupoOrdenado.profe;

	enlaceDiccionario.addEventListener( 'click', enlaceVerComentarios, false );

	return enlaceDiccionario;
}

function getRegistroInformacionMateria ( registroTablaInformacion, posicion ){

	return materiasHorario.materias[ posicion ];
}

function getPosicionRegistroInformacionMateria ( registroTablaInformacion ){
	var j;
	var informacionMateria;
	for ( j = 0; j < materiasHorario.materias.length; j++ ){

		informacionMateria = materiasHorario.materias[ j ];
		if ( registroTablaInformacion.cells[ COLUMNA_GRUPO ].innerHTML == informacionMateria.grupo &&
				registroTablaInformacion.cells[ COLUMNA_NOMBRE_ASIGNATURA2 ].innerHTML == informacionMateria.materia ){

			break;
		}

	}

	return j;
}

function vaciaHorasMateria ( registroTablaInformacion, registroInformacionMateria ){
	for ( var k = COLUMNA_INICIO_HORAS; k < NUMERO_COLUMNAS_HORARIO_GENERADO; k++ ) {

		registroTablaInformacion.cells[ k ].innerHTML = registroInformacionMateria.dias[ k-COLUMNA_INICIO_HORAS ];
	}
}

function validaActivacionSabado ( mostrarSabado, materiaInformacion ){
	return ( !mostrarSabado && materiaInformacion.dias[ NUMERO_DIAS_HORARIO ] != ESPACIO_HTML );
}

function ocultaSabadoHorario ( tablaInformacionN ){
	// log("horariosGenerados - ocultando sábado");
	for ( var k = 0; k < tablaInformacionN.rows.length; k++ ){
		tablaInformacionN.rows[ k ].cells[ COLUMNA_DIA_SABADO2 ].style.display = 'none';
	}
}

function cargarTraslapes (){
	if ( localStorage.traslapes != null && localStorage.traslapes != '' &&
			localStorage.armadoOrdenado != null && localStorage.armadoOrdenado != ''){

		informeTraslapes( JSON.parse( localStorage.traslapes ),JSON.parse( localStorage.armadoOrdenado ) );
	}
}

function informeTraslapes ( infoTraslapes, gruposOrdenados ){
	if ( infoTraslapes.length > 0 ){
		//Guardando los traslapes
		localStorage.traslapes = JSON.stringify( infoTraslapes );

		//Organizando la información de los traslapes
		/*
		var materias;
		if (localStorage.materiasTraslapes != null && localStorage.materiasTraslapes != ""){
			materias = JSON.parse(localStorage.materiasTraslapes);
		} else {
			materias = agrupaMaterias(infoTraslapes);
			materias = nombreMaterias(materias,gruposOrdenados);
			materias = ordenaSecuenciaMaterias(materias);
			materias = agregaIdMaterias(materias);
			localStorage.materiasTraslapes = JSON.stringify(materias);
		}
		*/
		var materias = agrupaMaterias( infoTraslapes );
		materias = nombreMaterias( materias,gruposOrdenados );
		materias = ordenaSecuenciaMaterias( materias );
		materias = agregaIdMaterias( materias );
		localStorage.materiasTraslapes = JSON.stringify( materias );

		//Generando la tabla de identificadores
		var tituloTraslapes = document.createElement( 'h3' );
		tituloTraslapes.innerHTML = MENSAJE_TITULO_TRASLAPES;
		tituloTraslapes.setAttribute( 'class', 'titulo_tabla' );

		var traslapes = document.createElement('table');
		traslapes.setAttribute('class', 'traslapes');
		traslapes.setAttribute('name', 'traslapes');
		traslapes.insertRow(0);
		traslapes.rows[ 0 ].insertCell( 0 );
		traslapes.rows[ 0 ].insertCell( 1 );
		traslapes.rows[ 0 ].insertCell( 2 );
		traslapes.rows[ 0 ].cells[0].innerHTML = MENSAJE_GRUPO;
		traslapes.rows[ 0 ].cells[1].innerHTML = MENSAJE_MATERIA;
		traslapes.rows[ 0 ].cells[2].innerHTML = MENSAJE_ID;
		traslapes.rows[ 0 ].setAttribute( 'class', 'titulos' );

		var fila = 1;
		var secuencia = '';
		var posicionCambioSecuencia;
		var anchoSecuencia = 1;
		var filaDatos;
		for (var i = 0; i < materias.length; i++, fila++){
			traslapes.insertRow(fila);
			traslapes.rows[fila].insertCell(0);
			traslapes.rows[fila].insertCell(1);
			if (secuencia != materias[i].secuencia){
				posicionCambioSecuencia = fila;
				traslapes.rows[fila].insertCell(2);
				secuencia = materias[i].secuencia;
				traslapes.rows[fila].cells[0].innerHTML = secuencia;
				filaDatos = 1;
				anchoSecuencia = 1;
			} else {
				anchoSecuencia++;
				traslapes.rows[posicionCambioSecuencia].cells[0].setAttribute( 'rowspan', anchoSecuencia );
				filaDatos = 0;
			}
			traslapes.rows[fila].cells[filaDatos].innerHTML = materias[i].materia;
			traslapes.rows[fila].cells[filaDatos+1].innerHTML = materias[i].id;
		}

		var detalles = document.getElementById( ID_CONTENEDOR_TRASLAPES );
		detalles.innerHTML = 	"<div class='tabla'>"+
									"<div class='celda'>"+
										"<h3 class='titulo_tabla'>"+ MENSAJE_TITULO_TRASLAPES +"</h3>"+
									"</div>"+
									"<div class='celda'>"+
										"<h3 class='titulo_tabla'>"+ MENSAJE_DETALLE_TRASLAPES +"</h3>"+
									"</div>"+
								"</div>"+
								"<br/>";

		detalles.children[ 0 ].children[ 0 ].appendChild( traslapes );
		detalles.children[ 0 ].children[ 0 ].appendChild( traslapes );

		//Generando tabla de resultados
		traslapes = document.createElement( 'table' );
		traslapes.setAttribute( 'name', 'traslapes' );
		traslapes.insertRow( 0 );
		traslapes.rows[ 0 ].insertCell( 0 );
		traslapes.rows[ 0 ].insertCell( 1 );
		traslapes.rows[ 0 ].insertCell( 2 );
		traslapes.rows[ 0 ].cells[ 0 ].innerHTML = MENSAJE_ID;
		traslapes.rows[ 0 ].cells[ 1 ].innerHTML = MENSAJE_GRADO_TRASLAPE;
		traslapes.rows[ 0 ].cells[ 2 ].innerHTML = MENSAJE_CONFLICTOS;


		var totalResultados = 1;
		for (var i = 0; i < gruposOrdenados.materias.length; i++){
			totalResultados *= gruposOrdenados.materias[i].grupos.length;
		}

		for (var i = 0; i < infoTraslapes.length; i++){
			traslapes.insertRow(i+1);
			traslapes.rows[i+1].insertCell(0);
			traslapes.rows[i+1].insertCell(1);
			traslapes.rows[i+1].insertCell(2);
			// id = buscaIdentificador(infoTraslapes[i],materias);
			// porcentaje = calculaImpacto(infoTraslapes[i],gruposOrdenados);
			// conflictos = listaConflictos(infoTraslapes[i],materias);
			traslapes.rows[i+1].cells[0].innerHTML = "<a href='#' name='traslape' title='"+ MENSAJE_MARCAR_TRASLAPE +"' class='tooltip' style='color : #F5E638;'>"+ buscaIdentificador( infoTraslapes[ i ],materias ) +"</a>";
			traslapes.rows[i+1].cells[1].innerHTML = calculaImpacto(infoTraslapes[i],gruposOrdenados.materias,totalResultados);
			traslapes.rows[i+1].cells[2].innerHTML = listaConflictos(infoTraslapes[i],materias);
		}
		detalles.children[0].children[1].appendChild(traslapes);

		var regresar = document.createElement( 'input' );
		regresar.type = 'button';
		regresar.value = MENSAJE_REGRESAR;
		regresar.addEventListener( 'click', mostrarDetalleTraslapes, true );
		detalles.appendChild( regresar );

		var botonDetalles = document.createElement( 'input' );
		botonDetalles.type = 'button';
		botonDetalles.value = MENSAJE_VER_TRASLAPES;
		botonDetalles.addEventListener( 'click', mostrarDetalleTraslapes, true );

		//Colocando el botón en los controles, si es que hay resultados
		var informacionHorarios = document.getElementById( ID_CONTENEDOR_INFORMACION_HORARIOS );
		if ( informacionHorarios.innerText != MENSAJE_SIN_RESULTADOS ){
			// log("##"+informacionHorarios.innerHTML);
			informacionHorarios = informacionHorarios.children[0].rows[0].cells[2];
		}
		informacionHorarios.appendChild(botonDetalles);
		verTraslapes();
	} else {
		localStorage.traslapes = "";
	}
}

function agrupaMaterias (traslapes){
	var materias = new Array();
	var i, j, k, encontrado, materia;
	for (i = 0, k = -1; i < traslapes.length;){
		if (k < 0) {
			materia = { nivel : traslapes[i].nivel, opcion : traslapes[i].opcion };
			k++;
		} else {
			if (k < traslapes[i].colision.length){
				materia = { nivel : traslapes[i].colision[k].nivel, opcion : traslapes[i].colision[k].opcion };
				k++;
			} else {
				i++;
				k = -1;
			}
		}
		encontrado = false;
		for (j = 0; !encontrado && j < materias.length; j++){
			if (materias[j].nivel == materia.nivel && materias[j].opcion == materia.opcion){
				encontrado = true;
			}
		}
		if (!encontrado){
			materias.push({ nivel : materia.nivel, opcion : materia.opcion });
		}
	}

	return materias;
}

function nombreMaterias (materias, gruposOrdenados){
	try {
		for (var i = 0; i < materias.length; i++){
			materias[i].secuencia = gruposOrdenados.materias[materias[i].nivel].grupos[materias[i].opcion].grupo;
			if (gruposOrdenados.materias[materias[i].nivel].materia != "optativa"){
				materias[i].materia = gruposOrdenados.materias[materias[i].nivel].materia;
			} else {
				materias[i].materia = gruposOrdenados.materias[materias[i].nivel].grupos[materias[i].opcion].materia;
			}
		}
	} catch (error){
		log("Problema presentacion de resultados");
	}
	return materias;
}

function ordenaSecuenciaMaterias (materias){
	var ordenado = new Array()
	if (materias.length > 1){
		var i, j, almacenado;
		for (i = 0; i < materias.length; i++){
			almacenado = false;
			for (j = 0; !almacenado && j < ordenado.length; j++){
				if (materias[i].secuencia < ordenado[j].secuencia){
					var temp, temp2;
					if (j != 0 && j != ordenado.length-1){
						// log("A"+j);
						temp = ordenado.slice(0,j);
						temp2 = ordenado.slice(j);
						temp.push(materias[i]);
						// log("#########\n["+ordenado.length+"]\n"+JSON.stringify(ordenado));
						ordenado = temp.concat(temp2);
						// ordenado = temp.slice(0);
						// ordenado = temp;
						// ordenado.push(materias[i]);
						almacenado = true;
						break;
					}
					if (j == 0){
						// log("B");
						ordenado.unshift(materias[i]);
						almacenado = true;
					}
					if (j == ordenado.length-1){
						// log("C");
						temp = ordenado.pop();
						ordenado.push(materias[i],temp);
						almacenado = true;
					}
					break;
				}
			}
			if (!almacenado){
				// log("D");
				ordenado.push(materias[i]);
			}
		}
	} else ordenado = materias;
	// log("["+ordenado.length+"]\n"+JSON.stringify(ordenado));
	return ordenado;
}

function agregaIdMaterias (materias){
	var letra = 65;
	for (var i = 0; i < materias.length; i++, letra++){
		materias[i].id = String.fromCharCode(letra);
	}
	return materias;
}

function verTraslapes (){
	var materiasTraslapes = document.getElementsByName("traslape");
	for (var i = 0; i < materiasTraslapes.length; i++){
		materiasTraslapes[i].addEventListener("click",marcaTraslapes,true);
	}
}

function marcaTraslapes (){
	removerMarcaResaltado();
	// log("1");
	mostrarDetalleTraslapes(this);
	// log("2");
	var materias  = JSON.parse(localStorage.materiasTraslapes);
	var traslapes = JSON.parse(localStorage.traslapes);
	var detalle;
	// log("3\n"+this.innerText);
	for (var i = 0; i < materias.length; i++){
		if (this.innerText == materias[i].id) {
			// log("3.5\n"+JSON.stringify(materias[i]));
			detalle = materias[i];
			break;
		}
	}
	for (var i = 0; i < traslapes.length; i++){
		if (detalle.nivel == traslapes[i].nivel && detalle.opcion == traslapes[i].opcion) {
			// log("3.8\n"+JSON.stringify(traslapes[i]));
			detalle = traslapes[i];
			break;
		}
	}
	// log("4\n"+JSON.stringify(detalle));
	detalle = datosTraslape(detalle, materias);
	// log("5\n"+JSON.stringify(detalle));

	//Quitando el estilo a los registros ya resaltados
	removerResaltado();
	// log("6");

	//Agregando el estilo para resaltar
	registros = document.querySelectorAll('div[name="contenedorRegistro"]');
	for (i = 0; i < detalle.length; i++){
		for (j = 0; j < registros.length; j++){
			// log("6.1\n"+detalle[i].secuencia+" | "+registros[j].children[0].rows[0].cells[0].innerHTML+"\n"+detalle[i].materia+" | "+registros[j].children[0].rows[0].cells[1].innerHTML);
			if (detalle[i].secuencia == registros[j].children[0].rows[0].cells[0].innerHTML && detalle[i].materia == registros[j].children[0].rows[0].cells[1].innerHTML){
				// log("6.5");
				registros[j].classList.add("resaltar");
				registros[j].children[0].rows[0].cells[2].innerHTML = "<span class='resaltar'></span>"+registros[j].children[0].rows[0].cells[2].innerHTML;
				break;
			}
		}
	}
	// log("7");
}
function removerMarcaResaltado (){
	var posicionesFilasMarcas = new Array();
	var registros = document.querySelectorAll('span.resaltar');
	for (var i = 0; i < registros.length; i++){
		registros[i].parentNode.removeChild(registros[i]);
		// posicionesFilasMarcas.push(registros[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.rowIndex);
	}
	// registros = document.getElementById("tablaAsignaturas");
	// for (i = 0; i < posicionesFilasMarcas.length; i++){
	// 	registros.rows[posicionesFilasMarcas[i]].cells[0].children[0].children[0].rows[0].cells[2].removeChild()
	// }
}
function removerResaltado (){
	// log("removerResaltado\t\t1");
	var registros = document.querySelectorAll('div.resaltar');
	for (var i = 0; i < registros.length; i++){
		registros[i].classList.remove("resaltar");
	}
	// log("removerResaltado\t\t2");
}

function calculaImpacto ( materia, gruposOrdenados, totalResultados ){
	var gradoImpacto = 1;
	for (var i = materia.nivel+1; i < gruposOrdenados.length; i++){
		gradoImpacto *= gruposOrdenados[i].grupos.length;
	}
	var totalRepeticiones = 0;
	for (var i = 0; i < materia.colision.length; i++){
		totalRepeticiones += materia.colision[i].repeticiones;
	}
	gradoImpacto *= totalRepeticiones * 100;
	// log("##########"+gradoImpacto+"*"+totalRepeticiones+"/"+totalResultados);
	gradoImpacto /= totalResultados;

	return gradoImpacto.toFixed(1);
}

function listaConflictos ( materia, materiasNombradas ){
	var conflictos = new Array();
	for ( var i = 0; i < materia.colision.length; i++ ){
		conflictos.push( buscaIdentificador( materia.colision[ i ], materiasNombradas ) );
	}

	return conflictos.join( ',' );
}

function mostrarDetalleTraslapes (){
	switch ( this.value ){
		case MENSAJE_VER_TRASLAPES:
			document.getElementById( ID_CONTENEDOR_TRASLAPES ).removeAttribute( 'class' );
			document.getElementById( ID_LISTA_SELECCION ).classList.add( 'oculto' );
			document.getElementById( ID_CONTENEDOR_CONTROLES_HORARIO ).classList.add( 'oculto' );
			document.getElementById( ID_CONTENEDOR_INFORMACION_HORARIOS ).classList.add( 'oculto' );
			document.getElementById( ID_CONTENEDOR_RESULTADOS_HORARIOS ).classList.add( 'oculto' );
			break;
		case MENSAJE_REGRESAR:
		default:
			document.getElementById( ID_CONTENEDOR_TRASLAPES ).classList.add( 'oculto' );
			mostrarSeleccionMaterias();
			document.getElementById( ID_CONTENEDOR_INFORMACION_HORARIOS ).removeAttribute( 'class' );
			var seleccionHorarios = document.getElementById( ID_CONTENEDOR_SELECCION_HORARIOS );
			if (seleccionHorarios != null){
				seleccionHorarios.value = 0;
			}
			break;
	}
}

function buscaIdentificador ( materia, materiasNombradas ){
	var id;
	for ( var i = 0; i < materiasNombradas.length; i++ ){

		if ( materia.nivel == materiasNombradas[ i ].nivel &&
				materia.opcion == materiasNombradas[ i ].opcion ){

			id = materiasNombradas[ i ].id;
			break;
		}

	}

	return id;
}

function controlaAccesosApp (){
	setTimeout( detectaIdentificacionAccesos, TIEMPO_VERIFICACION_IDENTIFICACION );
}

function detectaIdentificacionAccesos (){
	var usuario = getElemento( SELECTOR_USUARIO_IDENTIFICACION );

	if ( usuario != null ){
		ocultaAccesosApp();
	} else {
		muestraAccesosApp();
	}
}

function ocultaAccesosApp (){
	try {
		androidJs.ocultaAccesosRapidos();
	} catch ( error ){
		log( 'No pudo ocultar los accesos' );
	}
}

function muestraAccesosApp (){
	try {
		androidJs.muestraAccesosRapidos();
	} catch ( error ){
		log( 'No pudo mostrar los accesos' );
	}
}

var IDENTIFICACION_USUARIO  = 'usuario';
var IDENTIFICACION_PASSWORD = 'password';

var SELECTOR_USUARIO_IDENTIFICACION = '#ctl00_leftColumn_LoginUser_UserName';
var SELECTOR_PASS_IDENTIFICACION    = '#ctl00_leftColumn_LoginUser_Password';

var SELECTOR_SUBMENU       = '#ctl00_subMenu';
var SELECTOR_CONTENEDOR    = '.container';
var SELECTOR_NAVEGACION    = '#mainnav';
var SELECTOR_SUBNAVEGACION = '#subnav';

var SELECTOR_COLUMNA_IZQUIERDA = '#leftcolumn';
var SELECTOR_ACCESOS_RAPIDOS   = '#rightcolumn';

var SELECTOR_CONTENIDO_PRINCIPAL            = '#floatwrapper';
var SELECTOR_CONTENEDOR_CONTENIDO_PRINCIPAL = '#contentwrapper';

var SELECTOR_ELEMENTOS_MENU_SECCIONES  = '#leftcolumn .item';
var SELECTOR_CONTENEDOR_MENU_SECCIONES = '#leftcolcontainer';
var SELECTOR_CONTENEDOR_CENTRAL        = '#centercolumn';
var SELECTOR_CONTENEDOR_NAVEGACION     = '#breadcrumbs';

var SELECTOR_OPCIONES_SECCIONES = '#subnav > table > tbody > tr > td > table';
var SELECTOR_CONTENEDOR_DESCENTRALIZADO = '#copy';

var SELECTOR_CONTENEDOR_OCUPABILIDAD = '#ctl00_mainCopy_GrvOcupabilidad';
var SELECTOR_PIE_PAGINA = '#footer';
var SELECTOR_CONTROL_REGISTROS = '#regs';

var SELECTOR_ETIQUETA_CARRERA = '#ctl00_mainCopy_txtCarrera';
var SELECTOR_ETIQUETA_PLAN    = '#ctl00_mainCopy_txtplan';

var SELECTOR_GRUPO_CALIFICACIONES = '#ctl00_mainCopy_Lbl_Kardex table';

var SELECTOR_PRESENTACION_DATOS  = '#ctl00_mainCopy_PnlDatos';
var SELECTOR_TABLA_EQUIVALENCIAS = '#ctl00_mainCopy_GV_EquivalenciasA';
var SELECTOR_CONTROL_DEPORTE     = '#ctl00_mainCopy_BtnAgregarDep';
var SELECTOR_CONTROL_COMPETENCIA = '#ctl00_mainCopy_BtnAgregarComp';
var SELECTOR_CONTENEDOR_AGENDA   = '#ctl00_mainCopy_Panel';
var SELECTOR_TABLA_AGENDA        = '#ctl00_mainCopy_Panel table';
var SELECTOR_CONTROL_COMPROBANTE = '#ctl00_mainCopy_BtnComprobante';

var SELECTOR_CONTENEDOR_CONTROLES_ETS = 'div#copy br+table';
var SELECTOR_ETIQUETAS_CONTROLES_ETS  = 'div#copy table table tr td:first-child input';

var SELECTOR_CONTENEDOR_FICHA_REINSCRIPCION = '#copy .container';

var SELECTOR_CONTENEDOR_PRINCIPAL = '#wrapper';

var DENTRO_DE  = 0;
var ANTES_DE   = 1;
var DESPUES_DE = 2;

var ENLACE_REGLAMENTO = 'http://www.contenido.ccs.ipn.mx/G-866-2011-E.pdf';

var PAGINA_ETS_PRINCIPAL              = '/Alumnos/ETS/default.aspx';
var PAGINA_REGLAMENTO                 = '/Reglamento/Default.aspx';
var PAGINA_SPA_PRINCIPAL              = '/Alumnos/Saberes/DEFAULT.ASPX';
var PAGINA_SPA_INSCRIPCION            = '/Alumnos/Saberes/Inscripcion_Saberes.aspx';
var PAGINA_SPA_CALIFICACIONES         = '/Alumnos/Saberes/calificaciones_saberes.aspx';
var PAGINA_PROFESORES_PRINCIPAL       = '/Alumnos/Evaluacion_Docente/Default.aspx';
var PAGINA_ALUMNOS_GENERAL            = '/Alumnos/info_alumnos/Datos_Alumno.aspx';
var PAGINA_ALUMNOS_MEDICOS            = '/Alumnos/info_alumnos/DatosAlumnosMedicos.aspx';
var PAGINA_ALUMNOS_DEPORTIVOS         = '/Alumnos/info_alumnos/DatosAlumnosDeportivos.aspx';
var PAGINA_ALUMNOS_CALIFICACIONES     = '/Alumnos/Informacion_semestral/calificaciones_sem.aspx';
var PAGINA_OCUPABILIDAD               = '/Academica/Ocupabilidad_grupos.aspx';
var PAGINA_INICIO                     = '/';
var PAGINA_PRINCIPAL1                 = '/default.aspx';
var PAGINA_PRINCIPAL2                 = '/Default.aspx';
var PAGINA_INICIO_ACCESO              = '/alumnos/default.aspx';
var PAGINA_KARDEX                     = '/Alumnos/boleta/kardex.aspx';
var PAGINA_EQUIVALENCIAS              = '/Academica/Equivalencias.aspx';
var PAGINA_CALENDARIO_PARCIALES       = '/Academica/Calendario.aspx';
var PAGINA_CALENDARIO_ETS             = '/Academica/Calendario_ets.aspx';
var PAGINA_CALENDARIO_ETS2            = '/Academica/calendario_ets.aspx';
var PAGINA_INSCRIPCION_ACTUAL_HORARIO = '/Alumnos/Informacion_semestral/Horario_Alumno.aspx';
var PAGINA_AGENDA_ESCOLAR             = '/Academica/agenda_escolar.aspx';
var PAGINA_MAPA_CURRICULAR            = '/Academica/mapa_curricular.aspx';
var PAGINA_FICHA_REINSCRIPCION        = '/Alumnos/Reinscripciones/fichas_reinscripcion.aspx';
var PAGINA_COMPROBANTE_HORARIO        = '/Alumnos/Reinscripciones/Comprobante_Horario.aspx';
var PAGINA_REINSCRIBIR                = '/Alumnos/Reinscripciones/reinscribir.aspx';
var PAGINA_REPORTE_REINSCRIPCION      = '/Alumnos/Reinscripciones/Reporte_Horario.aspx';
var PAGINA_TUTORES_COMENTARIOS        = '/Alumnos/tutores/comentarios.aspx';
var PAGINA_TUTORES_EVUALUACION        = '/Alumnos/tutores/Evaluacion_Tutores.aspx';
var PAGINA_HORARIOS                   = '/Academica/horarios.aspx';

var COLUMNA_LUGARES_DISPONIBLES = 6;
var COLUMNA_GRUPO               = 0;
var COLUMNA_MATERIA             = 2;
var COLUMNA_DIA_SABADO          = 10;
var COLUMNA_PROFESOR            = 2;
var COLUMNA_MATERIA2            = 1;
var COLUMNA_NOMBRE_ASIGNATURA   = 2;
var COLUMNA_NOMBRE_ASIGNATURA2  = 1;
var COLUMNA_INICIO_HORAS        = 3;
var COLUMNA_DIA_SABADO2         = 8;

var COLUMNA_AJUSTAR_NOMBRE_1 = 1;

var MENSAJE_CONTROL_BUSCAR   = 'Buscar...';
var CONTROL_IMPORTAR = 'Importar';
var CONTROL_RECARGAR = 'Recargar';

var MENSAJE_CONTROL_VER_TODO = 'Ver todo';

var MENSAJE_IMPORTAR      = 'Importar una selección.';
var MENSAJE_IMPORTAR_AREA = ' ó arrástrelo a esta área.';

var MENSAJE_COLUMNA_COMENTARIOS = 'Comentar';

var CONTROL_FILTRAR_SELECCION = 'Filtrar selección (Horarios)';

var MENSAJE_SIN_SELECCION             = 'No ha seleccionado ninguna materia.';
var MENSAJE_SIN_SELECCION_DESCRIPCION = 'No ha seleccionado ninguna materia (Sección de Horarios).';

var BUSCADOR_OCUPABILIDAD = 1;
var BUSCADOR_HORARIOS     = 2;

var POSICION_INICIO_CONTROL_BUSCADOR = 1;

var ID_CONTROL_CONTADOR    = 'contador';
var ID_CONTROL_EXPIMP      = 'expImp';
var ID_CONTROL_IMPORTACION = 'exportarSeleccion';
var ID_CONTROL_VER_TODO    = 'ver';
var ID_CONTROL_BUSCAR      = 'buscar';

var ID_CONTROL_COMENTARIO_RAPIDO = 'formularioEnlace';

var ID_CONTENEDOR_EXPORTAR = 'exportar';

var ID_CONTROL_MAPA_CURRICULAR      = 'ctl00_mainCopy_GridView1';
var ID_CONTENEDOR_HORARIOS          = 'ctl00_mainCopy_dbgHorarios';
var ID_CONTENEDOR_OCUPABILIDAD      = 'ctl00_mainCopy_GrvOcupabilidad';
var ID_CONTENEDOR_PANEL1            = 'ctl00_mainCopy_Panel1';
var ID_CONTENEDOR_PANEL2            = 'ctl00_mainCopy_Panel2';
var ID_CONTENEDOR_EQUIVALENCIAS     = 'ctl00_mainCopy_UP';
var ID_CONTROL_PARCIAL              = 'ctl00_mainCopy_dpdnombrecaptura';
var ID_CONTENIDO_INFORMACION        = 'ctl00_mainCopy_PnlDatos';
var ID_TABLA_HORARIO_ACTUAL         = 'ctl00_mainCopy_GV_Horario';
var ID_TABLA_HORARIO_ACTUAL2        = 'ctl00_mainCopy_GV_Horario2';
var ID_CONTROL_PLAN_ESTUDIOS        = 'ctl00_mainCopy_dpdplan';
var ID_CONTENEDOR_ELEMENTO          = 'ctl00_mainCopy_div';
var ID_CONTROL_EVALUACION_TUTORES   = 'ctl00_mainCopy_Pnl_Evaluacion';
var ID_CONTROL_CUESTIONARIO_TUTORES = 'ctl00_mainCopy_Pnl_Cuestionario';

var ID_CONTENEDOR_CENTRAL   = 'contentwrapper';
var ID_ACCESOS_RAPIDOS      = 'rightcolumn';
var ID_PIE_PAGINA           = 'footer';
var ID_OPCIONES_MENU        = 'leftcolumn';
var ID_CONTENIDO_CENTRAL    = 'floatwrapper';
var ID_SUBCONTENIDO_CENTRAL = 'centercolumn';
var ID_CONTENEDOR_PAGINA    = 'wrapper';

var ID_CONTENEDOR_REGISTROS = 'regs';

var ID_COMENTARIO_PROFESOR = 'comentarioProfesor';
var ID_COMENTARIO_MATERIA  = 'comentarioMateria';

var ID_CONTENEDOR_BOLETA = 'ctl00_leftColumn_LoginNameSession';

var ID_CONTROL_HORARIOS_VIGENTES      = 'ctl00_mainCopy_UpdatePanel2';
var ID_CONTROL_HORARIOS_SELECCIONADOS = 'ctl00_mainCopy_UpdatePanel1';

var ID_CONTADOR_ASIGNATURAS_INSCRIPCION = 'contadorInscripcion';
var ID_CONTENEDOR_MATERIAS_SELECCIONADAS = 'asignaturas';

var CODIGO_TECLA_DELETE   = 8;
var CODIGO_TECLA_SUPRIMIR = 46;
var CODIGO_TECLA_ENTER    = 13;
var CODIGO_TECLA_ESCAPE   = 27;

var POSICION_TITULOS               = 0;
var POSICION_INICIO_REGISTROS      = 1;
var POSICION_INICIO_NOMBRE_PLANTEL = 9;

var TIEMPO_ACTUALIZACION_REINSCRIBIR = 500;
var TIEMPO_VERIFICACION_IDENTIFICACION = 1000;

var ESPACIO_HTML = '&nbsp;';

var NOMBRE_ELEMENTOS_COMENTARIO_RAPIDO = 'diccionario';

var READY_STATE_COMPLETE = 4;
var ESTADO_HTTP_OK = 200;

var OPCION_RECARGAR = 0;
var OPCION_REGRESAR = 1;

var MENSAJE_CERRAR_SELECCION_MATERIAS = '&#xab; Regresar';

var MENSAJE_GRUPO    = 'Grupo';
var MENSAJE_MATERIA  = 'Materia';
var MENSAJE_PROFESOR = 'Profesor';

var MENSAJE_LUNES     = 'Lun';
var MENSAJE_MARTES    = 'Mar';
var MENSAJE_MIERCOLES = 'Mié';
var MENSAJE_JUEVES    = 'Jue';
var MENSAJE_VIERNES   = 'Vie';
var MENSAJE_SABADO    = 'Sáb';

var MENSAJE_REMOVER = 'Quitar';
var MENSAJE_INCLUIR = 'Incluir';

var MENSAJE_EXPORTAR             = 'Exportar';
var MENSAJE_EXPORTAR_DESCRIPCION = 'Generar un archivo con la selección';
var MENSAJE_BORRAR_SELECCION     = 'Borrar selección';
var MENSAJE_GENERAR_HORARIOS     = 'Generar Horarios';
var MENSAJE_OPTATIVAS            = 'Optativas';
var MENSAJE_TOTAL_SELECCION      = 'Total de materias.';
var MENSAJE_AGREGAR_MATERIA      = 'Agregar a la selección.';
var MENSAJE_MOSTRAR_SELECCION    = 'Ver selección';

var ID_CONTROL_BORRAR_SELECCION = 'borrarMateriasHorario';
var ID_CONTROL_GENERAR_HORARIOS = 'generarMateriasHorario';
var ID_CONTROL_OPTATIVAS        = 'optativas';
var ID_CONTROL_EXPORTAR         = 'exportar_boton';
var ID_TABLA_ASIGNATURAS        = 'tablaAsignaturas';
var ID_TOTAL_SELECCION          = 'totalSeleccion';
var ID_TABLA_OPTATIVAS          = 'tablaOptativas';

var NUMERO_DIAS_HORARIO = 6;
var NUMERO_DIAS_SEMANA  = 5;
var NUMERO_COLUMNAS_HORARIO_GENERADO = 9;

var SELECTOR_REGISTROS_RESALTADOS = 'span.resaltar';
var SELECTOR_CELDAS_SABADO = '#tablaAsignaturas td[name="sabado"]';

var ELIMINACION_REGISTRO  = 0;
var ELIMINACION_SELECCION = 1;

var SELECTOR_MATERIAS_SELECCIONADAS = 'div[name="contenedorRegistro"]';

var ID_LISTA_SELECCION = 'asignaturasSeleccionadas';

var MENSAJE_HABILITACION_OPTATIVAS = 'Habilitar/Deshabilitar optativa.';

var NOMBRE_CONTROL_OPTATIVA = 'optativa';

var COLUMNA_HORARIO_INICIO_SELECCION = 5;
var HORA_DE_INICIO_HORARIO = 7;

var MENSAJE_DESCRIPCION_CONTROL_ARMA_HORARIOS = 'Habilitar/Deshabilitar del arma horarios.';

var NOMBRE_CONTROL_ESTADO_MATERIA = 'incluirMateria';

var UN_SEGUNDO = 1000;

var NOMBRE_CONTENEDOR_REGISTROS = 'contenedorRegistro';
var NOMBRE_REGISTRO = 'registro';

var SELECTOR_REGISTROS = 'tr[name="registro"]';

var POSICION_INICIAL = 0;

var ID_CONTENEDOR_CONTROLES_HORARIO    = 'controlesHorarios';
var ID_CONTENEDOR_RESULTADOS_HORARIOS  = 'resultadoHorarios';
var ID_CONTENEDOR_INFORMACION_HORARIOS = 'informacionHorarios';

var MENSAJE_OPTATIVAS = 'Optativas';
var MENSAJE_REGRESAR = 'Regresar';

var ID_INFORMACION_OPTATIVAS = 'informacionOptativas';

var ID_CONTENEDOR_SELECCION_HORARIOS = 'seleccionHorarios';

var MENSAJE_CONFIRMAR_ELIMINACION = '¿Está seguro?';

var NUMERO_CELDAS = 11;

var atajoHorarios = false;

var MENSAJE_REMOVER_SELECCION         = 'Quitar de la selección';
var MENSAJE_SIN_RESULTADOS            = 'No hay resultados';
var MENSAJE_VISIBILIDAD_ARMA_HORARIOS = 'Habilitar/Deshabilitar del arma horarios.';
var MENSAJE_VER_COMENTARIOS           = 'Ver comentarios.';
var MENSAJE_OPTATIVA                  = 'Optativa';
var MENSAJE_RESULTADOS_PARTE_1        = 'Hay ';
var MENSAJE_RESULTADOS_PARTE_2        = ' resultado(s)';
var MENSAJE_RESULTADOS_PARTE_3        = 'Puedes usar las flechas ⇧ ⇩';
var MENSAJE_VER_RESULTADO_N           = 'Ver el resultado #N.';

var ID_HORARIO_GENERADO_SEGMENTO = 'horarioGenerado';

var NOMBRE_CONTENEDOR_HORARIOS_GENERADOS = 'horariosGenerados';

var MENSAJE_TITULO_TRASLAPES  = 'Materias con traslapes';
var MENSAJE_ID                = 'ID';
var MENSAJE_DETALLE_TRASLAPES = 'Detalle de los traslapes';
var MENSAJE_GRADO_TRASLAPE    = 'Grado de Traslape (%)';
var MENSAJE_CONFLICTOS        = 'Conflictos';
var MENSAJE_MARCAR_TRASLAPE   = 'Marcar el traslape';
var MENSAJE_VER_TRASLAPES     = '» Ver detalles de traslapes';

var ID_CONTENEDOR_TRASLAPES = 'detalleTraslapes';

var MENSAJE_VER_TODOS_RESULTADOS = 'Ver resultados';
var MENSAJE_OCULTAR_TODOS_RESULTADOS = 'Ocultar resultados';

var SELECTOR_HORARIO_GENERADO = '[name=horariosGenerados]';
var ID_CONTROL_VER_TODOS_RESULTADOS = 'verTodosResultados';

function iniciar (){
	try {

		ajustarDisenio();
		detectaPantalla();
		controlaAccesosApp();

	} catch ( error ){
		log( '@' + error );
	}
}

function log ( mensaje ){
	try {
		if ( androidJs ){
			androidJs.guardaContenido( mensaje );
			androidJs.getContenido();
		}
	} catch ( error ){
		console.log( mensaje );
	}
}

iniciar();