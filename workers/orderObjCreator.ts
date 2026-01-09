import store from '../store';

import {
  createOrderObjBluePrint,
  razorPayOrderObjBlueprint,
} from '../constants/objects';
import { useSelector } from 'react-redux';



export const razorPayObjCreator = (
  apiKey: string,
  total: number,
  rzorderId: string,
  orderString: any,
) => {
  console.log(
    'total, apiKey, rzorderId, orderString  checkout,//RazorpayOrderRemote?.data?.id,>>>>>>>>>>>>>',
    total,
    apiKey,
    rzorderId,
    orderString,
  );

  try {
    const UserInfo = store.getState().user.userInfo;
    // const UserInfo = useSelector((state: any) => state.user.userInfo);

    // const InvoiceState: invoiceObjType = store.getState().user.invoice;

    const rzorder = razorPayOrderObjBlueprint();
    rzorder.key = apiKey;
    if (total) {
      rzorder.amount = total;
    } 
    rzorder.order_id = rzorderId;
    rzorder.description = 'Maharaj Bakers Order Id ' + orderString;
    rzorder.notes = {order_id: orderString};
    rzorder.prefill.email = UserInfo.user_email;
    rzorder.prefill.contact = UserInfo.user_phone_number;
    rzorder.prefill.name = UserInfo.user_name;
    rzorder.name = 'Maharaj Bakers';
    rzorder.currency = 'INR';
    // Yellowlog("rzorder",rzorder)
    // Yellowlog("UserInfo",UserInfo)
    console.log('rzorder---------->', rzorder, UserInfo.user_phone_number);

    return rzorder;
  } catch (err) {
    console.log(err);
    return false;
  }
};
