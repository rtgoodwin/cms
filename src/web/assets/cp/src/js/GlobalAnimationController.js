/**
 * Global Animation Controller Class
 */

Craft.GlobalAnimationController = Garnish.Base.extend({
  resizeObserver: null,
  extensions: ['.gif', '.webp'],

  init: function () {
    // Get all images present on page load
    const images = this.filterImagesByExtension(
      document.querySelectorAll('img')
    );

    for (let i = 0; i < images.length; i++) {
      this._hideAnimation(images[i]);
    }

    this.resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentBoxSize) {
          const targetImage = entry.target;

          if (entry.contentRect.width > 0 || entry.contentRect.height > 0) {
            console.log('hello');
            this._hideAnimation(targetImage);
          }
        }
      }
    });

    this._createImageAddedObserver();
  },

  _createImageAddedObserver: function () {
    const targetNode = document.querySelector('body');

    // Options for the observer (which mutations to observe)
    const config = {attributes: true, childList: true, subtree: true};

    // Callback function to execute when mutations are observed
    const callback = (mutationList, observer) => {
      for (const mutation of mutationList) {
        if (mutation.type === 'childList') {
          if (mutation.addedNodes) {
            for (const node of mutation.addedNodes) {
              if (node.nodeName === 'IMG') {
                if (this.couldBeAnimated(node)) {
                  this._hideAnimation(node);
                }
              }
            }
          }
        }
      }
    };

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);

    // Later, you can stop observing
    //observer.disconnect();
  },

  /**
   * Hides the image animation by placing a canvas element with the first frame
   * @param image
   * @returns {Promise<void>}
   */
  _hideAnimation: async function (image) {
    // If image already has an animation controller, return
    if ($(image).data('animationController')) return;

    // Wait until it's completely loaded
    await this.waitForImage(image);
    const $image = $(image);
    const $parent = $image.parent();
    let $canvas = $parent.find('[data-image-cover]');
    const width = $image.width();
    const height = $image.height();

    if ($canvas.length === 0) {
      $image.attr({
        'data-width': width,
        'data-height': height,
      });
      $canvas = this.getCanvas($image);
      $parent.css({
        position: 'relative',
      });
      $canvas.insertBefore($image);
    } else if ($canvas.length > 0 && this.imageSizeChanged($image)) {
      console.log('redraw');
      // Replace canvas
      $canvas.remove();
      const $newCanvas = this.getCanvas($image);
      $newCanvas.insertBefore($image);
    }

    // Create toggle button
    this.createToggle(image);

    // Add resize observer
    this.resizeObserver.observe(image);

    $(image).data('animationController', this);
  },

  getAllControlledImages: function () {
    return document.querySelectorAll('img[data-animation-controller]');
  },

  /**
   * Filters a NodeList by images that could be animated
   * @param {NodeList} images
   * @returns {Array}
   */
  filterImagesByExtension: function (images) {
    return Array.from(images).filter((image) => this.couldBeAnimated(image));
  },

  couldBeAnimated: function (image) {
    const src = image.src;
    const srcset = image.srcset;

    return this.extensions.some(
      (extension) => src.includes(extension) || srcset.includes(extension)
    );
  },

  // addImages: function ($images) {
  //   if ($images.length === 0) return;
  //
  //   // Add images to collection
  //   this.$images = this.$images.add($images);
  //
  //   // Go through each image and create toggle + cover
  //   for (let i = 0; i < $images.length; i++) {
  //     const $image = $($images[i]);
  //
  //     // If image has already been added, return
  //     if ($image.data('animation-controller')) {
  //       console.warn('Image has already been added to animation controller');
  //       return;
  //     }
  //
  //     if ($image[0].complete) {
  //       this._hideAnimation($image);
  //       this.resizeObserver.observe($image[0]);
  //     } else {
  //       this.addListener($image, 'load', () => {
  //         this._hideAnimation($image);
  //         this.resizeObserver.observe($image[0]);
  //       });
  //     }
  //
  //     $image.data('animation-controller', this);
  //   }
  // },

  getToggleEnabled: function (image) {
    return !$(image).attr('data-disable-toggle');
  },

  getAnimationToggleButton: function (image) {
    return $(image).parent().find('[data-animation-toggle]');
  },

  getAnimationCoverImage: function (image) {
    return $(image).parent().find('canvas');
  },

  imageSizeChanged: function (image) {
    const $image = $(image);
    const width = $image.width();
    const height = $image.height();
    const prevWidth = $image.attr('data-width');
    const prevHeight = $image.attr('data-height');

    if (!prevWidth || !prevHeight) return;

    return (
      width !== parseInt(prevWidth, 10) || height !== parseInt(prevHeight, 10)
    );
  },

  /**
   * Gets a canvas element with the first frame of the image
   * @param image
   * @returns {*|jQuery}
   */
  getCanvas: function (image) {
    const $image = $(image);
    const width = $image.width();
    const height = $image.height();

    const $canvas = $('<canvas></canvas>')
      .attr({
        width: width,
        height: height,
        'aria-hidden': 'true',
        role: 'presentation',
        'data-image-cover': true,
      })
      .css({
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      });

    // Draw first frame on canvas
    $canvas[0].getContext('2d').drawImage($image[0], 0, 0, width, height);

    return $canvas;
  },

  /**
   * Waits for the image to be loaded
   * @param image
   * @returns {Promise<unknown>}
   */
  waitForImage: async function (image) {
    return new Promise((res) => {
      if (image.complete) {
        return res();
      }
      image.onload = () => res();
      image.onerror = () => res();
    });
  },

  createToggle: function (image) {
    if (!this.getToggleEnabled(image)) return;

    const $image = $(image);
    const $wrapper = $image.parent();

    const $toggle = $('<button/>', {
      type: 'button',
      'data-icon': 'play',
      'data-animation-state': 'paused',
      'data-animation-toggle': true,
      'aria-label': Craft.t('app', 'Play'),
      class: 'animated-image-toggle btn',
    });

    $wrapper.append($toggle);

    this.addListener($toggle, 'click', (ev) => {
      this.handleToggleClick(ev);
    });
  },

  handleToggleClick: function (event) {
    const $toggle = $(event.target);
    const isPaused = $toggle.attr('data-animation-state') === 'paused';
    const $image = $toggle.parent().find('img');

    if (isPaused) {
      this.play($image);
    } else {
      this.pause($image);
    }
  },

  /**
   * Pauses all images in a NodeList.
   * @param {NodeList} images - The list of images to pause
   */
  pauseAll: function () {
    const images = Array.from(this.getAllControlledImages());

    for (let i = 0; i < images.length; i++) {
      this.pause(images[i]);
    }
  },

  /**
   * Pauses an image by toggling the canvas visibility and button state
   * @param image
   */
  pause: function (image) {
    const $image = $(image);
    const $coverImage = this.getAnimationCoverImage($image);
    const $toggleBtn = this.getAnimationToggleButton($image);

    $coverImage.removeClass('hidden');
    $toggleBtn.attr({
      'aria-label': Craft.t('app', 'Play'),
      'data-animation-state': 'paused',
      'data-icon': 'play',
    });
  },

  playAll: function () {
    const images = Array.from(this.getAllControlledImages());
    for (let i = 0; i < this.images.length; i++) {
      this.play(this.images[i]);
    }
  },

  play: function (image) {
    const $image = $(image);
    const $coverImage = this.getAnimationCoverImage($image);
    const $toggleBtn = this.getAnimationToggleButton($image);

    $coverImage.addClass('hidden');
    $toggleBtn.attr({
      'aria-label': Craft.t('app', 'Pause'),
      'data-animation-state': 'playing',
      'data-icon': 'pause',
    });
  },
});
