import React from "react";

export type ProductProps = {
  fmyMarketingName: string;
  chipOptions: {
    fmyChipType: string;
    optionList: ChipOptionListProps[];
  }[];
  modelList: ModelListProps[];
  categorySubTypeEngName: string;
  localBenefitList: {
    localBenefitText: string;
  }[];
};

type ModelListProps = {
  modelCode: string;
  thumbUrl: string;
  thumbUrlAlt: string;
  priceDisplay: string;
  pviTypeName: string;
  pviSubtypeName: string;
  fmyChipList: FmyChipListProps[];
};

type ChipOptionListProps = {
  optionCode: string;
  optionLocalName: string;
  optionName: string;
};

type FmyChipListProps = {
  fmyChipType: string;
  fmyChipName: string;
  fmyChipLocalName: string;
};

export const Products = () => {
  return <div>Products</div>;
};

export default Products;
