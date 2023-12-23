export const PAGINATION_ITEMS_PER_PAGE = 4;

const asd = [
  {
    name: "Szarlotka",
    description:
      "Tradycyjny polski deser, który skradnie serca wszystkich łasuchów. Soczyste jabłka podsmażone z cynamonem, a wszystko to zamknięte w chrupiącym cieście.",
    preparationTime: 60,
    servingAmount: 8,
    steps: [
      {
        description:
          "Wymieszaj mąkę, cukier, sól i masło, aż powstanie kruszonka. Podziel na dwie części.",
        position: 1,
      },
      {
        description:
          "Obierz jabłka, usuń gniazda nasienne i pokrój na cienkie plasterki. Podsmaż na patelni z cynamonem, aż jabłka zmiękną.",
        position: 2,
      },
      {
        description:
          "Spód blaszki wyłożonej papierem do pieczenia wylep jedną częścią ciasta. Nałoż pierwszą warstwę jabłek, a następnie drugą część ciasta. Wierzch posmaruj roztrzepanym jajkiem.",
        position: 3,
      },
      {
        description:
          "Piekarnik nagrzej do 180 stopni C. Wstaw szarlotkę i piecz przez około 40-45 minut, aż z wierzchu będzie lekko rumiana.",
        position: 4,
      },
      {
        description:
          "Po upieczeniu szarlotki pozostaw ją do ostygnięcia. Podawaj na ciepło, najchętniej z bitą śmietaną lub lodami.",
        position: 5,
      },
    ],
    ingredients: [
      { quantity: 300, name: "mąka" },
      { quantity: 200, name: "masło" },
      { quantity: 150, name: "cukier" },
      { quantity: 1, name: "szczypta soli" },
      { quantity: 1, name: "kg jabłek" },
      { quantity: 2, name: "łyżeczki cynamonu" },
      { quantity: 1, name: "jajko" },
    ],
  },
  {
    name: "Tiramisu",
    description:
      "Klasyczny włoski deser z kawowymi biszkoptami i kremowym serem mascarpone. Idealny na wieczorne spotkanie z przyjaciółmi.",
    preparationTime: 30,
    servingAmount: 6,
    steps: [
      { description: "Ugotuj kawę, a następnie wystudź ją.", position: 1 },
      {
        description:
          "W misce wymieszaj mascarpone, cukier i ekstrakt waniliowy, aż powstanie jednolita masa.",
        position: 2,
      },
      {
        description:
          "Namocz biszkopty w kawie, a następnie ułóż je na dnie foremki lub pucharka.",
        position: 3,
      },
      {
        description:
          "Na biszkoptach rozsmaruj warstwę kremowego sera mascarpone. Powtórz warstwę biszkoptów i kremu jeszcze raz.",
        position: 4,
      },
      {
        description:
          "Posyp wierzch deseru kakao i wstaw do lodówki na minimum 2 godziny.",
        position: 5,
      },
      {
        description:
          "Podawaj schłodzone tiramisu. Możesz ozdobić je startą czekoladą lub posypać wiórkami kokosowymi.",
        position: 6,
      },
    ],
    ingredients: [
      { quantity: 250, name: "ser mascarpone" },
      { quantity: 50, name: "cukier" },
      { quantity: 1, name: "łyżeczka ekstraktu waniliowego" },
      { quantity: 200, name: "biszkopty" },
      { quantity: 200, name: "kawa" },
      { quantity: 2, name: "łyżeczki kakao" },
    ],
  },
  {
    name: "Sernik",
    description:
      "Klasyczny polski sernik, którego miękkość i delikatność rozpływa się w ustach. Idealna kompozycja serka mascarpone, serka białego i wanilii.",
    preparationTime: 120,
    servingAmount: 10,
    steps: [
      {
        description:
          "W misce wymieszaj rozpuszczone masło, cukier, jajka, serek mascarpone, ser biały i ekstrakt waniliowy.",
        position: 1,
      },
      {
        description:
          "Do masy serowej dodaj mąkę i skórkę otartą z cytryny. Wszystko dokładnie połącz.",
        position: 2,
      },
      {
        description:
          "Wylej masę serową do formy wyłożonej papierem do pieczenia. Piecz w nagrzanym piekarniku do 180 stopni C przez około 1,5 godziny.",
        position: 3,
      },
      {
        description:
          "Po upieczeniu sernika pozostaw go do całkowitego ostygnięcia w piekarniku.",
        position: 4,
      },
      {
        description:
          "Schłodzony sernik można ozdobić bitą śmietaną, owocami lub posypać cukrem pudrem.",
        position: 5,
      },
    ],
    ingredients: [
      { quantity: 200, name: "masło" },
      { quantity: 200, name: "cukier" },
      { quantity: 4, name: "jajka" },
      { quantity: 500, name: "ser mascarpone" },
      { quantity: 500, name: "ser biały" },
      { quantity: 2, name: "łyżeczki ekstraktu waniliowego" },
      { quantity: 150, name: "mąka" },
      { quantity: 1, name: "cytryna" },
    ],
  },
  {
    name: "Naleśniki z Nutellą",
    description:
      "Proste i szybkie w przygotowaniu naleśniki, które zasmakują każdemu wielbicielowi czekoladowego kremu Nutella.",
    preparationTime: 30,
    servingAmount: 4,
    steps: [
      {
        description:
          "W misce wymieszaj mąkę, jajka, mleko i szczyptę soli, aż powstanie gładkie ciasto.",
        position: 1,
      },
      {
        description:
          "Na rozgrzaną patelnię nalej cienką warstwę ciasta i smaż na złoty kolor z obu stron.",
        position: 2,
      },
      {
        description: "Schłodzone naleśniki posmaruj Nutellą i zwiń w ruloniki.",
        position: 3,
      },
      {
        description:
          "Podawaj ciepłe naleśniki z dodatkiem lodów waniliowych lub bitą śmietaną.",
        position: 4,
      },
    ],
    ingredients: [
      { quantity: 200, name: "mąka" },
      { quantity: 2, name: "jajka" },
      { quantity: 300, name: "mleko" },
      { quantity: 1, name: "szczypta soli" },
      { quantity: 200, name: "Nutella" },
    ],
  },
  {
    name: "Jagodzianki",
    description:
      "Pychne drożdżowe bułeczki z soczystymi jagodami, które rozpływają się w ustach. Idealne na leniwe niedzielne śniadanie.",
    preparationTime: 120,
    servingAmount: 12,
    steps: [
      {
        description:
          "W misce wymieszaj mąkę, drożdże, cukier, jajko, masło i szczyptę soli. Dodaj letnie mleko i zagnieć ciasto, aż będzie elastyczne.",
        position: 1,
      },
      {
        description:
          "Odstaw ciasto do wyrośnięcia w ciepłe miejsce na około 1 godzinę.",
        position: 2,
      },
      {
        description:
          "Po wyrośnięciu ciasto podziel na 12 porcji i uformuj bułeczki na dłonie. Na każdej bułeczce rozłóż garść jagód.",
        position: 3,
      },
      {
        description:
          "Piekarnik nagrzej do 180 stopni C. Wstaw jagodzianki do piekarnika i piecz przez około 20-25 minut, aż będą rumiane.",
        position: 4,
      },
      {
        description:
          "Po upieczeniu jagodzianki ostudź na kratce. Możesz je posypać cukrem pudrem przed podaniem.",
        position: 5,
      },
    ],
    ingredients: [
      { quantity: 500, name: "mąka" },
      { quantity: 25, name: "drożdże" },
      { quantity: 100, name: "cukier" },
      { quantity: 1, name: "jajko" },
      { quantity: 100, name: "masło" },
      { quantity: 250, name: "mleko" },
      { quantity: 1, name: "szczypta soli" },
      { quantity: 300, name: "jagody" },
    ],
  },
];
