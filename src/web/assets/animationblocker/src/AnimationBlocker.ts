export class AnimationBlocker {
  static extensions: string[] = ['.gif', '.webp'];
  private static minToggleableHeight: number = 100;
  private static minToggleableWidth: number = 100;
  #imageAddedObserver = AnimationBlocker.createImageAddedObserver();
  private static playIcon: string =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc. --><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>';
  private static pauseIcon: string =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Pro 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc. --><path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z"/></svg>';

  protected get imageAddedObserver() {
    return this.#imageAddedObserver;
  }

  constructor() {
    AnimationBlocker.hideAllAnimations();
  }

  /**
   * Creates a MutationObserver to watch for added images
   * @private
   */
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

  /**
   * Waits for an image to load
   * @param image
   * @private
   */
  private static async waitForImage(image: HTMLImageElement): Promise<void> {
    return new Promise((res) => {
      if (image.complete) {
        return res();
      }
      image.onload = () => res();
      image.onerror = () => res();
    });
  }

  /**
   * Checks if the image's size has changed
   * @param image
   * @private
   */
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
    if (
      !AnimationBlocker.isToggleEnabled(image) ||
      AnimationBlocker.getToggle(image)
    )
      return;

    const $image = $(image);
    const $wrapper = $image.parent();

    const $toggle = $('<button/>', {
      type: 'button',
      'data-animation-toggle': true,
      'aria-label': Craft.t('app', 'Play'),
      class: 'animated-image-toggle btn',
    });

    $wrapper.append($toggle);

    $toggle.on('click', (ev: Event) => {
      this.handleToggleClick(ev);
    });
  }

  /**
   * Gets the toggle button associated with an image
   * @param image
   * @returns {HTMLButtonElement}
   * @private
   */
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
    if (AnimationBlocker.getCover(image)) return;

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

  /**
   * Toggles the animation of an image
   * @param event
   * @private
   */
  private static handleToggleClick(event: Event): void {
    const target = event.target as HTMLElement;
    const toggle = target!.closest('button') as HTMLButtonElement;
    const parent = toggle.parentElement!;
    const image = parent.querySelector('img')!;

    if (!image) return;

    const isPaused = image.getAttribute('data-animation-state') === 'paused';

    if (isPaused) {
      this.play(image);
    } else {
      this.pause(image);
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
    $(image).data('animationController', this);
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
    toggleBtn.innerHTML = this.pauseIcon;
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
    toggleBtn.innerHTML = this.playIcon;
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
