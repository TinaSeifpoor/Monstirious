import { Card, CardType } from "../../player.service";

export const RestoreHealth: Card = {
    name: "RestoreHealth",
    manaCost: 10,
    playCard(
      changePlayerManaFunction,
      changePlayerHealthFunction,
      changeMonsterManaFunction,
      changeMonsterHealthFunction
    ) {
      changePlayerManaFunction(-10);
      changePlayerHealthFunction(+10);
    },
    damage: 0,
    type: CardType.SelfHealing
  };
  

  export const Dikshua: Card = {
    name: "Dikshua",
    manaCost: 60,
    playCard(
      changePlayerManaFunction,
      changePlayerHealthFunction,
      changeMonsterManaFunction,
      changeMonsterHealthFunction
    ) {
      changePlayerManaFunction(-60);
      changeMonsterHealthFunction(-50);
    },
    damage: 50,
    type: CardType.SingleTargetDamage
  };

  
  export const SuperPunch: Card = {
    name: "SuperPunch",
    manaCost: 40,
    playCard(
      changePlayerManaFunction,
      changePlayerHealthFunction,
      changeMonsterManaFunction,
      changeMonsterHealthFunction
    ) {
      changePlayerManaFunction(-40);
      changeMonsterHealthFunction(-30);
    },
    damage: 30,
    type: CardType.SingleTargetDamage
  };

  export const Kick: Card = {
    name: "Kick",
    manaCost: 30,
    playCard(
      changePlayerManaFunction,
      changePlayerHealthFunction,
      changeMonsterManaFunction,
      changeMonsterHealthFunction
    ) {
      changePlayerManaFunction(-30);
      changeMonsterHealthFunction(-20);
    },
    damage: 20,
    type: CardType.SingleTargetDamage
  };
  
  export const MonsterHit: Card = {
    name: "MonsterHit",
    manaCost: 30,
    playCard(
      changePlayerManaFunction,
      changePlayerHealthFunction,
      changeMonsterManaFunction,
      changeMonsterHealthFunction
    ) {
      changePlayerHealthFunction(-15);
      changeMonsterManaFunction(-30);
    },
    damage: 10,
    type: CardType.SingleTargetDamage
  };

export function getRandomCard() : Card {
  const randomValue = Math.random();
  if (randomValue < 0.3) {
    return RestoreHealth;
  }
  else if (randomValue < 0.6) {
    return SuperPunch;
  }
  else if (randomValue < 0.9) {
    return Kick;
  }
  else {
    return Dikshua;
  }
}