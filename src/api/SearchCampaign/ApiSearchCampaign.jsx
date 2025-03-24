import api from "../instance"

const ApiSearchCampaign = async ({ BlindBoxName, SortOrder, PageIndex, PageSize }) => {
   try {
      const result = await api.get('/PreorderCampaign/Search', {
         params: {
            BlindBoxName: BlindBoxName,
            SortOrder: SortOrder,
            PageIndex: PageIndex,
            PageSize: PageSize
         }
      })
      if (result.status === 200) {
         return result
      }
   } catch (error) {
      console.log('Api Search Campaign Error: ', error)
      return []
   }
}

export { ApiSearchCampaign }