import { Component, OnInit, ElementRef, ViewChild, Input } from "@angular/core";
import { resolve } from "url";

enum BodyParts {
  leftArm = "leftArm",
  rightLeg = "rightLeg",
  leftLeg = "leftLeg",
  torso = "torso",
  rightArm = "rightArm",
  head = "head",
  hair = "hair",
  swordArm = "swordArm",
  heart = "heart",
}

export enum CharacterState {
  Idle,
  Attacking,
  Healing
}

@Component({
  selector: "app-breathandblink",
  templateUrl: "./breathandblink.component.html",
  styleUrls: ["./breathandblink.component.css"]
})
export class BreathandblinkComponent implements OnInit {
  @Input() characterName: string;
  @Input() fps: number;
  @Input() characterState: CharacterState;
  @ViewChild("myCanvas") canvasRef: ElementRef;
  private idleImages = new Map<BodyParts, HTMLImageElement>();
  private animationImages = new Map<
    CharacterState,
    Map<BodyParts, HTMLImageElement[]>
  >();
  // private healingImages = new Map<healingHearts, HTMLImageElement[]>;
  private context: CanvasRenderingContext2D;
  private breathDir = 1;
  private breathAmt = 0;
  private animationProgress = new Map<CharacterState, number>();

  constructor() {
    this.animationProgress.set(CharacterState.Idle, 0);
    this.animationProgress.set(CharacterState.Attacking, 0);
    this.animationProgress.set(CharacterState.Healing, 0);
  }

  private beforeRedraw() {
    if (this.characterState === CharacterState.Attacking) {
      const attackInc = 0.1;
      this.animationProgress[this.characterState] += attackInc;
    }

    if (this.characterState === CharacterState.Idle) {
      this.animationProgress[CharacterState.Attacking] = 0;
    }

    const breathMax = 2;
    const breathInc = 0.1;
    if (this.breathDir === 1) {
      // breath in
      this.breathAmt -= breathInc;
      if (this.breathAmt < -breathMax) {
        this.breathDir = -1;
      }
    } else {
      // breath out
      this.breathAmt += breathInc;
      if (this.breathAmt > breathMax) {
        this.breathDir = 1;
      }
    }
  }

  private drawPart(part: BodyParts, y = 0, x = 0) {
    const animationCurrent = this.animationImages.get(this.characterState);
    // Animation set for current state
    if (animationCurrent != null) {
      const animForPart = animationCurrent.get(part);
      if (animForPart != null) {
        const idx = Math.round(this.animationProgress[this.characterState]);
        if (idx < animForPart.length) {
          this.context.drawImage(animForPart[idx], x, y);
          return;
          // Stop
        }
      }
    }
    // If any of the above didn't happen, draw the idle.
    // Draw idle
    this.context.drawImage(this.idleImages[part], x, y);
  }

  private redraw() {
    this.canvasRef.nativeElement.width = this.canvasRef.nativeElement.width; // clears the canvas
    this.context.scale(0.5, 0.5);

    this.drawPart(BodyParts.swordArm, this.breathAmt);
    this.drawPart(BodyParts.leftLeg);
    this.drawPart(BodyParts.rightLeg);
    this.drawPart(BodyParts.torso);
    this.drawPart(BodyParts.rightArm, this.breathAmt);
    this.drawPart(BodyParts.head, this.breathAmt);
    this.drawPart(BodyParts.hair, this.breathAmt);
  }

  private drawEllipse(centerX, centerY, width, height) {
    this.context.beginPath();

    this.context.moveTo(centerX, centerY - height / 2);

    this.context.bezierCurveTo(
      centerX + width / 2,
      centerY - height / 2,
      centerX + width / 2,
      centerY + height / 2,
      centerX,
      centerY + height / 2
    );

    this.context.bezierCurveTo(
      centerX - width / 2,
      centerY + height / 2,
      centerX - width / 2,
      centerY - height / 2,
      centerX,
      centerY - height / 2
    );

    this.context.fillStyle = "black";
    this.context.fill();
    this.context.closePath();
  }

  private everyInterval() {
    this.beforeRedraw();
    this.redraw();
  }

  private getFilepathFromBodyPart(
    part: BodyParts,
    characterState: CharacterState
  ) {
    if (characterState === CharacterState.Idle) {
      switch (part) {
        // case BodyParts.hair:
        // return "/assets/images/hairs/" + this.characterName + "/" + part + ".svg";
        default:
          return "/assets/images/" + this.characterName + "/" + part + ".svg";
      }
    }
  }

  async ngOnInit() {
    this.context = this.canvasRef.nativeElement.getContext("2d");

    const loadIdleBodyPart = (part: BodyParts) => {
      const promiseFunction = (resolve, reject) => {
        const element = new Image();
        element.onload = () => resolve();
        element.onerror = err => reject(err);
        element.src = this.getFilepathFromBodyPart(part, CharacterState.Idle);
        this.idleImages[part] = element;
      };
      return new Promise(promiseFunction);
    };

    const loadAnimationImages = (
      part: BodyParts,
      characterState: CharacterState,
      filepaths: string[]
    ) => {
      const promiseFunction = filepath => (resolve, reject) => {
        const element = new Image();
        element.onload = () => resolve();
        element.onerror = err => reject(err);
        element.src = filepath;
        // Get data for current character state
        let animationImagesForThisCharacterState = this.animationImages.get(
          characterState
        );
        // If current character state information does not exist yet (first entry)
        if (animationImagesForThisCharacterState == null) {
          // Set it as empty
          animationImagesForThisCharacterState = {} as any;
          this.animationImages.set(
            characterState,
            animationImagesForThisCharacterState
          );
        }
        // If current body part information does not exist yet (first entry)
        if (animationImagesForThisCharacterState[part] == null) {
          // Set it as empty
          animationImagesForThisCharacterState[part] = [];
        }
        // Get current body part information
        const animationImagesForMyPart =
          animationImagesForThisCharacterState[part];
        // Add new animation to list
        animationImagesForMyPart.push(element);
      };
      const promises = [];
      for (let filepath of filepaths) {
        promises.push(new Promise(promiseFunction(filepath)));
      }
      return Promise.all(promises);
    };

    const leftArmPromise = loadIdleBodyPart(BodyParts.leftArm);
    const rightLegPromise = loadIdleBodyPart(BodyParts.rightLeg);
    const leftLegPromise = loadIdleBodyPart(BodyParts.leftLeg);
    const torsoPromise = loadIdleBodyPart(BodyParts.torso);
    const rightArmPromise = loadIdleBodyPart(BodyParts.rightArm);
    const swordArmPromise = loadIdleBodyPart(BodyParts.swordArm);
    const headPromise = loadIdleBodyPart(BodyParts.head);
    const hairPromise = loadIdleBodyPart(BodyParts.hair);
    const swordplayPromise = loadAnimationImages(
      BodyParts.swordArm,
      CharacterState.Attacking,
      [
        "/assets/images/" +
          this.characterName +
          "/swordplay/" +
          BodyParts.swordArm +
          "1.svg",
        "/assets/images/" +
          this.characterName +
          "/swordplay/" +
          BodyParts.swordArm +
          "1.svg",
        "/assets/images/" +
          this.characterName +
          "/swordplay/" +
          BodyParts.swordArm +
          "2.svg",
        "/assets/images/" +
          this.characterName +
          "/swordplay/" +
          BodyParts.swordArm +
          "3.svg",
        "/assets/images/" +
          this.characterName +
          "/swordplay/" +
          BodyParts.swordArm +
          "3.svg"
      ]
    );
    const faceAttackPromise = loadAnimationImages(
      BodyParts.head,
      CharacterState.Attacking,
      [
        "/assets/images/" + this.characterName + "/swordplay/attackface.svg",
        "/assets/images/" + this.characterName + "/swordplay/attackface.svg",
        "/assets/images/" + this.characterName + "/swordplay/attackface.svg",
        "/assets/images/" + this.characterName + "/swordplay/attackface.svg",
        "/assets/images/" + this.characterName + "/swordplay/attackface.svg"
      ]
    );

    // const heartPromise = loadAnimationImages(
    //   BodyParts.heart, CharacterState.Healing,
    //   [
    //     "/assets/images/HeartsHealing/heart1.svg",
    //     "/assets/images/HeartsHealing/heart2.svg",
    //     "/assets/images/HeartsHealing/heart3.svg",
    //     "/assets/images/HeartsHealing/heart4.svg",
    //     "/assets/images/HeartsHealing/heart5.svg",
    //     "/assets/images/HeartsHealing/heart6.svg"
    //   ]
    // );

    try {
      await leftArmPromise;
      await rightLegPromise;
      await leftLegPromise;
      await torsoPromise;
      await rightArmPromise;
      await headPromise;
      await hairPromise;
      await swordArmPromise;
      await swordplayPromise;
      await faceAttackPromise;
      // await heartPromise;
      window.setInterval(() => this.everyInterval(), 1000 / this.fps);
    } catch (err) {
      console.error(err);
    }
  }
}
