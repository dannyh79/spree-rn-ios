import Config from 'react-native-config';
import {makeClient} from '@spree/storefront-api-v2-sdk';

const client = makeClient({
  host: Config.API_HOST,
});

export const productIndexReq = async () => {
  let products;
  const request = await client.products.list({
    include: 'default_variant',
    page: 1,
    sort: '-updated_at',
  });

  if (request.isSuccess) {
    const data = request.success().data;
    products = data.map(({id, attributes}) => ({id, ...attributes}));
  }

  return products;
};

export const userLogInReq = async ({username, password}) => {
  const response = await client.authentication.getToken({
    username: username,
    password: password,
  });

  const bearerToken = response.success().access_token;

  return bearerToken;
};

const orderFormater = (order) => {
  const attrs = order.attributes;
  return {
    number: attrs.number,
    completedAt: new Date(attrs.completed_at).toLocaleDateString(),
    status: attrs.state,
    displayTotal: attrs.display_total,
  };
};

export const completedOrdersListReq = async (bearerToken) => {
  const response = await client.account.completedOrdersList({bearerToken});
  return response.success().data.map((order) => orderFormater(order));
};
