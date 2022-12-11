import { Button, Chip, Grid, List, ListItem, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getProducts } from "./productsSlice";

import { Wrapper, ProductWrapper } from "./Products.styled";
import {
  color,
  mobile_memory,
  smartphone,
  tv_size,
} from "../../libs/constants";

export type ProductProps = {
  fmyMarketingName: string;
  chipOptions: {
    fmyChipType: string;
    optionList: ChipOptionListProps[];
  }[];
  modelList: ModelListProps[];
  localBenefitList: {
    localBenefitText: string;
  }[];
};

type ModelListProps = {
  thumbUrl: string;
  thumbUrlAlt: string;
  priceDisplay: string;
  pviSubtypeName: string;
  fmyChipList: FmyChipListProps[];
};

type ChipOptionListProps = {
  optionCode: string;
  optionLocalName: string;
};

type FmyChipListProps = {
  fmyChipType: string;
  fmyChipLocalName: string;
};

const Products = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.products);
  const [selected, setSelected] = useState(smartphone);
  const [selectorState, setSelectorState] = useState({});

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    const productState = products.reduce((acc, product) => {
      acc[product.fmyMarketingName] = product.modelList[0].fmyChipList.map(
        (chip) => {
          return chip.fmyChipLocalName;
        }
      );
      return acc;
    }, {});

    setSelectorState(productState);
  }, [products]);

  const productGroups = useMemo(
    () => products.map((product) => product.modelList[0].pviSubtypeName),
    [products]
  );

  const selectedProductGroups = useMemo(
    () =>
      products.filter((product: ProductProps) => {
        return product.modelList[0].pviSubtypeName === selected;
      }),
    [products, selected]
  );

  const handleFilterClick = (selectedGroup: string) => {
    setSelected(selectedGroup);
  };

  const handleOptionClick = (
    type: string,
    item: ProductProps,
    option: ChipOptionListProps
  ) => {
    if (type === color) {
      const selectedColorOption = [option.optionLocalName].concat(
        selectorState[item.fmyMarketingName].slice(1)
      );

      setSelectorState({
        ...selectorState,
        [item.fmyMarketingName]: selectedColorOption,
      });
    } else if (type === mobile_memory) {
      const selectedMemoryOption = [
        selectorState[item.fmyMarketingName][0],
        option.optionLocalName,
      ];

      setSelectorState({
        ...selectorState,
        [item.fmyMarketingName]: selectedMemoryOption,
      });
    } else if (type === tv_size) {
      const selectedTVSizeOption = [option.optionLocalName];

      setSelectorState({
        ...selectorState,
        [item.fmyMarketingName]: selectedTVSizeOption,
      });
    }
  };

  return (
    <Wrapper>
      <Grid container display="flex" justifyContent="center">
        {[...new Set(productGroups)].map((group, index) => {
          return (
            <Chip
              key={index}
              label={group}
              onClick={() => handleFilterClick(group)}
              sx={{
                bgcolor: "white",
                margin: "20px",
                fontSize: "1em",
              }}
            />
          );
        })}
      </Grid>
      <Grid container display="flex" justifyContent="center">
        {selectedProductGroups?.map((item: ProductProps, index) => {
          const dynamicImages = item.modelList
            .filter((model) => {
              const modelSpec = model.fmyChipList.map(
                (chip) => chip.fmyChipLocalName
              );
              const selectedSpec = selectorState[item.fmyMarketingName];

              return JSON.stringify(modelSpec) === JSON.stringify(selectedSpec);
            })
            .map((model) => model.thumbUrl)[0];

          const dynamicPrices = item.modelList
            .filter((model) => {
              const modelSpec = model.fmyChipList.map(
                (chip) => chip.fmyChipLocalName
              );
              const selectedSpec = selectorState[item.fmyMarketingName];

              return JSON.stringify(modelSpec) === JSON.stringify(selectedSpec);
            })
            .map((model) => model.priceDisplay)[0];

          return (
            <ProductWrapper key={index}>
              <Grid container display="flex" justifyContent="center">
                <Grid item xs={12}>
                  <img
                    src={dynamicImages ?? item.modelList[0].thumbUrl}
                    alt={selectorState[item.fmyMarketingName]}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h5">{item.fmyMarketingName}</Typography>
                </Grid>
                <Grid item xs={12} container>
                  {(item.chipOptions || []).map((chip, index) => {
                    return (
                      <Grid item xs={12} key={index}>
                        {chip.optionList.map((option, index) => {
                          return (
                            <Chip
                              key={index}
                              label={
                                chip.fmyChipType !== color &&
                                option.optionLocalName
                              }
                              onClick={() => {
                                handleOptionClick(
                                  chip.fmyChipType,
                                  item,
                                  option
                                );
                              }}
                              size="small"
                              variant={
                                chip.fmyChipType !== color
                                  ? "outlined"
                                  : "filled"
                              }
                              sx={{
                                bgcolor:
                                  chip.fmyChipType === color &&
                                  option.optionCode,
                                margin: "2px",
                              }}
                            />
                          );
                        })}
                      </Grid>
                    );
                  })}
                </Grid>
                <Grid item xs={12}>
                  {dynamicPrices ? (
                    <Typography variant="h6">{dynamicPrices}</Typography>
                  ) : (
                    <Button href="https://www.samsung.com/nl/" target="_blank">
                      Ontdek meer
                    </Button>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <List
                    sx={{
                      maxWidth: 360,
                      bgcolor: "background.paper",
                    }}
                  >
                    {item.localBenefitList.map((benefit, index) => (
                      <ListItem key={index}>
                        <Typography variant="caption">
                          {benefit.localBenefitText}
                        </Typography>
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              </Grid>
              <Button href="https://www.samsung.com/nl/" target="_blank">
                Koop nu
              </Button>
            </ProductWrapper>
          );
        })}
      </Grid>
    </Wrapper>
  );
};

export default Products;
