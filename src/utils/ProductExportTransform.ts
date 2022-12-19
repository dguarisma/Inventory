import { ArrayToString } from 'utils/convertToObject';
import { SearchIDToArray } from 'utils/findName';

const productExport = (data: object[], listTypeProduct: object[]) =>
  data?.map((item: any) => {
    let Warehouse: string = '';
    let Substitutes: string = '';
    let Substance: string = '';
    let TypesProduct: string = '';

    if (item?.Substance) {
      Substance = ArrayToString(item?.Substance);
    }
    if (item?.Warehouses) {
      Warehouse = ArrayToString(item?.Warehouses);
    }
    if (item?.Substitutes) {
      Substitutes = item?.Substitutes.map((e: any) => e.Sku).join();
    }
    if (item?.TypesProductID) {
      TypesProduct = SearchIDToArray(listTypeProduct, item?.TypesProductID)?.Name || '';
    }

    return {
      ID: item?.ID,
      HandlesBaq: item?.HandlesBaq,
      HandlesBog: item?.HandlesBog,
      Name: item?.Name,
      Sku: item?.Sku,
      Ean: item?.Ean,
      Maker: item?.Maker?.Name,
      Trademark: item?.Trademark,
      Type_Product: TypesProduct,
      Variation: item?.Variation,
      Grupo: item?.CategoryOne?.Name,
      CategoryOne: item?.CategoryTwo?.Name,
      CategoryTwo: item?.CategoryThree?.Name,
      Pack: item?.Pack?.Name,
      Quantity: item?.Quantity,
      MakerUnit: item?.MakerUnit,
      Weight: item?.Weight,
      Width: item?.Width,
      PackInfo: item?.Wrapper,
      Height: item?.Height,
      WrapperUnit: item?.WrapperUnit,
      Depth: item?.Depth,
      Warehouse,
      IDProduct: item?.IDFloorProduct,
      Substance,
      Substitutes,
      Status: Boolean(item?.Status),
      Keywords: item?.Keywords,
      Tax: item?.iva,
      IsTaxed: item?.Taxed
    };
  });

export { productExport };