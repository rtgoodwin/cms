export class AnimationBlocker {
  static extensions: string[] = ['.gif', '.webp'];
  private static minToggleableHeight: number = 100;
  private static minToggleableWidth: number = 100;
  #imageAddedObserver = AnimationBlocker.createImageAddedObserver();
  private static playIcon: string =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc. --><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>';
  private static pauseIcon: string =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Pro 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc. --><path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z"/></svg>';

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
    const callback = (mutationList: Array<MutationRecord>) => {
      for (const mutation of mutationList) {
        if (mutation.type === 'childList') {
          if (mutation.addedNodes) {
            for (const node of mutation.addedNodes) {
              if (node.nodeName === 'IMG') {
                if (this.couldBeAnimated(node as HTMLImageElement)) {
                  this.hideAnimation(node as HTMLImageElement);
                }
              }
            }
          }

          if (mutation.removedNodes.length > 0) {
            mutation.removedNodes.forEach((removedNode) => {
              if (removedNode.nodeName === 'IMG') {
                if (this.couldBeAnimated(removedNode as HTMLImageElement)) {
                  this.removeBlockerUI(mutation.target as HTMLElement);
                }
              }
            });
          }
        }
      }
    };

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);

    return observer;
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
    if (!this.isToggleEnabled(image) || this.getToggle(image)) return;

    const wrapper = image.parentElement!;

    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.dataset.animationToggle = 'true';
    toggle.setAttribute('aria-label', Craft.t('app', 'Play'));
    toggle.classList.add('animated-image-toggle', 'btn');
    toggle.innerHTML = this.playIcon;

    wrapper.appendChild(toggle);

    toggle.addEventListener('click', (ev: Event) => {
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
    const parent = image.parentElement!;
    return parent.querySelector('[data-animation-toggle]') as HTMLButtonElement;
  }

  /**
   * Creates a canvas to cover the image
   * @param image
   * @private
   */
  private static createCover(image: HTMLImageElement): void {
    if (this.getCover(image)) return;

    const width = image.clientWidth;
    const height = image.clientHeight;
    const parent = image.parentElement!;

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    canvas.setAttribute('aria-hidden', 'true');
    canvas.setAttribute('role', 'presentation');
    canvas.setAttribute('data-image-cover', 'true');
    canvas.style.position = 'absolute';
    canvas.style.top = '50%';
    canvas.style.left = '50%';
    canvas.style.transform = 'translate(-50%, -50%)';

    // Draw first frame on canvas
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    ctx.drawImage(image, 0, 0, width, height);
    parent.style.position = 'relative';
    parent.insertBefore(canvas, image);
  }

  /**
   * Gets the canvas cover
   * @param image
   * @private
   */
  private static getCover(image: HTMLImageElement): HTMLCanvasElement {
    return image.parentElement?.querySelector(
      '[data-image-cover]'
    ) as HTMLCanvasElement;
  }

  /**
   * Removes the canvas cover
   * @param image
   * @private
   */
  private static removeCover(image: HTMLImageElement) {
    const cover = this.getCover(image);
    cover.parentElement!.removeChild(cover);
  }

  private static removeBlockerUI(mutationTarget: HTMLElement) {
    mutationTarget.querySelector('[data-image-cover]')?.remove();
    mutationTarget.querySelector('[data-animation-toggle]')?.remove();
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
      imageWidth >= this.minToggleableWidth &&
      imageHeight >= this.minToggleableHeight
    );
  }

  /**
   * Hides the animation of an image by drawing the first frame on a canvas
   * @param image
   */
  private static async hideAnimation(image: HTMLImageElement): Promise<void> {
    // If image already has an animation controller, return
    if (image.dataset.animationController) return;

    // Wait until it's completely loaded
    await this.waitForImage(image);
    const parent = image.parentElement!;
    let canvas = parent.querySelector('[data-image-cover]');
    const width = image.clientWidth;
    const height = image.clientHeight;

    // Store state on image
    image.setAttribute('data-animation-state', 'paused');

    if (!canvas) {
      image.setAttribute('data-width', width.toString());
      image.setAttribute('data-height', height.toString());
      this.createCover(image);
    } else if (canvas && this.imageSizeChanged(image)) {
      // Replace canvas
      this.removeCover(image);
      this.createCover(image);
    }

    this.createToggle(image);
    image.dataset.animationController = JSON.stringify(this);
  }

  /**
   * Hides the animation of all images on the page
   */
  private static hideAllAnimations(): void {
    const images: HTMLImageElement[] = this.getAllPotentiallyAnimated();
    for (let i = 0; i < images.length; i++) {
      this.hideAnimation(images[i]);
    }
  }

  /**
   * Filters a NodeList of images to only include those that could be animated
   */
  private static filterImages(
    images: NodeListOf<HTMLImageElement>
  ): HTMLImageElement[] {
    return Array.from(images).filter((image) => this.couldBeAnimated(image));
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

    const hasExpectedExtension = this.extensions.some(
      (extension) => src.includes(extension) || srcset.includes(extension)
    );

    return hasExpectedExtension || image.hasAttribute('data-animated');
  }

  static getAllPotentiallyAnimated(): HTMLImageElement[] {
    const allImages: NodeListOf<HTMLImageElement> =
      document.querySelectorAll('img');
    return this.filterImages(allImages);
  }
}
