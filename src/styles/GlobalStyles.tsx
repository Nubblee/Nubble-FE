import { Global, css } from '@emotion/react'
import colors from '../constants/color'
import { fontSize, fontWeight } from '../constants/font'

const GlobalStyles = () => (
	<Global
		styles={css`
			@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css');
			html,
			body,
			div,
			span,
			h5,
			h6,
			applet,
			object,
			iframe,
			a,
			abbr,
			acronym,
			address,
			big,
			cite,
			code,
			del,
			dfn,
			em,
			img,
			ins,
			kbd,
			q,
			s,
			samp,
			small,
			strike,
			strong,
			sub,
			sup,
			tt,
			var,
			b,
			u,
			i,
			center,
			dl,
			dt,
			dd,
			ol,
			ul,
			li,
			fieldset,
			form,
			label,
			legend,
			table,
			caption,
			tbody,
			tfoot,
			thead,
			tr,
			th,
			td,
			article,
			aside,
			canvas,
			details,
			embed,
			figure,
			figcaption,
			footer,
			header,
			hgroup,
			menu,
			nav,
			output,
			ruby,
			section,
			summary,
			time,
			mark,
			audio,
			video,
			button,
			input {
				margin: 0;
				padding: 0;
				border: 0;
				border-radius: 0;
				font-size: 100%;
				font: inherit;
				vertical-align: baseline;
			}
			,
			button {
				cursor: pointer;
			}
			article,
			aside,
			details,
			figcaption,
			figure,
			footer,
			header,
			hgroup,
			menu,
			nav,
			section {
				display: block;
			}
			body {
				line-height: 1;
			}
			ol,
			ul {
				list-style: none;
			}
			a {
				text-decoration: none;
				color: inherit;
			}
			blockquote,
			q {
				quotes: none;
			}
			blockquote:before,
			blockquote:after,
			q:before,
			q:after {
				content: '';
				content: none;
			}
			table {
				border-collapse: collapse;
				border-spacing: 0;
			}
			* {
				box-sizing: border-box;
				margin: 0;
			}
			p,
			h1 {
				font-size: ${fontSize.xxxxxl};
				font-weight: ${fontWeight.semiBold};
				margin: 0.67em 0;
			}
			h2 {
				font-size: ${fontSize.xxxxl};
				font-weight: ${fontWeight.semiBold};
				margin: 0.67em 0;
			}
			h3 {
				font-size: ${fontSize.xxl};
				font-weight: ${fontWeight.semiBold};
				margin: 0.75em 0;
			}
			h4 {
				font-size: ${fontSize.lg};
				font-weight: ${fontWeight.semiBold};
				margin: 0.75em 0;
			}
			blockquote {
				background-color: ${colors.mainGray};
				padding: 1px 15px;
			}
			pre {
				background-color: ${colors.mainGray};
				padding: 1em;
				margin-bottom: 20px;
			}
			#root {
				width: 100%;
				height: 100%;
				font-family:
					'Pretendard Variable',
					Pretendard,
					-apple-system,
					BlinkMacSystemFont,
					system-ui,
					Roboto,
					'Helvetica Neue',
					'Segoe UI',
					'Apple SD Gothic Neo',
					'Noto Sans KR',
					'Malgun Gothic',
					'Apple Color Emoji',
					'Segoe UI Emoji',
					'Segoe UI Symbol',
					sans-serif;
				font-size: ${fontSize.md};
				font-weight: ${fontWeight.regular};
				background-color: ${colors.bgBlack};
				color: ${colors.white};
			}
			html {
				font-size: 10px;
				height: 100%;
				width: 100%;
				overflow-y: auto;
			}
		`}
	/>
)

export default GlobalStyles
