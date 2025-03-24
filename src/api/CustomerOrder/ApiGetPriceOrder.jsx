import api from '../instance.jsx'

const ApiGetPriceOrder = async ({ buyData }) => {

   try {
      const response = await api.post('/Cart/GetPriceInCart', buyData?.Voucher, {
         params: {
            PreorderCampaignId: buyData?.PreorderCampaignId,
            Quantity: buyData?.Quantity
         }
      })
      if (response?.status === 200) {
         return response?.data
      }
   } catch (error) {
      console.log('Api Get Price Order Error: ', error)
      return null;
   }
}

const ApiOrderCampaign = async ({ payload }) => {
   try {
      const response = await api.post('/Order', payload)
      if (response?.status === 200) {
         return response
      }
   } catch (error) {
      console.log('Api Order Campaign Error: ', error);
   }
}

export { ApiGetPriceOrder, ApiOrderCampaign }