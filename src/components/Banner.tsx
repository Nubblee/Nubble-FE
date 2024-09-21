import styled from '@emotion/styled'
import colors from '../constants/color'
import { fontSize, fontWeight } from '../constants/font'
import dayjs from 'dayjs'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper/modules'
import 'swiper/swiper-bundle.css'
import { ArrowUpRight } from 'lucide-react'

const CoteData = [
	{
		id: 1,
		date: new Date(),
		title: 'Lv.0 정수를 나선형으로 배치하기',
		url: 'https://school.programmers.co.kr/learn/courses/30/lessons/181832',
	},
	{
		id: 2,
		date: new Date(),
		title: 'Lv.0 옹알이',
		url: 'https://school.programmers.co.kr/learn/courses/30/lessons/120956',
	},
]

const formatDate = (date: Date) => {
	return dayjs(date).locale('ko').format('YYYY년 MM월 DD일')
}

const Banner = () => {
	return (
		<SwiperContainer>
			<Swiper
				slidesPerView={1}
				spaceBetween={30}
				loop={true}
				pagination={{
					clickable: true,
				}}
				navigation={true}
				modules={[Pagination, Navigation]}
				className="my-swiper"
			>
				{CoteData.map((code) => (
					<SwiperSlide key={code.id}>
						<BannerComponent>
							<BannerDate>{formatDate(code.date)} 오늘의 문제</BannerDate>
							<a href={code.url} target="_blank">
								<BannerTitle>
									{code.title}
									<ArrowUpRight size={32} />
								</BannerTitle>
							</a>
						</BannerComponent>
					</SwiperSlide>
				))}
			</Swiper>
		</SwiperContainer>
	)
}

export default Banner

const SwiperContainer = styled.div`
	width: 100%;
	background-color: ${colors.mainGray};
	border-radius: 10px;
	box-shadow: 0px 5px 5px -3px rgba(255, 255, 255, 0.5);
	padding-top: 16px;

	.swiper-pagination {
		bottom: 10px !important;

		.swiper-pagination-bullet {
			color: ${colors.commentGray};
		}

		.swiper-pagination-bullet-active {
			background-color: ${colors.commentGray};
		}
	}

	.swiper-button-next,
	.swiper-button-prev {
		color: #fff;
		width: 44px;
		height: 44px;
		font-size: 24px;
	}

	.swiper-button-next::after,
	.swiper-button-prev::after {
		font-size: 24px;
	}

	.swiper-button-next {
		right: 10px !important;
	}

	.swiper-button-prev {
		left: 10px !important;
	}
`

const BannerComponent = styled.div`
	height: 120px;
	padding: 20px 80px;
`

const BannerDate = styled.div`
	display: flex;
	color: ${colors.primaryBlue};
	font-size: ${fontSize.lg};
	padding-bottom: 13px;
`
const BannerTitle = styled.div`
	display: flex;
	gap: 10px;
	font-size: ${fontSize.xxxxl};
	font-weight: ${fontWeight.medium};
`
