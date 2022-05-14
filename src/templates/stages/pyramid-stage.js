import { RedBird } from '../../organisms/birds/red-bird';
import { Box } from '../../molecules/box';
import { Ground } from '../../molecules/ground';
import { Slingshot } from '../../organisms/slingshot/slingshot';
import {
    RENDER_WIDTH,
    BIRD_X,
    BIRD_Y,
    BIRD_SIZE_RED,
    GROUND_HEIGHT,
    GROUND_X,
    GROUND_Y
} from '../../atoms/constants';

class PyramidStage {
    constructor() {
        this.composites = [];

        this.bird = new RedBird(BIRD_X, BIRD_Y, BIRD_SIZE_RED);
        this.ground = new Ground(GROUND_X, GROUND_Y, RENDER_WIDTH, GROUND_HEIGHT);
        this.slingshot = new Slingshot(this.bird);

        this.pyramid = Matter.Composites.pyramid(900, 100, 9, 10, 0, 0, function (x, y) {
            let box = new Box(x, y, 30, 50);
            return box.getBody()
        });

        this.composites.push(this.slingshot.getLeftElastic());
        this.composites.push(this.slingshot.getRightElastic());
        this.composites.push(this.slingshot.getSlingshotBody());
        this.composites.push(this.ground.getBody());
        this.composites.push(this.bird.getBody());
        this.composites.push(this.pyramid);
    }

    getComposites() {
        return this.composites;
    }
}

export { PyramidStage }