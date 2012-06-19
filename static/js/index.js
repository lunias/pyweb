function filter (phrase, _id){
    if (phrase.value.indexOf("Search...") == -1){
	var words = phrase.value.toLowerCase().split(" ");
	var table = document.getElementById(_id);
	var ele;
	for (var r = 2; r < table.rows.length; r++){
	    ele = table.rows[r].innerHTML.replace(/<[^>]+>/g,"");
	    var displayStyle = 'none';
	    for (var i = 0; i < words.length; i++) {
		if (ele.toLowerCase().indexOf(words[i])>=0)
		    displayStyle = '';
		else {
		    displayStyle = 'none';
		    break;
		}
	    }
	    table.rows[r].style.display = displayStyle;
	}
    }
}

$(document).ready(function() {

    //tabs
    var $tabs = $( "#tabs" ).tabs();

    //datepickers
    $(".date_picker").datepicker();

    //portlets
    $( ".column" ).sortable({
	connectWith: ".column"
    });

    $( ".portlet" ).addClass( "ui-widget ui-widget-content ui-helper-clearfix ui-corner-all" )
	.find( ".portlet-header" )
	.addClass( "ui-widget-header ui-corner-all" )
	.prepend( "<span class='ui-icon ui-icon-minusthick'></span>");

    $( ".portlet-header .ui-icon" ).click(function() {
	$( this ).toggleClass( "ui-icon-minusthick" ).toggleClass( "ui-icon-plusthick" );
	$( this ).parents( ".portlet:first" ).find( ".portlet-content" ).toggle();
    });

    $( ".portlet-header" ).dblclick(function() {
	$( this ).find(".ui-icon").toggleClass( "ui-icon-minusthick" ).toggleClass( "ui-icon-plusthick" );
	$( this ).parents( ".portlet:first" ).find( ".portlet-content" ).toggle();
    });

    //resizable
    $( ".resizable" ).resizable();

    //drag to tabs
    var $tab_items = $( "ul:first li", $tabs ).droppable({
	accept: ".portlet",
	hoverClass: "ui-state-hover",
	tolerance: "pointer",
	drop: function( event, ui ) {
	    var $item = $( this );
	    var $list = $( $item.find( "a" ).attr( "href" ) )
		.find( ".column" );

	    ui.draggable.hide( "fast", function() {
		$tabs.tabs( "select", $tab_items.index( $item ) );
		$( this ).appendTo( $list ).show( "fast" );
	    });
	}
    });

    //accordion
    $( "#accordion" ).accordion({
	collapsible: true,
	fillSpace: true,
	autoHeight: false
    });

    //slide navigation
    $('#navigation').hover(
	function () {
	    $('div',$(this)).animate({'marginLeft':'-2px'},200);
	},
	function () {
	    $('div',$(this)).animate({'marginLeft':'-225px'},200);
	}
    );

});

