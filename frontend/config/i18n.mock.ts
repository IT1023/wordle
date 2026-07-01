import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  fallbackLng: "en",
  defaultNS: "common",
  resources: {
    en: {
      common: {
        title: "Wordle",
        theme: {
          light: "change theme to dark",
          dark: "change theme to light",
        },
        errors: {
          ABORT: "The guess was aborted.",
          SYSTEM: "Something went wrong. Please try again.",
          DOWN: "The game server is currently unavailable.",
          MISMATCH: "The guess format is invalid.",
          INVALID: "That is not a valid English word.",
          UNPROCESSABLE: "You already tried that word.",
        },
        gameTitle: "Guess the Word",
        attemptsLeft: "Attempts Left",
        gameOver: {
          won: "🎉 Congratulations! You guessed the word correctly and won the game!",
          failed:
            "❌ Game Over! You’ve used all your attempts. Better luck tomorrow!",
        },
        menu: {
          signature: "Made With ❤️ By IT1023",
          resetGame: "Reset Game",
          sourceCode: "Source Code",
          github: "Github",
          linkedin: "Linkedin",
          zenn: "Zenn",
        },
        logo: "Wordle Logo",
      },
    },
    ja: {
      common: {
        title: "ワードル",
        theme: {
          light: "テーマをダークに変更",
          dark: "テーマをライトに変更",
        },
        errors: {
          ABORT: "入力は中断されました。",
          SYSTEM: "問題が発生しました。もう一度お試しください。",
          DOWN: "ゲームサーバーは現在利用できません。",
          MISMATCH: "入力形式が正しくありません。",
          INVALID: "その単語は英語の単語として認識されません。",
          UNPROCESSABLE: "その単語は既に入力済みです。",
        },
        gameTitle: "単語を当てよう",
        attemptsLeft: "残り試行回数",
        gameOver: {
          won: "🎉 おめでとうございます！単語を正解してゲームに勝ちました！",
          failed:
            "❌ ゲームオーバー！すべての挑戦回数を使い切りました。また挑戦してください！",
        },
        menu: {
          signature: "IT1023 によって ❤️ を込めて作られました",
          resetGame: "ゲームをリセット",
          sourceCode: "ソースコード",
          github: "GitHub",
          linkedin: "LinkedIn",
          zenn: "Zenn",
        },
        logo: "Wordleロゴ",
      },
    },
  },
});

export default i18n;
