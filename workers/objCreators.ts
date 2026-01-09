import { isValidImageURL } from '../workers/utils';
// @ts-nocheck
export const sanitizeAPICategories = (
  payload: any,
  hasrecommended: boolean,
) => {
  try {
    let categories = [];
    if (hasrecommended) {
      categories.push({
        category_id: 0,
        category_name: 'Recommended',
        product_count: 7,
      });
    }
    for (let item of payload) {
      if (item.product_count > 0) {
        categories.push({
          category_id: item.category_id,
          category_name: item.category_name,
          product_count: item.product_count,
          category_status: item.category_status,
        });
      }
    }
    return categories;
  } catch (err) {
    return [];
  }
};

export const sanitizeAPIProduct = (payload: any, vegOnly: boolean) => {
  //  console.log('payload--------------->',payload?.length)
  try {
    let products = [];
    for (let item of payload) {
      if (vegOnly) {
        if (item.product_type === 1 && item?.product_disable === 0) {
          products.push({
            product_id: item?.product_id,
            shop_id: item.shop_id,
            category_id: item.category.category_id,
            product_name: item.product_name,
            description: item.product_description,
            image: isValidImageURL(item.product_image),
            variations: item.product_price,
            addons: item.product_addon?.length > 0 ? item.product_addon : [],
            status: item.product_status === 1,
            veg: item.product_type === 1,
            recommended: item.product_recommended === 1,
            product_message: item.product_message,
            shop_name: item.shop_name,
            customization:
              item.product_price?.length > 1 || item.product_addon?.length > 0,
          });
        }
      } else {
        if (item?.product_disable === 0) {
          products.push({
            product_id: item?.product_id,
            shop_id: item.shop_id,
            category_id: item.category.category_id,
            product_name: item.product_name,
            description: item.product_description,
            image: isValidImageURL(item.product_image),
            variations: item.product_price,
            addons: item.product_addon?.length > 0 ? item.product_addon : [],
            status: item.product_status === 1,
            veg: item.product_type === 1,
            recommended: item.product_recommended === 1,
            product_message: item.product_message,
            shop_name: item.shop_name,
            customization:
              item.product_price?.length > 1 || item.product_addon?.length > 0,
          });
        }
      }
    }
    return products;
  } catch (err) {
    return [];
  }
};

export const sanitizeComboProducts = (payload: any, vegOnly: boolean) => {
  let combos = [];
  try {
    for (let item of payload) {
      if (vegOnly) {
      } else {
        combos.push({
          id: item.combo_id,
          product_id: `combo-${item.shop_id}-${item.combo_id}`,
          shop_id: item.shop_id,
          product_name: item.combo_name,
          image: isValidImageURL(item.combo_image),
          combos: item.combo_products.map((item: any) => {
            return {
              product_id: item.product_id,
              product_image: isValidImageURL(item.product_image),
              product_type: item.product_type,
              product_name: item.product_name,
              variation: `${item.product_price[0].product_variation_name} ${item.product_price[0].product_variation_unit_name}`,
              price: item.product_price[0].product_price,
            };
          }),
          veg: item.product_type === 0,
          combo: true,
          combo_price: item.combo_price,
        });
      }
    }
    return combos;
  } catch (err) {
    console.log('>>>>>', err);
    return combos;
  }
};

// export const sanitizeAPIDeliveryCharge = (payload: any) => {
//   console.log('payload',payload)
//   try {
//     let product = {
//       delivery_charge: 0,
//       tax_amount: 0,
//       min_order: 0,
//       packing_charge: 0,
//       peak_charge: 0,
//       peak_charge_reason: 'dnm',
//       status: false,
//       distance:0,
//       allowed_distance:0
//     };
//     console.log('products', product);
//     return product;
//   } catch (err) {
//     console.log(err);

//     return [];
//   }
// };

export const SanitizeserviceShops = (payload: any, vegOnly: boolean) => {
  let ServiceShop = [];
  try {
    for (let item of payload) {
      if (vegOnly) {
        if (item.is_veg === 1) {
          ServiceShop.push({
            shop_id: item.shop_id,
            shop_name: item.shop_name,
            shop_image: isValidImageURL(item.shop_image),
            shop_for_two: item.shop_for_two,
            shop_preparation_time: item.shop_preparation_time,
            shop_brand: item.shop_brand,
            shop_description: item.shop_description,
            area_name: item.shop_location,
            shop_distance: item.shop_distance,
            shop_coupon: item.shop_coupon[0],
            shop_rating: item.shop_rating,
            shop_status: item.shop_status,
            shop_message: item.shop_message,
            shop_exclusive: item.shop_exclusive,
            shop_recommended: item?.shop_recommended,
            shop_open_time: item?.shop_open_time ? item?.shop_open_time : null,
            shop_close_time: item?.shop_close_time
              ? item?.shop_close_time
              : null,
            veg: item.is_veg === 1,
            percent: item.shop_coupon.map((item: any) => {
              return {
                percentage: item.percentage,
              };
            }),
            maximum_discount: item.shop_coupon.map((item: any) => {
              return {
                maximum_discount_amount: item.maximum_discount_amount,
              };
            }),
            flat: item.shop_coupon.map((item: any) => {
              return {
                flat_amount: item.flat_amount,
              };
            }),
          });
        }
      } else {
        ServiceShop.push({
          shop_id: item.shop_id,
          shop_name: item.shop_name,
          shop_image: isValidImageURL(item.shop_image),
          shop_for_two: item.shop_for_two,
          shop_preparation_time: item.shop_preparation_time,
          shop_brand: item.shop_brand,
          shop_description: item.shop_description,
          area_name: item.shop_location,
          shop_distance: item.shop_distance,
          shop_coupon: item.shop_coupon[0],
          shop_rating: item.shop_rating,
          shop_status: item.shop_status,
          shop_message: item.shop_message,
          shop_exclusive: item.shop_exclusive,
          shop_recommended: item?.shop_recommended,
          veg: item.is_veg === 1,
          shop_open_time: item?.shop_open_time ? item?.shop_open_time : null,
          shop_close_time: item?.shop_close_time ? item?.shop_close_time : null,
          percent: item.shop_coupon.map((item: any) => {
            return {
              percentage: item.percentage,
            };
          }),
          maximum_discount: item.shop_coupon.map((item: any) => {
            return {
              maximum_discount_amount: item.maximum_discount_amount,
            };
          }),
          flat: item.shop_coupon.map((item: any) => {
            return {
              flat_amount: item.flat_amount,
            };
          }),
        });
      }
    }
    return ServiceShop;
  } catch (err) {
    console.log('>>>>>------', err);
    return ServiceShop;
  }
};

export const SanitizeNearByHotel = (payload: any, vegOnly: boolean) => {
  let NearByShop = [];
  try {
    for (let item of payload) {
      if (vegOnly) {
        if (item.is_veg === 1) {
          NearByShop.push({
            shop_id: item.shop_id,
            shop_name: item.shop_name,
            shop_image: isValidImageURL(item.shop_image),
            shop_for_two: item.shop_for_two,
            shop_preparation_time: item.shop_preparation_time,
            shop_brand: item.shop_brand,
            shop_description: item.shop_description,
            area_name: item.shop_location,
            shop_distance: item.shop_distance,
            shop_coupon: item.shop_coupon[0],
            shop_rating: item.shop_rating,
            hasExtra: item.hasExtra,
            shop_status: item.shop_status,
            chef_image: item?.chef_image,
            shop_message: item.shop_message,
            shop_exclusive: item.shop_exclusive,
            shop_recommended: item?.shop_recommended,
            veg: item.is_veg === 1,
            shop_open_time: item?.shop_open_time ? item?.shop_open_time : null,
            shop_close_time: item?.shop_close_time
              ? item?.shop_close_time
              : null,
            percent: item.shop_coupon.map((item: any) => {
              return {
                percentage: item.percentage,
              };
            }),
            maximum_discount: item.shop_coupon.map((item: any) => {
              return {
                maximum_discount_amount: item.maximum_discount_amount,
              };
            }),
            flat: item.shop_coupon.map((item: any) => {
              return {
                flat_amount: item.flat_amount,
              };
            }),
          });
        }
      } else {
        NearByShop.push({
          shop_id: item.shop_id,
          shop_name: item.shop_name,
          shop_image: isValidImageURL(item.shop_image),
          shop_for_two: item.shop_for_two,
          shop_preparation_time: item.shop_preparation_time,
          shop_brand: item.shop_brand,
          shop_description: item.shop_description,
          area_name: item.shop_location,
          shop_distance: item.shop_distance,
          shop_coupon: item.shop_coupon[0],
          shop_rating: item.shop_rating,
          shop_status: item.shop_status,
          chef_image: item?.chef_image,
          shop_message: item.shop_message,
          shop_exclusive: item.shop_exclusive,
          shop_recommended: item?.shop_recommended,
          veg: item.is_veg === 1,
          shop_open_time: item?.shop_open_time ? item?.shop_open_time : null,
          shop_close_time: item?.shop_close_time ? item?.shop_close_time : null,
          percent: item.shop_coupon.map((item: any) => {
            return {
              percentage: item.percentage,
            };
          }),
          maximum_discount: item.shop_coupon.map((item: any) => {
            return {
              maximum_discount_amount: item.maximum_discount_amount,
            };
          }),
          flat: item.shop_coupon.map((item: any) => {
            return {
              flat_amount: item.flat_amount,
            };
          }),
        });
      }
    }
    return NearByShop;
  } catch (err) {
    console.log('>>>>>------', err);
    return NearByShop;
  }
};

export const SanitizePreOrder = (payload: any, vegOnly: boolean) => {
  let preOrderShop = [];
  try {
    for (let item of payload) {
      if (vegOnly) {
        if (item.is_veg === 1) {
          preOrderShop.push({
            shop_id: item.shop_id,
            shop_name: item.shop_name,
            shop_image: isValidImageURL(item.shop_image),
            shop_for_two: item.shop_for_two,
            shop_preparation_time: item.shop_preparation_time,
            shop_brand: item.shop_brand,
            shop_description: item.shop_description,
            area_name: item.shop_location,
            shop_distance: item.shop_distance,
            shop_coupon: item.shop_coupon[0],
            shop_rating: item.shop_rating,
            shop_status: item.shop_status,
            chef_image: item?.chef_image,
            shop_message: item.shop_message,
            shop_exclusive: item.shop_exclusive,
            veg: item.is_veg === 1,
            preorder_shop_id: item.preorder_shop_id,
            shop_open_time: item?.shop_open_time ? item?.shop_open_time : null,
            shop_close_time: item?.shop_close_time
              ? item?.shop_close_time
              : null,
            percent: item.shop_coupon.map((item: any) => {
              return {
                percentage: item.percentage,
              };
            }),
            maximum_discount: item.shop_coupon.map((item: any) => {
              return {
                maximum_discount_amount: item.maximum_discount_amount,
              };
            }),
            flat: item.shop_coupon.map((item: any) => {
              return {
                flat_amount: item.flat_amount,
              };
            }),
          });
        }
      } else {
        preOrderShop.push({
          shop_id: item.shop_id,
          shop_name: item.shop_name,
          shop_image: isValidImageURL(item.shop_image),
          shop_for_two: item.shop_for_two,
          shop_preparation_time: item.shop_preparation_time,
          shop_brand: item.shop_brand,
          shop_description: item.shop_description,
          area_name: item.shop_location,
          shop_distance: item.shop_distance,
          shop_coupon: item.shop_coupon[0],
          shop_rating: item.shop_rating,
          shop_status: item.shop_status,
          shop_message: item.shop_message,
          chef_image: item?.chef_image,
          shop_exclusive: item.shop_exclusive,
          preorder_shop_id: item.preorder_shop_id,
          veg: item.is_veg === 1,
          shop_open_time: item?.shop_open_time ? item?.shop_open_time : null,
          shop_close_time: item?.shop_close_time ? item?.shop_close_time : null,
          percent: item.shop_coupon.map((item: any) => {
            return {
              percentage: item.percentage,
            };
          }),
          maximum_discount: item.shop_coupon.map((item: any) => {
            return {
              maximum_discount_amount: item.maximum_discount_amount,
            };
          }),
          flat: item.shop_coupon.map((item: any) => {
            return {
              flat_amount: item.flat_amount,
            };
          }),
        });
      }
    }
    return preOrderShop;
  } catch (err) {
    console.log('>>>>>------', err);
    return preOrderShop;
  }
};

export const SanitizeDealOfTheDay = (payload: any, vegOnly: boolean) => {
  let dealOfTheDayShop = [];
  try {
    for (let item of payload) {
      if (vegOnly) {
        if (item.is_veg === 1) {
          dealOfTheDayShop.push({
            shop_id: item.shop_id,
            shop_name: item.shop_name,
            shop_image: isValidImageURL(item.shop_image),
            shop_for_two: item.shop_for_two,
            shop_preparation_time: item.shop_preparation_time,
            shop_brand: item.shop_brand,
            shop_description: item.shop_description,
            area_name: item.shop_location,
            shop_distance: item.shop_distance,
            shop_coupon: item.shop_coupon[0],
            shop_rating: item.shop_rating,
            chef_image: item?.chef_image,
            shop_status: item.shop_status,
            shop_message: item.shop_message,
            shop_exclusive: item.shop_exclusive,
            veg: item.is_veg === 1,
            shop_open_time: item?.shop_open_time ? item?.shop_open_time : null,
            shop_close_time: item?.shop_close_time
              ? item?.shop_close_time
              : null,
            percent: item.shop_coupon.map((item: any) => {
              return {
                percentage: item.percentage,
              };
            }),
            maximum_discount: item.shop_coupon.map((item: any) => {
              return {
                maximum_discount_amount: item.maximum_discount_amount,
              };
            }),
            flat: item.shop_coupon.map((item: any) => {
              return {
                flat_amount: item.flat_amount,
              };
            }),
          });
        }
      } else {
        dealOfTheDayShop.push({
          shop_id: item.shop_id,
          shop_name: item.shop_name,
          shop_image: isValidImageURL(item.shop_image),
          shop_for_two: item.shop_for_two,
          shop_preparation_time: item.shop_preparation_time,
          shop_brand: item.shop_brand,
          shop_description: item.shop_description,
          area_name: item.shop_location,
          shop_distance: item.shop_distance,
          shop_coupon: item.shop_coupon[0],
          shop_rating: item.shop_rating,
          shop_status: item.shop_status,
          chef_image: item?.chef_image,
          shop_message: item.shop_message,
          shop_exclusive: item.shop_exclusive,
          veg: item.is_veg === 1,
          shop_open_time: item?.shop_open_time ? item?.shop_open_time : null,
          shop_close_time: item?.shop_close_time ? item?.shop_close_time : null,
          percent: item.shop_coupon.map((item: any) => {
            return {
              percentage: item.percentage,
            };
          }),
          maximum_discount: item.shop_coupon.map((item: any) => {
            return {
              maximum_discount_amount: item.maximum_discount_amount,
            };
          }),
          flat: item.shop_coupon.map((item: any) => {
            return {
              flat_amount: item.flat_amount,
            };
          }),
        });
      }
    }
    return dealOfTheDayShop;
  } catch (err) {
    console.log('>>>>>------', err);
    return dealOfTheDayShop;
  }
};

export const SanitizeExclusiveShop = (payload: any, vegOnly: boolean) => {
  let exclusiveShop = [];
  try {
    for (let item of payload) {
      if (vegOnly) {
        if (item.is_veg === 1) {
          exclusiveShop.push({
            shop_id: item.shop_id,
            shop_name: item.shop_name,
            shop_image: isValidImageURL(item.shop_image),
            shop_for_two: item.shop_for_two,
            shop_preparation_time: item.shop_preparation_time,
            shop_brand: item.shop_brand,
            shop_description: item.shop_description,
            area_name: item.shop_location,
            shop_distance: item.shop_distance,
            shop_coupon: item.shop_coupon[0],
            shop_rating: item.shop_rating,
            shop_status: item.shop_status,
            chef_image: item?.chef_image,
            shop_message: item.shop_message,
            shop_exclusive: item.shop_exclusive,
            shop_open_time: item?.shop_open_time ? item?.shop_open_time : null,
            shop_close_time: item?.shop_close_time
              ? item?.shop_close_time
              : null,
            veg: item.is_veg === 1,
            percent: item.shop_coupon.map((item: any) => {
              return {
                percentage: item.percentage,
              };
            }),
            maximum_discount: item.shop_coupon.map((item: any) => {
              return {
                maximum_discount_amount: item.maximum_discount_amount,
              };
            }),
            flat: item.shop_coupon.map((item: any) => {
              return {
                flat_amount: item.flat_amount,
              };
            }),
          });
        }
      } else {
        exclusiveShop.push({
          shop_id: item.shop_id,
          shop_name: item.shop_name,
          shop_image: isValidImageURL(item.shop_image),
          shop_for_two: item.shop_for_two,
          shop_preparation_time: item.shop_preparation_time,
          shop_brand: item.shop_brand,
          shop_description: item.shop_description,
          area_name: item.shop_location,
          shop_distance: item.shop_distance,
          shop_coupon: item.shop_coupon[0],
          shop_rating: item.shop_rating,
          shop_status: item.shop_status,
          chef_image: item?.chef_image,
          shop_message: item.shop_message,
          shop_exclusive: item.shop_exclusive,
          shop_open_time: item?.shop_open_time ? item?.shop_open_time : null,
          shop_close_time: item?.shop_close_time ? item?.shop_close_time : null,
          veg: item.is_veg === 1,
          percent: item.shop_coupon.map((item: any) => {
            return {
              percentage: item.percentage,
            };
          }),
          maximum_discount: item.shop_coupon.map((item: any) => {
            return {
              maximum_discount_amount: item.maximum_discount_amount,
            };
          }),
          flat: item.shop_coupon.map((item: any) => {
            return {
              flat_amount: item.flat_amount,
            };
          }),
        });
      }
    }
    return exclusiveShop;
  } catch (err) {
    console.log('>>>>>------', err);
    return exclusiveShop;
  }
};

export const SanitizePopularBrands = (payload: any, vegOnly: boolean) => {
  let popularShop = [];
  try {
    for (let item of payload) {
      if (vegOnly) {
        if (item.is_veg === 1) {
          popularShop.push({
            shop_id: item.shop_id,
            shop_name: item.shop_name,
            shop_image: isValidImageURL(item.shop_image),
            shop_for_two: item.shop_for_two,
            shop_preparation_time: item.shop_preparation_time,
            shop_brand: item.shop_brand,
            shop_description: item.shop_description,
            area_name: item.shop_location,
            shop_distance: item.shop_distance,
            shop_coupon: item.shop_coupon[0],
            shop_rating: item.shop_rating,
            shop_status: item.shop_status,
            chef_image: item?.chef_image,
            shop_message: item.shop_message,
            shop_exclusive: item.shop_exclusive,
            veg: item.is_veg === 1,
            shop_open_time: item?.shop_open_time ? item?.shop_open_time : null,
            shop_close_time: item?.shop_close_time
              ? item?.shop_close_time
              : null,
            percent: item.shop_coupon.map((item: any) => {
              return {
                percentage: item.percentage,
              };
            }),
            maximum_discount: item.shop_coupon.map((item: any) => {
              return {
                maximum_discount_amount: item.maximum_discount_amount,
              };
            }),
            flat: item.shop_coupon.map((item: any) => {
              return {
                flat_amount: item.flat_amount,
              };
            }),
          });
        }
      } else {
        popularShop.push({
          shop_id: item.shop_id,
          shop_name: item.shop_name,
          shop_image: isValidImageURL(item.shop_image),
          shop_for_two: item.shop_for_two,
          shop_preparation_time: item.shop_preparation_time,
          shop_brand: item.shop_brand,
          shop_description: item.shop_description,
          area_name: item.shop_location,
          shop_distance: item.shop_distance,
          shop_coupon: item.shop_coupon[0],
          shop_rating: item.shop_rating,
          chef_image: item?.chef_image,
          shop_status: item.shop_status,
          shop_message: item.shop_message,
          shop_exclusive: item.shop_exclusive,
          veg: item.is_veg === 1,
          shop_open_time: item?.shop_open_time ? item?.shop_open_time : null,
          shop_close_time: item?.shop_close_time ? item?.shop_close_time : null,
          percent: item.shop_coupon.map((item: any) => {
            return {
              percentage: item.percentage,
            };
          }),
          maximum_discount: item.shop_coupon.map((item: any) => {
            return {
              maximum_discount_amount: item.maximum_discount_amount,
            };
          }),
          flat: item.shop_coupon.map((item: any) => {
            return {
              flat_amount: item.flat_amount,
            };
          }),
        });
      }
    }
    return popularShop;
  } catch (err) {
    console.log('>>>>>------', err);
    return popularShop;
  }
};

export const SanitizeHomeTop = (payload: any, vegOnly: boolean) => {
  // console.log("payload",JSON.stringify(payload));

  let homeTop = [];
  try {
    for (let item of payload) {
      if (vegOnly) {
        if (item.is_veg === 1) {
          homeTop.push({
            shop_id: item.shop_id,
            shop_name: item.shop_name,
            shop_image: isValidImageURL(item.shop_image),
            shop_for_two: item.shop_for_two,
            shop_preparation_time: item.shop_preparation_time,
            shop_brand: item.shop_brand,
            shop_description: item.shop_description,
            area_name: item.shop_location,
            shop_distance: item.shop_distance,
            shop_coupon: item.shop_coupon[0],
            chef_image: item?.chef_image,
            shop_rating: item.shop_rating,
            shop_status: item.shop_status,
            shop_message: item.shop_message,
            shop_exclusive: item.shop_exclusive,
            veg: item.is_veg === 1,
            shop_open_time: item?.shop_open_time ? item?.shop_open_time : null,
            shop_close_time: item?.shop_close_time
              ? item?.shop_close_time
              : null,
            percent: item.shop_coupon.map((item: any) => {
              return {
                percentage: item.percentage,
              };
            }),
            maximum_discount: item.shop_coupon.map((item: any) => {
              return {
                maximum_discount_amount: item.maximum_discount_amount,
              };
            }),
            flat: item.shop_coupon.map((item: any) => {
              return {
                flat_amount: item.flat_amount,
              };
            }),
          });
        }
      } else {
        homeTop.push({
          shop_id: item.shop_id,
          shop_name: item.shop_name,
          shop_image: isValidImageURL(item.shop_image),
          shop_for_two: item.shop_for_two,
          shop_preparation_time: item.shop_preparation_time,
          shop_brand: item.shop_brand,
          shop_description: item.shop_description,
          area_name: item.shop_location,
          shop_distance: item.shop_distance,
          shop_coupon: item.shop_coupon[0],
          shop_rating: item.shop_rating,
          shop_status: item.shop_status,
          shop_message: item.shop_message,
          chef_image: item?.chef_image,
          shop_exclusive: item.shop_exclusive,
          veg: item.is_veg === 1,
          shop_open_time: item?.shop_open_time ? item?.shop_open_time : null,
          shop_close_time: item?.shop_close_time ? item?.shop_close_time : null,
          percent: item.shop_coupon.map((item: any) => {
            return {
              percentage: item.percentage,
            };
          }),
          maximum_discount: item.shop_coupon.map((item: any) => {
            return {
              maximum_discount_amount: item.maximum_discount_amount,
            };
          }),
          flat: item.shop_coupon.map((item: any) => {
            return {
              flat_amount: item.flat_amount,
            };
          }),
        });
      }
    }
    return homeTop;
  } catch (err) {
    console.log('>>>>>------', err);
    return homeTop;
  }
};

export const SanitizeOfferShop = (payload: any, vegOnly: boolean) => {
  // console.log('payload', JSON.stringify(payload));
  let OfferShop = [];
  try {
    for (let item of payload) {
      if (vegOnly) {
        if (item.is_veg === 1) {
          OfferShop.push({
            shop_id: item.shop_id,
            shop_name: item.shop_name,
            shop_image: isValidImageURL(item.shop_image),
            shop_for_two: item.shop_for_two,
            shop_preparation_time: item.shop_preparation_time,
            shop_brand: item.shop_brand,
            shop_description: item.shop_description,
            area_name: item.shop_location,
            shop_distance: item.shop_distance,
            shop_coupon: item.shop_coupon[0],
            shop_rating: item.shop_rating,
            shop_status: item.shop_status,
            chef_image: item?.chef_image,
            shop_message: item.shop_message,
            shop_exclusive: item.shop_exclusive,
            shop_recommended: item?.shop_recommended,
            veg: item.is_veg === 1,
            shop_open_time: item?.shop_open_time ? item?.shop_open_time : null,
            shop_close_time: item?.shop_close_time
              ? item?.shop_close_time
              : null,
            percent: item.shop_coupon.map((item: any) => {
              return {
                percentage: item.percentage,
              };
            }),
            maximum_discount: item.shop_coupon.map((item: any) => {
              return {
                maximum_discount_amount: item.maximum_discount_amount,
              };
            }),
            flat: item.shop_coupon.map((item: any) => {
              return {
                flat_amount: item.flat_amount,
              };
            }),
          });
        }
      } else {
        OfferShop.push({
          shop_id: item.shop_id,
          shop_name: item.shop_name,
          shop_image: isValidImageURL(item.shop_image),
          shop_for_two: item.shop_for_two,
          shop_preparation_time: item.shop_preparation_time,
          shop_brand: item.shop_brand,
          shop_description: item.shop_description,
          area_name: item.shop_location,
          shop_distance: item.shop_distance,
          shop_coupon: item.shop_coupon[0],
          shop_rating: item.shop_rating,
          shop_status: item.shop_status,
          chef_image: item?.chef_image,
          shop_message: item.shop_message,
          shop_exclusive: item.shop_exclusive,
          shop_recommended: item?.shop_recommended,
          veg: item.is_veg === 1,
          shop_open_time: item?.shop_open_time ? item?.shop_open_time : null,
          shop_close_time: item?.shop_close_time ? item?.shop_close_time : null,
          percent: item.shop_coupon.map((item: any) => {
            return {
              percentage: item.percentage,
            };
          }),
          maximum_discount: item.shop_coupon.map((item: any) => {
            return {
              maximum_discount_amount: item.maximum_discount_amount,
            };
          }),
          flat: item.shop_coupon.map((item: any) => {
            return {
              flat_amount: item.flat_amount,
            };
          }),
        });
      }
    }
    return OfferShop;
  } catch (err) {
    console.log('>>>>>------', err);
    return OfferShop;
  }
};

export const SanitizeCuisineRestaurant = (payload: any, vegOnly: boolean) => {
  let NearByShop = [];
  try {
    for (let item of payload) {
      if (vegOnly) {
        if (item.is_veg === 1) {
          NearByShop.push({
            shop_id: item.shop_id,
            shop_name: item.shop_name,
            shop_image: isValidImageURL(item.shop_image),
            shop_for_two: item.shop_for_two,
            shop_preparation_time: item.shop_preparation_time,
            shop_brand: item.shop_brand,
            shop_description: item.shop_description,
            area_name: item.shop_location,
            shop_distance: item.shop_distance,
            shop_coupon: item.shop_coupon[0],
            shop_rating: item.shop_rating,
            chef_image: item?.chef_image,
            shop_status: item.shop_status,
            shop_message: item.shop_message,
            shop_recommended: item?.shop_recommended,
            shop_exclusive: item.shop_exclusive,
            veg: item.is_veg === 1,
            shop_open_time: item?.shop_open_time ? item?.shop_open_time : null,
            shop_close_time: item?.shop_close_time
              ? item?.shop_close_time
              : null,
            percent: item.shop_coupon.map((item: any) => {
              return {
                percentage: item.percentage,
              };
            }),
            maximum_discount: item.shop_coupon.map((item: any) => {
              return {
                maximum_discount_amount: item.maximum_discount_amount,
              };
            }),
            flat: item.shop_coupon.map((item: any) => {
              return {
                flat_amount: item.flat_amount,
              };
            }),
          });
        }
      } else {
        NearByShop.push({
          shop_id: item.shop_id,
          shop_name: item.shop_name,
          shop_image: isValidImageURL(item.shop_image),
          shop_for_two: item.shop_for_two,
          shop_preparation_time: item.shop_preparation_time,
          shop_brand: item.shop_brand,
          shop_description: item.shop_description,
          area_name: item.shop_location,
          shop_distance: item.shop_distance,
          shop_coupon: item.shop_coupon[0],
          shop_rating: item.shop_rating,
          chef_image: item?.chef_image,
          shop_status: item.shop_status,
          shop_message: item.shop_message,
          shop_recommended: item?.shop_recommended,
          shop_exclusive: item.shop_exclusive,
          veg: item.is_veg === 1,
          shop_open_time: item?.shop_open_time ? item?.shop_open_time : null,
          shop_close_time: item?.shop_close_time ? item?.shop_close_time : null,
          percent: item.shop_coupon.map((item: any) => {
            return {
              percentage: item.percentage,
            };
          }),
          maximum_discount: item.shop_coupon.map((item: any) => {
            return {
              maximum_discount_amount: item.maximum_discount_amount,
            };
          }),
          flat: item.shop_coupon.map((item: any) => {
            return {
              flat_amount: item.flat_amount,
            };
          }),
        });
      }
    }
    return NearByShop;
  } catch (err) {
    console.log('>>>>>------', err);
    return NearByShop;
  }
};

export const SanitizeCouponRestaurant = (payload: any, vegOnly: boolean) => {
  let couponShop = [];
  try {
    for (let item of payload) {
      if (vegOnly) {
        if (item.is_veg === 1) {
          couponShop.push({
            shop_id: item.shop_id,
            shop_name: item.shop_name,
            shop_image: isValidImageURL(item.shop_image),
            shop_for_two: item.shop_for_two,
            shop_preparation_time: item.shop_preparation_time,
            shop_brand: item.shop_brand,
            shop_description: item.shop_description,
            area_name: item.shop_location,
            shop_distance: item.shop_distance,
            shop_coupon: item.shop_coupon[0],
            shop_rating: item.shop_rating,
            shop_status: item.shop_status,
            chef_image: item?.chef_image,
            shop_message: item.shop_message,
            shop_exclusive: item.shop_exclusive,
            shop_recommended: item?.shop_recommended,
            veg: item.is_veg === 1,
            shop_open_time: item?.shop_open_time ? item?.shop_open_time : null,
            shop_close_time: item?.shop_close_time
              ? item?.shop_close_time
              : null,
            percent: item.shop_coupon.map((item: any) => {
              return {
                percentage: item.percentage,
              };
            }),
            maximum_discount: item.shop_coupon.map((item: any) => {
              return {
                maximum_discount_amount: item.maximum_discount_amount,
              };
            }),
            flat: item.shop_coupon.map((item: any) => {
              return {
                flat_amount: item.flat_amount,
              };
            }),
          });
        }
      } else {
        couponShop.push({
          shop_id: item.shop_id,
          shop_name: item.shop_name,
          shop_image: isValidImageURL(item.shop_image),
          shop_for_two: item.shop_for_two,
          shop_preparation_time: item.shop_preparation_time,
          shop_brand: item.shop_brand,
          shop_description: item.shop_description,
          area_name: item.shop_location,
          shop_distance: item.shop_distance,
          shop_coupon: item.shop_coupon[0],
          shop_rating: item.shop_rating,
          chef_image: item?.chef_image,
          shop_status: item.shop_status,
          shop_message: item.shop_message,
          shop_recommended: item?.shop_recommended,
          shop_exclusive: item.shop_exclusive,
          veg: item.is_veg === 1,
          shop_open_time: item?.shop_open_time ? item?.shop_open_time : null,
          shop_close_time: item?.shop_close_time ? item?.shop_close_time : null,
          percent: item.shop_coupon.map((item: any) => {
            return {
              percentage: item.percentage,
            };
          }),
          maximum_discount: item.shop_coupon.map((item: any) => {
            return {
              maximum_discount_amount: item.maximum_discount_amount,
            };
          }),
          flat: item.shop_coupon.map((item: any) => {
            return {
              flat_amount: item.flat_amount,
            };
          }),
        });
      }
    }
    return couponShop;
  } catch (err) {
    console.log('>>>>>------', err);
    return couponShop;
  }
};

export const SanitizeTopBrandProducts = (payload: any, vegOnly: boolean) => {
  let top_brands = [];
  try {
    for (let item of payload) {
      if (vegOnly) {
        if (item.is_veg === 1) {
          top_brands.push({
            shop_id: item.shop_id,
            shop_name: item.shop_name,
            shop_image: isValidImageURL(item.shop_image),
            shop_for_two: item.shop_for_two,
            shop_preparation_time: item.shop_preparation_time,
            shop_brand: item.shop_brand,
            shop_description: item.shop_description,
            area_name: item.shop_location,
            shop_distance: item.shop_distance,
            shop_coupon: item.shop_coupon[0],
            shop_rating: item.shop_rating,
            chef_image: item?.chef_image,
            shop_status: item.shop_status,
            shop_message: item.shop_message,
            shop_recommended: item?.shop_recommended,
            shop_exclusive: item.shop_exclusive,
            veg: item.is_veg === 1,
            shop_open_time: item?.shop_open_time ? item?.shop_open_time : null,
            shop_close_time: item?.shop_close_time
              ? item?.shop_close_time
              : null,
            percent: item.shop_coupon.map((item: any) => {
              return {
                percentage: item.percentage,
              };
            }),
            maximum_discount: item.shop_coupon.map((item: any) => {
              return {
                maximum_discount_amount: item.maximum_discount_amount,
              };
            }),
            flat: item.shop_coupon.map((item: any) => {
              return {
                flat_amount: item.flat_amount,
              };
            }),
          });
        }
      } else {
        top_brands.push({
          shop_id: item.shop_id,
          shop_name: item.shop_name,
          shop_image: isValidImageURL(item.shop_image),
          shop_for_two: item.shop_for_two,
          shop_preparation_time: item.shop_preparation_time,
          shop_brand: item.shop_brand,
          shop_description: item.shop_description,
          area_name: item.shop_location,
          shop_distance: item.shop_distance,
          shop_coupon: item.shop_coupon[0],
          shop_rating: item.shop_rating,
          chef_image: item?.chef_image,
          shop_status: item.shop_status,
          shop_message: item.shop_message,
          shop_recommended: item?.shop_recommended,
          shop_exclusive: item.shop_exclusive,
          veg: item.is_veg === 1,
          shop_open_time: item?.shop_open_time ? item?.shop_open_time : null,
          shop_close_time: item?.shop_close_time ? item?.shop_close_time : null,
          percent: item.shop_coupon.map((item: any) => {
            return {
              percentage: item.percentage,
            };
          }),
          maximum_discount: item.shop_coupon.map((item: any) => {
            return {
              maximum_discount_amount: item.maximum_discount_amount,
            };
          }),
          flat: item.shop_coupon.map((item: any) => {
            return {
              flat_amount: item.flat_amount,
            };
          }),
        });
      }
    }
    return top_brands;
  } catch (err) {
    console.log('>>>>>------', err);
    return top_brands;
  }
};
