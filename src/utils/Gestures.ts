import { RectReturn } from '@wdio/protocols/build/types';

interface XY {
    x: number;
    y: number;
}

let SCREEN_SIZE: RectReturn;

class Gestures {

    static async swipeOnPercentage(start: XY, end: XY, percentage: number) {
        SCREEN_SIZE = SCREEN_SIZE || await driver.getWindowRect();
        let pressOptions = this.getDeviceScreenCoordinates(SCREEN_SIZE, start);
        let moveToScreenCoordinates = this.getDeviceScreenCoordinates(SCREEN_SIZE, end);

        // Ajusta las coordenadas basadas en el porcentaje
        moveToScreenCoordinates.y += (moveToScreenCoordinates.y - pressOptions.y) * (percentage / 100 - 1);
        moveToScreenCoordinates.x += (moveToScreenCoordinates.x - pressOptions.x) * (percentage / 100 - 1);

        await this.swipe(pressOptions, moveToScreenCoordinates);
    }

    static async swipe(from: XY, to: XY) {
        const adjustedTo = {
            x: to.x,
            y: from.y + (to.y - from.y) * 3 // Ajusta este multiplicador según sea necesario
        };

        await driver.performActions([
            {
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: from.x, y: from.y },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pause', duration: 100 }, // Breve pausa antes de iniciar el swipe
                    { type: 'pointerMove', duration: 100, x: adjustedTo.x, y: adjustedTo.y }, // Más rápido
                    { type: 'pointerUp', button: 0 }
                ],
            }
        ]);
        await driver.pause(500); // Una pausa corta después del swipe
    }

    private static getDeviceScreenCoordinates(screenSize: RectReturn, coordinates: XY): XY {
        return {
            x: Math.round(screenSize.width * (coordinates.x / 100)),
            y: Math.round(screenSize.height * (coordinates.y / 100)),
        };
    }
}

export default Gestures;

