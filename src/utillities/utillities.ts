import CocaCola from "../assets/images/mainPage/coca-cola.svg";
import Pepsi from "../assets/images/mainPage/pepsi.svg";
import Wildberries from "../assets/images/mainPage/wildberries.svg";
import Shoro from "../assets/images/mainPage/shoro.svg";
import Kulikov from "../assets/images/mainPage/kulikov.svg";
import Cafe from "../assets/images/menu/cafe.png";
import Entertaintment from "../assets/images/menu/entertainment.png";
import Things from "../assets/images/menu/things.png";
import Beauty from "../assets/images/menu/beauty.png";
import Transport from "../assets/images/menu/transport.png";
import RealEstate from "../assets/images/menu/real-estate.png";
import Medicine from "../assets/images/menu/medicine.png";
import Work from "../assets/images/menu/work.png";

interface IMenuItem {
  name: string;
}

export const menuList: IMenuItem[] = [
  {
    name: "Кафе и рестораны",
  },
  {
    name: "Развлечения",
  },
  {
    name: "Личные вещи",
  },
  {
    name: "Красота и уход",
  },
  {
    name: "Транспорт",
  },
  {
    name: "Недвижимость",
  },
  {
    name: "Медицина",
  },
  {
    name: "Работа",
  },
  {
    name: "Услуги",
  },
];

interface ICompanyItem {
  photo: string;
  stocks: number;
  discountPercentage: number;
}

export const companiesList: ICompanyItem[] = [
  {
    photo: CocaCola,
    stocks: 14,
    discountPercentage: 50,
  },
  {
    photo: Pepsi,
    stocks: 14,
    discountPercentage: 50,
  },
  {
    photo: Wildberries,
    stocks: 14,
    discountPercentage: 50,
  },
  {
    photo: Shoro,
    stocks: 14,
    discountPercentage: 50,
  },
  {
    photo: Kulikov,
    stocks: 14,
    discountPercentage: 50,
  },
];

interface IMenuSecondItem {
  title: string;
  stocks: number;
  background: string;
  photo: string;
}

export const menuSecondList: IMenuSecondItem[] = [
  {
    title: "Кафе и рестораны",
    stocks: 7,
    background: "#77A1D3",
    photo: Cafe,
  },
  {
    title: "Развлечения",
    stocks: 7,
    background: "#BDE2C9",
    photo: Entertaintment,
  },
  {
    title: "Личные вещи",
    stocks: 7,
    background: "#E3D4D0",
    photo: Things,
  },
  {
    title: "Красота и уход",
    stocks: 7,
    background: "#E87AB2",
    photo: Beauty,
  },
  {
    title: "Транспорт",
    stocks: 7,
    background: "#93CAD6",
    photo: Transport,
  },
  {
    title: "Недвижимость",
    stocks: 7,
    background: "#FDF2EC",
    photo: RealEstate,
  },
  {
    title: "Медицина",
    stocks: 7,
    background: "#B8D6DC",
    photo: Medicine,
  },
  {
    title: "Работа",
    stocks: 7,
    background: "#D4D0E6",
    photo: Work,
  },
];
