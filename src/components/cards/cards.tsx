import React from "react";
import clsx from "clsx";
import styles from "./cards.module.css";

import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
  EqualsIcon,
} from "@heroicons/react/24/outline";

export type CardResult = "positive" | "negative" | null;

export type CardData = {
  id: number;
  title: string;
  amount: string;
  historicalAmount: string;
  result: CardResult;
};

export type CardsProps = {
  cards: CardData[];
};

const getResultStyles = (result: CardResult) => {
  return clsx(styles.card, {
    [styles.positive]: result === "positive",
    [styles.negative]: result === "negative",
    [styles.neutral]: result === null,
  });
};

const getResultIcon = (result: CardResult) => {
  if (result === "positive") return <ArrowTrendingUpIcon className={styles.icon} aria-hidden="true" />;
  if (result === "negative") return <ArrowTrendingDownIcon className={styles.icon} aria-hidden="true" />;
  return null;
};

export const Cards = ({ cards }: CardsProps) => {
  return (
    <div
      className={styles.cards}
    >
      {cards.map((card) => (
        <div key={card.id} className={getResultStyles(card.result)}>
          <span className={styles.title}>
            {card.title}
            {getResultIcon(card.result)}
          </span>
            <p className={styles.amount}>{card.amount || "-"}</p>
            <span className={styles.historical}>
            {card.id === 3 ? "since last hour" : `today: ${card.historicalAmount}`}
            </span>
        </div>
      ))}
    </div>
  );
};
