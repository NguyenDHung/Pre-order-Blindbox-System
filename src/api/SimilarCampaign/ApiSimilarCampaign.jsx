import api from "../instance";

const GetSimilarCampaigns = async (campaignId) => {
    try {
        const response = await api.get(`/PreorderCampaign/similar-campaign/${campaignId}`);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.log(">>> API Get Similar Campaigns Error: ", error);
        return [];
    }
}

export { GetSimilarCampaigns };
