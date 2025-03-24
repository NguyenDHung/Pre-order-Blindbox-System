import api from "../instance";

const ApiGetPreOrderCampaign = async ({ PageIndex, PageSize, type, isEndingSoon, isNewlyLaunched, isTrending }) => {
   // 0: Time Pricing
   // 1: Bulk Order
   try {
      const response = await api.get('/PreorderCampaign/active', {
         params: {
            Type: type,
            PageIndex,
            PageSize,
            isEndingSoon,
            isNewlyLaunched,
            isTrending
         }
      })
      if (response?.status === 200) {
         return response?.data
      }
   } catch (error) {
      console.log('Api Get Pre-Order Campaign Error: ', error);
      return []
   }
}

export { ApiGetPreOrderCampaign }