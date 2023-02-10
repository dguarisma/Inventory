// types
import { DefaultConfigProps, DayPaymentPropsOption } from 'types/config';
import { Supplier } from 'types/supplier';
import { Product } from 'types/products';
import { DefaultArticle } from 'types/purchase';

export const drawerWidth = 260;

export const twitterColor = '#1DA1F2';
export const facebookColor = '#3b5998';
export const linkedInColor = '#0e76a8';

export const AWS_API = {
  poolId: 'us-east-1_aM1PPjbsx',
  appClientId: '1vf0bfpo5705b5fntre5jfkhf1'
};
export const AMZSECURITYTOKEN = 'DQYAAHNGJOMNHYYBXRGWCYLAURP';

export const HEADER = {
  headers: {
    'X-Amz-Security-Token': 'DQYAAHNGJOMNHYYBXRGWCYLAURP'
  }
};

export const HOST = 'https://8uj4s9f9hc.execute-api.sa-east-1.amazonaws.com/default';
export const REDUCERVERSION = 'MidasV004-';

export const FILE_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

export const CATEGORY = {
  CategoryOne: 'CategoryOne',
  CategoryTwo: 'CategoryTwo',
  CategoryThree: 'CategoryThree'
};

export const DATEFORMAT = 'dd-MM-yyyy';

export const ProductDefault: Product[] = [
  {
    HandlesBaq: '',
    HandlesBog: '',
    ID: '',
    Name: '',
    Sku: '',
    Ean: '',
    Maker: '',
    TrademarkID: '',
    TypesProductID: '',
    Variation: '',
    Grupo: '',
    CategoryOneID: '',
    CategoryTwoID: '',
    Pack: '',
    Quantity: '',
    MakerUnit: '',
    Weight: '',
    Width: '',
    PackInfo: '',
    Height: '',
    WrapperUnit: '',
    Depth: '',
    Warehouses: '',
    Substance: '',
    Substitutes: '',
    Keywords: '',
    Tax: 0,
    Status: false,
    IsTaxed: false
  }
];

export const ProductPurchaseDefault: DefaultArticle[] = [
  {
    Sku: '',
    Quantity: 0,
    BasePrice: 0,
    Tax: 0,
    DiscountNegotiated: 0,
    DiscountAdditional: 0,
    Bonus: 0
  }
];

export const DefaultSupplier: Supplier[] = [
  {
    ID: '',
    BusinessName: '',
    Nit: '',
    Cupo: 0,
    DaysPayment: '',
    LeadTimeBaq: 0,
    LeadTimeBog: 0,
    PaymenTerm: '',
    Discount: 0,
    NameContact: '',
    EmailContact: '',
    PhoneContact: 0,
    Status: false
  }
];

export const DayPayment: DayPaymentPropsOption[] = [
  {
    title: 'Pago inmediato',
    id: '0'
  },
  {
    title: '1 Día',
    id: '1'
  },
  {
    title: '2 Días',
    id: '2'
  },
  {
    title: '3 Días',
    id: '3'
  },
  {
    title: '15 Días',
    id: '15'
  },
  {
    title: '21 Días',
    id: '21'
  },
  {
    title: '30 Días',
    id: '30'
  },
  {
    title: '45 Días',
    id: '45'
  },
  {
    title: '60 Días',
    id: '60'
  }
];

// ==============================|| THEME CONFIG  ||============================== //

const config: DefaultConfigProps = {
  defaultPath: '/dashboard',
  fontFamily: `'Montserrat', sans-serif`,
  i18n: 'en',
  miniDrawer: false,
  container: true,
  mode: 'light',
  presetColor: 'default',
  themeDirection: 'ltr'
};

export default config;
