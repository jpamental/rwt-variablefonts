


/* Flexslider */
$(window).load(function(){
  try {
  $('.flexslider').flexslider({
    animation: "slide",
    controlNav: "thumbnails",
    start: function(slider){
      $('body').removeClass('loading');
    }
  });
  } catch(e) {
	  return;
  }
});

/* Widowtamer */
wt.fix({
	elements: 'p',
	chars: 12,
	method: 'nbsp',
	event: 'resize'
});

wt.fix({
	elements: 'blockquote',
	chars: 2,
	method: 'nbsp',
	event: 'resize'
});

wt.fix({
	elements: 'h1',
	chars: 8,
	method: 'nbsp',
	event: 'resize'
});


/* Navigation functions */

function insertAfter(el, referenceNode) {
    referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
}



document.getElementById('menu-toggle').addEventListener('click', function(e) {
    e.preventDefault();
	if (document.body.classList.contains('nav-is-active')) {
	    document.body.classList.remove('nav-is-active');
		var subMenus = document.getElementsByClassName('sub-menu'), len = subMenus.length;

		for (var i=0; i<len; i++) {
		// clean up on menu close
			buttonId = 'button-for-' + subMenus[i].getAttribute('id');
			document.getElementById(buttonId).remove();
			subMenus[i].removeAttribute('id');
			subMenus[i].removeAttribute('aria-expanded');
			subMenus[i].parentNode.classList.remove('has-children');

		}
	 } else {
		document.body.classList.add('nav-is-active');
		if (document.getElementsByClassName('sub-menu')) {
			
			var subMenus = document.getElementsByClassName('sub-menu'), len = subMenus.length;

			for (var i=0; i<len; i++) {

			    var anchorText = subMenus[i].parentNode.getElementsByTagName('a')[0].innerHTML;
			    var idSlug = anchorText.toLowerCase().replace(/ /g,"-");
			    var randomNumber= Math.floor( Math.random()*9999 );
			    var slug = idSlug + randomNumber;

				subMenus[i].setAttribute('id', slug);
				subMenus[i].setAttribute('aria-expanded', 'false');
				subMenus[i].parentNode.classList.add('has-children');
	
				var subMenuToggle = document.createElement('button');
				subMenuToggle.innerHTML = 'open';
				subMenuToggle.classList.add('ui-toggle-button');
				subMenuToggle.setAttribute('type', 'button');
				subMenuToggle.setAttribute('data-text', 'close');
				subMenuToggle.setAttribute('aria-controls', slug);
				subMenuToggle.setAttribute('id', 'button-for-' + slug);
				
				var ref = subMenus[i];
				
				insertAfter(subMenuToggle, ref);
				
				subMenuToggle.addEventListener('click', function(e) {
					e.preventDefault();
					targetId = subMenuToggle.getAttribute('aria-controls');
					if (document.getElementById(targetId).getAttribute('aria-expanded') == 'false') {
						document.getElementById(targetId).setAttribute('aria-expanded', 'true');
						subMenuToggle.textContent = 'close';
						subMenuToggle.setAttribute('data-text', 'open');
						document.getElementById(targetId).getElementsByTagName('a')[0].focus();
					} else {
						document.getElementById(targetId).setAttribute('aria-expanded', 'false');
						subMenuToggle.textContent = 'open';
						subMenuToggle.setAttribute('data-text', 'close');
					}
				});

				
			}
			
		}
	}
});

// make dropdown menus tabbable - thanks Scott O'Hara!

(function ( w, doc ) {

  // Enable strict mode
  "use strict";

  // Local object for method references
  var DropNav = {};

  // Namespace it up yo
  DropNav.ns = "Drop Navigation";

  // the main event...err..function
  DropNav.init = function () {

    var hasDrop = doc.querySelectorAll('.nav-menu > .menu-item .sub-menu'),
      hasDropLinks = doc.querySelectorAll('.sub-menu a'),
      hasDropCount = hasDrop.length,
      hasDropLinksCount = hasDropLinks.length,
      i;

    if ( hasDropCount > 0 ) {

      for ( i = 0; i < hasDropCount; i++ ) { // i++  =  i = i + 1 

        var drop = hasDrop[i],
          firstDropLink = drop.querySelectorAll('.sub-menu a')[0];

        drop.parentNode.setAttribute('aria-haspopup', 'true');
        // drop.querySelector('ul').setAttribute('aria-label', 'Sub Menu');
        firstDropLink.innerHTML = ' <span class="visuallyhidden">Sub menu, </span>' + firstDropLink.innerHTML; //*

      } //for

      for ( i = 0; i < hasDropLinksCount; i++ ) {

        var dropLinks = hasDropLinks[i];

        dropLinks.addEventListener('focus', function ( e ) {
          this.parentNode.parentNode.classList.add('has-focus');
        });

        dropLinks.addEventListener('blur', function ( e ) {
          this.parentNode.parentNode.classList.remove('has-focus');
        });

      } //for

    } //if

  }; //init

  DropNav.init();

})( this, this.document );

/* 
  Created Aug 22, 2016
  
  Revised Aug 23, 2016
  * https://codepen.io/svinkle
  Switched from aria label to adding visually hidden "sub menu" text to the first item in the drop down, to ensure that all screen readers would accurately announce "sub menu"
  
  Fixed z-index of primary link & drop menu to ensure that the primary link always appeared on top of the drop menu
  
  Reveal drop menu on focus of primary link, to make it more apparent that a sub menu exists. suppose this could have been done with a down arrow on the primary link. but nope :) 
*/
