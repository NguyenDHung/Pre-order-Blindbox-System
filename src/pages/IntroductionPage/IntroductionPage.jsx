export default function IntrodutionPage() {
    return (
        <div className="bg-gradient-to-b from-gray-50 to-gray-200 py-10">
            <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg rounded-lg">

                <h1 className="text-3xl font-bold text-center text-gray-800 my-6">
                    Giới Thiệu <span className="text-[#FFD72F]">Preorder Blindbox System</span>
                </h1>

                {/* Image */}
                <div className="flex justify-center">
                    <img
                        src="https://i.imgur.com/nyt4atc.png"
                        alt="Blindbox Banner"
                        className="w-full max-w-2xl object-contain rounded-lg shadow-md"
                    />
                </div>

               
                <p className="text-gray-600 leading-relaxed text-center text-lg">
                    Preorder Blindbox System là nền tảng hàng đầu dành cho những người yêu thích Blindbox (túi mù)
                    và mong muốn sở hữu chúng sớm nhất có thể. Chúng tôi cung cấp những bộ sưu tập độc đáo,
                    chất lượng cao với đa dạng kiểu dáng, phù hợp cho mọi nhu cầu.
                </p>

                {/*  Blindbox */}
                <section className="flex flex-col items-center gap-4 mt-8">
                    <h2 className="text-2xl font-semibold text-gray-700"> Blindbox là gì?</h2>
                    <img
                        src="https://i.imgur.com/tJct6Jp.png"
                        alt="Blindbox là gì"
                        className="w-full max-w-2xl object-contain rounded-lg shadow-md"
                    />
                    <p className="text-gray-600 leading-relaxed text-lg text-center">
                        Túi mù (Blindbox) là một dạng sản phẩm bí ẩn, trong đó người mua không biết chính xác mình sẽ nhận được gì
                        cho đến khi mở hộp. Mỗi sản phẩm trong hộp có thể thuộc một bộ sưu tập, với các thiết kế hoặc nội dung ngẫu nhiên,
                        tạo nên sự thú vị và bất ngờ.
                    </p>
                </section>

                {/* Mong muốn của chúng tôi */}
                <h1 className="text-3xl font-bold text-center text-gray-800 my-6">
                    <span className="text-[#FFD72F]">Mong muốn của chúng tôi</span>
                </h1>

                <div className="space-y-10 mt-8">
                    <section className="flex flex-col items-center gap-4">
                        <h2 className="text-2xl font-semibold text-gray-700">🎯 Tầm Nhìn</h2>
                        <p className="text-gray-600 leading-relaxed text-lg text-center">
                            Dự án Preorder Blindbox System hướng tới việc trở thành nền tảng tiên phong dành cho những người yêu thích túi mù,
                            mang đến một hệ sinh thái thuận tiện, minh bạch và sáng tạo trong việc đặt trước các sản phẩm blindbox độc đáo.
                        </p>
                    </section>

                    <section className="flex flex-col items-center gap-4">
                        <h2 className="text-2xl font-semibold text-gray-700">🚀 Sứ Mệnh</h2>
                        <p className="text-gray-600 leading-relaxed text-lg text-center">
                            Dự án Preorder Blindbox System cam kết cung cấp các sản phẩm blindbox chất lượng cao, đảm bảo tính độc đáo
                            và sự hài lòng tối đa cho khách hàng. Chúng tôi tạo ra một cộng đồng kết nối những người yêu thích sưu tầm
                            và đam mê sáng tạo.
                        </p>
                    </section>

                    <section className="flex flex-col items-center gap-4">
                        <h2 className="text-2xl font-semibold text-gray-700">⭐ Giá Trị Cốt Lõi</h2>
                        <div className="text-gray-600 leading-relaxed text-lg space-y-2 text-center">
                            <p>🌟 Chất lượng cao cấp, phù hợp với nhiều mục đích sử dụng.</p>
                            <p>🎲 Hỗ trợ cộng đồng sáng tạo trong việc tìm kiếm sản phẩm độc đáo.</p>
                            <p>🤝 Cung cấp dịch vụ tư vấn và hỗ trợ khách hàng tận tâm.</p>
                        </div>
                    </section>

                    <section className="flex flex-col items-center gap-4">
                        <h2 className="text-2xl font-semibold text-gray-700">📞 Liên Hệ</h2>
                        <p className="text-gray-600 leading-relaxed text-lg text-center">
                            Nếu bạn có bất kỳ câu hỏi nào hoặc cần tư vấn về sản phẩm, hãy liên hệ với chúng tôi qua số điện thoại:
                            <strong> xxxxxx</strong>. Chúng tôi luôn sẵn sàng hỗ trợ bạn!
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
