import dayjs from 'dayjs'

export const formatDate = (date: Date) => {
	return dayjs(date).locale('ko').format('YYYY년 MM월 DD일')
}
