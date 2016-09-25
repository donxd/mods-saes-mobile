NodeList.prototype.forEach = Array.prototype.forEach;

HTMLElement.prototype.agregaElementoAlFinal = function ( elemento ){
	this.parentNode.appendChild( elemento );
}

HTMLElement.prototype.setTexto = function ( texto ){
	this.innerText = texto;
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
		case DENTRO_DE:
			pegaElementoDentro( elemento, selectorDestino );
			break;
		case ANTES_DE:
			pegaElementoAntes( elemento, selectorDestino );
			break;
		case DESPUES_DE:
			pegaElementoDespues( elemento, selectorDestino );
			break;
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
			elementoHermano.agregaElementoAlFinal( elemento );
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
		case '/Academica/horarios.aspx':
			pantalla_horarios();
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
			agregaBuscador( 1 );
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
			registros[ i ].agregaElementoAlFinal( registro );
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
		.innerHTML = 	'<input type="search" placeholder="' + MENSAJE_CONTROL_BUSCAR + '" id="' + ID_CONTROL_BUSCAR + '"/>'+
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
	// inicializaControlExportacion();
	inicializaControlImportacion();
}

function inicializaAreaImportacion (){
	document.getElementById( ID_CONTROL_EXPIMP ).addEventListener( 'click', muestraExpImp, true );
}

// function inicializaControlExportacion (){

// 	var exportar = document.getElementById( ID_CONTENEDOR_EXPORTAR );
// 	exportar.classList.add( 'oculto' );
// 	exportar.classList.add( 'fueraImportar' );
// 	// exportar.addEventListener( 'dragstart',moviendo,false);
// 	exportar.addEventListener( 'dragenter',sobreImportar,true );
// 	exportar.addEventListener( 'dragover',colocandoImportar,true );
// 	exportar.addEventListener( 'drop',ingresandoImportar,true );

// 	//document.getElementById( ID_CONTROL_IMPORTACION ).addEventListener("focus",seleccionarContenido,true);
// 	if (localStorage.horarioMaterias != null && localStorage.horarioMaterias != "" && localStorage.horarioMaterias != "null" ){
// 		// document.getElementById( ID_CONTROL_IMPORTACION ).value = localStorage.horarioMaterias;
// 	}

// }

function muestraExpImp (){
	var contenedorExportar = document.getElementById( ID_CONTENEDOR_EXPORTAR );
	if ( contenedorExportar.classList.contains( 'oculto' )){
		contenedorExportar.classList.remove( 'oculto' );
		// document.getElementById( ID_CONTROL_IMPORTACION ).focus();
	} else {
		contenedorExportar.classList.add( 'oculto' );
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
			destinoConexion = 'http://diccionariodemaestros.com/' + plantel;
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
	document.getElementById( ID_TABLA_HORARIO_ACTUAL ).agregaElementoAlFinal( contadorInscripcion );
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

var COLUMNA_LUGARES_DISPONIBLES = 6;
var COLUMNA_GRUPO               = 0;
var COLUMNA_MATERIA             = 2;
var COLUMNA_DIA_SABADO          = 10;
var COLUMNA_PROFESOR            = 2;
var COLUMNA_MATERIA2            = 1;
var COLUMNA_NOMBRE_ASIGNATURA   = 2;

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

var CODIGO_TECLA_DELETE   = 8;
var CODIGO_TECLA_SUPRIMIR = 46;
var CODIGO_TECLA_ENTER    = 13;
var CODIGO_TECLA_ESCAPE   = 27;

var POSICION_TITULOS               = 0;
var POSICION_INICIO_REGISTROS      = 1;
var POSICION_INICIO_NOMBRE_PLANTEL = 9;

var TIEMPO_ACTUALIZACION_REINSCRIBIR = 500;

var ESPACIO_HTML = '&nbsp;';

var NOMBRE_ELEMENTOS_COMENTARIO_RAPIDO = 'diccionario';

var READY_STATE_COMPLETE = 4;
var ESTADO_HTTP_OK = 200;

var OPCION_RECARGAR = 0;
var OPCION_REGRESAR = 1;

function iniciar (){
	try {

		ajustarDisenio();
		detectaPantalla();

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