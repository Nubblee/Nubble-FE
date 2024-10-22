import { ChangeEvent } from 'react'
import styled from '@emotion/styled'
import colors from '@/constants/color'

export interface categoryProps {
	categoryId: string
	categoryName: string
}

export interface boardProps {
	id: string
	name: string
}

interface SelectBoxProps {
	label?: string
	options: categoryProps[] | boardProps[]
	placeholder?: string
	selectedValue: string
	disabled?: boolean
	handleChange: (e: ChangeEvent<HTMLSelectElement>) => void
}

const SelectBox = ({
	label,
	options,
	placeholder,
	selectedValue,
	disabled,
	handleChange,
}: SelectBoxProps) => {
	return (
		<div>
			{label && <Label>{label}</Label>}
			<Select value={selectedValue} onChange={handleChange} disabled={disabled}>
				<Option value="">{placeholder}</Option>
				{options.map((option) => (
					<option
						key={
							'categoryId' in option
								? `${option.categoryName}-${option.categoryId}`
								: `${option.name}-${option.id}`
						}
						value={'categoryId' in option ? option.categoryId : option.id}
					>
						{'categoryName' in option ? option.categoryName : option.name}
					</option>
				))}
			</Select>
		</div>
	)
}

export default SelectBox

const Label = styled.label`
	font-size: 12px;
`

const Select = styled.select`
	height: 33px;
	width: 100%;
	border-radius: 8px;
	padding: 0 10px;
	color: ${colors.commentGray};
`

const Option = styled.option``
