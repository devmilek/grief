export const servingMap = {
  SERVINGS: "Porcja",
  PIECES: "Kawałki",
};

export const difficultyMap = {
  EASY: "Łatwy",
  MEDIUM: "Średni",
  HARD: "Trudny",
};

export const unitMap = {
  NULL: "Brak",
  G: "g",
  CUP: "Szklanka",
  ML: "ml",
  KG: "kg",
  L: "l",
  TBSP: "Łyżka",
  TSP: "Łyżeczka",
  OZ: "Uncja",
  PIECE: "Kawałek",
  STALK: "Łodyga",
  CLOVE: "Ząbek",
  SEED: "Nasiono",
  PINCH: "Szczypta",
  CUBE: "Kostka",
  SLICE: "Plaster",
};

export const additionalQuantityMap = {
  NULL: "Brak",
  FRAC1_2: "&frac12;",
  FRAC1_3: "&frac13;",
  FRAC1_4: "&frac14;",
  FRAC1_8: "&frac18;",
  FRAC2_3: "&frac23;",
  FRAC3_4: "&frac34;",
};

interface ClerkErrorsMap {
  form_password_pwned: string;
  form_identifier_exists: string;
  form_password_incorrect: string;
  form_identifier_not_found: string;
  form_param_nil: string;
  form_code_incorrect: string;
  [key: string]: string;
}

export const clerkErrorsMap: ClerkErrorsMap = {
  form_password_pwned:
    "Hasło zostało znalezione w wyniku naruszenia danych online.  Dla bezpieczeństwa konta prosimy o użycie innego hasła.",
  form_identifier_exists: "Ten adres e-mail jest zajęty. Spróbuj użyć innego.",
  form_password_incorrect: "Nieprawidłowe hasło.",
  form_identifier_not_found:
    "Nie znaleziono użytkownika o podanym adresie e-mail.",
  form_param_nil: "Podaj hasło.",
  form_code_incorrect: "Nieprawidłowy kod.",
};
