import { Component, OnInit, ElementRef, ViewChild, Input } from "@angular/core";
import { resolve } from "url";

enum CanvasLayer {
  rightLeg = "rightLeg",
  leftLeg = "leftLeg",
  torso = "torso",
  rightArm = "rightArm",
  head = "head",
  hair = "hair",
  swordArm = "swordArm",
  heart = "heart"
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
  private idleImages = new Map<CanvasLayer, HTMLImageElement>();
  private animationImagesForAllStatesAndAllLayers = new Map<
    CharacterState,
    Map<CanvasLayer, HTMLImageElement[]>
  >();
  // private healingImages = new Map<healingHearts, HTMLImageElement[]>;
  private context: CanvasRenderingContext2D;
  private breathDir = 1;
  private breathAmt = 0;
  private elapsedFrameCountForState = new Map<CharacterState, number>();

  constructor() {
    this.elapsedFrameCountForState.set(CharacterState.Idle, 0);
    this.elapsedFrameCountForState.set(CharacterState.Attacking, 0);
    this.elapsedFrameCountForState.set(CharacterState.Healing, 0);
  }

  private beforeRedraw() {
    if (this.characterState === CharacterState.Attacking) {
      this.elapsedFrameCountForState[CharacterState.Attacking] += 1;
      this.elapsedFrameCountForState[CharacterState.Healing] = 0;
      this.elapsedFrameCountForState[CharacterState.Idle] = 0;
    } else if (this.characterState === CharacterState.Idle) {
      this.elapsedFrameCountForState[CharacterState.Attacking] = 0;
      this.elapsedFrameCountForState[CharacterState.Healing] = 0;
      this.elapsedFrameCountForState[CharacterState.Idle] += 1;
    } else if (this.characterState === CharacterState.Healing) {
      this.elapsedFrameCountForState[CharacterState.Attacking] = 0;
      this.elapsedFrameCountForState[CharacterState.Healing] += 1;
      this.elapsedFrameCountForState[CharacterState.Idle] = 0;
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

  private drawPart(layer: CanvasLayer, y = 0, x = 0) {
    if (this.animationImagesForAllStatesAndAllLayers != null) {
      const animationImagesForCurrentStateAndAllLayers = this.animationImagesForAllStatesAndAllLayers.get(
        this.characterState
      );
      // Animation set for current state
      if (animationImagesForCurrentStateAndAllLayers != null) {
        const animationImagesForCurrentLayer = animationImagesForCurrentStateAndAllLayers.get(
          layer
        );
        if (animationImagesForCurrentLayer != null) {
          // Assign the animation image for current frame time
          const idxOfAnimationImageToDisplay = Math.floor(
            this.elapsedFrameCountForState[this.characterState] / 5
          );
          if (
            idxOfAnimationImageToDisplay < animationImagesForCurrentLayer.length
          ) {
            this.context.drawImage(
              animationImagesForCurrentLayer[idxOfAnimationImageToDisplay],
              x,
              y
            );
            return;
            // Stop
          }
        }
      }
    }
    // If any of the above didn't happen, draw the idle.
    // Draw idle
    this.context.drawImage(this.idleImages.get(layer), x, y);
  }

  private redraw() {
    this.canvasRef.nativeElement.width = this.canvasRef.nativeElement.width; // clears the canvas
    this.context.scale(0.5, 0.5);

    this.drawPart(CanvasLayer.swordArm, this.breathAmt);
    this.drawPart(CanvasLayer.leftLeg);
    this.drawPart(CanvasLayer.rightLeg);
    this.drawPart(CanvasLayer.torso);
    this.drawPart(CanvasLayer.rightArm, this.breathAmt);
    this.drawPart(CanvasLayer.head, this.breathAmt);
    this.drawPart(CanvasLayer.hair, this.breathAmt);
    this.drawPart(CanvasLayer.heart);
  }

  private everyInterval() {
    this.beforeRedraw();
    this.redraw();
  }

  private getFilepathFromBodyPart(
    part: CanvasLayer,
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

    const loadIdleCanvasLayer = (part: CanvasLayer) => {
      const promiseFunction = (resolve, reject) => {
        const element = new Image();
        element.onload = () => resolve();
        element.onerror = err => reject(err);
        element.src = this.getFilepathFromBodyPart(part, CharacterState.Idle);
        this.idleImages.set(part, element);
      };
      return new Promise(promiseFunction);
    };

    const loadAnimationsCanvasLayer = (
      part: CanvasLayer,
      characterState: CharacterState,
      filepaths: string[]
    ) => {
      const promiseFunction = filepath => (resolve, reject) => {
        const element = new Image();
        element.onload = () => resolve();
        element.onerror = err => reject(err);
        element.src = filepath;
        // Get data for current character state
        let animationImagesForThisCharacterState = this.animationImagesForAllStatesAndAllLayers.get(
          characterState
        );
        // If current character state information does not exist yet (first entry)
        if (animationImagesForThisCharacterState == null) {
          // Set it as empty
          animationImagesForThisCharacterState = new Map<
            CanvasLayer,
            HTMLImageElement[]
          >();
          this.animationImagesForAllStatesAndAllLayers.set(
            characterState,
            animationImagesForThisCharacterState
          );
        }
        // If current body part information does not exist yet (first entry)
        if (!animationImagesForThisCharacterState.has(part)) {
          // Set it as empty
          animationImagesForThisCharacterState.set(part, []);
        }
        // Get current body part information
        const animationImagesForMyPart = animationImagesForThisCharacterState.get(
          part
        );
        // Add new animation to list
        animationImagesForMyPart.push(element);
      };
      const promises = [];
      for (let filepath of filepaths) {
        promises.push(new Promise(promiseFunction(filepath)));
      }
      return Promise.all(promises);
    };

    // const leftArmPromise = loadIdleCanvasLayer(CanvasLayer.leftArm);
    const rightLegPromise = loadIdleCanvasLayer(CanvasLayer.rightLeg);
    const leftLegPromise = loadIdleCanvasLayer(CanvasLayer.leftLeg);
    const torsoPromise = loadIdleCanvasLayer(CanvasLayer.torso);
    const rightArmPromise = loadIdleCanvasLayer(CanvasLayer.rightArm);
    const swordArmPromise = loadIdleCanvasLayer(CanvasLayer.swordArm);
    const headPromise = loadIdleCanvasLayer(CanvasLayer.head);
    const hairPromise = loadIdleCanvasLayer(CanvasLayer.hair);
    const swordplayPromise = loadAnimationsCanvasLayer(
      CanvasLayer.swordArm,
      CharacterState.Attacking,
      [
        "/assets/images/" +
          this.characterName +
          "/swordplay/" +
          CanvasLayer.swordArm +
          "1.svg",
        "/assets/images/" +
          this.characterName +
          "/swordplay/" +
          CanvasLayer.swordArm +
          "1.svg",
        "/assets/images/" +
          this.characterName +
          "/swordplay/" +
          CanvasLayer.swordArm +
          "2.svg",
        "/assets/images/" +
          this.characterName +
          "/swordplay/" +
          CanvasLayer.swordArm +
          "3.svg",
        "/assets/images/" +
          this.characterName +
          "/swordplay/" +
          CanvasLayer.swordArm +
          "3.svg"
      ]
    );
    const faceAttackPromise = loadAnimationsCanvasLayer(
      CanvasLayer.head,
      CharacterState.Attacking,
      [
        "/assets/images/" + this.characterName + "/swordplay/attackface.svg",
        "/assets/images/" + this.characterName + "/swordplay/attackface.svg",
        "/assets/images/" + this.characterName + "/swordplay/attackface.svg",
        "/assets/images/" + this.characterName + "/swordplay/attackface.svg",
        "/assets/images/" + this.characterName + "/swordplay/attackface.svg"
      ]
    );

    this.idleImages.set(CanvasLayer.heart, new Image());
    const heartPromise = loadAnimationsCanvasLayer(
      CanvasLayer.heart,
      CharacterState.Healing,
      [
        "/assets/images/HeartsHealing/heart1.svg",
        "/assets/images/HeartsHealing/heart1.svg",
        "/assets/images/HeartsHealing/heart2.svg",
        "/assets/images/HeartsHealing/heart2.svg",
        "/assets/images/HeartsHealing/heart3.svg",
        "/assets/images/HeartsHealing/heart3.svg",
        "/assets/images/HeartsHealing/heart4.svg",
        "/assets/images/HeartsHealing/heart4.svg",
        "/assets/images/HeartsHealing/heart5.svg",
        "/assets/images/HeartsHealing/heart5.svg",
        "/assets/images/HeartsHealing/heart6.svg",
        "/assets/images/HeartsHealing/heart6.svg"
      ]
    );

    try {
      // await leftArmPromise;
      await rightLegPromise;
      await leftLegPromise;
      await torsoPromise;
      await rightArmPromise;
      await headPromise;
      await hairPromise;
      await swordArmPromise;
      await swordplayPromise;
      await faceAttackPromise;
      await heartPromise;
      window.setInterval(() => this.everyInterval(), 1000 / this.fps);
    } catch (err) {
      console.error(err);
    }
  }
}
