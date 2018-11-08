import { Injectable, ElementRef, Renderer } from '@angular/core';

@Injectable()
export class NgxGalleryHelperService {

    private swipeHandlers: Map<string, Function[]> = new Map<string, Function[]>();

    private pinchHandlers: Map<string, Function[]> = new Map<string, Function[]>();

    constructor(private renderer: Renderer) {}

    manageSwipe(status: boolean, element: ElementRef, id: string, nextHandler: Function, prevHandler: Function): void {

        const handlers = this.getSwipeHandlers(id);

        // swipeleft and swiperight are available only if hammerjs is included
        try {
            if (status && !handlers) {
                this.swipeHandlers.set(id, [
                    this.renderer.listen(element.nativeElement, 'swipeleft', () => nextHandler()),
                    this.renderer.listen(element.nativeElement, 'swiperight', () => prevHandler())
                ]);
            } else if (!status && handlers) {
                handlers.map((handler) => handler());
                this.removeSwipeHandlers(id);
            }
        } catch (e) {}
    }

    managePinch(status: boolean, element: ElementRef, id: string, nextHandler: Function, prevHandler: Function, maxHandler: Function, minHandler: Function): void {

        const handlers = this.getPinchHandlers(id);
        // console.log('handlers ', handlers);
        // swipeleft and swiperight are available only if hammerjs is included
        try {
            if (status && !handlers) {
                this.pinchHandlers.set(id, [
                    this.renderer.listen(element.nativeElement, 'pinchin', () => nextHandler()),
                    this.renderer.listen(element.nativeElement, 'pinchout', () => prevHandler()),
                ]);
            } else if (!status && handlers) {
                handlers.map((handler) => handler());
                this.removePinchHandlers(id);
            }
        } catch (e) {}
    }

    validateUrl(url: string): string {
        if (url.replace) {
            return url.replace(new RegExp(' ', 'g'), '%20')
                .replace(new RegExp('\'', 'g'), '%27');
        } else {
            return url;
        }
    }

    getBackgroundUrl(image: string) {
        return 'url(\'' + this.validateUrl(image) + '\')';
    }

    private getSwipeHandlers(id: string): Function[] | undefined {
        return this.swipeHandlers.get(id);
    }

    private removeSwipeHandlers(id: string): void {
        this.swipeHandlers.delete(id);
    }

    private getPinchHandlers(id: string): Function[] | undefined {
        return this.pinchHandlers.get(id);
    }

    private removePinchHandlers(id: string): void {
        this.pinchHandlers.delete(id);
    }
}
