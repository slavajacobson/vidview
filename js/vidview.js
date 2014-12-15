// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {
    'use strict';

    // Create the defaults once
    var pluginName = 'vidView';
    var defaults = {
        rows: 10,
        columns: 5,
        width: 320,
        height: 240,
        autoPlay: 'hover'
    };

    // The actual plugin constructor
    function Plugin ( element, options ) {

        this.element = element;

        if (typeof(options) === 'string') {
          options = { montage: options };
        }
        else if (options === null || options.montage === null) {
          window.alert('VidView: No image provided');
        }

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
          this._initBackground(this.element, this.settings.montage);

          
          
          if (this.settings.autoPlay === 'hover') {
          
            $(this.element).on('mouseenter', function() { self.play(); });
            $(this.element).on('mouseleave', function() { self.stop(); });
            this._setFrame(this, false);
          }
          else if (this.settings.autoPlay) {
            this.play();
          }
          else {
            this._setFrame(this, false);
          }


         
              
        },

        _initBackground: function(el, montage) {
          
          $(el).css({'backgroundImage': 'url(' + montage + ')', width: this.settings.width, height: this.settings.height});
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
          
          
          if (setNext) {
            self.currentColumn++;

            //reached the last column, move down to the next row

            if (self.currentColumn > self.settings.columns) {
              
              self.currentColumn = 1;
              self.currentRow++;

              if (self.currentRow > self.settings.rows) {
                self.currentRow = 1;
              }
              
              
              
            }
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