import React, { useEffect, useState } from 'react';
import { GetSimilarCampaigns } from '../../api/SimilarCampaign/ApiSimilarCampaign';
import { Link } from 'react-router';

const SimilarCampaign = ({id}) => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSimilarCampaigns = async () => {
      try {
        const data = await GetSimilarCampaigns(id); // Replace with dynamic ID if needed
        if (data.length > 0) {
          setCampaigns(data);
        } else {
          setError('No similar campaigns found.');
        }
      } catch (err) {
        setError('Error fetching similar campaigns!');
        console.error(err); // Log error for debugging
      } finally {
        setLoading(false);
      }
    };

    fetchSimilarCampaigns();
  }, []);

  const formatPrice = (price) => {
    return price ? price.toLocaleString() : '0';
  };

  if (loading) return <p className="text-center">Đang tải dữ liệu...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="p-6 bg-yellow-100 w-full mt-4 rounded-xl">

      <div className="flex gap-6 overflow-x-auto whitespace-nowrap pb-4">
        {campaigns.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden flex-shrink-0 w-72">
            <img
              src={item.blindBox.images.mainImage.url}
              alt={item.blindBox.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg truncate">{item.blindBox.name}</h3>
              <p className="text-sm text-gray-600 truncate">{item.blindBox.description}</p>

              <div className="flex items-center justify-between mt-3">
                <div>
                  {item.blindBox.listedPrice && (
                    <span className="text-gray-500 line-through text-sm">
                      {formatPrice(item.blindBox.listedPrice)}đ
                    </span>
                  )}
                  <div className="mt-1">
                    <span className="text-red-600 font-bold text-lg">
                      {formatPrice(item.priceFrom)}đ - {formatPrice(item.priceTo)}đ
                    </span>
                  </div>
                </div>
              </div>

                  <Link to={"/preordercampaign/"+item.slug} className="w-full uppercase rounded-lg px-4 flex text-center justify-center bg-red-600 text-white font-bold py-2">
                    Xem chi tiết
                  </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimilarCampaign;
