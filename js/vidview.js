// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

		// undefined is used here as the undefined global variable in ECMAScript 3 is
		// mutable (ie. it can be changed by someone else). undefined isn't really being
		// passed in so we can ensure the value of it is truly undefined. In ES5, undefined
		// can no longer be modified.

		// window and document are passed through as local variable rather than global
		// as this (slightly) quickens the resolution process and can be more efficiently
		// minified (especially when both are regularly referenced in your plugin).

		// Create the defaults once
		var pluginName = "vidView";
		var defaults = {
				propertyName: "value",
				rows: 10,
				columns: 5,
				width: 320,
				height: 240,
				autoPlay: 'hover'
		};

		// The actual plugin constructor
		function Plugin ( element, options ) {
				var self = this;

				this.element = element;
				// jQuery has an extend method which merges the contents of two or
				// more objects, storing the result in the first object. The first object
				// is generally empty as we don't want to alter the default options for
				// future instances of the plugin
				if (typeof(options) == "string")
					options = { image_url: options }
				else if (options == null || options.image_url == null)
					alert("VidView: No image provided");

				this.settings = $.extend( {}, defaults, options );
				this._defaults = defaults;
				this._name = pluginName;
				

				this.playing = null;
				this.keepPlaying = false;
				this.currentRow = 1;
				this.currentColumn = 1;
				this.delay = 100;
				this.init();


		}

		// Avoid Plugin.prototype conflicts
		$.extend(Plugin.prototype, {
				init: function () {
					var self = this;

					//set element's background to the image provided
					this._initBackground(this.element, this.settings.image_url);

					
					
					if (this.settings.autoPlay == "hover") {
					
						$(this.element).on("mouseenter", function() { self.play() });
						$(this.element).on("mouseleave", function() { self.stop() });
						this._setFrame(this, false);
					}
					else if (this.settings.autoPlay)
						this.play();
					else 
						this._setFrame(this, false);


					if (this.settings.video)
						$(this.element).on("click", function() { 
							$("<iframe width='560' height='315' src='//www.youtube.com/embed/SaaWnun6Dz4' frameborder='0' allowfullscreen></iframe>").appendTo($("<div />").css("width","20px")).appendTo("body");
						});
							
				},

				_initBackground: function(el, image_url) {
					
					$(el).css({"backgroundImage": "url(" + image_url + ")", width: this.settings.width, height: this.settings.height});
				},
				play: function() {

					var self = this;
					this.keepPlaying = true;
			

					
					


					this.playing = setInterval(function() {
						self._setFrame(self, true);
					}, this.delay);
				},
				stop: function(){
					this.currentRow = 1;
					this.currentColumn = 1;

					clearInterval(this.playing);
					this.playing = null;

					this._setFrame(this, false);
				},
				//self - pass this 
				//if setNext is true, prepare the next frame
				_setFrame: function(self, setNext) {
					

					
					//console.log(self.currentColumn);
					$(self.element).css({ 'background-position-x': self.currentColumn * self.settings.width, 'background-position-y': self.currentRow * self.settings.height });
					
					

					self.currentColumn++;

					//reached the last column, move down to the next row

					if (self.currentColumn > self.settings.columns) {
						
						self.currentColumn = 1;
						self.currentRow++;

						if (self.currentRow > self.settings.rows) 
							self.currentRow = 1;
						
						
						
					}

				}
		});

		// A really lightweight plugin wrapper around the constructor,
		// preventing against multiple instantiations
		$.fn[ pluginName ] = function ( options ) {
				this.each(function() {
						if ( !$.data( this, pluginName ) ) {
								$.data( this, pluginName, new Plugin( this, options ) );
						}
				});

				// chain jQuery functions
				return this;
		};
	
})( jQuery, window, document );