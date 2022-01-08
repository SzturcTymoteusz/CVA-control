import {FormConfiguration} from "../models/form-configuration";

export const formConfiguration: FormConfiguration = {
  drinks: {
    label: 'Wybierz napój',
    products: [
      {
        id: 1,
        name: 'Coca-cola',
        description: 'Coca-cola - marka napoju gazowanego przedsiębiorstwa The Coca-Cola Company. '
      },
      {
        id: 2,
        name: 'Woda',
        description: 'Woda - związek chemiczny o wzorze H₂O, występujący w warunkach standardowych w stanie ciekłym. '
      },
      {
        id: 3,
        name: 'Energetyk',
        description: 'Energetyk - napój energetyzujący potocznie napój energetyczny i energetyk – pobudzający, przeważnie gazowany napój bezalkoholowy.'
      },
      {
        id: 4,
        name: 'Pepsi',
        description: 'Pepsi - marka napojów gazowanych typu cola należąca do PepsiCo. Największym z jej konkurentów jest Coca-Cola. '
      },
      {
        id: 5,
        name: 'Mirinda',
        description: 'Mirinda - gazowany napój produkowany przez koncern PepsiCo o smaku pomarańczowym, arbuzowym, mandarynkowym, czerwonej pomarańczy, a kiedyś również ananasowym, którego produkcja rozpoczęła się w Hiszpanii.'},
      {
        id: 6,
        name: 'Woda Piwniczanka',
        description: 'Piwniczanka – naturalna woda mineralna wydobywana w Piwnicznej-Zdroju z odwiertów P-1 i P-2. '
      },
    ],
  },
  snacks: {
    label: 'Wybierz przekąskę',
    products: [
      {
        id: 1,
        name: 'Sałatka gyros',
        description: 'Sałatka gyros to jedna z najpopularniejszych sałatek imprezowych. Ta warstwowa sałatka z podsmażanym kurczakiem i warzywami zawsze wygląda efektownie na sylwestrowym stole.'
      },
      {
        id: 2,
        name: 'Zapiekanki',
        description: 'Domowe zapiekanki z bagietki to jedna z najlepszych przekąsek lub też pomysł na pyszną i szybką kolację.'
      },
      {
        id: 3,
        name: 'Prażona cebula',
        description: 'Domowa prażona cebula to tani i super pyszny dodatek do wielu dań takich jak hot dogi, czy pierogi.'
      },
      {
        id: 4,
        name: 'Kuleczki ziemniaczane',
        description: 'Domowe kulki ziemniaczane to niesamowicie pyszny pomysł na szybką przekąskę. Przepis na nie jest niezwykle prosty, a składniki tanie i łatwo dostępne.'
      },
      {
        id: 5,
        name: 'Krążki cebulowe',
        description: 'Domowe krążki cebulowe to niezwykle prosta i super pyszna przekąska na każdą okazję.'
      },
    ],
  }
};
