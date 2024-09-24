import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'
import colors from '../constants/color'
import { fontSize, fontWeight } from '../constants/font'
import dayjs from 'dayjs'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper/modules'
import { ArrowUpRight } from 'lucide-react'
import { Plus } from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'
import 'swiper/swiper-bundle.css'

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
	const { isLogin } = useAuthStore()
	const navigate = useNavigate()

	const date = formatDate(CoteData[0].date)
	return (
		<BannerWrapper>
			<BannerTop>
				<BannerDate>{date} 오늘의 문제</BannerDate>
				{isLogin && (
					<BannerBtn
						onClick={() => {
							navigate('/AddQuestion')
						}}
					>
						<Plus size={20} />
						문제 추가하기
					</BannerBtn>
				)}
			</BannerTop>
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
		</BannerWrapper>
	)
}

export default Banner

const BannerWrapper = styled.div`
	width: 100%;
	background-color: ${colors.mainGray};
	border-radius: 10px;
	padding-top: 40px;
`
const BannerTop = styled.div`
	display: flex;
	height: 15px;
	justify-content: space-between;
	align-items: center;
	padding: 0 80px;
`
const SwiperContainer = styled.div`
	width: 100%;
	background-color: ${colors.mainGray};
	border-radius: 10px;
	box-shadow: 0px 5px 5px -3px rgba(255, 255, 255, 0.5);

	.swiper-pagination {
		bottom: 15px !important;

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
	height: 100px;
	padding: 20px 80px;
`

const BannerDate = styled.div`
	color: ${colors.primaryBlue};
	font-size: ${fontSize.lg};
	font-weight: ${fontWeight.medium};
`
const BannerBtn = styled.div`
	display: flex;
	gap: 3px;
	font-size: ${fontSize.lg};
	align-items: center;
	cursor: pointer;

	&:hover {
		font-weight: ${fontWeight.bold};
	}
`
const BannerTitle = styled.div`
	display: flex;
	padding-top: 10px;
	gap: 10px;
	font-size: ${fontSize.xxxxl};
	font-weight: ${fontWeight.medium};
`
