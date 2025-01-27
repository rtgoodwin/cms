export class AnimationBlocker {
  static extensions: string[] = ['.gif', '.webp'];
  private static minToggleableHeight: number = 100;
  private static minToggleableWidth: number = 100;
  #imageAddedObserver = AnimationBlocker.createImageAddedObserver();

  protected get imageAddedObserver() {
    return this.#imageAddedObserver;
  }

  constructor() {
    AnimationBlocker.hideAllAnimations();
  }

  private static createImageAddedObserver(): MutationObserver {
    const targetNode: HTMLBodyElement = document.querySelector('body')!;

    // Options for the observer (which mutations to observe)
    const config = {attributes: true, childList: true, subtree: true};

    // Callback function to execute when mutations are observed
    const callback = (mutationList: Array<MutationRecord>, observer) => {
      for (const mutation of mutationList) {
        if (mutation.type === 'childList') {
          if (mutation.addedNodes) {
            for (const node of mutation.addedNodes) {
              if (node.nodeName === 'IMG') {
                if (this.couldBeAnimated(node as HTMLImageElement)) {
                  AnimationBlocker.hideAnimation(node as HTMLImageElement);
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

    return observer;

    // Later, you can stop observing
    //observer.disconnect();
  }

  private static async waitForImage(image: HTMLImageElement): Promise<void> {
    return new Promise((res) => {
      if (image.complete) {
        return res();
      }
      image.onload = () => res();
      image.onerror = () => res();
    });
  }

  private static imageSizeChanged(
    image: HTMLImageElement
  ): boolean | undefined {
    const width: number = image.clientWidth;
    const height: number = image.clientHeight;
    const prevWidth: string | undefined = image.dataset.width;
    const prevHeight: string | undefined = image.dataset.height;

    if (!prevWidth || !prevHeight) return;

    return (
      width !== parseInt(prevWidth, 10) || height !== parseInt(prevHeight, 10)
    );
  }

  /**
   * Creates a toggle button on top of the image
   * @param image
   * @private
   */
  private static createToggle(image: HTMLImageElement): void {
    if (!AnimationBlocker.isToggleEnabled(image)) return;

    const $image = $(image);
    const $wrapper = $image.parent();

    const $toggle = $('<button/>', {
      type: 'button',
      'data-icon': 'play',
      'data-animation-toggle': true,
      'aria-label': Craft.t('app', 'Play'),
      class: 'animated-image-toggle btn',
    });

    $wrapper.append($toggle);

    $toggle.on('click', (ev: Event) => {
      this.handleToggleClick(ev);
    });
  }

  private static getToggle(image: HTMLImageElement): HTMLButtonElement {
    const $parent = $(image).parent();
    return $parent.find('[data-animation-toggle]')[0] as HTMLButtonElement;
  }

  /**
   * Creates a canvas to cover the image
   * @param image
   * @private
   */
  private static createCover(image: HTMLImageElement): void {
    const $image = $(image);
    const width = $image.width();
    const height = $image.height();
    const $parent = $image.parent();

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

    $parent.css({
      position: 'relative',
    });
    $canvas.insertBefore($image);
  }

  /**
   * Gets the canvas cover
   * @param image
   * @private
   */
  private static getCover(image: HTMLImageElement): HTMLCanvasElement {
    const $image = $(image);
    return $image.parent().find('[data-image-cover]')[0] as HTMLCanvasElement;
  }

  /**
   * Removes the canvas cover
   * @param image
   * @private
   */
  private static removeCover(image: HTMLImageElement) {
    const $cover = AnimationBlocker.getCover(image);
    $cover.remove();
  }

  private static handleToggleClick(event: Event): void {
    const $toggle = $(event.target);
    const $image = $toggle.parent().find('img');
    const isPaused =
      $image[0].getAttribute('data-animation-state') === 'paused';

    if (isPaused) {
      this.play($image[0]);
    } else {
      this.pause($image[0]);
    }
  }

  /**
   * If the image meets requirements for showing a toggle
   * @param image
   * @private
   */
  private static isToggleEnabled(image: HTMLImageElement): boolean {
    const imageWidth: number = image.clientWidth;
    const imageHeight: number = image.clientHeight;

    return (
      imageWidth >= AnimationBlocker.minToggleableWidth &&
      imageHeight >= AnimationBlocker.minToggleableHeight
    );
  }

  /**
   * Hides the animation of an image by drawing the first frame on a canvas
   * @param image
   */
  private static async hideAnimation(image: HTMLImageElement): Promise<void> {
    // If image already has an animation controller, return
    if ($(image).data('animationController')) return;

    // Wait until it's completely loaded
    await AnimationBlocker.waitForImage(image);
    const $image = $(image);
    const $parent = $image.parent();
    let $canvas = $parent.find('[data-image-cover]');
    const width = $image.width();
    const height = $image.height();

    // Store state on image
    image.setAttribute('data-animation-state', 'paused');

    if ($canvas.length === 0) {
      $image.attr({
        'data-width': width,
        'data-height': height,
      });
      AnimationBlocker.createCover($image);
    } else if ($canvas.length > 0 && AnimationBlocker.imageSizeChanged(image)) {
      // Replace canvas
      AnimationBlocker.removeCover(image);
      AnimationBlocker.createCover($image);
    }

    AnimationBlocker.createToggle(image);
    //
    //
    // this.resizeObserver.observe(image);
    //
    // $(image).data('animationController', this);
  }

  /**
   * Hides the animation of all images on the page
   */
  private static hideAllAnimations(): void {
    const images: HTMLImageElement[] =
      AnimationBlocker.getAllPotentiallyAnimated();
    for (let i = 0; i < images.length; i++) {
      AnimationBlocker.hideAnimation(images[i]);
    }
  }

  private static filterImagesByExtension(
    images: NodeListOf<HTMLImageElement>
  ): HTMLImageElement[] {
    return Array.from(images).filter((image) =>
      AnimationBlocker.couldBeAnimated(image)
    );
  }

  private static play(image: HTMLImageElement): void {
    const cover = this.getCover(image);
    const toggleBtn = this.getToggle(image);

    if (!cover || !toggleBtn) return;

    image.setAttribute('data-animation-state', 'playing');
    cover.classList.add('hidden');
    toggleBtn.setAttribute('aria-label', Craft.t('app', 'Pause'));
    toggleBtn.setAttribute('data-icon', 'pause');
  }

  /**
   * Pauses an image by toggling the canvas visibility and button state
   * @param image
   */
  private static pause(image: HTMLImageElement) {
    const cover = this.getCover(image);
    const toggleBtn = this.getToggle(image);

    if (!cover || !toggleBtn) return;

    image.setAttribute('data-animation-state', 'paused');
    cover.classList.remove('hidden');
    toggleBtn.setAttribute('aria-label', Craft.t('app', 'Play'));
    toggleBtn.setAttribute('data-icon', 'play');
  }

  /**
   * Checks a given image's src and srcset for common animation extensions
   * @param image
   */
  static couldBeAnimated(image: HTMLImageElement): boolean {
    const src = image.src;
    const srcset = image.srcset;

    return AnimationBlocker.extensions.some(
      (extension) => src.includes(extension) || srcset.includes(extension)
    );
  }

  static getAllPotentiallyAnimated(): HTMLImageElement[] {
    const allImages: NodeListOf<HTMLImageElement> =
      document.querySelectorAll('img');
    return AnimationBlocker.filterImagesByExtension(allImages);
  }
}
