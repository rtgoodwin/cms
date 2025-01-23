export class AnimationBlocker {
  static extensions: string[] = ['.gif', '.webp'];
  private static minToggleableHeight: number = 100;
  private static minToggleableWidth: number = 100;
  private _imageAddedObserver = AnimationBlocker.createImageAddedObserver();

  protected get imageAddedObserver() {
    return this._imageAddedObserver;
  }

  constructor() {
    AnimationBlocker.hideAllAnimations();
  }

  private static createImageAddedObserver(): MutationObserver {
    const targetNode: HTMLBodyElement = document.querySelector('body')!;

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
                  AnimationBlocker.hideAnimation(node);
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

  private static getCanvasElement(image: HTMLImageElement): HTMLCanvasElement {
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
  }

  private static async waitForImage(image: HTMLImageElement) : Promise<void> {
    return new Promise((res) => {
      if (image.complete) {
        return res();
      }
      image.onload = () => res();
      image.onerror = () => res();
    });
  }

  private static imageSizeChanged(image: HTMLImageElement): boolean | undefined {
    const width: number = image.clientWidth;
    const height: number = image.clientHeight;
    const prevWidth: string | undefined = image.dataset.width;
    const prevHeight: string | undefined = image.dataset.height;

    if (!prevWidth || !prevHeight) return;

    return (
      width !== parseInt(prevWidth, 10) || height !== parseInt(prevHeight, 10)
    );
  }

  private static createToggle(image: HTMLImageElement): void {
    if (!AnimationBlocker.getToggleEnabled(image)) return;

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

    // $wrapper.append($toggle);
    //
    // this.addListener($toggle, 'click', (ev) => {
    //   this.handleToggleClick(ev);
    // });
  }

  private static getToggleEnabled(image: HTMLImageElement): boolean {
    const imageWidth: number = image.clientWidth;
    const imageHeight: number = image.clientHeight;

    return imageWidth >= AnimationBlocker.minToggleableWidth && imageHeight >= AnimationBlocker.minToggleableHeight;
  }

  static couldBeAnimated(image: HTMLImageElement): boolean {
    const src = image.src;
    const srcset = image.srcset;

    return AnimationBlocker.extensions.some(
      (extension) => src.includes(extension) || srcset.includes(extension)
    );
  }

  static hideAllAnimations(): void {
    const images: HTMLImageElement[] = AnimationBlocker.getAllPotentiallyAnimated();
    for (let i = 0; i < images.length; i++) {
      AnimationBlocker.hideAnimation(images[i]);
    }
  }

  static async hideAnimation(image: HTMLImageElement): Promise<void> {
    // If image already has an animation controller, return
    if ($(image).data('animationController')) return;

    // Wait until it's completely loaded
    await AnimationBlocker.waitForImage(image);
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
      $canvas = AnimationBlocker.getCanvasElement($image);
      $parent.css({
        position: 'relative',
      });
      $canvas.insertBefore($image);
    } else if ($canvas.length > 0 && AnimationBlocker.imageSizeChanged(image)) {
      console.log('redraw');
      // Replace canvas
      $canvas.remove();
      const newCanvas: HTMLCanvasElement = AnimationBlocker.getCanvasElement(image);
      $(newCanvas).insertBefore($image);
    }

    this.createToggle(image);
    //
    //
    // this.resizeObserver.observe(image);
    //
    // $(image).data('animationController', this);
  }

  static filterImagesByExtension(images: NodeListOf<HTMLImageElement>): HTMLImageElement[] {
    return Array.from(images).filter((image) => AnimationBlocker.couldBeAnimated(image));
  }

  static getAllPotentiallyAnimated(): HTMLImageElement[] {
    const allImages: NodeListOf<HTMLImageElement> = document.querySelectorAll('img');
    return AnimationBlocker.filterImagesByExtension(allImages);
  }
}
