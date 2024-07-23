import React from 'react'
import styled from 'styled-components'

import CalendarSvg from './calendar-16.svg'
import ChevronDownSvg from './chevron-down-16.svg'

console.log(ChevronDownSvg)

const Form = styled.form`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: minmax(0, 1fr);
`

Form.ItemGroup = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(1, minmax(0, 1fr));

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`

Form.Item = styled.div`
`

Form.Label = styled.label`
  display: block;
  white-space: nowrap;
  overflow: hidden;
  line-height: 4rem;
`

Form.TextBox = styled.input.attrs(() => ({
  type: 'text'
}))`
  appearance: none;
  display: block;
  padding: 0 1rem;
  margin: 0;
  width: 100%;
  height: 4rem;
  border: 1px solid #333;
  border-radius: 1rem;
  outline: none;
`

Form.Select = styled.select`
  appearance: none;
  display: block;
  padding: 0 4rem 0 1rem;
  margin: 0;
  width: 100%;
  line-height: 4rem;
  border: 1px solid #333;
  height: 4rem;
  border-radius: 1rem;
  outline: none;
  background: url(${ChevronDownSvg});
  background-repeat: no-repeat;
  background-position: right 8px center;

  & > option {
    line-height: 4rem;
  }
`

Form.TextArea = styled.textarea.attrs(({rows = 3}) => ({rows}))`
  appearance: none;
  display: block;
  padding: 1rem;
  margin: 0;
  width: 100%;
  resize: none;
  line-height: 2rem;
  border: 1px solid #333;
  border-radius: 1rem;
  outline: none;
`

Form.DatePicker = styled.input.attrs(() => ({
  type: 'date'
}))`
  appearance: none;
  display: block;
  padding: 0 1rem;
  margin: 0;
  width: 100%;
  height: 4rem;
  border: 1px solid #333;
  border-radius: 1rem;
  outline: none;
  background: url(${CalendarSvg});
  background-repeat: no-repeat;
  background-position: right 8px center;

  &::-webkit-calendar-picker-indicator, &::-webkit-inner-spin-button {
    opacity: 0;
    cursor: pointer;
  }
`

export default Form
